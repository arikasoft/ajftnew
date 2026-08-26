import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
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

    const applications =
      await CareerApplication.find({})
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {
    console.error(
      "ADMIN CAREERS GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load career applications.",
      },
      { status: 500 }
    );
  }
}