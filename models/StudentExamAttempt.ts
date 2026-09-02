import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const StudentExamAttemptSchema =
  new Schema(
    {
      studentId: {
        type: String,
        required: true,
        index: true,
      },

      examName: {
        type: String,
        default:
          "Skill Development Final Assessment",
      },

      totalQuestions: {
        type: Number,
        default: 70,
      },

      passingMarks: {
        type: Number,
        default: 45,
      },

      answers: [
        {
          questionId: Number,

          selectedAnswer: String,

          isCorrect: Boolean,
        },
      ],

      score: {
        type: Number,
        default: 0,
      },

      percentage: {
        type: Number,
        default: 0,
      },

      result: {
        type: String,
        enum: [
          "pending",
          "pass",
          "fail",
        ],
        default: "pending",
        index: true,
      },

      startedAt: {
        type: Date,
        default: Date.now,
      },

      submittedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      collection:
        "studentexamattempts",
    }
  );

const StudentExamAttempt =
  models.StudentExamAttempt ||
  model(
    "StudentExamAttempt",
    StudentExamAttemptSchema
  );

export default StudentExamAttempt;