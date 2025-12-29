import { NextRequest, NextResponse } from "next/server";
import { getCricScore, getLiveMatches, getUpcomingMatches, getCompletedMatches, getAllMatchesCategorized } from "@/lib/cricketApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
        // Get only LIVE matches (ms === "live")
        data = await getLiveMatches(noCache);
        break;
      case "upcoming":
        // Get only UPCOMING matches (ms === "fixture")
        data = await getUpcomingMatches();
        break;
      case "completed":
        // Get only COMPLETED matches (ms === "result")
        data = await getCompletedMatches();
        break;
      case "all":
        // Get all matches categorized
        data = await getAllMatchesCategorized(noCache);
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
