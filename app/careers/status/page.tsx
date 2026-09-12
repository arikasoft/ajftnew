"use client";

import {
  FormEvent,
  ReactNode,
  useState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Loader2,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Application = {
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  status: string;
  stage: string;
  submittedAt?: string;
  updatedAt?: string;
  remarks?: string;
};

/* =========================================================
   RECRUITMENT STAGES
========================================================= */

const stages = [
  "Application Submitted",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CareerStatusPage() {
  const [applicationId, setApplicationId] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [application, setApplication] =
    useState<Application | null>(null);

  /* =======================================================
     SEARCH APPLICATION
  ======================================================= */

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");
    setApplication(null);

    const id =
      applicationId
        .trim()
        .toUpperCase();

    const mail =
      email
        .trim()
        .toLowerCase();

    if (!id) {
      setError(
        "Please enter your Application ID."
      );
      return;
    }

    if (!mail) {
      setError(
        "Please enter your registered email address."
      );
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          `/api/careers/status?applicationId=${encodeURIComponent(
            id
          )}&email=${encodeURIComponent(
            mail
          )}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept:
                "application/json",
            },
          }
        );

      const raw =
        await response.text();

      let result: any = null;

      try {
        result = raw
          ? JSON.parse(raw)
          : null;
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Application not found."
        );
      }

      setApplication(
        result.application
      );

      window.setTimeout(() => {
        document
          .getElementById(
            "application-result"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to check application status."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F5F7F4] text-[#173B34]">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-[#071F1A] text-white">

        {/* Ambient glow */}

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C7A866]/10 blur-[110px]" />

        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[580px] w-[580px] rounded-full bg-[#0C7768]/20 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFFFFF]/[0.025] blur-3xl" />

        {/* Grid */}

        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-[1480px] px-5 pb-20 pt-6 sm:px-8 lg:px-12">

          {/* TOP NAV */}

          <div className="flex items-center justify-between">

            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/50 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft
                size={13}
                className="transition group-hover:-translate-x-1"
              />

              Careers
            </Link>

            <div className="hidden items-center gap-2 sm:flex">

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C7A866]/20 bg-[#C7A866]/10 text-[#DCC58B]">

                <ShieldCheck
                  size={13}
                />

              </span>

              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/25">
                Secure Applicant Area
              </span>

            </div>

          </div>

          {/* HERO CONTENT */}

          <div className="mx-auto max-w-5xl pt-20 text-center sm:pt-24">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#C7A866]/20 bg-[#C7A866]/[0.08] px-4 py-2">

              <Sparkles
                size={12}
                className="text-[#DCC58B]"
              />

              <span className="text-[8px] font-black uppercase tracking-[0.32em] text-[#DCC58B]">
                Applicant Services
              </span>

            </div>

            <h1 className="mt-7 text-[44px] font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[78px]">

              Your journey.
              <span className="block text-[#DCC58B]">
                Your progress.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/40 sm:text-[15px]">

              Check the latest status of your
              application with Anand Jivan
              Foundation Trust using your
              Application ID and registered
              email address.

            </p>

            {/* HERO MINI STATS */}

            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">

              <HeroBadge
                icon={
                  <FileCheck2 size={13} />
                }
                text="Application Tracking"
              />

              <HeroBadge
                icon={
                  <ShieldCheck size={13} />
                }
                text="Secure Verification"
              />

              <HeroBadge
                icon={
                  <Clock3 size={13} />
                }
                text="Live Status"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          SEARCH SECTION
      =================================================== */}

      <section className="relative px-5 sm:px-8 lg:px-12">

        <div className="mx-auto -mt-9 max-w-5xl">

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2rem] border border-[#DCE7E2] bg-white shadow-[0_30px_100px_rgba(7,31,26,.12)]"
          >

            {/* top accent */}

            <div className="h-1 bg-gradient-to-r from-[#0C7768] via-[#DCC58B] to-[#0C7768]" />

            <div className="p-6 sm:p-8 lg:p-10">

              <div className="flex flex-col gap-2">

                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#A47F35]">
                  Application Lookup
                </p>

                <h2 className="text-2xl font-black tracking-[-0.03em] text-[#173B34] sm:text-3xl">
                  Find your application
                </h2>

                <p className="max-w-xl text-[10px] leading-5 text-[#82908B]">
                  Enter the details exactly as
                  submitted during your
                  application.
                </p>

              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">

                {/* APPLICATION ID */}

                <div>

                  <label
                    htmlFor="applicationId"
                    className="block text-[8px] font-black uppercase tracking-[0.15em] text-[#526A63]"
                  >
                    Application ID
                  </label>

                  <div className="relative mt-2">

                    <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-[#84948E]">

                      <FileCheck2
                        size={15}
                      />

                    </div>

                    <input
                      id="applicationId"
                      value={applicationId}
                      onChange={(event) =>
                        setApplicationId(
                          event.target.value
                        )
                      }
                      placeholder="AJFT-2026-00001"
                      autoComplete="off"
                      className="h-14 w-full rounded-2xl border border-[#D9E5E0] bg-[#FBFCFB] pl-11 pr-4 font-mono text-xs font-semibold uppercase text-[#173B34] outline-none transition placeholder:text-[#A9B4AF] focus:border-[#0C7768] focus:bg-white focus:ring-4 focus:ring-[#0C7768]/10"
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="block text-[8px] font-black uppercase tracking-[0.15em] text-[#526A63]"
                  >
                    Registered Email
                  </label>

                  <div className="relative mt-2">

                    <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-[#84948E]">

                      <Mail
                        size={15}
                      />

                    </div>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="h-14 w-full rounded-2xl border border-[#D9E5E0] bg-[#FBFCFB] pl-11 pr-4 text-xs font-semibold text-[#173B34] outline-none transition placeholder:text-[#A9B4AF] focus:border-[#0C7768] focus:bg-white focus:ring-4 focus:ring-[#0C7768]/10"
                    />

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#071F1A] px-7 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#0C7768] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Checking
                    </>
                  ) : (
                    <>
                      <Search size={15} />
                      Check Status
                      <ArrowRight
                        size={14}
                        className="transition group-hover:translate-x-0.5"
                      />
                    </>
                  )}

                </button>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">

                    <AlertCircle
                      size={17}
                    />

                  </div>

                  <div className="flex-1">

                    <p className="text-[10px] font-black text-red-800">
                      Unable to find application
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-red-600">
                      {error}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setError("")
                    }
                    className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                    aria-label="Close error"
                  >
                    <X size={14} />
                  </button>

                </div>
              )}

            </div>

          </form>

        </div>

      </section>

      {/* ===================================================
          RESULT
      =================================================== */}

      {application ? (
        <section
          id="application-result"
          className="px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14"
        >

          <div className="mx-auto max-w-6xl">

            {/* APPLICATION HEADER */}

            <div className="relative overflow-hidden rounded-[2rem] bg-[#071F1A] text-white shadow-[0_30px_100px_rgba(7,31,26,.15)]">

              <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#C7A866]/10 blur-[90px]" />

              <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#0C7768]/20 blur-[100px]" />

              <div className="relative p-6 sm:p-8 lg:p-10">

                <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex items-start gap-5">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#C7A866]/20 bg-[#C7A866]/10 text-[#DCC58B]">

                      <BadgeCheck
                        size={27}
                        strokeWidth={1.5}
                      />

                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-[8px] font-black uppercase tracking-[0.28em] text-[#DCC58B]">
                          Application Verified
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#DCC58B]/40" />

                        <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/25">
                          AJFT Careers
                        </span>

                      </div>

                      <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                        {application.fullName}
                      </h2>

                      <p className="mt-1 text-[10px] text-white/40">
                        {application.jobTitle}
                      </p>

                    </div>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl">

                    <p className="text-[7px] font-black uppercase tracking-[0.25em] text-white/25">
                      Application Reference
                    </p>

                    <p className="mt-2 font-mono text-sm font-black tracking-[0.08em] text-[#DCC58B]">
                      {application.applicationId}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* CURRENT STATUS */}

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_330px]">

              <div className="rounded-[2rem] border border-[#DCE7E2] bg-white p-6 shadow-[0_20px_70px_rgba(7,31,26,.06)] sm:p-8">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#A47F35]">
                      Current Recruitment Stage
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#173B34]">
                      {application.stage}
                    </h3>

                  </div>

                  <StatusBadge
                    status={
                      application.status
                    }
                  />

                </div>

                <PremiumTimeline
                  currentStage={
                    application.stage
                  }
                  status={
                    application.status
                  }
                />

              </div>

              {/* POSITION CARD */}

              <div className="overflow-hidden rounded-[2rem] border border-[#DCE7E2] bg-[#F9FBF9] shadow-sm">

                <div className="h-1 bg-gradient-to-r from-[#0C7768] to-[#DCC58B]" />

                <div className="p-6 sm:p-7">

                  <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#A47F35]">
                    Position Details
                  </p>

                  <h3 className="mt-5 text-xl font-black leading-tight text-[#173B34]">
                    {application.jobTitle}
                  </h3>

                  <p className="mt-2 text-[9px] leading-5 text-[#87958F]">
                    {application.department}
                  </p>

                  <div className="mt-6 space-y-2">

                    <DetailRow
                      icon={
                        <MapPin
                          size={13}
                        />
                      }
                      label="Location"
                      value={
                        application.location
                      }
                    />

                    <DetailRow
                      icon={
                        <BriefcaseBusiness
                          size={13}
                        />
                      }
                      label="Employment"
                      value={
                        application.employmentType
                      }
                    />

                    <DetailRow
                      icon={
                        <Mail
                          size={13}
                        />
                      }
                      label="Email"
                      value={
                        application.email
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* DETAILS */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <InfoPanel
                icon={
                  <Clock3
                    size={18}
                  />
                }
                eyebrow="Application Timeline"
                title="Important dates"
              >

                <DateRow
                  label="Application Submitted"
                  value={formatDate(
                    application.submittedAt
                  )}
                />

                <DateRow
                  label="Last Updated"
                  value={formatDate(
                    application.updatedAt
                  )}
                />

              </InfoPanel>

              <InfoPanel
                icon={
                  <ShieldCheck
                    size={18}
                  />
                }
                eyebrow="Recruitment Note"
                title="AJFT remarks"
              >

                <p className="text-[10px] leading-6 text-[#73847D]">

                  {application.remarks ||
                    "No additional remarks have been added at this stage. Please continue to monitor your application status."}

                </p>

              </InfoPanel>

            </div>

            {/* CONTACT */}

            <div className="mt-6 rounded-[2rem] border border-[#DCE7E2] bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#A47F35]">
                    What happens next?
                  </p>

                  <h3 className="mt-2 text-xl font-black text-[#173B34]">
                    Stay connected with AJFT.
                  </h3>

                  <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#87958F]">
                    If your application progresses
                    to the next stage, the recruitment
                    team may contact you using the
                    information provided in your
                    application.
                  </p>

                </div>

                <div className="flex flex-col gap-2 sm:flex-row">

                  <ContactChip
                    icon={
                      <Mail size={13} />
                    }
                    text="info@ajftrust.org"
                  />

                  <ContactChip
                    icon={
                      <span className="text-[11px]">
                        ☎
                      </span>
                    }
                    text="+91 9155751363"
                  />

                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F3EF] text-[#0C7768]">

                  <Check
                    size={15}
                  />

                </div>

                <p className="text-[9px] leading-4 text-[#87958F]">
                  Keep your Application ID for
                  future reference.
                </p>

              </div>

              <Link
                href="/careers"
                className="group inline-flex items-center gap-2 rounded-full bg-[#071F1A] px-7 py-3.5 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0C7768]"
              >
                Back to Careers

                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />

              </Link>

            </div>

          </div>

        </section>
      ) : (
        /* =================================================
           EMPTY STATE
        ================================================== */

        <section className="px-5 pb-20 pt-10 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-5xl">

            <div className="rounded-[2rem] border border-[#DCE7E2] bg-white p-8 text-center shadow-sm sm:p-12">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F3EF] text-[#0C7768]">

                <Search
                  size={25}
                  strokeWidth={1.6}
                />

              </div>

              <p className="mt-7 text-[8px] font-black uppercase tracking-[0.3em] text-[#A47F35]">
                Application Tracking
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#173B34]">
                Check where you stand.
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-[10px] leading-6 text-[#87958F]">
                Your Application ID and
                registered email are used to
                securely locate your recruitment
                record.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">

                <MiniFeature
                  icon={
                    <FileCheck2 size={16} />
                  }
                  title="Enter ID"
                />

                <MiniFeature
                  icon={
                    <ShieldCheck size={16} />
                  }
                  title="Verify Email"
                />

                <MiniFeature
                  icon={
                    <BadgeCheck size={16} />
                  }
                  title="View Status"
                />

              </div>

            </div>

          </div>

        </section>
      )}

      {/* ===================================================
          BOTTOM BRAND STRIP
      =================================================== */}

      <section className="border-t border-[#DCE7E2] bg-[#F9FBF9] px-5 py-8 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="text-center sm:text-left">

            <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#A47F35]">
              Anand Jivan Foundation Trust
            </p>

            <p className="mt-1 text-[9px] text-[#8B9893]">
              Building opportunity through
              meaningful community work.
            </p>

          </div>

          <div className="flex items-center gap-2 text-[8px] font-bold text-[#9AA6A1]">

            <ShieldCheck
              size={13}
              className="text-[#0C7768]"
            />

            Secure Applicant Services

          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   HERO BADGE
========================================================= */

function HeroBadge({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5">

      <span className="text-[#DCC58B]">
        {icon}
      </span>

      <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/35">
        {text}
      </span>

    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  const rejected =
    normalized.includes("reject") ||
    normalized.includes("cancel");

  const selected =
    normalized.includes("select");

  if (rejected) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-[8px] font-black uppercase tracking-[0.12em] text-red-600">

        <XCircle size={12} />

        {status}

      </span>
    );
  }

  if (selected) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[8px] font-black uppercase tracking-[0.12em] text-emerald-700">

        <CheckCircle2 size={12} />

        {status}

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F3EF] px-4 py-2 text-[8px] font-black uppercase tracking-[0.12em] text-[#0C7768]">

      <Clock3 size={12} />

      {status}

    </span>
  );
}

/* =========================================================
   PREMIUM TIMELINE
========================================================= */

function PremiumTimeline({
  currentStage,
  status,
}: {
  currentStage: string;
  status: string;
}) {
  const currentIndex =
    stages.findIndex(
      (stage) =>
        stage.toLowerCase() ===
        currentStage.toLowerCase()
    );

  const rejected =
    status
      .toLowerCase()
      .includes("reject");

  return (
    <div className="mt-9">

      {stages.map(
        (stage, index) => {
          const completed =
            currentIndex >= index;

          const active =
            currentIndex === index;

          const future =
            currentIndex < index;

          return (
            <div
              key={stage}
              className="flex gap-4"
            >

              {/* INDICATOR */}

              <div className="flex flex-col items-center">

                <div
                  className={`
                    relative
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition
                    ${
                      rejected &&
                      active
                        ? "border-red-200 bg-red-50 text-red-600"
                        : active
                        ? "border-[#C7A866] bg-[#071F1A] text-[#DCC58B] shadow-[0_0_0_5px_rgba(199,168,102,.08)]"
                        : completed
                        ? "border-[#0C7768] bg-[#E8F3EF] text-[#0C7768]"
                        : "border-[#DCE7E2] bg-white text-[#B2BDB8]"
                    }
                  `}
                >

                  {rejected &&
                  active ? (
                    <XCircle
                      size={17}
                    />
                  ) : completed ? (
                    <CheckCircle2
                      size={17}
                    />
                  ) : (
                    <span className="font-mono text-[9px] font-black">
                      0{index + 1}
                    </span>
                  )}

                </div>

                {index <
                  stages.length - 1 && (
                  <div
                    className={`
                      min-h-[52px]
                      w-px
                      ${
                        currentIndex >
                        index
                          ? "bg-[#0C7768]"
                          : "bg-[#E3EAE6]"
                      }
                    `}
                  />
                )}

              </div>

              {/* CONTENT */}

              <div
                className={`
                  pb-8
                  pt-1
                  ${
                    future
                      ? "opacity-35"
                      : "opacity-100"
                  }
                `}
              >

                <div className="flex flex-wrap items-center gap-2">

                  <p
                    className={`
                      text-xs
                      font-black
                      ${
                        active
                          ? "text-[#173B34]"
                          : "text-[#526A63]"
                      }
                    `}
                  >
                    {stage}
                  </p>

                  {active && (
                    <span className="rounded-full bg-[#DCC58B]/15 px-2 py-1 text-[7px] font-black uppercase tracking-wider text-[#9A752E]">
                      Current
                    </span>
                  )}

                </div>

                <p className="mt-1.5 max-w-xl text-[9px] leading-5 text-[#899791]">

                  {index === 0 &&
                    "Your application has been successfully received by the recruitment system."}

                  {index === 1 &&
                    "Your application is being reviewed by the recruitment team."}

                  {index === 2 &&
                    "Your profile has progressed to the shortlist stage."}

                  {index === 3 &&
                    "An interview or further assessment may be scheduled."}

                  {index === 4 &&
                    "Final recruitment decision and selection stage."}

                </p>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E5ECE8] bg-white px-3.5 py-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F3EF] text-[#0C7768]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[7px] font-black uppercase tracking-[0.12em] text-[#9AA6A1]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-[9px] font-bold text-[#526A63]">
          {value || "—"}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   INFO PANEL
========================================================= */

function InfoPanel({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-[#DCE7E2] bg-white p-6 shadow-sm sm:p-7">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3EF] text-[#0C7768]">
          {icon}
        </div>

        <div>

          <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[#A47F35]">
            {eyebrow}
          </p>

          <h3 className="mt-1 text-sm font-black text-[#173B34]">
            {title}
          </h3>

        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   DATE ROW
========================================================= */

function DateRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E8EFEB] pb-3 last:border-0 last:pb-0">

      <span className="text-[9px] font-semibold text-[#8A9892]">
        {label}
      </span>

      <span className="text-[10px] font-black text-[#526A63]">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   CONTACT CHIP
========================================================= */

function ContactChip({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE7E2] bg-[#F9FBF9] px-4 py-2.5">

      <span className="text-[#0C7768]">
        {icon}
      </span>

      <span className="text-[8px] font-bold text-[#667770]">
        {text}
      </span>

    </div>
  );
}

/* =========================================================
   MINI FEATURE
========================================================= */

function MiniFeature({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-[#E2EAE6] bg-[#FAFCFA] px-4 py-3">

      <span className="text-[#0C7768]">
        {icon}
      </span>

      <span className="text-[8px] font-black uppercase tracking-wider text-[#65756E]">
        {title}
      </span>

    </div>
  );
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
  value?: string
) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Not available";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}