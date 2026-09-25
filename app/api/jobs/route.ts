import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    const jobs = await Job.find({
      status: "Published",
      lastDate: {
        $gte: now,
      },
    })
      .sort({
        featured: -1,
        lastDate: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Jobs GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load jobs.",
      },
      {
        status: 500,
      }
    );
  }
}