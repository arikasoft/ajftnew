import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";
import { requireAdmin } from "@/lib/admin-auth";

type Context = {
  params: Promise<{
    applicationId: string;
  }>;
};

const allowedActions = [
  "UNDER_REVIEW",
  "SHORTLIST",
  "INTERVIEW",
  "APPROVE",
  "REJECT",
] as const;

type CareerAction =
  (typeof allowedActions)[number];

/* =========================================================
   SMTP
========================================================= */

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(
    process.env.SMTP_PORT || 465
  );
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP configuration is missing."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

/* =========================================================
   STATUS
========================================================= */

function getStatus(
  action: CareerAction
) {
  switch (action) {
    case "UNDER_REVIEW":
      return {
        status: "Under Review",
        stage: "Application Under Review",
      };

    case "SHORTLIST":
      return {
        status: "Shortlisted",
        stage: "Candidate Shortlisted",
      };

    case "INTERVIEW":
      return {
        status: "Interview",
        stage: "Interview Stage",
      };

    case "APPROVE":
      return {
        status: "Approved",
        stage: "Application Approved",
      };

    case "REJECT":
      return {
        status: "Rejected",
        stage: "Application Rejected",
      };
  }
}

/* =========================================================
   EMAIL HTML
========================================================= */

function candidateEmail(
  application: any,
  action: CareerAction
) {
  const result =
    getStatus(action);

  const approved =
    action === "APPROVE";

  const rejected =
    action === "REJECT";

  const heading = approved
    ? "Congratulations! Your Application Has Been Approved"
    : rejected
      ? "Update Regarding Your Career Application"
      : `Application Status Updated — ${result.status}`;

  const message = approved
    ? `
      Congratulations! Your application for
      <strong>${application.jobTitle}</strong>
      has been approved by Anand Jivan Foundation Trust.
      Our recruitment team will contact you regarding
      the next steps.
    `
    : rejected
      ? `
      Thank you for your interest in working with
      Anand Jivan Foundation Trust. After reviewing
      your application, we are unable to proceed with
      your application at this stage.
    `
      : `
      Your career application for
      <strong>${application.jobTitle}</strong>
      has been updated.
    `;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<title>AJFT Career Application</title>
</head>

<body style="
margin:0;
background:#f3f7f9;
font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#f3f7f9;padding:35px 15px;">

<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0"
style="
max-width:620px;
background:#ffffff;
border-radius:18px;
overflow:hidden;
">

<tr>
<td style="
background:#071d2b;
padding:30px;
color:#ffffff;
">

<div style="
font-size:10px;
letter-spacing:3px;
color:#f2c94c;
font-weight:bold;
">
ANAND JIVAN FOUNDATION TRUST
</div>

<h1 style="
margin:10px 0 0;
font-size:23px;
line-height:1.35;
">
${heading}
</h1>

</td>
</tr>

<tr>
<td style="padding:32px;">

<p style="font-size:14px;">
Dear <strong>${application.fullName}</strong>,
</p>

<p style="
font-size:13px;
line-height:1.8;
color:#607585;
">
${message}
</p>

<table width="100%" cellpadding="12" cellspacing="0"
style="
margin-top:25px;
background:#f5f9fa;
border-radius:12px;
">

<tr>
<td style="
font-size:11px;
color:#8997a2;
">
APPLICATION ID
</td>

<td align="right"
style="
font-size:14px;
font-weight:bold;
color:#176b87;
">
${application.applicationId}
</td>
</tr>

<tr>
<td style="
font-size:11px;
color:#8997a2;
">
POSITION
</td>

<td align="right"
style="
font-size:13px;
font-weight:bold;
">
${application.jobTitle || "—"}
</td>
</tr>

<tr>
<td style="
font-size:11px;
color:#8997a2;
">
STATUS
</td>

<td align="right"
style="
font-size:13px;
font-weight:bold;
">
${result.status}
</td>
</tr>

<tr>
<td style="
font-size:11px;
color:#8997a2;
">
STAGE
</td>

<td align="right"
style="
font-size:13px;
">
${result.stage}
</td>
</tr>

</table>

<p style="
margin-top:25px;
font-size:12px;
line-height:1.7;
color:#718394;
">
Please keep your Application ID safely
for future communication.
</p>

<p style="
margin-top:25px;
font-size:13px;
">
Regards,<br>
<strong>Recruitment Team</strong><br>
Anand Jivan Foundation Trust
</p>

</td>
</tr>

<tr>
<td style="
background:#071d2b;
color:#ffffff;
text-align:center;
padding:18px;
font-size:10px;
">
Empowering Lives • Building Better Communities
</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
`;
}

/* =========================================================
   POST — ADMIN CAREER ACTION
========================================================= */

export async function POST(
  request: Request,
  context: Context
) {
  try {

    /* =====================================================
       ADMIN AUTHENTICATION
    ===================================================== */

    const auth =
      await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    const { applicationId } =
      await context.params;

    const normalizedApplicationId =
      String(applicationId || "")
        .trim()
        .toUpperCase();

    if (!normalizedApplicationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application ID is required.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       REQUEST
    ===================================================== */

    let body: any = {};

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid JSON request.",
        },
        { status: 400 }
      );
    }

    const action =
      String(body?.action || "")
        .trim()
        .toUpperCase() as CareerAction;

    const adminRemarks =
      String(
        body?.adminRemarks || ""
      ).trim();

    /* =====================================================
       ACTION VALIDATION
    ===================================================== */

    if (
      !allowedActions.includes(action)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid career action.",
          allowedActions,
        },
        { status: 400 }
      );
    }

    /* =====================================================
       FIND APPLICATION
    ===================================================== */

    const application =
      await CareerApplication.findOne({
        applicationId:
          normalizedApplicationId,
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Career application not found.",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       STATUS
    ===================================================== */

    const result =
      getStatus(action);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to determine application status.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       PREVIOUS STATUS
    ===================================================== */

    const previousStatus =
      application.status;

    /* =====================================================
       UPDATE
    ===================================================== */

    application.status =
      result.status;

    application.stage =
      result.stage;

    /*
     * Save remarks even when empty,
     * so admin can clear old remarks.
     */
    application.adminRemarks =
      adminRemarks;

    /* =====================================================
       APPROVED
    ===================================================== */

    if (action === "APPROVE") {
      application.approvedAt =
        new Date();
    }

    /* =====================================================
       REJECTED
    ===================================================== */

    if (action === "REJECT") {
      application.rejectedAt =
        new Date();
    }

    await application.save();

    /* =====================================================
       EMAIL
    ===================================================== */

    let emailSent = false;
    let emailError = "";

    try {

      const transporter =
        createTransporter();

      const from =
        process.env.SMTP_FROM ||
        process.env.SMTP_USER;

      const info =
        await transporter.sendMail({
          from,

          to: application.email,

          subject:
            `AJFT Career Application Update — ${application.applicationId}`,

          html: candidateEmail(
            application,
            action
          ),

          text: `
Dear ${application.fullName},

Your career application status has been updated.

Application ID: ${application.applicationId}
Position: ${application.jobTitle || "—"}
Previous Status: ${previousStatus || "Submitted"}
New Status: ${result.status}
Stage: ${result.stage}

Regards,
Recruitment Team
Anand Jivan Foundation Trust
          `.trim(),
        });

      emailSent = true;

      console.log(
        "CAREER STATUS EMAIL SENT:",
        {
          applicationId:
            application.applicationId,
          action,
          messageId:
            info.messageId,
          admin:
            auth.admin.email,
        }
      );

    } catch (mailError) {

      console.error(
        "CAREER STATUS EMAIL ERROR:",
        mailError
      );

      emailError =
        mailError instanceof Error
          ? mailError.message
          : "Email sending failed.";
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json({
      success: true,

      message:
        `Career application updated: ${result.status}`,

      applicationId:
        application.applicationId,

      previousStatus,

      status:
        application.status,

      stage:
        application.stage,

      emailSent,

      ...(emailError
        ? {
            emailError,
          }
        : {}),

      updatedBy:
        auth.admin.email,

      application,

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
          "Unable to update career application.",
      },
      { status: 500 }
    );
  }
}