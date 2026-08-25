import mongoose, { Schema, Document } from "mongoose";

export interface IInternshipIdCard
  extends Document {
  applicationId: string;
  internId: string;
  cardNumber: string;
  studentName: string;
  internshipArea: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  issuedAt: Date;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
}

const InternshipIdCardSchema =
  new Schema<IInternshipIdCard>(
    {
      applicationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      internId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      cardNumber: {
        type: String,
        required: true,
        unique: true,
      },

      studentName: {
        type: String,
        required: true,
      },

      internshipArea: {
        type: String,
        required: true,
      },

      duration: {
        type: String,
        required: true,
      },

      startDate: String,

      endDate: String,

      issuedAt: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "EXPIRED",
          "CANCELLED",
        ],
        default: "ACTIVE",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.InternshipIdCard ||
  mongoose.model<IInternshipIdCard>(
    "InternshipIdCard",
    InternshipIdCardSchema
  );