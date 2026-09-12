import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(request: NextRequest) {
  try {
    // ========================================================
    // CONNECT MONGODB
    // ========================================================

    await connectDB();

    const body = await request.json();

    // ========================================================
    // GET DATA
    // ========================================================

    const donorName = String(
      body.donorName || ""
    ).trim();

    const mobile = String(
      body.mobile || ""
    ).trim();

    const email = String(
      body.email || ""
    )
      .trim()
      .toLowerCase();

    const address = String(
      body.address || ""
    ).trim();

    const pan = String(
      body.pan || ""
    )
      .trim()
      .toUpperCase();

    const amount = Number(body.amount);

    const requires80G =
      Boolean(body.requires80G);

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!donorName) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor name is required.",
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
          message: "Mobile number is required.",
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
          message: "Email address is required.",
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
            "Please enter a valid donation amount.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // DONATION REFERENCE
    // ========================================================

    /*
     * Manual donation unique reference.
     *
     * Example:
     * MANUAL-2026-8F3A91B2
     */

    const donationReference =
      `MANUAL-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

    // ========================================================
    // RECEIPT NUMBER
    // ========================================================

    /*
     * Existing receipt can also be entered manually.
     *
     * Example:
     * AJFT/2026/842490
     */

    let receiptNo = String(
      body.receiptNo || ""
    ).trim();

    /*
     * If receipt number is not provided,
     * generate a new one.
     */

    if (!receiptNo) {
      const year =
        new Date().getFullYear();

      /*
       * Find latest receipt.
       */

      const lastDonation =
        await Donation.findOne({
          receiptNo: {
            $regex:
              `^AJFT/${year}/`,
          },
        })
          .sort({
            createdAt: -1,
          })
          .lean();

      let nextNumber = 1;

      if (
        lastDonation &&
        lastDonation.receiptNo
      ) {
        const parts =
          lastDonation.receiptNo.split(
            "/"
          );

        const previousNumber =
          Number(parts[2]);

        if (
          Number.isFinite(
            previousNumber
          )
        ) {
          nextNumber =
            previousNumber + 1;
        }
      }

      receiptNo =
        `AJFT/${year}/${nextNumber}`;
    }

    // ========================================================
    // DUPLICATE RECEIPT CHECK
    // ========================================================

    const existingReceipt =
      await Donation.findOne({
        receiptNo,
      });

    if (existingReceipt) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This receipt number already exists.",
          receiptNo,
        },
        {
          status: 409,
        }
      );
    }

    // ========================================================
    // PAYMENT ID
    // ========================================================

    /*
     * For manual donations:
     *
     * User can enter:
     * - UTR Number
     * - Transaction ID
     * - Cheque Number
     *
     * Otherwise a unique manual ID is generated.
     */

    const paymentId =
      String(
        body.paymentId ||
          body.transactionId ||
          ""
      ).trim() ||
      `MANUAL-${Date.now()}`;

    // ========================================================
    // CREATE DONATION
    // ========================================================

    const donation =
      await Donation.create({
        donationReference,

        donorName,

        mobile,

        email,

        address,

        requires80G,

        pan,

        amount,

        currency: "INR",

        /*
         * Manual donation does not use Razorpay.
         */

        razorpayOrderId: "",

        orderId:
          String(
            body.orderId || ""
          ).trim(),

        /*
         * Manual donation is already received.
         */

        paymentStatus: "SUCCESS",

        paymentId,

        receiptNo,
      });

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    const baseUrl =
      (
        process.env
          .NEXT_PUBLIC_APP_URL ||
        "https://ajftrust.org"
      ).replace(/\/$/, "");

    return NextResponse.json(
      {
        success: true,

        message:
          "Manual donation added successfully.",

        donation: {
          id:
            donation._id.toString(),

          donationReference:
            donation.donationReference,

          donorName:
            donation.donorName,

          mobile:
            donation.mobile,

          email:
            donation.email,

          amount:
            donation.amount,

          receiptNo:
            donation.receiptNo,

          paymentStatus:
            donation.paymentStatus,
        },

        receiptUrl:
          `${baseUrl}/receipt/${encodeURIComponent(
            receiptNo
          )}`,

        verifyUrl:
          `${baseUrl}/verify?receipt=${encodeURIComponent(
            receiptNo
          )}`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "MANUAL DONATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to add manual donation.",

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}