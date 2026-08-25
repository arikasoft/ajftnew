import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log(
      "ADMIN INTERNSHIPS API: GET START"
    );

    await connectDB();

    console.log(
      "ADMIN INTERNSHIPS API: DB CONNECTED"
    );

    const applications =
      await InternshipApplication.find({})
        .sort({
          createdAt: -1,
        })
        .limit(100)
        .lean();

    console.log(
      "ADMIN INTERNSHIPS API: FOUND",
      applications.length
    );

    return NextResponse.json(
      {
        success: true,
        applications,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ADMIN INTERNSHIPS GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load internship applications.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const applicationId =
      String(
        body.applicationId || ""
      )
        .trim()
        .toUpperCase();

    const status =
      String(
        body.status || ""
      )
        .trim()
        .toUpperCase();

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application status is required.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedStatuses = [
      "SUBMITTED",
      "PHYSICAL_RECEIVED",
      "VERIFIED",
      "APPROVED",
      "ACTIVE",
      "COMPLETED",
      "CERTIFICATE_ELIGIBLE",
      "PAYMENT_PENDING",
      "CERTIFICATE_GENERATED",
      "REJECTED",
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Invalid status: ${status}`,
        },
        {
          status: 400,
        }
      );
    }

    const application =
      await InternshipApplication.findOne({
        applicationId,
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found.",
        },
        {
          status: 404,
        }
      );
    }

    application.status = status;

    if (
      [
        "PHYSICAL_RECEIVED",
        "VERIFIED",
        "APPROVED",
        "ACTIVE",
        "COMPLETED",
        "CERTIFICATE_ELIGIBLE",
        "PAYMENT_PENDING",
        "CERTIFICATE_GENERATED",
      ].includes(status)
    ) {
      application.physicalReceived =
        true;
    }

    if (
      [
        "CERTIFICATE_ELIGIBLE",
        "PAYMENT_PENDING",
        "CERTIFICATE_GENERATED",
      ].includes(status)
    ) {
      application.certificateEligible =
        true;
    }

    if (
      status === "PAYMENT_PENDING"
    ) {
      application.certificatePaymentStatus =
        "PENDING";
    }

    if (
      status ===
      "CERTIFICATE_GENERATED"
    ) {
      application.certificatePaymentStatus =
        "PAID";
    }

    await application.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Application status updated successfully.",
        application: {
          applicationId:
            application.applicationId,
          status:
            application.status,
          physicalReceived:
            application.physicalReceived,
          certificateEligible:
            application.certificateEligible,
          certificatePaymentStatus:
            application.certificatePaymentStatus,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ADMIN INTERNSHIPS PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update application.",
      },
      {
        status: 500,
      }
    );
  }
}