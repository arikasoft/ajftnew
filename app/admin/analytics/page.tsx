"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Eye,
  Globe,
  Monitor,
  MousePointerClick,
  RefreshCw,
  Smartphone,
  Tablet,
  Users,
} from "lucide-react";

type AnalyticsData = {
  overview: {
    todayVisitors: number;
    todaySessions: number;
    todayPageViews: number;
    todayEvents: number;
    yesterdayVisitors: number;
    last7DaysVisitors: number;
    last30DaysVisitors: number;
    liveVisitors: number;
  };

  topPages: {
    _id: string;
    views: number;
  }[];

  trafficSources: {
    _id: string;
    visitors: number;
  }[];

  devices: {
    _id: string;
    visitors: number;
  }[];

  browsers: {
    _id: string;
    visitors: number;
  }[];

  operatingSystems: {
    _id: string;
    visitors: number;
  }[];

  eventStats: {
    _id: string;
    count: number;
  }[];

  recentVisitors: {
    visitorId: string;
    sessionId: string;
    landingPage?: string;
    exitPage?: string;
    source?: string;
    deviceType?: string;
    browser?: string;
    operatingSystem?: string;
    pageCount: number;
    startedAt: string;
    lastSeenAt: string;
  }[];
};

export default function AnalyticsPage() {
  const [data, setData] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/analytics",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Analytics API request failed"
        );
      }

      const result =
        await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "Unable to load analytics"
        );
      }

      setData(result);
    } catch (err) {
      console.error(
        "Analytics dashboard error:",
        err
      );

      setError(
        "Analytics data load nahi ho saka."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();

    const timer = setInterval(
      loadAnalytics,
      30000
    );

    return () => {
      clearInterval(timer);
    };
  }, []);

  /* ==========================================
     LOADING
  ========================================== */

  if (loading && !data) {
    return (
      <main className="min-h-screen bg-[#F4F7F8]">

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-8">

          <div className="animate-pulse">

            <div className="h-8 w-64 rounded-lg bg-slate-200" />

            <div className="mt-3 h-4 w-96 max-w-full rounded bg-slate-200" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="h-36 rounded-2xl bg-white"
                  />
                )
              )}

            </div>

          </div>

        </div>

      </main>
    );
  }

  /* ==========================================
     ERROR
  ========================================== */

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7F8] px-5">

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h1 className="mt-4 text-lg font-black text-[#102A43]">
            Analytics Unavailable
          </h1>

          <p className="mt-2 text-xs text-slate-400">
            {error ||
              "Analytics data available nahi hai."}
          </p>

          <button
            onClick={loadAnalytics}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#087E8B] px-5 py-3 text-xs font-black text-white transition hover:bg-[#066C77]"
          >
            <RefreshCw size={14} />
            Try Again
          </button>

        </div>

      </main>
    );
  }

  const overview = data.overview;

  return (
    <main className="min-h-screen bg-[#F4F7F8]">

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-6 sm:px-7 lg:px-8">

          <div>

            <div className="flex items-center gap-2">

              <span className="relative flex h-2 w-2">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />

              </span>

              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
                AJFT ADMIN
              </span>

            </div>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-[#102A43] sm:text-3xl">
              Website Analytics
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Real-time visitor and website activity
            </p>

          </div>

          <button
            type="button"
            onClick={loadAnalytics}
            className="
              flex h-10 shrink-0 items-center gap-2
              rounded-xl border border-slate-200
              bg-white px-4
              text-xs font-bold text-[#087E8B]
              shadow-sm transition
              hover:border-[#087E8B]
            "
          >
            <RefreshCw
              size={14}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

        </div>

      </header>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-7 lg:px-8">

        {/* ========================================
            OVERVIEW
        ========================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<Users size={20} />}
            label="Today's Visitors"
            value={overview.todayVisitors}
            extra={`${overview.yesterdayVisitors} yesterday`}
            color="#087E8B"
          />

          <StatCard
            icon={<Activity size={20} />}
            label="Live Visitors"
            value={overview.liveVisitors}
            extra="Active in last 5 minutes"
            color="#16A34A"
            live
          />

          <StatCard
            icon={<Eye size={20} />}
            label="Page Views"
            value={overview.todayPageViews}
            extra={`${overview.todaySessions} sessions today`}
            color="#7C3AED"
          />

          <StatCard
            icon={
              <MousePointerClick size={20} />
            }
            label="Events"
            value={overview.todayEvents}
            extra="Today's activity"
            color="#D6A63A"
          />

        </div>

        {/* ========================================
            PERIOD
        ========================================= */}

        <div className="mt-5 grid gap-4 sm:grid-cols-3">

          <MiniStat
            label="Last 7 Days Visitors"
            value={overview.last7DaysVisitors}
          />

          <MiniStat
            label="Last 30 Days Visitors"
            value={overview.last30DaysVisitors}
          />

          <MiniStat
            label="Today's Sessions"
            value={overview.todaySessions}
          />

        </div>

        {/* ========================================
            TOP PAGES + SOURCES
        ========================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <Panel
            title="Top Pages"
            icon={<BarChart3 size={17} />}
          >

            <div className="space-y-5">

              {data.topPages.length === 0 ? (
                <Empty />
              ) : (
                data.topPages.map(
                  (page, index) => (
                    <RankRow
                      key={`${page._id}-${index}`}
                      index={index + 1}
                      label={page._id || "/"}
                      value={page.views}
                      max={
                        data.topPages[0]?.views ||
                        1
                      }
                    />
                  )
                )
              )}

            </div>

          </Panel>

          <Panel
            title="Traffic Sources"
            icon={<Globe size={17} />}
          >

            <div className="space-y-5">

              {data.trafficSources.length ===
              0 ? (
                <Empty />
              ) : (
                data.trafficSources.map(
                  (item, index) => (
                    <RankRow
                      key={`${item._id}-${index}`}
                      index={index + 1}
                      label={
                        item._id ||
                        "Unknown"
                      }
                      value={item.visitors}
                      max={
                        data.trafficSources[0]
                          ?.visitors || 1
                      }
                    />
                  )
                )
              )}

            </div>

          </Panel>

        </div>

        {/* ========================================
            DEVICES
        ========================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          <BreakdownPanel
            title="Devices"
            icon={<Monitor size={17} />}
            items={data.devices}
          />

          <BreakdownPanel
            title="Browsers"
            icon={<Globe size={17} />}
            items={data.browsers}
          />

          <BreakdownPanel
            title="Operating Systems"
            icon={<Monitor size={17} />}
            items={data.operatingSystems}
          />

        </div>

        {/* ========================================
            EVENTS
        ========================================= */}

        <div className="mt-6">

          <Panel
            title="Visitor Events"
            icon={
              <MousePointerClick size={17} />
            }
          >

            {data.eventStats.length === 0 ? (
              <Empty text="No events recorded yet." />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {data.eventStats.map(
                  (event, index) => (
                    <div
                      key={`${event._id}-${index}`}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >

                      <p className="truncate text-[9px] font-black uppercase tracking-wider text-slate-400">
                        {event._id ||
                          "Unknown Event"}
                      </p>

                      <p className="mt-2 text-2xl font-black text-[#102A43]">
                        {event.count.toLocaleString()}
                      </p>

                    </div>
                  )
                )}

              </div>
            )}

          </Panel>

        </div>

        {/* ========================================
            RECENT VISITORS
        ========================================= */}

        <div className="mt-6">

          <Panel
            title="Recent Visitors"
            icon={<Users size={17} />}
          >

            {data.recentVisitors.length ===
            0 ? (
              <Empty text="No visitors recorded yet." />
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead>

                    <tr className="border-b border-slate-100">

                      <TableHead>
                        Visitor
                      </TableHead>

                      <TableHead>
                        Page
                      </TableHead>

                      <TableHead>
                        Source
                      </TableHead>

                      <TableHead>
                        Device
                      </TableHead>

                      <TableHead>
                        Browser
                      </TableHead>

                      <TableHead>
                        Pages
                      </TableHead>

                      <TableHead>
                        Last Seen
                      </TableHead>

                    </tr>

                  </thead>

                  <tbody>

                    {data.recentVisitors.map(
                      (visitor, index) => (

                        <tr
                          key={`${visitor.sessionId}-${visitor.visitorId}-${index}`}
                          className="
                            border-b
                            border-slate-50
                            transition
                            hover:bg-slate-50
                          "
                        >

                          <td className="px-3 py-4">

                            <p className="max-w-[130px] truncate text-[9px] font-bold text-[#102A43]">
                              {visitor.visitorId}
                            </p>

                          </td>

                          <td className="px-3 py-4">

                            <span className="inline-block max-w-[160px] truncate text-[10px] text-slate-500">
                              {visitor.exitPage ||
                                visitor.landingPage ||
                                "/"}
                            </span>

                          </td>

                          <td className="px-3 py-4">

                            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[9px] font-bold capitalize text-slate-500">
                              {visitor.source ||
                                "direct"}
                            </span>

                          </td>

                          <td className="px-3 py-4">

                            <DeviceBadge
                              type={
                                visitor.deviceType
                              }
                            />

                          </td>

                          <td className="px-3 py-4 text-[10px] text-slate-500">
                            {visitor.browser ||
                              "Unknown"}
                          </td>

                          <td className="px-3 py-4 text-[10px] font-black text-[#087E8B]">
                            {visitor.pageCount}
                          </td>

                          <td className="px-3 py-4 text-[9px] text-slate-400">
                            {formatDate(
                              visitor.lastSeenAt
                            )}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </Panel>

        </div>

      </div>

    </main>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  label,
  value,
  extra,
  color,
  live = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  extra: string;
  color: string;
  live?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${color}12`,
            color,
          }}
        >
          {icon}
        </div>

        {live && (
          <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wider text-green-600">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />

            LIVE

          </span>
        )}

      </div>

      <p className="mt-5 text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-3xl font-black tracking-tight text-[#102A43]">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        {extra}
      </p>

    </div>
  );
}

/* =====================================================
   MINI STAT
===================================================== */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-[#102A43]">
        {value.toLocaleString()}
      </p>

    </div>
  );
}

/* =====================================================
   PANEL
===================================================== */

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[#087E8B]">
          {icon}
        </div>

        <h2 className="text-sm font-black text-[#102A43]">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
}

/* =====================================================
   TABLE HEAD
===================================================== */

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-3 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
      {children}
    </th>
  );
}

/* =====================================================
   RANK ROW
===================================================== */

function RankRow({
  index,
  label,
  value,
  max,
}: {
  index: number;
  label: string;
  value: number;
  max: number;
}) {
  const percentage = Math.max(
    5,
    Math.round((value / max) * 100)
  );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F6] text-[8px] font-black text-[#087E8B]">
            {index}
          </span>

          <span className="truncate text-[10px] font-semibold text-slate-600">
            {label}
          </span>

        </div>

        <span className="shrink-0 text-[10px] font-black text-[#102A43]">
          {value.toLocaleString()}
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-[#087E8B] transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =====================================================
   BREAKDOWN
===================================================== */

function BreakdownPanel({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: {
    _id: string;
    visitors: number;
  }[];
}) {
  return (
    <Panel title={title} icon={icon}>

      <div className="space-y-3">

        {items.length === 0 ? (
          <Empty />
        ) : (
          items.map(
            (item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
              >

                <span className="truncate text-[10px] font-bold capitalize text-slate-600">
                  {item._id || "Unknown"}
                </span>

                <span className="ml-3 shrink-0 text-[10px] font-black text-[#087E8B]">
                  {item.visitors.toLocaleString()}
                </span>

              </div>
            )
          )
        )}

      </div>

    </Panel>
  );
}

/* =====================================================
   DEVICE BADGE
===================================================== */

function DeviceBadge({
  type,
}: {
  type?: string;
}) {
  const value =
    type?.toLowerCase() ||
    "unknown";

  if (value === "mobile") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
        <Smartphone size={13} />
        Mobile
      </span>
    );
  }

  if (value === "tablet") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
        <Tablet size={13} />
        Tablet
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
      <Monitor size={13} />
      Desktop
    </span>
  );
}

/* =====================================================
   EMPTY
===================================================== */

function Empty({
  text = "No data available yet.",
}: {
  text?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-5 py-8 text-center">

      <p className="text-[10px] text-slate-400">
        {text}
      </p>

    </div>
  );
}

/* =====================================================
   DATE
===================================================== */

function formatDate(date: string) {
  if (!date) {
    return "-";
  }

  try {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return "-";
  }
}