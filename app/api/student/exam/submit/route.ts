import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Student from "@/models/Student";

import StudentExamAttempt from "@/models/StudentExamAttempt";

import {
  skillDevelopmentQuestions,
} from "@/lib/skill-development-questions";

import {
  requireStudent,
} from "@/lib/student-auth";

import {
  generateCertificateId,
} from "@/lib/generate-certificate-id";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: Request
) {
  try {
    const session =
      await requireStudent();

    const body =
      await request.json();

    const submittedAnswers =
      Array.isArray(body.answers)
        ? body.answers
        : [];

    await connectDB();

    const student =
      await Student.findOne({
        studentId:
          session.studentId,
      });

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

    const previousAttempt =
      await StudentExamAttempt.findOne({
        studentId:
          student.studentId,
        result: {
          $in: [
            "pass",
            "fail",
          ],
        },
      });

    if (previousAttempt) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Examination has already been submitted.",
        },
        {
          status: 400,
        }
      );
    }

    const answerMap =
      new Map<
        number,
        string
      >();

    for (
      const item of submittedAnswers
    ) {
      if (
        typeof item?.questionId ===
          "number" &&
        typeof item?.selectedAnswer ===
          "string"
      ) {
        answerMap.set(
          item.questionId,
          item.selectedAnswer
        );
      }
    }

    let score = 0;

    const evaluatedAnswers =
      skillDevelopmentQuestions.map(
        (question) => {
          const selectedAnswer =
            answerMap.get(
              question.id
            ) || "";

          const isCorrect =
            selectedAnswer ===
            question.answer;

          if (isCorrect) {
            score++;
          }

          return {
            questionId:
              question.id,

            selectedAnswer,

            isCorrect,
          };
        }
      );

    const percentage =
      Number(
        (
          (score /
            skillDevelopmentQuestions.length) *
          100
        ).toFixed(2)
      );

    const passed =
      score >= 45;

    const result =
      passed
        ? "pass"
        : "fail";

    const attempt =
      await StudentExamAttempt.create(
        {
          studentId:
            student.studentId,

          totalQuestions:
            70,

          passingMarks:
            45,

          answers:
            evaluatedAnswers,

          score,

          percentage,

          result,

          submittedAt:
            new Date(),
        }
      );

    let certificateId =
      student.certificateId;

    if (passed) {
      if (!certificateId) {
        certificateId =
          generateCertificateId();
      }

      student.certificateEligible =
        true;

      student.certificateId =
        certificateId;

      student.courseProgress =
        100;

      student.applicationStatus =
        "completed";
    }

    await student.save();

    return NextResponse.json({
      success: true,

      message: passed
        ? "Congratulations! You have successfully passed the examination."
        : "Examination submitted successfully.",

      data: {
        attemptId:
          attempt._id,

        score,

        totalQuestions: 70,

        passingMarks: 45,

        percentage,

        result,

        certificateEligible:
          passed,

        certificateId:
          passed
            ? certificateId
            : null,
      },
    });
  } catch (error) {
    console.error(
      "EXAM SUBMIT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit examination.",
      },
      {
        status: 500,
      }
    );
  }
}