// lib/auth/roleMiddleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../auth";     // ← Fixed import

export function authorizeRoles(allowedRoles: string[]) {
  return async (req: NextRequest) => {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please login" },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Forbidden: You don't have permission to access this resource." 
        },
        { status: 403 }
      );
    }

    (req as any).user = user;
    return null;
  };
}