import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrganizerApplication from "@/models/OrganizerApplication";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ❗ RULE 2: Always trust session (NOT frontend)
    const session = await getSession(req);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      organizationName,
      position,
      website,
      motivation,
      expectedEvents,
    } = body;

    // basic validation
    if (!organizationName || !position || !motivation) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ❗ RULE 1: Prevent multiple pending applications
    const existing = await OrganizerApplication.findOne({
      userId: session.userId,
      status: "pending",
    });

    if (existing) {
      return NextResponse.json(
        {
          message:
            "You already have a pending application",
        },
        { status: 400 }
      );
    }

    // create application
    const application =
      await OrganizerApplication.create({
        userId: session.userId, // ALWAYS from session
        organizationName,
        position,
        website,
        motivation,
        expectedEvents,
        status: "pending",
      });

    return NextResponse.json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.message || "Failed to submit application",
      },
      { status: 500 }
    );
  }
}