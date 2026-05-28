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

  const normalizedEmail = email.toLowerCase();

  // 2. Find user
  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // 4. Status check (THIS replaces isApproved)
  if (user.status === "pending") {
    const error: any = new Error(
      "Your account is pending approval"
    );
    error.status = 403;
    throw error;
  }

  if (user.status === "suspended") {
    const error: any = new Error(
      "Your account has been suspended"
    );
    error.status = 403;
    throw error;
  }

  // 5. Return safe user
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};