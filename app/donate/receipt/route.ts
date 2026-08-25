import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// COMMON VERIFY
// ============================================================

async function handleVerify(request: Request) {
  try {
    let donationId = "";
    let receiptNo = "";
    let reference = "";
    let paymentId = "";
    let orderId = "";

    // ========================================================
    // GET
    // ========================================================

    if (request.method === "GET") {
      const url = new URL(request.url);

      donationId =
        url.searchParams.get("donationId")?.trim() || "";

      receiptNo =
        url.searchParams.get("receiptNo")?.trim() || "";

      reference =
        url.searchParams.get("reference")?.trim() || "";

      paymentId =
        url.searchParams.get("paymentId")?.trim() || "";

      orderId =
        url.searchParams.get("orderId")?.trim() || "";
    }

    // ========================================================
    // POST
    // ========================================================

    if (request.method === "POST") {
      let body: any = {};

      try {
        body = await request.json();
      } catch {
        body = {};
      }

      donationId =
        String(body.donationId || "").trim();

      receiptNo =
        String(body.receiptNo || "").trim();

      reference =
        String(body.reference || "").trim();

      paymentId =
        String(body.paymentId || "").trim();

      orderId =
        String(body.orderId || "").trim();
    }

    console.log("======================================");
    console.log("AJFT VERIFY");
    console.log({
      donationId,
      receiptNo,
      reference,
      paymentId,
      orderId,
    });
    console.log("======================================");

    // ========================================================
    // VALIDATION
    // ========================================================

    if (
      !donationId &&
      !receiptNo &&
      !reference &&
      !paymentId &&
      !orderId
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

    let donation: any = null;

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
        donation = null;
      }
    }

    // ========================================================
    // 2. RECEIPT NUMBER
    // ========================================================

    if (!donation && receiptNo) {
      donation =
        await Donation.findOne({
          receiptNo,
        }).lean();
    }

    // ========================================================
    // 3. DONATION REFERENCE
    // ========================================================

    if (!donation && reference) {
      donation =
        await Donation.findOne({
          donationReference:
            reference,
        }).lean();
    }

    // ========================================================
    // 4. PAYMENT ID
    // ========================================================

    if (!donation && paymentId) {
      donation =
        await Donation.findOne({
          paymentId,
        }).lean();
    }

    // ========================================================
    // 5. ORDER ID
    // ========================================================

    if (!donation && orderId) {
      donation =
        await Donation.findOne({
          $or: [
            {
              razorpayOrderId:
                orderId,
            },
            {
              orderId,
            },
          ],
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
            "Donation record could not be found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // PAYMENT STATUS
    // ========================================================

    const status =
      String(
        donation.paymentStatus || ""
      ).toUpperCase();

    if (status !== "SUCCESS") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation payment is not successful.",
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
    // RECEIPT NUMBER
    // ========================================================

    let finalReceipt =
      String(
        donation.receiptNo || ""
      ).trim();

    if (!finalReceipt) {
      const year =
        donation.createdAt
          ? new Date(
              donation.createdAt
            ).getFullYear()
          : new Date().getFullYear();

      finalReceipt =
        `AJFT-${year}-${String(
          donation._id
        )
          .slice(-8)
          .toUpperCase()}`;

      await Donation.updateOne(
        {
          _id: donation._id,
        },
        {
          $set: {
            receiptNo:
              finalReceipt,
          },
        }
      );
    }

    // ========================================================
    // RESULT
    // ========================================================

    const result = {
      _id: String(
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
          donation.amount || 0
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
        finalReceipt,

      createdAt:
        donation.createdAt,

      updatedAt:
        donation.updatedAt,

      verifiedAt:
        new Date().toISOString(),
    };

    console.log(
      "PAYMENT VERIFIED SUCCESSFULLY"
    );

    console.log(
      "Donation ID:",
      result._id
    );

    console.log(
      "Order ID:",
      result.orderId
    );

    console.log(
      "Payment ID:",
      result.paymentId
    );

    console.log(
      "Receipt:",
      result.receiptNo
    );

    // ========================================================
    // ALWAYS JSON
    // ========================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Donation verified successfully.",

        donation: result,

        receiptUrl:
          `/api/donate/receipt?donationId=${encodeURIComponent(
            result._id
          )}`,

        verifyUrl:
          `/verify?receiptNo=${encodeURIComponent(
            result.receiptNo
          )}`,
      },
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json; charset=utf-8",

          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "AJFT VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Verification server error.",
      },
      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json; charset=utf-8",

          "Cache-Control":
            "no-store",
        },
      }
    );
  }
}

// ============================================================
// GET
// ============================================================

export async function GET(
  request: Request
) {
  return handleVerify(request);
}

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request
) {
  return handleVerify(request);
}