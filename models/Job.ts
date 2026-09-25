import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IJob extends Document {
  jobId: string;
  title: string;
  slug: string;

  department: string;
  category: string;

  location: string;
  employmentType: string;

  vacancies: number;

  qualification: string;
  experience: string;
  ageLimit: string;

  salaryMin: number;
  salaryMax: number;
  salaryText: string;

  description: string;

  responsibilities: string[];
  requirements: string[];
  skills: string[];

  lastDate: Date;

  status: "Draft" | "Published" | "Closed";

  featured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    location: {
      type: String,
      default: "Darbhanga, Bihar",
      trim: true,
    },

    employmentType: {
      type: String,
      default: "Full Time",
      trim: true,
    },

    vacancies: {
      type: Number,
      default: 1,
      min: 1,
    },

    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    ageLimit: {
      type: String,
      default: "",
      trim: true,
    },

    salaryMin: {
      type: Number,
      default: 0,
      min: 0,
    },

    salaryMax: {
      type: Number,
      default: 0,
      min: 0,
    },

    salaryText: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    lastDate: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Closed",
      ],
      default: "Draft",
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    versionKey: false,
    collection: "jobs",
  }
);

JobSchema.index({
  status: 1,
  lastDate: 1,
});

JobSchema.index({
  department: 1,
  status: 1,
});

JobSchema.index({
  category: 1,
  status: 1,
});

const Job: Model<IJob> =
  mongoose.models.Job ||
  mongoose.model<IJob>(
    "Job",
    JobSchema
  );

export default Job;