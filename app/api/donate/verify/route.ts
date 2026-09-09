import { NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
|--------------------------------------------------------------------------
| AJFT PAYMENT VERIFICATION + SAMADHAAN4U LEDGER SYNC
|--------------------------------------------------------------------------
*/

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

function jsonResponse(
  data: Record<string, unknown>,
  status = 200
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

/*
|--------------------------------------------------------------------------
| SYNC DONATION TO SAMADHAAN4U
|--------------------------------------------------------------------------
*/

async function syncDonationToLedger(donation: any) {
  const ledgerUrl = clean(
    process.env.AJFT_LEDGER_SYNC_URL
  );

  const syncSecret = clean(
    process.env.AJFT_LEDGER_SYNC_SECRET
  );

  if (!ledgerUrl) {
    console.error(
      "AJFT_LEDGER_SYNC_URL is missing."
    );

    return {
      success: false,
      message: "Ledger sync URL is not configured.",
    };
  }

  if (!syncSecret) {
    console.error(
      "AJFT_LEDGER_SYNC_SECRET is missing."
    );

    return {
      success: false,
      message: "Ledger sync secret is not configured.",
    };
  }

  const payload = {
    donationReference:
      clean(donation.donationReference),

    donorName:
      clean(donation.donorName),

    mobile:
      clean(donation.mobile),

    email:
      clean(donation.email),

    address:
      clean(donation.address),

    pan:
      clean(donation.pan),

    amount:
      Number(donation.amount || 0),

    currency:
      clean(donation.currency) || "INR",

    paymentId:
      clean(donation.paymentId),

    razorpayOrderId:
      clean(donation.razorpayOrderId) ||
      clean(donation.orderId),

    receiptNo:
      clean(donation.receiptNo),

    paymentStatus:
      "SUCCESS",

    donationType:
      clean(donation.donationType) ||
      "One-time",

    donationMode:
      clean(donation.donationMode) ||
      "Indian",

    country:
      clean(donation.country),

    requires80G:
      Boolean(donation.requires80G),

    donationDate:
      donation.createdAt
        ? new Date(donation.createdAt)
            .toISOString()
            .slice(0, 10)
        : new Date()
            .toISOString()
            .slice(0, 10),

    source:
      "AJFTrust.org",
  };

  console.log(
    "======================================"
  );

  console.log(
    "AJFT → SAMADHAAN4U LEDGER SYNC"
  );

  console.log(
    "Ledger URL:",
    ledgerUrl
  );

  console.log(
    "Donation Reference:",
    payload.donationReference
  );

  console.log(
    "Payment ID:",
    payload.paymentId
  );

  console.log(
    "Amount:",
    payload.amount
  );

  console.log(
    "======================================"
  );

  try {
    const response = await fetch(
      ledgerUrl,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-AJFT-SECRET":
            syncSecret,
        },

        body: JSON.stringify(
          payload
        ),

        cache: "no-store",
      }
    );

    const rawResponse =
      await response.text();

    let data: any = {};

    try {
      data = rawResponse
        ? JSON.parse(rawResponse)
        : {};
    } catch {
      data = {
        success: false,
        message:
          "Invalid response from Ledger server.",
        rawResponse,
      };
    }

    console.log(
      "Ledger HTTP Status:",
      response.status
    );

    console.log(
      "Ledger Response:",
      data
    );

    if (
      !response.ok ||
      data?.success !== true
    ) {
      return {
        success: false,

        message:
          data?.message ||
          "Ledger synchronization failed.",

        status:
          response.status,

        response: data,
      };
    }

    return {
      success: true,

      message:
        data?.message ||
        "Donation synchronized successfully.",

      donationId:
        data?.donationId ?? null,

      ledgerId:
        data?.ledgerId ?? null,

      duplicate:
        Boolean(data?.duplicate),

      response: data,
    };

  } catch (error) {

    console.error(
      "AJFT LEDGER SYNC ERROR:",
      error
    );

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Unable to connect to Ledger server.",
    };
  }
}

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
| Razorpay payment verification
|--------------------------------------------------------------------------
*/

