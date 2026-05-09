import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(token: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
      email?: string;
      name?: string;
    };
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}