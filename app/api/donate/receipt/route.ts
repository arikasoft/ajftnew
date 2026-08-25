import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// TRUST DETAILS
// ============================================================

const TRUST_NAME =
  "ANAND JIVAN FOUNDATION TRUST";

const TRUST_ADDRESS =
  "MABBI BELAUNA, POST - LALSHAHPUR, PANCHAYAT - SHAHBAJPUR, DARBHANGA, BIHAR - 846005, INDIA";

const TRUST_DARPAN =
  "BR/2023/0343963";

const TRUST_PAN =
  "AAJTA9323K";

const TRUST_PHONE =
  "+91 9155751363";

const TRUST_EMAIL =
  "info@ajftrust.org";

const TRUST_WEBSITE =
  "https://ajftrust.org";

// ============================================================
// LOCAL ASSETS
// ============================================================

const LOGO_PATH =
  path.join(
    process.cwd(),
    "public",
    "images",
    "ajft-logo.png"
  );

const SIGNATURE_PATH =
  path.join(
    process.cwd(),
    "public",
    "images",
    "ajft-signature.png"
  );

// ============================================================
// COLORS
// ============================================================

const C = {
  navy: "#0B3040",
  darkNavy: "#06232F",
  teal: "#08644F",
  green: "#197A4A",
  gold: "#C79A2B",
  lightGold: "#FBF7EA",
  paleGreen: "#EEF8F3",
  lightGray: "#F4F6F5",
  border: "#C9D4D0",
  text: "#263631",
  muted: "#687570",
  white: "#FFFFFF",
  red: "#A33A43",
};

// ============================================================
// GET
// ============================================================

