import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

// Contest templates for auto-creation
const contestTemplates = [
  { name: "Mega Contest", max_entries: 10000 },
  { name: "Head to Head", max_entries: 2 },
  { name: "Small League", max_entries: 10 },
  { name: "Grand League", max_entries: 100 },
  { name: "Practice Contest", max_entries: 1000 },
];

interface Match {
  id: string;
  name: string;
  status: string;
  ms: string;
  t1: string;
  t2: string;
  t1img: string;
  t2img: string;
  t1s: string;
  t2s: string;
  dateTimeGMT: string;
  series: string;
  matchType: string;
}

interface Contest {
  id: number;
  match_id: string;
  status: string;
}

interface ContestEntry {
  id: number;
  user_id: number;
  contest_id: number;
  team_id: number;
  points: number;
}

interface TeamPlayer {
  player_id: string;
  player_name: string;
  is_captain: boolean;
  is_vice_captain: boolean;
}

// Fetch matches from Cricket API
async function fetchMatches(): Promise<Match[]> {
  try {
    const apiKey = process.env.CRICKET_API_KEY;
    if (!apiKey) {
      console.error("Cricket API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`,
      { next: { revalidate: 0 } }
    );
    const data = await response.json();
    
    if (data.status === "success" && data.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

// Auto-create contests for upcoming matches that don't have contests
async function autoCreateContests(matches: Match[]): Promise<number> {
  let created = 0;
  
  // Filter upcoming matches (fixtures)
  const upcomingMatches = matches.filter(m => m.ms === "fixture");
  
  for (const match of upcomingMatches) {
    // Check if contests already exist for this match
    const existing = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM contests WHERE match_id = ?",
      [match.id]
    );
    
    if (existing[0].count === 0) {
      // Create contests for this match
      for (const template of contestTemplates) {
        await query(
          `INSERT INTO contests (
            match_id, name, match_name, series_name, match_type,
            team1_name, team2_name, team1_img, team2_img, match_date,
            entry_fee, prize_pool, max_entries, current_entries, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, 0, 'upcoming')`,
          [
            match.id,
            template.name,
            `${match.t1} vs ${match.t2}`,
            match.series || "Cricket Match",
            match.matchType || "T20",
            match.t1,
            match.t2,
            match.t1img || "",
            match.t2img || "",
            match.dateTimeGMT,
            template.max_entries,
          ]
        );
        created++;
      }
    }
  }
  
  return created;
}

// Update contest status based on match status
async function updateContestStatus(matches: Match[]): Promise<{ live: number; completed: number }> {
  let live = 0;
  let completed = 0;
  
  for (const match of matches) {
    // Get contests for this match
    const contests = await query<Contest[]>(
      "SELECT id, status FROM contests WHERE match_id = ?",
      [match.id]
    );
    
    for (const contest of contests) {
      let newStatus = contest.status;
      
      // Match is live
      if (match.ms === "live" && contest.status === "upcoming") {
        newStatus = "live";
        live++;
      }
      // Match is completed
      else if (match.ms === "result" && contest.status !== "completed") {
        newStatus = "completed";
        completed++;
      }
      
      if (newStatus !== contest.status) {
        await query(
          "UPDATE contests SET status = ? WHERE id = ?",
          [newStatus, contest.id]
        );
      }
    }
  }
  
  return { live, completed };
}

// Calculate points for completed contests
async function calculatePoints(matches: Match[]): Promise<number> {
  let calculated = 0;
  
  // Get completed matches
  const completedMatches = matches.filter(m => m.ms === "result");
  
  for (const match of completedMatches) {
    // Get contests for this match that are completed but not yet calculated
    const contests = await query<Contest[]>(
      "SELECT id FROM contests WHERE match_id = ? AND status = 'completed'",
      [match.id]
    );
    
    for (const contest of contests) {
      // Get all entries for this contest that don't have points yet
      const entries = await query<ContestEntry[]>(
        "SELECT ce.id, ce.user_id, ce.team_id, ce.points FROM contest_entries ce WHERE ce.contest_id = ? AND (ce.points IS NULL OR ce.points = 0)",
        [contest.id]
      );
      
      for (const entry of entries) {
        // Calculate points for this entry based on team players
        // For now, generate random points (in real app, this would use actual match data)
        const points = Math.floor(Math.random() * 150) + 50; // Random 50-200 points
        
        await query(
          "UPDATE contest_entries SET points = ? WHERE id = ?",
          [points, entry.id]
        );
        
        // Update user team points
        await query(
          "UPDATE user_teams SET total_points = ? WHERE id = ?",
          [points, entry.team_id]
        );
        
        calculated++;
      }
      
      // Update rankings for this contest
      await updateContestRankings(contest.id);
    }
  }
  
  return calculated;
}

// Update rankings for a contest
async function updateContestRankings(contestId: number): Promise<void> {
  // Get all entries sorted by points
  const entries = await query<{ id: number; team_id: number; points: number }[]>(
    "SELECT id, team_id, points FROM contest_entries WHERE contest_id = ? ORDER BY points DESC",
    [contestId]
  );
  
  // Update rank for each entry
  for (let i = 0; i < entries.length; i++) {
    const rank = i + 1;
    await query(
      "UPDATE contest_entries SET rank_position = ? WHERE id = ?",
      [rank, entries[i].id]
    );
    await query(
      "UPDATE user_teams SET rank_position = ? WHERE id = ?",
      [rank, entries[i].team_id]
    );
  }
}

// Clean up old completed contests (optional - keep for history)
async function cleanupOldContests(): Promise<number> {
  // Delete contests older than 30 days that are completed and have no entries
  const result = await query(
    `DELETE FROM contests 
     WHERE status = 'completed' 
     AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
     AND id NOT IN (SELECT DISTINCT contest_id FROM contest_entries)`
  );
  
  return (result as { affectedRows: number }).affectedRows || 0;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action") || "all";
    
    // Fetch current matches
    const matches = await fetchMatches();
    
    const results: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      matchesFound: matches.length,
    };
    
    if (action === "all" || action === "create") {
      results.contestsCreated = await autoCreateContests(matches);
    }
    
    if (action === "all" || action === "status") {
      results.statusUpdates = await updateContestStatus(matches);
    }
    
    if (action === "all" || action === "points") {
      results.pointsCalculated = await calculatePoints(matches);
    }
    
    if (action === "cleanup") {
      results.contestsCleaned = await cleanupOldContests();
    }
    
    return NextResponse.json({
      success: true,
      message: "Contest sync completed",
      ...results,
    });
  } catch (error) {
    console.error("Error syncing contests:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync contests",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// POST endpoint for manual trigger with specific match
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId } = body;
    
    if (!matchId) {
      return NextResponse.json(
        { success: false, error: "Match ID is required" },
        { status: 400 }
      );
    }
    
    // Fetch matches and find the specific one
    const matches = await fetchMatches();
    const match = matches.find(m => m.id === matchId);
    
    if (!match) {
      return NextResponse.json(
        { success: false, error: "Match not found" },
        { status: 404 }
      );
    }
    
    const results = {
      contestsCreated: await autoCreateContests([match]),
      statusUpdates: await updateContestStatus([match]),
      pointsCalculated: await calculatePoints([match]),
    };
    
    return NextResponse.json({
      success: true,
      message: "Contest sync completed for match",
      matchId,
      ...results,
    });
  } catch (error) {
    console.error("Error syncing contest for match:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync contest",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
