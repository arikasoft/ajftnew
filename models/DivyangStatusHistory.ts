import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IDivyangStatusHistory
  extends Document {
  applicationId: string;

  status: string;

  title: string;

  message?: string;

  updatedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

const DivyangStatusHistorySchema =
  new Schema<IDivyangStatusHistory>(
    {
      applicationId: {
        type: String,
        required: true,
        index: true,
      },

      status: {
        type: String,
        required: true,
        index: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        trim: true,
      },

      updatedBy: {
        type: String,
        default: "AJFT SYSTEM",
      },
    },
    {
      timestamps: true,
    }
  );

DivyangStatusHistorySchema.index({
  applicationId: 1,
  createdAt: -1,
});

const DivyangStatusHistory: Model<IDivyangStatusHistory> =
  mongoose.models.DivyangStatusHistory ||
  mongoose.model<IDivyangStatusHistory>(
    "DivyangStatusHistory",
    DivyangStatusHistorySchema
  );

export default DivyangStatusHistory;