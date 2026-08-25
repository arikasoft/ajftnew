import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const receipt = searchParams
      .get("receipt")
      ?.trim();

    if (!receipt) {
      return NextResponse.json(
        {
          success: false,
          message: "Receipt number is required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const db = client.db("ajft");

    const donation = await db
      .collection("donations")
      .findOne({
        receiptNo: receipt,
        paymentStatus: "SUCCESS",
      });

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Receipt not found or not verified.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,

      receiptNo: donation.receiptNo,

      donationReference:
        donation.donationReference,

      donorName:
        donation.donorName,

      amount:
        donation.amount,

      currency:
        donation.currency || "INR",

      paymentStatus:
        donation.paymentStatus,

      createdAt:
        donation.createdAt,
    });
  } catch (error) {
    console.error(
      "RECEIPT VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        verified: false,
        message: "Unable to verify receipt.",
      },
      { status: 500 }
    );
  }
}