import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { registerUser } from "@/features/auth/services/register";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const user = await registerUser(body);

    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Registration failed" },
      { status: 400 }
    );
  }
}