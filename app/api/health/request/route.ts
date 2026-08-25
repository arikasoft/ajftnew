import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HealthHelpRequest from "@/models/HealthHelpRequest";

function generateRequestId() {
  const year = new Date().getFullYear();

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `AJFT-HL-${year}-${random}`;
}

export async function POST(request: Request) {
  try {
    console.log("================================");
    console.log("HEALTH REQUEST API");
    console.log("================================");

    // Connect MongoDB
    await connectDB();

    console.log("MongoDB connected");

    // Read request body
    const body = await request.json();

    console.log("BODY:", body);

    const {
      name,
      phone,
      age,
      gender,
      location,
      helpType,
      urgency,
      description,
    } = body;

    // ==========================================
    // VALIDATION
    // ==========================================

    const missingFields: string[] = [];

    if (!name || !String(name).trim()) {
      missingFields.push("Full Name");
    }

    if (!phone || !String(phone).trim()) {
      missingFields.push("Mobile Number");
    }

    if (!location || !String(location).trim()) {
      missingFields.push("Location");
    }

    if (!helpType || !String(helpType).trim()) {
      missingFields.push("Help Type");
    }

    if (!description || !String(description).trim()) {
      missingFields.push("Description");
    }

    // ==========================================
    // RETURN VALIDATION ERROR
    // ==========================================

    if (missingFields.length > 0) {
      console.log(
        "MISSING FIELDS:",
        missingFields
      );

      return NextResponse.json(
        {
          success: false,
          message: `Please fill: ${missingFields.join(
            ", "
          )}`,
          missingFields,
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // GENERATE UNIQUE REQUEST ID
    // ==========================================

    let requestId = generateRequestId();

    let existing =
      await HealthHelpRequest.findOne({
        requestId,
      });

    while (existing) {
      requestId = generateRequestId();

      existing =
        await HealthHelpRequest.findOne({
          requestId,
        });
    }

    // ==========================================
    // CREATE HEALTH REQUEST
    // ==========================================

    const newRequest =
      await HealthHelpRequest.create({
        requestId,

        name: String(name).trim(),

        phone: String(phone).trim(),

        age:
          age !== undefined &&
          age !== null &&
          age !== ""
            ? Number(age)
            : null,

        gender:
          gender
            ? String(gender).trim()
            : "",

        location:
          String(location).trim(),

        helpType:
          String(helpType).trim(),

        urgency:
          urgency
            ? String(urgency).trim()
            : "General",

        description:
          String(description).trim(),

        status: "pending",

        adminNote: "",
      });

    console.log(
      "REQUEST CREATED:",
      newRequest.requestId
    );

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return NextResponse.json(
      {
        success: true,

        requestId:
          newRequest.requestId,

        message:
          "Health help request submitted successfully.",
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    // ==========================================
    // ERROR
    // ==========================================

    console.error(
      "================================"
    );

    console.error(
      "HEALTH REQUEST API ERROR"
    );

    console.error(error);

    console.error(
      "================================"
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to submit health request.",
      },
      {
        status: 500,
      }
    );
  }
}