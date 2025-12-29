import { NextRequest, NextResponse } from "next/server";
import { getMatchSquad, getSeriesSquad, getMatchInfo } from "@/lib/cricketApi";

export const dynamic = "force-dynamic";

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

    // First, try to get match-specific squad
    let squadData = await getMatchSquad(id);

    // If no match squad, try to get series squad
    if (!squadData || squadData.length === 0) {
      console.log("No match squad found, trying series squad...");
      
      // Get match info to find the series ID
      const matchInfo = await getMatchInfo(id);
      
      if (matchInfo && matchInfo.series_id) {
        console.log(`Fetching series squad for series: ${matchInfo.series_id}`);
        const seriesSquadData = await getSeriesSquad(matchInfo.series_id);
        
        if (seriesSquadData && seriesSquadData.length > 0) {
          // Filter to only include teams playing in this match
          const teamNames = matchInfo.teams || [];
          
          // Transform series squad to match squad format
          squadData = seriesSquadData
            .filter(team => {
              // Try to match team names
              const teamNameLower = team.teamName.toLowerCase();
              return teamNames.some(t => 
                teamNameLower.includes(t.toLowerCase()) || 
                t.toLowerCase().includes(teamNameLower)
              );
            })
            .map(team => ({
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
          
          // If filtering didn't work, use all teams from series
          if (squadData.length === 0) {
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
  
  if (roleLower.includes("wk") || roleLower.includes("keeper")) {
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
