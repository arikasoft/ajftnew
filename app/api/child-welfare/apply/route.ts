import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import ChildWelfareApplication from "@/models/ChildWelfareApplication";

export const dynamic =
  "force-dynamic";

function generateApplicationId() {
  const year =
    new Date().getFullYear();

  const random =
    Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase();

  return `AJFT-CW-${year}-${random}`;
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const guardianName =
      String(
        body.guardianName || ""
      ).trim();

    const childName =
      String(
        body.childName || ""
      ).trim();

    const mobile =
      String(
        body.mobile || ""
      ).trim();

    const address =
      String(
        body.address || ""
      ).trim();

    const district =
      String(
        body.district || ""
      ).trim();

    const state =
      String(
        body.state || ""
      ).trim();

    const gender =
      String(
        body.gender || ""
      ).trim();

    const relation =
      String(
        body.relation || ""
      ).trim();

    if (
      !guardianName ||
      !childName ||
      !mobile ||
      !address ||
      !district ||
      !state ||
      !gender ||
      !relation
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      mobile.length < 10
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    let applicationId =
      generateApplicationId();

    let exists =
      await ChildWelfareApplication.findOne(
        {
          applicationId,
        }
      );

    while (exists) {
      applicationId =
        generateApplicationId();

      exists =
        await ChildWelfareApplication.findOne(
          {
            applicationId,
          }
        );
    }

    const application =
      await ChildWelfareApplication.create(
        {
          applicationId,

          guardianName,
          relation,
          mobile,

          email:
            String(
              body.email || ""
            )
              .trim()
              .toLowerCase(),

          childName,

          dateOfBirth:
            String(
              body.dateOfBirth || ""
            ),

          gender,

          schoolName:
            String(
              body.schoolName || ""
            ).trim(),

          educationLevel:
            String(
              body.educationLevel || ""
            ),

          address,

          village:
            String(
              body.village || ""
            ).trim(),

          district,
          state,

          pincode:
            String(
              body.pincode || ""
            ).trim(),

          supportRequired:
            Array.isArray(
              body.supportRequired
            )
              ? body.supportRequired
              : [],

          supportDescription:
            String(
              body.supportDescription ||
                ""
            ).trim(),

          familyIncome:
            String(
              body.familyIncome ||
                ""
            ),

          status:
            "submitted",
        }
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Child welfare application submitted successfully.",

        data: {
          applicationId:
            application.applicationId,

          guardianName:
            application.guardianName,

          childName:
            application.childName,

          status:
            application.status,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CHILD WELFARE APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit application. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}