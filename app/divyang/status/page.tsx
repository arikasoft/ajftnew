"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  Search,
  Loader2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Phone,
  Hash,
  MapPin,
  User,
  Calendar,
  Accessibility,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

type HistoryItem = {
  id: string;
  status: string;
  statusLabel: string;
  remarks: string;
  updatedBy: string;
  createdAt: string | null;
};

type TrackingResponse = {
  success: boolean;
  message?: string;
  application?: {
    id: string;
    applicationId: string;
    applicantName: string;
    fatherName: string;
    mobile: string;
    email: string;
    district: string;
    state: string;
    disabilityType: string;
    disabilityPercentage: string | number;
    status: string;
    statusLabel: string;
    submittedAt: string | null;
    updatedAt: string | null;
  };
  tracking?: {
    currentStatus: string;
    currentStatusLabel: string;
    totalUpdates: number;
    history: HistoryItem[];
  };
};

function formatDate(value: string | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusStyle(status: string) {
  const value = status.toLowerCase().replace(/\s+/g, "_");

  if (value.includes("approved")) {
    return {
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500",
    };
  }

  if (value.includes("rejected")) {
    return {
      badge: "bg-red-100 text-red-700 border-red-200",
      icon: AlertCircle,
      iconBg: "bg-red-500",
    };
  }

  if (
    value.includes("verified") ||
    value.includes("verification")
  ) {
    return {
      badge: "bg-blue-100 text-blue-700 border-blue-200",
      icon: ShieldCheck,
      iconBg: "bg-blue-500",
    };
  }

  if (
    value.includes("document") ||
    value.includes("review")
  ) {
    return {
      badge: "bg-purple-100 text-purple-700 border-purple-200",
      icon: FileCheck2,
      iconBg: "bg-purple-500",
    };
  }

  return {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock3,
    iconBg: "bg-amber-500",
  };
}

export default function DivyangStatusPage() {
  const [searchType, setSearchType] =
    useState<"applicationId" | "mobile">("applicationId");

  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] =
    useState<TrackingResponse | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) {
      setError(
        searchType === "applicationId"
          ? "Please enter your Application ID."
          : "Please enter your mobile number."
      );

      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const params = new URLSearchParams();

      params.set(searchType, value);

      const response = await fetch(
        `/api/divyang/track?${params.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data: TrackingResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to find your application."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to track your application."
      );
    } finally {
      setLoading(false);
    }
  }

  const application = result?.application;
  const history = result?.tracking?.history || [];

  const statusStyle = application
    ? getStatusStyle(application.status)
    : null;

  const StatusIcon = statusStyle?.icon || Clock3;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8fa]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0">

          <div className="absolute left-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-[#D6A63A]/20 blur-3xl" />

          <div className="absolute bottom-[-150px] right-[-80px] h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:55px_55px]" />

        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-8 lg:px-10 lg:pb-36">

          <Link
            href="/divyang/apply"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Application
          </Link>

          <div className="mt-12 max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A63A]/30 bg-[#D6A63A]/10 px-4 py-2">

              <Accessibility
                size={16}
                className="text-[#D6A63A]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6A63A]">
                Divyang Support Portal
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">

              Track Your
              <span className="block text-[#D6A63A]">
                Application Status
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">

              Enter your Application ID or registered mobile number
              to securely check your current application status and
              complete progress history.

            </p>

          </div>

        </div>

        {/* WAVE */}

        <div className="absolute bottom-[-1px] left-0 w-full">

          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="h-[70px] w-full sm:h-[100px]"
          >
            <path
              d="
                M0 50
                C180 115 350 110 520 70
                C720 22 900 25 1080 72
                C1240 112 1350 100 1440 55
                L1440 120
                L0 120
                Z
              "
              fill="#f5f8fa"
            />

          </svg>

        </div>

      </section>

      {/* SEARCH */}

      <section className="relative z-20 mx-auto -mt-10 max-w-4xl px-5 sm:px-8">

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-8">

          <div className="grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => {
                setSearchType("applicationId");
                setSearchValue("");
                setError("");
              }}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                searchType === "applicationId"
                  ? "border-[#073B4C] bg-[#073B4C] text-white shadow-lg"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#073B4C]/30"
              }`}
            >

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  searchType === "applicationId"
                    ? "bg-[#D6A63A] text-white"
                    : "bg-white text-[#073B4C]"
                }`}
              >
                <Hash size={20} />
              </div>

              <div>

                <p className="font-black">
                  Application ID
                </p>

                <p
                  className={`mt-1 text-xs ${
                    searchType === "applicationId"
                      ? "text-white/60"
                      : "text-slate-500"
                  }`}
                >
                  Track using your unique AJFT ID
                </p>

              </div>

            </button>

            <button
              type="button"
              onClick={() => {
                setSearchType("mobile");
                setSearchValue("");
                setError("");
              }}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                searchType === "mobile"
                  ? "border-[#073B4C] bg-[#073B4C] text-white shadow-lg"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#073B4C]/30"
              }`}
            >

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  searchType === "mobile"
                    ? "bg-[#D6A63A] text-white"
                    : "bg-white text-[#073B4C]"
                }`}
              >
                <Phone size={20} />
              </div>

              <div>

                <p className="font-black">
                  Mobile Number
                </p>

                <p
                  className={`mt-1 text-xs ${
                    searchType === "mobile"
                      ? "text-white/60"
                      : "text-slate-500"
                  }`}
                >
                  Track using registered mobile
                </p>

              </div>

            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">

                {searchType === "applicationId" ? (
                  <Hash
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                ) : (
                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                )}

                <input
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(
                      searchType === "applicationId"
                        ? event.target.value.toUpperCase()
                        : event.target.value
                    )
                  }
                  placeholder={
                    searchType === "applicationId"
                      ? "Example: AJFT-DIV-2026-ABC123"
                      : "Enter registered mobile number"
                  }
                  inputMode={
                    searchType === "mobile"
                      ? "numeric"
                      : "text"
                  }
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#073B4C] focus:bg-white focus:ring-4 focus:ring-[#073B4C]/10"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#D6A63A] px-7 text-sm font-black text-white shadow-xl shadow-[#D6A63A]/20 transition hover:-translate-y-0.5 hover:bg-[#BE8D29] disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Searching...
                  </>
                ) : (
                  <>
                    Track Application
                    <Search size={18} />
                  </>
                )}

              </button>

            </div>

          </form>

          {error && (

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700">

              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm font-semibold">
                {error}
              </p>

            </div>

          )}

        </div>

      </section>

      {/* RESULT */}

      {application && (

        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">

          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">

            {/* APPLICATION CARD */}

            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

              <div className="bg-[#073B4C] p-7">

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6A63A]">
                      Application Details
                    </p>

                    <h2 className="mt-3 text-2xl font-black text-white">
                      {application.applicantName}
                    </h2>

                    <p className="mt-2 text-sm text-white/60">
                      {application.applicationId}
                    </p>

                  </div>

                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black ${statusStyle?.badge}`}
                  >

                    <StatusIcon size={15} />

                    {application.statusLabel}

                  </div>

                </div>

              </div>

              <div className="grid gap-5 p-7 sm:grid-cols-2">

                <InfoItem
                  icon={<User size={18} />}
                  label="Applicant Name"
                  value={application.applicantName}
                />

                <InfoItem
                  icon={<Phone size={18} />}
                  label="Registered Mobile"
                  value={application.mobile}
                />

                <InfoItem
                  icon={<Accessibility size={18} />}
                  label="Disability Type"
                  value={application.disabilityType}
                />

                <InfoItem
                  icon={<FileCheck2 size={18} />}
                  label="Disability Percentage"
                  value={
                    application.disabilityPercentage
                      ? `${application.disabilityPercentage}%`
                      : "Not specified"
                  }
                />

                <InfoItem
                  icon={<MapPin size={18} />}
                  label="District"
                  value={application.district}
                />

                <InfoItem
                  icon={<MapPin size={18} />}
                  label="State"
                  value={application.state}
                />

                <InfoItem
                  icon={<Calendar size={18} />}
                  label="Application Submitted"
                  value={formatDate(application.submittedAt)}
                />

                <InfoItem
                  icon={<RefreshCw size={18} />}
                  label="Last Updated"
                  value={formatDate(application.updatedAt)}
                />

              </div>

            </div>

            {/* CURRENT STATUS */}

            <div className="rounded-[30px] bg-gradient-to-br from-[#073B4C] to-[#0a5066] p-7 text-white shadow-xl shadow-[#073B4C]/20">

              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D6A63A]">
                Current Application Status
              </p>

              <div className="mt-7 flex h-20 w-20 items-center justify-center rounded-[25px] bg-[#D6A63A] shadow-xl shadow-[#D6A63A]/30">

                <StatusIcon size={34} />

              </div>

              <h2 className="mt-6 text-3xl font-black">
                {application.statusLabel}
              </h2>

              <p className="mt-4 leading-7 text-white/65">

                Your application is currently being processed
                through the Anand Jivan Foundation Trust
                Divyang Support Portal.

              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                <p className="text-xs text-white/55">
                  Application Reference
                </p>

                <p className="mt-2 break-all text-lg font-black text-[#D6A63A]">
                  {application.applicationId}
                </p>

              </div>

              <Link
                href="/divyang/apply"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#D6A63A]"
              >
                Submit another application
                <ChevronRight size={17} />
              </Link>

            </div>

          </div>

          {/* TIMELINE */}

          <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">

            <div className="flex flex-wrap items-end justify-between gap-4">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6A63A]">
                  Application Journey
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#073B4C]">
                  Status History
                </h2>

              </div>

              <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600">

                {history.length} Update
                {history.length !== 1 ? "s" : ""}

              </div>

            </div>

            <div className="mt-8 space-y-0">

              {history.map((item, index) => {

                const itemStyle = getStatusStyle(
                  item.status
                );

                const ItemIcon = itemStyle.icon;

                return (

                  <div
                    key={`${item.id}-${index}`}
                    className="relative flex gap-5 pb-8 last:pb-0"
                  >

                    {index !== history.length - 1 && (

                      <div className="absolute left-[21px] top-12 h-[calc(100%-30px)] w-px bg-slate-200" />

                    )}

                    <div
                      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${itemStyle.iconBg}`}
                    >

                      <ItemIcon size={19} />

                    </div>

                    <div className="flex-1 pb-1">

                      <div className="flex flex-wrap items-start justify-between gap-3">

                        <div>

                          <h3 className="font-black text-[#073B4C]">
                            {item.statusLabel}
                          </h3>

                          {item.remarks && (

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              {item.remarks}
                            </p>

                          )}

                        </div>

                        <span className="text-xs font-semibold text-slate-400">

                          {formatDate(item.createdAt)}

                        </span>

                      </div>

                      <p className="mt-2 text-xs font-bold text-slate-400">

                        Updated by {item.updatedBy}

                      </p>

                    </div>

                  </div>

                );
              })}

            </div>

          </div>

        </section>

      )}

      {/* HELP */}

      <section className="pb-16">

        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">

          <div className="rounded-[30px] border border-[#D6A63A]/20 bg-[#fffaf0] p-7 sm:p-10">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6A63A]">
                  Need Assistance?
                </p>

                <h3 className="mt-3 text-2xl font-black text-[#073B4C]">
                  Unable to track your application?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Please ensure you enter the correct Application ID
                  or registered mobile number.
                </p>

              </div>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#073B4C] px-7 text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                Contact Support
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-[#D6A63A]">
        {icon}

        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-3 break-words text-sm font-black text-[#073B4C]">
        {value || "Not available"}
      </p>

    </div>
  );
}