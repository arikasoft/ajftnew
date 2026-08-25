import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      outboundIp: data.ip,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to detect outbound IP",
      },
      { status: 500 }
    );
  }
}
