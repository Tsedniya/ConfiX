import bcrypt from "bcryptjs";
import User from "@/models/User";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const { name, email, password, role = "attendee" } = data;

  // Validate allowed roles for self-registration
  if (!["attendee", "speaker"].includes(role)) {
    const error: any = new Error("Only Attendee and Speaker can register directly");
    error.status = 400;
    throw error;
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error: any = new Error("User with this email already exists");
    error.status = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isApproved: role === "attendee" ? true : false, // Speaker needs approval
  });

  // Return user without password
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isApproved: user.isApproved,
  };
};