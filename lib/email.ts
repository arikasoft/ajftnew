import nodemailer from "nodemailer";

// ============================================================
// INTERNSHIP EMAIL TYPES
// ============================================================

type InternshipEmailData = {
  name: string;
  email: string;
  applicationId: string;
  pdfBuffer: Buffer;
};

// ============================================================
// DONATION EMAIL TYPES
// ============================================================

type DonationEmailData = {
  donorName: string;
  donorEmail: string;
  donationReference: string;
  receiptNo: string;
  amount: number;
  currency: string;
  paymentId: string;
  donationType: string;
  requires80G: boolean;
  receiptPdfBuffer?: Buffer;
  verifyUrl: string;
};

type AdminDonationEmailData = {
  donorName: string;
  donorEmail: string;
  mobile: string;
  donationReference: string;
  receiptNo: string;
  amount: number;
  currency: string;
  paymentId: string;
  donationType: string;
  requires80G: boolean;
};

// ============================================================
// SMTP TRANSPORTER
// ============================================================

const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE =
  process.env.SMTP_SECURE !== undefined
    ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
    : SMTP_PORT === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,


  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 15000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

// ============================================================
// COMMON HELPERS
// ============================================================

function validateSMTP() {
  if (!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST is not configured.");
  }

  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is not configured.");
  }

  if (!process.env.SMTP_PASSWORD) {
    throw new Error("SMTP_PASSWORD is not configured.");
  }
}

function getFromAddress() {
  return (
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    ""
  );
}

function escapeHtml(value: string): string {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (char) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };

      return entities[char];
    }
  );
}

