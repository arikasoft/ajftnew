import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import StudentApplication from "@/models/StudentApplication";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* =========================================================
   STUDENT LOGIN
========================================================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const studentId =
      String(
        body.studentId || ""
      )
        .trim()
        .toUpperCase();

    const password =
      String(
        body.password || ""
      ).trim();

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!studentId || !password) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Student ID and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       DATABASE CONNECTION
    ===================================================== */

    await connectDB();

    /* =====================================================
       FIND STUDENT IN MAIN STUDENT COLLECTION
    ===================================================== */

    let student =
      await Student.findOne({
        studentId: {
          $regex:
            `^${escapeRegex(studentId)}$`,

          $options: "i",
        },
      }).select("+password");

    /* =====================================================
       FALLBACK:
       CHECK STUDENT APPLICATION COLLECTION
    ===================================================== */

    let source =
      "student";

    if (!student) {
      student =
        await StudentApplication.findOne({
          studentId: {
            $regex:
              `^${escapeRegex(studentId)}$`,

            $options: "i",
          },
        }).select("+password");

      source =
        "application";
    }

    /* =====================================================
       STUDENT NOT FOUND
    ===================================================== */

    if (!student) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid Student ID or password.",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       PASSWORD CHECK
    ===================================================== */

    const storedPassword =
      String(
        student.password || ""
      );

    let passwordMatched =
      false;

    const isBcryptHash =
      storedPassword.startsWith(
        "$2a$"
      ) ||
      storedPassword.startsWith(
        "$2b$"
      ) ||
      storedPassword.startsWith(
        "$2y$"
      );

    if (isBcryptHash) {
      passwordMatched =
        await bcrypt.compare(
          password,
          storedPassword
        );
    } else {
      passwordMatched =
        storedPassword === password;
    }

    /* =====================================================
       INVALID PASSWORD
    ===================================================== */

    if (!passwordMatched) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid Student ID or password.",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       UPDATE LOGIN TIME
    ===================================================== */

    student.lastLoginAt =
      new Date();

    /*
     * Automatically upgrade old plain password.
    */

    if (!isBcryptHash) {
      student.password =
        await bcrypt.hash(
          password,
          12
        );
    }

    await student.save();

    /* =====================================================
       CREATE LOGIN RESPONSE
    ===================================================== */

    const response =
      NextResponse.json(
        {
          success: true,

          message:
            "Login successful.",

          data: {
            studentId:
              student.studentId,

            fullName:
              student.fullName,

            email:
              student.email || "",

            source,
          },
        },
        {
          status: 200,
        }
      );

    /* =====================================================
       SESSION COOKIE
    ===================================================== */

    response.cookies.set(
      "ajft_student_id",
      String(
        student.studentId
      ),
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 *
          60 *
          24 *
          7,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "STUDENT LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to login. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   ESCAPE REGEX
========================================================= */

function escapeRegex(
  value: string
) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}