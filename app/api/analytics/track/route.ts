import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Analytics from "@/models/Analytics";

export const dynamic = "force-dynamic";

type AnalyticsPayload = {
  page?: string;
  path?: string;
  event?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  try {
    const enabled =
      process.env.ANALYTICS_ENABLED !== "false";

    if (!enabled) {
      return NextResponse.json({
        success: true,
        message: "Analytics disabled.",
      });
    }

    let body: AnalyticsPayload = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const page =
      typeof body.page === "string"
        ? body.page.trim()
        : "";

    const path =
      typeof body.path === "string"
        ? body.path.trim()
        : page;

    const event =
      typeof body.event === "string"
        ? body.event.trim()
        : "page_view";

    const referrer =
      typeof body.referrer === "string"
        ? body.referrer.trim()
        : "";

    const userAgent =
      request.headers.get("user-agent") || "";

    const forwarded =
      request.headers.get("x-forwarded-for");

    const ip =
      forwarded?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";

    await connectDB();

    await Analytics.create({
      page,
      path,
      event,
      referrer,
      userAgent,
      ip,
      metadata:
        body.metadata &&
        typeof body.metadata === "object"
          ? body.metadata
          : {},
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Analytics tracking error:",
      error
    );

    // Analytics failure should not break website usage
    return NextResponse.json({
      success: true,
      tracked: false,
    });
  }
}