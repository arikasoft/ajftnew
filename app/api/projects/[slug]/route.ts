import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { slug } =
      await context.params;

    const project =
      await Project.findOne({
        slug,
        isPublished: true,
      }).lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(
      "PROJECT DETAILS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load project.",
      },
      {
        status: 500,
      }
    );
  }
}