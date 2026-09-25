import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body?.name || "AJFT Admin").trim();
    const email = String(body?.email || "").trim().toLowerCase();
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

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await Admin.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          passwordHash,
          role: "superadmin",
          active: true,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Admin account created/updated successfully.",
      admin: {
        id: String(admin._id),
        name: admin.name,
        email: admin.email,
        role: admin.role,
        active: admin.active,
      },
    });
  } catch (error) {
    console.error("Admin setup error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create/update admin.",
      },
      { status: 500 }
    );
  }
}