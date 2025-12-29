import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Contest {
  id: number;
  match_id: string;
  name: string;
  entry_fee: number;
  prize_pool: number;
  max_participants: number;
  current_participants: number;
  status: string;
  created_at: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get("matchId");

    let sql = `SELECT * FROM contests WHERE status IN ('upcoming', 'live')`;
    const params: string[] = [];

    if (matchId) {
      sql += ` AND match_id = ?`;
      params.push(matchId);
    }

    sql += ` ORDER BY max_entries DESC, created_at DESC`;

    const contests = await query<Contest[]>(sql, params);

    // Calculate spots left for each contest
    // Handle both old schema (max_entries) and new schema (max_participants)
    const contestsWithSpots = contests.map((contest: Record<string, unknown>) => {
      const maxParticipants = (contest.max_entries as number) || (contest.max_participants as number) || 100;
      const currentParticipants = (contest.current_entries as number) || (contest.current_participants as number) || 0;
      return {
        ...contest,
        max_participants: maxParticipants,
        current_participants: currentParticipants,
        spots_left: maxParticipants - currentParticipants,
        spots_filled_percent: Math.round((currentParticipants / maxParticipants) * 100),
      };
    });

    return NextResponse.json({
      success: true,
      contests: contestsWithSpots,
      count: contestsWithSpots.length,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contests", contests: [] },
      { status: 500 }
    );
  }
}

// POST to create a new contest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, name, maxParticipants = 100 } = body;

    if (!matchId || !name) {
      return NextResponse.json(
        { success: false, error: "Match ID and name are required" },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO contests (match_id, name, entry_fee, prize_pool, max_participants, current_participants, status)
       VALUES (?, ?, 0, 0, ?, 0, 'upcoming')`,
      [matchId, name, maxParticipants]
    );

    return NextResponse.json({
      success: true,
      contestId: (result as { insertId: number }).insertId,
      message: "Contest created successfully",
    });
  } catch (error) {
    console.error("Error creating contest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contest" },
      { status: 500 }
    );
  }
}
