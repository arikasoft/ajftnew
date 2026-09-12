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

  const random = crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase();

  return `AJFT-${timestamp}-${random}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile);
}

function isValidPAN(pan: string): boolean {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
}

function safeNumber(value: unknown): number {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

// ============================================================
// POST
// ============================================================

export async function POST(request: Request) {
  let createdDonationId = "";

  try {
    // ========================================================
    // READ REQUEST
    // ========================================================

    const body = await request.json();

    console.log("======================================");
    console.log("AJFT CREATE DONATION ORDER");
    console.log("======================================");

    // ========================================================
    // BASIC DONOR INFORMATION
    // ========================================================

    const donorName = clean(body?.donorName);

    const mobile = clean(body?.mobile);

    const email = clean(body?.email).toLowerCase();

    const address = clean(body?.address);

    const city = clean(body?.city);

    const state = clean(body?.state);

    const pinCode = clean(body?.pinCode);

    // ========================================================
    // DONATION INFORMATION
    // ========================================================

    const amount = safeNumber(body?.amount);

    const currency = clean(body?.currency).toUpperCase() || "INR";

    const donationType =
      clean(body?.donationType).toLowerCase() || "one-time";

    const donationMode =
      clean(body?.donationMode).toLowerCase() || "indian";

    const donorType =
      clean(body?.donorType).toLowerCase() || donationMode;

    const country =
      clean(body?.country) || "India";

    // ========================================================
    // 80G INFORMATION
    // ========================================================

    const requires80G = Boolean(body?.requires80G);

    const pan = clean(body?.pan).toUpperCase();

    // ========================================================
    // CAMPAIGN / UTM TRACKING
    // ========================================================

    const sourceAction = clean(body?.sourceAction);

    const action = clean(body?.action);

    const buttonId = clean(body?.buttonId);

    const utmSource = clean(body?.utmSource);

    const utmMedium = clean(body?.utmMedium);

    const utmCampaign = clean(body?.utmCampaign);

    const utmContent = clean(body?.utmContent);

    const utmTerm = clean(body?.utmTerm);

    const landingPage = clean(body?.landingPage);

    // ========================================================
    // LOG SAFE REQUEST INFORMATION
    // ========================================================

    console.log("Donor:", donorName);
    console.log("Mobile:", mobile);
    console.log("Email:", email);
    console.log("Amount:", amount);
    console.log("Currency:", currency);
    console.log("Donation Type:", donationType);
    console.log("Donation Mode:", donationMode);
    console.log("Donor Type:", donorType);
    console.log("Country:", country);
    console.log("80G:", requires80G);
    console.log("Source:", sourceAction);
    console.log("Campaign:", utmCampaign);

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!donorName) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor name is required.",
        },
        { status: 400 }
      );
    }

    if (donorName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid donor name.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // MOBILE
    // ========================================================

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!isValidMobile(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 10-digit Indian mobile number.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // EMAIL
    // ========================================================

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // ADDRESS
    // ========================================================

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Address is required.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // AMOUNT
    // ========================================================

    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Minimum donation amount is ₹100.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // CURRENCY
    //
    // Current AJFT Razorpay flow is INR.
    // Do not allow frontend to force another currency.
    // ========================================================

    if (currency !== "INR") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Online donations are currently processed in INR only.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // DONATION FREQUENCY
    //
    // Monthly subscription is not configured in this API.
    // Therefore never allow frontend to falsely create
    // a monthly donation as a one-time Razorpay order.
    // ========================================================

    if (
      donationType !== "one-time" &&
      donationType !== "one_time"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Monthly donation is currently unavailable. Please select Give Once.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // DONOR TYPE
    // ========================================================

    const allowedDonorTypes = [
      "indian",
      "nri",
      "foreign",
    ];

    if (!allowedDonorTypes.includes(donorType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid donor type.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // FOREIGN DONOR
    //
    // Foreign currency/FCRA online flow is not enabled here.
    // Prevent accidental representation of an unsupported flow.
    // ========================================================

    if (donorType === "foreign") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Foreign donor online payment is currently unavailable. Please contact Anand Jivan Foundation Trust for international donation assistance.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // NRI COUNTRY
    // ========================================================

    if (
      donorType === "nri" &&
      (!country || country.toLowerCase() === "india")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select your country for NRI donation.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // PIN CODE
    // ========================================================

    if (pinCode && !/^\d{6}$/.test(pinCode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 6-digit PIN code.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // 80G / PAN
    // ========================================================

    if (requires80G) {
      if (!pan) {
        return NextResponse.json(
          {
            success: false,
            message:
              "PAN is required when 80G information is requested.",
          },
          { status: 400 }
        );
      }

      if (!isValidPAN(pan)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid PAN number.",
          },
          { status: 400 }
        );
      }
    }

    // ========================================================
    // NRI DOES NOT USE INDIAN 80G FLOW HERE
    // ========================================================

    const finalRequires80G =
      donorType === "indian" ? requires80G : false;

    const finalPAN =
      finalRequires80G ? pan : "";

    // ========================================================
    // RAZORPAY CONFIGURATION
    // ========================================================

    const keyId = clean(
      process.env.RAZORPAY_KEY_ID
    );

    const keySecret = clean(
      process.env.RAZORPAY_KEY_SECRET
    );

    if (!keyId || !keySecret) {
      console.error(
        "RAZORPAY ENVIRONMENT VARIABLES ARE MISSING."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Online payment configuration is currently unavailable.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // DATABASE
    // ========================================================

    await connectDB();

    // ========================================================
    // UNIQUE DONATION REFERENCE
    // ========================================================

    let donationReference =
      generateDonationReference();

    let existing =
      await Donation.findOne({
        donationReference,
      }).lean();

    let referenceAttempts = 0;

    while (existing && referenceAttempts < 5) {
      donationReference =
        generateDonationReference();

      existing =
        await Donation.findOne({
          donationReference,
        }).lean();

      referenceAttempts++;
    }

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to generate a unique donation reference. Please try again.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // CREATE PENDING DONATION
    // ========================================================

    const donation =
      await Donation.create({
        donationReference,

        donorName,

        mobile,

        email,

        address,

        requires80G:
          finalRequires80G,

        pan:
          finalPAN,

        amount,

        currency: "INR",

        razorpayOrderId: "",

        orderId: "",

        paymentStatus: "PENDING",

        paymentId: "",

        receiptNo: "",
      });

    createdDonationId =
      String(donation._id);

    // ========================================================
    // RAZORPAY ORDER PAYLOAD
    // ========================================================

    const amountPaise =
      Math.round(amount * 100);

    const razorpayOrderPayload = {
      amount: amountPaise,

      currency: "INR",

      receipt: donationReference,

      notes: {
        // -----------------------------------------------
        // Donation
        // -----------------------------------------------

        donationId:
          createdDonationId,

        donationReference,

        donationType:
          "one-time",

        donorType,

        donationMode,

        country,

        // -----------------------------------------------
        // Donor
        // -----------------------------------------------

        donorName,

        mobile,

        email,

        city,

        state,

        pinCode,

        // -----------------------------------------------
        // 80G
        // -----------------------------------------------

        requires80G:
          String(finalRequires80G),

        pan:
          finalPAN,

        // -----------------------------------------------
        // Campaign tracking
        // -----------------------------------------------

        sourceAction,

        action,

        buttonId,

        utmSource,

        utmMedium,

        utmCampaign,

        utmContent,

        utmTerm,

        landingPage,
      },
    };

    console.log(
      "======================================"
    );

    console.log(
      "RAZORPAY ORDER"
    );

    console.log(
      "Reference:",
      donationReference
    );

    console.log(
      "Amount Paise:",
      amountPaise
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
      ).toString("base64");

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
    // RESPONSE
    // ========================================================

    const razorpayRaw =
      await razorpayResponse.text();

    console.log(
      "Razorpay HTTP Status:",
      razorpayResponse.status
    );

    // ========================================================
    // EMPTY RESPONSE
    // ========================================================

    if (!razorpayRaw.trim()) {
      await Donation.deleteOne({
        _id: donation._id,
      });

      createdDonationId = "";

      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay returned an empty response.",
        },
        { status: 502 }
      );
    }

    // ========================================================
    // PARSE RESPONSE
    // ========================================================

    let razorpayData: any;

    try {
      razorpayData =
        JSON.parse(razorpayRaw);
    } catch {
      await Donation.deleteOne({
        _id: donation._id,
      });

      createdDonationId = "";

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid response received from Razorpay.",
        },
        { status: 502 }
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
        _id: donation._id,
      });

      createdDonationId = "";

      return NextResponse.json(
        {
          success: false,

          message:
            razorpayData?.error?.description ||
            razorpayData?.message ||
            "Unable to create Razorpay order.",

          razorpayError:
            razorpayData?.error
              ? {
                  code:
                    razorpayData.error.code ||
                    null,

                  description:
                    razorpayData.error.description ||
                    null,

                  reason:
                    razorpayData.error.reason ||
                    null,
                }
              : null,
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
    // RAZORPAY ORDER ID
    // ========================================================

    const razorpayOrderId =
      clean(razorpayData.id);

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

    // ========================================================
    // UPDATE FAILURE
    // ========================================================

    if (!updatedDonation) {
      console.error(
        "DONATION UPDATE FAILED:",
        donation._id
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Donation was created but could not be linked with Razorpay order.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // FINAL RESPONSE
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
        Number(
          updatedDonation.amount
        ),

      amountPaise,

      currency: "INR",

      paymentStatus:
        updatedDonation.paymentStatus,

      donorName:
        updatedDonation.donorName,

      email:
        updatedDonation.email,

      mobile:
        updatedDonation.mobile,

      donationType:
        "one-time",

      donorType,

      donationMode,

      country,

      requires80G:
        finalRequires80G,

      // ------------------------------------------------------
      // Frontend Razorpay configuration
      // ------------------------------------------------------

      razorpay: {
        keyId,

        orderId:
          razorpayOrderId,

        amount:
          amountPaise,

        currency:
          "INR",
      },

      // ------------------------------------------------------
      // Tracking data returned to frontend
      // ------------------------------------------------------

      tracking: {
        sourceAction,

        action,

        buttonId,

        utmSource,

        utmMedium,

        utmCampaign,

        utmContent,

        utmTerm,

        landingPage,
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
      "Amount:",
      responseData.amount
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
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "======================================"
    );

    console.error(
      "AJFT CREATE ORDER ERROR"
    );

    console.error(error);

    console.error(
      "======================================"
    );

    // ========================================================
    // CLEAN UP DONATION IF SOMETHING FAILED
    // ========================================================

    if (createdDonationId) {
      try {
        await Donation.deleteOne({
          _id: createdDonationId,
          paymentStatus: "PENDING",
          razorpayOrderId: "",
        });
      } catch (cleanupError) {
        console.error(
          "DONATION CLEANUP ERROR:",
          cleanupError
        );
      }
    }

    // ========================================================
    // RESPONSE
    // ========================================================

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