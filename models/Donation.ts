import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// ============================================================
// DONATION INTERFACE
// ============================================================

export interface IDonation
  extends Document {
  donationReference: string;

  donorName: string;

  mobile: string;

  email: string;

  address: string;

  requires80G: boolean;

  pan: string;

  amount: number;

  currency: string;

  razorpayOrderId: string;

  orderId: string;

  paymentStatus: string;

  paymentId: string;

  receiptNo: string;

  createdAt: Date;

  updatedAt: Date;
}

// ============================================================
// SCHEMA
// ============================================================

const DonationSchema =
  new Schema<IDonation>(
    {
      // --------------------------------------------------------
      // DONATION REFERENCE
      // --------------------------------------------------------

      donationReference: {
        type: String,

        required: true,

        unique: true,

        index: true,

        trim: true,
      },

      // --------------------------------------------------------
      // DONOR
      // --------------------------------------------------------

      donorName: {
        type: String,

        required: true,

        trim: true,
      },

      mobile: {
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

      address: {
        type: String,

        default: "",

        trim: true,
      },

      // --------------------------------------------------------
      // 80G
      // --------------------------------------------------------

      requires80G: {
        type: Boolean,

        default: false,
      },

      pan: {
        type: String,

        default: "",

        trim: true,

        uppercase: true,
      },

      // --------------------------------------------------------
      // AMOUNT
      // --------------------------------------------------------

      amount: {
        type: Number,

        required: true,

        min: 1,
      },

      currency: {
        type: String,

        default: "INR",

        trim: true,

        uppercase: true,
      },

      // --------------------------------------------------------
      // RAZORPAY ORDER
      // --------------------------------------------------------

      razorpayOrderId: {
        type: String,

        default: "",

        trim: true,

        index: true,
      },

      orderId: {
        type: String,

        default: "",

        trim: true,

        index: true,
      },

      // --------------------------------------------------------
      // PAYMENT STATUS
      // --------------------------------------------------------

      paymentStatus: {
        type: String,

        default: "PENDING",

        enum: [
          "PENDING",
          "SUCCESS",
          "FAILED",
          "CANCELLED",
        ],

        index: true,
      },

      // --------------------------------------------------------
      // RAZORPAY PAYMENT ID
      // --------------------------------------------------------

      paymentId: {
        type: String,

        default: "",

        trim: true,

        index: true,
      },

      // --------------------------------------------------------
      // RECEIPT
      // --------------------------------------------------------

      receiptNo: {
        type: String,

        default: "",

        trim: true,

        index: true,
      },
    },

    {
      timestamps: true,

      versionKey: false,
    }
  );

// ============================================================
// MODEL
// ============================================================

const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>(
    "Donation",
    DonationSchema
  );

export default Donation;