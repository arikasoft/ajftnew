import { NextResponse } from "next/server";

import {
  skillDevelopmentQuestions,
} from "@/lib/skill-development-questions";

import {
  requireStudent,
} from "@/lib/student-auth";

export const dynamic =
  "force-dynamic";

export async function GET() {
  try {
    await requireStudent();

    const questions =
      skillDevelopmentQuestions.map(
        ({
          id,
          question,
          options,
        }) => ({
          id,
          question,
          options,
        })
      );

    return NextResponse.json({
      success: true,

      data: {
        examName:
          "Skill Development Final Assessment",

        totalQuestions:
          questions.length,

        passingMarks: 45,

        questions,
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