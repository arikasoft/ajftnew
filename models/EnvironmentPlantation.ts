import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const EnvironmentPlantationSchema =
  new Schema(
    {
      /*
       * PLANTATION ID
       */
      plantationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      /*
       * PARTICIPANT
       */
      participantId: {
        type: String,
        required: true,
        index: true,
        trim: true,
      },

      /*
       * TREE INFORMATION
       */
      treeName: {
        type: String,
        required: true,
        trim: true,
      },

      treeType: {
        type: String,
        default: "",
        trim: true,
      },

      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },

      /*
       * PLANTATION DATE
       */
      plantedDate: {
        type: Date,
        default: Date.now,
      },

      /*
       * LOCATION
       */
      location: {
        type: String,
        default: "",
        trim: true,
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

      /*
       * GPS LOCATION
       */
      latitude: {
        type: String,
        default: "",
      },

      longitude: {
        type: String,
        default: "",
      },

      /*
       * PHOTO
       */
      plantationPhoto: {
        type: String,
        default: "",
      },

      additionalPhoto: {
        type: String,
        default: "",
      },

      /*
       * VERIFICATION STATUS
       */
      status: {
        type: String,

        enum: [
          "pending",
          "approved",
          "rejected",
        ],

        default: "pending",

        index: true,
      },

      /*
       * ADMIN VERIFICATION
       */
      verifiedBy: {
        type: String,
        default: "",
      },

      verifiedAt: {
        type: Date,
        default: null,
      },

      rejectionReason: {
        type: String,
        default: "",
        trim: true,
      },

      /*
       * CASH REWARD
       */
      rewardEligible: {
        type: Boolean,
        default: false,
      },

      rewardAmount: {
        type: Number,
        default: 0,
        min: 0,
      },

      rewardStatus: {
        type: String,

        enum: [
          "not_eligible",
          "pending",
          "approved",
          "paid",
        ],

        default: "not_eligible",
      },

      rewardPaidAt: {
        type: Date,
        default: null,
      },

      /*
       * ADMIN NOTES
       */
      adminRemarks: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      timestamps: true,

      collection:
        "environmentplantations",
    }
  );


/*
 * INDEXES
 */

EnvironmentPlantationSchema.index({
  participantId: 1,
  createdAt: -1,
});

EnvironmentPlantationSchema.index({
  status: 1,
  createdAt: -1,
});


/*
 * MODEL
 */

const EnvironmentPlantation =
  models.EnvironmentPlantation ||
  model(
    "EnvironmentPlantation",
    EnvironmentPlantationSchema
  );


export default EnvironmentPlantation;