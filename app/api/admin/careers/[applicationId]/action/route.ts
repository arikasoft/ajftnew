import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { requireAdmin } from "@/lib/admin-auth";

const STAGES = [
  {
    number: 1,
    key: "submitted",
    stage: "Application Submitted",
    status: "Submitted",
    subject: "Application Received",
  },
  {
    number: 2,
    key: "review",
    stage: "Under Review",
    status: "Under Review",
    subject: "Application Under Review",
  },
  {
    number: 3,
    key: "shortlisted",
    stage: "Shortlisted",
    status: "Shortlisted",
    subject: "Application Shortlisted",
  },
  {
    number: 4,
    key: "interview",
    stage: "Interview",
    status: "Interview",
    subject: "Interview Stage",
  },
  {
    number: 5,
    key: "selected",
    stage: "Selected",
    status: "Selected",
    subject: "Application Selected",
  },
  {
    number: 6,
    key: "verification",
    stage: "Document Verification",
    status: "Verification",
    subject: "Document Verification",
  },
  {
    number: 7,
    key: "appointment",
    stage: "Appointment",
    status: "Appointment",
    subject: "Appointment Stage",
  },
];

function getStage(stageNumber: number) {
  return STAGES.find(
    (item) => item.number === stageNumber
  );
}

function getStageNumber(
  stage: string
): number {
  const value = String(stage || "")
    .trim()
    .toLowerCase();

  if (
    value.includes("appointment")
  ) {
    return 7;
  }

  if (
    value.includes("verification")
  ) {
    return 6;
  }

  if (
    value.includes("selected")
  ) {
    return 5;
  }

  if (
    value.includes("interview")
  ) {
    return 4;
  }

  if (
    value.includes("shortlist")
  ) {
    return 3;
  }

  if (
    value.includes("review")
  ) {
    return 2;
  }

  return 1;
}

async function sendStageEmail(
  application: any,
  stage: any
) {
  /*
   * Email sending is optional.
   *
   * If your project already has an email
   * service, this function can be connected
   * to it later.
   *
   * We deliberately do not fail the stage
   * update if email configuration is absent.
   */

  try {
    const email =
      String(
        application?.email || ""
      ).trim();

    if (!email) {
      return {
        sent: false,
        reason: "Candidate email not available.",
      };
    }

    console.log(
      "CAREER STAGE EMAIL",
      {
        to: email,
        applicationId:
          application.applicationId,
        candidate:
          application.fullName,
        stage:
          stage.stage,
      }
    );

    return {
      sent: false,
      reason:
        "Email provider not configured.",
    };
  } catch (error) {
    console.error(
      "CAREER EMAIL ERROR:",
      error
    );

    return {
      sent: false,
      reason: "Email sending failed.",
    };
  }
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      applicationId: string;
    }>;
  }
) {
  try {
    const auth =
      await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const {
      applicationId,
    } = await context.params;

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    let body: any = {};

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid JSON request.",
        },
        {
          status: 400,
        }
      );
    }

    const action =
      String(
        body?.action || ""
      )
        .trim()
        .toLowerCase();

    const stageNumber = Number(
      body?.stageNumber
    );

    const remarks =
      String(
        body?.remarks || ""
      ).trim();

    /*
     * ======================================
     * SUPPORTED ACTIONS
     * ======================================
     */

    const validActions = [
      "set_stage",
      "update_stage",
      "stage",
      "approve",
      "reject",
    ];

    if (
      !validActions.includes(
        action
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid career action.",
          allowedActions:
            validActions,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const application =
      await CareerApplication.findOne({
        applicationId,
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ======================================
     * REJECT
     * ======================================
     */

    if (
      action === "reject"
    ) {
      application.status =
        "Rejected";

      application.adminRemarks =
        remarks;

      application.rejectedAt =
        new Date();

      await application.save();

      return NextResponse.json({
        success: true,
        message:
          "Application rejected successfully.",
        application: {
          applicationId:
            application.applicationId,
          status:
            application.status,
          stage:
            application.stage,
        },
      });
    }

    /*
     * ======================================
     * APPROVE
     *
     * Approve = Stage 2
     * ======================================
     */

    let finalStageNumber =
      stageNumber;

    if (
      action === "approve"
    ) {
      finalStageNumber =
        2;
    }

    /*
     * ======================================
     * NORMALIZE STAGE ACTION
     * ======================================
     */

    if (
      action === "stage" ||
      action === "set_stage" ||
      action === "update_stage" ||
      action === "approve"
    ) {
      if (
        !Number.isInteger(
          finalStageNumber
        ) ||
        finalStageNumber < 1 ||
        finalStageNumber > 7
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Stage must be a number between 1 and 7.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const selectedStage =
      getStage(
        finalStageNumber
      );

    if (!selectedStage) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid recruitment stage.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ======================================
     * UPDATE APPLICATION
     * ======================================
     */

    application.stage =
      selectedStage.stage;

    application.status =
      selectedStage.status;

    if (remarks) {
      application.adminRemarks =
        remarks;
    }

    /*
     * Stage specific timestamps
     */

    if (
      finalStageNumber >= 2 &&
      !application.approvedAt
    ) {
      application.approvedAt =
        new Date();
    }

    if (
      finalStageNumber === 5 &&
      !application.selectedAt
    ) {
      application.selectedAt =
        new Date();
    }

    if (
      finalStageNumber === 7 &&
      !application.joinedAt
    ) {
      /*
       * Do not mark joined automatically
       * unless stage 7 is selected.
       */
      application.joinedAt =
        application.joinedAt ||
        null;
    }

    await application.save();

    /*
     * ======================================
     * EMAIL
     * ======================================
     */

    const emailResult =
      await sendStageEmail(
        application,
        selectedStage
      );

    /*
     * ======================================
     * RESPONSE
     * ======================================
     */

    return NextResponse.json({
      success: true,

      message:
        `Recruitment stage updated to ${selectedStage.stage}.`,

      email: emailResult,

      application: {
        id:
          String(
            application._id
          ),

        applicationId:
          application.applicationId,

        fullName:
          application.fullName,

        email:
          application.email,

        phone:
          application.phone,

        stage:
          application.stage,

        status:
          application.status,

        stageNumber:
          finalStageNumber,

        adminRemarks:
          application.adminRemarks,

        updatedAt:
          application.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      "CAREER ACTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update recruitment stage.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
 * ==========================================
 * GET CURRENT STAGE
 * ==========================================
 */

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      applicationId: string;
    }>;
  }
) {
  try {
    const auth =
      await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const {
      applicationId,
    } = await context.params;

    await connectDB();

    const application =
      await CareerApplication.findOne({
        applicationId,
      }).lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        {
          status: 404,
        }
      );
    }

    const stageNumber =
      getStageNumber(
        application.stage
      );

    return NextResponse.json({
      success: true,

      application: {
        applicationId:
          application.applicationId,

        fullName:
          application.fullName,

        email:
          application.email,

        phone:
          application.phone,

        stage:
          application.stage,

        status:
          application.status,

        stageNumber,

        adminRemarks:
          application.adminRemarks,
      },
    });
  } catch (error) {
    console.error(
      "CAREER ACTION GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load career application.",
      },
      {
        status: 500,
      }
    );
  }
}