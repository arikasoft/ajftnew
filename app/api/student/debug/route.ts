import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const students = await Student.find({})
      .select("+password")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({
      success: true,
      total: students.length,

      students: students.map((student: any) => ({
        _id: student._id,
        studentId: student.studentId,
        fullName: student.fullName,
        email: student.email,

        passwordExists: Boolean(student.password),

        passwordType:
          String(student.password || "").startsWith("$2")
            ? "bcrypt"
            : "plain",

        applicationStatus:
          student.applicationStatus,

        createdAt:
          student.createdAt,
      })),
    });
  } catch (error) {
    console.error(
      "STUDENT DEBUG ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load students.",
      },
      {
        status: 500,
      }
    );
  }
}