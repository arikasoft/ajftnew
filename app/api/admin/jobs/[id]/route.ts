import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Job from "@/models/Job";

function isAdmin(request: Request) {
  const cookieHeader =
    request.headers.get("cookie") || "";

  return cookieHeader.includes(
    "ajft_admin_session="
  );
}

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await context.params;

    await connectDB();

    const job = await Job.findById(id).lean();

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load job.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    await connectDB();

    const job = await Job.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update job.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await context.params;

    await connectDB();

    const job =
      await Job.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete job.",
      },
      {
        status: 500,
      }
    );
  }
}