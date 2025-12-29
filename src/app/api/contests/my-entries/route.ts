import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface ContestEntry {
  id: number;
  contest_id: number;
  team_id: number;
  points: number;
  rank_position: number;
  contest_name: string;
  contest_status: string;
  match_id: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated", entries: [] },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token", entries: [] },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get("matchId");

    let sql = `
      SELECT 
        ce.id,
        ce.contest_id,
        ce.team_id,
        ce.points,
        ce.rank_position,
        c.name as contest_name,
        c.status as contest_status,
        c.match_id
      FROM contest_entries ce
      JOIN contests c ON ce.contest_id = c.id
      WHERE ce.user_id = ?
    `;
    const params: (string | number)[] = [payload.id];

    if (matchId) {
      sql += ` AND c.match_id = ?`;
      params.push(matchId);
    }

    sql += ` ORDER BY ce.created_at DESC`;

    const entries = await query<ContestEntry[]>(sql, params);

    return NextResponse.json({
      success: true,
      entries,
      count: entries.length,
    });
  } catch (error) {
    console.error("Error fetching user entries:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch entries",
        details: error instanceof Error ? error.message : String(error),
        entries: []
      },
      { status: 500 }
    );
  }
}
