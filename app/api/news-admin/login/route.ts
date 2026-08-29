import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const adminEmail =
      process.env.NEWS_ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    const adminPassword =
      process.env.NEWS_ADMIN_PASSWORD;

    if (
      !adminEmail ||
      !adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "News admin credentials are not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login successful.",
      });

    response.cookies.set(
      "ajft_news_admin",
      "authenticated",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "NEWS ADMIN LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process login.",
      },
      {
        status: 500,
      }
    );
  }
}