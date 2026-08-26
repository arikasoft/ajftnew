import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import HealthHelpRequest from "@/models/HealthHelpRequest";
import { requireAdmin } from "@/lib/admin-auth";

type Context = {
  params: Promise<{
    requestId: string;
  }>;
};

const allowedStatuses = [
  "pending",
  "reviewing",
  "assistance",
  "completed",
  "closed",
] as const;

type HealthStatus =
  (typeof allowedStatuses)[number];

export async function POST(
  request: Request,
  context: Context
) {
  try {
    /* =====================================================
       ADMIN AUTH
    ===================================================== */

    const auth =
      await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    const { requestId } =
      await context.params;

    const normalizedRequestId =
      String(requestId || "")
        .trim()
        .toUpperCase();

    if (!normalizedRequestId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Request ID is required.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       REQUEST BODY
    ===================================================== */

    let body: any = {};

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid JSON request.",
        },
        { status: 400 }
      );
    }

    const newStatus =
      String(body?.status || "")
        .trim()
        .toLowerCase() as HealthStatus;

    const adminNote =
      String(
        body?.adminNote ?? ""
      ).trim();

    /* =====================================================
       STATUS VALIDATION
    ===================================================== */

    if (
      !allowedStatuses.includes(
        newStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid health request status.",
          allowedStatuses,
        },
        { status: 400 }
      );
    }

    /* =====================================================
       FIND REQUEST
    ===================================================== */

    const healthRequest =
      await HealthHelpRequest.findOne({
        requestId:
          normalizedRequestId,
      });

    if (!healthRequest) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Health help request not found.",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       PREVIOUS DATA
    ===================================================== */

    const previousStatus =
      healthRequest.status;

    const previousNote =
      healthRequest.adminNote || "";

    /* =====================================================
       UPDATE
    ===================================================== */

    healthRequest.status =
      newStatus;

    healthRequest.adminNote =
      adminNote;

    await healthRequest.save();

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json({
      success: true,

      message:
        "Health help request updated successfully.",

      requestId:
        healthRequest.requestId,

      previousStatus,

      status:
        healthRequest.status,

      previousNote,

      adminNote:
        healthRequest.adminNote,

      updatedBy:
        auth.admin.email,

      updatedAt:
        healthRequest.updatedAt,

      request:
        healthRequest,
    });

  } catch (error) {
    console.error(
      "HEALTH HELP ACTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update health help request.",
      },
      { status: 500 }
    );
  }
}