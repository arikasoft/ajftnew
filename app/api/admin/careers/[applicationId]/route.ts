import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { requireAdmin } from "@/lib/admin-auth";

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
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { applicationId } =
      await context.params;

    const application =
      await CareerApplication.findOne({
        applicationId:
          applicationId.toUpperCase(),
      }).lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });

  } catch (error) {
    console.error(
      "CAREER DETAIL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load career application.",
      },
      { status: 500 }
    );
  }
}