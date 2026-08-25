import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import InternshipApplication from
  "@/models/InternshipApplication";

import {
  generateInternshipApplicationPDF,
} from "@/lib/internship-pdf";

export async function GET(
  request: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const applicationId =
      searchParams.get(
        "applicationId"
      );

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

    const pdf =
      await generateInternshipApplicationPDF({
        applicationId:
          application.applicationId,

        name:
          application.student.name,

        email:
          application.student.email,

        phone:
          application.student.phone,

        dob:
          application.student.dob,

        address:
          application.student.address,

        city:
          application.student.city,

        state:
          application.student.state,

        pincode:
          application.student.pincode,

        institution:
          application.education
            .institution,

        course:
          application.education.course,

        qualification:
          application.education
            .qualification,

        area:
          application.internship.area,

        duration:
          application.internship.duration,

        startDate:
          application.internship.startDate,

        endDate:
          application.internship.endDate,

        appliedAt:
          application.createdAt,
      });

    return new NextResponse(
      pdf,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `inline; filename="${application.applicationId}.pdf"`,

          "Content-Length":
            String(pdf.length),
        },
      }
    );

  } catch (error) {

    console.error(
      "APPLICATION PDF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to generate application PDF.",
      },
      { status: 500 }
    );
  }
}