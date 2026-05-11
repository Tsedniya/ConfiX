// lib/auth.ts
import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export type UserPayload = {
  userId: string;
  role: string;
  email?: string;
  name?: string;
};

// Generate Access Token (Short lived)
export async function generateAccessToken(payload: UserPayload) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")        // 15 minutes
    .sign(secret);
}

// Generate Refresh Token (Long lived)
export async function generateRefreshToken(payload: UserPayload) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")         // 7 days
    .sign(secret);
}

export async function verifyToken(token: string): Promise<UserPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      role: payload.role as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    throw new Error("Invalid or expired token");
  }
}

export async function getCurrentUser(request: NextRequest): Promise<UserPayload | null> {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}