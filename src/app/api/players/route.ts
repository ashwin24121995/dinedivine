import { NextRequest, NextResponse } from "next/server";
import { searchPlayers, getPlayerInfo } from "@/lib/cricketApi";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const id = searchParams.get("id");
    const offset = parseInt(searchParams.get("offset") || "0");

    // If ID is provided, get specific player info
    if (id) {
      const player = await getPlayerInfo(id);
      if (!player) {
        return NextResponse.json(
          {
            success: false,
            error: "Player not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: player,
      });
    }

    // If search query is provided, search for players
    if (search) {
      const players = await searchPlayers(search, offset);
      return NextResponse.json({
        success: true,
        data: players,
        count: players.length,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Please provide a search query or player ID",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in players API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch player data",
      },
      { status: 500 }
    );
  }
}
