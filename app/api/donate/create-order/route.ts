import { NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// HELPERS
// ============================================================

function clean(value: unknown): string {
  const result = String(value ?? "").trim();

  if (
    !result ||
    result === "undefined" ||
    result === "null"
  ) {
    return "";
  }

  return result;
}

function generateDonationReference(): string {
  const timestamp = Date.now();

  const random =
    crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase();

  return `AJFT-${timestamp}-${random}`;
}

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request
) {
  try {
    // ========================================================
    // READ REQUEST
    // ========================================================

    const body =
      await request.json();

    console.log(
      "======================================"
    );

    console.log(
      "AJFT CREATE DONATION ORDER"
    );

    console.log(
      "REQUEST:",
      body
    );

    console.log(
      "======================================"
    );

    // ========================================================
    // INPUT
    // ========================================================

    const donorName =
      clean(
        body?.donorName
      );

    const mobile =
      clean(
        body?.mobile
      );

    const email =
      clean(
        body?.email
      ).toLowerCase();

    const address =
      clean(
        body?.address
      );

    const pan =
      clean(
        body?.pan
      ).toUpperCase();

    const requires80G =
      Boolean(
        body?.requires80G
      );

    const amount =
      Number(
        body?.amount
      );

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!donorName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donor name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid donation amount is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // PAN VALIDATION
    // ========================================================

    if (
      requires80G &&
      pan &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        pan
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid PAN number.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // CONNECT DATABASE
    // ========================================================

    await connectDB();

    // ========================================================
    // CREATE UNIQUE REFERENCE
    // ========================================================

    let donationReference =
      generateDonationReference();

    let existing =
      await Donation.findOne({
        donationReference,
      }).lean();

    while (existing) {
      donationReference =
        generateDonationReference();

      existing =
        await Donation.findOne({
          donationReference,
        }).lean();
    }

    // ========================================================
    // CREATE DONATION
    //
    // IMPORTANT:
    // Initially paymentStatus = PENDING
    // ========================================================

    const donation =
      await Donation.create({
        donationReference,

        donorName,

        mobile,

        email,

        address,

        requires80G,

        pan:

          requires80G
            ? pan
            : "",

        amount,

        currency:
          "INR",

        razorpayOrderId:
          "",

        orderId:
          "",

        paymentStatus:
          "PENDING",

        paymentId:
          "",

        receiptNo:
          "",
      });

    // ========================================================
    // CHECK RAZORPAY ENV
    // ========================================================

    const keyId =
      clean(
        process.env
          .RAZORPAY_KEY_ID
      );

    const keySecret =
      clean(
        process.env
          .RAZORPAY_KEY_SECRET
      );

    if (
      !keyId ||
      !keySecret
    ) {
      console.error(
        "RAZORPAY ENVIRONMENT VARIABLES ARE MISSING."
      );

      // ------------------------------------------------------
      // Remove test donation because Razorpay order
      // cannot be created.
      // ------------------------------------------------------

      await Donation.deleteOne({
        _id:
          donation._id,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    // ========================================================
    // RAZORPAY ORDER
    // ========================================================

    const razorpayOrderPayload = {
      amount:
        Math.round(
          amount * 100
        ),

      currency:
        "INR",

      receipt:
        donationReference,

      notes: {
        donationId:
          String(
            donation._id
          ),

        donationReference,

        donorName,

        mobile,

        email,
      },
    };

    console.log(
      "======================================"
    );

    console.log(
      "RAZORPAY ORDER PAYLOAD:"
    );

    console.log(
      razorpayOrderPayload
    );

    console.log(
      "======================================"
    );

    // ========================================================
    // RAZORPAY AUTH
    // ========================================================

    const auth =
      Buffer.from(
        `${keyId}:${keySecret}`
      ).toString(
        "base64"
      );

    // ========================================================
    // CREATE RAZORPAY ORDER
    // ========================================================

    const razorpayResponse =
      await fetch(
        "https://api.razorpay.com/v1/orders",
        {
          method: "POST",

          headers: {
            Authorization:
              `Basic ${auth}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body:
            JSON.stringify(
              razorpayOrderPayload
            ),

          cache: "no-store",
        }
      );

    // ========================================================
    // READ RAZORPAY RESPONSE AS TEXT
    // ========================================================

    const razorpayRaw =
      await razorpayResponse.text();

    console.log(
      "RAZORPAY STATUS:",
      razorpayResponse.status
    );

    console.log(
      "RAZORPAY RAW RESPONSE:",
      razorpayRaw
    );

    // ========================================================
    // EMPTY RESPONSE
    // ========================================================

    if (
      !razorpayRaw.trim()
    ) {
      await Donation.deleteOne({
        _id:
          donation._id,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay returned an empty response.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // PARSE RAZORPAY JSON
    // ========================================================

    let razorpayData: any;

    try {
      razorpayData =
        JSON.parse(
          razorpayRaw
        );
    } catch {
      await Donation.deleteOne({
        _id:
          donation._id,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from Razorpay.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // RAZORPAY ERROR
    // ========================================================

    if (
      !razorpayResponse.ok ||
      !razorpayData?.id
    ) {
      console.error(
        "RAZORPAY ORDER ERROR:",
        razorpayData
      );

      await Donation.deleteOne({
        _id:
          donation._id,
      });

      return NextResponse.json(
        {
          success: false,

          message:
            razorpayData?.error?.description ||
            razorpayData?.message ||
            "Unable to create Razorpay order.",

          razorpayError:
            razorpayData?.error ||
            null,
        },
        {
          status:
            razorpayResponse.status >= 400
              ? razorpayResponse.status
              : 502,
        }
      );
    }

    // ========================================================
    // ORDER ID
    // ========================================================

    const razorpayOrderId =
      clean(
        razorpayData.id
      );

    // ========================================================
    // UPDATE DONATION
    // ========================================================

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

    if (
      !updatedDonation
    ) {
      console.error(
        "DONATION UPDATE FAILED:",
        donation._id
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Donation was created but could not be updated with Razorpay order.",
        },
        {
          status: 500,
        }
      );
    }

    // ========================================================
    // FINAL RESPONSE
    //
    // IMPORTANT:
    // Frontend needs donationId.
    // ========================================================

    const responseData = {
      success: true,

      message:
        "Razorpay order created successfully.",

      donationId:
        String(
          updatedDonation._id
        ),

      donationReference:
        updatedDonation.donationReference,

      orderId:
        razorpayOrderId,

      razorpayOrderId,

      amount:
        updatedDonation.amount,

      amountPaise:
        Math.round(
          Number(
            updatedDonation.amount
          ) * 100
        ),

      currency:
        updatedDonation.currency,

      paymentStatus:
        updatedDonation.paymentStatus,

      donorName:
        updatedDonation.donorName,

      email:
        updatedDonation.email,

      mobile:
        updatedDonation.mobile,

      razorpay: {
        keyId,

        orderId:
          razorpayOrderId,

        amount:
          Math.round(
            Number(
              updatedDonation.amount
            ) * 100
          ),

        currency:
          "INR",
      },
    };

    console.log(
      "======================================"
    );

    console.log(
      "AJFT CREATE ORDER SUCCESS"
    );

    console.log(
      "Donation ID:",
      responseData.donationId
    );

    console.log(
      "Donation Reference:",
      responseData.donationReference
    );

    console.log(
      "Razorpay Order:",
      responseData.razorpayOrderId
    );

    console.log(
      "Payment Status:",
      responseData.paymentStatus
    );

    console.log(
      "======================================"
    );

    return NextResponse.json(
      responseData,
      {
        status: 201,

        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (
    error
  ) {
    console.error(
      "======================================"
    );

    console.error(
      "AJFT CREATE ORDER ERROR:"
    );

    console.error(
      error
    );

    console.error(
      "======================================"
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create donation order.",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  }
}