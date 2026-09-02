import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

import bcrypt from "bcryptjs";

/* =========================================================
   STUDENT APPLICATION SCHEMA
========================================================= */

const StudentApplicationSchema =
  new Schema(
    {
      /* ===================================================
         APPLICATION DETAILS
      =================================================== */

      applicationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        uppercase: true,
      },

      appliedProgram: {
        type: String,
        required: true,
        default: "Skill Development Programme",
        trim: true,
      },

      courseName: {
        type: String,
        default: "",
        trim: true,
      },

      /* ===================================================
         STUDENT DETAILS
      =================================================== */

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      fatherName: {
        type: String,
        default: "",
        trim: true,
      },

      motherName: {
        type: String,
        default: "",
        trim: true,
      },

      dateOfBirth: {
        type: String,
        default: "",
      },

      gender: {
        type: String,
        default: "",
        trim: true,
      },

      /* ===================================================
         CONTACT DETAILS
      =================================================== */

      mobile: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
        index: true,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      district: {
        type: String,
        default: "",
        trim: true,
      },

      pincode: {
        type: String,
        default: "",
        trim: true,
      },

      /* ===================================================
         LOGIN CREDENTIALS
      =================================================== */

      studentId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        uppercase: true,
      },

      /*
       Password is hidden by default.
       Login API must use:
       .select("+password")
      */

      password: {
        type: String,
        required: true,
        select: false,
      },

      passwordChangedAt: {
        type: Date,
        default: null,
      },

      lastLoginAt: {
        type: Date,
        default: null,
      },

      /* ===================================================
         APPLICATION STATUS
      =================================================== */

      status: {
        type: String,

        enum: [
          "pending",
          "approved",
          "rejected",
          "active",
          "completed",
        ],

        default: "approved",

        index: true,
      },

      /* ===================================================
         LEARNING STATUS
      =================================================== */

      enrollmentStatus: {
        type: String,

        enum: [
          "not_started",
          "active",
          "completed",
          "suspended",
        ],

        default: "not_started",

        index: true,
      },

      courseStartedAt: {
        type: Date,
        default: null,
      },

      courseCompletedAt: {
        type: Date,
        default: null,
      },

      /* ===================================================
         EXAM DETAILS

         Total Questions: 70
         Passing Marks: 45
      =================================================== */

      examStatus: {
        type: String,

        enum: [
          "not_started",
          "in_progress",
          "completed",
          "passed",
          "failed",
        ],

        default: "not_started",

        index: true,
      },

      totalQuestions: {
        type: Number,
        default: 70,
      },

      passingMarks: {
        type: Number,
        default: 45,
      },

      obtainedMarks: {
        type: Number,
        default: 0,
      },

      totalMarks: {
        type: Number,
        default: 70,
      },

      percentage: {
        type: Number,
        default: 0,
      },

      examAttempt: {
        type: Number,
        default: 0,
      },

      examStartedAt: {
        type: Date,
        default: null,
      },

      examCompletedAt: {
        type: Date,
        default: null,
      },

      /* ===================================================
         CERTIFICATE
      =================================================== */

      certificateEligible: {
        type: Boolean,
        default: false,
        index: true,
      },

      certificateGenerated: {
        type: Boolean,
        default: false,
      },

      certificateId: {
        type: String,
        default: "",
        trim: true,
        index: true,
      },

      certificateUrl: {
        type: String,
        default: "",
      },

      certificateGeneratedAt: {
        type: Date,
        default: null,
      },

      /* ===================================================
         COMMUNICATION STATUS
      =================================================== */

      applicationEmailSent: {
        type: Boolean,
        default: false,
      },

      credentialsEmailSent: {
        type: Boolean,
        default: false,
      },

      certificateEmailSent: {
        type: Boolean,
        default: false,
      },

      /* ===================================================
         ADMIN DETAILS
      =================================================== */

      adminRemarks: {
        type: String,
        default: "",
        trim: true,
      },

      approvedAt: {
        type: Date,
        default: null,
      },

      rejectedAt: {
        type: Date,
        default: null,
      },

      source: {
        type: String,
        default: "website",
      },
    },

    {
      timestamps: true,

      collection:
        "studentapplications",
    }
  );

/* =========================================================
   INDEXES
========================================================= */

StudentApplicationSchema.index({
  createdAt: -1,
});

StudentApplicationSchema.index({
  status: 1,
  enrollmentStatus: 1,
});

StudentApplicationSchema.index({
  examStatus: 1,
});

StudentApplicationSchema.index({
  certificateEligible: 1,
});

/* =========================================================
   PASSWORD HASHING

   Automatically hash password before saving.
========================================================= */

StudentApplicationSchema.pre(
  "save",
  async function () {
    if (
      !this.isModified("password")
    ) {
      return;
    }

    /*
     * Do not hash an already hashed password.
     */

    const currentPassword =
      String(this.password || "");

    const alreadyHashed =
      currentPassword.startsWith(
        "$2a$"
      ) ||
      currentPassword.startsWith(
        "$2b$"
      ) ||
      currentPassword.startsWith(
        "$2y$"
      );

    if (alreadyHashed) {
      return;
    }

    this.password =
      await bcrypt.hash(
        currentPassword,
        12
      );
  }
);

/* =========================================================
   PASSWORD COMPARISON METHOD
========================================================= */

StudentApplicationSchema.methods.comparePassword =
  async function (
    enteredPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

/* =========================================================
   AUTO CALCULATE RESULT

   Passing marks: 45 out of 70
========================================================= */

StudentApplicationSchema.pre(
  "save",
  function () {
    const marks =
      Number(
        this.obtainedMarks || 0
      );

    const total =
      Number(
        this.totalMarks || 70
      );

    const passing =
      Number(
        this.passingMarks || 45
      );

    this.percentage =
      total > 0
        ? Number(
            (
              (marks / total) *
              100
            ).toFixed(2)
          )
        : 0;

    /*
     * Student becomes certificate eligible
     * automatically after scoring 45 or above.
     */

    if (
      this.examStatus ===
        "completed" ||
      this.examStatus ===
        "passed" ||
      this.examStatus ===
        "failed"
    ) {
      if (marks >= passing) {
        this.examStatus =
          "passed";

        this.certificateEligible =
          true;

        this.enrollmentStatus =
          "completed";
      } else {
        this.examStatus =
          "failed";

        this.certificateEligible =
          false;
      }
    }
  }
);

/* =========================================================
   EXPORT MODEL
========================================================= */

const StudentApplication =
  models.StudentApplication ||
  model(
    "StudentApplication",
    StudentApplicationSchema
  );

export default StudentApplication;