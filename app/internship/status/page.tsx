"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

type Application = {
  applicationId: string;
  name: string;
  area: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  status: string;
  physicalReceived: boolean;
  approvedAt?: string;
  internId?: string;
  completedAt?: string;
  certificateEligible: boolean;
  certificatePaymentStatus: string;
  certificateId?: string;
};

const steps = [
  {
    key: "SUBMITTED",
    title: "Application Submitted",
    text: "Your online application has been received.",
  },
  {
    key: "PHYSICAL_RECEIVED",
    title: "Physical Application",
    text: "Printed application received at AJFT office.",
  },
  {
    key: "APPROVED",
    title: "Application Approved",
    text: "Your internship application has been approved.",
  },
  {
    key: "INTERNSHIP_ACTIVE",
    title: "Internship Active",
    text: "Your internship programme is currently active.",
  },
  {
    key: "COMPLETED",
    title: "Internship Completed",
    text: "Your internship requirements have been completed.",
  },
  {
    key: "CERTIFICATE_GENERATED",
    title: "Certificate Generated",
    text: "Your certificate is ready.",
  },
];

function statusIndex(status: string) {
  const order = [
    "SUBMITTED",
    "PDF_GENERATED",
    "EMAIL_SENT",
    "PHYSICAL_PENDING",
    "PHYSICAL_RECEIVED",
    "APPROVED",
    "ID_CARD_GENERATED",
    "INTERNSHIP_ACTIVE",
    "COMPLETED",
    "CERTIFICATE_PENDING_PAYMENT",
    "PAYMENT_RECEIVED",
    "CERTIFICATE_GENERATED",
  ];

  const index = order.indexOf(status);

  return index === -1 ? 0 : index;
}

function isStepComplete(
  step: string,
  status: string
) {
  const current = statusIndex(status);

  const stepMap: Record<string, number> = {
    SUBMITTED: 0,
    PHYSICAL_RECEIVED: 4,
    APPROVED: 5,
    INTERNSHIP_ACTIVE: 7,
    COMPLETED: 8,
    CERTIFICATE_GENERATED: 11,
  };

  return current >= (stepMap[step] ?? 0);
}

