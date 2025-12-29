import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fullName, mobile } = body;

    // Validate inputs
    if (!fullName || !mobile) {
      return NextResponse.json(
        { success: false, error: "Full name and mobile are required" },
        { status: 400 }
      );
    }

    // Validate mobile format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    // Update user profile
    await query(
      "UPDATE users SET full_name = ?, mobile = ?, updated_at = NOW() WHERE id = ?",
      [fullName, mobile, payload.id]
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
