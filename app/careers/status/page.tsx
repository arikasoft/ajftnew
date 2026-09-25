"use client";

import { useState } from "react";

type Candidate = {
  applicationId?: string;
  fullName?: string;
  email?: string;

  mobile?: string;
  phone?: string;
  mobileNumber?: string;
  contactNumber?: string;

  jobTitle?: string;
  department?: string;
  location?: string;
  employmentType?: string;

  appliedDate?: string;
  applicationDate?: string;
  createdAt?: string;
  submittedAt?: string;

  status?: string;
  currentStage?: string;
};

const stages = [
  {
    no: 1,
    title: "Application Submitted",
    short: "Submitted",
    description:
      "Application successfully received by the recruitment system.",
  },
  {
    no: 2,
    title: "Under Review",
    short: "Review",
    description:
      "Application is being reviewed by the recruitment team.",
  },
  {
    no: 3,
    title: "Shortlisted",
    short: "Shortlisted",
    description:
      "Candidate profile has progressed to the shortlist stage.",
  },
  {
    no: 4,
    title: "Interview",
    short: "Interview",
    description:
      "Interview or further assessment may be scheduled.",
  },
  {
    no: 5,
    title: "Selected",
    short: "Selected",
    description:
      "Candidate has progressed to the selection stage.",
  },
  {
    no: 6,
    title: "Document Verification",
    short: "Verification",
    description:
      "Required documents are being verified.",
  },
  {
    no: 7,
    title: "Appointment",
    short: "Appointment",
    description:
      "Final appointment and joining formalities.",
  },
];

function getStageNumber(candidate?: Candidate | null) {
  const value = String(
    candidate?.status ||
      candidate?.currentStage ||
      ""
  )
    .toLowerCase()
    .trim();

  if (
    value.includes("appointment") ||
    value.includes("joined")
  ) {
    return 7;
  }

  if (
    value.includes("document") ||
    value.includes("verification")
  ) {
    return 6;
  }

  if (value.includes("selected")) {
    return 5;
  }

  if (value.includes("interview")) {
    return 4;
  }

  if (
    value.includes("shortlist") ||
    value.includes("shortlisted")
  ) {
    return 3;
  }

  if (
    value.includes("review") ||
    value.includes("under review")
  ) {
    return 2;
  }

  return 1;
}

/* ============================================================
   SAFE VALUE HELPERS
============================================================ */

function firstValue(
  ...values: unknown[]
): string {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value).trim();
    }
  }

  return "";
}

/* ============================================================
   MOBILE
============================================================ */

function getMobile(candidate: Candidate) {
  return firstValue(
    candidate.mobile,
    candidate.mobileNumber,
    candidate.phone,
    candidate.contactNumber
  );
}

/* ============================================================
   DATE
============================================================ */

