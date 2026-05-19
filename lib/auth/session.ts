// lib/auth/session.ts
import { NextRequest } from "next/server";
import { verifyToken } from "../auth";

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
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireUser(request: NextRequest): Promise<SessionUser> {
  const user = await getSession(request);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function requireRole(
  request: NextRequest,
  allowedRoles: string[]
): Promise<SessionUser> {
  const user = await requireUser(request);

  if (!allowedRoles.includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  return user;
}