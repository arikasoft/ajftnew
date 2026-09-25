import { NextResponse } from "next/server";
import { ImapFlow } from "imapflow";

export async function POST(request: Request) {
  let client: ImapFlow | null = null;

  try {
    const body = await request.json();

    const email = String(body?.email || "")
      .trim()
      .toLowerCase();

    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    /*
     * Hostinger IMAP
     */
    client = new ImapFlow({
      host:
        process.env.WEBMAIL_IMAP_HOST ||
        "imap.hostinger.com",

      port: Number(
        process.env.WEBMAIL_IMAP_PORT || 993
      ),

      secure: true,

      auth: {
        user: email,
        pass: password,
      },

      logger: false,
    });

    /*
     * Verify mailbox credentials
     */
    await client.connect();

    await client.mailboxOpen("INBOX");

    await client.logout();

    client = null;

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      redirectTo: "/webmail.aspx/inbox",
    });

    /*
     * Store credentials only in an
     * encrypted/server-side session in
     * the production implementation.
     *
     * For now we only create a login
     * marker.
     */
    response.cookies.set(
      "arikasoft_webmail_session",
      "authenticated",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: body?.remember
          ? 60 * 60 * 24 * 30
          : 60 * 60 * 8,
      }
    );

    response.cookies.set(
      "arikasoft_webmail_user",
      email,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: body?.remember
          ? 60 * 60 * 24 * 30
          : 60 * 60 * 8,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Webmail login error:",
      error
    );

    if (client) {
      try {
        await client.logout();
      } catch {}
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid email address or password.",
      },
      { status: 401 }
    );
  }
}