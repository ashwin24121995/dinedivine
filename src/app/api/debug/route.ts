import { NextResponse } from "next/server";
import { testConnection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 20) || "NOT_SET",
      JWT_SECRET: !!process.env.JWT_SECRET,
      Casino_API_KEY: !!process.env.Casino_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
    };

    // Test database connection
    let dbConnected = false;
    let dbError = null;
    
    try {
      dbConnected = await testConnection();
    } catch (error) {
      dbError = error instanceof Error ? error.message : "Unknown error";
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      database: {
        connected: dbConnected,
        error: dbError,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
