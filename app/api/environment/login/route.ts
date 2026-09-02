import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import EnvironmentParticipant from "@/models/EnvironmentParticipant";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const participantId = String(
      body.participantId || ""
    )
      .trim()
      .toUpperCase();

    const password = String(
      body.password || ""
    ).trim();

    if (!participantId || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Participant ID and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const participant =
      await EnvironmentParticipant.findOne({
        participantId,
      }).select("+password");

    if (!participant) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Participant ID or password.",
        },
        {
          status: 401,
        }
      );
    }

    if (participant.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your participant account is currently inactive.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * TEMPORARY PASSWORD CHECK
     *
     * Later bcrypt can be added.
     */
    if (
      String(participant.password) !==
      password
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Participant ID or password.",
        },
        {
          status: 401,
        }
      );
    }

    participant.lastLoginAt = new Date();

    await participant.save();

    const response =
      NextResponse.json(
        {
          success: true,
          message:
            "Login successful.",

          data: {
            participantId:
              participant.participantId,

            fullName:
              participant.fullName,

            email:
              participant.email,
          },
        },
        {
          status: 200,
        }
      );

    /*
     * IMPORTANT:
     * Dashboard इसी cookie से participant
     * को पहचानता है.
     */
    response.cookies.set(
      "ajft_environment_participant_id",
      participant.participantId,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 *
          60 *
          24 *
          7,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "ENVIRONMENT LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to login. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}