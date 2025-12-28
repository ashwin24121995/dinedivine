import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Restricted states where users cannot register
const RESTRICTED_STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Assam",
  "Odisha",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, mobile, dateOfBirth, state } = body;

    // Validate required fields
    if (!email || !password || !fullName || !mobile || !state) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate mobile number (Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number. Please enter a valid 10-digit Indian mobile number" },
        { status: 400 }
      );
    }

    // Check for restricted states
    if (RESTRICTED_STATES.includes(state)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Sorry, users from ${state} are not allowed to register on this platform due to state regulations.` 
        },
        { status: 403 }
      );
    }

    // Check if email already exists
    const existingEmail = await query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    // Check if mobile already exists
    const existingMobile = await query<RowDataPacket[]>(
      "SELECT id FROM users WHERE mobile = ?",
      [mobile]
    );
    if (existingMobile.length > 0) {
      return NextResponse.json(
        { success: false, error: "Mobile number already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user into database
    const result = await query<ResultSetHeader>(
      `INSERT INTO users (email, password, full_name, mobile, date_of_birth, state) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, fullName, mobile, dateOfBirth || null, state]
    );

    const userId = result.insertId;

    // Generate JWT token
    const token = await generateToken({
      id: userId,
      email,
      fullName,
      mobile,
    });

    // Set auth cookie
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: {
        id: userId,
        email,
        fullName,
        mobile,
        state,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
