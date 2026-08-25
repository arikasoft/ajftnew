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

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request
) {
  try {
    // ========================================================
    // REQUEST BODY
    // ========================================================

    const body =
      await request.json();

    console.log(
      "======================================"
    );

    console.log(
      "AJFT PAYMENT VERIFICATION"
    );

    console.log(
      "REQUEST BODY:",
      body
    );

    console.log(
      "======================================"
    );

    // ========================================================
    // INPUT
    // ========================================================

    const donationId =
      clean(
        body?.donationId
      );

    const razorpayOrderId =
      clean(
        body?.razorpay_order_id ||
          body?.razorpayOrderId ||
          body?.orderId
      );

    const razorpayPaymentId =
      clean(
        body?.razorpay_payment_id ||
          body?.razorpayPaymentId ||
          body?.paymentId
      );

    const razorpaySignature =
      clean(
        body?.razorpay_signature ||
          body?.razorpaySignature ||
          body?.signature
      );

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!donationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!razorpayOrderId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!razorpayPaymentId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay payment ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!razorpaySignature) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay signature is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // RAZORPAY SECRET
    // ========================================================

    const razorpaySecret =
      clean(
        process.env
          .RAZORPAY_KEY_SECRET
      );

    if (!razorpaySecret) {
      console.error(
        "RAZORPAY_KEY_SECRET IS MISSING."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Razorpay server configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    // ========================================================
    // DATABASE
    // ========================================================

    await connectDB();

    // ========================================================
    // FIND DONATION
    // ========================================================

    const donation =
      await Donation.findById(
        donationId
      );

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation record was not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // SAVED ORDER
    // ========================================================

    const savedOrderId =
      clean(
        donation.razorpayOrderId
      ) ||
      clean(
        donation.orderId
      );

    console.log(
      "Donation ID:",
      String(
        donation._id
      )
    );

    console.log(
      "Saved Razorpay Order:",
      savedOrderId
    );

    console.log(
      "Received Razorpay Order:",
      razorpayOrderId
    );

    // ========================================================
    // ORDER MATCH
    // ========================================================

    if (
      !savedOrderId ||
      savedOrderId !==
        razorpayOrderId
    ) {
      console.error(
        "RAZORPAY ORDER MISMATCH"
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Razorpay order does not match the donation record.",

          orderMatch: false,
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // SIGNATURE
    //
    // Razorpay:
    //
    // HMAC SHA256
    // order_id|payment_id
    // ========================================================

    const signaturePayload =
      `${razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          razorpaySecret
        )
        .update(
          signaturePayload
        )
        .digest("hex");

    // ========================================================
    // SAFE SIGNATURE COMPARE
    // ========================================================

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        razorpaySignature,
        "utf8"
      );

    const signatureValid =
      expectedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    console.log(
      "Signature verified:",
      signatureValid
    );

    // ========================================================
    // INVALID SIGNATURE
    // ========================================================

    if (!signatureValid) {
      console.error(
        "RAZORPAY SIGNATURE INVALID"
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Payment signature verification failed.",

          paymentStatus:
            "FAILED",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // RECEIPT NUMBER
    // ========================================================

    let receiptNo =
      clean(
        donation.receiptNo
      );

    if (!receiptNo) {
      const year =
        donation.createdAt
          ? new Date(
              donation.createdAt
            ).getFullYear()
          : new Date().getFullYear();

      receiptNo =
        `AJFT-${year}-${String(
          donation._id
        )
          .slice(-8)
          .toUpperCase()}`;
    }

    // ========================================================
    // UPDATE DONATION
    // ========================================================

    donation.paymentStatus =
      "SUCCESS";

    donation.paymentId =
      razorpayPaymentId;

    donation.razorpayOrderId =
      razorpayOrderId;

    donation.orderId =
      razorpayOrderId;

    donation.receiptNo =
      receiptNo;

    await donation.save();

    // ========================================================
    // VERIFY AGAIN FROM DATABASE
    // ========================================================

    const verifiedDonation =
      await Donation.findById(
        donation._id
      ).lean();

    if (!verifiedDonation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation could not be loaded after verification.",
        },
        {
          status: 500,
        }
      );
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    const responseData = {
      success: true,

      message:
        "Donation verified successfully.",

      donation: {
        _id:
          String(
            verifiedDonation._id
          ),

        donationReference:
          verifiedDonation.donationReference ||
          "",

        donorName:
          verifiedDonation.donorName ||
          "",

        mobile:
          verifiedDonation.mobile ||
          "",

        email:
          verifiedDonation.email ||
          "",

        address:
          verifiedDonation.address ||
          "",

        requires80G:
          Boolean(
            verifiedDonation.requires80G
          ),

        pan:
          verifiedDonation.pan ||
          "",

        amount:
          Number(
            verifiedDonation.amount ||
              0
          ),

        currency:
          verifiedDonation.currency ||
          "INR",

        razorpayOrderId:
          verifiedDonation.razorpayOrderId ||
          "",

        orderId:
          verifiedDonation.orderId ||
          "",

        paymentStatus:
          verifiedDonation.paymentStatus ||
          "SUCCESS",

        paymentId:
          verifiedDonation.paymentId ||
          "",

        receiptNo:
          verifiedDonation.receiptNo ||
          receiptNo,

        createdAt:
          verifiedDonation.createdAt,

        updatedAt:
          verifiedDonation.updatedAt,
      },

      receiptUrl:
        `/api/donate/receipt?donationId=${encodeURIComponent(
          String(
            verifiedDonation._id
          )
        )}`,

      verifyUrl:
        `/verify?receiptNo=${encodeURIComponent(
          verifiedDonation.receiptNo ||
            receiptNo
        )}`,
    };

    console.log(
      "======================================"
    );

    console.log(
      "PAYMENT VERIFIED SUCCESSFULLY"
    );

    console.log(
      "Donation ID:",
      responseData.donation._id
    );

    console.log(
      "Reference:",
      responseData.donation
        .donationReference
    );

    console.log(
      "Order ID:",
      responseData.donation
        .razorpayOrderId
    );

    console.log(
      "Payment ID:",
      responseData.donation
        .paymentId
    );

    console.log(
      "Receipt:",
      responseData.donation
        .receiptNo
    );

    console.log(
      "Status:",
      responseData.donation
        .paymentStatus
    );

    console.log(
      "======================================"
    );

    return NextResponse.json(
      responseData,
      {
        status: 200,

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
      "AJFT VERIFY ERROR:"
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
            : "Unable to verify donation.",
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

// ============================================================
// GET
//
// GET is ONLY for checking an already verified donation.
// Payment signature verification happens through POST.
// ============================================================

export async function GET(
  request: Request
) {
  try {
    const url =
      new URL(
        request.url
      );

    const donationId =
      clean(
        url.searchParams.get(
          "donationId"
        )
      );

    const receiptNo =
      clean(
        url.searchParams.get(
          "receiptNo"
        )
      );

    const reference =
      clean(
        url.searchParams.get(
          "reference"
        )
      );

    const orderId =
      clean(
        url.searchParams.get(
          "orderId"
        )
      );

    const paymentId =
      clean(
        url.searchParams.get(
          "paymentId"
        )
      );

    // ========================================================
    // VALIDATION
    // ========================================================

    if (
      !donationId &&
      !receiptNo &&
      !reference &&
      !orderId &&
      !paymentId
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Donation ID or receipt number is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // DATABASE
    // ========================================================

    await connectDB();

    let donation: any =
      null;

    // ========================================================
    // 1. DONATION ID
    // ========================================================

    if (donationId) {
      try {
        donation =
          await Donation.findById(
            donationId
          ).lean();
      } catch {
        donation =
          null;
      }
    }

    // ========================================================
    // 2. RECEIPT
    // ========================================================

    if (
      !donation &&
      receiptNo
    ) {
      donation =
        await Donation.findOne({
          receiptNo,
        }).lean();
    }

    // ========================================================
    // 3. REFERENCE
    // ========================================================

    if (
      !donation &&
      reference
    ) {
      donation =
        await Donation.findOne({
          donationReference:
            reference,
        }).lean();
    }

    // ========================================================
    // 4. ORDER
    // ========================================================

    if (
      !donation &&
      orderId
    ) {
      donation =
        await Donation.findOne({
          $or: [
            {
              razorpayOrderId:
                orderId,
            },
            {
              orderId:
                orderId,
            },
          ],
        }).lean();
    }

    // ========================================================
    // 5. PAYMENT
    // ========================================================

    if (
      !donation &&
      paymentId
    ) {
      donation =
        await Donation.findOne({
          paymentId,
        }).lean();
    }

    // ========================================================
    // NOT FOUND
    // ========================================================

    if (!donation) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Donation receipt could not be found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // PAYMENT STATUS
    // ========================================================

    if (
      String(
        donation.paymentStatus ||
          ""
      ).toUpperCase() !==
      "SUCCESS"
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "This donation payment is not marked as successful.",

          paymentStatus:
            donation.paymentStatus ||
            "PENDING",
        },
        {
          status: 403,
        }
      );
    }

    // ========================================================
    // RECEIPT
    // ========================================================

    let finalReceiptNo =
      clean(
        donation.receiptNo
      );

    if (
      !finalReceiptNo
    ) {
      const year =
        donation.createdAt
          ? new Date(
              donation.createdAt
            ).getFullYear()
          : new Date().getFullYear();

      finalReceiptNo =
        `AJFT-${year}-${String(
          donation._id
        )
          .slice(-8)
          .toUpperCase()}`;
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Donation verified successfully.",

        donation: {
          _id:
            String(
              donation._id
            ),

          donationReference:
            donation.donationReference ||
            "",

          donorName:
            donation.donorName ||
            "",

          mobile:
            donation.mobile ||
            "",

          email:
            donation.email ||
            "",

          address:
            donation.address ||
            "",

          requires80G:
            Boolean(
              donation.requires80G
            ),

          pan:
            donation.pan ||
            "",

          amount:
            Number(
              donation.amount ||
                0
            ),

          currency:
            donation.currency ||
            "INR",

          razorpayOrderId:
            donation.razorpayOrderId ||
            "",

          orderId:
            donation.orderId ||
            "",

          paymentStatus:
            donation.paymentStatus ||
            "",

          paymentId:
            donation.paymentId ||
            "",

          receiptNo:
            finalReceiptNo,

          createdAt:
            donation.createdAt,

          updatedAt:
            donation.updatedAt,
        },

        receiptUrl:
          `/api/donate/receipt?donationId=${encodeURIComponent(
            String(
              donation._id
            )
          )}`,

        verifyUrl:
          `/verify?receiptNo=${encodeURIComponent(
            finalReceiptNo
          )}`,
      },
      {
        status: 200,

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
      "AJFT VERIFY GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to verify donation.",
      },
      {
        status: 500,
      }
    );
  }
}