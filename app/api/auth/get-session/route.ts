import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const user = await getSession(request);

    return NextResponse.json({
      success: true,
      user: user
        ? {
            id: user.userId,
            email: user.email,
            role: user.role,
            name: user.name,
          }
        : null,
    });
  } catch (error) {
    console.error("Get session error:", error);

    return NextResponse.json({
      success: true,
      user: null,
    });
  }
}