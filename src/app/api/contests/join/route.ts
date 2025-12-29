import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";
import { ResultSetHeader } from "mysql2";

export const dynamic = "force-dynamic";

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
    const { contestId, teamId } = body;

    if (!contestId || !teamId) {
      return NextResponse.json(
        { success: false, error: "Contest ID and Team ID are required" },
        { status: 400 }
      );
    }

    // Check if contest exists and has spots
    const contests = await query<{ id: number; max_participants: number; current_participants: number; match_id: string }[]>(
      "SELECT * FROM contests WHERE id = ?",
      [contestId]
    );

    if (contests.length === 0) {
      return NextResponse.json(
        { success: false, error: "Contest not found" },
        { status: 404 }
      );
    }

    const contest = contests[0];

    if (contest.current_participants >= contest.max_participants) {
      return NextResponse.json(
        { success: false, error: "Contest is full" },
        { status: 400 }
      );
    }

    // Check if user already joined this contest
    const existingEntry = await query<{ id: number }[]>(
      "SELECT id FROM contest_entries WHERE user_id = ? AND contest_id = ?",
      [payload.id, contestId]
    );

    if (existingEntry.length > 0) {
      return NextResponse.json(
        { success: false, error: "You have already joined this contest" },
        { status: 400 }
      );
    }

    // Check if team belongs to user and is for this match
    const teams = await query<{ id: number; match_id: string }[]>(
      "SELECT * FROM user_teams WHERE id = ? AND user_id = ?",
      [teamId, payload.id]
    );

    if (teams.length === 0) {
      return NextResponse.json(
        { success: false, error: "Team not found" },
        { status: 404 }
      );
    }

    // Join the contest
    await query<ResultSetHeader>(
      `INSERT INTO contest_entries (user_id, contest_id, team_id) VALUES (?, ?, ?)`,
      [payload.id, contestId, teamId]
    );

    // Update contest participants count
    await query(
      "UPDATE contests SET current_participants = current_participants + 1 WHERE id = ?",
      [contestId]
    );

    // Update user stats
    await query(
      "UPDATE user_stats SET total_contests_joined = total_contests_joined + 1, xp_points = xp_points + 5 WHERE user_id = ?",
      [payload.id]
    );

    return NextResponse.json({
      success: true,
      message: "Successfully joined the contest",
    });
  } catch (error) {
    console.error("Error joining contest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to join contest" },
      { status: 500 }
    );
  }
}
