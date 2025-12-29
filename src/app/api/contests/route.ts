import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get("matchId");

    let sql = `SELECT * FROM contests WHERE status = 'upcoming'`;
    const params: string[] = [];

    if (matchId) {
      sql += ` AND match_id = ?`;
      params.push(matchId);
    }

    sql += ` ORDER BY created_at DESC`;

    const contests = await query(sql, params);

    return NextResponse.json({
      success: true,
      contests,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contests" },
      { status: 500 }
    );
  }
}
