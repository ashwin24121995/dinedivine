import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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
        { success: false, error: `Invalid team data: matchId=${!!matchId}, teamName=${!!teamName}, players=${players?.length || 0}` },
        { status: 400 }
      );
    }

    // Check if user already has 5 teams for this match
    const existingTeams = await query<(RowDataPacket & { count: number })[]>(
      "SELECT COUNT(*) as count FROM user_teams WHERE user_id = ? AND match_id = ?",
      [payload.id, matchId]
    );

    if (existingTeams[0].count >= 5) {
      return NextResponse.json(
        { success: false, error: "Maximum 5 teams allowed per match" },
        { status: 400 }
      );
    }

    // Calculate total credits
    const totalCredits = players.reduce((sum: number, p: { credits: number }) => sum + (p.credits || 0), 0);

    // Create team
    const result = await query<ResultSetHeader>(
      `INSERT INTO user_teams (user_id, match_id, team_name, total_credits_used) 
       VALUES (?, ?, ?, ?)`,
      [payload.id, matchId, teamName, totalCredits]
    );

    const teamId = result.insertId;

    if (!teamId) {
      return NextResponse.json(
        { success: false, error: "Failed to create team - no insertId returned" },
        { status: 500 }
      );
    }

    // Add players to team
    for (const player of players) {
      await query(
        `INSERT INTO team_players (team_id, player_id, player_name, player_role, credits, is_captain, is_vice_captain)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          teamId,
          player.playerId || player.id || "unknown",
          player.playerName || player.name || "Unknown Player",
          player.role || "UNKNOWN",
          player.credits || 0,
          player.isCaptain ? 1 : 0,
          player.isViceCaptain ? 1 : 0,
        ]
      );
    }

    // Update user stats (don't fail if this fails)
    try {
      await query(
        `UPDATE user_stats SET total_teams_created = total_teams_created + 1, xp_points = xp_points + 10 WHERE user_id = ?`,
        [payload.id]
      );
    } catch (statsError) {
      console.error("Error updating user stats:", statsError);
      // Don't fail the team creation if stats update fails
    }

    return NextResponse.json({
      success: true,
      teamId,
      message: "Team created successfully",
    });
  } catch (error) {
    console.error("Error creating team:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";
    return NextResponse.json(
      { success: false, error: "Failed to create team", details: errorMessage, stack: errorStack },
      { status: 500 }
    );
  }
}
