"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  HeartPulse,
  Home,
  LockKeyhole,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

type RequestStatus =
  | "pending"
  | "reviewing"
  | "assistance"
  | "completed"
  | "closed";

type RequestResult = {
  requestId: string;
  name: string;
  helpType: string;
  location: string;
  submittedAt: string;
  updatedAt: string;
  status: RequestStatus;
  message: string;
};

/*
  DEMO DATA
  -----------------------------------------
  Later this will come from:

  GET /api/health/request/status

  Example:
  /api/health/request/status?id=AJFT-HL-2026-0001&phone=...
*/

const demoRequest: RequestResult = {
  requestId: "AJFT-HL-2026-0001",
  name: "Demo Beneficiary",
  helpType: "Medical Assistance",
  location: "Darbhanga, Bihar",
  submittedAt: "24 August 2026",
  updatedAt: "24 August 2026",
  status: "reviewing",
  message:
    "Your request has been received and is currently being reviewed by the Trust team.",
};

const statusSteps: {
  key: RequestStatus;
  label: string;
}[] = [
  {
    key: "pending",
    label: "Request Received",
  },
  {
    key: "reviewing",
    label: "Under Review",
  },
  {
    key: "assistance",
    label: "Assistance Arranged",
  },
  {
    key: "completed",
    label: "Completed",
  },
];

