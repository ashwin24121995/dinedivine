import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

// Contest templates
const contestTemplates = [
  {
    name: "Mega Contest",
    entry_fee: 0,
    prize_pool: 0,
    max_entries: 10000,
    description: "Free mega contest - compete with thousands of players!",
  },
  {
    name: "Head to Head",
    entry_fee: 0,
    prize_pool: 0,
    max_entries: 2,
    description: "1v1 battle - prove you're the best!",
  },
  {
    name: "Small League",
    entry_fee: 0,
    prize_pool: 0,
    max_entries: 10,
    description: "Compete in a small group of 10 players",
  },
  {
    name: "Grand League",
    entry_fee: 0,
    prize_pool: 0,
    max_entries: 100,
    description: "Join 100 players in this exciting contest",
  },
  {
    name: "Practice Contest",
    entry_fee: 0,
    prize_pool: 0,
    max_entries: 1000,
    description: "Practice your skills - no pressure!",
  },
];

// GET endpoint to seed contests for a match
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get("matchId");

    if (!matchId) {
      return NextResponse.json({
        success: true,
        message: "Use GET with ?matchId=xxx to seed contests for a match",
        templates: contestTemplates,
      });
    }

    // Check if contests already exist for this match
    const existingContests = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM contests WHERE match_id = ?",
      [matchId]
    );

    if (existingContests[0].count > 0) {
      return NextResponse.json({
        success: true,
        message: "Contests already exist for this match",
        count: existingContests[0].count,
      });
    }

    // Create contests for this match with all required fields
    for (const template of contestTemplates) {
      await query(
        `INSERT INTO contests (
          match_id, 
          name, 
          match_name,
          series_name,
          match_type,
          team1_name,
          team2_name,
          team1_img,
          team2_img,
          match_date,
          entry_fee, 
          prize_pool, 
          max_entries, 
          current_entries, 
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, 0, 'upcoming')`,
        [
          matchId,
          template.name,
          'Match',  // match_name placeholder
          'Series', // series_name placeholder
          'T20',    // match_type placeholder
          'Team 1', // team1_name placeholder
          'Team 2', // team2_name placeholder
          '',       // team1_img placeholder
          '',       // team2_img placeholder
          template.entry_fee,
          template.prize_pool,
          template.max_entries,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Created ${contestTemplates.length} contests for match ${matchId}`,
    });
  } catch (error) {
    console.error("Error seeding contests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed contests", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST endpoint to seed contests with match details
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, matchName, seriesName, matchType, team1Name, team2Name, team1Img, team2Img, matchDate } = body;

    if (!matchId) {
      return NextResponse.json(
        { success: false, error: "Match ID is required" },
        { status: 400 }
      );
    }

    // Check if contests already exist for this match
    const existingContests = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM contests WHERE match_id = ?",
      [matchId]
    );

    if (existingContests[0].count > 0) {
      return NextResponse.json({
        success: true,
        message: "Contests already exist for this match",
        count: existingContests[0].count,
      });
    }

    // Create contests for this match
    const createdContests = [];
    for (const template of contestTemplates) {
      const result = await query(
        `INSERT INTO contests (
          match_id, 
          name, 
          match_name,
          series_name,
          match_type,
          team1_name,
          team2_name,
          team1_img,
          team2_img,
          match_date,
          entry_fee, 
          prize_pool, 
          max_entries, 
          current_entries, 
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'upcoming')`,
        [
          matchId,
          template.name,
          matchName || 'Match',
          seriesName || 'Series',
          matchType || 'T20',
          team1Name || 'Team 1',
          team2Name || 'Team 2',
          team1Img || '',
          team2Img || '',
          matchDate || new Date().toISOString(),
          template.entry_fee,
          template.prize_pool,
          template.max_entries,
        ]
      );
      createdContests.push({
        ...template,
        id: (result as { insertId: number }).insertId,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdContests.length} contests for match`,
      contests: createdContests,
    });
  } catch (error) {
    console.error("Error seeding contests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed contests", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
