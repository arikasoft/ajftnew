import mongoose, { Schema, Model } from "mongoose";

export interface IVisitorEvent {
  visitorId: string;
  sessionId: string;

  eventName: string;
  eventCategory?: string;

  page?: string;

  eventData?: Record<string, unknown>;

  createdAt: Date;
}

const VisitorEventSchema = new Schema<IVisitorEvent>(
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

    eventName: {
      type: String,
      required: true,
      index: true,
    },

    eventCategory: String,

    page: String,

    eventData: {
      type: Schema.Types.Mixed,
      default: {},
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const VisitorEvent: Model<IVisitorEvent> =
  mongoose.models.VisitorEvent ||
  mongoose.model<IVisitorEvent>(
    "VisitorEvent",
    VisitorEventSchema
  );

export default VisitorEvent;