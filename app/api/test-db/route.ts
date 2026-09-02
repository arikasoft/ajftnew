import { NextResponse } from "next/server";
import connectDB, { getMongoStatus } from "@/lib/mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI?.trim() || "";

  // Check URI without exposing password
  if (
    !uri.startsWith("mongodb://") &&
    !uri.startsWith("mongodb+srv://")
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid MongoDB URI in production",
        uriExists: Boolean(uri),
        uriPrefix: uri.substring(0, 25),
        uriLength: uri.length,
        environment: process.env.NODE_ENV,
      },
      { status: 500 }
    );
  }

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
      uriPrefix: uri.substring(0, 18),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error:
          error instanceof Error
            ? error.message
            : String(error),
        environment: process.env.NODE_ENV,
        uriPrefix: uri.substring(0, 25),
        uriLength: uri.length,
      },
      { status: 500 }
    );
  }
}
