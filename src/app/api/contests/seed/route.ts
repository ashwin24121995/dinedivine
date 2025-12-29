import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

// Contest templates
const contestTemplates = [
  {
    name: "Mega Contest",
    entry_fee: 0,
    prize_pool: 0,
    max_participants: 10000,
    description: "Free mega contest - compete with thousands of players!",
  },
  {
    name: "Head to Head",
    entry_fee: 0,
    prize_pool: 0,
    max_participants: 2,
    description: "1v1 battle - prove you're the best!",
  },
  {
    name: "Small League",
    entry_fee: 0,
    prize_pool: 0,
    max_participants: 10,
    description: "Compete in a small group of 10 players",
  },
  {
    name: "Grand League",
    entry_fee: 0,
    prize_pool: 0,
    max_participants: 100,
    description: "Join 100 players in this exciting contest",
  },
  {
    name: "Practice Contest",
    entry_fee: 0,
    prize_pool: 0,
    max_participants: 1000,
    description: "Practice your skills - no pressure!",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { matchId, matchName } = await request.json();

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
        `INSERT INTO contests (match_id, name, entry_fee, prize_pool, max_participants, current_participants, status)
         VALUES (?, ?, ?, ?, ?, 0, 'upcoming')`,
        [
          matchId,
          `${template.name}${matchName ? ` - ${matchName}` : ""}`,
          template.entry_fee,
          template.prize_pool,
          template.max_participants,
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
      { success: false, error: "Failed to seed contests" },
      { status: 500 }
    );
  }
}

// GET endpoint to seed contests for multiple matches
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get("matchId");

    if (matchId) {
      // Seed for a specific match
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
      for (const template of contestTemplates) {
        await query(
          `INSERT INTO contests (match_id, name, entry_fee, prize_pool, max_participants, current_participants, status)
           VALUES (?, ?, ?, ?, ?, 0, 'upcoming')`,
          [
            matchId,
            template.name,
            template.entry_fee,
            template.prize_pool,
            template.max_participants,
          ]
        );
      }

      return NextResponse.json({
        success: true,
        message: `Created ${contestTemplates.length} contests for match ${matchId}`,
      });
    }

    // Return info about seeding
    return NextResponse.json({
      success: true,
      message: "Use POST with matchId to seed contests, or GET with ?matchId=xxx",
      templates: contestTemplates,
    });
  } catch (error) {
    console.error("Error seeding contests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed contests" },
      { status: 500 }
    );
  }
}
