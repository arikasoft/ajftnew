import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Razorpay from "razorpay";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* =========================================================
   HELPERS
========================================================= */

function clean(value: unknown): string {
  return String(value ?? "").trim();
}

function json(
  data: Record<string, unknown>,
  status = 200
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate",
    },
  });
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    /* =======================================================
       READ REQUEST
    ======================================================= */

    const body =
      await request.json();

    const donorName =
      clean(body?.donorName);

    const mobile =
      clean(body?.mobile);

    const email =
      clean(body?.email);

    const address =
      clean(body?.address);

    const amount =
      Number(body?.amount);

    const currency =
      clean(body?.currency) ||
      "INR";

    const donationType =
      clean(body?.donationType) ||
      "one-time";

    const donorType =
      clean(body?.donorType) ||
      "indian";

    const donationMode =
      clean(body?.donationMode) ||
      "indian";

    const country =
      clean(body?.country) ||
      "India";

    const requires80G =
      Boolean(body?.requires80G);

    const pan =
      requires80G
        ? clean(body?.pan).toUpperCase()
        : "";

    const sourceAction =
      clean(body?.sourceAction) ||
      "donate-page";

    const action =
      clean(body?.action) ||
      "donate";

    const buttonId =
      clean(body?.buttonId) ||
      "donate-submit";

    const landingPage =
      clean(body?.landingPage);

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!donorName) {
      return json(
        {
          success: false,
          message:
            "Donor name is required.",
        },
        400
      );
    }

    if (
      !/^\d{10}$/.test(mobile)
    ) {
      return json(
        {
          success: false,
          message:
            "Valid 10 digit mobile number is required.",
        },
        400
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return json(
        {
          success: false,
          message:
            "Valid email address is required.",
        },
        400
      );
    }

    if (!address) {
      return json(
        {
          success: false,
          message:
            "Address is required.",
        },
        400
      );
    }

    if (
      !Number.isFinite(amount) ||
      amount < 100
    ) {
      return json(
        {
          success: false,
          message:
            "Minimum donation amount is ₹100.",
        },
        400
      );
    }

    if (
      requires80G &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        pan
      )
    ) {
      return json(
        {
          success: false,
          message:
            "Valid PAN is required for 80G receipt.",
        },
        400
      );
    }

    /* =======================================================
       ENVIRONMENT
    ======================================================= */

    const razorpayKeyId =
      clean(
        process.env.RAZORPAY_KEY_ID
      );

    const razorpayKeySecret =
      clean(
        process.env.RAZORPAY_KEY_SECRET
      );

    if (!razorpayKeyId) {
      console.error(
        "RAZORPAY_KEY_ID is missing."
      );

      return json(
        {
          success: false,
          message:
            "Razorpay Key ID is not configured.",
        },
        500
      );
    }

    if (!razorpayKeySecret) {
      console.error(
        "RAZORPAY_KEY_SECRET is missing."
      );

      return json(
        {
          success: false,
          message:
            "Razorpay secret is not configured.",
        },
        500
      );
    }

    /* =======================================================
       MONGODB
    ======================================================= */

    await connectDB();

    /* =======================================================
       RAZORPAY
    ======================================================= */

    const razorpay =
      new Razorpay({
        key_id:
          razorpayKeyId,

        key_secret:
          razorpayKeySecret,
      });

    /* =======================================================
       AMOUNT IN PAISE
    ======================================================= */

    const amountPaise =
      Math.round(
        amount * 100
      );

    if (
      !Number.isSafeInteger(
        amountPaise
      ) ||
      amountPaise <= 0
    ) {
      return json(
        {
          success: false,
          message:
            "Invalid donation amount.",
        },
        400
      );
    }

    /* =======================================================
       CREATE DONATION REFERENCE
    ======================================================= */

    const donationReference =
      `AJFT-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

    /* =======================================================
       CREATE MONGODB DONATION FIRST
       
       IMPORTANT:
       This creates the ID that frontend needs.
    ======================================================= */

    const donation =
      await Donation.create({
        donorName,

        mobile,

        email,

        address,

        amount,

        currency,

        donationType,

        donorType,

        donationMode,

        country,

        requires80G,

        pan,

        donationReference,

        paymentStatus:
          "PENDING",

        sourceAction,

        action,

        buttonId,

        landingPage,

        createdAt:
          new Date(),
      });

    const donationId =
      String(donation._id);

    /* =======================================================
       CREATE RAZORPAY ORDER
    ======================================================= */

    let order: any;

    try {
      order =
        await razorpay.orders.create(
          {
            amount:
              amountPaise,

            currency:
              currency.toUpperCase(),

            receipt:
              donationReference,

            notes: {
              donationId,

              donationReference,

              donorName,

              email,

              mobile,
            },
          }
        );
    } catch (razorpayError) {
      console.error(
        "RAZORPAY ORDER ERROR:",
        razorpayError
      );

      /* -----------------------------------------------
         Mark donation failed
      ----------------------------------------------- */

      await Donation.findByIdAndUpdate(
        donation._id,
        {
          $set: {
            paymentStatus:
              "FAILED",

            paymentError:
              razorpayError instanceof Error
                ? razorpayError.message
                : "Razorpay order creation failed.",
          },
        }
      );

      throw razorpayError;
    }

    /* =======================================================
       RAZORPAY ORDER CHECK
    ======================================================= */

    const razorpayOrderId =
      clean(order?.id);

    if (!razorpayOrderId) {
      await Donation.findByIdAndUpdate(
        donation._id,
        {
          $set: {
            paymentStatus:
              "FAILED",

            paymentError:
              "Razorpay did not return an order ID.",
          },
        }
      );

      return json(
        {
          success: false,
          message:
            "Razorpay order could not be created.",
        },
        500
      );
    }

    /* =======================================================
       UPDATE DONATION WITH ORDER ID
    ======================================================= */

    const updatedDonation =
      await Donation.findByIdAndUpdate(
        donation._id,

        {
          $set: {
            razorpayOrderId,

            orderId:
              razorpayOrderId,

            paymentStatus:
              "PENDING",
          },
        },

        {
          new: true,
        }
      ).lean();

    if (!updatedDonation) {
      return json(
        {
          success: false,
          message:
            "Donation record could not be updated.",
        },
        500
      );
    }

    /* =======================================================
       LOG
    ======================================================= */

    console.log(
      "========================================"
    );

    console.log(
      "AJFT DONATION ORDER CREATED"
    );

    console.log(
      "Donation ID:",
      donationId
    );

    console.log(
      "Donation Reference:",
      donationReference
    );

    console.log(
      "Razorpay Order ID:",
      razorpayOrderId
    );

    console.log(
      "Amount:",
      amount
    );

    console.log(
      "Amount Paise:",
      amountPaise
    );

    console.log(
      "Status:",
      "PENDING"
    );

    console.log(
      "========================================"
    );

    /* =======================================================
       RESPONSE
       
       IMPORTANT:
       donate/page.tsx depends on these fields.
    ======================================================= */

    return json({
      success: true,

      message:
        "Donation order created successfully.",

      donationId,

      donationReference,

      orderId:
        razorpayOrderId,

      razorpayOrderId,

      amount,

      amountPaise,

      currency:
        currency.toUpperCase(),

      razorpay: {
        keyId:
          razorpayKeyId,

        orderId:
          razorpayOrderId,

        amount:
          amountPaise,

        currency:
          currency.toUpperCase(),
      },

      donation: {
        _id:
          donationId,

        donationReference,

        donorName,

        email,

        mobile,

        amount,

        currency,

        paymentStatus:
          "PENDING",

        razorpayOrderId,
      },
    });
  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "AJFT CREATE ORDER ERROR:"
    );

    console.error(
      error
    );

    console.error(
      "========================================"
    );

    return json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create donation order.",
      },
      500
    );
  }
}