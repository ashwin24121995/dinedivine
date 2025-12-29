import { NextRequest, NextResponse } from "next/server";
import { getMatchInfo, getMatchSquad } from "@/lib/cricketApi";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const includeSquad = searchParams.get("squad") === "true";

    const matchInfo = await getMatchInfo(id);

    if (!matchInfo) {
      return NextResponse.json(
        {
          success: false,
          error: "Match not found",
        },
        { status: 404 }
      );
    }

    let squad = null;
    if (includeSquad) {
      squad = await getMatchSquad(id);
    }

    return NextResponse.json({
      success: true,
      match: matchInfo,
      squad: squad,
    });
  } catch (error) {
    console.error("Error in match detail API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch match details",
      },
      { status: 500 }
    );
  }
}
