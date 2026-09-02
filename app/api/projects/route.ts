import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const search =
      searchParams.get("search")?.trim() ||
      "";

    const category =
      searchParams.get("category") || "";

    const status =
      searchParams.get("status") || "";

    const page = Math.max(
      Number(searchParams.get("page") || 1),
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit") || 20),
        1
      ),
      100
    );

    const query: Record<string, unknown> = {
      isPublished: true,
    };

    if (category && category !== "all") {
      query.category = category;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          projectCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          district: {
            $regex: search,
            $options: "i",
          },
        },
        {
          state: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip =
      (page - 1) * limit;

    const [
      projects,
      total,
      totalProjects,
      ongoing,
      completed,
      totalBeneficiaries,
    ] = await Promise.all([
      Project.find(query)
        .sort({
          featured: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Project.countDocuments(query),

      Project.countDocuments({
        isPublished: true,
      }),

      Project.countDocuments({
        isPublished: true,
        status: "ongoing",
      }),

      Project.countDocuments({
        isPublished: true,
        status: "completed",
      }),

      Project.aggregate([
        {
          $match: {
            isPublished: true,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$beneficiaries",
            },
          },
        },
      ]),
    ]);

    return NextResponse.json({
      success: true,

      message:
        "Projects loaded successfully.",

      data: {
        projects,

        pagination: {
          page,
          limit,
          total,
          totalPages: Math.max(
            Math.ceil(total / limit),
            1
          ),
        },

        summary: {
          totalProjects,
          ongoing,
          completed,

          beneficiaries:
            totalBeneficiaries[0]?.total || 0,
        },
      },
    });
  } catch (error) {
    console.error(
      "PROJECT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load projects.",
      },
      {
        status: 500,
      }
    );
  }
}