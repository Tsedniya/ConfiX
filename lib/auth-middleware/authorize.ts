import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export type AuthResult = {
  user: any | null;
  error: NextResponse | null;
};

export async function authorizeRoles(
  req: NextRequest,
  allowedRoles: string[]
): Promise<AuthResult> {
  try {
    const user = await getSession(req);

    if (!user) {
      return {
        user: null,
        error: NextResponse.json(
          { success: false, message: "Unauthorized - Please log in" },
          { status: 401 }
        ),
      };
    }

    if (!allowedRoles.includes(user.role)) {
      return {
        user: null,
        error: NextResponse.json(
          { 
            success: false, 
            message: `Access denied. Required role: ${allowedRoles.join(" or ")}` 
          },
          { status: 403 }
        ),
      };
    }

    return { user, error: null };

  } catch (err) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 500 }
      ),
    };
  }
}