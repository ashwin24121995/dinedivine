import { NextRequest, NextResponse } from "next/server";
import { getCricScore, getLiveMatches, getUpcomingMatches, getCompletedMatches, getAllMatchesCategorized } from "@/lib/cricketApi";
import { CricScoreMatch } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Sort matches by start time (soonest first for upcoming, most recent first for completed)
function sortMatchesByTime(matches: CricScoreMatch[], ascending: boolean = true): CricScoreMatch[] {
  return [...matches].sort((a, b) => {
    const timeA = new Date(a.dateTimeGMT).getTime();
    const timeB = new Date(b.dateTimeGMT).getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // live, upcoming, completed, all
    const noCache = searchParams.get("nocache") === "true";
    const debug = searchParams.get("debug") === "true";

    // Check if API key is configured
    const apiKeyConfigured = !!process.env.CRICKET_API_KEY;
    
    if (debug) {
      return NextResponse.json({
        success: true,
        debug: {
          apiKeyConfigured,
          apiKeyPrefix: process.env.CRICKET_API_KEY?.substring(0, 8) || "NOT_SET",
          nodeEnv: process.env.NODE_ENV,
        },
        timestamp: new Date().toISOString(),
      });
    }

    let data;

    switch (status) {
      case "live":
        // Get only LIVE matches (ms === "live" or fixture with past start time)
        data = await getLiveMatches(noCache);
        // Sort live matches by start time (most recent first)
        data = sortMatchesByTime(data, false);
        break;
      case "upcoming":
        // Get only UPCOMING matches (ms === "fixture" with future start time)
        data = await getUpcomingMatches();
        // Sort upcoming matches by start time (soonest first)
        data = sortMatchesByTime(data, true);
        break;
      case "completed":
        // Get only COMPLETED matches (ms === "result")
        data = await getCompletedMatches();
        // Sort completed matches by time (most recent first)
        data = sortMatchesByTime(data, false);
        break;
      case "all":
        // Get all matches categorized
        const categorized = await getAllMatchesCategorized(noCache);
        data = {
          live: sortMatchesByTime(categorized.live, false),
          upcoming: sortMatchesByTime(categorized.upcoming, true),
          completed: sortMatchesByTime(categorized.completed, false),
        };
        break;
      default:
        // Return all matches from eCricScore
        data = await getCricScore(noCache);
    }

    return NextResponse.json({
      success: true,
      data,
      count: Array.isArray(data) ? data.length : undefined,
      apiKeyConfigured,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/cricscore:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch matches",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
