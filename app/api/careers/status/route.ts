import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const applicationId =
      String(
        searchParams.get(
          "applicationId"
        ) || ""
      )
        .trim()
        .toUpperCase();

    const email =
      String(
        searchParams.get("email") || ""
      )
        .trim()
        .toLowerCase();

    if (!applicationId || !email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID and email are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const application =
      await CareerApplication.findOne({
        applicationId,
        email,
      }).lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found. Please check your Application ID and email.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,

      application: {
        applicationId:
          application.applicationId,

        fullName:
          application.fullName,

        email:
          application.email,

        phone:
          application.phone,

        jobTitle:
          application.jobTitle,

        department:
          application.department,

        location:
          application.location,

        employmentType:
          application.employmentType,

        status:
          application.status ||
          "Submitted",

        stage:
          application.stage ||
          "Application Submitted",

        submittedAt:
          application.createdAt,

        updatedAt:
          application.updatedAt,

        remarks:
          application.adminRemarks ||
          "",
      },
    });
  } catch (error) {
    console.error(
      "CAREER STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to check application status.",
      },
      { status: 500 }
    );
  }
}