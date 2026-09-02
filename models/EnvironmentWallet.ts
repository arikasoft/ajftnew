import {
  Schema,
  model,
  models,
} from "mongoose";

const WalletTransactionSchema =
  new Schema(
    {
      transactionId: {
        type: String,
        required: true,
        unique: true,
      },

      type: {
        type: String,
        enum: [
          "bonus",
          "payment",
          "adjustment",
          "refund",
        ],
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      plantationId: {
        type: String,
        default: "",
      },

      paymentId: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "completed",
          "pending",
          "reversed",
        ],
        default: "completed",
      },
    },
    {
      timestamps: true,
      _id: false,
    }
  );

const EnvironmentWalletSchema =
  new Schema(
    {
      participantId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      totalEarned: {
        type: Number,
        default: 0,
      },

      availableBalance: {
        type: Number,
        default: 0,
      },

      totalPaid: {
        type: Number,
        default: 0,
      },

      transactions: {
        type: [
          WalletTransactionSchema,
        ],
        default: [],
      },
    },
    {
      timestamps: true,
      collection:
        "environmentwallets",
    }
  );

const EnvironmentWallet =
  models.EnvironmentWallet ||
  model(
    "EnvironmentWallet",
    EnvironmentWalletSchema
  );

export default EnvironmentWallet;