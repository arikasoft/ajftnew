import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(
      body?.email || ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      body?.password || ""
    );

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and password are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findOne({
      email,
      active: true,
    }).lean();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const passwordValid =
      await bcrypt.compare(
        password,
        admin.passwordHash
      );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    /*
     * ADMIN SESSION
     */

    const session = {
      id: String(admin._id),
      email: admin.email,
      role: admin.role,
    };

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login successful.",

        /*
         * IMPORTANT:
         * Central admin dashboard
         */
        redirectTo: "/admin",
      });

    response.cookies.set(
      "ajft_admin_session",
      JSON.stringify(session),
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 8,
      }
    );

    return response;

  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to login.",
      },
      { status: 500 }
    );
  }
}