import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import DivyangApplication from "@/models/DivyangApplication";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest
) {
  try {
    await connectDB();

    const {
      searchParams,
    } = new URL(request.url);

    const applicationId =
      searchParams
        .get("applicationId")
        ?.trim()
        .toUpperCase();

    const mobile =
      searchParams
        .get("mobile")
        ?.trim();

    if (
      !applicationId &&
      !mobile
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID or mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    const query: Record<
      string,
      string
    > = {};

    if (applicationId) {
      query.applicationId =
        applicationId;
    }

    if (mobile) {
      query.mobile =
        mobile;
    }

    const application =
      await DivyangApplication.findOne(
        query
      )
        .select(
          "-aadhaarNumber"
        )
        .lean();

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

    return NextResponse.json({
      success: true,

      application,
    });
  } catch (error) {
    console.error(
      "DIVYANG STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to check application status.",
      },
      {
        status: 500,
      }
    );
  }
}