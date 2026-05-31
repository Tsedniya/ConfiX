// lib/auth/session.ts
import { NextRequest } from "next/server";
import { verifyAccessToken } from "../auth";

export type SessionUser = {
  userId: string;
  role: string;
  email?: string;
  name?: string;
};

export async function getSession(request: NextRequest): Promise<SessionUser | null> {
  // Debug: Check all cookies
  console.log("All cookies:", request.cookies.getAll().map(c => c.name));

  const token = request.cookies.get("token")?.value;

  console.log("Token from cookie:", token ? "✅ Found" : "❌ Not found");

  if (!token) {
    console.log("No token cookie found → Unauthorized");
    return null;
  }

  try {
    const user = await verifyAccessToken(token);
    console.log("Session decoded successfully:", { userId: user.userId, role: user.role });
    return user;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

// Keep your other functions
export async function requireUser(request: NextRequest): Promise<SessionUser> {
  const user = await getSession(request);
  if (!user) {
    const error: any = new Error("UNAUTHORIZED");
    error.status = 401;
    throw error;
  }
  return user;
}

export async function requireRole(
  request: NextRequest,
  allowedRoles: string[]
): Promise<SessionUser> {
  const user = await requireUser(request);
  if (!allowedRoles.includes(user.role)) {
    const error: any = new Error("FORBIDDEN");
    error.status = 403;
    throw error;
  }
  return user;
}