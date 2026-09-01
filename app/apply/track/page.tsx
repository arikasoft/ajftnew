"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  Search,
  ShieldCheck,
  UserRound,
  CalendarDays,
  FileText,
} from "lucide-react";

type HistoryItem = {
  _id?: string;
  status: string;
  title?: string;
  message?: string;
  updatedBy?: string;
  createdAt?: string;
};

type Application = {
  applicationId: string;
  status: string;
  fullName?: string;
  applicantName?: string;
  mobile?: string;
  createdAt?: string;
  updatedAt?: string;
};

type TrackResponse = {
  success: boolean;
  message?: string;
  application?: Application;
  history?: HistoryItem[];
};

const statusSteps = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "DOCUMENT_VERIFICATION",
  "FIELD_VERIFICATION",
  "APPROVED",
  "ASSISTANCE_PROCESSING",
  "COMPLETED",
];

const statusLabels: Record<string, string> = {
  SUBMITTED: "Application Submitted",
  UNDER_REVIEW: "Under Review",
  DOCUMENT_VERIFICATION: "Document Verification",
  FIELD_VERIFICATION: "Field Verification",
  DOCUMENT_REQUIRED: "Additional Documents Required",
  APPROVED: "Application Approved",
  ASSISTANCE_PROCESSING: "Assistance Processing",
  COMPLETED: "Assistance Completed",
  REJECTED: "Application Rejected",
};

