import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";
import Razorpay from "razorpay";

const CERTIFICATE_FEE = 2250;

export async function GET(
  request: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const applicationId =
      searchParams
        .get("applicationId")
        ?.trim()
        .toUpperCase();

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        { status: 400 }
      );
    }

    const application =
      await InternshipApplication.findOne({
        applicationId,
      }).lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found.",
        },
        { status: 404 }
      );
    }

    if (
      !application.certificateEligible &&
      application.status !==
        "CERTIFICATE_ELIGIBLE"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your internship is not yet eligible for certificate payment.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
      amount: CERTIFICATE_FEE,
    });
  } catch (error) {
    console.error(
      "CERTIFICATE PAYMENT GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load payment details.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const applicationId =
      String(
        body.applicationId || ""
      )
        .trim()
        .toUpperCase();

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        { status: 400 }
      );
    }

    const application =
      await InternshipApplication.findOne({
        applicationId,
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found.",
        },
        { status: 404 }
      );
    }

    if (
      !application.certificateEligible &&
      application.status !==
        "CERTIFICATE_ELIGIBLE"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate payment is not available yet.",
        },
        { status: 403 }
      );
    }

    if (
      application.certificatePaymentStatus ===
      "PAID"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate payment has already been completed.",
        },
        { status: 400 }
      );
    }

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay configuration is missing.",
        },
        { status: 500 }
      );
    }

    const razorpay =
      new Razorpay({
        key_id:
          process.env.RAZORPAY_KEY_ID,

        key_secret:
          process.env.RAZORPAY_KEY_SECRET,
      });

    const order =
      await razorpay.orders.create({
        amount:
          CERTIFICATE_FEE * 100,

        currency: "INR",

        receipt:
          applicationId,

        notes: {
          applicationId,
          purpose:
            "Internship Certificate",
        },
      });

    application.certificatePaymentStatus =
      "PENDING";

    await application.save();

    return NextResponse.json({
      success: true,

      key:
        process.env.RAZORPAY_KEY_ID,

      orderId:
        order.id,

      amount:
        order.amount,

      currency:
        order.currency,
    });
  } catch (error) {
    console.error(
      "CERTIFICATE PAYMENT POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create payment order.",
      },
      { status: 500 }
    );
  }
}