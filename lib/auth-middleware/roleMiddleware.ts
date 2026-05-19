import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function authorizeRoles(
  req: NextRequest,
  allowedRoles: string[]
) {
  const user = await getSession(req);

  if (!user) {
    return {
      error: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      ),
      user: null,
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      error: NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      ),
      user: null,
    };
  }

  return { user, error: null };
}