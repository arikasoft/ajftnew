import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import StudentExamAttempt from "@/models/StudentExamAttempt";

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

    const attempt =
      await StudentExamAttempt.findOne({
        studentId:
          session.studentId,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,

      data: attempt || null,
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