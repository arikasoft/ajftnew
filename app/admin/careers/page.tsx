"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Loader2,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  Users,
  XCircle,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CareerApplication = {
  _id?: string;
  applicationId: string;

  jobId?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  employmentType?: string;

  fullName: string;
  email: string;
  phone?: string;

  dateOfBirth?: string;
  gender?: string;

  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  highestQualification?: string;
  university?: string;
  passingYear?: string;
  percentage?: string;

  experience?: string;
  currentOrganization?: string;
  currentDesignation?: string;
  totalExperience?: string;

  resume?: string;
  coverLetter?: string;

  declarationAccepted?: boolean;

  status?: string;
  stage?: string;
  adminRemarks?: string;

  approvedAt?: string;
  rejectedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Action =
  | "UNDER_REVIEW"
  | "SHORTLIST"
  | "INTERVIEW"
  | "APPROVE"
  | "REJECT";

const STATUS_OPTIONS = [
  "ALL",
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Approved",
  "Rejected",
];

/* =========================================================
   HELPERS
========================================================= */

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

function statusClasses(status?: string) {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";

    case "Shortlisted":
      return "bg-violet-50 text-violet-700 border-violet-200";

    case "Interview":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "Under Review":
      return "bg-sky-50 text-sky-700 border-sky-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminCareersPage() {
  const [applications, setApplications] =
    useState<CareerApplication[]>([]);

  const [selected, setSelected] =
    useState<CareerApplication | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [remarks, setRemarks] =
    useState("");

  /* =======================================================
     LOAD APPLICATIONS
  ======================================================= */

  async function loadApplications(
    showRefresh = false
  ) {
    try {
      setError("");

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      /*
       * This expects:
       * GET /api/admin/careers
       */

      const response = await fetch(
        "/api/admin/careers",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Unable to load career applications."
        );
      }

      setApplications(
        Array.isArray(result.applications)
          ? result.applications
          : []
      );
    } catch (err) {
      console.error(
        "ADMIN CAREERS LOAD ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load applications."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredApplications =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return applications.filter(
        (application) => {
          const matchesStatus =
            statusFilter === "ALL" ||
            application.status ===
              statusFilter;

          if (!matchesStatus) {
            return false;
          }

          if (!query) return true;

          return [
            application.applicationId,
            application.fullName,
            application.email,
            application.phone,
            application.jobTitle,
            application.department,
            application.city,
          ]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(query)
            );
        }
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    return {
      total: applications.length,

      submitted: applications.filter(
        (a) => a.status === "Submitted"
      ).length,

      review: applications.filter(
        (a) =>
          a.status === "Under Review"
      ).length,

      shortlisted: applications.filter(
        (a) =>
          a.status === "Shortlisted"
      ).length,

      interview: applications.filter(
        (a) =>
          a.status === "Interview"
      ).length,

      approved: applications.filter(
        (a) =>
          a.status === "Approved"
      ).length,

      rejected: applications.filter(
        (a) =>
          a.status === "Rejected"
      ).length,
    };
  }, [applications]);

  /* =======================================================
     OPEN APPLICATION
  ======================================================= */

  function openApplication(
    application: CareerApplication
  ) {
    setSelected(application);
    setRemarks(
      application.adminRemarks || ""
    );
    setSuccess("");
    setError("");
  }

  /* =======================================================
     ACTION
  ======================================================= */

  async function updateApplication(
    action: Action
  ) {
    if (!selected || actionLoading) {
      return;
    }

    const confirmed =
      action === "APPROVE"
        ? window.confirm(
            "Are you sure you want to APPROVE this application? The candidate will receive an email."
          )
        : action === "REJECT"
          ? window.confirm(
              "Are you sure you want to REJECT this application? The candidate will receive an email."
            )
          : true;

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          `/api/admin/careers/${encodeURIComponent(
            selected.applicationId
          )}/action`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              action,
              adminRemarks:
                remarks.trim(),
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Unable to update application."
        );
      }

      const updated =
        result.application;

      setSuccess(
        result.emailSent
          ? `${result.message} Candidate email sent successfully.`
          : `${result.message} Application updated, but candidate email could not be sent.`
      );

      setApplications((current) =>
        current.map((item) =>
          item.applicationId ===
          selected.applicationId
            ? {
                ...item,
                ...updated,
              }
            : item
        )
      );

      setSelected((current) =>
        current
          ? {
              ...current,
              ...updated,
            }
          : current
      );
    } catch (err) {
      console.error(
        "CAREER ACTION ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update application."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4F7F9]">

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-xl">

              <Loader2
                size={24}
                className="animate-spin"
              />

            </div>

            <p className="mt-4 text-xs font-black text-[#526575]">
              Loading Career Applications...
            </p>

          </div>

        </div>

      </main>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F4F7F9]">

      {/* ===================================================
          TOP BAR
      ==================================================== */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071D2B]/95 text-white shadow-xl backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">

            <Link
              href="/admin/internship"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
              title="Back"
            >
              <ArrowLeft size={15} />
            </Link>

            <div>

              <div className="flex items-center gap-2">

                <ShieldCheck
                  size={16}
                  className="text-[#F2C94C]"
                />

                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#F2C94C]">
                  AJFT ADMIN
                </span>

              </div>

              <h1 className="mt-0.5 text-lg font-black">
                Career Recruitment
              </h1>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              loadApplications(true)
            }
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-black transition hover:bg-white/10 disabled:opacity-50"
          >

            <RefreshCw
              size={14}
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

      {/* ===================================================
          CONTENT
      ==================================================== */}

      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:py-8">

        {/* =================================================
            TITLE
        ================================================== */}

        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#176B87]">
              Recruitment Management System
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#102A43]">
              Career Applications
            </h2>

            <p className="mt-2 max-w-2xl text-xs leading-6 text-[#82919C]">
              Review candidates, manage
              recruitment stages, approve
              applications and send automatic
              status notifications.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-[#DCE6EB] bg-white px-4 py-3 shadow-sm">

            <Users
              size={17}
              className="text-[#176B87]"
            />

            <div>

              <p className="text-[8px] font-black uppercase tracking-widest text-[#9AA7AF]">
                Total Candidates
              </p>

              <p className="text-lg font-black text-[#102A43]">
                {stats.total}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            ALERTS
        ================================================== */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle
              size={17}
              className="mt-0.5"
            />

            <div>

              <p className="text-xs font-black">
                Error
              </p>

              <p className="mt-1 text-[10px] leading-5">
                {error}
              </p>

            </div>

          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">

            <CheckCircle2
              size={17}
              className="mt-0.5"
            />

            <div>

              <p className="text-xs font-black">
                Application Updated
              </p>

              <p className="mt-1 text-[10px] leading-5">
                {success}
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            STATS
        ================================================== */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">

          <StatCard
            label="Total"
            value={stats.total}
            icon={<Users size={16} />}
          />

          <StatCard
            label="Submitted"
            value={stats.submitted}
            icon={<FileText size={16} />}
          />

          <StatCard
            label="Review"
            value={stats.review}
            icon={<Clock3 size={16} />}
          />

          <StatCard
            label="Shortlisted"
            value={stats.shortlisted}
            icon={<CheckCircle2 size={16} />}
          />

          <StatCard
            label="Interview"
            value={stats.interview}
            icon={<Users size={16} />}
          />

          <StatCard
            label="Approved"
            value={stats.approved}
            icon={<CheckCircle2 size={16} />}
          />

          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={<XCircle size={16} />}
          />

        </div>

        {/* =================================================
            FILTER
        ================================================== */}

        <div className="mt-6 rounded-2xl border border-[#DCE6EB] bg-white p-4 shadow-sm">

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
                placeholder="Search name, application ID, email, phone, position..."
                className="h-11 w-full rounded-xl border border-[#DCE5EA] bg-[#FAFCFD] pl-10 pr-4 text-xs text-[#243B53] outline-none transition focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="h-11 rounded-xl border border-[#DCE5EA] bg-[#FAFCFD] px-4 text-xs font-semibold text-[#243B53] outline-none focus:border-[#176B87]"
            >

              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status === "ALL"
                      ? "All Status"
                      : status}
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================== */}

        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#DCE6EB] bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-[#E8EEF1] px-5 py-4">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#176B87]">
                Applications
              </p>

              <p className="mt-1 text-xs font-bold text-[#526575]">
                Showing{" "}
                {filteredApplications.length}{" "}
                of{" "}
                {applications.length}
              </p>

            </div>

          </div>

          {filteredApplications.length ===
          0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead>

                  <tr className="border-b border-[#E8EEF1] bg-[#F8FAFB]">

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Candidate
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Position
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Contact
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Submitted
                    </th>

                    <th className="px-5 py-3 text-right text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredApplications.map(
                    (application) => (
                      <tr
                        key={
                          application.applicationId
                        }
                        className="border-b border-[#EEF2F4] transition hover:bg-[#F9FBFC]"
                      >

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102A43] text-white">
                              <User
                                size={16}
                              />
                            </div>

                            <div>

                              <p className="text-xs font-black text-[#243B53]">
                                {
                                  application.fullName
                                }
                              </p>

                              <p className="mt-1 font-mono text-[8px] text-[#176B87]">
                                {
                                  application.applicationId
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-4">

                          <p className="text-xs font-bold text-[#243B53]">
                            {application.jobTitle ||
                              "—"}
                          </p>

                          <p className="mt-1 text-[9px] text-[#8997A2]">
                            {application.department ||
                              "—"}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <p className="text-[10px] text-[#526575]">
                            {application.email}
                          </p>

                          <p className="mt-1 text-[10px] text-[#8997A2]">
                            {application.phone ||
                              "—"}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black ${statusClasses(
                              application.status
                            )}`}
                          >
                            {application.status ||
                              "Submitted"}
                          </span>

                        </td>

                        <td className="px-5 py-4 text-[9px] text-[#8997A2]">
                          {formatDate(
                            application.createdAt
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">

                          <button
                            type="button"
                            onClick={() =>
                              openApplication(
                                application
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2.5 text-[9px] font-black text-white transition hover:bg-[#176B87]"
                          >

                            <Eye size={13} />

                            Review

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

        </div>

      </div>

      {/* ===================================================
          DETAIL DRAWER
      ==================================================== */}

      {selected && (
        <div className="fixed inset-0 z-50">

          <button
            type="button"
            aria-label="Close"
            onClick={() =>
              setSelected(null)
            }
            className="absolute inset-0 bg-[#071D2B]/60 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">

            {/* HEADER */}

            <div className="shrink-0 bg-[#071D2B] px-5 py-5 text-white sm:px-7">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#F2C94C]">
                    Application Review
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    {selected.fullName}
                  </h2>

                  <p className="mt-1 font-mono text-[9px] text-white/45">
                    {selected.applicationId}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelected(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                >
                  <XCircle
                    size={16}
                  />
                </button>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                <span
                  className={`rounded-full border px-3 py-1.5 text-[8px] font-black ${statusClasses(
                    selected.status
                  )}`}
                >
                  {selected.status ||
                    "Submitted"}
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[8px] font-bold text-white/60">
                  {selected.stage ||
                    "Application Submitted"}
                </span>

              </div>

            </div>

            {/* BODY */}

            <div className="flex-1 overflow-y-auto">

              <div className="space-y-6 p-5 sm:p-7">

                {/* POSITION */}

                <DetailSection
                  title="Position Details"
                  icon={
                    <FileText size={15} />
                  }
                >

                  <DetailGrid>

                    <DetailItem
                      label="Position"
                      value={
                        selected.jobTitle
                      }
                    />

                    <DetailItem
                      label="Department"
                      value={
                        selected.department
                      }
                    />

                    <DetailItem
                      label="Location"
                      value={
                        selected.location
                      }
                    />

                    <DetailItem
                      label="Employment"
                      value={
                        selected.employmentType
                      }
                    />

                  </DetailGrid>

                </DetailSection>

                {/* PERSONAL */}

                <DetailSection
                  title="Candidate Information"
                  icon={
                    <User size={15} />
                  }
                >

                  <DetailGrid>

                    <DetailItem
                      label="Full Name"
                      value={
                        selected.fullName
                      }
                    />

                    <DetailItem
                      label="Gender"
                      value={
                        selected.gender
                      }
                    />

                    <DetailItem
                      label="Date of Birth"
                      value={
                        selected.dateOfBirth
                      }
                    />

                    <DetailItem
                      label="Phone"
                      value={
                        selected.phone
                      }
                    />

                    <DetailItem
                      label="Email"
                      value={
                        selected.email
                      }
                    />

                  </DetailGrid>

                </DetailSection>

                {/* ADDRESS */}

                <DetailSection
                  title="Address"
                  icon={
                    <MapPin size={15} />
                  }
                >

                  <p className="text-xs leading-6 text-[#526575]">

                    {[
                      selected.address,
                      selected.city,
                      selected.state,
                      selected.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ") ||
                      "—"}

                  </p>

                </DetailSection>

                {/* EDUCATION */}

                <DetailSection
                  title="Education"
                  icon={
                    <FileText size={15} />
                  }
                >

                  <DetailGrid>

                    <DetailItem
                      label="Highest Qualification"
                      value={
                        selected.highestQualification
                      }
                    />

                    <DetailItem
                      label="University"
                      value={
                        selected.university
                      }
                    />

                    <DetailItem
                      label="Passing Year"
                      value={
                        selected.passingYear
                      }
                    />

                    <DetailItem
                      label="Percentage"
                      value={
                        selected.percentage
                      }
                    />

                  </DetailGrid>

                </DetailSection>

                {/* EXPERIENCE */}

                <DetailSection
                  title="Professional Experience"
                  icon={
                    <Users size={15} />
                  }
                >

                  <DetailGrid>

                    <DetailItem
                      label="Experience"
                      value={
                        selected.experience
                      }
                    />

                    <DetailItem
                      label="Total Experience"
                      value={
                        selected.totalExperience
                      }
                    />

                    <DetailItem
                      label="Organization"
                      value={
                        selected.currentOrganization
                      }
                    />

                    <DetailItem
                      label="Designation"
                      value={
                        selected.currentDesignation
                      }
                    />

                  </DetailGrid>

                </DetailSection>

                {/* COVER LETTER */}

                <DetailSection
                  title="Cover Letter"
                  icon={
                    <FileText size={15} />
                  }
                >

                  <div className="rounded-xl bg-[#F7F9FA] p-4 text-xs leading-6 text-[#526575]">

                    {selected.coverLetter ||
                      "No cover letter provided."}

                  </div>

                </DetailSection>

                {/* ADMIN REMARKS */}

                <DetailSection
                  title="Admin Remarks"
                  icon={
                    <ShieldCheck size={15} />
                  }
                >

                  <textarea
                    value={remarks}
                    onChange={(e) =>
                      setRemarks(
                        e.target.value
                      )
                    }
                    rows={5}
                    placeholder="Write internal remarks about this candidate..."
                    className="w-full resize-none rounded-xl border border-[#DCE5EA] bg-white p-3 text-xs leading-5 text-[#243B53] outline-none focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
                  />

                </DetailSection>

                {/* SUBMITTED */}

                <div className="rounded-xl border border-[#E4ECEF] bg-[#F8FAFB] p-4">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="text-[8px] font-black uppercase tracking-widest text-[#9AA7AF]">
                        Submitted
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-[#526575]">
                        {formatDate(
                          selected.createdAt
                        )}
                      </p>

                    </div>

                    {selected.email && (
                      <a
                        href={`mailto:${selected.email}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[9px] font-black text-[#176B87] shadow-sm ring-1 ring-[#DCE6EB]"
                      >
                        <Mail size={13} />
                        Email
                      </a>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* ACTION BAR */}

            <div className="shrink-0 border-t border-[#E5ECEF] bg-[#F8FAFB] p-4 sm:p-5">

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">

                <ActionButton
                  label="Review"
                  onClick={() =>
                    updateApplication(
                      "UNDER_REVIEW"
                    )
                  }
                  loading={
                    actionLoading
                  }
                  disabled={
                    selected.status ===
                    "Under Review"
                  }
                  tone="blue"
                />

                <ActionButton
                  label="Shortlist"
                  onClick={() =>
                    updateApplication(
                      "SHORTLIST"
                    )
                  }
                  loading={
                    actionLoading
                  }
                  disabled={
                    selected.status ===
                    "Shortlisted"
                  }
                  tone="violet"
                />

                <ActionButton
                  label="Interview"
                  onClick={() =>
                    updateApplication(
                      "INTERVIEW"
                    )
                  }
                  loading={
                    actionLoading
                  }
                  disabled={
                    selected.status ===
                    "Interview"
                  }
                  tone="amber"
                />

                <ActionButton
                  label="Approve"
                  onClick={() =>
                    updateApplication(
                      "APPROVE"
                    )
                  }
                  loading={
                    actionLoading
                  }
                  disabled={
                    selected.status ===
                    "Approved"
                  }
                  tone="green"
                />

                <ActionButton
                  label="Reject"
                  onClick={() =>
                    updateApplication(
                      "REJECT"
                    )
                  }
                  loading={
                    actionLoading
                  }
                  disabled={
                    selected.status ===
                    "Rejected"
                  }
                  tone="red"
                />

              </div>

              <p className="mt-3 text-center text-[8px] text-[#9AA7AF]">
                Status changes are saved to
                MongoDB. Candidate notifications
                are sent automatically.
              </p>

            </div>

          </aside>

        </div>
      )}

    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#DCE6EB] bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF6F8] text-[#176B87]">
          {icon}
        </div>

        <span className="text-xl font-black text-[#102A43]">
          {value}
        </span>

      </div>

      <p className="mt-3 text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   DETAIL SECTION
