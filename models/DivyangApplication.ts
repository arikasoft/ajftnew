import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const DivyangApplicationSchema =
  new Schema(
    {
      applicationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      fatherName: {
        type: String,
        default: "",
        trim: true,
      },

      dateOfBirth: {
        type: String,
        required: true,
        trim: true,
      },

      gender: {
        type: String,
        default: "",
      },

      mobile: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },

      disabilityType: {
        type: String,
        required: true,
        trim: true,
      },

      disabilityPercentage: {
        type: String,
        default: "",
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

      pincode: {
        type: String,
        default: "",
        trim: true,
      },

      status: {
        type: String,
        default: "pending",
        enum: [
          "pending",
          "under review",
          "approved",
          "rejected",
          "completed",
          "submitted",
        ],
        index: true,
      },

      source: {
        type: String,
        default: "website",
      },
    },
    {
      timestamps: true,
      collection: "divyangapplications",
    }
  );

/*
|--------------------------------------------------------------------------
| IMPORTANT: REMOVE OLD CACHED MODEL
|--------------------------------------------------------------------------
|
| Your previous schema had `dob` as required.
| During development, Mongoose may keep the old schema in cache.
|
*/

if (models.DivyangApplication) {
  delete models.DivyangApplication;
}

const DivyangApplication =
  model(
    "DivyangApplication",
    DivyangApplicationSchema
  );

export default DivyangApplication;