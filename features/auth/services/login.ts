// features/auth/services/login.ts
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

type LoginInput = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginInput) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Prepare payload
  const payload = {
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
    name: user.name,
  };

  // Generate both tokens
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,   // ← New
    refreshToken,  // ← New
  };
}