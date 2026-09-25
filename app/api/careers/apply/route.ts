import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";

/* =========================================================
   HELPERS
========================================================= */

function clean(value: unknown): string {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function cleanEmail(value: unknown): string {
  return clean(value).toLowerCase();
}

function getValue(
  data: Record<string, unknown>,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = clean(data[key]);

    if (value) {
      return value;
    }
  }

  return "";
}

/* =========================================================
   FALLBACK JOBS
   These are the active vacancies shown on Careers page.
========================================================= */

const JOBS: Record<
  string,
  {
    jobId: string;
    title: string;
    department: string;
    location: string;
    employmentType: string;
    experience: string;
    salary: string;
    lastDate: string;
  }
> = {
  "AJFT-MGR-001": {
    jobId: "AJFT-MGR-001",
    title: "Program Manager",
    department: "Programs & Operations",
    location: "Darbhanga, Bihar",
    employmentType: "Full Time",
    experience: "3–6 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
  },

  "AJFT-SUP-002": {
    jobId: "AJFT-SUP-002",
    title: "Field Supervisor",
    department: "Field Operations",
    location: "Bihar",
    employmentType: "Full Time",
    experience: "1–4 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
  },

  "AJFT-FLD-003": {
    jobId: "AJFT-FLD-003",
    title: "Field Staff",
    department: "Community Development",
    location: "Bihar",
    employmentType: "Full Time",
    experience: "0–3 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
  },

  "AJFT-PO-004": {
    jobId: "AJFT-PO-004",
    title: "Program Officer",
    department: "Program Management",
    location: "Darbhanga, Bihar",
    employmentType: "Full Time",
    experience: "2–5 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
  },

  "AJFT-CO-005": {
    jobId: "AJFT-CO-005",
    title: "Community Outreach Coordinator",
    department: "Community Outreach",
    location: "Bihar",
    employmentType: "Full Time",
    experience: "1–3 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
  },

  "AJFT-ACC-006": {
    jobId: "AJFT-ACC-006",
    title: "Accounts & Administration Executive",
    department: "Finance & Administration",
    location: "Darbhanga, Bihar",
    employmentType: "Full Time",
    experience: "1–4 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
  },
};

/* =========================================================
   GENERATE APPLICATION ID
========================================================= */

async function generateApplicationId(): Promise<string> {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 10; attempt++) {
    const random = Math.floor(
      100000 + Math.random() * 900000
    );

    const applicationId =
      `AJFT-CAREER-${year}-${random}`;

    const exists =
      await CareerApplication.exists({
        applicationId,
      });

    if (!exists) {
      return applicationId;
    }
  }

  return `AJFT-CAREER-${Date.now()}`;
}

/* =========================================================
   POST
   Submit Career Application
========================================================= */

