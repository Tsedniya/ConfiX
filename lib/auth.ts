import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export type UserPayload = {
  userId: string;
  role: string;
  email?: string;
  name?: string;
};

// ======================
// ACCESS TOKEN (15 minutes)
// ======================
export async function generateAccessToken(payload: UserPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

// ======================
// REFRESH TOKEN (7 days)
// ======================
export async function generateRefreshToken(payload: UserPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

// ======================
// VERIFY ACCESS TOKEN
// ======================
export async function verifyAccessToken(token: string): Promise<UserPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      userId: payload.userId as string,
      role: payload.role as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

// ======================
// VERIFY REFRESH TOKEN (if needed later)
// ======================
export async function verifyRefreshToken(token: string): Promise<UserPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      role: payload.role as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
}