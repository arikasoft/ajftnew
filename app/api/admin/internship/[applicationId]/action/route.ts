import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

type Context = {
  params: Promise<{
    applicationId: string;
  }>;
};

const allowedActions = [
  "PHYSICAL_RECEIVED",
  "APPROVE",
  "START",
  "COMPLETE",
];

export async function POST(
  request: Request,
  context: Context
) {
  try {
    await connectDB();

    const { applicationId } =
      await context.params;

    const body =
      await request.json();

    const action =
      String(body.action || "").toUpperCase();

    if (
      !allowedActions.includes(action)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action.",
        },
        { status: 400 }
      );
    }

    const application =
      await InternshipApplication.findOne({
        applicationId:
          applicationId.toUpperCase(),
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found.",
        },
        { status: 404 }
      );
    }

    /* ==========================================
       PHYSICAL RECEIVED
    ========================================== */

    if (
      action ===
      "PHYSICAL_RECEIVED"
    ) {
      if (
        application.physicalReceived
      ) {
        return NextResponse.json({
          success: true,
          message:
            "Physical application already received.",
          application,
        });
      }

      application.physicalReceived =
        true;

      application.physicalReceivedAt =
        new Date();

      application.status =
        "PHYSICAL_RECEIVED";
    }

    /* ==========================================
       APPROVE
    ========================================== */

    if (action === "APPROVE") {
      if (
        !application.physicalReceived
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Physical application must be received before approval.",
          },
          { status: 400 }
        );
      }

      if (
        application.status ===
        "APPROVED"
      ) {
        return NextResponse.json({
          success: true,
          message:
            "Application already approved.",
          application,
        });
      }

      application.status =
        "APPROVED";

      application.approvedAt =
        new Date();

      application.internId =
        application.applicationId;
    }

    /* ==========================================
       START INTERNSHIP
    ========================================== */

    if (action === "START") {
      if (
        application.status !==
          "APPROVED" &&
        application.status !==
          "ID_CARD_GENERATED"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Application must be approved before starting internship.",
          },
          { status: 400 }
        );
      }

      application.status =
        "INTERNSHIP_ACTIVE";
    }

    /* ==========================================
       COMPLETE
    ========================================== */

    if (action === "COMPLETE") {
      if (
        application.status !==
        "INTERNSHIP_ACTIVE"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Internship must be active before completion.",
          },
          { status: 400 }
        );
      }

      application.status =
        "COMPLETED";

      application.completedAt =
        new Date();

      application.certificateEligible =
        true;

      application.certificatePaymentStatus =
        "PENDING";
    }

    await application.save();

    return NextResponse.json({
      success: true,
      message:
        `Application updated: ${action}`,
      application,
    });

  } catch (error) {

    console.error(
      "INTERNSHIP ACTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update application.",
      },
      { status: 500 }
    );
  }
}