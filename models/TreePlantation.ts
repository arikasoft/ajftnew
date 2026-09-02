import {
  Schema,
  model,
  models,
} from "mongoose";

const TreePlantationSchema =
  new Schema(
    {
      plantationId: {
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

      plantationDate: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      district: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      latitude: {
        type: String,
        default: "",
      },

      longitude: {
        type: String,
        default: "",
      },

      locationName: {
        type: String,
        default: "",
      },

      photo: {
        type: String,
        default: "",
      },

      beforePhoto: {
        type: String,
        default: "",
      },

      afterPhoto: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "submitted",
          "under review",
          "approved",
          "rejected",
        ],
        default: "submitted",
        index: true,
      },

      bonusAmount: {
        type: Number,
        default: 0,
        min: 0,
      },

      adminRemark: {
        type: String,
        default: "",
        trim: true,
      },

      verifiedAt: {
        type: Date,
        default: null,
      },

      verifiedBy: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
      collection:
        "treeplantations",
    }
  );

const TreePlantation =
  models.TreePlantation ||
  model(
    "TreePlantation",
    TreePlantationSchema
  );

export default TreePlantation;