import { NextRequest, NextResponse } from "next/server";
import { authorizeRoles } from "@/lib/auth-middleware/authorize";

export async function GET(req: NextRequest) {
  const { error } = await authorizeRoles(req, ["admin"]);
  if (error) return error;   // Return 401 or 403 if blocked

  return NextResponse.json({ 
    message: "Welcome, Admin!" 
  });
}