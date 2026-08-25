import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFPage,
  type PDFFont,
  type PDFImage,
} from "pdf-lib";
import fs from "fs";
import path from "path";

type ApplicationPdfData = {
  applicationId: string;

  name: string;
  email: string;
  phone: string;

  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  institution?: string;
  course?: string;
  qualification?: string;

  area: string;
  duration: string;
  startDate?: string;
  endDate?: string;

  message?: string;

  aadhaarLast4?: string;
  marksheetStatus?: string;
  collegeIdStatus?: string;

  appliedAt: Date;
};

/* =========================================================
   OFFICIAL PRINT COLOR THEME
   NO GREEN / NO TEAL
========================================================= */

const C = {
  black: rgb(0.07, 0.07, 0.07),
  dark: rgb(0.15, 0.13, 0.11),
  brown: rgb(0.30, 0.22, 0.15),

  orange: rgb(0.84, 0.40, 0.045),
  darkOrange: rgb(0.70, 0.30, 0.02),

  cream: rgb(0.985, 0.965, 0.91),
  lightOrange: rgb(0.97, 0.91, 0.80),

  gray: rgb(0.42, 0.42, 0.42),
  lightGray: rgb(0.94, 0.94, 0.94),
  border: rgb(0.62, 0.62, 0.62),

  white: rgb(1, 1, 1),
};

/* =========================================================
   HELPERS
========================================================= */

function safe(value?: string | null) {
  const text = String(value ?? "").trim();
  return text || "";
}

function formatDate(value?: string | Date) {
  if (!value) return "";

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function calculateEndDate(
  startDate?: string,
  duration?: string
) {
  if (!startDate) return "";

  const match = String(duration ?? "").match(
    /(\d+)\s*week/i
  );

  if (!match) return "";

  const weeks = Number(match[1]);

  if (!weeks) return "";

  const start = new Date(startDate);

  if (Number.isNaN(start.getTime())) {
    return "";
  }

  const end = new Date(start);

  end.setDate(
    end.getDate() + weeks * 7
  );

  return formatDate(end);
}

function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number
) {
  const words = String(text ?? "")
    .split(/\s+/)
    .filter(Boolean);

  const lines: string[] = [];

  let current = "";

  for (const word of words) {
    const test = current
      ? `${current} ${word}`
      : word;

    const testWidth =
      font.widthOfTextAtSize(
        test,
        size
      );

    if (
      testWidth <= maxWidth ||
      !current
    ) {
      current = test;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawWrappedText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  maxWidth: number,
  lineHeight: number
) {
  const lines = wrapText(
    text,
    font,
    size,
    maxWidth
  );

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });

  return lines.length * lineHeight;
}

/* =========================================================
   LOAD LOGO
   public/logo.png
========================================================= */

async function loadLogo(
  pdf: PDFDocument
): Promise<PDFImage | null> {
  try {
    const files = [
      path.join(
        process.cwd(),
        "public",
        "logo.png"
      ),
      path.join(
        process.cwd(),
        "public",
        "logo.jpg"
      ),
      path.join(
        process.cwd(),
        "public",
        "logo.jpeg"
      ),
    ];

    for (const file of files) {
      if (!fs.existsSync(file)) {
        continue;
      }

      if (file.endsWith(".png")) {
        return await pdf.embedPng(
          fs.readFileSync(file)
        );
      }

      return await pdf.embedJpg(
        fs.readFileSync(file)
      );
    }

    return null;
  } catch (error) {
    console.error(
      "LOGO LOAD ERROR:",
      error
    );

    return null;
  }
}

/* =========================================================
   SECTION HEADER
========================================================= */

function drawSection(
  page: PDFPage,
  number: string,
  title: string,
  y: number,
  bold: PDFFont
) {
  page.drawRectangle({
    x: 36,
    y,
    width: 523,
    height: 21,
    color: C.black,
  });

  page.drawRectangle({
    x: 36,
    y,
    width: 38,
    height: 21,
    color: C.orange,
  });

  page.drawText(number, {
    x: 48,
    y: y + 6,
    size: 8,
    font: bold,
    color: C.white,
  });

  page.drawText(title, {
    x: 87,
    y: y + 6,
    size: 7,
    font: bold,
    color: C.white,
  });
}

/* =========================================================
   FIELD
========================================================= */

function drawField(
  page: PDFPage,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number,
  regular: PDFFont,
  bold: PDFFont
) {
  page.drawText(label, {
    x,
    y,
    size: 5.8,
    font: bold,
    color: C.black,
  });

  page.drawText(
    safe(value) || " ",
    {
      x: x + 73,
      y,
      size: 6.8,
      font: regular,
      color: C.black,
      maxWidth: width - 73,
    }
  );

  page.drawLine({
    start: {
      x: x + 73,
      y: y - 3,
    },
    end: {
      x: x + width,
      y: y - 3,
    },
    thickness: 0.45,
    color: C.border,
  });
}