export async function POST(
  request: Request
) {
  try {
    /* =====================================================
       READ REQUEST
    ===================================================== */

    const contentType =
      request.headers.get("content-type") || "";

    let body: Record<string, unknown> = {};

    if (
      contentType.includes(
        "multipart/form-data"
      )
    ) {
      const formData =
        await request.formData();

      formData.forEach((value, key) => {
        if (
          typeof value === "string"
        ) {
          body[key] = value;
        }
      });
    } else {
      body = await request.json();
    }

    /* =====================================================
       JOB
    ===================================================== */

    const jobId = getValue(
      body,
      "jobId",
      "jobID",
      "job_id"
    );

    const requestedJobTitle =
      getValue(
        body,
        "jobTitle",
        "title"
      );

    const fallbackJob =
      JOBS[jobId];

    /*
     * IMPORTANT:
     *
     * The Careers page can show fallback vacancies.
     * Therefore we DO NOT reject the application just
     * because the job does not exist in another database
     * collection.
     */

    const jobTitle =
      requestedJobTitle ||
      fallbackJob?.title ||
      "Open Position";

    const department =
      getValue(
        body,
        "department"
      ) ||
      fallbackJob?.department ||
      "";

    const location =
      getValue(
        body,
        "location"
      ) ||
      fallbackJob?.location ||
      "";

    const employmentType =
      getValue(
        body,
        "employmentType",
        "employment_type"
      ) ||
      fallbackJob?.employmentType ||
      "";

    /* =====================================================
       PERSONAL INFORMATION
    ===================================================== */

    const fullName =
      getValue(
        body,
        "fullName",
        "name"
      );

    const email =
      cleanEmail(
        getValue(
          body,
          "email",
          "emailAddress"
        )
      );

    const phone =
      getValue(
        body,
        "phone",
        "mobile",
        "mobileNumber"
      );

    const dateOfBirth =
      getValue(
        body,
        "dateOfBirth",
        "dob"
      );

    const gender =
      getValue(
        body,
        "gender"
      );

    /* =====================================================
       ADDRESS
    ===================================================== */

    const address =
      getValue(
        body,
        "address"
      );

    const city =
      getValue(
        body,
        "city"
      );

    const state =
      getValue(
        body,
        "state"
      );

    const pincode =
      getValue(
        body,
        "pincode",
        "pinCode",
        "postalCode"
      );

    /* =====================================================
       EDUCATION
    ===================================================== */

    const highestQualification =
      getValue(
        body,
        "highestQualification",
        "qualification"
      );

    const university =
      getValue(
        body,
        "university",
        "college",
        "institution"
      );

    const passingYear =
      getValue(
        body,
        "passingYear",
        "yearOfPassing"
      );

    const percentage =
      getValue(
        body,
        "percentage",
        "marks",
        "score"
      );

    /* =====================================================
       EXPERIENCE
    ===================================================== */

    const experience =
      getValue(
        body,
        "experience",
        "experienceLevel"
      );

    const currentOrganization =
      getValue(
        body,
        "currentOrganization",
        "organization",
        "currentCompany"
      );

    const currentDesignation =
      getValue(
        body,
        "currentDesignation",
        "designation"
      );

    const totalExperience =
      getValue(
        body,
        "totalExperience",
        "yearsOfExperience"
      );

    /* =====================================================
       DOCUMENTS
    ===================================================== */

    const resume =
      getValue(
        body,
        "resume",
        "resumeUrl",
        "resumeFile"
      );

    const coverLetter =
      getValue(
        body,
        "coverLetter",
        "cover_letter"
      );

    /* =====================================================
       DECLARATION
    ===================================================== */

    const declarationRaw =
      body.declarationAccepted ??
      body.declaration ??
      body.agree;

    const declarationAccepted =
      declarationRaw === true ||
      declarationRaw === "true" ||
      declarationRaw === "1" ||
      declarationRaw === "on" ||
      declarationRaw === "yes";

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Job information is required.",
        },
        { status: 400 }
      );
    }

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full name is required.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email address is required.",
        },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number is required.",
        },
        { status: 400 }
      );
    }

    if (!declarationAccepted) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please accept the declaration before submitting your application.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       CONNECT DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       DUPLICATE APPLICATION CHECK
    ===================================================== */

    const existingApplication =
      await CareerApplication.findOne({
        jobId,
        email,
      })
        .select(
          "applicationId jobId jobTitle status createdAt"
        )
        .lean();

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          duplicate: true,
          message:
            "You have already applied for this position with this email address.",
          applicationId:
            existingApplication.applicationId,
        },
        { status: 409 }
      );
    }

    /* =====================================================
       APPLICATION ID
    ===================================================== */

    const applicationId =
      await generateApplicationId();

    /* =====================================================
       CREATE APPLICATION
    ===================================================== */

    const application =
      await CareerApplication.create({
        applicationId,

        jobId,
        jobTitle,

        department,
        location,
        employmentType,

        fullName,
        email,
        phone,
        dateOfBirth,
        gender,

        address,
        city,
        state,
        pincode,

        highestQualification,
        university,
        passingYear,
        percentage,

        experience,
        currentOrganization,
        currentDesignation,
        totalExperience,

        resume,
        coverLetter,

        declarationAccepted,

        status: "Submitted",
        stage: "Application Submitted",

        adminRemarks: "",

        approvedAt: null,
        rejectedAt: null,
      });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your job application has been submitted successfully.",

        applicationId:
          application.applicationId,

        job: {
          jobId,
          jobTitle,
          department,
          location,
          employmentType,
          experience:
            fallbackJob?.experience || "",
          lastDate:
            fallbackJob?.lastDate || "",
        },

        application: {
          id: String(
            application._id
          ),
          applicationId:
            application.applicationId,

          status:
            application.status,

          stage:
            application.stage,

          createdAt:
            application.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(
      "Career application error:",
      error
    );

    /* =====================================================
       MONGOOSE DUPLICATE KEY
    ===================================================== */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code ===
        11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An application with this information already exists.",
        },
        { status: 409 }
      );
    }

    /* =====================================================
       VALIDATION ERROR
    ===================================================== */

    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: string }).name ===
        "ValidationError"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please check the application details and try again.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SERVER ERROR
    ===================================================== */

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your application right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   METHOD HANDLING
========================================================= */

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message:
        "GET method is not supported for career applications.",
    },
    { status: 405 }
  );
}