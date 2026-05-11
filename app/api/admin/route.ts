import { NextRequest, NextResponse } from "next/server";
import { authorizeRoles } from "@/lib/auth-middleware/roleMiddleware";

const withAdmin = authorizeRoles(["admin"]);

export async function GET(req: NextRequest) {
  const authError = await withAdmin(req);
  if (authError) return authError;   // Return 401 or 403 if blocked

  return NextResponse.json({ 
    message: "Welcome, Admin!" 
  });
}