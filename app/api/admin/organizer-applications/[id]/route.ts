// app/api/admin/organizer-applications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrganizerApplication from "@/models/OrganizerApplication";
import User from "@/models/User";
import { requireRole } from "@/lib/auth/session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const admin = await requireRole(req, ["admin"]);

    const { id } = await params;
    const { status, reason } = await req.json();

    console.log("🔍 Review Request:", {
      applicationId: id,
      status,
      adminId: admin.userId,
    });

    const application = await OrganizerApplication.findById(id);

    if (!application) {
      console.error("❌ Application not found with ID:", id);

      return NextResponse.json(
        {
          message: "Application not found",
          requestedId: id,
        },
        { status: 404 }
      );
    }

    console.log("✅ Application found:", application._id);

    if (application.status !== "pending") {
      return NextResponse.json(
        { message: "Application is no longer pending" },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      reviewedBy: admin.userId,
      reviewedAt: new Date(),
    };

    if (status === "rejected" && reason) {
      updateData.rejectionReason = reason;
    }

    const updatedApplication =
      await OrganizerApplication.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).populate("userId", "name email");

    if (status === "approved") {
      await User.findByIdAndUpdate(application.userId, {
        role: "organizer",
        status: "active",
      });
    }

    return NextResponse.json({
      message: `Application ${status} successfully`,
      application: updatedApplication,
    });
  } catch (error: any) {
    console.error("Review error:", error);

    return NextResponse.json(
      { message: error.message || "Failed to update application" },
      { status: 500 }
    );
  }
}