function formatAmount(
  amount: number,
  currency: string
): string {
  const safeCurrency = /^[A-Z]{3}$/.test(
    String(currency || "").toUpperCase()
  )
    ? String(currency).toUpperCase()
    : "INR";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: safeCurrency,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

function assertSmtpAccepted(info: any, label: string) {
  const accepted = Array.isArray(info?.accepted) ? info.accepted : [];
  if (accepted.length === 0) {
    const rejected = Array.isArray(info?.rejected)
      ? info.rejected.join(", ")
      : "unknown recipient";
    throw new Error(`${label}: SMTP did not accept the recipient. Rejected: ${rejected}`);
  }
}

// ============================================================
// DONOR DONATION RECEIPT EMAIL
// ============================================================

export async function sendDonationReceiptEmail(
  data: DonationEmailData
) {
  validateSMTP();

  if (!data.donorEmail) {
    throw new Error("Donor email address is missing.");
  }

  const from = getFromAddress();

  const donorName = escapeHtml(data.donorName);
  const donationReference = escapeHtml(
    data.donationReference
  );
  const receiptNo = escapeHtml(data.receiptNo);
  const paymentId = escapeHtml(data.paymentId);
  const verifyUrl = escapeHtml(data.verifyUrl);
  const formattedAmount = formatAmount(
    data.amount,
    data.currency
  );

  const info = await transporter.sendMail({
    from: `"Anand Jivan Foundation Trust" <${from}>`,
    to: data.donorEmail,

    subject: `Donation Received Successfully - ${data.donationReference}`,

    text: `
Dear ${data.donorName},

Thank you for your generous contribution to Anand Jivan Foundation Trust.

Your donation payment has been successfully received.

Donation Reference: ${data.donationReference}
Receipt Number: ${data.receiptNo}
Donation Amount: ${formattedAmount}
Payment ID: ${data.paymentId}

${data.receiptPdfBuffer?.length ? "Your donation receipt is attached with this email." : "You can download your donation receipt using the verification link below."}

You can verify your receipt here:
${data.verifyUrl}

Thank you for supporting our charitable activities.

Regards,
Anand Jivan Foundation Trust
Darbhanga, Bihar, India
https://ajftrust.org
info@ajftrust.org
`,

    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;border:1px solid #ddd">
        <div style="background:#111;color:white;padding:25px;text-align:center">
          <h2 style="margin:0">ANAND JIVAN FOUNDATION TRUST</h2>
          <p style="margin:8px 0 0">Donation Confirmation</p>
        </div>

        <div style="padding:28px">
          <h2 style="color:#16834a">Thank You for Your Donation!</h2>

          <p>Dear <strong>${donorName}</strong>,</p>

          <p>
            We sincerely thank you for your generous contribution
            to Anand Jivan Foundation Trust. Your payment has been
            successfully received.
          </p>

          <div style="background:#f5f9ff;padding:20px;border:1px solid #dce7f5;margin:20px 0">
            <h3 style="margin-top:0">Donation Details</h3>

            <p><strong>Donation Reference:</strong> ${donationReference}</p>
            <p><strong>Receipt Number:</strong> ${receiptNo}</p>
            <p><strong>Donation Amount:</strong> ${escapeHtml(formattedAmount)}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p>
              <strong>Payment Status:</strong>
              <span style="color:green;font-weight:bold">SUCCESS</span>
            </p>
          </div>

          <p>
            ${data.receiptPdfBuffer?.length
              ? "Your donation receipt is attached to this email as a PDF."
              : "Your receipt is available to view and download using the verification link below."}
          </p>

          <p>
            <a href="${verifyUrl}"
              style="display:inline-block;background:#16834a;color:white;padding:12px 22px;text-decoration:none;border-radius:5px">
              Verify Donation Receipt
            </a>
          </p>

          <p>
            Thank you for helping us continue our charitable activities.
          </p>

          <hr/>

          <p style="font-size:13px;color:#666">
            Regards,<br/>
            <strong>Anand Jivan Foundation Trust</strong><br/>
            Darbhanga, Bihar, India<br/>
            <a href="https://ajftrust.org">ajftrust.org</a><br/>
            info@ajftrust.org
          </p>
        </div>
      </div>
    `,

    ...(data.receiptPdfBuffer?.length
      ? {
          attachments: [
            {
              filename: `AJFT-Donation-Receipt-${data.receiptNo}.pdf`,
              content: data.receiptPdfBuffer,
              contentType: "application/pdf",
            },
          ],
        }
      : {}),
  });

  assertSmtpAccepted(info, "Donor confirmation email");
  console.log("DONOR CONFIRMATION EMAIL ACCEPTED BY SMTP:", {
    messageId: info.messageId,
    response: info.response,
    accepted: info.accepted,
    rejected: info.rejected,
    pdfAttached: Boolean(data.receiptPdfBuffer?.length),
  });

  return info;
}

// ============================================================
// ADMIN DONATION NOTIFICATION EMAIL
// ============================================================

export async function sendAdminDonationNotification(
  data: AdminDonationEmailData
) {
  validateSMTP();

  const adminEmail =
    process.env.AJFT_ADMIN_EMAIL ||
    "info@ajftrust.org";

  const vendorEmails = String(process.env.AJFT_VENDOR_EMAIL || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const recipients = Array.from(new Set([adminEmail, ...vendorEmails]));
  const from = getFromAddress();

  const formattedAmount = formatAmount(
    data.amount,
    data.currency
  );

  const info = await transporter.sendMail({
    from: `"AJFT Donation System" <${from}>`,
    to: recipients,

    subject: `New Donation Received - ${data.receiptNo}`,

    text: `
Dear AJFT Admin,

A new donation has been successfully received.

Donor Name: ${data.donorName}
Donor Email: ${data.donorEmail}
Mobile: ${data.mobile}

Donation Reference: ${data.donationReference}
Receipt Number: ${data.receiptNo}
Amount: ${formattedAmount}
Payment ID: ${data.paymentId}
Donation Type: ${data.donationType}
80G Requested: ${data.requires80G ? "Yes" : "No"}

Payment Status: SUCCESS

Regards,
AJFT Donation System
`,

    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;border:1px solid #ddd">
        <div style="background:#111;color:white;padding:22px;text-align:center">
          <h2 style="margin:0">AJFT DONATION NOTIFICATION</h2>
        </div>

        <div style="padding:25px">
          <h3 style="color:#16834a">
            New Donation Received Successfully
          </h3>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Donor Name</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.donorName)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Donor Email</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.donorEmail)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Mobile</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.mobile)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Donation Reference</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.donationReference)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Receipt Number</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.receiptNo)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Amount</td>
              <td style="padding:10px;border:1px solid #ddd">
                <strong>${escapeHtml(formattedAmount)}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Payment ID</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.paymentId)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">Donation Type</td>
              <td style="padding:10px;border:1px solid #ddd">${escapeHtml(data.donationType)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd">80G Requested</td>
              <td style="padding:10px;border:1px solid #ddd">
                ${data.requires80G ? "Yes" : "No"}
              </td>
            </tr>
          </table>

          <p style="color:green;font-weight:bold">
            Payment Status: SUCCESS
          </p>

          <p style="font-size:13px;color:#666">
            This is an automated notification from
            Anand Jivan Foundation Trust donation system.
          </p>
        </div>
      </div>
    `,
  });

  assertSmtpAccepted(info, "AJFT admin/vendor notification");
  console.log("AJFT ADMIN/VENDOR EMAIL ACCEPTED BY SMTP:", {
    messageId: info.messageId,
    response: info.response,
    accepted: info.accepted,
    rejected: info.rejected,
    recipients,
  });

  return info;
}

// ============================================================
// INTERNSHIP APPLICATION EMAIL
// Existing functionality retained
// ============================================================

export async function sendInternshipApplicationEmail(
  data: InternshipEmailData
) {
  validateSMTP();

  console.log(
    "SMTP:",
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_SECURE
  );

  await transporter.verify();

  const from = getFromAddress();

  const info = await transporter.sendMail({
    from: `"Anand Jivan Foundation Trust" <${from}>`,

    to: data.email,

    subject: `AJFT Internship Application Received - ${data.applicationId}`,

    text: `
Dear ${data.name},

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
          <h2 style="margin:0">ANAND JIVAN FOUNDATION TRUST</h2>
          <p style="margin:6px 0 0">Internship Programme</p>
        </div>

        <div style="padding:28px">
          <h3>Application Received</h3>

          <p>Dear <strong>${escapeHtml(data.name)}</strong>,</p>

          <p>
            Thank you for applying for the Internship Programme
            of Anand Jivan Foundation Trust.
          </p>

          <div style="background:#fff7e8;border:1px solid #e4a23a;padding:16px;margin:20px 0">
            <strong>Application ID</strong><br/>
            <span style="font-size:20px;font-weight:bold;color:#c66b00">
              ${escapeHtml(data.applicationId)}
            </span>
          </div>

          <p>
            Your application form is attached to this email as a PDF.
          </p>

          <p>
            Please print the application form, paste your passport-size
            photograph, sign it and submit the physical application
            with the required documents at the AJFT office.
          </p>

          <p>
            Please keep your Application ID safe for future status tracking.
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
        filename: `AJFT-Internship-${data.applicationId}.pdf`,
        content: data.pdfBuffer,
        contentType: "application/pdf",
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
