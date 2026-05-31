import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { loginUser } from "@/features/auth/services/login";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await loginUser(body);

    // Check account status
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
    // const refreshToken = await generateRefreshToken(payload); // Uncomment if you need it

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

    // Set Access Token Cookie (Main token used in getSession)
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,        // 15 minutes
    });

    return response;

  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Invalid credentials"
    }, { status: 401 });
  }
}