import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const SkillStudentSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    applicationId: {
      type: String,
      required: true,
      unique: true,
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
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    address: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "approved",
        "rejected",
        "active",
        "completed",
      ],
      default: "submitted",
      index: true,
    },

    emailSent: {
      type: Boolean,
      default: false,
    },

    firstLogin: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "skillstudents",
  }
);

const SkillStudent =
  models.SkillStudent ||
  model("SkillStudent", SkillStudentSchema);

export default SkillStudent;