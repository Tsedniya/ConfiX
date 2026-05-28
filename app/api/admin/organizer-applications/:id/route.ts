import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db";

import OrganizerApplication from "@/models/OrganizerApplication";
import User from "@/models/User";

import { getSession } from "@/lib/auth/session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // 3. Admin only
    if (session.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // 4. Get request body
    const body = await req.json();

    const { status } = body;

    // 5. Validate status
    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        {
          message:
            "Status must be approved or rejected",
        },
        { status: 400 }
      );
    }

    // 6. Find application
    const application =
      await OrganizerApplication.findById(params.id);

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    // 7. Prevent double review
    if (application.status !== "pending") {
      return NextResponse.json(
        {
          message:
            "Application already reviewed",
        },
        { status: 400 }
      );
    }

    // 8. Update application
    application.status = status;

    application.reviewedBy = session.userId;

    application.reviewedAt = new Date();

    await application.save();

    // 9. If approved → upgrade user
    if (status === "approved") {
      await User.findByIdAndUpdate(
        application.userId,
        {
          role: "organizer",
          isApproved: true,
          status: "active",
        }
      );
    }

    // 10. If rejected → keep attendee role
    if (status === "rejected") {
      await User.findByIdAndUpdate(
        application.userId,
        {
          role: "attendee",
          isApproved: true,
          status: "active",
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Application ${status} successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to update application",
      },
      { status: 500 }
    );
  }
}