function formatApplicationDate(
  candidate: Candidate
) {
  const value = firstValue(
    candidate.appliedDate,
    candidate.applicationDate,
    candidate.createdAt,
    candidate.submittedAt
  );

  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
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

/* ============================================================
   MAIN PAGE
============================================================ */

export default function RecruitmentStatusPage() {
  const [applicationId, setApplicationId] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [candidate, setCandidate] =
    useState<Candidate | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function checkStatus(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError("");
    setCandidate(null);

    if (
      !applicationId.trim() ||
      !email.trim()
    ) {
      setError(
        "Please enter Application ID and Registered Email."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/careers/status?applicationId=${encodeURIComponent(
          applicationId.trim()
        )}&email=${encodeURIComponent(
          email.trim()
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
            "Application record not found."
        );
      }

      const data =
        result.application ||
        result.candidate ||
        result.data;

      if (!data) {
        throw new Error(
          "Candidate information was not returned by the server."
        );
      }

      setCandidate(data);
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

  const currentStage =
    getStageNumber(candidate);

  const mobile =
    candidate
      ? getMobile(candidate)
      : "";

  const appliedDate =
    candidate
      ? formatApplicationDate(candidate)
      : "—";

  const currentStageData =
    stages[currentStage - 1];

  return (
    <main className="min-h-screen bg-[#eef2f5] text-slate-800">

      {/* =====================================================
          GOVERNMENT TOP BAR
      ====================================================== */}

      <div className="bg-[#063b5c] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[10px]">

          <span className="font-medium">
            Official Recruitment Portal
          </span>

          <span>
            Anand Jivan Foundation Trust
          </span>

        </div>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b-4 border-[#eab308] bg-white shadow-sm">

        <div className="mx-auto max-w-6xl px-4 py-3">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#063b5c] text-white shadow-sm">

              <div className="text-center">
                <div className="text-[11px] font-black">
                  AJFT
                </div>

                <div className="text-[6px]">
                  TRUST
                </div>
              </div>

            </div>

            <div>

              <h1 className="text-base font-bold text-[#063b5c]">
                Anand Jivan Foundation Trust
              </h1>

              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                Recruitment Status Portal
              </p>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-3 py-5">

        {/* SEARCH */}
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 bg-[#f8fafc] px-4 py-3">

            <h2 className="text-sm font-bold text-[#063b5c]">
              Check Recruitment Status
            </h2>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Enter your application credentials below.
            </p>

          </div>

          <form
            onSubmit={checkStatus}
            className="grid gap-3 p-4 md:grid-cols-[1fr_1fr_auto]"
          >

            {/* APPLICATION ID */}

            <div>

              <label className="mb-1 block text-[10px] font-bold text-slate-600">
                Application ID
              </label>

              <input
                value={applicationId}
                onChange={(event) =>
                  setApplicationId(
                    event.target.value.toUpperCase()
                  )
                }
                placeholder="AJFT-2026-86472"
                className="h-9 w-full rounded-md border border-slate-300 px-3 text-xs outline-none transition focus:border-[#063b5c] focus:ring-2 focus:ring-[#063b5c]/10"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="mb-1 block text-[10px] font-bold text-slate-600">
                Registered Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="candidate@email.com"
                className="h-9 w-full rounded-md border border-slate-300 px-3 text-xs outline-none transition focus:border-[#063b5c] focus:ring-2 focus:ring-[#063b5c]/10"
              />

            </div>

            {/* BUTTON */}

            <div className="flex items-end">

              <button
                type="submit"
                disabled={loading}
                className="h-9 w-full rounded-md bg-[#063b5c] px-5 text-xs font-bold text-white shadow-sm transition hover:bg-[#07527d] disabled:opacity-60 md:w-auto"
              >
                {loading
                  ? "Checking..."
                  : "Check Status"}
              </button>

            </div>

          </form>

          {error && (
            <div className="mx-4 mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-semibold text-red-700">
              {error}
            </div>
          )}

        </div>

        {/* ===================================================
            RESULT
        ==================================================== */}

        {candidate && (
          <div className="mt-4 space-y-4">

            {/* CANDIDATE INFORMATION */}

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

              <div className="flex flex-col gap-2 bg-[#063b5c] px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="text-[9px] font-semibold uppercase tracking-wider text-blue-100">
                    Candidate Application
                  </div>

                  <h2 className="mt-0.5 text-base font-bold">
                    {firstValue(
                      candidate.fullName
                    ) || "Candidate"}
                  </h2>

                </div>

                <div className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-right">

                  <div className="text-[8px] uppercase text-blue-100">
                    Application ID
                  </div>

                  <div className="text-xs font-bold">
                    {firstValue(
                      candidate.applicationId
                    ) || "—"}
                  </div>

                </div>

              </div>

              {/* INFORMATION GRID */}

              <div className="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-4">

                <Info
                  label="Full Name"
                  value={
                    candidate.fullName
                  }
                />

                <Info
                  label="Email"
                  value={
                    candidate.email
                  }
                />

                {/* MOBILE FIX */}
                <Info
                  label="Mobile"
                  value={
                    mobile || "Not Provided"
                  }
                  highlight={
                    Boolean(mobile)
                  }
                />

                <Info
                  label="Job Title"
                  value={
                    candidate.jobTitle
                  }
                />

                <Info
                  label="Department"
                  value={
                    candidate.department
                  }
                />

                <Info
                  label="Location"
                  value={
                    candidate.location
                  }
                />

                <Info
                  label="Employment Type"
                  value={
                    candidate.employmentType
                  }
                />

                {/* DATE FIX */}
                <Info
                  label="Applied Date"
                  value={appliedDate}
                  highlight={
                    appliedDate !== "—"
                  }
                />

              </div>

            </div>

            {/* =================================================
                CURRENT STAGE
            ================================================== */}

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">

              <div className="mb-4 flex items-center justify-between gap-3">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Current Recruitment Stage
                  </p>

                  <h3 className="mt-0.5 text-sm font-bold text-[#063b5c]">
                    {currentStageData.title}
                  </h3>

                </div>

                <div className="shrink-0 rounded-full border border-[#eab308] bg-amber-50 px-3 py-1 text-[9px] font-bold text-[#8a6200]">
                  Stage {currentStage} of 7
                </div>

              </div>

              {/* PROGRESS */}

              <div className="relative px-1">

                <div className="absolute left-[4%] right-[4%] top-4 h-1 rounded-full bg-slate-200" />

                <div
                  className="absolute left-[4%] top-4 h-1 rounded-full bg-[#063b5c] transition-all duration-500"
                  style={{
                    width:
                      `${((currentStage - 1) / 6) * 92}%`,
                  }}
                />

                <div className="relative grid grid-cols-7 gap-1">

                  {stages.map((stage) => {

                    const completed =
                      stage.no <
                      currentStage;

                    const current =
                      stage.no ===
                      currentStage;

                    return (
                      <div
                        key={stage.no}
                        className="flex min-w-0 flex-col items-center"
                      >

                        <div
                          className={[
                            "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                            completed ||
                            current
                              ? "border-[#063b5c] bg-[#063b5c] text-white"
                              : "border-slate-300 bg-white text-slate-400",
                            current
                              ? "ring-4 ring-[#eab308]/30"
                              : "",
                          ].join(" ")}
                        >
                          {stage.no}
                        </div>

                        <span
                          className={[
                            "mt-2 text-center text-[8px] font-bold leading-tight sm:text-[9px]",
                            completed ||
                            current
                              ? "text-[#063b5c]"
                              : "text-slate-400",
                          ].join(" ")}
                        >
                          {stage.short}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* =================================================
                RECRUITMENT PROGRESS
            ================================================== */}

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

                <h3 className="text-sm font-bold text-[#063b5c]">
                  Recruitment Progress
                </h3>

              </div>

              <div className="divide-y divide-slate-100">

                {stages.map((stage) => {

                  const completed =
                    stage.no <
                    currentStage;

                  const current =
                    stage.no ===
                    currentStage;

                  return (
                    <div
                      key={stage.no}
                      className={[
                        "flex items-start gap-3 px-4 py-3",
                        current
                          ? "bg-amber-50"
                          : "",
                      ].join(" ")}
                    >

                      {/* NUMBER */}

                      <div
                        className={[
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          completed ||
                          current
                            ? "bg-[#063b5c] text-white"
                            : "bg-slate-100 text-slate-400",
                        ].join(" ")}
                      >
                        {stage.no}
                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h4
                            className={[
                              "text-xs font-bold",
                              completed ||
                              current
                                ? "text-[#063b5c]"
                                : "text-slate-500",
                            ].join(" ")}
                          >
                            {stage.title}
                          </h4>

                          {completed && (
                            <span className="text-[9px] font-bold text-emerald-600">
                              ✓ Completed
                            </span>
                          )}

                          {current && (
                            <span className="rounded-full bg-[#eab308] px-2 py-0.5 text-[8px] font-black uppercase text-[#063b5c]">
                              Current Stage
                            </span>
                          )}

                        </div>

                        <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">
                          {stage.description}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="mt-8 border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-4 py-3 text-center text-[9px] text-slate-500">

          © {new Date().getFullYear()}
          {" "}
          Anand Jivan Foundation Trust
          {" • "}
          Official Recruitment Portal

        </div>

      </footer>

    </main>
  );
}

/* ============================================================
   INFO COMPONENT
============================================================ */

function Info({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white px-3 py-2.5">

      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={[
          "mt-0.5 truncate text-[11px] font-semibold",
          highlight
            ? "text-[#063b5c]"
            : "text-slate-700",
        ].join(" ")}
      >
        {value || "—"}
      </p>

    </div>
  );
}