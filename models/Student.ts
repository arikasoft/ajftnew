import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

import bcrypt from "bcryptjs";

/* =========================================================
   STUDENT SCHEMA
========================================================= */

const StudentSchema = new Schema(
  {
    /* =====================================================
       STUDENT IDENTITY
    ===================================================== */

    studentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
    },

    applicationId: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
      index: true,
    },

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

    dateOfBirth: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
      trim: true,
    },

    /* =====================================================
       CONTACT DETAILS
    ===================================================== */

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    mobile: {
      type: String,
      default: "",
      trim: true,
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

    /* =====================================================
       LOGIN PASSWORD
    ===================================================== */

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

    /* =====================================================
       COURSE
    ===================================================== */

    course: {
      type: String,
      default:
        "Skill Development Programme",
      trim: true,
    },

    courseCode: {
      type: String,
      default: "AJFT-SDP",
      trim: true,
      uppercase: true,
    },

    applicationStatus: {
      type: String,

      enum: [
        "pending",
        "active",
        "inactive",
        "rejected",
        "completed",
      ],

      default: "active",

      index: true,
    },

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

    /* =====================================================
       COURSE PROGRESS
    ===================================================== */

    courseProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    modulesCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalModules: {
      type: Number,
      default: 0,
      min: 0,
    },

    examEligible: {
      type: Boolean,
      default: true,
    },

    /* =====================================================
       EXAM SYSTEM
    ===================================================== */

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
      min: 1,
    },

    totalMarks: {
      type: Number,
      default: 70,
      min: 1,
    },

    passingMarks: {
      type: Number,
      default: 45,
      min: 1,
    },

    obtainedMarks: {
      type: Number,
      default: 0,
      min: 0,
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    examAttempt: {
      type: Number,
      default: 0,
      min: 0,
    },

    examStartedAt: {
      type: Date,
      default: null,
    },

    examCompletedAt: {
      type: Date,
      default: null,
    },

    /* =====================================================
       CERTIFICATE
    ===================================================== */

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

    /* =====================================================
       EMAIL STATUS
    ===================================================== */

    credentialsEmailSent: {
      type: Boolean,
      default: false,
    },

    certificateEmailSent: {
      type: Boolean,
      default: false,
    },

    /* =====================================================
       ADMIN
    ===================================================== */

    adminRemarks: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      default: "website",
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "students",
  }
);

/* =========================================================
   DATABASE INDEXES
========================================================= */

StudentSchema.index({
  createdAt: -1,
});

StudentSchema.index({
  applicationStatus: 1,
  enrollmentStatus: 1,
});

StudentSchema.index({
  examStatus: 1,
});

StudentSchema.index({
  certificateEligible: 1,
});

/* =========================================================
   PASSWORD HASHING
========================================================= */

StudentSchema.pre(
  "save",
  async function () {
    if (
      !this.isModified(
        "password"
      )
    ) {
      return;
    }

    const currentPassword =
      String(
        this.password || ""
      );

    if (!currentPassword) {
      return;
    }

    /*
     * Prevent double hashing.
     */

    const isAlreadyHashed =
      currentPassword.startsWith(
        "$2a$"
      ) ||
      currentPassword.startsWith(
        "$2b$"
      ) ||
      currentPassword.startsWith(
        "$2y$"
      );

    if (isAlreadyHashed) {
      return;
    }

    this.password =
      await bcrypt.hash(
        currentPassword,
        12
      );

    this.passwordChangedAt =
      new Date();
  }
);

/* =========================================================
   AUTO EXAM RESULT CALCULATION
========================================================= */

StudentSchema.pre(
  "save",
  function () {
    const obtainedMarks =
      Number(
        this.obtainedMarks || 0
      );

    const totalMarks =
      Number(
        this.totalMarks || 70
      );

    const passingMarks =
      Number(
        this.passingMarks || 45
      );

    /*
     * Calculate percentage.
     */

    this.percentage =
      totalMarks > 0
        ? Number(
            (
              (obtainedMarks /
                totalMarks) *
              100
            ).toFixed(2)
          )
        : 0;

    /*
     * Final exam result.
     */

    const isExamFinished =
      this.examStatus ===
        "completed" ||
      this.examStatus ===
        "passed" ||
      this.examStatus ===
        "failed";

    if (isExamFinished) {
      if (
        obtainedMarks >=
        passingMarks
      ) {
        this.examStatus =
          "passed";

        this.certificateEligible =
          true;

        this.applicationStatus =
          "completed";

        this.enrollmentStatus =
          "completed";

        if (
          !this.courseCompletedAt
        ) {
          this.courseCompletedAt =
            new Date();
        }
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
   PASSWORD COMPARISON METHOD
========================================================= */

StudentSchema.methods.comparePassword =
  async function (
    enteredPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

/* =========================================================
   SAFE JSON TRANSFORMATION

   Password is never returned accidentally.
========================================================= */

StudentSchema.set(
  "toJSON",
  {
    transform: function (
      _doc,
      ret: Record<
        string,
        unknown
      >
    ) {
      /*
       * TypeScript-safe password removal.
       */

      Reflect.deleteProperty(
        ret,
        "password"
      );

      return ret;
    },
  }
);

/* =========================================================
   EXPORT MODEL
========================================================= */

const Student =
  models.Student ||
  model(
    "Student",
    StudentSchema
  );

export default Student;