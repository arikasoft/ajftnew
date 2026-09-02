import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const EnvironmentParticipantSchema =
  new Schema(
    {
      participantId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },

      mobile: {
        type: String,
        default: "",
        trim: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      district: {
        type: String,
        default: "",
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      pincode: {
        type: String,
        default: "",
        trim: true,
      },

      status: {
        type: String,

        enum: [
          "active",
          "inactive",
          "blocked",
        ],

        default: "active",
      },

      walletBalance: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalRewards: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalTrees: {
        type: Number,
        default: 0,
        min: 0,
      },

      lastLoginAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,

      collection:
        "environmentparticipants",
    }
  );


const EnvironmentParticipant =
  models.EnvironmentParticipant ||
  model(
    "EnvironmentParticipant",
    EnvironmentParticipantSchema
  );


export default EnvironmentParticipant;