"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import {
  CheckCircle2,
  Download,
  Mail,
  Search,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function InternshipSuccessContent() {
  const searchParams = useSearchParams();

  const applicationId =
    searchParams.get("applicationId");

  const emailSent =
    searchParams.get("emailSent") === "1";

  if (!applicationId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5FF] px-6">
        <div className="max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-xl">
          <h1 className="text-xl font-black text-red-500">
            Application ID Missing
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            No valid application submission was found.
          </p>

          <Link
            href="/internship/apply"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3 text-xs font-black text-white"
          >
            Apply Again
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5FF]">

      <section className="relative overflow-hidden bg-[#21164F]">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#7C3AED]/30 blur-3xl" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#14B8A6]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
            <CheckCircle2
              size={42}
              className="text-[#14B8A6]"
            />
          </div>

          <p className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-[#5EEAD4]">
            AJFT Internship Portal
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Application Submitted!
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
            Thank you for applying to the
            Anand Jivan Foundation Trust
            Internship Programme.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">

        {/* APPLICATION ID */}

        <div className="rounded-[2rem] border border-[#DDD6FE] bg-white p-7 text-center shadow-lg sm:p-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
            <ShieldCheck size={24} />
          </div>

          <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
            Your Application ID
          </p>

          <div className="mt-3 rounded-2xl bg-[#21164F] px-5 py-5">
            <p className="font-mono text-xl font-black tracking-wider text-[#FBBF24] sm:text-2xl">
              {applicationId}
            </p>
          </div>

          <p className="mt-4 text-[10px] leading-5 text-slate-500">
            Please save this Application ID.
            You will need it to track your
            internship application.
          </p>

        </div>

        {/* EMAIL */}

        <div
          className={`
            mt-5
            rounded-[2rem]
            border
            p-6
            ${
              emailSent
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
            }
          `}
        >

          <div className="flex items-start gap-4">

            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${
                  emailSent
                    ? "bg-emerald-500 text-white"
                    : "bg-amber-500 text-white"
                }
              `}
            >
              <Mail size={19} />
            </div>

            <div>

              <h2 className="text-sm font-black text-[#172033]">
                {emailSent
                  ? "Application PDF Sent"
                  : "Application Saved"}
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                {emailSent
                  ? "Your application PDF and Application ID have been sent to your registered email address."
                  : "Your application has been saved successfully, but the confirmation email could not be sent. Please contact AJFT if you do not receive it."}
              </p>

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          <a
            href={`/api/internship/application-pdf?applicationId=${encodeURIComponent(
              applicationId
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white text-xs font-black text-[#7C3AED] transition hover:bg-[#FAF9FF]"
          >
            <Download size={15} />
            Download Application PDF
          </a>

          <Link
            href={`/internship/status?applicationId=${encodeURIComponent(
              applicationId
            )}`}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7C3AED] text-xs font-black text-white transition hover:bg-[#6D28D9]"
          >
            <Search size={15} />
            Track Application
          </Link>

        </div>

        {/* OFFICE INSTRUCTION */}

        <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-7">

          <h2 className="text-base font-black text-[#172033]">
            What to do next?
          </h2>

          <div className="mt-5 space-y-4">

            <Step
              number="01"
              text="Download and print your application PDF."
            />

            <Step
              number="02"
              text="Paste your recent passport-size photograph."
            />

            <Step
              number="03"
              text="Sign the printed application form."
            />

            <Step
              number="04"
              text="Submit the physical application at the AJFT office."
            />

            <Step
              number="05"
              text="After document verification, AJFT will update your application status."
            />

          </div>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   SUSPENSE WRAPPER
===================================================== */

export default function InternshipSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F7F5FF] px-6">
          <div className="rounded-[2rem] bg-white px-8 py-7 text-center shadow-xl">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE9FE]">
              <ShieldCheck
                size={24}
                className="text-[#7C3AED]"
              />
            </div>

            <p className="mt-4 text-sm font-black text-[#172033]">
              Loading application details...
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Please wait.
            </p>

          </div>
        </main>
      }
    >
      <InternshipSuccessContent />
    </Suspense>
  );
}

/* =====================================================
   STEP
===================================================== */

function Step({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[9px] font-black text-[#7C3AED]">
        {number}
      </div>

      <p className="pt-1 text-xs leading-5 text-slate-600">
        {text}
      </p>

    </div>
  );
}