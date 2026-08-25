import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const result = await client
      .db("admin")
      .command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB Atlas connected successfully",
      cluster: "AJFT",
      database: "ajft",
      ping: result.ok === 1,
    });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}