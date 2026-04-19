import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import User from "@/lib/models/user";
import connectDB from "@/lib/db";
import mongoose from "mongoose";


export async function POST(req: Request) {

  await connectDB();
  // 👇 ADD IT HERE
  console.log("ALL HEADERS:", req.headers);
console.log("COOKIE STRING:", req.headers.get("cookie"));
  console.log("COOKIE HEADER:", req.headers.get("cookie"));

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  console.log("SESSION:", session);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role } = await req.json();

  await mongoose.connection.collection("users").updateOne(
  { _id: new mongoose.Types.ObjectId(session.user.id) },
  { $set: { role } }
);

  return NextResponse.json({ success: true });
}