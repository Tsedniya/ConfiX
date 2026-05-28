import bcrypt from "bcryptjs";
import User from "@/models/User";

type RegisterRole = "attendee" | "speaker";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: RegisterRole;
}) => {
  const { name, email, password, role } = data;

  // 1. Basic validation
  if (!name || name.trim().length < 2) {
    const error: any = new Error("Name must be at least 2 characters");
    error.status = 400;
    throw error;
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    const error: any = new Error("Valid email is required");
    error.status = 400;
    throw error;
  }

  if (!password || password.length < 8) {
    const error: any = new Error("Password must be at least 8 characters");
    error.status = 400;
    throw error;
  }

  // 2. Normalize email + role
  const normalizedEmail = email.toLowerCase();
  const normalizedRole = role.toLowerCase() as RegisterRole;

  const allowedRoles: RegisterRole[] = ["attendee", "speaker"];

  if (!allowedRoles.includes(normalizedRole)) {
    const error: any = new Error("Invalid role selected");
    error.status = 400;
    throw error;
  }

  // 3. Check existing user
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    const error: any = new Error("User with this email already exists");
    error.status = 409;
    throw error;
  }

  // 4. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. Create user
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: normalizedRole,

    // IMPORTANT: matches new User model
    status: "active",
  });

  // 6. Return safe response
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};