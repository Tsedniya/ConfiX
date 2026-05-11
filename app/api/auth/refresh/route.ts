// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(request: NextRequest) {   // ← Change to NextRequest
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = await verifyToken(refreshToken);

    // Generate new tokens
    const newAccessToken = await generateAccessToken(payload);
    const newRefreshToken = await generateRefreshToken(payload);

    const response = NextResponse.json({ success: true });

    // Set new Access Token
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    // Rotate Refresh Token
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { success: false, message: "Invalid refresh token" },
      { status: 401 }
    );

    response.cookies.delete("token");
    response.cookies.delete("refreshToken");

    return response;
  }
}