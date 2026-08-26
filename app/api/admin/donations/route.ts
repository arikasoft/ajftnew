import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { requireAdmin } from "@/lib/admin-auth";

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
      searchParams.get("search")?.trim() || "";

    const filter: Record<
      string,
      unknown
    > = {};

    if (
      status !== "ALL" &&
      [
        "PENDING",
        "SUCCESS",
        "FAILED",
        "CANCELLED",
      ].includes(status)
    ) {
      filter.paymentStatus = status;
    }

    if (search) {
      filter.$or = [
        {
          donationReference: {
            $regex: search,
            $options: "i",
          },
        },
        {
          donorName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: search,
            $options: "i",
          },
        },
        {
          paymentId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          receiptNo: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const donations =
      await Donation.find(filter)
        .sort({
          createdAt: -1,
        })
        .lean();

    const [
      total,
      pending,
      success,
      failed,
      cancelled,
    ] = await Promise.all([
      Donation.countDocuments(),

      Donation.countDocuments({
        paymentStatus: "PENDING",
      }),

      Donation.countDocuments({
        paymentStatus: "SUCCESS",
      }),

      Donation.countDocuments({
        paymentStatus: "FAILED",
      }),

      Donation.countDocuments({
        paymentStatus: "CANCELLED",
      }),
    ]);

    const successfulAmountResult =
      await Donation.aggregate([
        {
          $match: {
            paymentStatus: "SUCCESS",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const successfulAmount =
      successfulAmountResult[0]?.total || 0;

    return NextResponse.json({
      success: true,

      stats: {
        total,
        pending,
        success,
        failed,
        cancelled,
        successfulAmount,
      },

      count: donations.length,

      donations,
    });

  } catch (error) {
    console.error(
      "ADMIN DONATIONS GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load donations.",
      },
      { status: 500 }
    );
  }
}