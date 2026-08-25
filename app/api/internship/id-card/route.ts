import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import InternshipApplication from "@/models/InternshipApplication";

import InternshipIdCard from "@/models/InternshipIdCard";

import { generateInternshipIdCard } from "@/lib/internship-id-card";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const applicationId =
      String(
        body.applicationId || ""
      ).toUpperCase();

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

    if (
      application.status !==
        "APPROVED" &&
      application.status !==
        "ID_CARD_GENERATED" &&
      application.status !==
        "INTERNSHIP_ACTIVE"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application must be approved before generating ID card.",
        },
        { status: 400 }
      );
    }

    const existing =
      await InternshipIdCard.findOne({
        applicationId,
      });

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyExists: true,
        cardNumber:
          existing.cardNumber,
        internId:
          existing.internId,
      });
    }

    const internId =
      application.internId ||
      application.applicationId;

    const year =
      new Date().getFullYear();

    const count =
      await InternshipIdCard.countDocuments();

    const cardNumber =
      `AJFT-ID-${year}-${String(
        count + 1
      ).padStart(6, "0")}`;

    const idCard =
      await InternshipIdCard.create({
        applicationId,

        internId,

        cardNumber,

        studentName:
          application.student.name,

        internshipArea:
          application.internship.area,

        duration:
          application.internship.duration,

        startDate:
          application.internship.startDate,

        endDate:
          application.internship.endDate,

        status: "ACTIVE",
      });

    application.status =
      "ID_CARD_GENERATED";

    application.internId =
      internId;

    await application.save();

    const pdf =
      await generateInternshipIdCard({
        internId,

        cardNumber,

        studentName:
          application.student.name,

        internshipArea:
          application.internship.area,

        duration:
          application.internship.duration,

        startDate:
          application.internship.startDate,

        endDate:
          application.internship.endDate,
      });

    return new NextResponse(
      pdf,
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${cardNumber}.pdf"`,

          "Content-Length":
            String(pdf.length),
        },
      }
    );

  } catch (error) {

    console.error(
      "ID CARD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to generate ID card.",
      },
      { status: 500 }
    );
  }
}