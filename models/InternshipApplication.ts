import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IInternshipApplication
  extends Document {
  applicationId: string;

  student: {
    name: string;
    email: string;
    phone: string;
    dob?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  education: {
    institution?: string;
    course?: string;
    qualification?: string;
  };

  internship: {
    area: string;
    duration: string;
    startDate?: string;
    endDate?: string;
  };

  status: string;

  physicalReceived: boolean;
  physicalReceivedAt?: Date;

  approvedAt?: Date;

  internId?: string;

  completedAt?: Date;

  certificateEligible: boolean;

  certificatePaymentStatus: string;

  certificateId?: string;

  createdAt: Date;
  updatedAt: Date;
}

const InternshipApplicationSchema =
  new Schema<IInternshipApplication>(
    {
      applicationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      student: {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },

        phone: {
          type: String,
          required: true,
          trim: true,
        },

        dob: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
      },

      education: {
        institution: String,
        course: String,
        qualification: String,
      },

      internship: {
        area: {
          type: String,
          required: true,
        },

        duration: {
          type: String,
          required: true,
        },

        startDate: String,
        endDate: String,
      },

      status: {
        type: String,
        default: "SUBMITTED",
        index: true,
      },

      physicalReceived: {
        type: Boolean,
        default: false,
      },

      physicalReceivedAt: Date,

      approvedAt: Date,

      internId: String,

      completedAt: Date,

      certificateEligible: {
        type: Boolean,
        default: false,
      },

      certificatePaymentStatus: {
        type: String,
        default: "PENDING",
      },

      certificateId: String,
    },

    {
      timestamps: true,
    }
  );

export default
  mongoose.models.InternshipApplication ||
  mongoose.model<IInternshipApplication>(
    "InternshipApplication",
    InternshipApplicationSchema
  );