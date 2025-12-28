import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  full_name: string;
  mobile: string;
  date_of_birth: string | null;
  state: string | null;
  is_verified: boolean;
  created_at: string;
}

export async function GET() {
  try {
    // Get current user from cookie
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get full user details from database
    const users = await query<UserRow[]>(
      `SELECT id, email, full_name, mobile, date_of_birth, state, is_verified, created_at 
       FROM users WHERE id = ?`,
      [currentUser.id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        mobile: user.mobile,
        dateOfBirth: user.date_of_birth,
        state: user.state,
        isVerified: user.is_verified,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get user information" },
      { status: 500 }
    );
  }
}
