import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

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

    const orderId =
      String(
        body.razorpay_order_id || ""
      ).trim();

    const paymentId =
      String(
        body.razorpay_payment_id || ""
      ).trim();

    const signature =
      String(
        body.razorpay_signature || ""
      ).trim();

    if (
      !applicationId ||
      !orderId ||
      !paymentId ||
      !signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Incomplete payment information.",
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
            "Application is not certificate eligible.",
        },
        { status: 403 }
      );
    }

    if (
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification configuration is missing.",
        },
        { status: 500 }
      );
    }

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(
          `${orderId}|${paymentId}`
        )
        .digest("hex");

    const valid =
      crypto.timingSafeEqual(
        Buffer.from(
          expectedSignature
        ),
        Buffer.from(signature)
      );

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment signature verification failed.",
        },
        { status: 400 }
      );
    }

    application.certificatePaymentStatus =
      "PAID";

    application.status =
      "CERTIFICATE_ELIGIBLE";

    /*
      Store payment information if your
      schema contains these fields.
    */

    await application.save();

    return NextResponse.json({
      success: true,

      message:
        "Payment verified successfully.",

      applicationId,

      paymentId,
    });
  } catch (error) {
    console.error(
      "CERTIFICATE PAYMENT VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Payment verification failed.",
      },
      { status: 500 }
    );
  }
}