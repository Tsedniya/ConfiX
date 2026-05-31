import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrganizerApplication from "@/models/OrganizerApplication";
import { requireRole } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    await requireRole(req, ["admin"]);

    const applications = await OrganizerApplication.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ applications });
  } catch (error: any) {
    console.error("Fetch applications error:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}