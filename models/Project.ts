import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const ProjectSchema = new Schema(
  {
    projectCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      default: "Community Development",
      index: true,
    },

    status: {
      type: String,
      default: "ongoing",
      enum: [
        "upcoming",
        "ongoing",
        "completed",
        "on hold",
        "cancelled",
      ],
      index: true,
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "Bihar",
      trim: true,
      index: true,
    },

    district: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    block: {
      type: String,
      default: "",
      trim: true,
    },

    village: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    approvedBudget: {
      type: Number,
      default: 0,
      min: 0,
    },

    expenditure: {
      type: Number,
      default: 0,
      min: 0,
    },

    beneficiaries: {
      type: Number,
      default: 0,
      min: 0,
    },

    targetBeneficiaries: {
      type: Number,
      default: 0,
      min: 0,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    implementingPartner: {
      type: String,
      default: "Anand Jivan Foundation Trust",
      trim: true,
    },

    fundingSource: {
      type: String,
      default: "",
      trim: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    gallery: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    objectives: {
      type: [String],
      default: [],
    },

    challenges: {
      type: [String],
      default: [],
    },

    reportFile: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "projects",
  }
);

ProjectSchema.index({
  title: "text",
  projectCode: "text",
  category: "text",
  district: "text",
  state: "text",
});

const Project =
  models.Project ||
  model("Project", ProjectSchema);

export default Project;