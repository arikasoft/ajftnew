import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface ICareerApplication
  extends Document {
  applicationId: string;

  // ==========================================
  // JOB SNAPSHOT
  // ==========================================

  jobId: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;

  // ==========================================
  // PERSONAL INFORMATION
  // ==========================================

  fullName: string;
  fatherName: string;
  email: string;
  phone: string;
  alternatePhone: string;

  dateOfBirth: string;
  gender: string;
  category: string;

  // ==========================================
  // ADDRESS
  // ==========================================

  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;

  // ==========================================
  // EDUCATION
  // ==========================================

  highestQualification: string;
  university: string;
  passingYear: string;
  percentage: string;

  // ==========================================
  // EXPERIENCE
  // ==========================================

  experience: string;
  currentOrganization: string;
  currentDesignation: string;
  totalExperience: string;
  expectedSalary: string;

  // ==========================================
  // DOCUMENTS
  // ==========================================

  resume: string;
  photo: string;
  coverLetter: string;

  // ==========================================
  // DECLARATION
  // ==========================================

  declarationAccepted: boolean;

  // ==========================================
  // APPLICATION STATUS
  // ==========================================

  status: string;
  stage: string;

  // ==========================================
  // ADMIN
  // ==========================================

  adminRemarks: string;

  approvedAt?: Date | null;
  rejectedAt?: Date | null;

  // ==========================================
  // INTERVIEW
  // ==========================================

  interviewDate?: Date | null;
  interviewMode?: string;
  interviewRemarks?: string;

  // ==========================================
  // FINAL DECISION
  // ==========================================

  selectedAt?: Date | null;
  joinedAt?: Date | null;

  // ==========================================
  // AUDIT
  // ==========================================

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

      // ==========================================
      // JOB SNAPSHOT
      // ==========================================

      jobId: {
        type: String,
        required: true,
        index: true,
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
        default: "Full Time",
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

      fatherName: {
        type: String,
        default: "",
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
        required: true,
        trim: true,
      },

      alternatePhone: {
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

      category: {
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

      district: {
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

      expectedSalary: {
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

      photo: {
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
      // APPROVAL / REJECTION
      // ==========================================

      approvedAt: {
        type: Date,
        default: null,
      },

      rejectedAt: {
        type: Date,
        default: null,
      },

      // ==========================================
      // INTERVIEW
      // ==========================================

      interviewDate: {
        type: Date,
        default: null,
      },

      interviewMode: {
        type: String,
        default: "",
        trim: true,
      },

      interviewRemarks: {
        type: String,
        default: "",
        trim: true,
      },

      // ==========================================
      // FINAL DECISION
      // ==========================================

      selectedAt: {
        type: Date,
        default: null,
      },

      joinedAt: {
        type: Date,
        default: null,
      },
    },

    {
      timestamps: true,
      versionKey: false,
      collection: "careerapplications",
    }
  );

// ==========================================
// INDEXES
// ==========================================

CareerApplicationSchema.index({
  jobId: 1,
  status: 1,
});

CareerApplicationSchema.index({
  email: 1,
  createdAt: -1,
});

CareerApplicationSchema.index({
  phone: 1,
  createdAt: -1,
});

CareerApplicationSchema.index({
  createdAt: -1,
});

// ==========================================
// MODEL
// ==========================================

const CareerApplication: Model<ICareerApplication> =
  mongoose.models.CareerApplication ||
  mongoose.model<ICareerApplication>(
    "CareerApplication",
    CareerApplicationSchema
  );

export default CareerApplication;