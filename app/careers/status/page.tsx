"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Loader2,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";

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

const stages = [
  "Application Submitted",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
];

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

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");
    setApplication(null);

    const id =
      applicationId.trim().toUpperCase();

    const mail =
      email.trim().toLowerCase();

    if (!id) {
      setError(
        "Please enter your Application ID."
      );
      return;
    }

    if (!mail) {
      setError(
        "Please enter your email address."
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
            "Application not found."
        );
      }

      setApplication(
        result.application
      );
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

  return (
    <main className="min-h-screen bg-[#F4F8FA]">

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#0B2535]
          px-5
          py-16
          text-white
        "
      >

        <div
          className="
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#176B87]/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-24
            h-80
            w-80
            rounded-full
            bg-[#F2C94C]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-4xl
          "
        >

          <Link
            href="/careers"
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-bold
              text-white/50
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={13} />
            Back to Careers
          </Link>

          <div className="mt-8 text-center">

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                text-[#F2C94C]
                ring-1
                ring-white/10
              "
            >
              <FileCheck2
                size={28}
              />
            </div>

            <p
              className="
                mt-5
                text-[9px]
                font-black
                uppercase
                tracking-[0.25em]
                text-[#F2C94C]
              "
            >
              Applicant Portal
            </p>

            <h1
              className="
                mt-3
                text-3xl
                font-black
                sm:text-4xl
              "
            >
              Track Your Application
            </h1>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-xs
                leading-6
                text-white/50
              "
            >
              Enter your Application ID and
              registered email address to view
              your current recruitment status.
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="px-5 py-8">

        <div className="mx-auto max-w-3xl">

          <form
            onSubmit={handleSubmit}
            className="
              rounded-[1.5rem]
              border
              border-[#DCE6EB]
              bg-white
              p-5
              shadow-[0_20px_60px_rgba(16,42,67,0.08)]
              sm:p-7
            "
          >

            <div className="grid gap-5 sm:grid-cols-2">

              {/* APPLICATION ID */}

              <div>

                <label
                  htmlFor="applicationId"
                  className="
                    block
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.1em]
                    text-[#526575]
                  "
                >
                  Application ID
                </label>

                <div className="relative mt-2">

                  <FileCheck2
                    size={15}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-[#8C9AA4]
                    "
                  />

                  <input
                    id="applicationId"
                    value={applicationId}
                    onChange={(e) =>
                      setApplicationId(
                        e.target.value
                      )
                    }
                    placeholder="Example: AJFT-2026-00001"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#DCE5EA]
                      bg-white
                      pl-10
                      pr-3
                      text-xs
                      font-mono
                      text-[#243B53]
                      outline-none
                      transition
                      placeholder:text-[#A7B1B8]
                      focus:border-[#176B87]
                      focus:ring-4
                      focus:ring-[#176B87]/10
                    "
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.1em]
                    text-[#526575]
                  "
                >
                  Registered Email
                </label>

                <div className="relative mt-2">

                  <Mail
                    size={15}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-[#8C9AA4]
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="your@email.com"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#DCE5EA]
                      bg-white
                      pl-10
                      pr-3
                      text-xs
                      text-[#243B53]
                      outline-none
                      transition
                      placeholder:text-[#A7B1B8]
                      focus:border-[#176B87]
                      focus:ring-4
                      focus:ring-[#176B87]/10
                    "
                  />

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
                  text-red-700
                "
              >

                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-[10px] leading-5">
                  {error}
                </p>

              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-5
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#102A43]
                to-[#176B87]
                text-xs
                font-black
                text-white
                shadow-lg
                transition
                hover:-translate-y-0.5
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Checking Application...
                </>
              ) : (
                <>
                  <Search size={15} />
                  Check Application Status
                  <ArrowRight
                    size={14}
                  />
                </>
              )}

            </button>

          </form>

        </div>

      </section>

      {/* =================================================
          RESULT
      ================================================= */}

      {application && (
        <section className="px-5 pb-16">

          <div className="mx-auto max-w-5xl">

            {/* SUMMARY */}

            <div
              className="
                overflow-hidden
                rounded-[1.5rem]
                bg-[#0B2535]
                text-white
                shadow-xl
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  p-6
                  sm:p-8
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F2C94C]">
                    Application Found
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    {application.fullName}
                  </h2>

                  <p className="mt-1 text-[10px] text-white/45">
                    {application.jobTitle}
                  </p>

                </div>

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-3
                  "
                >

                  <p className="text-[8px] uppercase tracking-wider text-white/35">
                    Application ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-black text-[#F2C94C]">
                    {application.applicationId}
                  </p>

                </div>

              </div>

            </div>

            {/* DETAILS */}

            <div
              className="
                mt-5
                grid
                gap-5
                md:grid-cols-2
              "
            >

              <InfoCard
                icon={<BriefcaseBusiness size={17} />}
                label="Position"
                value={
                  application.jobTitle
                }
              />

              <InfoCard
                icon={<User size={17} />}
                label="Department"
                value={
                  application.department
                }
              />

              <InfoCard
                icon={<MapPin size={17} />}
                label="Location"
                value={
                  application.location
                }
              />

              <InfoCard
                icon={<Mail size={17} />}
                label="Registered Email"
                value={
                  application.email
                }
              />

            </div>

            {/* STATUS */}

            <div
              className="
                mt-5
                rounded-[1.5rem]
                border
                border-[#DCE6EB]
                bg-white
                p-6
                shadow-sm
                sm:p-8
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#176B87]">
                    Recruitment Progress
                  </p>

                  <h3 className="mt-2 text-lg font-black text-[#243B53]">
                    {application.stage}
                  </h3>

                </div>

                <StatusBadge
                  status={
                    application.status
                  }
                />

              </div>

              <StatusTimeline
                currentStage={
                  application.stage
                }
                status={
                  application.status
                }
              />

            </div>

            {/* DATES + REMARKS */}

            <div
              className="
                mt-5
                grid
                gap-5
                md:grid-cols-2
              "
            >

              <div
                className="
                  rounded-[1.5rem]
                  border
                  border-[#DCE6EB]
                  bg-white
                  p-6
                "
              >

                <div className="flex items-center gap-3">

                  <Clock3
                    size={17}
                    className="text-[#176B87]"
                  />

                  <p className="text-xs font-black text-[#243B53]">
                    Application Timeline
                  </p>

                </div>

                <div className="mt-5 space-y-4">

                  <DateRow
                    label="Submitted"
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

                </div>

              </div>

              <div
                className="
                  rounded-[1.5rem]
                  border
                  border-[#DCE6EB]
                  bg-white
                  p-6
                "
              >

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    size={17}
                    className="text-[#176B87]"
                  />

                  <p className="text-xs font-black text-[#243B53]">
                    AJFT Remarks
                  </p>

                </div>

                <p className="mt-5 text-[10px] leading-6 text-[#718394]">

                  {application.remarks ||
                    "No additional remarks have been added at this stage."}

                </p>

              </div>

            </div>

            {/* FOOTER */}

            <div className="mt-7 text-center">

              <p className="text-[9px] leading-5 text-[#8997A2]">
                Please keep your Application ID
                for future communication with
                Anand Jivan Foundation Trust.
              </p>

              <Link
                href="/careers"
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DCE5EA]
                  bg-white
                  px-5
                  py-3
                  text-[10px]
                  font-black
                  text-[#176B87]
                  transition
                  hover:border-[#176B87]
                "
              >
                View Careers
                <ArrowRight size={13} />
              </Link>

            </div>

          </div>

        </section>
      )}

      {/* EMPTY */}

      {!application && !error && (
        <section className="px-5 pb-16">

          <div className="mx-auto max-w-3xl">

            <div
              className="
                rounded-[1.5rem]
                border
                border-[#DCE6EB]
                bg-white
                p-8
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#EEF6F8]
                  text-[#176B87]
                "
              >
                <FileCheck2
                  size={24}
                />
              </div>

              <h2 className="mt-5 text-lg font-black text-[#243B53]">
                Check your recruitment status
              </h2>

              <p className="mx-auto mt-2 max-w-md text-[10px] leading-5 text-[#8997A2]">
                Your Application ID was provided
                after successful submission.
                Enter it above together with the
                email address used in your
                application.
              </p>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-[1.25rem]
        border
        border-[#DCE6EB]
        bg-white
        p-5
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#EEF6F8]
          text-[#176B87]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[8px] font-black uppercase tracking-wider text-[#9AA6AE]">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-black text-[#243B53]">
          {value || "—"}
        </p>

      </div>

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
    normalized.includes("reject");

  const selected =
    normalized.includes("select");

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-4
        py-2
        text-[9px]
        font-black
        ${
          rejected
            ? "bg-red-50 text-red-600"
            : selected
            ? "bg-emerald-50 text-emerald-600"
            : "bg-[#EEF6F8] text-[#176B87]"
        }
      `}
    >

      {rejected ? (
        <XCircle size={12} />
      ) : selected ? (
        <CheckCircle2 size={12} />
      ) : (
        <Clock3 size={12} />
      )}

      {status}

    </span>
  );
}

/* =========================================================
   TIMELINE
========================================================= */

function StatusTimeline({
  currentStage,
  status,
}: {
  currentStage: string;
  status: string;
}) {
  const rejected =
    status
      .toLowerCase()
      .includes("reject");

  const currentIndex =
    stages.findIndex(
      (stage) =>
        stage.toLowerCase() ===
        currentStage.toLowerCase()
    );

  return (
    <div className="mt-8">

      <div className="space-y-0">

        {stages.map(
          (stage, index) => {
            const completed =
              currentIndex >= index;

            const active =
              currentIndex === index;

            return (
              <div
                key={stage}
                className="flex gap-4"
              >

                <div className="flex flex-col items-center">

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      ${
                        rejected &&
                        index >
                          currentIndex
                          ? "border-[#E5EAED] bg-white text-[#B4BEC5]"
                          : completed
                          ? "border-[#176B87] bg-[#176B87] text-white"
                          : "border-[#DCE5EA] bg-white text-[#A4AFB7]"
                      }
                    `}
                  >

                    {completed ? (
                      <CheckCircle2
                        size={16}
                      />
                    ) : (
                      <span className="text-[9px] font-black">
                        {index + 1}
                      </span>
                    )}

                  </div>

                  {index <
                    stages.length - 1 && (
                    <div
                      className={`
                        h-10
                        w-px
                        ${
                          currentIndex >
                          index
                            ? "bg-[#176B87]"
                            : "bg-[#E4EAED]"
                        }
                      `}
                    />
                  )}

                </div>

                <div
                  className={`
                    pb-7
                    pt-1
                    ${
                      active
                        ? "opacity-100"
                        : completed
                        ? "opacity-80"
                        : "opacity-40"
                    }
                  `}
                >

                  <p className="text-xs font-black text-[#243B53]">
                    {stage}
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-[#8997A2]">

                    {index === 0 &&
                      "Your application has been successfully received."}

                    {index === 1 &&
                      "The application is being reviewed by the recruitment team."}

                    {index === 2 &&
                      "The candidate has been shortlisted for the next stage."}

                    {index === 3 &&
                      "Interview or further assessment may be scheduled."}

                    {index === 4 &&
                      "Final recruitment decision."}

                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function DateRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#EEF2F4] pb-3 last:border-0 last:pb-0">

      <span className="text-[9px] font-bold text-[#8997A2]">
        {label}
      </span>

      <span className="text-[10px] font-black text-[#526575]">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
  value?: string
) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (Number.isNaN(
    date.getTime()
  )) {
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