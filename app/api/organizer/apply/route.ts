import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrganizerApplication from "@/models/OrganizerApplication";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Temporary bypass for testing
    const testUserId = "67a1b2c3d4e5f67890123456"; // ← Put any valid user ObjectId here

    const body = await req.json();

    const {
      organizationName,
      position,
      website,
      motivation,
      expectedEvents,
    } = body;

    if (!organizationName || !position || !motivation) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const application = await OrganizerApplication.create({
      userId: testUserId,
      organizationName,
      position,
      website,
      motivation,
      expectedEvents,
      status: "pending",
    });

    return NextResponse.json({
      message: "Application submitted successfully (test mode)",
      application,
    });
  } catch (error: any) {
    console.error("Apply organizer error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}