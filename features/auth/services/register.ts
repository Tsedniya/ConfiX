import bcrypt from "bcryptjs";
import User from "@/models/User";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role?: "attendee" | "speaker" | "organizer";
};

export async function registerUser(data: RegisterInput) {
  const { name, email, password, role } = data;

 
  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

 
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }


  const hashedPassword = await bcrypt.hash(password, 10);

 
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "attendee",
  });


  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}