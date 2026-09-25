import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Job slug is required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const job = await Job.findOne({
      slug: slug.toLowerCase().trim(),
      status: "Published",
    }).lean();

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("JOB DETAILS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load job.",
      },
      { status: 500 }
    );
  }
}
