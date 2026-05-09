import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { loginUser } from "@/features/auth/services/login";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { user, token } = await loginUser(body);

    // create response
    const response = NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );

    // 🍪 SEND COOKIE HERE
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Login failed",
      },
      { status: 400 }
    );
  }
}