import { NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";
import {
  sendDonationReceiptEmail,
  sendAdminDonationNotification,
} from "@/lib/email";

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
| DONATION EMAIL NOTIFICATIONS
|--------------------------------------------------------------------------
*/

type EmailNotificationField =
  | "donorEmailNotification"
  | "adminEmailNotification";

async function claimEmailNotification(
  donationId: string,
  field: EmailNotificationField
): Promise<boolean> {
  const now = new Date();
  const staleTime = new Date(
    now.getTime() - 10 * 60 * 1000
  );

  const statusPath = `${field}.status`;
  const attemptsPath = `${field}.attempts`;
  const lastAttemptPath = `${field}.lastAttemptAt`;
  const lastErrorPath = `${field}.lastError`;

  const claimed = await Donation.findOneAndUpdate(
    {
      _id: donationId,
      paymentStatus: "SUCCESS",
      $or: [
        {
          [statusPath]: {
            $in: ["PENDING", "FAILED"],
          },
        },
        {
          [statusPath]: {
            $exists: false,
          },
        },
        {
          [statusPath]: "SENDING",
          [lastAttemptPath]: {
            $lt: staleTime,
          },
        },
      ],
    },
    {
      $set: {
        [statusPath]: "SENDING",
        [lastAttemptPath]: now,
        [lastErrorPath]: "",
      },
      $inc: {
        [attemptsPath]: 1,
      },
    },
    {
      new: true,
    }
  );

  return Boolean(claimed);
}

async function updateEmailStatus(
  donationId: string,
  field: EmailNotificationField,
  status: "SENT" | "FAILED",
  messageId = "",
  errorMessage = ""
): Promise<void> {
  const statusPath = `${field}.status`;
  const sentAtPath = `${field}.sentAt`;
  const messageIdPath = `${field}.messageId`;
  const lastErrorPath = `${field}.lastError`;

  const update: Record<string, unknown> = {
    [statusPath]: status,
    [messageIdPath]: messageId,
    [lastErrorPath]: errorMessage.slice(0, 500),
  };

  if (status === "SENT") {
    update[sentAtPath] = new Date();
  }

  await Donation.updateOne(
    { _id: donationId },
    { $set: update }
  );
}

async function sendDonationNotifications(
  donation: any,
  requestUrl: string
): Promise<void> {
  const donationId = String(donation._id);
  const receiptNo = clean(donation.receiptNo);

  const verifyUrl = new URL(
    `/verify?receiptNo=${encodeURIComponent(receiptNo)}`,
    requestUrl
  ).toString();

  // ----------------------------------------------------------
  // DONOR EMAIL WITH PDF RECEIPT ATTACHMENT
  // ----------------------------------------------------------

  try {
    const claimed = await claimEmailNotification(
      donationId,
      "donorEmailNotification"
    );

    if (claimed) {
      try {
        const receiptUrl = new URL(
          `/api/donate/receipt?donationId=${encodeURIComponent(donationId)}`,
          requestUrl
        );

        console.log(
          "AJFT RECEIPT PDF REQUEST:",
          receiptUrl.toString()
        );

        const receiptResponse = await fetch(receiptUrl, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/pdf",
          },
        });

        if (!receiptResponse.ok) {
          const responseText = await receiptResponse.text().catch(() => "");
          throw new Error(
            `Receipt PDF generation failed: HTTP ${receiptResponse.status}. ${responseText.slice(0, 250)}`
          );
        }

        const contentType =
          receiptResponse.headers.get("content-type") || "";

        if (!contentType.toLowerCase().includes("application/pdf")) {
          throw new Error(
            "Receipt API did not return a PDF document."
          );
        }

        const receiptPdfBuffer = Buffer.from(
          await receiptResponse.arrayBuffer()
        );

        const info = await sendDonationReceiptEmail({
          donorName: clean(donation.donorName),
          donorEmail: clean(donation.email),
          donationReference: clean(donation.donationReference),
          receiptNo,
          amount: Number(donation.amount || 0),
          currency: clean(donation.currency) || "INR",
          paymentId: clean(donation.paymentId),
          donationType: clean(donation.donationType),
          requires80G: Boolean(donation.requires80G),
          receiptPdfBuffer,
          verifyUrl,
        });

        await updateEmailStatus(
          donationId,
          "donorEmailNotification",
          "SENT",
          clean(info.messageId)
        );

        console.log(
          "AJFT DONOR EMAIL SENT:",
          donationId,
          clean(info.messageId)
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Donor email delivery failed.";

        try {
          await updateEmailStatus(
            donationId,
            "donorEmailNotification",
            "FAILED",
            "",
            message
          );
        } catch (statusError) {
          console.error(
            "DONOR EMAIL STATUS UPDATE ERROR:",
            statusError
          );
        }

        console.error("AJFT DONOR EMAIL ERROR:", message);
      }
    }
  } catch (error) {
    console.error(
      "AJFT DONOR EMAIL CLAIM ERROR:",
      error
    );
  }

  // ----------------------------------------------------------
  // ADMIN DONATION NOTIFICATION
  // ----------------------------------------------------------

  try {
    const claimed = await claimEmailNotification(
      donationId,
      "adminEmailNotification"
    );

    if (claimed) {
      try {
        const info = await sendAdminDonationNotification({
          donorName: clean(donation.donorName),
          donorEmail: clean(donation.email),
          mobile: clean(donation.mobile),
          donationReference: clean(donation.donationReference),
          receiptNo,
          amount: Number(donation.amount || 0),
          currency: clean(donation.currency) || "INR",
          paymentId: clean(donation.paymentId),
          donationType: clean(donation.donationType),
          requires80G: Boolean(donation.requires80G),
        });

        await updateEmailStatus(
          donationId,
          "adminEmailNotification",
          "SENT",
          clean(info.messageId)
        );

        console.log(
          "AJFT ADMIN EMAIL SENT:",
          donationId,
          clean(info.messageId)
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Admin email delivery failed.";

        try {
          await updateEmailStatus(
            donationId,
            "adminEmailNotification",
            "FAILED",
            "",
            message
          );
        } catch (statusError) {
          console.error(
            "ADMIN EMAIL STATUS UPDATE ERROR:",
            statusError
          );
        }

        console.error("AJFT ADMIN EMAIL ERROR:", message);
      }
    }
  } catch (error) {
    console.error(
      "AJFT ADMIN EMAIL CLAIM ERROR:",
      error
    );
  }
}

function getEmailNotificationSummary(donation: any) {
  return {
    donor: {
      status: clean(donation?.donorEmailNotification?.status) || "PENDING",
      attempts: Number(donation?.donorEmailNotification?.attempts || 0),
      sentAt: donation?.donorEmailNotification?.sentAt || null,
      lastError: clean(donation?.donorEmailNotification?.lastError),
    },
    admin: {
      status: clean(donation?.adminEmailNotification?.status) || "PENDING",
      attempts: Number(donation?.adminEmailNotification?.attempts || 0),
      sentAt: donation?.adminEmailNotification?.sentAt || null,
      lastError: clean(donation?.adminEmailNotification?.lastError),
    },
  };
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

      // Re-check the saved order and payment IDs before allowing
      // an already-verified request to trigger email retries.
      const savedVerifiedOrderId =
        clean(donation.razorpayOrderId) ||
        clean(donation.orderId);

      if (
        savedVerifiedOrderId !== razorpayOrderId ||
        clean(donation.paymentId) !== razorpayPaymentId
      ) {
        return jsonResponse(
          {
            success: false,
            message: "Verified payment details do not match.",
          },
          400
        );
      }

      const retrySignaturePayload =
        `${razorpayOrderId}|${razorpayPaymentId}`;

      const retryExpectedSignature = crypto
        .createHmac("sha256", razorpaySecret)
        .update(retrySignaturePayload)
        .digest("hex");

      const retryExpectedBuffer = Buffer.from(
        retryExpectedSignature,
        "utf8"
      );

      const retryReceivedBuffer = Buffer.from(
        razorpaySignature,
        "utf8"
      );

      const retrySignatureValid =
        retryExpectedBuffer.length === retryReceivedBuffer.length &&
        crypto.timingSafeEqual(
          retryExpectedBuffer,
          retryReceivedBuffer
        );

      if (!retrySignatureValid) {
        return jsonResponse(
          {
            success: false,
            message: "Payment signature verification failed.",
          },
          400
        );
      }

      // Retry only pending/failed notifications. SENT emails are skipped.
      await sendDonationNotifications(
        donation,
        request.url
      );

      const refreshedDonationAfterEmail =
        await Donation.findById(donation._id).lean();

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

        emailNotifications: getEmailNotificationSummary(
          refreshedDonationAfterEmail || donation
        ),

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

    // Email failures are recorded but never reverse payment SUCCESS
    // or change the Ledger synchronization result.
    await sendDonationNotifications(
      verifiedDonation,
      request.url
    );

    const donationAfterEmail =
      await Donation.findById(verifiedDonation._id).lean();

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

      emailNotifications: getEmailNotificationSummary(
        donationAfterEmail || verifiedDonation
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
