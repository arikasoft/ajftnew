"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileSearch,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  Users,
  XCircle,
} from "lucide-react";

type Application = {
  _id: string;
  applicationId: string;
  fullName: string;
  mobile: string;
  email?: string;
  district?: string;
  state?: string;
  disabilityType?: string;
  disabilityPercentage?: string | number;
  status: string;
  createdAt?: string;
};

const STATUS_OPTIONS = [
  "ALL",
  "SUBMITTED",
  "UNDER_REVIEW",
  "VERIFIED",
  "APPROVED",
  "BENEFIT_PROCESSING",
  "COMPLETED",
  "REJECTED",
];

const statusStyles: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  SUBMITTED: {
    label: "Submitted",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },
  VERIFIED: {
    label: "Verified",
    className:
      "border-violet-200 bg-violet-50 text-violet-700",
  },
  APPROVED: {
    label: "Approved",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  BENEFIT_PROCESSING: {
    label: "Processing",
    className:
      "border-cyan-200 bg-cyan-50 text-cyan-700",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "border-green-200 bg-green-50 text-green-700",
  },
  REJECTED: {
    label: "Rejected",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },
};

function formatStatus(status: string) {
  if (statusStyles[status]) {
    return statusStyles[status].label;
  }

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(date?: string) {
  if (!date) return "—";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export default function DivyangApplicationsPage() {
  const [applications, setApplications] = useState<
    Application[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  async function loadApplications() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/divyang",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load applications."
        );
      }

      setApplications(
        Array.isArray(data.applications)
          ? data.applications
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const filteredApplications = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesStatus =
        status === "ALL" ||
        application.status === status;

      if (!matchesStatus) return false;

      if (!keyword) return true;

      return [
        application.applicationId,
        application.fullName,
        application.mobile,
        application.email,
        application.district,
        application.state,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(keyword)
        );
    });
  }, [
    applications,
    search,
    status,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredApplications.length / pageSize
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginatedApplications =
    filteredApplications.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  const stats = useMemo(() => {
    return {
      total: applications.length,
      submitted: applications.filter(
        (item) =>
          item.status === "SUBMITTED"
      ).length,
      review: applications.filter(
        (item) =>
          item.status ===
          "UNDER_REVIEW"
      ).length,
      approved: applications.filter(
        (item) =>
          item.status === "APPROVED"
      ).length,
    };
  }, [applications]);

  return (
    <main className="min-h-screen bg-[#F5F8FA]">

      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#D6A63A]/15 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-80px] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-12">

          <Link
            href="/admin/divyang"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Divyang Dashboard
          </Link>

          <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A63A]/25 bg-[#D6A63A]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#E5BE67]">
                <Users size={14} />
                AJFT Admin Portal
              </div>

              <h1 className="mt-5 text-4xl font-black text-white sm:text-5xl">
                Divyang Applications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                Manage applications, verify applicant
                details and monitor the complete
                assistance process.
              </p>

            </div>

            <button
              type="button"
              onClick={loadApplications}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh Data
            </button>

          </div>

        </div>

        <div className="absolute bottom-[-1px] left-0 w-full">

          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="h-[60px] w-full sm:h-[80px]"
          >

            <path
              d="
                M0 45
                C180 100 360 100 540 60
                C700 25 860 20 1030 65
                C1200 110 1320 90 1440 45
                L1440 100
                L0 100
                Z
              "
              fill="#F5F8FA"
            />

          </svg>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-12">

        {/* STATS */}
        <div className="-mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Applications"
            value={stats.total}
            icon={<Users size={21} />}
          />

          <StatCard
            title="New Submissions"
            value={stats.submitted}
            icon={<FileSearch size={21} />}
          />

          <StatCard
            title="Under Review"
            value={stats.review}
            icon={<Filter size={21} />}
          />

          <StatCard
            title="Approved"
            value={stats.approved}
            icon={
              <CheckCircle2 size={21} />
            }
          />

        </div>

        {/* FILTER */}
        <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search Application ID, Name, Mobile or Location..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-sm font-semibold outline-none transition focus:border-[#D6A63A] focus:bg-white focus:ring-4 focus:ring-[#D6A63A]/10"
              />

            </div>

            <div className="relative">

              <Filter
                size={17}
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="h-14 min-w-[220px] appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-[#D6A63A]"
              >
                {STATUS_OPTIONS.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === "ALL"
                        ? "All Status"
                        : formatStatus(item)}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>

          <div className="mt-5 flex items-center justify-between text-xs">

            <p className="font-bold text-slate-400">
              Showing{" "}
              {filteredApplications.length}{" "}
              application
              {filteredApplications.length ===
              1
                ? ""
                : "s"}
            </p>

            {search || status !== "ALL" ? (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("ALL");
                }}
                className="font-black text-[#D6A63A]"
              >
                Clear Filters
              </button>
            ) : null}

          </div>

        </div>

        {/* ERROR */}
        {error && (

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex gap-3">

              <XCircle
                size={21}
                className="shrink-0 text-red-500"
              />

              <div>

                <p className="font-black text-red-700">
                  Unable to Load Applications
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* TABLE */}
        <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

          {loading ? (

            <div className="flex min-h-[420px] flex-col items-center justify-center">

              <Loader2
                size={36}
                className="animate-spin text-[#D6A63A]"
              />

              <p className="mt-4 text-sm font-bold text-slate-400">
                Loading applications...
              </p>

            </div>

          ) : paginatedApplications.length ===
            0 ? (

            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">

                <FileSearch size={30} />

              </div>

              <h3 className="mt-5 text-xl font-black text-[#073B4C]">
                No Applications Found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                Try changing your search or filter
                selection.
              </p>

            </div>

          ) : (

            <>
              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead className="border-b border-slate-100 bg-slate-50">

                    <tr>

                      <TableHead>
                        Application
                      </TableHead>

                      <TableHead>
                        Applicant
                      </TableHead>

                      <TableHead>
                        Location
                      </TableHead>

                      <TableHead>
                        Disability
                      </TableHead>

                      <TableHead>
                        Status
                      </TableHead>

                      <TableHead>
                        Submitted
                      </TableHead>

                      <TableHead>
                        Action
                      </TableHead>

                    </tr>

                  </thead>

                  <tbody>

                    {paginatedApplications.map(
                      (application) => {

                        const statusStyle =
                          statusStyles[
                            application.status
                          ] || {
                            className:
                              "border-slate-200 bg-slate-50 text-slate-600",
                          };

                        return (
                          <tr
                            key={
                              application._id
                            }
                            className="border-b border-slate-100 transition hover:bg-slate-50/70"
                          >

                            <TableCell>

                              <p className="font-black text-[#073B4C]">
                                {
                                  application.applicationId
                                }
                              </p>

                            </TableCell>

                            <TableCell>

                              <p className="font-black text-slate-800">
                                {
                                  application.fullName
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {
                                  application.mobile
                                }
                              </p>

                            </TableCell>

                            <TableCell>

                              <p className="font-semibold text-slate-700">
                                {[
                                  application.district,
                                  application.state,
                                ]
                                  .filter(Boolean)
                                  .join(
                                    ", "
                                  ) ||
                                  "—"}
                              </p>

                            </TableCell>

                            <TableCell>

                              <p className="font-semibold text-slate-700">
                                {application.disabilityType ||
                                  "—"}
                              </p>

                              {application.disabilityPercentage ? (

                                <p className="mt-1 text-xs font-bold text-slate-400">

                                  {
                                    application.disabilityPercentage
                                  }
                                  %

                                </p>

                              ) : null}

                            </TableCell>

                            <TableCell>

                              <span
                                className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${statusStyle.className}`}
                              >
                                {formatStatus(
                                  application.status
                                )}
                              </span>

                            </TableCell>

                            <TableCell>

                              <p className="text-xs font-medium leading-5 text-slate-500">
                                {formatDate(
                                  application.createdAt
                                )}
                              </p>

                            </TableCell>

                            <TableCell>

                              <Link
                                href={`/admin/divyang/${application.applicationId}`}
                                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#073B4C] px-4 text-xs font-black text-white transition hover:bg-[#0B5368]"
                              >

                                <Eye size={15} />

                                View

                              </Link>

                            </TableCell>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

              {/* PAGINATION */}
              <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs font-semibold text-slate-400">

                  Page {currentPage} of{" "}
                  {totalPages}

                </p>

                <div className="flex gap-2">

                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPage(
                        currentPage - 1
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >

                    <ChevronLeft
                      size={18}
                    />

                  </button>

                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setPage(
                        currentPage + 1
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >

                    <ChevronRight
                      size={18}
                    />

                  </button>

                </div>

              </div>
            </>
          )}

        </div>

      </section>

    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6A63A]/10 text-[#D6A63A]">

          {icon}

        </div>

        <p className="text-3xl font-black text-[#073B4C]">

          {value}

        </p>

      </div>

      <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">

        {title}

      </p>

    </div>
  );
}

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">

      {children}

    </th>
  );
}

function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td className="px-6 py-5 align-middle text-sm">

      {children}

    </td>
  );
}