/* =========================================================
   MAIN PDF
========================================================= */

export async function generateInternshipApplicationPDF(
  data: ApplicationPdfData
) {
  try {
    const pdf =
      await PDFDocument.create();

    const page =
      pdf.addPage([
        595.28,
        841.89,
      ]);

    const width =
      page.getWidth();

    const height =
      page.getHeight();

    const regular =
      await pdf.embedFont(
        StandardFonts.Helvetica
      );

    const bold =
      await pdf.embedFont(
        StandardFonts.HelveticaBold
      );

    const logo =
      await loadLogo(pdf);

    const expectedEndDate =
      data.endDate ||
      calculateEndDate(
        data.startDate,
        data.duration
      );

    const left = 36;
    const right = 36;

    /* =====================================================
       PAGE BACKGROUND
    ====================================================== */

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: C.white,
    });

    /* =====================================================
       TOP ORANGE STRIP
    ====================================================== */

    page.drawRectangle({
      x: 0,
      y: height - 6,
      width,
      height: 6,
      color: C.orange,
    });

    /* =====================================================
       OFFICIAL HEADER
    ====================================================== */

    if (logo) {
      page.drawImage(logo, {
        x: left,
        y: height - 73,
        width: 55,
        height: 55,
      });
    } else {
      page.drawRectangle({
        x: left,
        y: height - 73,
        width: 55,
        height: 55,
        borderColor: C.black,
        borderWidth: 0.8,
      });

      page.drawText("AJFT", {
        x: left + 12,
        y: height - 51,
        size: 10,
        font: bold,
        color: C.orange,
      });
    }

    page.drawText(
      "ANAND JIVAN FOUNDATION TRUST",
      {
        x: left + 68,
        y: height - 37,
        size: 14,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      "Registered Social Organisation",
      {
        x: left + 68,
        y: height - 51,
        size: 7,
        font: regular,
        color: C.gray,
      }
    );

    page.drawText(
      "Darbhanga, Bihar, India",
      {
        x: left + 68,
        y: height - 64,
        size: 6.3,
        font: regular,
        color: C.gray,
      }
    );

    /* Right header */

    page.drawText(
      "INTERNSHIP PROGRAMME",
      {
        x: 408,
        y: height - 37,
        size: 6.8,
        font: bold,
        color: C.orange,
      }
    );

    page.drawText(
      "APPLICATION FORM",
      {
        x: 408,
        y: height - 51,
        size: 9.5,
        font: bold,
        color: C.black,
      }
    );

    /* =====================================================
       HEADER RULE
    ====================================================== */

    page.drawLine({
      start: {
        x: left,
        y: height - 82,
      },
      end: {
        x: width - right,
        y: height - 82,
      },
      thickness: 1,
      color: C.black,
    });

    page.drawLine({
      start: {
        x: left,
        y: height - 86,
      },
      end: {
        x: width - right,
        y: height - 86,
      },
      thickness: 0.6,
      color: C.orange,
    });

    /* =====================================================
       MAIN TITLE
    ====================================================== */

    page.drawText(
      "INTERNSHIP APPLICATION FORM",
      {
        x: 164,
        y: height - 111,
        size: 11.5,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      "To be completed by the applicant",
      {
        x: 213,
        y: height - 124,
        size: 5.8,
        font: regular,
        color: C.gray,
      }
    );

    /* =====================================================
       APPLICATION ID
    ====================================================== */

    page.drawRectangle({
      x: left,
      y: height - 161,
      width: 275,
      height: 28,
      color: C.lightGray,
      borderColor: C.border,
      borderWidth: 0.6,
    });

    page.drawText(
      "APPLICATION ID:",
      {
        x: left + 8,
        y: height - 150,
        size: 6.2,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      safe(data.applicationId),
      {
        x: left + 82,
        y: height - 150,
        size: 8,
        font: bold,
        color: C.orange,
      }
    );

    /* =====================================================
       APPLICATION DATE
    ====================================================== */

    page.drawRectangle({
      x: 322,
      y: height - 161,
      width: 237,
      height: 28,
      color: C.lightGray,
      borderColor: C.border,
      borderWidth: 0.6,
    });

    page.drawText(
      "APPLICATION DATE:",
      {
        x: 330,
        y: height - 150,
        size: 6.2,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      formatDate(data.appliedAt),
      {
        x: 426,
        y: height - 150,
        size: 7,
        font: regular,
        color: C.black,
      }
    );

    /* =====================================================
       PHOTO BOX
    ====================================================== */

    page.drawRectangle({
      x: 473,
      y: height - 278,
      width: 86,
      height: 108,
      color: C.white,
      borderColor: C.black,
      borderWidth: 1,
    });

    page.drawText(
      "PASSPORT",
      {
        x: 493,
        y: height - 192,
        size: 6.5,
        font: bold,
        color: C.gray,
      }
    );

    page.drawText(
      "SIZE PHOTO",
      {
        x: 488,
        y: height - 205,
        size: 6.5,
        font: bold,
        color: C.gray,
      }
    );

    page.drawText(
      "Paste photograph",
      {
        x: 487,
        y: height - 258,
        size: 5.2,
        font: regular,
        color: C.gray,
      }
    );

    /* =====================================================
       01 APPLICANT INFORMATION
    ====================================================== */

    drawSection(
      page,
      "01",
      "APPLICANT INFORMATION",
      650,
      bold
    );

    drawField(
      page,
      "Full Name",
      data.name,
      44,
      622,
      420,
      regular,
      bold
    );

    drawField(
      page,
      "Mobile",
      data.phone,
      44,
      598,
      250,
      regular,
      bold
    );

    drawField(
      page,
      "Date of Birth",
      formatDate(data.dob),
      310,
      598,
      154,
      regular,
      bold
    );

    drawField(
      page,
      "Email",
      data.email,
      44,
      574,
      420,
      regular,
      bold
    );

    drawField(
      page,
      "Address",
      data.address || "",
      44,
      550,
      420,
      regular,
      bold
    );

    drawField(
      page,
      "City",
      data.city || "",
      44,
      526,
      185,
      regular,
      bold
    );

    drawField(
      page,
      "State",
      data.state || "",
      240,
      526,
      185,
      regular,
      bold
    );

    drawField(
      page,
      "PIN Code",
      data.pincode || "",
      438,
      526,
      115,
      regular,
      bold
    );

    /* =====================================================
       02 EDUCATION
    ====================================================== */

    drawSection(
      page,
      "02",
      "EDUCATIONAL INFORMATION",
      490,
      bold
    );

    drawField(
      page,
      "Institution / College",
      data.institution || "",
      44,
      462,
      420,
      regular,
      bold
    );

    drawField(
      page,
      "Course / Programme",
      data.course || "",
      44,
      438,
      250,
      regular,
      bold
    );

    drawField(
      page,
      "Qualification",
      data.qualification || "",
      310,
      438,
      154,
      regular,
      bold
    );

    /* =====================================================
       03 INTERNSHIP DETAILS
    ====================================================== */

    drawSection(
      page,
      "03",
      "INTERNSHIP DETAILS",
      402,
      bold
    );

    drawField(
      page,
      "Area of Interest",
      data.area,
      44,
      374,
      420,
      regular,
      bold
    );

    drawField(
      page,
      "Duration",
      data.duration,
      44,
      350,
      250,
      regular,
      bold
    );

    drawField(
      page,
      "Start Date",
      formatDate(
        data.startDate
      ),
      310,
      350,
      154,
      regular,
      bold
    );

    drawField(
      page,
      "Expected End Date",
      expectedEndDate,
      44,
      326,
      420,
      regular,
      bold
    );

    /* =====================================================
       04 DOCUMENT VERIFICATION
    ====================================================== */

    drawSection(
      page,
      "04",
      "DOCUMENT VERIFICATION",
      290,
      bold
    );

    /* Table header */

    page.drawRectangle({
      x: 36,
      y: 245,
      width: 523,
      height: 22,
      color: C.lightOrange,
      borderColor: C.border,
      borderWidth: 0.6,
    });

    page.drawText(
      "DOCUMENT",
      {
        x: 48,
        y: 253,
        size: 6,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      "DETAIL / LAST FOUR DIGITS",
      {
        x: 205,
        y: 253,
        size: 6,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      "STATUS",
      {
        x: 447,
        y: 253,
        size: 6,
        font: bold,
        color: C.black,
      }
    );

    const rows = [
      {
        y: 223,
        name: "Aadhaar Card",
        detail:
          data.aadhaarLast4
            ? `XXXX XXXX ${data.aadhaarLast4}`
            : "",
        status:
          data.aadhaarLast4
            ? "Submitted"
            : "",
      },
      {
        y: 201,
        name: "Marksheet",
        detail:
          data.marksheetStatus || "",
        status:
          data.marksheetStatus
            ? "Submitted"
            : "",
      },
      {
        y: 179,
        name: "College ID Card",
        detail:
          data.collegeIdStatus || "",
        status:
          data.collegeIdStatus
            ? "Submitted"
            : "",
      },
    ];

    for (const row of rows) {
      page.drawRectangle({
        x: 36,
        y: row.y,
        width: 523,
        height: 22,
        color: C.white,
        borderColor: C.border,
        borderWidth: 0.45,
      });

      page.drawText(
        row.name,
        {
          x: 48,
          y: row.y + 7,
          size: 6,
          font: regular,
          color: C.black,
        }
      );

      page.drawText(
        row.detail ||
          "________________",
        {
          x: 205,
          y: row.y + 7,
          size: 6,
          font: regular,
          color: C.black,
        }
      );

      page.drawText(
        row.status ||
          "[ ] Submitted",
        {
          x: 447,
          y: row.y + 7,
          size: 5.4,
          font: regular,
          color: C.black,
        }
      );
    }

    /* =====================================================
       05 APPLICANT STATEMENT
    ====================================================== */

    drawSection(
      page,
      "05",
      "APPLICANT STATEMENT",
      151,
      bold
    );

    const statement =
      safe(data.message) ||
      "I wish to apply for the internship programme and agree to provide the required documents and information to Anand Jivan Foundation Trust.";

    drawWrappedText(
      page,
      statement,
      44,
      135,
      regular,
      5.8,
      C.black,
      505,
      7
    );

    /* =====================================================
       06 DECLARATION
    ====================================================== */

    drawSection(
      page,
      "06",
      "DECLARATION",
      104,
      bold
    );

    const declaration =
      "I hereby declare that the information provided in this application is true and correct to the best of my knowledge. I understand that submission of this application does not guarantee selection for the internship programme and I agree to follow the rules and instructions of Anand Jivan Foundation Trust.";

    drawWrappedText(
      page,
      declaration,
      44,
      88,
      regular,
      5.4,
      C.black,
      505,
      6.6
    );

    /* =====================================================
       SIGNATURE AREA
    ====================================================== */

    const signatureY = 31;
    const signatureHeight = 43;

    /* Student */

    page.drawRectangle({
      x: 36,
      y: signatureY,
      width: 254,
      height: signatureHeight,
      color: C.white,
      borderColor: C.black,
      borderWidth: 0.7,
    });

    page.drawText(
      "STUDENT SIGNATURE",
      {
        x: 44,
        y: signatureY + 31,
        size: 5.8,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      "Signature: __________________________",
      {
        x: 44,
        y: signatureY + 17,
        size: 5.2,
        font: regular,
        color: C.black,
      }
    );

    page.drawText(
      "Date: ______________",
      {
        x: 44,
        y: signatureY + 5,
        size: 5.2,
        font: regular,
        color: C.black,
      }
    );

    /* Office */

    page.drawRectangle({
      x: 305,
      y: signatureY,
      width: 254,
      height: signatureHeight,
      color: C.white,
      borderColor: C.orange,
      borderWidth: 0.8,
    });

    page.drawText(
      "AJFT OFFICE USE ONLY",
      {
        x: 313,
        y: signatureY + 31,
        size: 5.8,
        font: bold,
        color: C.orange,
      }
    );

    page.drawText(
      "Received Date: __________",
      {
        x: 313,
        y: signatureY + 19,
        size: 5.1,
        font: regular,
        color: C.black,
      }
    );

    page.drawText(
      "Verified By: ____________",
      {
        x: 313,
        y: signatureY + 8,
        size: 5.1,
        font: regular,
        color: C.black,
      }
    );

    page.drawText(
      "Status:",
      {
        x: 432,
        y: signatureY + 19,
        size: 5.1,
        font: bold,
        color: C.black,
      }
    );

    page.drawText(
      "[ ] Received",
      {
        x: 432,
        y: signatureY + 9,
        size: 4.5,
        font: regular,
        color: C.black,
      }
    );

    page.drawText(
      "[ ] Verified",
      {
        x: 483,
        y: signatureY + 9,
        size: 4.5,
        font: regular,
        color: C.black,
      }
    );

    page.drawText(
      "[ ] Approved",
      {
        x: 526,
        y: signatureY + 9,
        size: 4.5,
        font: regular,
        color: C.black,
      }
    );

    /* =====================================================
       FOOTER
    ====================================================== */

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 17,
      color: C.black,
    });

    page.drawText(
      "ANAND JIVAN FOUNDATION TRUST",
      {
        x: 36,
        y: 5,
        size: 4.5,
        font: bold,
        color: C.white,
      }
    );

    page.drawText(
      "Darbhanga, Bihar, India",
      {
        x: 205,
        y: 5,
        size: 4.5,
        font: regular,
        color: C.white,
      }
    );

    page.drawText(
      `Application ID: ${safe(
        data.applicationId
      )}`,
      {
        x: 405,
        y: 5,
        size: 4.5,
        font: regular,
        color: C.white,
      }
    );

    /* =====================================================
       PDF SAVE
    ====================================================== */

    const bytes =
      await pdf.save();

    return Buffer.from(bytes);

  } catch (error) {
    console.error(
      "PDF GENERATION FAILED:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to generate application PDF."
    );
  }
}