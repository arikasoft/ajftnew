import mongoose, { Schema, Model } from "mongoose";

export interface IVisitorSession {
  visitorId: string;
  sessionId: string;

  landingPage?: string;
  exitPage?: string;

  referrer?: string;
  source?: string;
  medium?: string;

  country?: string;
  region?: string;

  deviceType?: string;
  browser?: string;
  operatingSystem?: string;

  screenWidth?: number;
  screenHeight?: number;

  pageCount: number;

  startedAt: Date;
  lastSeenAt: Date;
  endedAt?: Date;
}

const VisitorSessionSchema = new Schema<IVisitorSession>(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    landingPage: String,
    exitPage: String,

    referrer: String,
    source: String,
    medium: String,

    country: String,
    region: String,

    deviceType: String,
    browser: String,
    operatingSystem: String,

    screenWidth: Number,
    screenHeight: Number,

    pageCount: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    lastSeenAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: Date,
  },
  {
    timestamps: true,
  }
);

const VisitorSession: Model<IVisitorSession> =
  mongoose.models.VisitorSession ||
  mongoose.model<IVisitorSession>(
    "VisitorSession",
    VisitorSessionSchema
  );

export default VisitorSession;