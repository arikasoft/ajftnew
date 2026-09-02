import { NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";

import Student from "@/models/Student";
import StudentApplication from "@/models/StudentApplication";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* =========================================================
   POST
   CREATE STUDENT APPLICATION + STUDENT LOGIN ACCOUNT
========================================================= */

export async function POST(request: Request) {
  try {
    /* =====================================================
       REQUEST BODY
    ===================================================== */

    const body = await request.json();

    /* =====================================================
       NORMALIZE DATA
    ===================================================== */

    const fullName = String(
      body.fullName || ""
    ).trim();

    const fatherName = String(
      body.fatherName || ""
    ).trim();

    const motherName = String(
      body.motherName || ""
    ).trim();

    const dateOfBirth = String(
      body.dateOfBirth ||
      body.dob ||
      ""
    ).trim();

    const gender = String(
      body.gender || ""
    ).trim();

    const email = String(
      body.email || ""
    )
      .trim()
      .toLowerCase();

    const mobile = String(
      body.mobile || ""
    )
      .replace(/\D/g, "")
      .slice(-10);

    const address = String(
      body.address || ""
    ).trim();

    const state = String(
      body.state || ""
    ).trim();

    const district = String(
      body.district || ""
    ).trim();

    const pincode = String(
      body.pincode || ""
    ).trim();

    const courseName = String(
      body.courseName ||
      body.course ||
      "Skill Development Programme"
    ).trim();

    /* =====================================================
       VALIDATION
    ===================================================== */

    const errors: Record<
      string,
      string
    > = {};

    if (!fullName) {
      errors.fullName =
        "Full name is required.";
    }

    if (!email) {
      errors.email =
        "Email address is required.";
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      errors.email =
        "Please enter a valid email address.";
    }

    if (!mobile) {
      errors.mobile =
        "Mobile number is required.";
    }

    if (
      mobile &&
      mobile.length !== 10
    ) {
      errors.mobile =
        "Please enter a valid 10 digit mobile number.";
    }

    if (!state) {
      errors.state =
        "State is required.";
    }

    if (!district) {
      errors.district =
        "District is required.";
    }

    if (
      Object.keys(errors).length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please correct the required fields.",
          errors,
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CONNECT DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       DUPLICATE EMAIL CHECK
    ===================================================== */

    const existingStudent =
      await Student.findOne({
        email,
      }).select(
        "studentId fullName email"
      );

    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A student account already exists with this email address.",

          data: {
            studentId:
              existingStudent.studentId,
          },
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       DUPLICATE APPLICATION CHECK
    ===================================================== */

    const existingApplication =
      await StudentApplication.findOne({
        email,
      }).select(
        "studentId applicationId"
      );

    /*
     * If application exists but Student account
     * does not exist, return credentials safely.
     */

    if (
      existingApplication &&
      existingApplication.studentId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An application already exists with this email address.",

          data: {
            applicationId:
              existingApplication.applicationId,

            studentId:
              existingApplication.studentId,
          },
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       GENERATE UNIQUE IDs
    ===================================================== */

    const applicationId =
      await generateApplicationId();

    const studentId =
      await generateStudentId();

    /* =====================================================
       GENERATE PASSWORD

       Example:
       AJFT@K8P4M2
    ===================================================== */

    const generatedPassword =
      generatePassword();

    /* =====================================================
       CREATE STUDENT APPLICATION
    ===================================================== */

    const application =
      await StudentApplication.create({
        applicationId,

        appliedProgram:
          "Skill Development Programme",

        courseName,

        fullName,

        fatherName,

        motherName,

        dateOfBirth,

        gender,

        email,

        mobile,

        address,

        state,

        district,

        pincode,

        studentId,

        password:
          generatedPassword,

        status:
          "approved",

        enrollmentStatus:
          "not_started",

        examStatus:
          "not_started",

        totalQuestions:
          70,

        totalMarks:
          70,

        passingMarks:
          45,

        source:
          "website",
      });

    /* =====================================================
       CREATE STUDENT LOGIN ACCOUNT

       Student model automatically bcrypt hashes
       the password.
    ===================================================== */

    const student =
      await Student.create({
        applicationId,

        studentId,

        fullName,

        fatherName,

        dateOfBirth,

        gender,

        email,

        mobile,

        address,

        state,

        district,

        pincode,

        password:
          generatedPassword,

        course:
          courseName,

        courseCode:
          "AJFT-SDP",

        applicationStatus:
          "active",

        enrollmentStatus:
          "not_started",

        courseProgress:
          0,

        examEligible:
          true,

        examStatus:
          "not_started",

        totalQuestions:
          70,

        totalMarks:
          70,

        passingMarks:
          45,

        obtainedMarks:
          0,

        certificateEligible:
          false,

        certificateGenerated:
          false,

        source:
          "website",
      });

    /* =====================================================
       SUCCESS RESPONSE

       Password is returned only at account creation.

       Later login uses the password entered by
       the student.
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your Skill Development application has been submitted successfully.",

        data: {
          applicationId:
            application.applicationId,

          studentId:
            student.studentId,

          fullName:
            student.fullName,

          course:
            student.course,

          credentials: {
            studentId:
              student.studentId,

            password:
              generatedPassword,
          },

          loginUrl:
            "/student/login",

          exam: {
            totalQuestions: 70,
            passingMarks: 45,
            totalMarks: 70,
          },
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "STUDENT APPLICATION ERROR:",
      error
    );

    /*
     * MongoDB duplicate key error.
    */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number })
        .code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "A student account already exists with these details.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your application. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   GENERATE APPLICATION ID
========================================================= */

async function generateApplicationId() {
  const year =
    new Date().getFullYear();

  let applicationId = "";

  let exists = true;

  while (exists) {
    const random =
      crypto
        .randomBytes(5)
        .toString("hex")
        .toUpperCase();

    applicationId =
      `AJFT-SDP-${year}-${random}`;

    exists =
      Boolean(
        await StudentApplication.exists({
          applicationId,
        })
      );
  }

  return applicationId;
}

/* =========================================================
   GENERATE STUDENT ID

   Example:
   AJFT-STU-2026-482731
========================================================= */

async function generateStudentId() {
  const year =
    new Date().getFullYear();

  let studentId = "";

  let exists = true;

  while (exists) {
    const randomNumber =
      crypto.randomInt(
        100000,
        999999
      );

    studentId =
      `AJFT-STU-${year}-${randomNumber}`;

    exists =
      Boolean(
        await Student.exists({
          studentId,
        })
      );
  }

  return studentId;
}

/* =========================================================
   GENERATE PASSWORD

   Example:
   AJFT@A7K9P4
========================================================= */

function generatePassword() {
  const random =
    crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

  return `AJFT@${random}`;
}