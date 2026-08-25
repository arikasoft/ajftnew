import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

export async function GET(
  request: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const applicationId =
      searchParams
        .get("applicationId")
        ?.trim()
        .toUpperCase();

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        { status: 400 }
      );
    }

    const application =
      await InternshipApplication.findOne({
        applicationId,
      }).lean();

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

    if (
      application.certificatePaymentStatus !==
      "PAID"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate payment has not been verified.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,

      application: {
        applicationId:
          application.applicationId,

        student: {
          name:
            application.student?.name || "",

          email:
            application.student?.email || "",
        },

        internship: {
          area:
            application.internship?.area || "",

          duration:
            application.internship?.duration ||
            "",
        },

        status:
          application.status,

        certificatePaymentStatus:
          application.certificatePaymentStatus,

        certificateEligible:
          application.certificateEligible,
      },
    });
  } catch (error) {
    console.error(
      "CERTIFICATE SUCCESS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to verify certificate payment.",
      },
      { status: 500 }
    );
  }
}