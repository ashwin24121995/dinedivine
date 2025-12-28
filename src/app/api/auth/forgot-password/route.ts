import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import crypto from "crypto";

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  full_name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const users = await query<UserRow[]>(
      "SELECT id, email, full_name FROM users WHERE email = ?",
      [email]
    );

    // Always return success to prevent email enumeration
    if (users.length === 0) {
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const user = users[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await query<ResultSetHeader>(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
      [user.id, resetToken, expiresAt]
    );

    // In production, you would send an email here
    // For now, we'll just log the token (remove in production)
    console.log(`Password reset token for ${email}: ${resetToken}`);

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
      // Remove this in production - only for testing
      debug: process.env.NODE_ENV === "development" ? { token: resetToken } : undefined,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
