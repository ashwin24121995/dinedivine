import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface LeaderboardEntry {
  id: number;
  user_id: number;
  username: string;
  team_name: string;
  points: number;
  rank_position: number;
}

interface Contest {
  id: number;
  name: string;
  match_name: string;
  status: string;
  max_entries: number;
  current_entries: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: contestId } = await params;

    // Get contest details
    const contests = await query<Contest[]>(
      `SELECT id, name, match_name, status, max_entries, current_entries 
       FROM contests WHERE id = ?`,
      [contestId]
    );

    if (contests.length === 0) {
      return NextResponse.json(
        { success: false, error: "Contest not found" },
        { status: 404 }
      );
    }

    const contest = contests[0];

    // Get leaderboard entries
    const leaderboard = await query<LeaderboardEntry[]>(
      `SELECT 
        ce.id,
        ce.user_id,
        u.username,
        ut.team_name,
        ce.points,
        ce.rank_position
       FROM contest_entries ce
       JOIN users u ON ce.user_id = u.id
       JOIN user_teams ut ON ce.team_id = ut.id
       WHERE ce.contest_id = ?
       ORDER BY ce.points DESC, ce.created_at ASC
       LIMIT 100`,
      [contestId]
    );

    // Assign ranks if not already set
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank_position: entry.rank_position || index + 1,
    }));

    // Get current user's rank if authenticated
    let userRank = null;
    try {
      const token = await getAuthCookie();
      if (token) {
        const payload = await verifyToken(token);
        if (payload) {
          const userEntry = rankedLeaderboard.find(e => e.user_id === payload.id);
          if (userEntry) {
            userRank = userEntry;
          }
        }
      }
    } catch (e) {
      // User not authenticated, that's ok
    }

    return NextResponse.json({
      success: true,
      contest,
      leaderboard: rankedLeaderboard,
      userRank,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch leaderboard",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
