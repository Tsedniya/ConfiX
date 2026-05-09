import bcrypt from "bcryptjs";
import User from "@/models/User";
import jwt from "jsonwebtoken";

type LoginInput = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginInput) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}