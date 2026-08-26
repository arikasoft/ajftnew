"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  HeartHandshake,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

type HealthRequest = {
  _id?: string;
  requestId: string;
  name: string;
  phone: string;
  age?: number | null;
  gender?: string;
  location: string;
  helpType: string;
  urgency: "General" | "Important" | "Urgent";
  description: string;
  status:
    | "pending"
    | "reviewing"
    | "assistance"
    | "completed"
    | "closed";
  adminNote?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Stats = {
  total: number;
  pending: number;
  reviewing: number;
  assistance: number;
  completed: number;
  closed: number;
  urgent: number;
};

const statusFilters = [
  "ALL",
  "pending",
  "reviewing",
  "assistance",
  "completed",
  "closed",
];

function formatDate(value?: string) {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return value;
  }
}

function statusLabel(
  status: HealthRequest["status"]
) {
  const labels: Record<
    HealthRequest["status"],
    string
  > = {
    pending: "Pending",
    reviewing: "Reviewing",
    assistance: "Assistance",
    completed: "Completed",
    closed: "Closed",
  };

  return labels[status];
}

function statusClass(
  status: HealthRequest["status"]
) {
  switch (status) {
    case "reviewing":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "assistance":
      return "border-purple-200 bg-purple-50 text-purple-700";

    case "completed":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "closed":
      return "border-slate-200 bg-slate-100 text-slate-600";

    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

function urgencyClass(
  urgency: HealthRequest["urgency"]
) {
  switch (urgency) {
    case "Urgent":
      return "border-red-200 bg-red-50 text-red-700";

    case "Important":
      return "border-orange-200 bg-orange-50 text-orange-700";

    default:
      return "border-slate-200 bg-slate-100 text-slate-600";
  }
}

export default function HealthHelpAdminPage() {
  const [requests, setRequests] =
    useState<HealthRequest[]>([]);

  const [stats, setStats] =
    useState<Stats>({
      total: 0,
      pending: 0,
      reviewing: 0,
      assistance: 0,
      completed: 0,
      closed: 0,
      urgent: 0,
    });

  const [status, setStatus] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState<HealthRequest | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  async function loadRequests(
    refresh = false
  ) {
    try {
      setError("");

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const params =
        new URLSearchParams();

      if (status !== "ALL") {
        params.set(
          "status",
          status
        );
      }

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      const response =
        await fetch(
          `/api/admin/health-help?${params.toString()}`,
          {
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Unable to load health requests."
        );
      }

      setRequests(
        Array.isArray(result.requests)
          ? result.requests
          : []
      );

      setStats(
        result.stats || {
          total: 0,
          pending: 0,
          reviewing: 0,
          assistance: 0,
          completed: 0,
          closed: 0,
          urgent: 0,
        }
      );
    } catch (err) {
      console.error(
        "HEALTH HELP ADMIN ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load requests."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const timer =
      setTimeout(() => {
        loadRequests();
      }, 250);

    return () =>
      clearTimeout(timer);
  }, [status, search]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7F9]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-xl">
            <Loader2
              size={24}
              className="animate-spin"
            />
          </div>

          <p className="mt-4 text-xs font-black text-[#526575]">
            Loading Health Requests...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7F9]">

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071D2B]/95 text-white shadow-xl backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">

            <Link
              href="/admin"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <ArrowLeft size={15} />
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2C94C] text-[#071D2B]">
              <HeartHandshake size={19} />
            </div>

            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                AJFT ADMIN
              </p>

              <h1 className="text-base font-black">
                Health Help Management
              </h1>
            </div>

          </div>

          <button
            onClick={() =>
              loadRequests(true)
            }
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[9px] font-black hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw
              size={13}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>

        </div>

      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[2rem] bg-[#102A43] p-7 text-white shadow-xl sm:p-9">

          <div className="relative z-10">

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F2C94C]">
              HEALTH ASSISTANCE MANAGEMENT
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Health Help Centre
            </h2>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-white/60">
              Review assistance requests,
              identify urgent cases and
              manage the complete support
              workflow.
            </p>

          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5" />

        </section>

        {/* ERROR */}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700">
            {error}
          </div>
        )}

        {/* STATS */}

        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">

          <Stat
            title="Total"
            value={stats.total}
            icon={<HeartHandshake size={16} />}
          />

          <Stat
            title="Pending"
            value={stats.pending}
            icon={<Clock3 size={16} />}
          />

          <Stat
            title="Reviewing"
            value={stats.reviewing}
            icon={<Eye size={16} />}
          />

          <Stat
            title="Assistance"
            value={stats.assistance}
            icon={<Activity size={16} />}
          />

          <Stat
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle2 size={16} />}
          />

          <Stat
            title="Closed"
            value={stats.closed}
            icon={<X size={16} />}
          />

          <Stat
            title="Urgent"
            value={stats.urgent}
            icon={<AlertTriangle size={16} />}
            danger
          />

        </section>

        {/* FILTERS */}

        <section className="mt-6 rounded-2xl border border-[#DCE6EB] bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA7AF]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search name, request ID, phone, location or help type..."
                className="h-11 w-full rounded-xl border border-[#DCE5EA] bg-[#FAFCFD] pl-10 pr-4 text-xs outline-none focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
              />

            </div>

            <div className="flex flex-wrap gap-2">

              {statusFilters.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setStatus(item)
                    }
                    className={`rounded-xl px-3 py-2.5 text-[8px] font-black transition ${
                      status === item
                        ? "bg-[#102A43] text-white"
                        : "bg-[#F4F7F9] text-[#526575] hover:bg-[#EAF2F4]"
                    }`}
                  >
                    {item === "ALL"
                      ? "ALL"
                      : statusLabel(
                          item as HealthRequest["status"]
                        )}
                  </button>
                )
              )}

            </div>

          </div>

        </section>

        {/* TABLE */}

        <section className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#DCE6EB] bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-[#E8EEF1] px-5 py-4">

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#176B87]">
                Assistance Requests
              </p>

              <p className="mt-1 text-[10px] text-[#8997A2]">
                Showing {requests.length} records
              </p>
            </div>

          </div>

          {requests.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <HeartHandshake
                size={34}
                className="text-[#B8C5CC]"
              />

              <h3 className="mt-4 text-sm font-black text-[#243B53]">
                No health requests found
              </h3>

              <p className="mt-2 text-[10px] text-[#8997A2]">
                Try another search or status filter.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px]">

                <thead>
                  <tr className="border-b border-[#E8EEF1] bg-[#F8FAFB]">

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Applicant
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Request
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Help Type
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Urgency
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Date
                    </th>

                    <th className="px-5 py-3 text-right text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {requests.map(
                    (request) => (
                      <tr
                        key={
                          request._id ||
                          request.requestId
                        }
                        className="border-b border-[#EEF2F4] hover:bg-[#FAFCFD]"
                      >

                        <td className="px-5 py-4">

                          <p className="text-xs font-black text-[#243B53]">
                            {request.name}
                          </p>

                          <p className="mt-1 text-[9px] text-[#8997A2]">
                            {request.phone}
                          </p>

                          <p className="mt-1 text-[9px] text-[#8997A2]">
                            {request.location}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <p className="font-mono text-[9px] font-bold text-[#176B87]">
                            {request.requestId}
                          </p>

                          <p className="mt-1 text-[8px] text-[#8997A2]">
                            {request.age
                              ? `${request.age} years`
                              : "Age not provided"}
                            {request.gender
                              ? ` • ${request.gender}`
                              : ""}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <span className="text-[10px] font-bold text-[#526575]">
                            {request.helpType}
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black ${urgencyClass(
                              request.urgency
                            )}`}
                          >
                            {request.urgency}
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black ${statusClass(
                              request.status
                            )}`}
                          >
                            {statusLabel(
                              request.status
                            )}
                          </span>

                        </td>

                        <td className="px-5 py-4 text-[9px] text-[#8997A2]">
                          {formatDate(
                            request.createdAt
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">

                          <button
                            onClick={() =>
                              setSelected(
                                request
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2.5 text-[9px] font-black text-white hover:bg-[#176B87]"
                          >
                            <Eye size={13} />
                            View
                            <ChevronRight
                              size={12}
                            />
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

      {/* DETAIL DRAWER */}

      {selected && (
        <div className="fixed inset-0 z-50">

          <button
            onClick={() =>
              setSelected(null)
            }
            className="absolute inset-0 bg-[#071D2B]/60 backdrop-blur-sm"
            aria-label="Close"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">

            {/* DRAWER HEADER */}

            <div className="shrink-0 bg-[#071D2B] px-6 py-6 text-white">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                    HEALTH HELP REQUEST
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    {selected.name}
                  </h2>

                  <p className="mt-1 font-mono text-[9px] text-white/50">
                    {selected.requestId}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelected(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <X size={16} />
                </button>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                <span
                  className={`rounded-full border px-3 py-1.5 text-[8px] font-black ${urgencyClass(
                    selected.urgency
                  )}`}
                >
                  {selected.urgency}
                </span>

                <span
                  className={`rounded-full border px-3 py-1.5 text-[8px] font-black ${statusClass(
                    selected.status
                  )}`}
                >
                  {statusLabel(
                    selected.status
                  )}
                </span>

              </div>

            </div>

            {/* DRAWER CONTENT */}

            <div className="flex-1 overflow-y-auto p-6">

              <div className="space-y-4">

                <Info
                  label="Phone"
                  value={selected.phone}
                />

                <Info
                  label="Age"
                  value={
                    selected.age
                      ? `${selected.age} years`
                      : "—"
                  }
                />

                <Info
                  label="Gender"
                  value={
                    selected.gender
                  }
                />

                <Info
                  label="Location"
                  value={
                    selected.location
                  }
                />

                <Info
                  label="Help Type"
                  value={
                    selected.helpType
                  }
                />

                <div className="rounded-xl border border-[#E5ECEF] bg-[#FAFCFD] p-4">

                  <p className="text-[7px] font-black uppercase tracking-widest text-[#9AA7AF]">
                    Description
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-[11px] leading-6 text-[#526575]">
                    {selected.description}
                  </p>

                </div>

                <div className="rounded-xl border border-[#E5ECEF] bg-[#FAFCFD] p-4">

                  <p className="text-[7px] font-black uppercase tracking-widest text-[#9AA7AF]">
                    Admin Note
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-[11px] leading-6 text-[#526575]">
                    {selected.adminNote ||
                      "No admin note yet."}
                  </p>

                </div>

                <Info
                  label="Created"
                  value={formatDate(
                    selected.createdAt
                  )}
                />

                <Info
                  label="Last Updated"
                  value={formatDate(
                    selected.updatedAt
                  )}
                />

              </div>

            </div>

            {/* DRAWER ACTION */}

            <div className="shrink-0 border-t border-[#E5ECEF] bg-[#F8FAFB] p-5">

              <a
                href={`tel:${selected.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] py-3 text-[9px] font-black text-white hover:bg-[#176B87]"
              >
                Call Applicant
              </a>

            </div>

          </aside>

        </div>
      )}

    </main>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  title,
  value,
  icon,
  danger = false,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#DCE6EB] bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
            danger
              ? "bg-red-50 text-red-600"
              : "bg-[#EEF6F8] text-[#176B87]"
          }`}
        >
          {icon}
        </div>

        <p className="text-xl font-black text-[#102A43]">
          {value}
        </p>

      </div>

      <p className="mt-3 text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
        {title}
      </p>

    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-[#E5ECEF] bg-[#FAFCFD] p-3">

      <p className="text-[7px] font-black uppercase tracking-widest text-[#9AA7AF]">
        {label}
      </p>

      <p className="mt-1.5 break-words text-[10px] font-semibold leading-5 text-[#526575]">
        {value || "—"}
      </p>

    </div>
  );
}