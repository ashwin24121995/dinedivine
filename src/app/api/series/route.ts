import { NextRequest, NextResponse } from "next/server";
import { getSeries } from "@/lib/cricketApi";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get("offset") || "0");

    const series = await getSeries(offset);

    return NextResponse.json({
      success: true,
      data: series,
      count: series.length,
    });
  } catch (error) {
    console.error("Error in series API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch series",
      },
      { status: 500 }
    );
  }
}
