import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
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

    const contests = await query(
      `SELECT 
        ce.id,
        ce.rank,
        ce.joined_at,
        c.match_id,
        c.contest_name,
        c.contest_type,
        c.max_participants,
        c.current_participants,
        c.status,
        ut.team_name,
        ut.total_points as team_points
      FROM contest_entries ce
      JOIN contests c ON ce.contest_id = c.id
      JOIN user_teams ut ON ce.team_id = ut.id
      WHERE ce.user_id = ?
      ORDER BY ce.joined_at DESC`,
      [payload.id]
    );

    return NextResponse.json({
      success: true,
      contests,
    });
  } catch (error) {
    console.error("Error fetching user contests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contests" },
      { status: 500 }
    );
  }
}
