import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import EnvironmentParticipant from "@/models/EnvironmentParticipant";

import EnvironmentWallet from "@/models/EnvironmentWallet";

import {
  generateEnvironmentPassword,
  generateParticipantId,
} from "@/lib/generate-environment-id";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const fullName =
      String(
        body.fullName || ""
      ).trim();

    const mobile =
      String(
        body.mobile || ""
      )
        .replace(/\D/g, "")
        .trim();

    const email =
      String(
        body.email || ""
      )
        .trim()
        .toLowerCase();

    const state =
      String(
        body.state || ""
      ).trim();

    const district =
      String(
        body.district || ""
      ).trim();

    const address =
      String(
        body.address || ""
      ).trim();

    const pincode =
      String(
        body.pincode || ""
      ).trim();

    if (
      !fullName ||
      !mobile ||
      !email ||
      !state ||
      !district
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      mobile.length !== 10
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid 10 digit mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const existing =
      await EnvironmentParticipant.findOne({
        $or: [
          { email },
          { mobile },
        ],
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An account already exists with this mobile number or email.",
        },
        {
          status: 409,
        }
      );
    }

    let participantId =
      generateParticipantId();

    while (
      await EnvironmentParticipant.exists({
        participantId,
      })
    ) {
      participantId =
        generateParticipantId();
    }

    const temporaryPassword =
      generateEnvironmentPassword();

    const participant =
      await EnvironmentParticipant.create({
        participantId,
        fullName,
        mobile,
        email,
        password:
          temporaryPassword,
        state,
        district,
        address,
        pincode,
      });

    await EnvironmentWallet.create({
      participantId:
        participant.participantId,

      totalEarned: 0,

      availableBalance: 0,

      totalPaid: 0,

      transactions: [],
    });

    return NextResponse.json(
      {
        success: true,

        message:
          "Environment participant account created successfully.",

        data: {
          participantId:
            participant.participantId,

          fullName:
            participant.fullName,

          email:
            participant.email,

          temporaryPassword,

          loginUrl:
            "/environment/login",
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "ENVIRONMENT REGISTER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create participant account.",
      },
      {
        status: 500,
      }
    );
  }
}