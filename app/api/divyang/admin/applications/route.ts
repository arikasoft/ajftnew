import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import DivyangApplication from "@/models/DivyangApplication";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(
      Number(searchParams.get("page") || "1"),
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit") || "20"),
        1
      ),
      100
    );

    const search = (
      searchParams.get("search") || ""
    ).trim();

    const status = (
      searchParams.get("status") || "all"
    ).trim();

    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (
      status &&
      status.toLowerCase() !== "all"
    ) {
      query.status = {
        $regex: `^${status}$`,
        $options: "i",
      };
    }

    /* =====================================================
       SEARCH FILTER

       Search by:
       - Application ID
       - Full Name
       - Mobile Number
       - Email
       - District
       - State
    ===================================================== */

    if (search) {
      const escapedSearch = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      query.$or = [
        {
          applicationId: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          email: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          district: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          state: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
      ];
    }

    /* =====================================================
       DATABASE QUERY
    ===================================================== */

    const [
      applications,
      total,
      pending,
      underReview,
      approved,
      rejected,
      completed,
    ] = await Promise.all([
      DivyangApplication.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .select({
          applicationId: 1,
          fullName: 1,
          mobile: 1,
          email: 1,
          disabilityType: 1,
          disabilityPercentage: 1,
          state: 1,
          district: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        })
        .lean(),

      DivyangApplication.countDocuments(query),

      DivyangApplication.countDocuments({
        status: {
          $regex: "^pending$",
          $options: "i",
        },
      }),

      DivyangApplication.countDocuments({
        status: {
          $regex: "^under review$",
          $options: "i",
        },
      }),

      DivyangApplication.countDocuments({
        status: {
          $regex: "^approved$",
          $options: "i",
        },
      }),

      DivyangApplication.countDocuments({
        status: {
          $regex: "^rejected$",
          $options: "i",
        },
      }),

      DivyangApplication.countDocuments({
        status: {
          $regex: "^completed$",
          $options: "i",
        },
      }),
    ]);

    const totalPages = Math.max(
      Math.ceil(total / limit),
      1
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Divyang applications loaded successfully.",

        data: {
          applications,

          pagination: {
            page,
            limit,
            total,
            totalPages,

            hasNextPage:
              page < totalPages,

            hasPreviousPage:
              page > 1,
          },

          summary: {
            total,
            pending,
            underReview,
            approved,
            rejected,
            completed,
          },

          filters: {
            search,
            status,
          },
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DIVYANG ADMIN APPLICATIONS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load Divyang applications.",
      },
      {
        status: 500,
      }
    );
  }
}