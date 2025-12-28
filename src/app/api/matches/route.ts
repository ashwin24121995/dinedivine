import { NextRequest, NextResponse } from "next/server";
import { 
  getCurrentMatches, 
  getCricScore,
  getLiveMatches,
  getUpcomingMatches,
  getCompletedMatches,
  getAllMatchesCategorized,
  getMatchesList 
} from "@/lib/cricketApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status"); // live, upcoming, completed, all
    const source = searchParams.get("source"); // cricscore, current, list
    const offset = parseInt(searchParams.get("offset") || "0");
    const noCache = searchParams.get("nocache") === "true";

    // Use Current Matches API (detailed data with scores)
    if (source === "current") {
      const matches = await getCurrentMatches(offset);
      return NextResponse.json({
        success: true,
        data: matches,
        count: matches.length,
        source: "currentMatches",
        timestamp: new Date().toISOString(),
      });
    }

    // Use Matches List API
    if (source === "list") {
      const matches = await getMatchesList(offset);
      return NextResponse.json({
        success: true,
        data: matches,
        count: matches.length,
        source: "matchesList",
        timestamp: new Date().toISOString(),
      });
    }

    // Default: Use eCricScore API (best for live/upcoming/completed filtering)
    // This API has clear ms field: "fixture" | "live" | "result"
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
        // Get all matches categorized by status
        data = await getAllMatchesCategorized(noCache);
        break;
      default:
        // Return raw eCricScore data
        data = await getCricScore(noCache);
    }

    const count = Array.isArray(data) ? data.length : 
      (data.live?.length || 0) + (data.upcoming?.length || 0) + (data.completed?.length || 0);

    return NextResponse.json({
      success: true,
      data,
      count,
      source: "cricScore",
      filter: status || "none",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/matches:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
