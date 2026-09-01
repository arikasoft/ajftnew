"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  Loader2,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

type Application = {
  _id: string;
  applicationId: string;
  fullName: string;
  mobile: string;
  disabilityType?: string;
  state?: string;
  district?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
};

type DashboardData = {
  summary: {
    total: number;
    pending: number;
    underReview: number;
    approved: number;
    rejected: number;
    completed: number;
    processing: number;
    decisionMade: number;
    uncategorized: number;
  };

  percentages: {
    pending: number;
    underReview: number;
    approved: number;
    rejected: number;
    completed: number;
    processing: number;
    decisionMade: number;
  };

  latestApplication: Application | null;

  recentApplications: Application[];

  analytics: {
    byState: {
      state: string;
      count: number;
      percentage: number;
    }[];

    byDisability: {
      disabilityType: string;
      count: number;
      percentage: number;
    }[];

    statusDistribution: Record<
      string,
      {
        count: number;
        percentage: number;
      }
    >;
  };

  generatedAt: string;
};

function formatDate(value?: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStatusStyle(status: string) {
  switch (status) {
    case "approved":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600";

    case "rejected":
      return "border-red-500/20 bg-red-500/10 text-red-600";

    case "under_review":
      return "border-blue-500/20 bg-blue-500/10 text-blue-600";

    case "completed":
      return "border-purple-500/20 bg-purple-500/10 text-purple-600";

    default:
      return "border-amber-500/20 bg-amber-500/10 text-amber-600";
  }
}

function formatStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DivyangAdminDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const loadDashboard = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          "/api/divyang/admin/dashboard",
          {
            cache: "no-store",
          }
        );

        const result =
          await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Unable to load dashboard."
          );
        }

        setDashboard(result.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const cards = dashboard
    ? [
        {
          title: "Total Applications",
          value: dashboard.summary.total,
          icon: ClipboardList,
          description:
            "All Divyang applications",
          color:
            "from-[#073B4C] to-[#0B6178]",
        },
        {
          title: "Pending Review",
          value: dashboard.summary.pending,
          icon: Activity,
          description:
            `${dashboard.percentages.pending}% awaiting review`,
          color:
            "from-amber-500 to-orange-500",
        },
        {
          title: "Under Review",
          value: dashboard.summary.underReview,
          icon: Eye,
          description:
            "Currently being reviewed",
          color:
            "from-blue-500 to-indigo-600",
        },
        {
          title: "Approved",
          value: dashboard.summary.approved,
          icon: CheckCircle2,
          description:
            "Applications approved",
          color:
            "from-emerald-500 to-green-600",
        },
        {
          title: "Rejected",
          value: dashboard.summary.rejected,
          icon: XCircle,
          description:
            "Applications rejected",
          color:
            "from-red-500 to-rose-600",
        },
        {
          title: "Completed",
          value: dashboard.summary.completed,
          icon: ShieldCheck,
          description:
            "Cases successfully completed",
          color:
            "from-purple-500 to-violet-600",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#D6A63A]" />

          <p className="mt-4 text-sm font-bold text-slate-500">
            Loading Divyang Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />

          <h2 className="mt-4 text-xl font-black text-red-700">
            Unable to Load Dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error ||
              "Something went wrong."}
          </p>

          <button
            onClick={() =>
              loadDashboard()
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white"
          >
            <RefreshCw size={16} />

            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F8FA]">

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#073B4C] text-white">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6A63A]">
                    Anand Jivan Foundation Trust
                  </p>

                  <h1 className="text-2xl font-black text-[#073B4C]">
                    Divyang Administration
                  </h1>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Monitor, review and manage Divyang
                assistance applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() =>
                  loadDashboard(true)
                }
                disabled={refreshing}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>

              <Link
                href="/admin/divyang/applications"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#073B4C] px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0B6178]"
              >
                <FileText size={16} />

                View Applications

                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        {/* =================================================
            STATUS OVERVIEW
        ================================================= */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${card.color} opacity-[0.08] blur-2xl`}
                />

                <div className="relative flex items-start justify-between">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-black text-[#073B4C]">
                      {card.value}
                    </h2>

                    <p className="mt-2 text-xs text-slate-500">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                  >
                    <Icon size={21} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* =================================================
            PROCESSING SUMMARY
        ================================================= */}

        <div className="mb-8 grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl bg-[#073B4C] p-7 text-white shadow-xl">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Processing Applications
                </p>

                <h2 className="mt-3 text-5xl font-black">
                  {dashboard.summary.processing}
                </h2>
              </div>

              <Activity
                size={38}
                className="text-[#D6A63A]"
              />

            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-[#D6A63A]"
                style={{
                  width: `${dashboard.percentages.processing}%`,
                }}
              />

            </div>

            <p className="mt-3 text-xs text-white/60">
              {dashboard.percentages.processing}%
              of all applications are being processed.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Decisions Made
            </p>

            <div className="mt-4 flex items-end justify-between">

              <h2 className="text-5xl font-black text-[#073B4C]">
                {dashboard.summary.decisionMade}
              </h2>

              <BarChart3
                size={35}
                className="text-[#D6A63A]"
              />

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Approved, rejected or completed
              applications.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Latest Application
            </p>

            {dashboard.latestApplication ? (
              <>
                <h3 className="mt-3 truncate text-xl font-black text-[#073B4C]">
                  {dashboard.latestApplication.fullName}
                </h3>

                <p className="mt-1 text-xs font-bold text-slate-500">
                  {dashboard.latestApplication.applicationId}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  {formatDate(
                    dashboard.latestApplication.createdAt
                  )}
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-slate-400">
                No applications available.
              </p>
            )}

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">

          {/* ===============================================
              RECENT APPLICATIONS
          =============================================== */}

          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <h2 className="text-lg font-black text-[#073B4C]">
                  Recent Applications
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest Divyang assistance requests.
                </p>
              </div>

              <Link
                href="/admin/divyang/applications"
                className="text-xs font-black text-[#D6A63A]"
              >
                View All
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Location
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Disability
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard.recentApplications.map(
                    (application) => (
                      <tr
                        key={application._id}
                        className="border-t border-slate-100 transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          <p className="font-black text-[#073B4C]">
                            {application.fullName}
                          </p>

                          <p className="mt-1 text-[10px] font-bold text-slate-400">
                            {application.applicationId}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {application.mobile}
                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">

                            <MapPin
                              size={14}
                              className="text-[#D6A63A]"
                            />

                            {application.district ||
                              "-"}

                          </div>

                          <p className="mt-1 text-xs text-slate-400">
                            {application.state ||
                              "-"}
                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <p className="max-w-[180px] text-sm font-semibold text-slate-600">
                            {application.disabilityType ||
                              "-"}
                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${getStatusStyle(
                              application.status
                            )}`}
                          >
                            {formatStatus(
                              application.status
                            )}
                          </span>

                        </td>

                        <td className="px-6 py-5 text-right">

                          <Link
                            href={`/admin/divyang/${application._id}`}
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-100 px-3 text-xs font-bold text-[#073B4C] transition hover:bg-[#073B4C] hover:text-white"
                          >
                            View
                          </Link>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* ===============================================
              ANALYTICS
          =============================================== */}

          <aside className="space-y-8">

            {/* STATUS DISTRIBUTION */}

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#073B4C] text-white">
                  <BarChart3 size={18} />
                </div>

                <div>
                  <h2 className="font-black text-[#073B4C]">
                    Status Overview
                  </h2>

                  <p className="text-xs text-slate-400">
                    Application distribution
                  </p>
                </div>

              </div>

              <div className="mt-7 space-y-5">

                {[
                  {
                    label: "Pending",
                    value:
                      dashboard.analytics
                        .statusDistribution
                        .pending,
                  },
                  {
                    label: "Under Review",
                    value:
                      dashboard.analytics
                        .statusDistribution
                        .underReview,
                  },
                  {
                    label: "Approved",
                    value:
                      dashboard.analytics
                        .statusDistribution
                        .approved,
                  },
                  {
                    label: "Rejected",
                    value:
                      dashboard.analytics
                        .statusDistribution
                        .rejected,
                  },
                ].map((item) => (

                  <div key={item.label}>

                    <div className="flex justify-between text-xs">

                      <span className="font-bold text-slate-600">
                        {item.label}
                      </span>

                      <span className="font-black text-[#073B4C]">
                        {item.value?.count || 0}
                      </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-[#D6A63A]"
                        style={{
                          width: `${item.value?.percentage || 0}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* DISABILITY TYPE */}

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6A63A] text-white">
                  <Users size={18} />
                </div>

                <div>
                  <h2 className="font-black text-[#073B4C]">
                    Disability Categories
                  </h2>

                  <p className="text-xs text-slate-400">
                    Applications by category
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4">

                {dashboard.analytics.byDisability.map(
                  (item) => (

                    <div
                      key={item.disabilityType}
                      className="rounded-2xl bg-slate-50 p-4"
                    >

                      <div className="flex justify-between gap-3">

                        <p className="text-xs font-bold text-slate-600">
                          {item.disabilityType}
                        </p>

                        <p className="text-sm font-black text-[#073B4C]">
                          {item.count}
                        </p>

                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">

                        <div
                          className="h-full rounded-full bg-[#073B4C]"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

            {/* STATE */}

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <MapPin size={18} />
                </div>

                <div>
                  <h2 className="font-black text-[#073B4C]">
                    State Distribution
                  </h2>

                  <p className="text-xs text-slate-400">
                    Geographic coverage
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4">

                {dashboard.analytics.byState.map(
                  (item) => (

                    <div
                      key={item.state}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                    >

                      <span className="text-sm font-bold text-slate-600">
                        {item.state}
                      </span>

                      <div className="text-right">

                        <p className="text-sm font-black text-[#073B4C]">
                          {item.count}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {item.percentage}%
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

          </aside>

        </div>

        {/* =================================================
            FOOTER INFO
        ================================================= */}

        <div className="mt-8 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center">

          <span>
            Anand Jivan Foundation Trust • Divyang
            Application Management System
          </span>

          <span>
            Last updated:{" "}
            {formatDate(
              dashboard.generatedAt
            )}
          </span>

        </div>

      </div>

    </main>
  );
}