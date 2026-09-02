import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    certificateId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { certificateId } =
      await context.params;

    const certificateIdValue =
      decodeURIComponent(
        certificateId || ""
      )
        .trim()
        .toUpperCase();

    if (!certificateIdValue) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message:
            "Certificate ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const student =
      await Student.findOne({
        certificateId:
          certificateIdValue,
      }).lean();

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message:
            "Certificate not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      !student.certificateEligible
    ) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message:
            "This certificate is not eligible for verification.",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        valid: true,
        message:
          "Certificate successfully verified.",

        data: {
          certificateId:
            student.certificateId,

          studentId:
            student.studentId,

          fullName:
            student.fullName,

          course:
            student.course,

          certificateEligible:
            student.certificateEligible,

          issuedAt:
            student.updatedAt,

          organization:
            "Anand Jivan Foundation Trust",
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "CERTIFICATE VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        valid: false,
        message:
          "Unable to verify certificate. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}