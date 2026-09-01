import mongoose, {
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";

const AnalyticsSchema = new Schema(
  {
    page: {
      type: String,
      trim: true,
      default: "",
    },

    path: {
      type: String,
      trim: true,
      default: "",
    },

    event: {
      type: String,
      trim: true,
      default: "page_view",
    },

    referrer: {
      type: String,
      trim: true,
      default: "",
    },

    userAgent: {
      type: String,
      trim: true,
      default: "",
    },

    ip: {
      type: String,
      trim: true,
      default: "",
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export type AnalyticsDocument = InferSchemaType<
  typeof AnalyticsSchema
>;

const Analytics: Model<AnalyticsDocument> =
  mongoose.models.Analytics ||
  mongoose.model<AnalyticsDocument>(
    "Analytics",
    AnalyticsSchema
  );

export default Analytics;