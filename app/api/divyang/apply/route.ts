import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import DivyangApplication from "@/models/DivyangApplication";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* =========================================================
   HELPERS
========================================================= */

function cleanString(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (
    typeof value === "number" &&
    !Number.isNaN(value)
  ) {
    return String(value).trim();
  }

  return "";
}

function normalizeMobile(value: string): string {
  return value.replace(/\D/g, "");
}

function generateApplicationId(): string {
  const year = new Date().getFullYear();

  const timestamp = Date.now()
    .toString()
    .slice(-8);

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `AJFT-DIV-${year}-${timestamp}${random}`;
}

/* =========================================================
   UNIQUE APPLICATION ID
========================================================= */

async function createUniqueApplicationId(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const applicationId =
      generateApplicationId();

    const exists =
      await DivyangApplication.exists({
        applicationId,
      });

    if (!exists) {
      return applicationId;
    }
  }

  return `AJFT-DIV-${new Date().getFullYear()}-${Date.now()}`;
}

/* =========================================================
   POST - CREATE DIVYANG APPLICATION
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    /* =====================================================
       CONNECT DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       READ REQUEST
    ===================================================== */

    const body = await request.json();

    console.log(
      "DIVYANG APPLICATION REQUEST RECEIVED"
    );

    console.log(
      "DIVYANG REQUEST KEYS:",
      Object.keys(body)
    );

    /* =====================================================
       PERSONAL DETAILS
    ===================================================== */

    const fullName = cleanString(
      body.fullName
    );

    const fatherName = cleanString(
      body.fatherName ||
        body.guardianName ||
        body.parentName
    );

    /*
     * Supports both:
     *
     * dateOfBirth  ← Current standard
     * dob          ← Old frontend compatibility
     */

    const dateOfBirth = cleanString(
      body.dateOfBirth ||
        body.dob ||
        body.date_of_birth ||
        ""
    );

    const gender = cleanString(
      body.gender
    );

    /* =====================================================
       CONTACT DETAILS
    ===================================================== */

    const mobile = cleanString(
      body.mobile ||
        body.mobileNumber ||
        body.phone
    );

    const email = cleanString(
      body.email
    );

    /* =====================================================
       DISABILITY DETAILS
    ===================================================== */

    const disabilityType = cleanString(
      body.disabilityType
    );

    const disabilityPercentage =
      cleanString(
        body.disabilityPercentage
      );

    /* =====================================================
       ADDRESS DETAILS
    ===================================================== */

    const state = cleanString(
      body.state
    );

    const district = cleanString(
      body.district
    );

    const address = cleanString(
      body.address
    );

    const pincode = cleanString(
      body.pincode ||
        body.pinCode
    );

    /* =====================================================
       DEBUG DOB
    ===================================================== */

    console.log(
      "DIVYANG DATE OF BIRTH:",
      {
        dateOfBirth,
        receivedDateOfBirth:
          body.dateOfBirth,
        receivedDob:
          body.dob,
      }
    );

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter applicant full name.",
        },
        {
          status: 400,
        }
      );
    }

    if (!fatherName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter father or guardian name.",
        },
        {
          status: 400,
        }
      );
    }

    if (!dateOfBirth) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select date of birth.",

          debug:
            process.env.NODE_ENV ===
            "development"
              ? {
                  receivedKeys:
                    Object.keys(body),

                  dateOfBirth:
                    body.dateOfBirth ??
                    null,

                  dob:
                    body.dob ?? null,
                }
              : undefined,
        },
        {
          status: 400,
        }
      );
    }

    if (!gender) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select gender.",
        },
        {
          status: 400,
        }
      );
    }

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    const mobileDigits =
      normalizeMobile(mobile);

    if (mobileDigits.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid 10 digit mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    if (!disabilityType) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select disability type.",
        },
        {
          status: 400,
        }
      );
    }

    if (!disabilityPercentage) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter disability percentage.",
        },
        {
          status: 400,
        }
      );
    }

    if (!state) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select state.",
        },
        {
          status: 400,
        }
      );
    }

    if (!district) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter district.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CREATE UNIQUE APPLICATION ID
    ===================================================== */

    const applicationId =
      await createUniqueApplicationId();

    /* =====================================================
       CREATE APPLICATION
    ===================================================== */

    const application =
      await DivyangApplication.create({
        applicationId,

        fullName,

        fatherName,

        /*
         * IMPORTANT
         *
         * Your current Mongoose model uses:
         *
         * dateOfBirth
         *
         * NOT dob
         */

        dateOfBirth,

        gender,

        mobile: mobileDigits,

        email,

        disabilityType,

        disabilityPercentage,

        state,

        district,

        address,

        pincode,

        status: "pending",

        source: "website",
      });

    console.log(
      "DIVYANG APPLICATION CREATED:",
      application.applicationId
    );

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your Divyang application has been submitted successfully.",

        data: {
          applicationId:
            application.applicationId,

          fullName:
            application.fullName,

          dateOfBirth:
            application.dateOfBirth,

          status:
            application.status,

          createdAt:
            application.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "DIVYANG APPLICATION SUBMISSION ERROR:",
      error
    );

    let message =
      "Unable to submit application. Please try again.";

    /*
     * MONGOOSE VALIDATION ERROR
     */

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ValidationError"
    ) {
      const validationError =
        error as {
          errors?: Record<
            string,
            {
              message?: string;
            }
          >;
        };

      const errors =
        validationError.errors;

      if (errors) {
        const firstError =
          Object.values(errors)[0];

        if (firstError?.message) {
          message =
            firstError.message;
        }
      }
    } else if (
      error instanceof Error
    ) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,

        message,

        error:
          process.env.NODE_ENV ===
          "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   OPTIONAL GET
   API HEALTH CHECK
========================================================= */

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,

        message:
          "Divyang application API is working.",

        fields: {
          required: [
            "fullName",
            "fatherName",
            "dateOfBirth",
            "gender",
            "mobile",
            "disabilityType",
            "disabilityPercentage",
            "state",
            "district",
          ],
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Database connection failed.",
      },
      {
        status: 500,
      }
    );
  }
}