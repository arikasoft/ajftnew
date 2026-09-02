import { NextResponse } from "next/server";
import connectDB, { getMongoStatus } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const status = getMongoStatus();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
      database: status.database,
      host: status.host,
      status: status.status,
      readyState: status.readyState,
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error: error instanceof Error ? error.message : String(error),
        environment: process.env.NODE_ENV,
      },
      { status: 500 }
    );
  }
}