export default function TrackHealthRequestPage() {
  const [requestId, setRequestId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] =
    useState<RequestResult | null>(null);

  const trackRequest = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setResult(null);
    setSearched(false);

    if (!requestId.trim()) {
      setError("Please enter your Request ID.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    setLoading(true);

    /*
      ========================================================
      DATABASE API WILL BE CONNECTED HERE

      const response = await fetch(
        `/api/health/request/status?id=${encodeURIComponent(
          requestId.trim()
        )}&phone=${encodeURIComponent(phone.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Request could not be found."
        );
      }

      setResult(data);
      ========================================================
    */

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    /*
      DEMO ONLY
      -----------------------------------------
      Remove this block after API connection.
    */

    if (
      requestId.trim().toUpperCase() ===
        "AJFT-HL-2026-0001" &&
      phone.trim().length >= 10
    ) {
      setResult(demoRequest);
    } else {
      setError(
        "No request found with these details. Please check your Request ID and mobile number."
      );
    }

    setSearched(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#26343D]">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <section className="relative overflow-hidden bg-[#7F1D3B] px-4 py-10 sm:px-5 md:py-14">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#F97373]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#FBBF24]/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">

          <Link
            href="/programs/health"
            className="inline-flex items-center gap-2 text-[9px] font-bold text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Health Help
          </Link>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-[#D9485F] shadow-xl">
              <FileSearch size={29} />
            </div>

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
                Health Help Desk
              </p>

              <h1 className="mt-1 font-serif text-3xl font-bold text-white md:text-4xl">
                Track Your Request
              </h1>

              <p className="mt-2 max-w-2xl text-[10px] leading-5 text-white/60 sm:text-[11px]">
                Enter your Request ID and mobile number to
                check the current status of your request.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          PRIVACY BAR
      ==================================================== */}

      <section className="border-b border-[#DCE4E8] bg-white px-4 py-4 sm:px-5">

        <div className="mx-auto flex max-w-5xl items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#1877B8]">
            <LockKeyhole size={16} />
          </div>

          <p className="text-[8px] leading-5 text-[#68767F]">
            For privacy, request status is displayed only
            after matching the Request ID and registered
            mobile number.
          </p>

        </div>

      </section>

      {/* ====================================================
          SEARCH AREA
      ==================================================== */}

      <section className="px-4 py-8 sm:px-5 md:py-12">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-6 lg:grid-cols-[1fr_310px]">

            {/* SEARCH CARD */}

            <div className="rounded-[26px] border border-[#E0E6EA] bg-white p-5 shadow-[0_10px_35px_rgba(38,52,61,0.06)] sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEECEC] text-[#D9485F]">
                  <Search size={19} />
                </div>

                <div>

                  <h2 className="text-sm font-bold text-[#26343D]">
                    Find Your Request
                  </h2>

                  <p className="mt-0.5 text-[8px] text-[#8A959B]">
                    Enter the details received after submission.
                  </p>

                </div>

              </div>

              <form
                onSubmit={trackRequest}
                className="mt-6"
              >

                {/* REQUEST ID */}

                <div>

                  <label
                    htmlFor="requestId"
                    className="text-[9px] font-bold text-[#52616A]"
                  >
                    Request ID
                  </label>

                  <div className="relative mt-2">

                    <FileSearch
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4ADB2]"
                    />

                    <input
                      id="requestId"
                      value={requestId}
                      onChange={(e) =>
                        setRequestId(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="AJFT-HL-2026-0001"
                      className="h-12 w-full rounded-xl border border-[#E0E6EA] bg-[#FAFBFC] pl-11 pr-4 text-[10px] font-semibold uppercase outline-none transition placeholder:text-[#A8B0B5] focus:border-[#D9485F] focus:bg-white focus:ring-2 focus:ring-[#D9485F]/10"
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div className="mt-4">

                  <label
                    htmlFor="phone"
                    className="text-[9px] font-bold text-[#52616A]"
                  >
                    Registered Mobile Number
                  </label>

                  <div className="relative mt-2">

                    <Phone
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4ADB2]"
                    />

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="Enter mobile number"
                      className="h-12 w-full rounded-xl border border-[#E0E6EA] bg-[#FAFBFC] pl-11 pr-4 text-[10px] outline-none transition placeholder:text-[#A8B0B5] focus:border-[#D9485F] focus:bg-white focus:ring-2 focus:ring-[#D9485F]/10"
                    />

                  </div>

                </div>

                {/* ERROR */}

                {error && (

                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">

                    <XCircle
                      size={17}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <p className="text-[9px] leading-5 text-red-700">
                      {error}
                    </p>

                  </div>

                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D9485F] text-[10px] font-bold text-white shadow-md transition hover:bg-[#BE3850] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Checking Request...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Check Request Status
                    </>
                  )}

                </button>

              </form>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#F7F9FB] p-3">

                <ShieldCheck
                  size={14}
                  className="mt-0.5 shrink-0 text-[#1877B8]"
                />

                <p className="text-[7px] leading-4 text-[#7B878E]">
                  Your information is used only for locating
                  the relevant help request.
                </p>

              </div>

            </div>

            {/* RIGHT HELP */}

            <aside className="space-y-4">

              <div className="rounded-[25px] bg-[#7F1D3B] p-6 text-white">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBBF24] text-[#52152B]">
                  <HeartPulse size={20} />
                </div>

                <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FBBF24]">
                  Don't Have A Request ID?
                </p>

                <h2 className="mt-2 font-serif text-xl font-bold">
                  Submit a new request
                </h2>

                <p className="mt-2 text-[9px] leading-5 text-white/50">
                  If you have not submitted a request yet,
                  start a new Health Help Request.
                </p>

                <Link
                  href="/programs/health/request"
                  className="mt-5 flex h-10 items-center justify-center gap-2 rounded-xl bg-white text-[9px] font-bold text-[#7F1D3B]"
                >
                  Request Help
                  <ArrowRight size={14} />
                </Link>

              </div>

              <div className="rounded-[25px] border border-[#E0E6EA] bg-white p-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF7F1] text-[#16845C]">
                  <Clock3 size={18} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#26343D]">
                  Status Updates
                </h3>

                <p className="mt-2 text-[9px] leading-5 text-[#6B7780]">
                  The displayed status reflects the latest
                  information available in the Trust's system.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ====================================================
          RESULT
      ==================================================== */}

      {searched && result && (

        <section className="px-4 pb-12 sm:px-5 md:pb-16">

          <div className="mx-auto max-w-5xl">

            <div className="overflow-hidden rounded-[28px] border border-[#DCE4E8] bg-white shadow-[0_12px_40px_rgba(38,52,61,0.08)]">

              {/* RESULT HEADER */}

              <div className="bg-[#F0FDF4] px-5 py-5 sm:px-7">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                      <CheckCircle2 size={21} />
                    </div>

                    <div>

                      <p className="text-[8px] font-bold uppercase tracking-wider text-[#15803D]">
                        Request Found
                      </p>

                      <h2 className="mt-1 font-serif text-xl font-bold text-[#26343D]">
                        Request Status
                      </h2>

                    </div>

                  </div>

                  <div className="w-fit rounded-full bg-[#DCFCE7] px-4 py-2 text-[8px] font-bold text-[#15803D]">
                    {getStatusLabel(result.status)}
                  </div>

                </div>

              </div>

              {/* DETAILS */}

              <div className="grid gap-0 border-t border-[#E0E6EA] sm:grid-cols-2 lg:grid-cols-4">

                <Detail
                  label="Request ID"
                  value={result.requestId}
                />

                <Detail
                  label="Applicant"
                  value={result.name}
                />

                <Detail
                  label="Help Type"
                  value={result.helpType}
                />

                <Detail
                  label="Location"
                  value={result.location}
                />

              </div>

              {/* STATUS TIMELINE */}

              <div className="border-t border-[#E0E6EA] px-5 py-7 sm:px-7">

                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#D9485F]">
                  Request Progress
                </p>

                <div className="mt-7">

                  <StatusTimeline
                    current={result.status}
                  />

                </div>

              </div>

              {/* MESSAGE */}

              <div className="border-t border-[#E0E6EA] bg-[#FAFBFC] px-5 py-6 sm:px-7">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FEECEC] text-[#D9485F]">
                    <FileSearch size={17} />
                  </div>

                  <div>

                    <p className="text-[9px] font-bold text-[#26343D]">
                      Latest Update
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-[#68767F]">
                      {result.message}
                    </p>

                  </div>

                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  <DateInfo
                    label="Submitted"
                    value={result.submittedAt}
                  />

                  <DateInfo
                    label="Last Updated"
                    value={result.updatedAt}
                  />

                </div>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* ====================================================
          BOTTOM LINKS
      ==================================================== */}

      <section className="border-t border-[#E0E6EA] bg-white px-4 py-7 sm:px-5">

        <div className="mx-auto grid max-w-5xl gap-2.5 sm:grid-cols-3">

          <BottomLink
            href="/programs/health"
            icon={<HeartPulse size={16} />}
            title="Health Help"
            text="Go to Health Help Desk"
          />

          <BottomLink
            href="/programs/health/request"
            icon={<FileSearch size={16} />}
            title="Request Help"
            text="Submit a new request"
          />

          <BottomLink
            href="/"
            icon={<Home size={16} />}
            title="Home"
            text="Return to website"
          />

        </div>

      </section>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <footer className="bg-[#4A182A] px-4 py-6 text-center">

        <p className="text-[9px] font-bold tracking-[0.14em] text-white">
          ANAND JIVAN FOUNDATION TRUST
        </p>

        <p className="mt-1 text-[8px] text-white/40">
          Health • Education • Community Development • Social Welfare
        </p>

        <p className="mt-3 text-[8px] text-white/30">
          +91 9155751363 • info@ajftrust.org
        </p>

        <p className="mt-3 border-t border-white/10 pt-3 text-[7px] text-white/20">
          © {new Date().getFullYear()} Anand Jivan Foundation Trust.
          All Rights Reserved.
        </p>

      </footer>

    </main>
  );
}

/* ==========================================================
   STATUS TIMELINE
========================================================== */

function StatusTimeline({
  current,
}: {
  current: RequestStatus;
}) {
  const currentIndex = statusSteps.findIndex(
    (step) => step.key === current
  );

  return (
    <div className="grid gap-5 sm:grid-cols-4">

      {statusSteps.map((step, index) => {

        const completed = index <= currentIndex;
        const active = index === currentIndex;

        return (
          <div
            key={step.key}
            className="relative"
          >

            {index < statusSteps.length - 1 && (
              <div
                className={`absolute left-[36px] top-4 hidden h-0.5 w-[calc(100%-20px)] sm:block ${
                  index < currentIndex
                    ? "bg-[#22C55E]"
                    : "bg-[#E0E6EA]"
                }`}
              />
            )}

            <div className="relative">

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  completed
                    ? "bg-[#22C55E] text-white"
                    : "bg-[#EEF1F3] text-[#9AA4AA]"
                }`}
              >

                {completed ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <span className="text-[8px] font-bold">
                    {index + 1}
                  </span>
                )}

              </div>

              <p
                className={`mt-3 text-[9px] font-bold ${
                  active
                    ? "text-[#D9485F]"
                    : completed
                    ? "text-[#26343D]"
                    : "text-[#9AA4AA]"
                }`}
              >
                {step.label}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
}

/* ==========================================================
   DETAIL
========================================================== */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#E0E6EA] p-5 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">

      <p className="text-[7px] font-bold uppercase tracking-wider text-[#9AA4AA]">
        {label}
      </p>

      <p className="mt-2 break-words text-[10px] font-bold text-[#26343D]">
        {value}
      </p>

    </div>
  );
}

/* ==========================================================
   DATE INFO
========================================================== */

function DateInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E0E6EA] bg-white p-3">

      <p className="text-[7px] font-bold uppercase tracking-wider text-[#9AA4AA]">
        {label}
      </p>

      <p className="mt-1.5 text-[9px] font-semibold text-[#52616A]">
        {value}
      </p>

    </div>
  );
}

/* ==========================================================
   BOTTOM LINK
========================================================== */

function BottomLink({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#E0E6EA] bg-[#FAFBFC] p-4 transition hover:-translate-y-0.5 hover:border-[#E7B6BF] hover:bg-white"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEECEC] text-[#D9485F]">
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-[9px] font-bold text-[#26343D]">
            {title}
          </p>

          <p className="mt-0.5 text-[7px] text-[#8A959B]">
            {text}
          </p>

        </div>

        <ArrowRight
          size={14}
          className="text-[#A4ADB2] transition group-hover:translate-x-1 group-hover:text-[#D9485F]"
        />

      </div>

    </Link>
  );
}

/* ==========================================================
   STATUS LABEL
========================================================== */

function getStatusLabel(status: RequestStatus) {
  switch (status) {
    case "pending":
      return "PENDING";

    case "reviewing":
      return "UNDER REVIEW";

    case "assistance":
      return "ASSISTANCE ARRANGED";

    case "completed":
      return "COMPLETED";

    case "closed":
      return "CLOSED";

    default:
      return "UNKNOWN";
  }
}