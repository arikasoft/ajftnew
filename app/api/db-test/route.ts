import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    const mongoose = await connectDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    console.error("DB TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "MongoDB connection failed",
      },
      { status: 500 }
    );
  }
}