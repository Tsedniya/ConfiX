import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export type UserPayload = {
  userId: string;
  role: string;
  email?: string;
  name?: string;
};

// ======================
// ACCESS TOKEN (short-lived)
// ======================
export async function generateAccessToken(payload: UserPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

// ======================
// REFRESH TOKEN (long-lived)
// ======================
export async function generateRefreshToken(payload: UserPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

// ======================
// VERIFY TOKEN (pure JWT logic)
// ======================
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