import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";

import SkillStudent from "@/models/SkillStudent";

import {
  generateSkillApplicationId,
  generateStudentId,
  generateTemporaryPassword,
} from "@/lib/generate-skill-id";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      fullName,
      fatherName,
      dateOfBirth,
      gender,
      mobile,
      email,
      address,
      state,
      district,
      pincode,
      qualification,
      course,
    } = body;

    /* ============================================
       REQUIRED VALIDATION
    ============================================ */

    if (!fullName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!mobile?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!course?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a course.",
        },
        {
          status: 400,
        }
      );
    }

    /* ============================================
       CHECK EXISTING EMAIL
    ============================================ */

    const existingStudent =
      await SkillStudent.findOne({
        email: email.trim().toLowerCase(),
      });

    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An application already exists with this email address.",
        },
        {
          status: 409,
        }
      );
    }

    /* ============================================
       GENERATE IDs
    ============================================ */

    const applicationId =
      generateSkillApplicationId();

    const studentId =
      generateStudentId();

    const temporaryPassword =
      generateTemporaryPassword();

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        12
      );

    /* ============================================
       CREATE STUDENT
    ============================================ */

    const student =
      await SkillStudent.create({
        applicationId,
        studentId,

        fullName:
          fullName.trim(),

        fatherName:
          fatherName?.trim() || "",

        dateOfBirth:
          dateOfBirth || "",

        gender:
          gender || "",

        mobile:
          mobile.trim(),

        email:
          email.trim().toLowerCase(),

        password:
          hashedPassword,

        address:
          address?.trim() || "",

        state:
          state?.trim() || "",

        district:
          district?.trim() || "",

        pincode:
          pincode?.trim() || "",

        qualification:
          qualification?.trim() || "",

        course:
          course.trim(),

        status:
          "submitted",
      });

    /* ============================================
       SUCCESS
    ============================================ */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your Skill Development application has been submitted successfully.",

        data: {
          applicationId:
            student.applicationId,

          studentId:
            student.studentId,

          fullName:
            student.fullName,

          email:
            student.email,

          temporaryPassword,

          loginUrl:
            "/student/login",
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "SKILL APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your application.",
      },
      {
        status: 500,
      }
    );
  }
}