export default function InternshipStatusPage() {
  const [applicationId, setApplicationId] =
    useState("");

  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSearch(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");
    setApplication(null);

    if (!applicationId.trim()) {
      setError(
        "Please enter your Application ID."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/internship/status?applicationId=${encodeURIComponent(
            applicationId
          )}`
        );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Application not found."
        );
      }

      setApplication(
        data.application
      );

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to find application."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5FF]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#21164F]">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#14B8A6]/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-10">

          <Link
            href="/internship"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-white/50 hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to Internship
          </Link>

          <div className="mt-8 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBBF24] text-[#21164F]">
              <Search size={25} />
            </div>

            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-[#5EEAD4]">
              AJFT Internship Portal
            </p>

            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Track Your Application
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/55">
              Enter your unique Application ID to view your
              internship application progress.
            </p>

          </div>

          <form
            onSubmit={handleSearch}
            className="
              mx-auto
              mt-9
              flex
              max-w-2xl
              flex-col
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/10
              p-2
              backdrop-blur-xl
              sm:flex-row
            "
          >

            <input
              value={applicationId}
              onChange={(e) =>
                setApplicationId(
                  e.target.value
                )
              }
              placeholder="AJFT-INT-2026-000001"
              className="
                h-12
                min-w-0
                flex-1
                rounded-xl
                bg-white
                px-4
                text-xs
                font-bold
                text-[#172033]
                outline-none
                placeholder:text-slate-300
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#FBBF24]
                px-6
                text-xs
                font-black
                text-[#21164F]
                transition
                hover:bg-[#FCD34D]
                disabled:opacity-60
              "
            >

              {loading ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <Search size={15} />
              )}

              Check Status

            </button>

          </form>

          {error && (
            <div className="mx-auto mt-4 flex max-w-2xl items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-200">

              <XCircle size={15} />

              {error}

            </div>
          )}

        </div>

        <div className="absolute bottom-[-1px] left-0 w-full">

          <svg
            viewBox="0 0 1440 90"
            className="block h-[50px] w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 55 C200 5 400 85 620 42 C850 0 1020 85 1210 40 C1320 15 1380 35 1440 15 V90 H0 Z"
              fill="#F7F5FF"
            />
          </svg>

        </div>

      </section>

      {/* RESULT */}

      {application && (
        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10">

          {/* SUMMARY */}

          <div className="rounded-[2rem] border border-[#E8E2FF] bg-white p-7 shadow-sm sm:p-9">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#7C3AED]">
                  Application Found
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#172033]">
                  {application.name}
                </h2>

                <p className="mt-1 font-mono text-[10px] font-bold text-[#7C3AED]">
                  {application.applicationId}
                </p>

              </div>

              <span className="w-fit rounded-full bg-[#EDE9FE] px-4 py-2 text-[9px] font-black text-[#6D28D9]">
                {application.status.replaceAll(
                  "_",
                  " "
                )}
              </span>

            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">

              <Info
                icon={<GraduationCap size={15} />}
                label="Internship Area"
                value={application.area}
              />

              <Info
                icon={<Clock3 size={15} />}
                label="Duration"
                value={application.duration}
              />

              <Info
                icon={<FileText size={15} />}
                label="Start Date"
                value={
                  application.startDate ||
                  "To be confirmed"
                }
              />

            </div>

          </div>

          {/* TIMELINE */}

          <div className="mt-7 rounded-[2rem] border border-[#E8E2FF] bg-white p-7 shadow-sm sm:p-9">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                <Sparkles size={18} />
              </div>

              <div>

                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">
                  Progress
                </p>

                <h2 className="text-xl font-black text-[#172033]">
                  Application Journey
                </h2>

              </div>

            </div>

            <div className="mt-8 space-y-0">

              {steps.map(
                (step, index) => {

                  const complete =
                    isStepComplete(
                      step.key,
                      application.status
                    );

                  const isLast =
                    index ===
                    steps.length - 1;

                  return (
                    <div
                      key={step.key}
                      className="flex gap-4"
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            ${
                              complete
                                ? "bg-[#14B8A6] text-white"
                                : "bg-[#F1EEFA] text-slate-400"
                            }
                          `}
                        >
                          {complete ? (
                            <CheckCircle2
                              size={16}
                            />
                          ) : (
                            <span className="text-[9px] font-black">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          )}
                        </div>

                        {!isLast && (
                          <div
                            className={`
                              my-1
                              h-12
                              w-px
                              ${
                                complete
                                  ? "bg-[#14B8A6]/40"
                                  : "bg-slate-200"
                              }
                            `}
                          />
                        )}

                      </div>

                      <div className="pb-7">

                        <h3
                          className={`
                            text-sm
                            font-black
                            ${
                              complete
                                ? "text-[#172033]"
                                : "text-slate-400"
                            }
                          `}
                        >
                          {step.title}
                        </h3>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          {step.text}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* CERTIFICATE */}

          {application.certificateEligible && (
            <div className="mt-7 rounded-[2rem] border border-[#D8F3EC] bg-[#EEFDF9] p-7 sm:p-9">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14B8A6] text-white">
                    <FileCheck2 size={22} />
                  </div>

                  <div>

                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#0F766E]">
                      Certificate
                    </p>

                    <h2 className="mt-1 text-xl font-black text-[#172033]">
                      Your Internship is Complete
                    </h2>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      Your certificate is eligible for
                      processing after the applicable
                      certificate processing fee.
                    </p>

                  </div>

                </div>

                {application.certificatePaymentStatus ===
                  "PENDING" && (
                  <Link
                    href={`/internship/certificate/payment?applicationId=${application.applicationId}`}
                    className="
                      inline-flex
                      h-11
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#7C3AED]
                      px-6
                      text-xs
                      font-black
                      text-white
                      shadow-lg
                      shadow-purple-500/20
                      transition
                      hover:-translate-y-0.5
                    "
                  >
                    Process Certificate
                    <ArrowRight size={14} />
                  </Link>
                )}

              </div>

            </div>
          )}

          {/* ID CARD */}

          {application.internId && (
            <div className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-7">

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={20}
                  className="text-[#7C3AED]"
                />

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">
                    Intern ID
                  </p>

                  <p className="font-mono text-sm font-black text-[#172033]">
                    {application.internId}
                  </p>

                </div>

              </div>

            </div>
          )}

        </section>
      )}

      {/* EMPTY STATE */}

      {!application && !loading && !error && (
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#7C3AED] shadow-sm">
            <HeartHandshake size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-black text-[#172033]">
            Your Journey Starts Here
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-slate-500">
            Enter your Application ID above to track your
            application, approval, internship progress and
            certificate status.
          </p>

          <Link
            href="/internship/apply"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-xs font-black text-white"
          >
            Apply for Internship
            <ArrowRight size={14} />
          </Link>

        </section>
      )}

    </main>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F7F5FF] p-4">

      <div className="flex items-center gap-2 text-[#7C3AED]">
        {icon}

        <span className="text-[8px] font-black uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-[10px] font-bold text-[#172033]">
        {value}
      </p>

    </div>
  );
}