import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const ChildWelfareApplicationSchema =
  new Schema(
    {
      applicationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      /* Guardian Details */

      guardianName: {
        type: String,
        required: true,
        trim: true,
      },

      relation: {
        type: String,
        required: true,
        trim: true,
      },

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
      },

      /* Child Details */

      childName: {
        type: String,
        required: true,
        trim: true,
      },

      dateOfBirth: {
        type: String,
        default: "",
      },

      gender: {
        type: String,
        required: true,
      },

      schoolName: {
        type: String,
        default: "",
        trim: true,
      },

      educationLevel: {
        type: String,
        default: "",
      },

      /* Address */

      address: {
        type: String,
        required: true,
        trim: true,
      },

      village: {
        type: String,
        default: "",
        trim: true,
      },

      district: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        default: "",
        trim: true,
      },

      /* Support */

      supportRequired: {
        type: [
          String,
        ],
        default: [],
      },

      supportDescription: {
        type: String,
        default: "",
        trim: true,
      },

      familyIncome: {
        type: String,
        default: "",
      },

      /* Status */

      status: {
        type: String,
        enum: [
          "submitted",
          "under_review",
          "approved",
          "rejected",
          "completed",
        ],
        default: "submitted",
        index: true,
      },

      adminRemark: {
        type: String,
        default: "",
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      collection:
        "child_welfare_applications",
    }
  );

const ChildWelfareApplication =
  models.ChildWelfareApplication ||
  model(
    "ChildWelfareApplication",
    ChildWelfareApplicationSchema
  );

export default ChildWelfareApplication;