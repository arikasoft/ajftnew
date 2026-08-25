import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import VisitorSession from "@/models/VisitorSession";
import PageView from "@/models/PageView";
import VisitorEvent from "@/models/VisitorEvent";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      type,
      visitorId,
      sessionId,

      path,
      title,
      referrer,

      source,
      medium,

      deviceType,
      browser,
      operatingSystem,

      screenWidth,
      screenHeight,

      eventName,
      eventCategory,
      eventData,
    } = body;

    /* ==========================================
       BASIC VALIDATION
    ========================================== */

    if (!visitorId || !sessionId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "visitorId and sessionId are required",
        },
        {
          status: 400,
        }
      );
    }

    /* ==========================================
       PAGE VIEW
    ========================================== */

    if (type === "pageview") {
      const now = new Date();

      let session =
        await VisitorSession.findOne({
          sessionId,
        });

      /* ------------------------------------------
         NEW SESSION
      ------------------------------------------ */

      if (!session) {
        session =
          await VisitorSession.create({
            visitorId,
            sessionId,

            landingPage:
              path || "/",

            exitPage:
              path || "/",

            // Do not send null to a schema
            // that expects string | undefined.
            referrer:
              typeof referrer === "string" &&
              referrer.trim()
                ? referrer.trim()
                : undefined,

            source:
              typeof source === "string" &&
              source.trim()
                ? source.trim()
                : "direct",

            medium:
              typeof medium === "string" &&
              medium.trim()
                ? medium.trim()
                : "none",

            deviceType:
              typeof deviceType === "string" &&
              deviceType.trim()
                ? deviceType.trim()
                : "unknown",

            browser:
              typeof browser === "string" &&
              browser.trim()
                ? browser.trim()
                : "unknown",

            operatingSystem:
              typeof operatingSystem ===
                "string" &&
              operatingSystem.trim()
                ? operatingSystem.trim()
                : "unknown",

            screenWidth:
              typeof screenWidth === "number"
                ? screenWidth
                : undefined,

            screenHeight:
              typeof screenHeight === "number"
                ? screenHeight
                : undefined,

            pageCount: 1,

            startedAt: now,

            lastSeenAt: now,
          });
      }

      /* ------------------------------------------
         EXISTING SESSION
      ------------------------------------------ */

      else {
        session.pageCount =
          (session.pageCount || 0) + 1;

        session.lastSeenAt = now;

        session.exitPage =
          path || session.exitPage;

        await session.save();
      }

      /* ------------------------------------------
         SAVE PAGE VIEW
      ------------------------------------------ */

      await PageView.create({
        visitorId,
        sessionId,

        path:
          typeof path === "string" &&
          path.trim()
            ? path.trim()
            : "/",

        title:
          typeof title === "string" &&
          title.trim()
            ? title.trim()
            : undefined,

        referrer:
          typeof referrer === "string" &&
          referrer.trim()
            ? referrer.trim()
            : undefined,

        viewedAt: now,
      });

      return NextResponse.json({
        success: true,
        type: "pageview",
      });
    }

    /* ==========================================
       EVENT
    ========================================== */

    if (type === "event") {
      if (!eventName) {
        return NextResponse.json(
          {
            success: false,
            message:
              "eventName is required",
          },
          {
            status: 400,
          }
        );
      }

      const event =
        await VisitorEvent.create({
          visitorId,
          sessionId,

          eventName,

          eventCategory:
            typeof eventCategory === "string" &&
            eventCategory.trim()
              ? eventCategory.trim()
              : "general",

          page:
            typeof path === "string" &&
            path.trim()
              ? path.trim()
              : undefined,

          eventData:
            eventData &&
            typeof eventData === "object"
              ? eventData
              : {},

          createdAt: new Date(),
        });

      await VisitorSession.findOneAndUpdate(
        {
          sessionId,
        },
        {
          $set: {
            lastSeenAt: new Date(),
          },
        }
      );

      return NextResponse.json({
        success: true,
        type: "event",
        eventId: event._id,
      });
    }

    /* ==========================================
       INVALID TYPE
    ========================================== */

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid analytics request type",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(
      "Analytics API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Analytics server error",
      },
      {
        status: 500,
      }
    );
  }
}