export async function POST(
  request: Request
) {
  try {

    /*
    |--------------------------------------------------------------------------
    | REQUEST BODY
    |--------------------------------------------------------------------------
    */

    const body =
      await request.json();

    console.log(
      "======================================"
    );

    console.log(
      "AJFT PAYMENT VERIFICATION"
    );

    console.log(
      "======================================"
    );

    /*
    |--------------------------------------------------------------------------
    | INPUT
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (!donationId) {
      return jsonResponse(
        {
          success: false,
          message:
            "Donation ID is required.",
        },
        400
      );
    }

    if (!razorpayOrderId) {
      return jsonResponse(
        {
          success: false,
          message:
            "Razorpay order ID is required.",
        },
        400
      );
    }

    if (!razorpayPaymentId) {
      return jsonResponse(
        {
          success: false,
          message:
            "Razorpay payment ID is required.",
        },
        400
      );
    }

    if (!razorpaySignature) {
      return jsonResponse(
        {
          success: false,
          message:
            "Razorpay signature is required.",
        },
        400
      );
    }

    /*
    |--------------------------------------------------------------------------
    | RAZORPAY SECRET
    |--------------------------------------------------------------------------
    */

    const razorpaySecret =
      clean(
        process.env
          .RAZORPAY_KEY_SECRET
      );

    if (!razorpaySecret) {

      console.error(
        "RAZORPAY_KEY_SECRET IS MISSING."
      );

      return jsonResponse(
        {
          success: false,
          message:
            "Razorpay server configuration is missing.",
        },
        500
      );
    }

    /*
    |--------------------------------------------------------------------------
    | DATABASE
    |--------------------------------------------------------------------------
    */

    await connectDB();

    /*
    |--------------------------------------------------------------------------
    | FIND DONATION
    |--------------------------------------------------------------------------
    */

    const donation =
      await Donation.findById(
        donationId
      );

    if (!donation) {
      return jsonResponse(
        {
          success: false,
          message:
            "Donation record was not found.",
        },
        404
      );
    }

    /*
    |--------------------------------------------------------------------------
    | ALREADY VERIFIED
    |--------------------------------------------------------------------------
    |
    | If frontend retries verification, don't create another payment.
    |--------------------------------------------------------------------------
    */

    if (
      String(
        donation.paymentStatus || ""
      ).toUpperCase() === "SUCCESS"
    ) {

      console.log(
        "Donation already verified."
      );

      /*
      | Still attempt Ledger sync.
      | The Ledger API itself has duplicate protection.
      */

      const ledgerSync =
        await syncDonationToLedger(
          donation
        );

      return jsonResponse({
        success: true,

        message:
          "Donation was already verified.",

        alreadyVerified: true,

        ledgerSync,

        donation: {
          _id:
            String(
              donation._id
            ),

          donationReference:
            clean(
              donation.donationReference
            ),

          donorName:
            clean(
              donation.donorName
            ),

          mobile:
            clean(
              donation.mobile
            ),

          email:
            clean(
              donation.email
            ),

          address:
            clean(
              donation.address
            ),

          requires80G:
            Boolean(
              donation.requires80G
            ),

          pan:
            clean(
              donation.pan
            ),

          amount:
            Number(
              donation.amount || 0
            ),

          currency:
            clean(
              donation.currency
            ) || "INR",

          razorpayOrderId:
            clean(
              donation.razorpayOrderId
            ),

          orderId:
            clean(
              donation.orderId
            ),

          paymentStatus:
            "SUCCESS",

          paymentId:
            clean(
              donation.paymentId
            ),

          receiptNo:
            clean(
              donation.receiptNo
            ),

          createdAt:
            donation.createdAt,

          updatedAt:
            donation.updatedAt,
        },

        receiptUrl:
          `/api/donate/receipt?donationId=${encodeURIComponent(
            String(donation._id)
          )}`,

        verifyUrl:
          `/verify?receiptNo=${encodeURIComponent(
            clean(donation.receiptNo)
          )}`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | SAVED RAZORPAY ORDER
    |--------------------------------------------------------------------------
    */

    const savedOrderId =
      clean(
        donation.razorpayOrderId
      ) ||
      clean(
        donation.orderId
      );

    if (
      !savedOrderId ||
      savedOrderId !==
        razorpayOrderId
    ) {

      console.error(
        "RAZORPAY ORDER MISMATCH"
      );

      return jsonResponse(
        {
          success: false,

          message:
            "Razorpay order does not match the donation record.",

          orderMatch: false,
        },
        400
      );
    }

    /*
    |--------------------------------------------------------------------------
    | RAZORPAY SIGNATURE
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | SAFE SIGNATURE COMPARE
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | INVALID SIGNATURE
    |--------------------------------------------------------------------------
    */

    if (!signatureValid) {

      console.error(
        "RAZORPAY SIGNATURE INVALID"
      );

      return jsonResponse(
        {
          success: false,

          message:
            "Payment signature verification failed.",

          paymentStatus:
            "FAILED",
        },
        400
      );
    }

    /*
    |--------------------------------------------------------------------------
    | RECEIPT NUMBER
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | UPDATE DONATION
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | LEDGER SYNC
    |--------------------------------------------------------------------------
    |
    | Payment has already been cryptographically verified.
    |--------------------------------------------------------------------------
    */

    const ledgerSync =
      await syncDonationToLedger(
        donation
      );

    /*
    |--------------------------------------------------------------------------
    | VERIFY AGAIN FROM DATABASE
    |--------------------------------------------------------------------------
    */

    const verifiedDonation =
      await Donation.findById(
        donation._id
      ).lean();

    if (!verifiedDonation) {

      return jsonResponse(
        {
          success: false,

          message:
            "Donation could not be loaded after verification.",

          ledgerSync,
        },
        500
      );
    }

    /*
    |--------------------------------------------------------------------------
    | FINAL RESPONSE
    |--------------------------------------------------------------------------
    */

    const responseData = {

      success: true,

      message:
        "Donation verified successfully.",

      paymentStatus:
        "SUCCESS",

      ledgerSync,

      ledgerSynced:
        Boolean(
          ledgerSync?.success
        ),

      donation: {

        _id:
          String(
            verifiedDonation._id
          ),

        donationReference:
          clean(
            verifiedDonation.donationReference
          ),

        donorName:
          clean(
            verifiedDonation.donorName
          ),

        mobile:
          clean(
            verifiedDonation.mobile
          ),

        email:
          clean(
            verifiedDonation.email
          ),

        address:
          clean(
            verifiedDonation.address
          ),

        requires80G:
          Boolean(
            verifiedDonation.requires80G
          ),

        pan:
          clean(
            verifiedDonation.pan
          ),

        amount:
          Number(
            verifiedDonation.amount || 0
          ),

        currency:
          clean(
            verifiedDonation.currency
          ) || "INR",

        razorpayOrderId:
          clean(
            verifiedDonation.razorpayOrderId
          ),

        orderId:
          clean(
            verifiedDonation.orderId
          ),

        paymentStatus:
          clean(
            verifiedDonation.paymentStatus
          ) || "SUCCESS",

        paymentId:
          clean(
            verifiedDonation.paymentId
          ),

        receiptNo:
          clean(
            verifiedDonation.receiptNo
          ) || receiptNo,

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
          clean(
            verifiedDonation.receiptNo
          ) || receiptNo
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
      "Ledger Synced:",
      responseData.ledgerSynced
    );

    console.log(
      "======================================"
    );

    return jsonResponse(
      responseData,
      200
    );

  } catch (error) {

    console.error(
      "======================================"
    );

    console.error(
      "AJFT VERIFY ERROR:",
      error
    );

    console.error(
      "======================================"
    );

    return jsonResponse(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to verify donation.",
      },
      500
    );
  }
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
| Used only for checking an already verified donation.
|--------------------------------------------------------------------------
*/

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

    if (
      !donationId &&
      !receiptNo &&
      !reference &&
      !orderId &&
      !paymentId
    ) {

      return jsonResponse(
        {
          success: false,

          message:
            "Donation ID or receipt number is required.",
        },
        400
      );
    }

    await connectDB();

    let donation: any = null;

    /*
    |--------------------------------------------------------------------------
    | 1. DONATION ID
    |--------------------------------------------------------------------------
    */

    if (donationId) {

      try {

        donation =
          await Donation.findById(
            donationId
          ).lean();

      } catch {
        donation = null;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | 2. RECEIPT
    |--------------------------------------------------------------------------
    */

    if (
      !donation &&
      receiptNo
    ) {

      donation =
        await Donation.findOne({
          receiptNo,
        }).lean();
    }

    /*
    |--------------------------------------------------------------------------
    | 3. REFERENCE
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | 4. ORDER
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | 5. PAYMENT
    |--------------------------------------------------------------------------
    */

    if (
      !donation &&
      paymentId
    ) {

      donation =
        await Donation.findOne({
          paymentId,
        }).lean();
    }

    /*
    |--------------------------------------------------------------------------
    | NOT FOUND
    |--------------------------------------------------------------------------
    */

    if (!donation) {

      return jsonResponse(
        {
          success: false,

          message:
            "Donation receipt could not be found.",
        },
        404
      );
    }

    /*
    |--------------------------------------------------------------------------
    | PAYMENT STATUS
    |--------------------------------------------------------------------------
    */

    if (
      String(
        donation.paymentStatus || ""
      ).toUpperCase() !==
      "SUCCESS"
    ) {

      return jsonResponse(
        {
          success: false,

          message:
            "This donation payment is not marked as successful.",

          paymentStatus:
            donation.paymentStatus ||
            "PENDING",
        },
        403
      );
    }

    /*
    |--------------------------------------------------------------------------
    | RECEIPT
    |--------------------------------------------------------------------------
    */

    let finalReceiptNo =
      clean(
        donation.receiptNo
      );

    if (!finalReceiptNo) {

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

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return jsonResponse({

      success: true,

      message:
        "Donation verified successfully.",

      donation: {

        _id:
          String(
            donation._id
          ),

        donationReference:
          clean(
            donation.donationReference
          ),

        donorName:
          clean(
            donation.donorName
          ),

        mobile:
          clean(
            donation.mobile
          ),

        email:
          clean(
            donation.email
          ),

        address:
          clean(
            donation.address
          ),

        requires80G:
          Boolean(
            donation.requires80G
          ),

        pan:
          clean(
            donation.pan
          ),

        amount:
          Number(
            donation.amount || 0
          ),

        currency:
          clean(
            donation.currency
          ) || "INR",

        razorpayOrderId:
          clean(
            donation.razorpayOrderId
          ),

        orderId:
          clean(
            donation.orderId
          ),

        paymentStatus:
          clean(
            donation.paymentStatus
          ),

        paymentId:
          clean(
            donation.paymentId
          ),

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
    });

  } catch (error) {

    console.error(
      "AJFT VERIFY GET ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to verify donation.",
      },
      500
    );
  }
}
