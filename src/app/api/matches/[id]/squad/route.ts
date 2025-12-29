import { NextRequest, NextResponse } from "next/server";
import { getMatchSquad, getSeriesSquad, getMatchInfo } from "@/lib/cricketApi";

export const dynamic = "force-dynamic";

// Map of known series names to their IDs for faster lookup
const KNOWN_SERIES: Record<string, string> = {
  "Big Bash League 2025-26": "107c2a65-2778-4235-b31d-bbc29346cd94",
  "International League T20, 2025-26": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // Example - will be looked up
  "Syed Mushtaq Ali Trophy Elite 2025": "smat-elite-2025",
  "Syed Mushtaq Ali Trophy Plate 2025": "smat-plate-2025",
};

// Helper to match team names with various formats
function matchTeamName(squadTeamName: string, matchTeamName: string): boolean {
  const normalize = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\[.*?\]/g, '') // Remove [XXX] suffixes
      .replace(/\s+/g, ' ')
      .trim();
  };
  
  const squadNorm = normalize(squadTeamName);
  const matchNorm = normalize(matchTeamName);
  
  // Exact match
  if (squadNorm === matchNorm) return true;
  
  // One contains the other
  if (squadNorm.includes(matchNorm) || matchNorm.includes(squadNorm)) return true;
  
  // Check for common abbreviations
  const squadWords = squadNorm.split(' ');
  const matchWords = matchNorm.split(' ');
  
  // If first word matches, likely the same team
  if (squadWords[0] === matchWords[0] && squadWords[0].length > 3) return true;
  
  return false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Match ID is required" },
        { status: 400 }
      );
    }

    console.log(`Fetching squad for match: ${id}`);

    // First, try to get match-specific squad
    let squadData = await getMatchSquad(id);

    // If no match squad, try to get series squad
    if (!squadData || squadData.length === 0) {
      console.log("No match squad found, trying series squad...");
      
      // Get match info to find the series ID and team names
      const matchInfo = await getMatchInfo(id);
      
      if (matchInfo) {
        console.log(`Match: ${matchInfo.name}`);
        console.log(`Teams: ${matchInfo.teams?.join(' vs ')}`);
        console.log(`Series ID: ${matchInfo.series_id}`);
        console.log(`Has Squad: ${matchInfo.hasSquad}`);
        
        if (matchInfo.series_id) {
          console.log(`Fetching series squad for series: ${matchInfo.series_id}`);
          const seriesSquadData = await getSeriesSquad(matchInfo.series_id);
          
          if (seriesSquadData && seriesSquadData.length > 0) {
            console.log(`Found ${seriesSquadData.length} teams in series squad`);
            
            // Get team names from match
            const teamNames = matchInfo.teams || [];
            
            // Also try to extract from teamInfo
            const teamInfoNames = matchInfo.teamInfo?.map(t => t.name) || [];
            const allTeamNames = [...new Set([...teamNames, ...teamInfoNames])];
            
            console.log(`Looking for teams: ${allTeamNames.join(', ')}`);
            
            // Filter to only include teams playing in this match
            squadData = seriesSquadData.filter(team => {
              const isMatch = allTeamNames.some(t => matchTeamName(team.teamName, t));
              if (isMatch) {
                console.log(`Matched team: ${team.teamName}`);
              }
              return isMatch;
            }).map(team => ({
              teamName: team.teamName,
              shortname: team.shortname,
              img: team.img,
              players: team.players.map(player => ({
                id: player.id,
                name: player.name,
                role: player.role || "Batsman",
                battingStyle: player.battingStyle,
                bowlingStyle: player.bowlingStyle,
                country: player.country,
                playerImg: player.playerImg,
              })),
            }));
            
            // If filtering didn't work, use first 2 teams from series
            if (squadData.length === 0 && seriesSquadData.length >= 2) {
              console.log("Team matching failed, using first 2 teams from series");
              squadData = seriesSquadData.slice(0, 2).map(team => ({
                teamName: team.teamName,
                shortname: team.shortname,
                img: team.img,
                players: team.players.map(player => ({
                  id: player.id,
                  name: player.name,
                  role: player.role || "Batsman",
                  battingStyle: player.battingStyle,
                  bowlingStyle: player.bowlingStyle,
                  country: player.country,
                  playerImg: player.playerImg,
                })),
              }));
            }
          } else {
            console.log("No series squad data available");
          }
        }
      }
    }

    // If still no squad data, return message
    if (!squadData || squadData.length === 0) {
      return NextResponse.json({
        success: true,
        squads: [],
        message: "Squad not announced yet. Check back closer to match time.",
        squadNotAvailable: true,
        hint: "Squads are typically available for Big Bash League, International League T20, and some other major tournaments.",
      });
    }

    // Transform the squad data with credits
    const squads = squadData.map((team) => ({
      teamName: team.teamName,
      shortname: team.shortname,
      img: team.img,
      players: team.players.map((player, index) => ({
        id: player.id,
        name: player.name,
        role: player.role || "Batsman",
        battingStyle: player.battingStyle,
        bowlingStyle: player.bowlingStyle,
        country: player.country,
        playerImg: player.playerImg,
        // Assign credits based on role (for fantasy)
        credits: getPlayerCredits(player.role || "Batsman", index),
        points: 0, // Will be updated during match
      })),
    }));

    console.log(`Returning ${squads.length} teams with ${squads.reduce((sum, t) => sum + t.players.length, 0)} total players`);

    return NextResponse.json({
      success: true,
      squads,
      squadNotAvailable: false,
    });
  } catch (error) {
    console.error("Error fetching match squad:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch squad data" },
      { status: 500 }
    );
  }
}

// Helper function to assign credits based on player role
function getPlayerCredits(role: string, index: number): number {
  const roleLower = role.toLowerCase();
  
  // Base credits by role
  let baseCredits = 8.0;
  
  if (roleLower.includes("wk") || roleLower.includes("keeper") || roleLower.includes("wicketkeeper")) {
    baseCredits = 8.5;
  } else if (roleLower.includes("bat")) {
    baseCredits = 9.0;
  } else if (roleLower.includes("all") || roleLower.includes("ar")) {
    baseCredits = 9.5;
  } else if (roleLower.includes("bowl")) {
    baseCredits = 8.0;
  }
  
  // Add some variation based on position in list (top players cost more)
  const variation = Math.max(0, (10 - index) * 0.1);
  
  return Math.round((baseCredits + variation) * 10) / 10;
}
