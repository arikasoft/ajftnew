import mongoose, {
  Schema,
  Model,
  Document,
} from "mongoose";

interface IApplicationCounter extends Document {
  name: string;
  sequence: number;
  year: number;
}

const ApplicationCounterSchema =
  new Schema<IApplicationCounter>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },

      sequence: {
        type: Number,
        default: 0,
      },

      year: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const ApplicationCounter: Model<IApplicationCounter> =
  mongoose.models.ApplicationCounter ||
  mongoose.model<IApplicationCounter>(
    "ApplicationCounter",
    ApplicationCounterSchema
  );

export default ApplicationCounter;