========================================================= */

function DetailSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>

      <div className="mb-3 flex items-center gap-2">

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#102A43] text-white">
          {icon}
        </div>

        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#526575]">
          {title}
        </h3>

      </div>

      {children}

    </section>
  );
}

/* =========================================================
   DETAIL GRID
========================================================= */

function DetailGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {children}
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-[#E6EDF0] bg-[#FAFCFD] p-3">

      <p className="text-[7px] font-black uppercase tracking-widest text-[#9AA7AF]">
        {label}
      </p>

      <p className="mt-1.5 break-words text-[10px] font-semibold leading-5 text-[#526575]">
        {value || "—"}
      </p>

    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  label,
  onClick,
  loading,
  disabled,
  tone,
}: {
  label: string;
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  tone:
    | "blue"
    | "violet"
    | "amber"
    | "green"
    | "red";
}) {
  const tones = {
    blue:
      "bg-sky-600 hover:bg-sky-700",
    violet:
      "bg-violet-600 hover:bg-violet-700",
    amber:
      "bg-amber-500 hover:bg-amber-600",
    green:
      "bg-emerald-600 hover:bg-emerald-700",
    red:
      "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`h-10 rounded-xl px-2 text-[9px] font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${tones[tone]}`}
    >
      {loading ? (
        <Loader2
          size={13}
          className="mx-auto animate-spin"
        />
      ) : (
        label
      )}
    </button>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF6F8] text-[#176B87]">
        <FileText size={26} />
      </div>

      <h3 className="mt-5 text-sm font-black text-[#243B53]">
        No applications found
      </h3>

      <p className="mt-2 max-w-sm text-[10px] leading-5 text-[#8997A2]">
        No career applications match the
        current search or status filter.
      </p>

    </div>
  );
}