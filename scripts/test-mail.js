require("dotenv").config({
  path: ".env.local",
});

const nodemailer = require("nodemailer");

async function testMail() {
  const host = process.env.SMTP_HOST;
  const port = Number(
    process.env.SMTP_PORT || 465
  );
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.SMTP_FROM || user;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP configuration missing in .env.local"
    );
  }

  console.log("==============================");
  console.log("AJFT SMTP TEST");
  console.log("==============================");
  console.log("HOST:", host);
  console.log("PORT:", port);
  console.log("USER:", user);
  console.log("==============================");

  const transporter =
    nodemailer.createTransport({
      host,
      port,
      secure: port === 465,

      auth: {
        user,
        pass,
      },
    });

  console.log("Checking SMTP connection...");

  await transporter.verify();

  console.log(
    "SMTP CONNECTION: SUCCESS"
  );

  console.log(
    "Sending test email..."
  );

  const result =
    await transporter.sendMail({
      from,
      to: user,
      subject:
        "AJFT SMTP Test Email",

      text:
        "This is a test email from Anand Jivan Foundation Trust.",

      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;">
          <h2 style="color:#102A43;">
            AJFT SMTP Test
          </h2>

          <p>
            This is a test email from
            <strong>
              Anand Jivan Foundation Trust
            </strong>.
          </p>

          <p style="color:#176B87;">
            SMTP email configuration is working successfully.
          </p>
        </div>
      `,
    });

  console.log(
    "MAIL SENT SUCCESSFULLY"
  );

  console.log(
    "MESSAGE ID:",
    result.messageId
  );

  console.log("==============================");
  console.log("TEST COMPLETE");
  console.log("==============================");
}

testMail().catch((error) => {
  console.error("==============================");
  console.error("SMTP TEST FAILED");
  console.error("==============================");
  console.error(error);
  process.exit(1);
});