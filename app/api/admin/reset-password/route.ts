import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body?.email || "")
      .trim()
      .toLowerCase();

    const newPassword = String(body?.newPassword || "");

    if (!email || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and new password are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin account not found.",
        },
        { status: 404 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    admin.passwordHash = passwordHash;
    admin.active = true;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Admin password reset successfully.",
    });
  } catch (error) {
    console.error("Admin password reset error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to reset password.",
      },
      { status: 500 }
    );
  }
}