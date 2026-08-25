import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

export async function GET(request: Request) {
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
            "Application not found. Please check your Application ID.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,

      application: {
        applicationId:
          application.applicationId,

        name:
          application.student?.name || "",

        email:
          application.student?.email || "",

        phone:
          application.student?.phone || "",

        programme:
          application.internship?.area || "",

        duration:
          application.internship?.duration || "",

        startDate:
          application.internship?.startDate || "",

        endDate:
          application.internship?.endDate || "",

        status:
          application.status || "SUBMITTED",

        physicalReceived:
          application.physicalReceived === true,

        certificateEligible:
          application.certificateEligible === true,

        certificatePaymentStatus:
          application.certificatePaymentStatus ||
          "PENDING",

        createdAt:
          application.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "INTERNSHIP STATUS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to check application status.",
      },
      { status: 500 }
    );
  }
}