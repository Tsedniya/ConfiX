import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { loginUser } from "@/features/auth/services/login";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await loginUser(body);

    // Check account status (replace legacy `isApproved` check)
    if (user.status === "pending") {
      return NextResponse.json({
        success: false,
        message: "Your account is pending approval by admin"
      }, { status: 403 });
    }

    const payload = {
      userId: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

    // Set Access Token (short lived)
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,           // 15 minutes
    });

    // Set Refresh Token (long lived)
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,   // 7 days
    });

    return response;

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Invalid credentials" 
      },
      { status: 401 }
    );
  }
}