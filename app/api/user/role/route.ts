import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import User from "@/lib/models/user";

export async function POST(req: Request) {
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

  await User.findOneAndUpdate(
    { email: session.user.email },
    { role }
  );

  return NextResponse.json({ success: true });
}