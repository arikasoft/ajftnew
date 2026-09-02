import {
  Schema,
  model,
  models,
} from "mongoose";

const EnvironmentPaymentSchema =
  new Schema(
    {
      paymentId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      participantId: {
        type: String,
        required: true,
        index: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 1,
      },

      paymentMethod: {
        type: String,
        enum: [
          "upi",
          "bank",
        ],
        required: true,
      },

      upiId: {
        type: String,
        default: "",
        trim: true,
      },

      accountHolder: {
        type: String,
        default: "",
        trim: true,
      },

      bankName: {
        type: String,
        default: "",
        trim: true,
      },

      accountNumber: {
        type: String,
        default: "",
      },

      ifscCode: {
        type: String,
        default: "",
        uppercase: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "processing",
          "paid",
          "rejected",
        ],
        default: "pending",
        index: true,
      },

      transactionReference: {
        type: String,
        default: "",
      },

      adminRemark: {
        type: String,
        default: "",
      },

      paidAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      collection:
        "environmentpayments",
    }
  );

const EnvironmentPayment =
  models.EnvironmentPayment ||
  model(
    "EnvironmentPayment",
    EnvironmentPaymentSchema
  );

export default EnvironmentPayment;