import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import HealthHelpRequest from "@/models/HealthHelpRequest";
import { requireAdmin } from "@/lib/admin-auth";

const allowedStatuses = [
  "pending",
  "reviewing",
  "assistance",
  "completed",
  "closed",
] as const;

export async function GET(request: Request) {
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

    const { searchParams } =
      new URL(request.url);

    const status =
      searchParams.get("status") || "ALL";

    const search =
      searchParams
        .get("search")
        ?.trim() || "";

    const filter: Record<
      string,
      unknown
    > = {};

    if (
      status !== "ALL" &&
      allowedStatuses.includes(
        status as (typeof allowedStatuses)[number]
      )
    ) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          requestId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          helpType: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const requests =
      await HealthHelpRequest.find(
        filter
      )
        .sort({
          createdAt: -1,
        })
        .lean();

    const [
      total,
      pending,
      reviewing,
      assistance,
      completed,
      closed,
      urgent,
    ] = await Promise.all([
      HealthHelpRequest.countDocuments(),

      HealthHelpRequest.countDocuments({
        status: "pending",
      }),

      HealthHelpRequest.countDocuments({
        status: "reviewing",
      }),

      HealthHelpRequest.countDocuments({
        status: "assistance",
      }),

      HealthHelpRequest.countDocuments({
        status: "completed",
      }),

      HealthHelpRequest.countDocuments({
        status: "closed",
      }),

      HealthHelpRequest.countDocuments({
        urgency: "Urgent",
        status: {
          $nin: [
            "completed",
            "closed",
          ],
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      stats: {
        total,
        pending,
        reviewing,
        assistance,
        completed,
        closed,
        urgent,
      },

      count: requests.length,

      requests,
    });

  } catch (error) {
    console.error(
      "ADMIN HEALTH HELP GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load health help requests.",
      },
      { status: 500 }
    );
  }
}