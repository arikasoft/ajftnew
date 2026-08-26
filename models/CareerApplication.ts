import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface ICareerApplication
  extends Document {
  applicationId: string;

  jobId: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;

  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  highestQualification: string;
  university: string;
  passingYear: string;
  percentage: string;

  experience: string;
  currentOrganization: string;
  currentDesignation: string;
  totalExperience: string;

  resume: string;
  coverLetter: string;

  declarationAccepted: boolean;

  status: string;
  stage: string;
  adminRemarks: string;

  // ==========================================
  // ADMIN ACTION DATES
  // ==========================================

  approvedAt?: Date | null;
  rejectedAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

const CareerApplicationSchema =
  new Schema<ICareerApplication>(
    {
      // ==========================================
      // APPLICATION
      // ==========================================

      applicationId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      jobId: {
        type: String,
        default: "",
        trim: true,
      },

      jobTitle: {
        type: String,
        required: true,
        trim: true,
      },

      department: {
        type: String,
        default: "",
        trim: true,
      },

      location: {
        type: String,
        default: "",
        trim: true,
      },

      employmentType: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // PERSONAL INFORMATION
      // ==========================================

      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      dateOfBirth: {
        type: String,
        default: "",
        trim: true,
      },

      gender: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // ADDRESS
      // ==========================================

      address: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        default: "",
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      pincode: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // EDUCATION
      // ==========================================

      highestQualification: {
        type: String,
        default: "",
        trim: true,
      },

      university: {
        type: String,
        default: "",
        trim: true,
      },

      passingYear: {
        type: String,
        default: "",
        trim: true,
      },

      percentage: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // EXPERIENCE
      // ==========================================

      experience: {
        type: String,
        default: "",
        trim: true,
      },

      currentOrganization: {
        type: String,
        default: "",
        trim: true,
      },

      currentDesignation: {
        type: String,
        default: "",
        trim: true,
      },

      totalExperience: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // DOCUMENTS
      // ==========================================

      resume: {
        type: String,
        default: "",
        trim: true,
      },

      coverLetter: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // DECLARATION
      // ==========================================

      declarationAccepted: {
        type: Boolean,
        required: true,
        default: false,
      },

      // ==========================================
      // APPLICATION STATUS
      // ==========================================

      status: {
        type: String,
        default: "Submitted",
        index: true,
        trim: true,
      },

      stage: {
        type: String,
        default: "Application Submitted",
        index: true,
        trim: true,
      },

      // ==========================================
      // ADMIN REMARKS
      // ==========================================

      adminRemarks: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // APPROVAL / REJECTION DATES
      // ==========================================

      approvedAt: {
        type: Date,
        default: null,
      },

      rejectedAt: {
        type: Date,
        default: null,
      },
    },

    {
      timestamps: true,

      versionKey: false,

      collection:
        "careerapplications",
    }
  );

// ==========================================
// MODEL
// ==========================================

const CareerApplication:
  Model<ICareerApplication> =
  mongoose.models.CareerApplication ||
  mongoose.model<ICareerApplication>(
    "CareerApplication",
    CareerApplicationSchema
  );

export default CareerApplication;