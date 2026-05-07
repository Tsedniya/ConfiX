import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { loginUser } from "@/features/auth/services/login";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const user = await loginUser(body);

    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Sign in failed" },
      { status: 400 }
    );
  }
}