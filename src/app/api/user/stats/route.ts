import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

interface UserStats extends RowDataPacket {
  total_contests_joined: number;
  total_teams_created: number;
  total_points_earned: number;
  total_wins: number;
  highest_score: number;
  current_streak: number;
  best_streak: number;
  level: number;
  xp_points: number;
}

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

    const userId = payload.id;

    // Get or create user stats
    let stats = await query<UserStats[]>(
      "SELECT * FROM user_stats WHERE user_id = ?",
      [userId]
    );

    if (stats.length === 0) {
      // Create initial stats for new user
      await query(
        "INSERT INTO user_stats (user_id) VALUES (?)",
        [userId]
      );
      stats = await query<UserStats[]>(
        "SELECT * FROM user_stats WHERE user_id = ?",
        [userId]
      );
    }

    // Get recent activity counts
    const teamsCount = await query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM user_teams WHERE user_id = ?",
      [userId]
    );

    const contestsCount = await query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM contest_entries WHERE user_id = ?",
      [userId]
    );

    // Get unread notifications count
    const notificationsCount = await query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE",
      [userId]
    );

    return NextResponse.json({
      success: true,
      stats: stats[0],
      counts: {
        teams: teamsCount[0]?.count || 0,
        contests: contestsCount[0]?.count || 0,
        unreadNotifications: notificationsCount[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
