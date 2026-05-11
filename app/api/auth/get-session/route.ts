// app/api/auth/get-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {   // ← Also change here
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.userId,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Get session error:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}