import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";
import OrganizerApplication from "@/models/OrganizerApplication";

import { getSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  try {
    // 1. Connect DB
    await connectDB();

    // 2. Check session
    const session = await getSession(req);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 3. Only admin allowed
    if (session.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // 4. Fetch applications
    const applications =
      await OrganizerApplication.find()

        // populate applicant info
        .populate("userId", "name email role status")

        // newest first
        .sort({ createdAt: -1 });

    // 5. Return clean response
    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}