export async function GET(
  request: Request
) {
  try {
    const url =
      new URL(request.url);

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

    // ========================================================
    // VALIDATION
    // ========================================================

    if (
      !donationId &&
      !receiptNo &&
      !reference
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation ID, receipt number or donation reference is required.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // DATABASE
    // ========================================================

    await connectDB();

    let donation: any = null;

    // ========================================================
    // FIND BY ID
    // ========================================================

    if (donationId) {
      try {
        donation =
          await Donation.findById(
            donationId
          ).lean();
      } catch (error) {
        console.error(
          "Donation ID error:",
          error
        );
      }
    }

    // ========================================================
    // FIND BY RECEIPT
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
    // FIND BY REFERENCE
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
    // NOT FOUND
    // ========================================================

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation record was not found.",
        },
        { status: 404 }
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
            "Receipt can only be generated for a successful donation.",
          paymentStatus:
            donation.paymentStatus ||
            "PENDING",
        },
        { status: 403 }
      );
    }

    // ========================================================
    // DONATION DATA
    // ========================================================

    const donorName =
      clean(
        donation.donorName
      ) || "N/A";

    const mobile =
      clean(
        donation.mobile
      ) || "N/A";

    const email =
      clean(
        donation.email
      ) || "N/A";

    const address =
      clean(
        donation.address
      ) || "N/A";

    const amount =
      Number(
        donation.amount || 0
      );

    const currency =
      clean(
        donation.currency
      ) || "INR";

    const donationReference =
      clean(
        donation.donationReference
      ) || "N/A";

    const paymentId =
      clean(
        donation.paymentId
      ) || "N/A";

    const razorpayOrderId =
      clean(
        donation.razorpayOrderId
      );

    const orderId =
      razorpayOrderId ||
      clean(
        donation.orderId
      ) ||
      "N/A";

    const requires80G =
      Boolean(
        donation.requires80G
      );

    const pan =
      requires80G
        ? clean(
            donation.pan
          ).toUpperCase() ||
          "N/A"
        : "NOT PROVIDED";

    // ========================================================
    // RECEIPT NUMBER
    // ========================================================

    const year =
      donation.createdAt
        ? new Date(
            donation.createdAt
          ).getFullYear()
        : new Date().getFullYear();

    const fallbackReceipt =
      donation._id
        ? `AJFT-${year}-${donation._id
            .toString()
            .slice(-8)
            .toUpperCase()}`
        : `AJFT-${year}-RECEIPT`;

    const finalReceiptNo =
      clean(
        donation.receiptNo
      ) || fallbackReceipt;

    // ========================================================
    // DATE
    // ========================================================

    const donationDate =
      formatDate(
        donation.createdAt
      );

    const donationDateTime =
      formatDateTime(
        donation.createdAt
      );

    // ========================================================
    // AMOUNT
    // ========================================================

    const amountFormatted =
      formatMoney(
        amount,
        currency
      );

    const amountWords =
      amountInWords(
        amount
      );

    // ========================================================
    // VERIFICATION URL
    // ========================================================

    const verifyUrl =
      `${TRUST_WEBSITE}/verify?receiptNo=${encodeURIComponent(
        finalReceiptNo
      )}`;

    // ========================================================
    // QR CODE
    // ========================================================

    const qrBuffer =
      await QRCode.toBuffer(
        verifyUrl,
        {
          type: "png",
          width: 200,
          margin: 1,
          errorCorrectionLevel:
            "M",
        }
      );

    // ========================================================
    // PDF
    //
    // HARD A4 LANDSCAPE
    // 841.89 × 595.28 points
    // ========================================================

    const pageWidth =
      841.89;

    const pageHeight =
      595.28;

    const doc =
      new PDFDocument({
        size: [
          pageWidth,
          pageHeight,
        ],
        margin: 0,
        autoFirstPage: true,
        compress: true,
      });

    const chunks: Buffer[] = [];

    const pdfPromise =
      new Promise<Buffer>(
        (
          resolve,
          reject
        ) => {
          doc.on(
            "data",
            (
              chunk: Buffer
            ) => {
              chunks.push(
                chunk
              );
            }
          );

          doc.on(
            "end",
            () => {
              resolve(
                Buffer.concat(
                  chunks
                )
              );
            }
          );

          doc.on(
            "error",
            reject
          );
        }
      );

    // ========================================================
    // PAGE MARGINS
    // ========================================================

    const outer = 12;
    const margin = 24;

    const contentWidth =
      pageWidth -
      margin * 2;

    // ========================================================
    // OUTER BORDER
    // ========================================================

    doc
      .lineWidth(1.7)
      .strokeColor(C.navy)
      .rect(
        outer,
        outer,
        pageWidth -
          outer * 2,
        pageHeight -
          outer * 2
      )
      .stroke();

    doc
      .lineWidth(0.7)
      .strokeColor(C.gold)
      .rect(
        outer + 5,
        outer + 5,
        pageWidth -
          (outer + 5) * 2,
        pageHeight -
          (outer + 5) * 2
      )
      .stroke();

    // ========================================================
    // HEADER
    // ========================================================

    let y = margin;

    const headerHeight = 86;

    doc
      .fillColor(C.navy)
      .rect(
        margin,
        y,
        contentWidth,
        headerHeight
      )
      .fill();

    // Gold top strip

    doc
      .fillColor(C.gold)
      .rect(
        margin,
        y,
        contentWidth,
        4
      )
      .fill();

    // ========================================================
    // LOGO
    // ========================================================

    if (
      fs.existsSync(
        LOGO_PATH
      )
    ) {
      doc.image(
        LOGO_PATH,
        margin + 15,
        y + 13,
        {
          fit: [62, 62],
          align: "center",
          valign: "center",
        }
      );
    } else {
      // Fallback logo
      doc
        .fillColor(C.white)
        .circle(
          margin + 46,
          y + 43,
          28
        )
        .fill();

      doc
        .font(
          "Helvetica-Bold"
        )
        .fontSize(10)
        .fillColor(C.navy)
        .text(
          "AJFT",
          margin + 26,
          y + 39,
          {
            width: 40,
            align: "center",
          }
        );
    }

    // ========================================================
    // TRUST NAME
    // ========================================================

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(19)
      .fillColor(C.white)
      .text(
        TRUST_NAME,
        margin + 88,
        y + 12
      );

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(7.3)
      .fillColor(C.gold)
      .text(
        "REGISTERED CHARITABLE ORGANIZATION",
        margin + 88,
        y + 38
      );

    // FULL ADDRESS

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.7)
      .fillColor("#E0EBE8")
      .text(
        TRUST_ADDRESS,
        margin + 88,
        y + 51,
        {
          width:
            450,
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.3)
      .fillColor("#D1DFDB")
      .text(
        `DARPAN ID: ${TRUST_DARPAN}   |   PAN: ${TRUST_PAN}`,
        margin + 88,
        y + 68
      );

    // ========================================================
    // HEADER RIGHT
    // ========================================================

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(8)
      .fillColor(C.gold)
      .text(
        "OFFICIAL DONATION RECEIPT",
        pageWidth -
          margin -
          230,
        y + 15,
        {
          width: 215,
          align: "right",
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.5)
      .fillColor("#E0EBE8")
      .text(
        TRUST_PHONE,
        pageWidth -
          margin -
          215,
        y + 37,
        {
          width: 200,
          align: "right",
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.5)
      .fillColor("#E0EBE8")
      .text(
        TRUST_EMAIL,
        pageWidth -
          margin -
          215,
        y + 50,
        {
          width: 200,
          align: "right",
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6)
      .fillColor("#BFD1CC")
      .text(
        "Digital Verification Enabled",
        pageWidth -
          margin -
          215,
        y + 66,
        {
          width: 200,
          align: "right",
        }
      );

    // ========================================================
    // TITLE
    // ========================================================

    y +=
      headerHeight + 8;

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(15)
      .fillColor(C.navy)
      .text(
        "DONATION RECEIPT",
        margin,
        y,
        {
          width:
            contentWidth,
          align: "center",
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.2)
      .fillColor(C.muted)
      .text(
        "Acknowledgement of Donation Received",
        margin,
        y + 18,
        {
          width:
            contentWidth,
          align: "center",
        }
      );

    y += 31;

    // ========================================================
    // META BAR
    // ========================================================

    const metaHeight = 45;

    drawCard(
      doc,
      margin,
      y,
      contentWidth,
      metaHeight,
      C.lightGray
    );

    const metaWidth =
      contentWidth / 4;

    drawMeta(
      doc,
      "RECEIPT NUMBER",
      finalReceiptNo,
      margin,
      y,
      metaWidth
    );

    drawMeta(
      doc,
      "DONATION REFERENCE",
      donationReference,
      margin +
        metaWidth,
      y,
      metaWidth
    );

    drawMeta(
      doc,
      "DONATION DATE",
      donationDate,
      margin +
        metaWidth * 2,
      y,
      metaWidth
    );

    drawMeta(
      doc,
      "PAYMENT STATUS",
      "SUCCESS / VERIFIED",
      margin +
        metaWidth * 3,
      y,
      metaWidth,
      true
    );

    y +=
      metaHeight + 8;

    // ========================================================
    // DONOR / DONATION
    // ========================================================

    const gap = 9;

    const half =
      (contentWidth -
        gap) /
      2;

    const sectionHeight =
      116;

    // ========================================================
    // DONOR
    // ========================================================

    drawCard(
      doc,
      margin,
      y,
      half,
      sectionHeight
    );

    drawSectionTitle(
      doc,
      "1. DONOR INFORMATION",
      margin + 12,
      y + 9
    );

    drawLabel(
      doc,
      "FULL NAME",
      margin + 12,
      y + 29
    );

    drawValue(
      doc,
      donorName,
      margin + 12,
      y + 39,
      190
    );

    drawLabel(
      doc,
      "MOBILE",
      margin + 215,
      y + 29
    );

    drawValue(
      doc,
      mobile,
      margin + 215,
      y + 39,
      140
    );

    drawLabel(
      doc,
      "EMAIL",
      margin + 12,
      y + 61
    );

    drawValue(
      doc,
      email,
      margin + 12,
      y + 71,
      230
    );

    drawLabel(
      doc,
      "80G STATUS",
      margin + 255,
      y + 61
    );

    drawValue(
      doc,
      requires80G
        ? "REQUESTED"
        : "NOT REQUESTED",
      margin + 255,
      y + 71,
      110
    );

    drawLabel(
      doc,
      "ADDRESS",
      margin + 12,
      y + 93
    );

    drawValue(
      doc,
      address,
      margin + 12,
      y + 103,
      half - 24
    );

    // ========================================================
    // DONATION
    // ========================================================

    const rightX =
      margin +
      half +
      gap;

    drawCard(
      doc,
      rightX,
      y,
      half,
      sectionHeight
    );

    drawSectionTitle(
      doc,
      "2. DONATION INFORMATION",
      rightX + 12,
      y + 9
    );

    drawLabel(
      doc,
      "TOTAL DONATION",
      rightX + 12,
      y + 28
    );

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(17)
      .fillColor(C.teal)
      .text(
        amountFormatted,
        rightX + 12,
        y + 39
      );

    drawLabel(
      doc,
      "CURRENCY",
      rightX + 215,
      y + 28
    );

    drawValue(
      doc,
      currency,
      rightX + 215,
      y + 39,
      100
    );

    drawLabel(
      doc,
      "PAYMENT MODE",
      rightX + 12,
      y + 67
    );

    drawValue(
      doc,
      "ONLINE - RAZORPAY",
      rightX + 12,
      y + 78,
      150
    );

    drawLabel(
      doc,
      "PAYMENT STATUS",
      rightX + 215,
      y + 67
    );

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(7.3)
      .fillColor(C.green)
      .text(
        "SUCCESS",
        rightX + 215,
        y + 78
      );

    drawLabel(
      doc,
      "AMOUNT IN WORDS",
      rightX + 12,
      y + 94
    );

    drawValue(
      doc,
      `${amountWords} Only`,
      rightX + 12,
      y + 104,
      half - 24
    );

    y +=
      sectionHeight + 8;

    // ========================================================
    // PAYMENT DETAILS
    // ========================================================

    const transactionHeight =
      68;

    drawCard(
      doc,
      margin,
      y,
      contentWidth,
      transactionHeight
    );

    drawSectionTitle(
      doc,
      "3. RAZORPAY / TRANSACTION DETAILS",
      margin + 12,
      y + 9
    );

    const third =
      contentWidth / 3;

    drawLabel(
      doc,
      "RAZORPAY PAYMENT ID",
      margin + 12,
      y + 30
    );

    drawValue(
      doc,
      paymentId,
      margin + 12,
      y + 41,
      third - 24,
      true
    );

    drawLabel(
      doc,
      "RAZORPAY ORDER ID",
      margin +
        third +
        12,
      y + 30
    );

    drawValue(
      doc,
      orderId,
      margin +
        third +
        12,
      y + 41,
      third - 24,
      true
    );

    drawLabel(
      doc,
      "TRANSACTION DATE & TIME",
      margin +
        third * 2 +
        12,
      y + 30
    );

    drawValue(
      doc,
      donationDateTime,
      margin +
        third * 2 +
        12,
      y + 41,
      third - 24
    );

    y +=
      transactionHeight + 8;

    // ========================================================
    // LOWER SECTION
    // ========================================================

    const lowerHeight =
      91;

    const w80g =
      contentWidth * 0.27;

    const wVerify =
      contentWidth * 0.43;

    const wSign =
      contentWidth -
      w80g -
      wVerify -
      gap * 2;

    // ========================================================
    // 80G
    // ========================================================

    drawCard(
      doc,
      margin,
      y,
      w80g,
      lowerHeight,
      C.lightGold
    );

    drawSectionTitle(
      doc,
      "4. 80G / TAX DETAILS",
      margin + 12,
      y + 9
    );

    drawLabel(
      doc,
      "80G RECEIPT",
      margin + 12,
      y + 31
    );

    drawValue(
      doc,
      requires80G
        ? "REQUESTED"
        : "NOT REQUESTED",
      margin + 12,
      y + 42,
      w80g - 24
    );

    drawLabel(
      doc,
      "PAN",
      margin + 12,
      y + 64
    );

    drawValue(
      doc,
      pan,
      margin + 12,
      y + 75,
      w80g - 24
    );

    // ========================================================
    // VERIFICATION
    // ========================================================

    const verifyX =
      margin +
      w80g +
      gap;

    drawCard(
      doc,
      verifyX,
      y,
      wVerify,
      lowerHeight,
      C.paleGreen
    );

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(10)
      .fillColor(C.green)
      .text(
        "✓ PAYMENT VERIFIED SUCCESSFULLY",
        verifyX + 12,
        y + 13
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.5)
      .fillColor(C.text)
      .text(
        "This donation has been electronically verified against the official digital donation record of Anand Jivan Foundation Trust.",
        verifyX + 12,
        y + 34,
        {
          width:
            wVerify - 24,
          lineGap: 2,
        }
      );

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(6.2)
      .fillColor(C.teal)
      .text(
        `VERIFIED RECEIPT: ${finalReceiptNo}`,
        verifyX + 12,
        y + 64
      );

    // ========================================================
    // DIGITAL SIGNATURE
    // ========================================================

    const signX =
      verifyX +
      wVerify +
      gap;

    drawCard(
      doc,
      signX,
      y,
      wSign,
      lowerHeight,
      "#FCF8EC"
    );

    drawSectionTitle(
      doc,
      "5. DIGITAL SIGNATURE",
      signX + 12,
      y + 9
    );

    // Signature image

    if (
      fs.existsSync(
        SIGNATURE_PATH
      )
    ) {
      doc.image(
        SIGNATURE_PATH,
        signX + 12,
        y + 27,
        {
          fit: [
            wSign - 24,
            32,
          ],
          align: "center",
          valign: "center",
        }
      );
    } else {
      // Digital signature fallback
      doc
        .font(
          "Helvetica-Oblique"
        )
        .fontSize(13)
        .fillColor(C.navy)
        .text(
          "Digitally Signed",
          signX + 12,
          y + 30,
          {
            width:
              wSign - 24,
            align: "center",
          }
        );
    }

    doc
      .moveTo(
        signX + 14,
        y + 63
      )
      .lineTo(
        signX +
          wSign -
          14,
        y + 63
      )
      .lineWidth(0.5)
      .strokeColor(
        C.border
      )
      .stroke();

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(6.2)
      .fillColor(C.navy)
      .text(
        "AUTHORIZED SIGNATORY",
        signX + 10,
        y + 67,
        {
          width:
            wSign - 20,
          align: "center",
        }
      );

    y +=
      lowerHeight + 7;

    // ========================================================
    // DECLARATION + QR
    // ========================================================

    const bottomHeight =
      57;

    drawCard(
      doc,
      margin,
      y,
      contentWidth,
      bottomHeight
    );

    drawLabel(
      doc,
      "DECLARATION",
      margin + 12,
      y + 8
    );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(6.1)
      .fillColor(C.text)
      .text(
        "This is a computer-generated donation receipt issued by Anand Jivan Foundation Trust. "
          +
          "The payment transaction has been electronically verified. "
          +
          "No physical signature is required where digital verification is available.",
        margin + 12,
        y + 20,
        {
          width:
            contentWidth -
            245,
          lineGap: 2,
        }
      );

    // ========================================================
    // SMALL QR
    // ========================================================

    const qrSize = 43;

    doc.image(
      qrBuffer,
      pageWidth -
        margin -
        210,
      y + 7,
      {
        fit: [
          qrSize,
          qrSize,
        ],
      }
    );

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(5.8)
      .fillColor(C.navy)
      .text(
        "SCAN TO VERIFY",
        pageWidth -
          margin -
          158,
        y + 14,
        {
          width: 145,
          align: "center",
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(5.2)
      .fillColor(C.muted)
      .text(
        "Online receipt verification",
        pageWidth -
          margin -
          158,
        y + 27,
        {
          width: 145,
          align: "center",
        }
      );

    // ========================================================
    // FOOTER
    // ========================================================

    const footerY =
      pageHeight - 28;

    doc
      .moveTo(
        margin,
        footerY
      )
      .lineTo(
        pageWidth -
          margin,
        footerY
      )
      .lineWidth(0.8)
      .strokeColor(
        C.gold
      )
      .stroke();

    doc
      .font(
        "Helvetica-Bold"
      )
      .fontSize(5.7)
      .fillColor(
        C.navy
      )
      .text(
        TRUST_NAME,
        margin,
        footerY + 5
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(5.3)
      .fillColor(
        C.muted
      )
      .text(
        `${TRUST_PHONE}  |  ${TRUST_EMAIL}  |  ${TRUST_WEBSITE}`,
        pageWidth -
          margin -
          370,
        footerY + 5,
        {
          width: 370,
          align: "right",
        }
      );

    doc
      .font(
        "Helvetica"
      )
      .fontSize(5.1)
      .fillColor(
        C.muted
      )
      .text(
        "Computer Generated Receipt • Please retain for your records",
        margin,
        footerY + 15
      );

    // ========================================================
    // FINISH
    // ========================================================

    doc.end();

    const pdf =
      await pdfPromise;

    // ========================================================
    // FILE NAME
    // ========================================================

    const filename =
      `AJFT-Donation-Receipt-${finalReceiptNo}.pdf`;

    // ========================================================
    // RESPONSE
    // ========================================================

    return new NextResponse(
      new Uint8Array(pdf),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${filename}"`,

          "Content-Length":
            String(pdf.length),

          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",

          Pragma:
            "no-cache",

          Expires:
            "0",
        },
      }
    );
  } catch (error) {
    console.error(
      "=========================================="
    );

    console.error(
      "AJFT RECEIPT PDF ERROR"
    );

    console.error(error);

    console.error(
      "=========================================="
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to generate donation receipt.",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// HELPERS
// ============================================================

function clean(
  value: unknown
): string {
  return String(
    value ?? ""
  ).trim();
}

// ============================================================
// CARD
// ============================================================

function drawCard(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  background = C.white
) {
  doc
    .fillColor(background)
    .roundedRect(
      x,
      y,
      width,
      height,
      4
    )
    .fill();

  doc
    .lineWidth(0.6)
    .strokeColor(C.border)
    .roundedRect(
      x,
      y,
      width,
      height,
      4
    )
    .stroke();
}

// ============================================================
// SECTION TITLE
// ============================================================

function drawSectionTitle(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number
) {
  doc
    .font(
      "Helvetica-Bold"
    )
    .fontSize(7.1)
    .fillColor(C.navy)
    .text(
      text,
      x,
      y
    );

  doc
    .moveTo(
      x,
      y + 10
    )
    .lineTo(
      x + 100,
      y + 10
    )
    .lineWidth(0.8)
    .strokeColor(C.gold)
    .stroke();
}

// ============================================================
// LABEL
// ============================================================

function drawLabel(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number
) {
  doc
    .font(
      "Helvetica-Bold"
    )
    .fontSize(5.1)
    .fillColor(C.muted)
    .text(
      text,
      x,
      y
    );
}

// ============================================================
// VALUE
// ============================================================

function drawValue(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number,
  width: number,
  mono = false
) {
  doc
    .font(
      mono
        ? "Courier"
        : "Helvetica-Bold"
    )
    .fontSize(
      mono
        ? 5.9
        : 7
    )
    .fillColor(C.text)
    .text(
      text || "N/A",
      x,
      y,
      {
        width,
        height: 12,
        ellipsis: true,
      }
    );
}

// ============================================================
// META
// ============================================================

function drawMeta(
  doc: PDFKit.PDFDocument,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number,
  success = false
) {
  doc
    .font(
      "Helvetica-Bold"
    )
    .fontSize(5)
    .fillColor(C.muted)
    .text(
      label,
      x + 10,
      y + 8,
      {
        width:
          width - 20,
      }
    );

  doc
    .font(
      "Helvetica-Bold"
    )
    .fontSize(6.9)
    .fillColor(
      success
        ? C.green
        : C.navy
    )
    .text(
      value || "N/A",
      x + 10,
      y + 21,
      {
        width:
          width - 20,
        ellipsis: true,
      }
    );
}

// ============================================================
// MONEY
// ============================================================

function formatMoney(
  amount: number,
  currency: string
) {
  const value =
    Number(
      amount || 0
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  // Avoid ₹ glyph because PDFKit Helvetica
  // can render it incorrectly.
  if (
    currency.toUpperCase() ===
    "INR"
  ) {
    return `INR ${value}`;
  }

  return `${currency} ${value}`;
}

// ============================================================
// DATE
// ============================================================

function formatDate(
  value: any
) {
  if (!value) {
    return "N/A";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "N/A";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

// ============================================================
// DATE TIME
// ============================================================

function formatDateTime(
  value: any
) {
  if (!value) {
    return "N/A";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "N/A";
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

// ============================================================
// AMOUNT IN WORDS
// ============================================================

function amountInWords(
  amount: number
): string {
  const number =
    Math.floor(
      Number(
        amount || 0
      )
    );

  if (number === 0) {
    return "Rupees Zero";
  }

  return `Rupees ${convertIndianNumber(
    number
  )}`;
}

// ============================================================
// INDIAN NUMBER TO WORDS
// ============================================================

function convertIndianNumber(
  num: number
): string {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num < 20) {
    return ones[num];
  }

  if (num < 100) {
    return (
      tens[
        Math.floor(
          num / 10
        )
      ] +
      (num % 10
        ? ` ${
            ones[
              num % 10
            ]
          }`
        : "")
    );
  }

  if (num < 1000) {
    return (
      `${ones[
        Math.floor(
          num / 100
        )
      ]} Hundred` +
      (num % 100
        ? ` ${convertIndianNumber(
            num % 100
          )}`
        : "")
    );
  }

  if (num < 100000) {
    return (
      `${convertIndianNumber(
        Math.floor(
          num / 1000
        )
      )} Thousand` +
      (num % 1000
        ? ` ${convertIndianNumber(
            num % 1000
          )}`
        : "")
    );
  }

  if (num < 10000000) {
    return (
      `${convertIndianNumber(
        Math.floor(
          num / 100000
        )
      )} Lakh` +
      (num % 100000
        ? ` ${convertIndianNumber(
            num % 100000
          )}`
        : "")
    );
  }

  return (
    `${convertIndianNumber(
      Math.floor(
        num / 10000000
      )
    )} Crore` +
    (num % 10000000
      ? ` ${convertIndianNumber(
          num % 10000000
        )}`
      : "")
  );
}