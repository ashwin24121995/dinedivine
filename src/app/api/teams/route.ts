import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";
import { ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const teams = await query(
      `SELECT ut.*, 
        (SELECT COUNT(*) FROM team_players WHERE team_id = ut.id) as player_count
       FROM user_teams ut 
       WHERE ut.user_id = ? 
       ORDER BY ut.created_at DESC`,
      [payload.id]
    );

    return NextResponse.json({
      success: true,
      teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { matchId, teamName, players } = body;

    // Validate inputs
    if (!matchId || !teamName || !players || players.length !== 11) {
      return NextResponse.json(
        { success: false, error: "Invalid team data" },
        { status: 400 }
      );
    }

    // Check if user already has 5 teams for this match
    const existingTeams = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM user_teams WHERE user_id = ? AND match_id = ?",
      [payload.id, matchId]
    );

    if (existingTeams[0].count >= 5) {
      return NextResponse.json(
        { success: false, error: "Maximum 5 teams allowed per match" },
        { status: 400 }
      );
    }

    // Create team
    const result = await query<ResultSetHeader>(
      `INSERT INTO user_teams (user_id, match_id, team_name, total_credits_used) 
       VALUES (?, ?, ?, ?)`,
      [payload.id, matchId, teamName, players.reduce((sum: number, p: { credits: number }) => sum + p.credits, 0)]
    );

    const teamId = result.insertId;

    // Add players to team
    for (const player of players) {
      await query(
        `INSERT INTO team_players (team_id, player_id, player_name, player_role, credits, is_captain, is_vice_captain)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          teamId,
          player.playerId,
          player.playerName,
          player.role,
          player.credits,
          player.isCaptain ? 1 : 0,
          player.isViceCaptain ? 1 : 0,
        ]
      );
    }

    // Update user stats
    await query(
      `UPDATE user_stats SET total_teams_created = total_teams_created + 1, xp_points = xp_points + 10 WHERE user_id = ?`,
      [payload.id]
    );

    return NextResponse.json({
      success: true,
      teamId,
      message: "Team created successfully",
    });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create team" },
      { status: 500 }
    );
  }
}
