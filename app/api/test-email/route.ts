
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Secret protection
    const secret = req.headers.get("x-test-secret");

    if (
      !process.env.SMTP_TEST_SECRET ||
      secret !== process.env.SMTP_TEST_SECRET
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { to } = await req.json();

    // Email validation
    if (
      typeof to !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)
    ) {
      return NextResponse.json(
        { success: false, message: "Valid recipient email required" },
        { status: 400 }
      );
    }

    // SMTP Configuration: Port 587 STARTTLS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    // Send test email
    const info = await transporter.sendMail({
      from: `"Anand Jivan Foundation Trust" <${process.env.SMTP_FROM}>`,
      to,
      subject: "AJFT SMTP Test Email",
      text: "SMTP is working successfully for Anand Jivan Foundation Trust.",
      html: `
        <div style="font-family:Arial,sans-serif;padding:25px">
          <h2 style="color:#176b45">
            Anand Jivan Foundation Trust
          </h2>

          <p>Dear User,</p>
          <p>This is a test email from AJFT website.</p>

          <p>
            <strong>SMTP Status: Working Successfully</strong>
          </p>

          <p>Our email notification system is connected successfully.</p>

          <hr />

          <p>
            Regards,<br />
            Anand Jivan Foundation Trust
          </p>

          <a href="https://ajftrust.org">
            www.ajftrust.org
          </a>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

  } catch (error: any) {
    console.error("AJFT SMTP TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email sending failed",
        error: error.message || "Unknown SMTP error",
      },
      { status: 500 }
    );
  }
}
