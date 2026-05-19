import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { loginUser } from "@/features/auth/services/login";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await loginUser(body);

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
      user,
    });

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}