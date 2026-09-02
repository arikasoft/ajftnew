import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Student from "@/models/Student";

import {
  requireStudent,
} from "@/lib/student-auth";

export const dynamic =
  "force-dynamic";

export async function GET() {
  try {
    const session =
      await requireStudent();

    await connectDB();

    const student =
      await Student.findOne({
        studentId:
          session.studentId,
      })
        .select(
          "studentId fullName course certificateEligible certificateId createdAt"
        )
        .lean();

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,

      data: {
        eligible:
          student.certificateEligible,

        certificateId:
          student.certificateId,

        studentId:
          student.studentId,

        fullName:
          student.fullName,

        course:
          student.course,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Unauthorized access.",
      },
      {
        status: 401,
      }
    );
  }
}