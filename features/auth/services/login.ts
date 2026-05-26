import bcrypt from "bcryptjs";
import User from "@/models/User";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  // 1. Validate input
  if (!email || !password) {
    const error: any = new Error("Email and password are required");
    error.status = 400;
    throw error;
  }

  // 2. Find user by email
  const user = await User.findOne({ email }).select("+password"); // Important: include password

  if (!user) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // 4. Check if user is approved (Critical for Speaker & Organizer)
  if (!user.isApproved) {
    const error: any = new Error("Your account is pending approval by an administrator");
    error.status = 403;
    throw error;
  }

  // 5. Return user data (without password)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isApproved: user.isApproved,
  };
};