import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    // Remove auth cookie
    await removeAuthCookie();

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Remove auth cookie
    await removeAuthCookie();

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed. Please try again." },
      { status: 500 }
    );
  }
}
