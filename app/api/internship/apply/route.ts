import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InternshipApplication from "@/models/InternshipApplication";
import { generateApplicationId } from "@/lib/application-id";
import { generateInternshipApplicationPDF } from "@/lib/internship-pdf";
import { sendInternshipApplicationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    /* =====================================================
       STUDENT
    ====================================================== */

    const name = String(
      body.name || body.fullName || ""
    ).trim();

    const email = String(
      body.email || ""
    ).trim().toLowerCase();

    const phone = String(
      body.phone || body.mobile || ""
    ).trim();

    const dob = String(
      body.dob || ""
    ).trim();

    const address = String(
      body.address || ""
    ).trim();

    const city = String(
      body.city || ""
    ).trim();

    const state = String(
      body.state || ""
    ).trim();

    const pincode = String(
      body.pincode || body.pinCode || ""
    ).trim();

    /* =====================================================
       EDUCATION
    ====================================================== */

    const institution = String(
      body.institution || body.college || ""
    ).trim();

    const course = String(
      body.course || body.programme || body.program || ""
    ).trim();

    const qualification = String(
      body.qualification || ""
    ).trim();

    /* =====================================================
       INTERNSHIP
    ====================================================== */

    const area = String(
      body.area ||
      body.program ||
      body.programName ||
      body.programme ||
      ""
    ).trim();

    const duration = String(
      body.duration || "8 Weeks"
    ).trim();

    const startDate = String(
      body.startDate || ""
    ).trim();

    const endDate = String(
      body.endDate || ""
    ).trim();

    /* =====================================================
       DOCUMENT VERIFICATION
    ====================================================== */

    const aadhaarLast4 = String(
      body.aadhaarLast4 || ""
    ).trim();

    const marksheetLast4 = String(
      body.marksheetLast4 || ""
    ).trim();

    const collegeIdLast4 = String(
      body.collegeIdLast4 || ""
    ).trim();

    /* =====================================================
       STATEMENT / DECLARATION
    ====================================================== */

    const message = String(
      body.message || ""
    ).trim();

    const declarationAccepted =
      body.declarationAccepted === true ||
      body.declarationAccepted === "true" ||
      body.declaration === true ||
      body.declaration === "true";

    /* =====================================================
       VALIDATION
    ====================================================== */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        { status: 400 }
      );
    }

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid email address is required.",
        },
        { status: 400 }
      );
    }

    if (
      !phone ||
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid 10 digit mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!dob) {
      return NextResponse.json(
        {
          success: false,
          message: "Date of birth is required.",
        },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Complete address is required.",
        },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        {
          success: false,
          message: "City is required.",
        },
        { status: 400 }
      );
    }

    if (!state) {
      return NextResponse.json(
        {
          success: false,
          message: "State is required.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid 6 digit PIN code is required.",
        },
        { status: 400 }
      );
    }

    if (!institution) {
      return NextResponse.json(
        {
          success: false,
          message: "Institution / College is required.",
        },
        { status: 400 }
      );
    }

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course / Programme is required.",
        },
        { status: 400 }
      );
    }

    if (!qualification) {
      return NextResponse.json(
        {
          success: false,
          message: "Qualification is required.",
        },
        { status: 400 }
      );
    }

    if (!area) {
      return NextResponse.json(
        {
          success: false,
          message: "Internship programme is required.",
        },
        { status: 400 }
      );
    }

    if (!duration) {
      return NextResponse.json(
        {
          success: false,
          message: "Internship duration is required.",
        },
        { status: 400 }
      );
    }

    if (!startDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Internship start date is required.",
        },
        { status: 400 }
      );
    }

    if (!endDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Internship end date is required.",
        },
        { status: 400 }
      );
    }

    if (new Date(endDate) < new Date(startDate)) {
      return NextResponse.json(
        {
          success: false,
          message: "End date cannot be before start date.",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Applicant statement is required.",
        },
        { status: 400 }
      );
    }

    if (message.length < 20) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Applicant statement must contain at least 20 characters.",
        },
        { status: 400 }
      );
    }

    if (!declarationAccepted) {
      return NextResponse.json(
        {
          success: false,
          message: "Please accept the declaration.",
        },
        { status: 400 }
      );
    }

    if (
      aadhaarLast4 &&
      !/^\d{4}$/.test(aadhaarLast4)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Aadhaar last four digits must contain exactly 4 digits.",
        },
        { status: 400 }
      );
    }

    if (
      marksheetLast4 &&
      !/^\d{4}$/.test(marksheetLast4)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Marksheet last four digits must contain exactly 4 digits.",
        },
        { status: 400 }
      );
    }

    if (
      collegeIdLast4 &&
      !/^\d{4}$/.test(collegeIdLast4)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "College ID last four digits must contain exactly 4 digits.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       IMPORTANT
       Do NOT return an old application here.
       Every successful submission gets a NEW ID.
    ====================================================== */

    const applicationId =
      await generateApplicationId();

    /* =====================================================
       SAVE APPLICATION
    ====================================================== */

    const application =
      await InternshipApplication.create({
        applicationId,

        student: {
          name,
          email,
          phone,
          dob,
          address,
          city,
          state,
          pincode,
        },

        education: {
          institution,
          course,
          qualification,
        },

        internship: {
          area,
          duration,
          startDate,
          endDate,
        },

        documents: {
          aadhaarLast4,
          marksheetLast4,
          collegeIdLast4,
        },

        applicantStatement: message,

        declarationAccepted,

        status: "SUBMITTED",

        physicalReceived: false,

        certificateEligible: false,

        certificatePaymentStatus: "PENDING",
      });

    /* =====================================================
       GENERATE PDF WITH THE SAME SAVED DETAILS
    ====================================================== */

    let pdfBuffer: Buffer;

    try {
      pdfBuffer =
        await generateInternshipApplicationPDF({
          applicationId,

          name,
          email,
          phone,

          dob,
          address,
          city,
          state,
          pincode,

          institution,
          course,
          qualification,

          area,
          duration,
          startDate,
          endDate,

          message,

          aadhaarLast4,
          marksheetStatus:
            marksheetLast4
              ? marksheetLast4
              : "Not Provided",

          collegeIdStatus:
            collegeIdLast4
              ? collegeIdLast4
              : "Not Provided",

          appliedAt:
            application.createdAt ||
            new Date(),
        });
    } catch (pdfError) {
      console.error(
        "INTERNSHIP PDF ERROR:",
        pdfError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Application was saved, but PDF generation failed.",
          applicationId,
        },
        { status: 500 }
      );
    }

    /* =====================================================
       SEND EMAIL
    ====================================================== */

    let emailSent = false;
    let emailError = "";

    try {
      await sendInternshipApplicationEmail({
        name,
        email,
        applicationId,
        pdfBuffer,
      });

      emailSent = true;
    } catch (mailError) {
      console.error(
        "INTERNSHIP EMAIL ERROR:",
        mailError
      );

      emailError =
        mailError instanceof Error
          ? mailError.message
          : "Email sending failed.";
    }

    /* =====================================================
       UPDATE EMAIL STATUS
    ====================================================== */

    if (emailSent) {
      application.status = "EMAIL_SENT";
    }

    await application.save();

    /* =====================================================
       FINAL RESPONSE
    ====================================================== */

    return NextResponse.json({
      success: true,

      applicationId,

      emailSent,

      pdfGenerated: true,

      status: application.status,

      emailError: emailSent
        ? ""
        : emailError,

      message: emailSent
        ? "Application submitted successfully. Application ID and PDF have been sent to your email."
        : "Application saved successfully. PDF generated, but confirmation email could not be sent.",
    });
  } catch (error) {
    console.error(
      "INTERNSHIP APPLY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Application submission failed.",
      },
      { status: 500 }
    );
  }
}