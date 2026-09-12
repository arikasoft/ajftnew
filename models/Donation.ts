import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// ============================================================
// DONATION INTERFACE
// ============================================================

export interface IDonation extends Document {
  // ----------------------------------------------------------
  // DONATION REFERENCE
  // ----------------------------------------------------------

  donationReference: string;

  // ----------------------------------------------------------
  // DONOR
  // ----------------------------------------------------------

  donorName: string;

  mobile: string;

  email: string;

  address: string;

  city: string;

  state: string;

  pinCode: string;

  country: string;

  // ----------------------------------------------------------
  // DONOR TYPE
  // ----------------------------------------------------------

  donorType: string;

  donationMode: string;

  // ----------------------------------------------------------
  // DONATION TYPE
  // ----------------------------------------------------------

  donationType: string;

  // ----------------------------------------------------------
  // 80G
  // ----------------------------------------------------------

  requires80G: boolean;

  pan: string;

  // ----------------------------------------------------------
  // AMOUNT
  // ----------------------------------------------------------

  amount: number;

  currency: string;

  // ----------------------------------------------------------
  // RAZORPAY
  // ----------------------------------------------------------

  razorpayOrderId: string;

  orderId: string;

  paymentStatus: string;

  paymentId: string;

  // ----------------------------------------------------------
  // RECEIPT
  // ----------------------------------------------------------

  receiptNo: string;

  // ----------------------------------------------------------
  // CAMPAIGN TRACKING
  // ----------------------------------------------------------

  sourceAction: string;

  action: string;

  buttonId: string;

  utmSource: string;

  utmMedium: string;

  utmCampaign: string;

  utmContent: string;

  utmTerm: string;

  landingPage: string;

  // ----------------------------------------------------------
  // TIMESTAMPS
  // ----------------------------------------------------------

  createdAt: Date;

  updatedAt: Date;
}

// ============================================================
// SCHEMA
// ============================================================

const DonationSchema =
  new Schema<IDonation>(
    {
      // ======================================================
      // DONATION REFERENCE
      // ======================================================

      donationReference: {
        type: String,

        required: true,

        unique: true,

        index: true,

        trim: true,
      },

      // ======================================================
      // DONOR
      // ======================================================

      donorName: {
        type: String,

        required: true,

        trim: true,

        maxlength: 150,
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

        maxlength: 200,
      },

      address: {
        type: String,

        default: "",

        trim: true,

        maxlength: 500,
      },

      city: {
        type: String,

        default: "",

        trim: true,

        maxlength: 100,
      },

      state: {
        type: String,

        default: "",

        trim: true,

        maxlength: 100,
      },

      pinCode: {
        type: String,

        default: "",

        trim: true,

        maxlength: 10,
      },

      country: {
        type: String,

        default: "India",

        trim: true,

        maxlength: 100,
      },

      // ======================================================
      // DONOR TYPE
      // ======================================================

      donorType: {
        type: String,

        default: "indian",

        enum: [
          "indian",
          "nri",
          "foreign",
        ],

        index: true,

        trim: true,
      },

      donationMode: {
        type: String,

        default: "indian",

        enum: [
          "indian",
          "nri",
          "foreign",
        ],

        index: true,

        trim: true,
      },

      // ======================================================
      // DONATION TYPE
      // ======================================================

      donationType: {
        type: String,

        default: "one-time",

        enum: [
          "one-time",
          "one_time",
          "monthly",
        ],

        index: true,

        trim: true,
      },

      // ======================================================
      // 80G
      // ======================================================

      requires80G: {
        type: Boolean,

        default: false,

        index: true,
      },

      pan: {
        type: String,

        default: "",

        trim: true,

        uppercase: true,

        maxlength: 10,
      },

      // ======================================================
      // AMOUNT
      // ======================================================

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

        maxlength: 10,
      },

      // ======================================================
      // RAZORPAY ORDER
      // ======================================================

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

      // ======================================================
      // PAYMENT STATUS
      // ======================================================

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

      // ======================================================
      // RAZORPAY PAYMENT ID
      // ======================================================

      paymentId: {
        type: String,

        default: "",

        trim: true,

        index: true,
      },

      // ======================================================
      // RECEIPT
      // ======================================================

      receiptNo: {
        type: String,

        default: "",

        trim: true,

        index: true,
      },

      // ======================================================
      // CAMPAIGN TRACKING
      // ======================================================

      sourceAction: {
        type: String,

        default: "",

        trim: true,

        maxlength: 150,

        index: true,
      },

      action: {
        type: String,

        default: "",

        trim: true,

        maxlength: 100,
      },

      buttonId: {
        type: String,

        default: "",

        trim: true,

        maxlength: 100,
      },

      utmSource: {
        type: String,

        default: "",

        trim: true,

        maxlength: 100,

        index: true,
      },

      utmMedium: {
        type: String,

        default: "",

        trim: true,

        maxlength: 100,

        index: true,
      },

      utmCampaign: {
        type: String,

        default: "",

        trim: true,

        maxlength: 150,

        index: true,
      },

      utmContent: {
        type: String,

        default: "",

        trim: true,

        maxlength: 150,
      },

      utmTerm: {
        type: String,

        default: "",

        trim: true,

        maxlength: 150,
      },

      landingPage: {
        type: String,

        default: "",

        trim: true,

        maxlength: 500,
      },
    },

    // ========================================================
    // OPTIONS
    // ========================================================

    {
      timestamps: true,

      versionKey: false,
    }
  );

// ============================================================
// MODEL
// ============================================================
//
// IMPORTANT:
// Next.js development mode hot-reloads files.
// mongoose.models.Donation prevents model overwrite errors.
// ============================================================

const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>(
    "Donation",
    DonationSchema
  );

export default Donation;