function formatDate(value?: string) {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function DivyangTrackPage() {
  const [applicationId, setApplicationId] =
    useState("");

  const [mobile, setMobile] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState<TrackResponse | null>(null);

  async function handleTrack(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        "/api/divyang/track",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            applicationId:
              applicationId.trim().toUpperCase(),
            mobile: mobile.trim(),
          }),
        }
      );

      const data: TrackResponse =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Application not found."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to track application."
      );
    } finally {
      setLoading(false);
    }
  }

  const application =
    result?.application;

  const history =
    result?.history || [];

  const currentStatus =
    application?.status || "SUBMITTED";

  const currentStep =
    statusSteps.indexOf(currentStatus);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F8FA]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0">

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#D6A63A]/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">

          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#073B4C]"
          >
            <ArrowLeft size={15} />
            Back to Application
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#D6A63A] text-white shadow-xl">
              <Search size={28} />
            </div>

            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#D6A63A]">
              AJFT DIVYANG ASSISTANCE PORTAL
            </p>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Track Your Application
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
              Enter your Application ID and registered mobile
              number to view your application progress and
              latest updates.
            </p>

          </div>

        </div>

        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="relative block h-14 w-full sm:h-20"
        >
          <path
            d="
              M0 45
              C170 95 340 100 520 65
              C700 25 850 20 1040 58
              C1220 95 1340 90 1440 48
              L1440 100
              L0 100
              Z
            "
            fill="#F5F8FA"
          />
        </svg>

      </section>

      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">

        {/* TRACK FORM */}

        <section className="mx-auto -mt-8 max-w-3xl rounded-[30px] bg-white p-6 shadow-xl sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073B4C] text-white">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2 className="font-black text-[#073B4C]">
                Application Verification
              </h2>

              <p className="text-xs text-slate-400">
                Enter your registered details
              </p>
            </div>

          </div>

          <form
            onSubmit={handleTrack}
            className="mt-7 grid gap-4 md:grid-cols-[1fr_1fr_auto]"
          >

            <input
              value={applicationId}
              onChange={(event) =>
                setApplicationId(
                  event.target.value.toUpperCase()
                )
              }
              placeholder="Application ID"
              required
              className="h-13 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold uppercase text-[#073B4C] outline-none transition focus:border-[#D6A63A]"
            />

            <input
              value={mobile}
              onChange={(event) =>
                setMobile(
                  event.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Registered Mobile Number"
              inputMode="numeric"
              maxLength={10}
              required
              className="h-13 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#073B4C] outline-none transition focus:border-[#D6A63A]"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-7 text-xs font-black text-white transition hover:bg-[#D6A63A] disabled:opacity-60"
            >
              {loading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Search size={16} />
              )}

              {loading
                ? "Checking..."
                : "Track Status"}
            </button>

          </form>

          {error && (

            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
              {error}
            </div>

          )}

        </section>

        {/* RESULT */}

        {application && (

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">

            <div className="space-y-8">

              {/* APPLICATION CARD */}

              <section className="rounded-[30px] bg-white p-7 shadow-sm sm:p-9">

                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">

                  <div className="flex gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#073B4C] text-white">
                      <UserRound size={24} />
                    </div>

                    <div>

                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Applicant
                      </p>

                      <h2 className="mt-2 text-xl font-black text-[#073B4C]">
                        {application.fullName ||
                          application.applicantName ||
                          "Applicant"}
                      </h2>

                      <p className="mt-2 font-mono text-xs font-black text-[#D6A63A]">
                        {application.applicationId}
                      </p>

                    </div>

                  </div>

                  <div className="rounded-2xl bg-[#D6A63A]/10 px-5 py-4">

                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Current Status
                    </p>

                    <p className="mt-2 text-sm font-black text-[#9C741B]">
                      {statusLabels[currentStatus] ||
                        currentStatus.replaceAll(
                          "_",
                          " "
                        )}
                    </p>

                  </div>

                </div>

              </section>

              {/* PROGRESS */}

              {currentStatus !== "REJECTED" && (

                <section className="rounded-[30px] bg-white p-7 shadow-sm sm:p-9">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6A63A] text-white">
                      <ClipboardCheck size={20} />
                    </div>

                    <div>
                      <h2 className="font-black text-[#073B4C]">
                        Application Progress
                      </h2>

                      <p className="text-xs text-slate-400">
                        Your assistance application journey
                      </p>
                    </div>

                  </div>

                  <div className="mt-10 space-y-7">

                    {statusSteps.map(
                      (step, index) => {
                        const completed =
                          currentStep >= index;

                        const active =
                          currentStatus === step;

                        return (
                          <div
                            key={step}
                            className="relative flex gap-4"
                          >

                            {index <
                              statusSteps.length -
                                1 && (
                              <div
                                className={`absolute left-[17px] top-9 h-10 w-[2px] ${
                                  completed
                                    ? "bg-[#D6A63A]"
                                    : "bg-slate-100"
                                }`}
                              />
                            )}

                            <div
                              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                completed
                                  ? "bg-[#D6A63A] text-white"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {completed ? (
                                <CheckCircle2
                                  size={17}
                                />
                              ) : (
                                <span className="text-xs font-black">
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            <div className="pb-2">

                              <p
                                className={`text-sm font-black ${
                                  active
                                    ? "text-[#D6A63A]"
                                    : "text-[#073B4C]"
                                }`}
                              >
                                {
                                  statusLabels[
                                    step
                                  ]
                                }
                              </p>

                              {active && (
                                <p className="mt-1 text-xs text-slate-400">
                                  Current application
                                  stage
                                </p>
                              )}

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </section>

              )}

              {/* HISTORY */}

              <section className="rounded-[30px] bg-white p-7 shadow-sm sm:p-9">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073B4C] text-white">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <h2 className="font-black text-[#073B4C]">
                      Latest Updates
                    </h2>

                    <p className="text-xs text-slate-400">
                      Application activity and updates
                    </p>
                  </div>

                </div>

                <div className="mt-8 space-y-6">

                  {history.length === 0 ? (

                    <div className="rounded-2xl bg-[#F5F8FA] p-5 text-center text-sm text-slate-400">
                      Your application updates will
                      appear here.
                    </div>

                  ) : (

                    history.map(
                      (item, index) => (

                        <div
                          key={
                            item._id || index
                          }
                          className="border-l-2 border-[#D6A63A] pl-5"
                        >

                          <p className="text-sm font-black text-[#073B4C]">
                            {item.title ||
                              statusLabels[
                                item.status
                              ] ||
                              item.status.replaceAll(
                                "_",
                                " "
                              )}
                          </p>

                          {item.message && (

                            <p className="mt-2 text-xs leading-6 text-slate-500">
                              {item.message}
                            </p>

                          )}

                          <p className="mt-3 text-[10px] font-bold text-slate-400">
                            {formatDate(
                              item.createdAt
                            )}
                          </p>

                        </div>

                      )
                    )

                  )}

                </div>

              </section>

            </div>

            {/* SIDEBAR */}

            <aside className="space-y-6">

              <div className="rounded-[30px] bg-[#073B4C] p-7 text-white shadow-xl">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D6A63A]">
                  <FileText size={21} />
                </div>

                <h3 className="mt-6 text-lg font-black">
                  Application Information
                </h3>

                <div className="mt-6 space-y-5">

                  <div>

                    <p className="text-[9px] font-black uppercase tracking-wider text-white/40">
                      Application ID
                    </p>

                    <p className="mt-1 break-all font-mono text-xs font-black text-[#D6A63A]">
                      {application.applicationId}
                    </p>

                  </div>

                  <div>

                    <p className="text-[9px] font-black uppercase tracking-wider text-white/40">
                      Submitted On
                    </p>

                    <p className="mt-1 text-xs font-bold text-white/80">
                      {formatDate(
                        application.createdAt
                      )}
                    </p>

                  </div>

                  <div>

                    <p className="text-[9px] font-black uppercase tracking-wider text-white/40">
                      Last Updated
                    </p>

                    <p className="mt-1 text-xs font-bold text-white/80">
                      {formatDate(
                        application.updatedAt
                      )}
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-[30px] bg-white p-7 shadow-sm">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6A63A]/10 text-[#D6A63A]">
                  <ShieldCheck size={20} />
                </div>

                <h3 className="mt-5 font-black text-[#073B4C]">
                  Your Information is Secure
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  Your application details are
                  protected. Please do not share your
                  Application ID unnecessarily.
                </p>

              </div>

            </aside>

          </div>

        )}

      </div>

    </main>
  );
}