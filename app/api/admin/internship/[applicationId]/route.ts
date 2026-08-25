import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

type Context = {
  params: Promise<{
    applicationId: string;
  }>;
};

export async function GET(
  _request: Request,
  context: Context
) {
  try {
    await connectDB();

    const { applicationId } =
      await context.params;

    const application =
      await InternshipApplication.findOne({
        applicationId:
          applicationId.toUpperCase(),
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

    return NextResponse.json({
      success: true,
      application,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load application.",
      },
      { status: 500 }
    );
  }
}