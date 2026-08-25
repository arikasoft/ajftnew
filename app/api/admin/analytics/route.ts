import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import VisitorSession from "@/models/VisitorSession";
import PageView from "@/models/PageView";
import VisitorEvent from "@/models/VisitorEvent";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(
      startOfYesterday.getDate() - 1
    );

    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date(now);
    last30Days.setDate(last30Days.getDate() - 30);

    /* ==========================================
       TODAY
    ========================================== */

    const todaySessions =
      await VisitorSession.countDocuments({
        startedAt: {
          $gte: startOfToday,
        },
      });

    const todayPageViews =
      await PageView.countDocuments({
        viewedAt: {
          $gte: startOfToday,
        },
      });

    const todayEvents =
      await VisitorEvent.countDocuments({
        createdAt: {
          $gte: startOfToday,
        },
      });

    const todayUniqueVisitors =
      await VisitorSession.distinct("visitorId", {
        startedAt: {
          $gte: startOfToday,
        },
      });

    /* ==========================================
       YESTERDAY
    ========================================== */

    const yesterdayUniqueVisitors =
      await VisitorSession.distinct(
        "visitorId",
        {
          startedAt: {
            $gte: startOfYesterday,
            $lt: startOfToday,
          },
        }
      );

    /* ==========================================
       LAST 7 DAYS
    ========================================== */

    const sevenDayVisitors =
      await VisitorSession.distinct(
        "visitorId",
        {
          startedAt: {
            $gte: last7Days,
          },
        }
      );

    /* ==========================================
       LAST 30 DAYS
    ========================================== */

    const thirtyDayVisitors =
      await VisitorSession.distinct(
        "visitorId",
        {
          startedAt: {
            $gte: last30Days,
          },
        }
      );

    /* ==========================================
       LIVE VISITORS
       Active within last 5 minutes
    ========================================== */

    const liveSince = new Date(
      Date.now() - 5 * 60 * 1000
    );

    const liveVisitors =
      await VisitorSession.countDocuments({
        lastSeenAt: {
          $gte: liveSince,
        },
      });

    /* ==========================================
       TOP PAGES
    ========================================== */

    const topPages =
      await PageView.aggregate([
        {
          $match: {
            viewedAt: {
              $gte: last30Days,
            },
          },
        },
        {
          $group: {
            _id: "$path",
            views: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            views: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

    /* ==========================================
       TRAFFIC SOURCES
    ========================================== */

    const trafficSources =
      await VisitorSession.aggregate([
        {
          $match: {
            startedAt: {
              $gte: last30Days,
            },
          },
        },
        {
          $group: {
            _id: "$source",
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

    /* ==========================================
       DEVICES
    ========================================== */

    const devices =
      await VisitorSession.aggregate([
        {
          $match: {
            startedAt: {
              $gte: last30Days,
            },
          },
        },
        {
          $group: {
            _id: "$deviceType",
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
      ]);

    /* ==========================================
       BROWSERS
    ========================================== */

    const browsers =
      await VisitorSession.aggregate([
        {
          $match: {
            startedAt: {
              $gte: last30Days,
            },
          },
        },
        {
          $group: {
            _id: "$browser",
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
      ]);

    /* ==========================================
       OPERATING SYSTEMS
    ========================================== */

    const operatingSystems =
      await VisitorSession.aggregate([
        {
          $match: {
            startedAt: {
              $gte: last30Days,
            },
          },
        },
        {
          $group: {
            _id: "$operatingSystem",
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
      ]);

    /* ==========================================
       EVENTS
    ========================================== */

    const eventStats =
      await VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: last30Days,
            },
          },
        },
        {
          $group: {
            _id: "$eventName",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 15,
        },
      ]);

    /* ==========================================
       RECENT SESSIONS
    ========================================== */

    const recentVisitors =
      await VisitorSession.find()
        .sort({
          lastSeenAt: -1,
        })
        .limit(15)
        .select(
          "visitorId sessionId landingPage exitPage source deviceType browser operatingSystem pageCount startedAt lastSeenAt"
        )
        .lean();

    return NextResponse.json({
      success: true,

      overview: {
        todayVisitors:
          todayUniqueVisitors.length,

        todaySessions,

        todayPageViews,

        todayEvents,

        yesterdayVisitors:
          yesterdayUniqueVisitors.length,

        last7DaysVisitors:
          sevenDayVisitors.length,

        last30DaysVisitors:
          thirtyDayVisitors.length,

        liveVisitors,
      },

      topPages,

      trafficSources,

      devices,

      browsers,

      operatingSystems,

      eventStats,

      recentVisitors,
    });
  } catch (error) {
    console.error(
      "Admin analytics error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load analytics",
      },
      {
        status: 500,
      }
    );
  }
}