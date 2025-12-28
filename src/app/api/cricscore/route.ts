import { NextRequest, NextResponse } from "next/server";
import { getCricScore, getLiveMatches, getUpcomingMatches, getCompletedMatches, getAllMatchesCategorized } from "@/lib/cricketApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // live, upcoming, completed, all
    const noCache = searchParams.get("nocache") === "true";

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
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/cricscore:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
