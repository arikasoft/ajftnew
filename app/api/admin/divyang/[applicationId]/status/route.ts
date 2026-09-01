import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import DivyangApplication from "@/models/DivyangApplication";
import DivyangStatusHistory from "@/models/DivyangStatusHistory";

export const runtime = "nodejs";

const VALID_STATUSES = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "DOCUMENT_VERIFICATION",
  "FIELD_VERIFICATION",
  "DOCUMENT_REQUIRED",
  "APPROVED",
  "ASSISTANCE_PROCESSING",
  "COMPLETED",
  "REJECTED",
] as const;

function getStatusTitle(status: string) {
  const titles: Record<string, string> = {
    SUBMITTED: "Application Submitted",
    UNDER_REVIEW: "Application Under Review",
    DOCUMENT_VERIFICATION: "Document Verification Started",
    FIELD_VERIFICATION: "Field Verification Started",
    DOCUMENT_REQUIRED: "Additional Documents Required",
    APPROVED: "Application Approved",
    ASSISTANCE_PROCESSING: "Assistance Processing Started",
    COMPLETED: "Assistance Completed",
    REJECTED: "Application Rejected",
  };

  return titles[status] || "Application Status Updated";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;

    await connectDB();

    const body = await request.json();

    const status = String(body.status || "")
      .trim()
      .toUpperCase();

    const message = String(body.message || "").trim();

    const updatedBy = String(
      body.updatedBy || "AJFT ADMIN"
    ).trim();

    if (
      !VALID_STATUSES.includes(
        status as (typeof VALID_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application status.",
        },
        {
          status: 400,
        }
      );
    }

    const application =
      await DivyangApplication.findOne({
        applicationId: applicationId.toUpperCase(),
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found.",
        },
        {
          status: 404,
        }
      );
    }

    const previousStatus = application.status;

    application.status = status as typeof application.status;

    await application.save();

    await DivyangStatusHistory.create({
      applicationId: application.applicationId,
      status,
      title: getStatusTitle(status),
      message:
        message ||
        `Application status changed from ${previousStatus} to ${status}.`,
      updatedBy,
    });

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully.",
      application: {
        applicationId: application.applicationId,
        status: application.status,
      },
    });
  } catch (error) {
    console.error(
      "DIVYANG STATUS UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update application status.",
      },
      {
        status: 500,
      }
    );
  }
}