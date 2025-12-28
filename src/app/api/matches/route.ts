import { NextRequest, NextResponse } from "next/server";
import { getCurrentMatches, getMatches } from "@/lib/cricketApi";
import { isMatchLive, isMatchUpcoming, isMatchCompleted } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status"); // upcoming, live, completed
    const type = searchParams.get("type"); // current, fixtures
    const offset = parseInt(searchParams.get("offset") || "0");

    let matches;

    if (type === "fixtures") {
      matches = await getMatches(offset);
    } else {
      matches = await getCurrentMatches(offset);
    }

    // Filter by status if provided using proper status checks
    if (status === "live") {
      matches = matches.filter((m) => isMatchLive(m));
    } else if (status === "upcoming") {
      matches = matches.filter((m) => isMatchUpcoming(m));
    } else if (status === "completed") {
      matches = matches.filter((m) => isMatchCompleted(m));
    }

    return NextResponse.json({
      success: true,
      data: matches,
      count: matches.length,
    });
  } catch (error) {
    console.error("Error in matches API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch matches",
      },
      { status: 500 }
    );
  }
}
