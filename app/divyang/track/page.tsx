"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  HeartHandshake,
  Loader2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  XCircle,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type StatusHistory = {
  status: string;
  message?: string;
  createdAt?: string;
};

type ApplicationData = {
  _id?: string;

  applicationId: string;

  fullName: string;

  mobile: string;

  email?: string;

  fatherName?: string;

  dateOfBirth?: string;

  gender?: string;

  district?: string;

  state?: string;

  address?: string;

  pincode?: string;

  disabilityType?: string;

  disabilityPercentage?: string | number;

  status: string;

  createdAt?: string;

  updatedAt?: string;

  statusHistory?: StatusHistory[];
};

/* =========================================================
   STATUS CONFIGURATION
========================================================= */

const statusConfig: Record<
  string,
  {
    label: string;
    icon: typeof ClipboardList;
    className: string;
    iconBg: string;
    badgeClass: string;
  }
> = {
  submitted: {
    label: "Application Submitted",
    icon: ClipboardList,
    className: "bg-blue-500",
    iconBg: "bg-blue-500",
    badgeClass:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  pending: {
    label: "Application Submitted",
    icon: ClipboardList,
    className: "bg-blue-500",
    iconBg: "bg-blue-500",
    badgeClass:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  under_review: {
    label: "Under Review",
    icon: FileSearch,
    className: "bg-amber-500",
    iconBg: "bg-amber-500",
    badgeClass:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  "under review": {
    label: "Under Review",
    icon: FileSearch,
    className: "bg-amber-500",
    iconBg: "bg-amber-500",
    badgeClass:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  verified: {
    label: "Documents Verified",
    icon: ShieldCheck,
    className: "bg-violet-500",
    iconBg: "bg-violet-500",
    badgeClass:
      "border-violet-200 bg-violet-50 text-violet-700",
  },

  approved: {
    label: "Application Approved",
    icon: CheckCircle2,
    className: "bg-emerald-500",
    iconBg: "bg-emerald-500",
    badgeClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  benefit_processing: {
    label: "Benefit Processing",
    icon: HeartHandshake,
    className: "bg-cyan-500",
    iconBg: "bg-cyan-500",
    badgeClass:
      "border-cyan-200 bg-cyan-50 text-cyan-700",
  },

  completed: {
    label: "Support Completed",
    icon: UserRoundCheck,
    className: "bg-green-600",
    iconBg: "bg-green-600",
    badgeClass:
      "border-green-200 bg-green-50 text-green-700",
  },

  rejected: {
    label: "Application Closed",
    icon: XCircle,
    className: "bg-red-500",
    iconBg: "bg-red-500",
    badgeClass:
      "border-red-200 bg-red-50 text-red-700",
  },
};

/* =========================================================
   HELPERS
========================================================= */

function normalizeStatus(status?: string) {
  if (!status) {
    return "submitted";
  }

  return status
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function formatStatus(status?: string) {
  if (!status) {
    return "Application Submitted";
  }

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function DivyangTrackPage() {
  const [applicationId, setApplicationId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const [error, setError] =
    useState("");

  const [application, setApplication] =
    useState<ApplicationData | null>(null);

  /* =======================================================
     SEARCH APPLICATION
  ======================================================= */

  async function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const id =
      applicationId
        .trim()
        .toUpperCase();

    if (!id) {
      setError(
        "Please enter your Application ID."
      );

      setApplication(null);

      return;
    }

    setLoading(true);

    setError("");

    setApplication(null);

    setSearched(true);

    try {
      const response =
        await fetch(
          `/api/divyang/track?applicationId=${encodeURIComponent(
            id
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Application could not be found."
        );
      }

      const applicationData =
        data.application ||
        data.data ||
        null;

      if (!applicationData) {
        throw new Error(
          "Application could not be found."
        );
      }

      setApplication(applicationData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to track application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     CURRENT STATUS
  ======================================================= */

  const normalizedStatus =
    normalizeStatus(
      application?.status
    );

  const currentConfig =
    statusConfig[
      normalizedStatus
    ] || {
      label: formatStatus(
        application?.status
      ),

      icon: ClipboardList,

      className:
        "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]",

      iconBg:
        "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]",

      badgeClass:
        "border-indigo-200 bg-indigo-50 text-indigo-700",
    };

  const CurrentIcon =
    currentConfig.icon;

  /* =======================================================
     STATUS TIMELINE
  ======================================================= */

  const timeline =
    application?.statusHistory?.length
      ? application.statusHistory
      : application
        ? [
            {
              status:
                application.status,

              message:
                "Your application has been received successfully and is currently being processed by Anand Jivan Foundation Trust.",

              createdAt:
                application.createdAt,
            },
          ]
        : [];

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC]">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#111827] via-[#312E81] to-[#6D28D9]">

        {/* Decorative background */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute left-[-100px] top-[-120px] h-[320px] w-[320px] rounded-full bg-orange-400/10 blur-3xl" />

          <div className="absolute right-[-100px] top-[40px] h-[300px] w-[300px] rounded-full bg-purple-300/10 blur-3xl" />

          <div className="absolute bottom-[-120px] left-[30%] h-[250px] w-[250px] rounded-full bg-indigo-300/10 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-9 sm:px-8 lg:px-10">

          {/* Back button */}

          <Link
            href="/apply"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Application
          </Link>

          {/* Hero Content */}

          <div className="mt-10 max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-orange-200 backdrop-blur-md">

              <Sparkles size={13} />

              AJFT Digital Service Portal

            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">

              Track Your

              <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">

                Divyang Application

              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-indigo-100/70 sm:text-base">

              Check your application progress, review status,
              verification updates and support processing details
              using your unique AJFT Application Reference ID.

            </p>

          </div>

        </div>

        {/* Bottom curve */}

        <div className="absolute bottom-[-1px] left-0 w-full">

          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            className="h-[55px] w-full sm:h-[80px]"
          >
            <path
              d="
                M0 50
                C170 110 330 105 530 58
                C700 18 860 20 1030 68
                C1200 115 1330 100 1440 45
                L1440 110
                L0 110
                Z
              "
              fill="#F8FAFC"
            />
          </svg>

        </div>

      </section>

      {/* ===================================================
          SEARCH CARD
      =================================================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-4xl px-5 sm:px-8">

        <div className="rounded-[28px] border border-white bg-white p-4 shadow-2xl shadow-indigo-950/10 sm:p-6">

          <div className="mb-5 text-center">

            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">

              Application Lookup

            </p>

            <h2 className="mt-2 text-xl font-black text-[#1E1B4B]">

              Enter Your Application Reference

            </h2>

          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >

            {/* Input */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={applicationId}
                onChange={(event) =>
                  setApplicationId(
                    event.target.value.toUpperCase()
                  )
                }
                placeholder="AJFT-DIV-2026-XXXXXXXX"
                autoComplete="off"
                spellCheck={false}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-12
                  pr-4
                  text-sm
                  font-bold
                  tracking-wide
                  text-[#1E1B4B]
                  outline-none
                  transition-all
                  duration-300
                  placeholder:font-medium
                  placeholder:text-slate-400
                  focus:border-[#7C3AED]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-purple-500/10
                "
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#F97316]
                to-[#EA580C]
                px-7
                text-sm
                font-black
                text-white
                shadow-lg
                shadow-orange-500/25
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-orange-500/30
                active:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Checking...
                </>
              ) : (
                <>
                  <Search size={17} />

                  Track Application
                </>
              )}

            </button>

          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-center">

            <ShieldCheck
              size={14}
              className="text-emerald-500"
            />

            <p className="text-[11px] leading-5 text-slate-400">

              Your unique Application ID is generated automatically
              after successful submission.

            </p>

          </div>

        </div>

      </section>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (

        <section className="mx-auto max-w-4xl px-5 pt-6 sm:px-8">

          <div className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-white p-5 shadow-sm">

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500">

                <XCircle size={20} />

              </div>

              <div>

                <h3 className="text-sm font-black text-red-700">

                  Unable to Find Application

                </h3>

                <p className="mt-1.5 text-sm leading-6 text-red-600">

                  {error}

                </p>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* ===================================================
          APPLICATION RESULT
      =================================================== */}

      {application && (

        <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:py-12">

          <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-2xl shadow-indigo-950/5">

            {/* ===============================================
                APPLICATION STATUS HEADER
            =============================================== */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] via-[#312E81] to-[#4338CA] px-5 py-7 sm:px-8">

              {/* Decorative */}

              <div className="absolute right-[-70px] top-[-70px] h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />

              <div className="absolute bottom-[-100px] left-[40%] h-48 w-48 rounded-full bg-purple-300/10 blur-3xl" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Status */}

                <div>

                  <div className="flex items-center gap-2">

                    <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">

                      Current Application Status

                    </p>

                  </div>

                  <div className="mt-4 flex items-center gap-4">

                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${currentConfig.iconBg} text-white shadow-lg`}
                    >

                      <CurrentIcon size={25} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-black text-white">

                        {currentConfig.label}

                      </h2>

                      <p className="mt-1 text-xs leading-5 text-white/55">

                        Your latest application processing update.

                      </p>

                    </div>

                  </div>

                </div>

                {/* Application ID */}

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl lg:min-w-[280px]">

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/45">

                    Application Reference

                  </p>

                  <p className="mt-2 break-all text-sm font-black tracking-wide text-orange-300">

                    {application.applicationId}

                  </p>

                  <p className="mt-2 text-[10px] text-white/40">

                    Keep this ID safe for future tracking.

                  </p>

                </div>

              </div>

            </div>

            {/* ===============================================
                STATUS BADGE
            =============================================== */}

            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-8">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={16}
                    className="text-indigo-500"
                  />

                  <span className="text-xs font-bold text-slate-500">

                    Application Status

                  </span>

                </div>

                <div
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${currentConfig.badgeClass}`}
                >

                  {currentConfig.label}

                </div>

              </div>

            </div>

            {/* ===============================================
                APPLICANT DETAILS
            =============================================== */}

            <div className="p-5 sm:p-8">

              <div className="mb-5">

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">

                  Applicant Information

                </p>

                <h3 className="mt-1 text-2xl font-black text-[#1E1B4B]">

                  Application Details

                </h3>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <DetailCard
                  label="Applicant Name"
                  value={application.fullName}
                />

                <DetailCard
                  label="Mobile Number"
                  value={application.mobile}
                />

                <DetailCard
                  label="Location"
                  value={
                    [
                      application.district,
                      application.state,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"
                  }
                />

                <DetailCard
                  label="Disability Information"
                  value={
                    application.disabilityType
                      ? `${application.disabilityType}${
                          application.disabilityPercentage !==
                            undefined &&
                          application.disabilityPercentage !==
                            ""
                            ? ` • ${application.disabilityPercentage}%`
                            : ""
                        }`
                      : "—"
                  }
                />

              </div>

            </div>

            {/* ===============================================
                TIMELINE
            =============================================== */}

            <div className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-8">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">

                    Processing Journey

                  </p>

                  <h3 className="mt-1 text-2xl font-black text-[#1E1B4B]">

                    Application Updates

                  </h3>

                  <p className="mt-2 text-sm text-slate-500">

                    Follow the latest progress of your application.

                  </p>

                </div>

              </div>

              <div className="mt-7">

                <div className="space-y-6">

                  {timeline.map(
                    (item, index) => {

                      const normalized =
                        normalizeStatus(
                          item.status
                        );

                      const config =
                        statusConfig[
                          normalized
                        ] ||
                        currentConfig;

                      const Icon =
                        config.icon;

                      return (

                        <div
                          key={`${item.status}-${index}`}
                          className="relative flex gap-4 sm:gap-5"
                        >

                          {/* Timeline line */}

                          {index !==
                            timeline.length - 1 && (

                            <div className="absolute left-5 top-12 h-[calc(100%+12px)] w-[2px] bg-gradient-to-b from-indigo-200 to-slate-200" />

                          )}

                          {/* Timeline icon */}

                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconBg} text-white shadow-md`}
                          >

                            <Icon size={18} />

                          </div>

                          {/* Content */}

                          <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                              <h4 className="text-sm font-black text-[#1E1B4B]">

                                {config.label}

                              </h4>

                              <span className="text-[10px] font-medium text-slate-400">

                                {formatDate(
                                  item.createdAt
                                )}

                              </span>

                            </div>

                            {item.message && (

                              <p className="mt-2 text-sm leading-6 text-slate-500">

                                {item.message}

                              </p>

                            )}

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* ===================================================
          EMPTY STATE / INFORMATION CARDS
      =================================================== */}

      {!searched &&
        !application && (

          <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">

            <div className="mb-7 text-center">

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">

                How It Works

              </p>

              <h2 className="mt-2 text-2xl font-black text-[#1E1B4B]">

                Simple & Transparent Application Tracking

              </h2>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              <InfoCard
                icon={
                  <ClipboardList
                    size={21}
                  />
                }

                title="Application ID"

                text="Use the unique AJFT Divyang Application ID generated after successful submission."
              />

              <InfoCard
                icon={
                  <FileSearch
                    size={21}
                  />
                }

                title="Track Progress"

                text="View review, verification, approval and application processing updates."
              />

              <InfoCard
                icon={
                  <HeartHandshake
                    size={21}
                  />
                }

                title="Stay Updated"

                text="Eligible applications are processed according to programme guidelines and availability."
              />

            </div>

          </section>

        )}

      {/* ===================================================
          FOOTER SPACE
      =================================================== */}

      <div className="h-10" />

    </main>
  );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (

    <div className="group rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md">

      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">

        {label}

      </p>

      <p className="mt-2 break-words text-sm font-black leading-6 text-[#1E1B4B]">

        {value}

      </p>

    </div>

  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (

    <div className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-950/5">

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-100 text-[#6D28D9] transition-transform duration-300 group-hover:scale-110">

        {icon}

      </div>

      <h3 className="mt-5 text-base font-black text-[#1E1B4B]">

        {title}

      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">

        {text}

      </p>

    </div>

  );
}