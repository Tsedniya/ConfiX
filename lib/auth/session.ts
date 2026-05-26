// lib/auth/session.ts
import { NextRequest } from "next/server";
import { verifyAccessToken } from "../auth";   // Make sure to import from correct file

export type SessionUser = {
  userId: string;
  role: string;
  email?: string;
  name?: string;
};

export async function getSession(request: NextRequest): Promise<SessionUser | null> {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return await verifyAccessToken(token);   // Changed to verifyAccessToken
  } catch {
    return null;
  }
}

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