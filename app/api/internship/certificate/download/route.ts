import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  PDFPage,
} from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import QRCode from "qrcode";

import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* =====================================================
   PAGE
   Reference certificate ratio = 3:2
===================================================== */

const PAGE_W = 864;
const PAGE_H = 576;

/* =====================================================
   ASSETS
===================================================== */

const IMAGE_DIR = path.join(
  process.cwd(),
  "public",
  "images"
);

const LOGO_PATH = path.join(
  IMAGE_DIR,
  "ajft-logo.png"
);

const AUTH_SIGNATURE_PATH = path.join(
  IMAGE_DIR,
  "authorized-signatory.png"
);

const COORDINATOR_SIGNATURE_PATH =
  path.join(
    IMAGE_DIR,
    "internship-coordinator.png"
);

/* =====================================================
   HELPERS
===================================================== */

function text(value: unknown): string {
  return String(value ?? "").trim();
}

function formatDate(
  value: unknown
): string {
  if (!value) return "—";

  const raw = text(value);

  /*
    Already DD/MM/YYYY
  */
  if (
    /^\d{2}\/\d{2}\/\d{4}$/.test(raw)
  ) {
    return raw;
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

function makeCertificateNo(
  applicationId: string
) {
  const number =
    applicationId.replace(
      /^AJFT-INT-/i,
      ""
    );

  return `AJFT/CERT/${number}`;
}

async function readImage(
  filePath: string
) {
  try {
    return await fs.readFile(
      filePath
    );
  } catch {
    console.warn(
      "Certificate image missing:",
      filePath
    );

    return null;
  }
}

function centeredText(
  page: PDFPage,
  value: string,
  centerX: number,
  y: number,
  font: any,
  size: number,
  color: any
) {
  const width =
    font.widthOfTextAtSize(
      value,
      size
    );

  page.drawText(value, {
    x: centerX - width / 2,
    y,
    size,
    font,
    color,
  });
}

function rightText(
  page: PDFPage,
  value: string,
  rightX: number,
  y: number,
  font: any,
  size: number,
  color: any
) {
  const width =
    font.widthOfTextAtSize(
      value,
      size
    );

  page.drawText(value, {
    x: rightX - width,
    y,
    size,
    font,
    color,
  });
}

function fitText(
  value: string,
  font: any,
  maxWidth: number,
  maxSize: number,
  minSize = 7
) {
  let size = maxSize;

  while (
    size > minSize &&
    font.widthOfTextAtSize(
      value,
      size
    ) > maxWidth
  ) {
    size -= 0.5;
  }

  return size;
}

/* =====================================================
   GET
===================================================== */

export async function GET(
  request: Request
) {
  try {
    await connectDB();

    const url = new URL(
      request.url
    );

    const applicationId =
      text(
        url.searchParams.get(
          "applicationId"
        )
      ).toUpperCase();

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       APPLICATION
    ================================================= */

    const application =
      await InternshipApplication.findOne(
        {
          applicationId,
        }
      ).lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =================================================
       CERTIFICATE SECURITY
    ================================================= */

    if (
      application.certificateEligible !==
      true
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate is not eligible yet.",
        },
        {
          status: 403,
        }
      );
    }

    if (
      application.certificatePaymentStatus !==
      "PAID"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate payment has not been verified.",
        },
        {
          status: 403,
        }
      );
    }

    /* =================================================
       DATA
    ================================================= */

    const studentName =
      text(
        application.student?.name
      ) || "STUDENT";

    const institution =
      text(
        application.education
          ?.institution
      ) || "—";

    const qualification =
      text(
        application.education
          ?.qualification
      ) || "—";

    const programme =
      text(
        application.internship?.area
      ) ||
      "Internship Programme";

    const duration =
      text(
        application.internship
          ?.duration
      ) || "—";

    const startDate =
      formatDate(
        application.internship
          ?.startDate
      );

    const endDate =
      formatDate(
        application.internship
          ?.endDate
      );

    const certificateNo =
      makeCertificateNo(
        applicationId
      );

    const issueDate =
      formatDate(new Date());

    /* =================================================
       COLORS
    ================================================= */

    const NAVY = rgb(
      0.015,
      0.075,
      0.145
    );

    const NAVY_LIGHT = rgb(
      0.035,
      0.12,
      0.21
    );

    const GOLD = rgb(
      0.78,
      0.51,
      0.08
    );

    const GOLD_LIGHT = rgb(
      0.94,
      0.72,
      0.28
    );

    const BLUE = rgb(
      0.08,
      0.23,
      0.40
    );

    const TEXT = rgb(
      0.04,
      0.08,
      0.14
    );

    const WHITE = rgb(
      1,
      1,
      1
    );

    const LIGHT_BLUE = rgb(
      0.91,
      0.95,
      0.985
    );

    const GRAY = rgb(
      0.35,
      0.39,
      0.44
    );

    /* =================================================
       PDF
    ================================================= */

    const pdf =
      await PDFDocument.create();

    const page =
      pdf.addPage([
        PAGE_W,
        PAGE_H,
      ]);

    /* =================================================
       FONTS
    ================================================= */

    const times =
      await pdf.embedFont(
        StandardFonts.TimesRoman
      );

    const timesBold =
      await pdf.embedFont(
        StandardFonts.TimesRomanBold
      );

    const timesItalic =
      await pdf.embedFont(
        StandardFonts.TimesRomanItalic
      );

    const helvetica =
      await pdf.embedFont(
        StandardFonts.Helvetica
      );

    const helveticaBold =
      await pdf.embedFont(
        StandardFonts.HelveticaBold
      );

    /* =================================================
       BACKGROUND
    ================================================= */

    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_W,
      height: PAGE_H,
      color: WHITE,
    });

    /* =================================================
       BORDERS
    ================================================= */

    page.drawRectangle({
      x: 3,
      y: 3,
      width: PAGE_W - 6,
      height: PAGE_H - 6,
      borderColor: GOLD,
      borderWidth: 2,
    });

    page.drawRectangle({
      x: 10,
      y: 10,
      width: PAGE_W - 20,
      height: PAGE_H - 20,
      borderColor: NAVY,
      borderWidth: 4,
    });

    page.drawRectangle({
      x: 20,
      y: 20,
      width: PAGE_W - 40,
      height: PAGE_H - 40,
      borderColor: GOLD,
      borderWidth: 1,
    });

    /* =================================================
       CORNER DECORATION
    ================================================= */

    const corners = [
      [32, 32],
      [PAGE_W - 32, 32],
      [32, PAGE_H - 32],
      [PAGE_W - 32, PAGE_H - 32],
    ];

    for (const [x, y] of corners) {
      page.drawCircle({
        x,
        y,
        size: 9,
        borderColor: GOLD,
        borderWidth: 1,
      });

      page.drawCircle({
        x,
        y,
        size: 3,
        color: GOLD,
      });

      page.drawLine({
        start: {
          x: x - 17,
          y,
        },
        end: {
          x: x + 17,
          y,
        },
        color: GOLD,
        thickness: 0.8,
      });

      page.drawLine({
        start: {
          x,
          y: y - 17,
        },
        end: {
          x,
          y: y + 17,
        },
        color: GOLD,
        thickness: 0.8,
      });
    }

    /* =================================================
       HEADER
    ================================================= */

    const headerX = 25;
    const headerY = 445;
    const headerW =
      PAGE_W - 50;
    const headerH = 100;

    page.drawRectangle({
      x: headerX,
      y: headerY,
      width: headerW,
      height: headerH,
      color: NAVY,
    });

    /* Gold header bottom */

    page.drawLine({
      start: {
        x: 42,
        y: 447,
      },
      end: {
        x: PAGE_W / 2 - 30,
        y: 441,
      },
      color: GOLD_LIGHT,
      thickness: 1.4,
    });

    page.drawLine({
      start: {
        x: PAGE_W / 2 + 30,
        y: 441,
      },
      end: {
        x: PAGE_W - 42,
        y: 447,
      },
      color: GOLD_LIGHT,
      thickness: 1.4,
    });

    /* =================================================
       LOGO
    ================================================= */

    const logoBuffer =
      await readImage(
        LOGO_PATH
      );

    if (logoBuffer) {
      const logo =
        await pdf.embedPng(
          logoBuffer
        );

      const logoMax = 82;

      const scale = Math.min(
        logoMax / logo.width,
        logoMax / logo.height
      );

      page.drawImage(
        logo,
        {
          x: 91,
          y: 454,
          width:
            logo.width * scale,
          height:
            logo.height * scale,
        }
      );
    }

    /* =================================================
       HEADER TEXT
    ================================================= */

    page.drawText(
      "ANAND JIVAN",
      {
        x: 190,
        y: 507,
        size: 28,
        font: timesBold,
        color: WHITE,
      }
    );

    page.drawText(
      "FOUNDATION TRUST",
      {
        x: 190,
        y: 480,
        size: 23,
        font: timesBold,
        color: WHITE,
      }
    );

    page.drawText(
      "INTERNSHIP & TRAINING PROGRAMME",
      {
        x: 193,
        y: 462,
        size: 9,
        font: helveticaBold,
        color: GOLD_LIGHT,
      }
    );

    /* =================================================
       OFFICIAL CERTIFICATE
    ================================================= */

    page.drawLine({
      start: {
        x: 620,
        y: 463,
      },
      end: {
        x: 620,
        y: 524,
      },
      color: GOLD_LIGHT,
      thickness: 1.3,
    });

    page.drawCircle({
      x: 720,
      y: 493,
      size: 39,
      borderColor: GOLD_LIGHT,
      borderWidth: 2,
    });

    page.drawCircle({
      x: 720,
      y: 493,
      size: 30,
      borderColor: GOLD,
      borderWidth: 1,
    });

    centeredText(
      page,
      "OFFICIAL",
      720,
      499,
      timesBold,
      10,
      GOLD_LIGHT
    );

    centeredText(
      page,
      "CERTIFICATE",
      720,
      483,
      timesBold,
      9,
      GOLD_LIGHT
    );

    /* =================================================
       CERTIFICATE NUMBER
    ================================================= */

    page.drawText(
      `Certificate No.: ${certificateNo}`,
      {
        x: 39,
        y: 415,
        size: 8.5,
        font: helveticaBold,
        color: NAVY,
      }
    );

    rightText(
      page,
      `Application ID: ${applicationId}`,
      PAGE_W - 39,
      415,
      helveticaBold,
      8.5,
      NAVY
    );

    /* =================================================
       TITLE
    ================================================= */

    centeredText(
      page,
      "INTERNSHIP COMPLETION CERTIFICATE",
      PAGE_W / 2,
      386,
      timesBold,
      22,
      NAVY
    );

    /* Gold title lines */

    page.drawLine({
      start: {
        x: 270,
        y: 395,
      },
      end: {
        x: 594,
        y: 395,
      },
      color: GOLD,
      thickness: 1,
    });

    page.drawLine({
      start: {
        x: 285,
        y: 371,
      },
      end: {
        x: 579,
        y: 371,
      },
      color: GOLD,
      thickness: 1,
    });

    /* =================================================
       CERTIFY
    ================================================= */

    centeredText(
      page,
      "This is to certify that",
      PAGE_W / 2,
      345,
      timesItalic,
      11,
      NAVY
    );

    /* =================================================
       STUDENT NAME
    ================================================= */

    const name =
      studentName.toUpperCase();

    const nameSize =
      fitText(
        name,
        timesBold,
        520,
        34,
        20
      );

    centeredText(
      page,
      name,
      PAGE_W / 2,
      306,
      timesBold,
      nameSize,
      NAVY
    );

    page.drawLine({
      start: {
        x: 225,
        y: 292,
      },
      end: {
        x: 639,
        y: 292,
      },
      color: GOLD,
      thickness: 1,
    });

    /* =================================================
       BODY
    ================================================= */

    const body1 =
      `has successfully completed the ${programme} internship programme`;

    const body2 =
      `with Anand Jivan Foundation Trust for a duration of ${duration}.`;

    const bodySize =
      fitText(
        body1,
        times,
        670,
        11,
        7
      );

    centeredText(
      page,
      body1,
      PAGE_W / 2,
      264,
      times,
      bodySize,
      TEXT
    );

    centeredText(
      page,
      body2,
      PAGE_W / 2,
      246,
      times,
      bodySize,
      TEXT
    );

    /* =================================================
       INFORMATION PANEL
    ================================================= */

    const panelX = 108;
    const panelY = 150;
    const panelW = 650;
    const panelH = 88;

    page.drawRectangle({
      x: panelX,
      y: panelY,
      width: panelW,
      height: panelH,
      color: LIGHT_BLUE,
      borderColor: GOLD,
      borderWidth: 1,
    });

    /* columns */

    page.drawLine({
      start: {
        x: 340,
        y: panelY + 7,
      },
      end: {
        x: 340,
        y: panelY + panelH - 7,
      },
      color: rgb(
        0.60,
        0.68,
        0.76
      ),
      thickness: 0.6,
    });

    page.drawLine({
      start: {
        x: 570,
        y: panelY + 7,
      },
      end: {
        x: 570,
        y: panelY + panelH - 7,
      },
      color: rgb(
        0.60,
        0.68,
        0.76
      ),
      thickness: 0.6,
    });

    /* =================================================
       INFORMATION - COLUMN 1
    ================================================= */

    page.drawText(
      "INSTITUTION",
      {
        x: 132,
        y: 215,
        size: 7,
        font: helveticaBold,
        color: BLUE,
      }
    );

    const institutionSize =
      fitText(
        institution,
        timesBold,
        180,
        10,
        7
      );

    page.drawText(
      institution,
      {
        x: 132,
        y: 197,
        size: institutionSize,
        font: timesBold,
        color: NAVY,
      }
    );

    page.drawText(
      "QUALIFICATION",
      {
        x: 132,
        y: 177,
        size: 7,
        font: helveticaBold,
        color: BLUE,
      }
    );

    page.drawText(
      qualification,
      {
        x: 132,
        y: 160,
        size: 9,
        font: timesBold,
        color: NAVY,
      }
    );

    /* =================================================
       INFORMATION - COLUMN 2
    ================================================= */

    page.drawText(
      "INTERNSHIP PROGRAMME",
      {
        x: 365,
        y: 215,
        size: 7,
        font: helveticaBold,
        color: BLUE,
      }
    );

    const programmeSize =
      fitText(
        programme,
        timesBold,
        175,
        9.5,
        7
      );

    page.drawText(
      programme,
      {
        x: 365,
        y: 197,
        size: programmeSize,
        font: timesBold,
        color: NAVY,
      }
    );

    page.drawText(
      "DURATION",
      {
        x: 365,
        y: 177,
        size: 7,
        font: helveticaBold,
        color: BLUE,
      }
    );

    page.drawText(
      duration,
      {
        x: 365,
        y: 160,
        size: 9,
        font: timesBold,
        color: NAVY,
      }
    );

    /* =================================================
       INFORMATION - COLUMN 3
    ================================================= */

    page.drawText(
      "INTERNSHIP PERIOD",
      {
        x: 595,
        y: 215,
        size: 7,
        font: helveticaBold,
        color: BLUE,
      }
    );

    const period =
      `${startDate} to ${endDate}`;

    page.drawText(
      period,
      {
        x: 595,
        y: 197,
        size: fitText(
          period,
          timesBold,
          155,
          8.5,
          7
        ),
        font: timesBold,
        color: NAVY,
      }
    );

    page.drawText(
      "ISSUE DATE",
      {
        x: 595,
        y: 177,
        size: 7,
        font: helveticaBold,
        color: BLUE,
      }
    );

    page.drawText(
      issueDate,
      {
        x: 595,
        y: 160,
        size: 9,
        font: timesBold,
        color: NAVY,
      }
    );

    /* =================================================
       AUTHORIZED SIGNATORY
    ================================================= */

    const authBuffer =
      await readImage(
        AUTH_SIGNATURE_PATH
      );

    if (authBuffer) {
      const auth =
        await pdf.embedPng(
          authBuffer
        );

      page.drawImage(
        auth,
        {
          x: 143,
          y: 78,
          width: 120,
          height: 36,
        }
      );
    }

    page.drawLine({
      start: {
        x: 105,
        y: 73,
      },
      end: {
        x: 285,
        y: 73,
      },
      color: GOLD,
      thickness: 1,
    });

    centeredText(
      page,
      "Authorized Signatory",
      195,
      58,
      timesBold,
      9,
      NAVY
    );

    centeredText(
      page,
      "Anand Jivan Foundation Trust",
      195,
      44,
      times,
      7,
      GRAY
    );

    /* =================================================
       CENTER SEAL
    ================================================= */

    const sealX = PAGE_W / 2;
    const sealY = 77;

    page.drawCircle({
      x: sealX,
      y: sealY,
      size: 36,
      color: rgb(
        0.98,
        0.95,
        0.84
      ),
      borderColor: GOLD,
      borderWidth: 3,
    });

    page.drawCircle({
      x: sealX,
      y: sealY,
      size: 28,
      borderColor: GOLD,
      borderWidth: 1,
    });

    centeredText(
      page,
      "AJFT",
      sealX,
      71,
      timesBold,
      14,
      GOLD
    );

    centeredText(
      page,
      "ANAND JIVAN",
      sealX,
      91,
      helveticaBold,
      4.5,
      NAVY
    );

    centeredText(
      page,
      "FOUNDATION TRUST",
      sealX,
      59,
      helveticaBold,
      4.5,
      NAVY
    );

    /* =================================================
       INTERNSHIP COORDINATOR
    ================================================= */

    const coordinatorBuffer =
      await readImage(
        COORDINATOR_SIGNATURE_PATH
      );

    if (coordinatorBuffer) {
      const coordinator =
        await pdf.embedPng(
          coordinatorBuffer
        );

      page.drawImage(
        coordinator,
        {
          x: 549,
          y: 78,
          width: 120,
          height: 36,
        }
      );
    }

    page.drawLine({
      start: {
        x: 500,
        y: 73,
      },
      end: {
        x: 680,
        y: 73,
      },
      color: GOLD,
      thickness: 1,
    });

    centeredText(
      page,
      "Internship Coordinator",
      590,
      58,
      timesBold,
      9,
      NAVY
    );

    centeredText(
      page,
      "Internship Programme",
      590,
      44,
      times,
      7,
      GRAY
    );

    /* =================================================
       QR CODE
    ================================================= */

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      url.origin;

    const verifyUrl =
      `${baseUrl}/internship/status?applicationId=${encodeURIComponent(
        applicationId
      )}`;

    const qrData =
      await QRCode.toDataURL(
        verifyUrl,
        {
          errorCorrectionLevel:
            "H",
          margin: 1,
          width: 500,
          color: {
            dark: "#071D35",
            light: "#FFFFFF",
          },
        }
      );

    const qrBuffer =
      Buffer.from(
        qrData.split(",")[1],
        "base64"
      );

    const qr =
      await pdf.embedPng(
        qrBuffer
      );

    page.drawRectangle({
      x: 703,
      y: 52,
      width: 66,
      height: 66,
      color: WHITE,
      borderColor: GOLD,
      borderWidth: 1,
    });

    page.drawImage(
      qr,
      {
        x: 706,
        y: 55,
        width: 60,
        height: 60,
      }
    );

    centeredText(
      page,
      "Verify this certificate",
      736,
      43,
      timesBold,
      6.5,
      NAVY
    );

    centeredText(
      page,
      "using Application ID",
      736,
      32,
      timesBold,
      6.5,
      NAVY
    );

    /* =================================================
       FOOTER
    ================================================= */

    page.drawRectangle({
      x: 25,
      y: 22,
      width: PAGE_W - 50,
      height: 29,
      color: NAVY,
    });

    page.drawLine({
      start: {
        x: 45,
        y: 44,
      },
      end: {
        x: PAGE_W - 45,
        y: 44,
      },
      color: GOLD,
      thickness: 0.8,
    });

    centeredText(
      page,
      "Anand Jivan Foundation Trust   |   Internship Certificate   |   Serve • Empower • Transform",
      PAGE_W / 2,
      31,
      timesBold,
      7.5,
      WHITE
    );

    /* =================================================
       FINAL PDF
    ================================================= */

    const pdfBytes =
      await pdf.save();

    return new NextResponse(
      Buffer.from(pdfBytes),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `inline; filename="AJFT-Certificate-${applicationId}.pdf"`,

          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "AJFT CERTIFICATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to generate certificate.",
      },
      {
        status: 500,
      }
    );
  }
}