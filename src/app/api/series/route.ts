import { NextRequest, NextResponse } from "next/server";
import { getSeriesList, searchSeries } from "@/lib/cricketApi";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get("offset") || "0");
    const query = searchParams.get("search");

    let series;
    
    if (query) {
      // Search series by name
      series = await searchSeries(query, offset);
    } else {
      // Get all series
      series = await getSeriesList(offset);
    }

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
