import mongoose, { Schema, models } from "mongoose";

const HealthHelpRequestSchema = new Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    helpType: {
      type: String,
      required: true,
    },

    urgency: {
      type: String,
      enum: [
        "General",
        "Important",
        "Urgent",
      ],
      default: "General",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "assistance",
        "completed",
        "closed",
      ],
      default: "pending",
      index: true,
    },

    adminNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default models.HealthHelpRequest ||
  mongoose.model(
    "HealthHelpRequest",
    HealthHelpRequestSchema
  );