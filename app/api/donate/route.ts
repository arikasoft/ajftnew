import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      mobile,
      email,
      address,
      requires80G,
      pan,
      amount,
    } = body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !name ||
      !mobile ||
      !email ||
      !amount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, mobile, email and amount are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Mobile validation
    if (
      !/^[0-9]{10}$/.test(
        String(mobile).trim()
      )
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

    // Amount validation
    const donationAmount =
      Number(amount);

    if (
      !Number.isFinite(donationAmount) ||
      donationAmount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation amount must be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

    // 80G / PAN validation
    if (
      Boolean(requires80G) &&
      !pan
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PAN is required for an 80G receipt.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // MONGODB
    // ==========================================

    await connectDB();

    // ==========================================
    // CREATE DONATION
    // ==========================================

    const donation =
      await Donation.create({
        donorName:
          String(name).trim(),

        mobile:
          String(mobile).trim(),

        email:
          String(email).trim(),

        address:
          address &&
          String(address).trim()
            ? String(address).trim()
            : undefined,

        requires80G:
          Boolean(requires80G),

        pan:
          Boolean(requires80G) && pan
            ? String(pan)
                .trim()
                .toUpperCase()
            : undefined,

        amount:
          donationAmount,

        paymentStatus:
          "PENDING",
      });

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json(
      {
        success: true,

        donationId:
          donation._id.toString(),

        message:
          "Donation details saved successfully.",
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "Donation API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to save donation details.",
      },
      {
        status: 500,
      }
    );
  }
}