import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import connectDB from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";

/* =========================================================
   HELPERS
========================================================= */

function clean(value: unknown): string {
  return String(value ?? "").trim();
}

function generateApplicationId(): string {
  const year = new Date().getFullYear();

  const random = Math.floor(
    10000 + Math.random() * 90000
  );

  return `AJFT-${year}-${random}`;
}

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
   EMAIL HTML
========================================================= */

function candidateEmailHtml(data: {
  applicationId: string;
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AJFT Career Application</title>
</head>

<body style="margin:0;padding:0;background:#f3f7f9;font-family:Arial,Helvetica,sans-serif;color:#243b53;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7f9;padding:35px 15px;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 15px 50px rgba(16,42,67,.10);">

<tr>
<td style="background:#071d2b;padding:30px 35px;color:#ffffff;">

<div style="font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#f2c94c;">
ANAND JIVAN FOUNDATION TRUST
</div>

<div style="font-size:25px;font-weight:bold;margin-top:10px;">
Career Application Received
</div>

</td>
</tr>

<tr>
<td style="padding:35px;">

<p style="font-size:15px;">
Dear <strong>${data.fullName}</strong>,
</p>

<p style="font-size:14px;line-height:1.8;color:#607585;">
Thank you for applying for a career opportunity with Anand Jivan Foundation Trust.
Your application has been successfully received.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;background:#f5f9fa;border-radius:12px;">

<tr>
<td style="padding:15px;font-size:12px;color:#718394;">
APPLICATION ID
</td>

<td style="padding:15px;font-size:16px;font-weight:bold;color:#176b87;text-align:right;">
${data.applicationId}
</td>
</tr>

<tr>
<td style="padding:12px 15px;font-size:12px;color:#718394;">
POSITION
</td>

<td style="padding:12px 15px;font-size:13px;font-weight:bold;text-align:right;">
${data.jobTitle}
</td>
</tr>

<tr>
<td style="padding:12px 15px;font-size:12px;color:#718394;">
DEPARTMENT
</td>

<td style="padding:12px 15px;font-size:13px;text-align:right;">
${data.department || "—"}
</td>
</tr>

</table>

<div style="background:#fff9e8;border-left:4px solid #f2c94c;padding:15px;border-radius:8px;font-size:12px;line-height:1.7;color:#687985;">
Please keep your Application ID safely. You may need it to check your application status and for future communication.
</div>

<p style="font-size:13px;line-height:1.7;color:#607585;margin-top:25px;">
Our recruitment team will review your application. If your profile is shortlisted, you will be contacted through the details provided in your application.
</p>

<p style="margin-top:30px;font-size:13px;">
Regards,<br/>
<strong>Recruitment Team</strong><br/>
Anand Jivan Foundation Trust
</p>

</td>
</tr>

<tr>
<td style="background:#071d2b;padding:20px 35px;text-align:center;color:#ffffff;">

<div style="font-size:11px;color:rgba(255,255,255,.55);">
Empowering Lives • Building Better Communities
</div>

<div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:7px;">
This is an automated email. Please do not reply directly to this message.
</div>

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
   ADMIN EMAIL
========================================================= */

function adminEmailHtml(data: {
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Career Application</title>
</head>

<body style="margin:0;padding:30px;background:#f3f7f9;font-family:Arial,Helvetica,sans-serif;color:#243b53;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 15px 50px rgba(16,42,67,.10);">

<tr>
<td style="background:#102a43;padding:28px 32px;color:#ffffff;">

<div style="font-size:10px;font-weight:bold;letter-spacing:3px;color:#f2c94c;">
AJFT ADMINISTRATION
</div>

<div style="font-size:24px;font-weight:bold;margin-top:8px;">
New Career Application
</div>

</td>
</tr>

<tr>
<td style="padding:30px;">

<div style="background:#eef6f8;padding:18px;border-radius:12px;margin-bottom:22px;">

<div style="font-size:10px;color:#718394;font-weight:bold;">
APPLICATION ID
</div>

<div style="font-size:22px;color:#176b87;font-weight:bold;margin-top:6px;">
${data.applicationId}
</div>

</div>

<table width="100%" cellpadding="8" cellspacing="0">

<tr>
<td width="35%" style="font-size:12px;color:#8997a2;">
Candidate
</td>

<td style="font-size:13px;font-weight:bold;">
${data.fullName}
</td>
</tr>

<tr>
<td style="font-size:12px;color:#8997a2;">
Email
</td>

<td style="font-size:13px;">
${data.email}
</td>
</tr>

<tr>
<td style="font-size:12px;color:#8997a2;">
Phone
</td>

<td style="font-size:13px;">
${data.phone}
</td>
</tr>

<tr>
<td style="font-size:12px;color:#8997a2;">
Position
</td>

<td style="font-size:13px;font-weight:bold;">
${data.jobTitle}
</td>
</tr>

<tr>
<td style="font-size:12px;color:#8997a2;">
Department
</td>

<td style="font-size:13px;">
${data.department || "—"}
</td>
</tr>

<tr>
<td style="font-size:12px;color:#8997a2;">
Location
</td>

<td style="font-size:13px;">
${data.location || "—"}
</td>
</tr>

<tr>
<td style="font-size:12px;color:#8997a2;">
Employment Type
</td>

<td style="font-size:13px;">
${data.employmentType || "—"}
</td>
</tr>

</table>

<div style="margin-top:25px;padding:15px;background:#fff9e8;border-radius:10px;font-size:12px;color:#687985;">
A new career application has been submitted through the AJFT website.
Please review it from the Admin Recruitment Portal.
</div>

</td>
</tr>

<tr>
<td style="background:#071d2b;padding:18px;text-align:center;color:#ffffff;font-size:10px;">
Anand Jivan Foundation Trust • Recruitment System
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
   POST
========================================================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    /* =====================================================
       INPUT
    ===================================================== */

    const fullName =
      clean(body?.fullName);

    const email =
      clean(body?.email).toLowerCase();

    const phone =
      clean(body?.phone);

    const jobId =
      clean(body?.jobId);

    const jobTitle =
      clean(body?.jobTitle);

    const department =
      clean(body?.department);

    const location =
      clean(body?.location);

    const employmentType =
      clean(body?.employmentType);

    const dateOfBirth =
      clean(body?.dateOfBirth);

    const gender =
      clean(body?.gender);

    const address =
      clean(body?.address);

    const city =
      clean(body?.city);

    const state =
      clean(body?.state);

    const pincode =
      clean(body?.pincode);

    const highestQualification =
      clean(
        body?.highestQualification
      );

    const university =
      clean(body?.university);

    const passingYear =
      clean(body?.passingYear);

    const percentage =
      clean(body?.percentage);

    const experience =
      clean(body?.experience);

    const currentOrganization =
      clean(
        body?.currentOrganization
      );

    const currentDesignation =
      clean(
        body?.currentDesignation
      );

    const totalExperience =
      clean(body?.totalExperience);

    const resume =
      clean(body?.resume);

    const coverLetter =
      clean(body?.coverLetter);

    const declarationAccepted =
      Boolean(
        body?.declarationAccepted
      );

    /* =====================================================
       VALIDATION
    ===================================================== */

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

    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      );

    if (!emailValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
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

    if (!jobTitle) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Job title is required.",
        },
        { status: 400 }
      );
    }

    if (!declarationAccepted) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please accept the declaration.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       DUPLICATE CHECK
    ===================================================== */

    const existing =
      await CareerApplication.findOne({
        email,
        jobId,
      }).lean();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have already applied for this position.",
          applicationId:
            existing.applicationId,
        },
        { status: 409 }
      );
    }

    /* =====================================================
       APPLICATION ID
    ===================================================== */

    let applicationId = "";
    let exists = true;

    while (exists) {
      applicationId =
        generateApplicationId();

      const found =
        await CareerApplication.exists({
          applicationId,
        });

      exists = Boolean(found);
    }

    /* =====================================================
       SAVE APPLICATION
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

        stage:
          "Application Submitted",

        adminRemarks: "",
      });

    /* =====================================================
       EMAIL
    ===================================================== */

    let emailStatus:
      | "sent"
      | "failed" =
      "sent";

    try {
      const transporter =
        createTransporter();

      const from =
        process.env.SMTP_FROM ||
        process.env.SMTP_USER;

      const adminEmail =
        process.env.ADMIN_EMAIL ||
        process.env.SMTP_USER;

      /* ===============================================
         CANDIDATE EMAIL
      =============================================== */

      await transporter.sendMail({
        from,

        to: email,

        subject:
          `Application Received — ${applicationId}`,

        html:
          candidateEmailHtml({
            applicationId,
            fullName,
            email,
            jobTitle,
            department,
          }),

        text: `
Dear ${fullName},

Thank you for applying to Anand Jivan Foundation Trust.

Application ID: ${applicationId}
Position: ${jobTitle}
Department: ${department || "—"}

Your application has been successfully received.

Please keep your Application ID safely.

Regards,
Recruitment Team
Anand Jivan Foundation Trust
        `.trim(),
      });

      /* ===============================================
         ADMIN EMAIL
      =============================================== */

      await transporter.sendMail({
        from,

        to: adminEmail,

        subject:
          `New Career Application — ${applicationId}`,

        html:
          adminEmailHtml({
            applicationId,
            fullName,
            email,
            phone,
            jobTitle,
            department,
            location,
            employmentType,
          }),

        text: `
New Career Application

Application ID: ${applicationId}
Candidate: ${fullName}
Email: ${email}
Phone: ${phone}
Position: ${jobTitle}
Department: ${department || "—"}
Location: ${location || "—"}
Employment Type: ${employmentType || "—"}
        `.trim(),
      });

      console.log(
        "CAREER EMAILS SENT:",
        applicationId
      );
    } catch (mailError) {
      emailStatus = "failed";

      console.error(
        "CAREER EMAIL ERROR:",
        mailError
      );
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          emailStatus === "sent"
            ? "Application submitted successfully. Confirmation email sent."
            : "Application submitted successfully. Email delivery is temporarily unavailable.",

        applicationId,

        emailSent:
          emailStatus === "sent",

        application: {
          applicationId,

          fullName:
            application.fullName,

          email:
            application.email,

          jobTitle:
            application.jobTitle,

          status:
            application.status,

          stage:
            application.stage,

          submittedAt:
            application.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CAREER APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit application. Please try again.",
      },
      { status: 500 }
    );
  }
}