import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// This endpoint is designed to be called by external cron services (like cron-job.org, Vercel Cron, Railway Cron, etc.)
// It triggers the contest sync process

export async function GET(request: NextRequest) {
  try {
    // Optional: Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // If CRON_SECRET is set, require authorization
      // If not set, allow public access (for testing)
      if (cronSecret) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 }
        );
      }
    }
    
    // Get the base URL for internal API calls
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                    "http://localhost:3000";
    
    // Call the sync API
    const syncResponse = await fetch(`${baseUrl}/api/contests/sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const syncResult = await syncResponse.json();
    
    return NextResponse.json({
      success: true,
      message: "Cron job executed successfully",
      timestamp: new Date().toISOString(),
      syncResult,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Cron job failed",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
