import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

type IdCardData = {
  internId: string;
  cardNumber: string;
  studentName: string;
  internshipArea: string;
  duration: string;
  startDate?: string;
  endDate?: string;
};

export async function generateInternshipIdCard(
  data: IdCardData
) {
  const pdf =
    await PDFDocument.create();

  const page =
    pdf.addPage([600, 380]);

  const width = page.getWidth();
  const height = page.getHeight();

  const regular =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  const bold =
    await pdf.embedFont(
      StandardFonts.HelveticaBold
    );

  const navy = rgb(
    0.129,
    0.086,
    0.31
  );

  const purple = rgb(
    0.486,
    0.361,
    0.902
  );

  const teal = rgb(
    0.078,
    0.722,
    0.651
  );

  const gray = rgb(
    0.35,
    0.38,
    0.42
  );

  /* =========================================
     CARD BACKGROUND
  ========================================= */

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(
      0.98,
      0.98,
      1
    ),
  });

  /* =========================================
     HEADER
  ========================================= */

  page.drawRectangle({
    x: 0,
    y: height - 92,
    width,
    height: 92,
    color: navy,
  });

  page.drawText(
    "ANAND JIVAN FOUNDATION TRUST",
    {
      x: 32,
      y: height - 36,
      size: 17,
      font: bold,
      color: rgb(1, 1, 1),
    }
  );

  page.drawText(
    "INTERNSHIP IDENTITY CARD",
    {
      x: 32,
      y: height - 61,
      size: 10,
      font: bold,
      color: rgb(
        0.37,
        0.92,
        0.84
      ),
    }
  );

  page.drawText(
    data.cardNumber,
    {
      x: width - 155,
      y: height - 36,
      size: 8,
      font: bold,
      color: rgb(1, 1, 1),
    }
  );

  /* =========================================
     PHOTO
  ========================================= */

  page.drawRectangle({
    x: 32,
    y: 128,
    width: 110,
    height: 125,
    borderColor: purple,
    borderWidth: 2,
  });

  page.drawText(
    "PHOTO",
    {
      x: 68,
      y: 185,
      size: 12,
      font: bold,
      color: gray,
    }
  );

  /* =========================================
     STUDENT
  ========================================= */

  page.drawText(
    "INTERN NAME",
    {
      x: 170,
      y: 235,
      size: 7,
      font: bold,
      color: gray,
    }
  );

  page.drawText(
    data.studentName,
    {
      x: 170,
      y: 214,
      size: 17,
      font: bold,
      color: navy,
      maxWidth: 370,
    }
  );

  page.drawText(
    "INTERN ID",
    {
      x: 170,
      y: 180,
      size: 7,
      font: bold,
      color: gray,
    }
  );

  page.drawText(
    data.internId,
    {
      x: 170,
      y: 163,
      size: 10,
      font: bold,
      color: purple,
    }
  );

  /* =========================================
     DETAILS
  ========================================= */

  page.drawText(
    "INTERNSHIP AREA",
    {
      x: 170,
      y: 135,
      size: 7,
      font: bold,
      color: gray,
    }
  );

  page.drawText(
    data.internshipArea,
    {
      x: 170,
      y: 119,
      size: 9,
      font: bold,
      color: navy,
      maxWidth: 370,
    }
  );

  page.drawText(
    "DURATION",
    {
      x: 170,
      y: 92,
      size: 7,
      font: bold,
      color: gray,
    }
  );

  page.drawText(
    data.duration,
    {
      x: 170,
      y: 76,
      size: 9,
      font: bold,
      color: navy,
    }
  );

  /* =========================================
     DATES
  ========================================= */

  page.drawText(
    `Start: ${data.startDate || "—"}`,
    {
      x: 32,
      y: 83,
      size: 8,
      font: regular,
      color: gray,
    }
  );

  page.drawText(
    `Valid Till: ${data.endDate || "—"}`,
    {
      x: 32,
      y: 67,
      size: 8,
      font: regular,
      color: gray,
    }
  );

  /* =========================================
     FOOTER
  ========================================= */

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 42,
    color: teal,
  });

  page.drawText(
    "Authorized Internship Identification",
    {
      x: 32,
      y: 16,
      size: 8,
      font: bold,
      color: rgb(1, 1, 1),
    }
  );

  page.drawText(
    "AJFT",
    {
      x: width - 65,
      y: 14,
      size: 12,
      font: bold,
      color: rgb(1, 1, 1),
    }
  );

  return Buffer.from(
    await pdf.save()
  );
}