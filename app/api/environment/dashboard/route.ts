import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

// IMPORTANT:
// Apne actual model paths ke according naam change karein.
import EnvironmentParticipant from "@/models/EnvironmentParticipant";
import EnvironmentPlantation from "@/models/EnvironmentPlantation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    /*
     * LOGIN COOKIE
     *
     * Login route se participant ID read karenge.
     */
    const participantId =
      request.cookies
        .get(
          "ajft_environment_participant_id"
        )
        ?.value
        ?.trim();

    if (!participantId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not logged in. Please login to continue.",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    /*
     * PARTICIPANT
     */
    const participant =
      await EnvironmentParticipant.findOne({
        participantId,
      }).lean();

    if (!participant) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Participant account not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * GET ALL PLANTATIONS
     */
    const plantations =
      await EnvironmentPlantation.find({
        participantId,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    /*
     * STATISTICS
     */
    const totalTrees =
      plantations.length;

    const pendingTrees =
      plantations.filter(
        (item: any) =>
          item.status === "pending"
      ).length;

    const approvedTrees =
      plantations.filter(
        (item: any) =>
          item.status === "approved"
      ).length;

    const rejectedTrees =
      plantations.filter(
        (item: any) =>
          item.status === "rejected"
      ).length;

    /*
     * TOTAL REWARDS
     *
     * Only approved plantation rewards
     * are counted.
     */
    const totalRewards =
      plantations.reduce(
        (
          total: number,
          item: any
        ) => {
          if (
            item.status === "approved"
          ) {
            return (
              total +
              Number(
                item.rewardAmount || 0
              )
            );
          }

          return total;
        },
        0
      );

    /*
     * WALLET
     *
     * If participant model contains
     * walletBalance, use it.
     *
     * Otherwise fallback to total rewards.
     */
    const walletBalance =
      Number(
        (participant as any)
          .walletBalance ??
          totalRewards
      );

    /*
     * RECENT 10 PLANTATIONS
     */
    const recentPlantations =
      plantations
        .slice(0, 10)
        .map(
          (item: any) => ({
            _id:
              item._id.toString(),

            treeName:
              item.treeName ||
              "Tree Plantation",

            location:
              item.location ||
              item.address ||
              "Location not available",

            plantedDate:
              item.plantedDate
                ? new Date(
                    item.plantedDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : item.createdAt
                  ? new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "",

            status:
              item.status ||
              "pending",

            rewardAmount:
              Number(
                item.rewardAmount || 0
              ),
          })
        );

    /*
     * FINAL RESPONSE
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "Environment dashboard loaded successfully.",

        data: {
          participant: {
            participantId:
              (participant as any)
                .participantId,

            fullName:
              (participant as any)
                .fullName ||
              "Participant",

            email:
              (participant as any)
                .email ||
              "",

            mobile:
              (participant as any)
                .mobile ||
              "",
          },

          statistics: {
            totalTrees,

            pendingTrees,

            approvedTrees,

            rejectedTrees,

            walletBalance,

            totalRewards,
          },

          recentPlantations,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ENVIRONMENT DASHBOARD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load dashboard. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}