import mongoose, { Schema, Model } from "mongoose";

export interface IPageView {
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  referrer?: string;
  viewedAt: Date;
}

const PageViewSchema = new Schema<IPageView>(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    path: {
      type: String,
      required: true,
      index: true,
    },

    title: String,

    referrer: String,

    viewedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const PageView: Model<IPageView> =
  mongoose.models.PageView ||
  mongoose.model<IPageView>("PageView", PageViewSchema);

export default PageView;