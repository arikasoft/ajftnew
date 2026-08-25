import nodemailer from "nodemailer";

type InternshipEmailData = {
  name: string;
  email: string;
  applicationId: string;
  pdfBuffer: Buffer;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),

  secure:
    String(process.env.SMTP_SECURE).toLowerCase() ===
    "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendInternshipApplicationEmail(
  data: InternshipEmailData
) {
  if (!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST is not configured.");
  }

  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is not configured.");
  }

  if (!process.env.SMTP_PASSWORD) {
    throw new Error(
      "SMTP_PASSWORD is not configured."
    );
  }

  console.log(
    "SMTP:",
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_SECURE
  );

  await transporter.verify();

  const from =
    process.env.SMTP_FROM ||
    process.env.SMTP_USER;

  const info =
    await transporter.sendMail({
      from: `"Anand Jivan Foundation Trust" <${from}>`,

      to: data.email,

      subject:
        `AJFT Internship Application Received - ${data.applicationId}`,

      text:
`Dear ${data.name},

Thank you for applying for the Internship Programme of Anand Jivan Foundation Trust.

Your application has been successfully received.

Application ID: ${data.applicationId}

Please find your submitted Internship Application Form attached with this email.

You are required to:

1. Download and print the application form.
2. Paste your passport-size photograph.
3. Sign the application form.
4. Attach the required documents.
5. Submit the physical application at the AJFT office.

Please keep your Application ID safe for future status tracking.

Application Status:
SUBMITTED

Regards,

Anand Jivan Foundation Trust
Darbhanga, Bihar, India`,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;border:1px solid #ddd">

          <div style="background:#111;color:white;padding:22px;text-align:center">
            <h2 style="margin:0">
              ANAND JIVAN FOUNDATION TRUST
            </h2>
            <p style="margin:6px 0 0">
              Internship Programme
            </p>
          </div>

          <div style="padding:28px">

            <h3>
              Application Received
            </h3>

            <p>
              Dear <strong>${data.name}</strong>,
            </p>

            <p>
              Thank you for applying for the
              Internship Programme of Anand Jivan
              Foundation Trust.
            </p>

            <div style="
              background:#fff7e8;
              border:1px solid #e4a23a;
              padding:16px;
              margin:20px 0;
            ">
              <strong>Application ID</strong><br/>
              <span style="
                font-size:20px;
                font-weight:bold;
                color:#c66b00;
              ">
                ${data.applicationId}
              </span>
            </div>

            <p>
              Your application form is attached to
              this email as a PDF.
            </p>

            <p>
              Please print the application form,
              paste your passport-size photograph,
              sign it and submit the physical
              application with the required documents
              at the AJFT office.
            </p>

            <p>
              Please keep your Application ID safe
              for future status tracking.
            </p>

            <hr/>

            <p style="font-size:13px;color:#666">
              Regards,<br/>
              <strong>Anand Jivan Foundation Trust</strong><br/>
              Darbhanga, Bihar, India
            </p>

          </div>
        </div>
      `,

      attachments: [
        {
          filename:
            `AJFT-Internship-${data.applicationId}.pdf`,

          content: data.pdfBuffer,

          contentType:
            "application/pdf",
        },
      ],
    });

  console.log(
    "INTERNSHIP EMAIL SENT:",
    info.messageId
  );

  console.log(
    "EMAIL RESPONSE:",
    info.response
  );

  return info;
}