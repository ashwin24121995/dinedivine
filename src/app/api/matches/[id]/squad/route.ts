import { NextRequest, NextResponse } from "next/server";
import { getMatchSquad } from "@/lib/cricketApi";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Match ID is required" },
        { status: 400 }
      );
    }

    const squadData = await getMatchSquad(id);

    if (!squadData || squadData.length === 0) {
      return NextResponse.json({
        success: true,
        squads: [],
        message: "No squad data available for this match",
      });
    }

    // Transform the squad data
    const squads = squadData.map((team) => ({
      teamName: team.teamName,
      shortname: team.shortname,
      img: team.img,
      players: team.players.map((player) => ({
        id: player.id,
        name: player.name,
        role: player.role || "Batsman",
        battingStyle: player.battingStyle,
        bowlingStyle: player.bowlingStyle,
        country: player.country,
        playerImg: player.playerImg,
      })),
    }));

    return NextResponse.json({
      success: true,
      squads,
    });
  } catch (error) {
    console.error("Error fetching match squad:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch squad data" },
      { status: 500 }
    );
  }
}
