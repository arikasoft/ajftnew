"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Search,
  RefreshCw,
  Eye,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  GraduationCap,
  UserRound,
  X,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
  ChevronDown,
  Filter,
  Building2,
  ClipboardCheck,
  UserCheck,
  FileCheck2,
  Award,
  Send,
} from "lucide-react";

type Application = {
  _id?: string;
  applicationId: string;

  jobId?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  employmentType?: string;

  fullName?: string;
  fatherName?: string;
  email?: string;
  phone?: string;
  alternatePhone?: string;

  dateOfBirth?: string;
  gender?: string;
  category?: string;

  address?: string;
  city?: string;
  district?: string;
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
  expectedSalary?: string;

  resume?: string;
  photo?: string;
  coverLetter?: string;

  declarationAccepted?: boolean;

  status?: string;
  stage?: string;
  adminRemarks?: string;

  approvedAt?: string | null;
  rejectedAt?: string | null;
  interviewDate?: string | null;
  interviewMode?: string;
  interviewRemarks?: string;
  selectedAt?: string | null;
  joinedAt?: string | null;

  createdAt?: string;
  updatedAt?: string;
};

const STAGES = [
  {
    number: 1,
    label: "Application Submitted",
    short: "Submitted",
    icon: ClipboardCheck,
  },
  {
    number: 2,
    label: "Under Review",
    short: "Review",
    icon: Eye,
  },
  {
    number: 3,
    label: "Shortlisted",
    short: "Shortlisted",
    icon: UserCheck,
  },
  {
    number: 4,
    label: "Interview",
    short: "Interview",
    icon: CalendarDays,
  },
  {
    number: 5,
    label: "Selected",
    short: "Selected",
    icon: Award,
  },
  {
    number: 6,
    label: "Document Verification",
    short: "Verification",
    icon: FileCheck2,
  },
  {
    number: 7,
    label: "Appointment",
    short: "Appointment",
    icon: ShieldCheck,
  },
] as const;

function getStageNumber(stage?: string) {
  if (!stage) return 1;

  const normalized = stage.toLowerCase();

  if (
    normalized.includes("appointment") ||
    normalized.includes("joined")
  ) {
    return 7;
  }

  if (
    normalized.includes("verification") ||
    normalized.includes("document")
  ) {
    return 6;
  }

  if (normalized.includes("selected")) {
    return 5;
  }

  if (normalized.includes("interview")) {
    return 4;
  }

  if (normalized.includes("shortlisted")) {
    return 3;
  }

  if (
    normalized.includes("review") ||
    normalized.includes("under review")
  ) {
    return 2;
  }

  return 1;
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function safe(value?: string | null) {
  return value?.trim() ? value : "—";
}

function getDocumentUrl(value?: string) {
  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  ) {
    return value;
  }

  return `/${value.replace(/^\/+/, "")}`;
}

function getStageColor(stageNumber: number) {
  if (stageNumber === 7) {
    return "border-green-600 bg-green-50 text-green-700";
  }

  if (stageNumber === 6) {
    return "border-indigo-600 bg-indigo-50 text-indigo-700";
  }

  if (stageNumber === 5) {
    return "border-emerald-600 bg-emerald-50 text-emerald-700";
  }

  if (stageNumber === 4) {
    return "border-purple-600 bg-purple-50 text-purple-700";
  }

  if (stageNumber === 3) {
    return "border-orange-500 bg-orange-50 text-orange-700";
  }

  if (stageNumber === 2) {
    return "border-blue-600 bg-blue-50 text-blue-700";
  }

  return "border-slate-500 bg-slate-50 text-slate-700";
}

function getStageLabel(stageNumber: number) {
  return (
    STAGES.find(
      (item) => item.number === stageNumber
    )?.label || "Application Submitted"
  );
}

export default function AdminCareersPage() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [stageFilter, setStageFilter] =
    useState("all");

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const loadApplications = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/admin/careers",
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (
          !response.ok ||
          !result?.success
        ) {
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
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load applications."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const filteredApplications = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return applications.filter((application) => {
      const stageNumber = getStageNumber(
        application.stage
      );

      const matchesStage =
        stageFilter === "all" ||
        String(stageNumber) === stageFilter;

      if (!matchesStage) return false;

      if (!query) return true;

      return [
        application.applicationId,
        application.fullName,
        application.email,
        application.phone,
        application.jobTitle,
        application.department,
        application.location,
        application.city,
        application.district,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        );
    });
  }, [
    applications,
    search,
    stageFilter,
  ]);

  const statistics = useMemo(() => {
    const counts = {
      total: applications.length,
      submitted: 0,
      review: 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      verification: 0,
      appointment: 0,
    };

    for (const application of applications) {
      const stage = getStageNumber(
        application.stage
      );

      if (stage === 1) counts.submitted++;
      if (stage === 2) counts.review++;
      if (stage === 3) counts.shortlisted++;
      if (stage === 4) counts.interview++;
      if (stage === 5) counts.selected++;
      if (stage === 6) counts.verification++;
      if (stage === 7) counts.appointment++;
    }

    return counts;
  }, [applications]);

  async function updateStage(
    application: Application,
    stageNumber: number
  ) {
    if (!application.applicationId) return;

    const stage =
      STAGES.find(
        (item) => item.number === stageNumber
      );

    if (!stage) return;

    const confirmed = window.confirm(
      `Change ${application.fullName || "candidate"} to Stage ${stageNumber}: ${stage.label}?\n\nThe candidate will receive an email notification if email service is configured.`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(
        application.applicationId
      );
      setError("");
      setSuccessMessage("");

      const response = await fetch(
        `/api/admin/careers/${encodeURIComponent(
          application.applicationId
        )}/action`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            action: "update-stage",
            stage: stage.label,
            stageNumber,
            status: stage.label,
          }),
        }
      );

      const text = await response.text();

      let result: any = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Unable to update recruitment stage."
        );
      }

      setApplications((current) =>
        current.map((item) =>
          item.applicationId ===
          application.applicationId
            ? {
                ...item,
                stage: stage.label,
                status:
                  result.application?.status ||
                  stage.label,
                approvedAt:
                  result.application
                    ?.approvedAt ??
                  item.approvedAt,
                updatedAt:
                  result.application
                    ?.updatedAt ??
                  new Date().toISOString(),
              }
            : item
        )
      );

      setSelectedApplication((current) =>
        current?.applicationId ===
        application.applicationId
          ? {
              ...current,
              stage: stage.label,
              status:
                result.application?.status ||
                stage.label,
              updatedAt:
                result.application?.updatedAt ??
                new Date().toISOString(),
            }
          : current
      );

      setSuccessMessage(
        `Stage ${stageNumber} — ${stage.label} updated successfully.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update recruitment stage."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      {/* =====================================================
          OFFICIAL TOP BAR
      ====================================================== */}
      <div className="border-b border-slate-300 bg-[#071d49] text-white">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">
              ANAND JIVAN FOUNDATION TRUST
            </span>
            <span className="hidden text-slate-300 sm:inline">
              |
            </span>
            <span className="hidden sm:inline">
              Recruitment Administration
            </span>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span>Official Recruitment Portal</span>
            <span>•</span>
            <span>Admin Panel</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b-4 border-orange-500 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#071d49] text-white shadow-md">
              <Building2 size={30} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Anand Jivan Foundation Trust
              </p>

              <h1 className="text-xl font-extrabold text-[#071d49] sm:text-2xl">
                Recruitment Administration
              </h1>

              <p className="text-xs text-slate-500 sm:text-sm">
                Candidate Application Management System
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                System Status
              </p>
              <p className="flex items-center justify-end gap-1 text-sm font-bold text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Operational
              </p>
            </div>

            <button
              type="button"
              onClick={loadApplications}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-[#071d49] px-4 py-3 text-sm font-bold text-white shadow transition hover:bg-[#0b2b67] disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Administration</span>
          <span>/</span>
          <span>Human Resources</span>
          <span>/</span>
          <span className="font-bold text-[#071d49]">
            Career Applications
          </span>
        </div>

        {/* ===================================================
            STATISTICS
        ==================================================== */}
        <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          <StatCard
            label="Total"
            value={statistics.total}
            icon={Users}
            active
          />

          <StatCard
            label="Submitted"
            value={statistics.submitted}
            icon={ClipboardCheck}
          />

          <StatCard
            label="Review"
            value={statistics.review}
            icon={Eye}
          />

          <StatCard
            label="Shortlisted"
            value={statistics.shortlisted}
            icon={UserCheck}
          />

          <StatCard
            label="Interview"
            value={statistics.interview}
            icon={CalendarDays}
          />

          <StatCard
            label="Selected"
            value={statistics.selected}
            icon={Award}
          />

          <StatCard
            label="Verification"
            value={statistics.verification}
            icon={FileCheck2}
          />

          <StatCard
            label="Appointment"
            value={statistics.appointment}
            icon={ShieldCheck}
          />
        </section>

        {/* ===================================================
            ALERTS
        ==================================================== */}
        {successMessage && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            <CheckCircle2 size={20} />
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* ===================================================
            STAGE FILTER BAR
        ==================================================== */}
        <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[#f8fafc] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-[#071d49]">
                  Recruitment Stage Control
                </h2>
                <p className="text-xs text-slate-500">
                  Select a stage to filter candidate applications.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(
                    (value) => !value
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 lg:hidden"
              >
                <Filter size={15} />
                Filters
              </button>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 lg:grid-cols-8 ${
              showFilters
                ? "block"
                : "hidden lg:grid"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                setStageFilter("all")
              }
              className={`rounded-xl border px-3 py-3 text-left transition ${
                stageFilter === "all"
                  ? "border-[#071d49] bg-[#071d49] text-white shadow"
                  : "border-slate-200 bg-white hover:border-slate-400"
              }`}
            >
              <span className="block text-[10px] font-bold uppercase">
                All
              </span>
              <span className="mt-1 block text-xl font-black">
                {statistics.total}
              </span>
            </button>

            {STAGES.map((stage) => {
              const Icon = stage.icon;

              const count = [
                statistics.submitted,
                statistics.review,
                statistics.shortlisted,
                statistics.interview,
                statistics.selected,
                statistics.verification,
                statistics.appointment,
              ][stage.number - 1];

              const active =
                stageFilter ===
                String(stage.number);

              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() =>
                    setStageFilter(
                      String(stage.number)
                    )
                  }
                  className={`group rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? getStageColor(
                          stage.number
                        ) +
                        " shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-xs font-black">
                      {stage.number}
                    </span>
                    <Icon size={16} />
                  </div>

                  <span className="mt-2 block truncate text-[10px] font-bold uppercase">
                    {stage.short}
                  </span>

                  <span className="block text-lg font-black">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ===================================================
            SEARCH
        ==================================================== */}
        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-2xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search Application ID, candidate, mobile, email, job..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[#071d49] focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Showing{" "}
                <strong className="text-[#071d49]">
                  {filteredApplications.length}
                </strong>{" "}
                of{" "}
                <strong className="text-[#071d49]">
                  {applications.length}
                </strong>{" "}
                applications
              </span>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStageFilter("all");
                }}
                className="font-bold text-blue-700 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            APPLICATION TABLE
        ==================================================== */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 bg-[#071d49] px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-extrabold">
                Candidate Applications
              </h2>
              <p className="text-xs text-blue-100">
                Official recruitment application records
              </p>
            </div>

            <div className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">
              {filteredApplications.length} Records
            </div>
          </div>

          {loading ? (
            <LoadingTable />
          ) : filteredApplications.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1250px] w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Candidate
                    </th>

                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Contact
                    </th>

                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Position
                    </th>

                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Applied
                    </th>

                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Current Stage
                    </th>

                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Documents
                    </th>

                    <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map(
                    (application) => {
                      const stageNumber =
                        getStageNumber(
                          application.stage
                        );

                      return (
                        <tr
                          key={
                            application.applicationId
                          }
                          className="border-b border-slate-100 transition hover:bg-blue-50/40"
                        >
                          {/* Candidate */}
                          <td className="px-4 py-4 align-top">
                            <div className="flex min-w-[240px] items-start gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071d49] text-sm font-black text-white">
                                {(
                                  application.fullName ||
                                  "C"
                                )
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word[0]
                                  )
                                  .slice(0, 2)
                                  .join("")
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="font-extrabold text-[#071d49]">
                                  {safe(
                                    application.fullName
                                  )}
                                </p>

                                <p className="mt-1 text-[11px] font-bold text-orange-600">
                                  {safe(
                                    application.applicationId
                                  )}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {safe(
                                    application.category
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-4 py-4 align-top">
                            <div className="space-y-1.5 text-xs">
                              <p className="flex items-center gap-2 font-bold text-slate-700">
                                <Phone
                                  size={13}
                                  className="text-green-600"
                                />
                                {safe(
                                  application.phone
                                )}
                              </p>

                              <p className="flex max-w-[210px] items-center gap-2 truncate text-slate-600">
                                <Mail
                                  size={13}
                                  className="text-blue-600"
                                />
                                <span className="truncate">
                                  {safe(
                                    application.email
                                  )}
                                </span>
                              </p>

                              {application.city && (
                                <p className="flex items-center gap-2 text-slate-500">
                                  <MapPin
                                    size={13}
                                    className="text-red-500"
                                  />
                                  {application.city}
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Job */}
                          <td className="px-4 py-4 align-top">
                            <div className="min-w-[210px]">
                              <p className="font-bold text-slate-800">
                                {safe(
                                  application.jobTitle
                                )}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {safe(
                                  application.department
                                )}
                              </p>

                              <span className="mt-2 inline-flex rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                                {safe(
                                  application.employmentType
                                )}
                              </span>
                            </div>
                          </td>

                          {/* Applied */}
                          <td className="px-4 py-4 align-top">
                            <div className="min-w-[120px]">
                              <p className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <CalendarDays
                                  size={14}
                                  className="text-[#071d49]"
                                />
                                {formatDate(
                                  application.createdAt
                                )}
                              </p>

                              <p className="mt-1 text-[10px] text-slate-400">
                                Last updated:{" "}
                                {formatDate(
                                  application.updatedAt
                                )}
                              </p>
                            </div>
                          </td>

                          {/* Stage */}
                          <td className="px-4 py-4 align-top">
                            <div className="min-w-[180px]">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${getStageColor(
                                  stageNumber
                                )}`}
                              >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px]">
                                  {stageNumber}
                                </span>
                                {getStageLabel(
                                  stageNumber
                                )}
                              </span>

                              <div className="mt-2 flex items-center gap-1">
                                {STAGES.map(
                                  (stage) => (
                                    <button
                                      key={
                                        stage.number
                                      }
                                      type="button"
                                      title={
                                        stage.label
                                      }
                                      disabled={
                                        updatingId ===
                                        application.applicationId
                                      }
                                      onClick={() =>
                                        updateStage(
                                          application,
                                          stage.number
                                        )
                                      }
                                      className={`h-7 w-7 rounded-md text-[10px] font-black transition ${
                                        stage.number ===
                                        stageNumber
                                          ? "bg-[#071d49] text-white shadow"
                                          : stage.number <
                                            stageNumber
                                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                                          : "bg-slate-100 text-slate-500 hover:bg-orange-100 hover:text-orange-700"
                                      }`}
                                    >
                                      {stage.number}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Documents */}
                          <td className="px-4 py-4 align-top">
                            <div className="flex min-w-[170px] flex-wrap gap-2">
                              <DocumentButton
                                label="Resume"
                                value={
                                  application.resume
                                }
                              />

                              <DocumentButton
                                label="Photo"
                                value={
                                  application.photo
                                }
                              />

                              <DocumentButton
                                label="Cover"
                                value={
                                  application.coverLetter
                                }
                              />
                            </div>
                          </td>

                          {/* Action */}
                          <td className="px-4 py-4 text-right align-top">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedApplication(
                                  application
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-[#071d49] px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-900"
                            >
                              <Eye size={15} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* =====================================================
          CANDIDATE DETAIL MODAL
      ====================================================== */}
      {selectedApplication && (
        <CandidateModal
          application={
            selectedApplication
          }
          updatingId={updatingId}
          onClose={() =>
            setSelectedApplication(null)
          }
          onStageChange={updateStage}
        />
      )}
    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  icon: Icon,
  active = false,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 shadow-sm ${
        active
          ? "border-[#071d49] bg-[#071d49] text-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[9px] font-black uppercase tracking-wider ${
            active
              ? "text-blue-100"
              : "text-slate-500"
          }`}
        >
          {label}
        </span>

        <Icon
          size={16}
          className={
            active
              ? "text-orange-300"
              : "text-[#071d49]"
          }
        />
      </div>

      <p className="mt-1 text-xl font-black">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   DOCUMENT BUTTON
============================================================ */

function DocumentButton({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) {
    return (
      <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-md bg-slate-100 px-2 py-1.5 text-[10px] font-bold text-slate-400">
        <FileText size={12} />
        {label}: N/A
      </span>
    );
  }

  const url = getDocumentUrl(value);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1.5 text-[10px] font-bold text-blue-700 transition hover:bg-blue-100"
    >
      <Download size={12} />
      {label}
    </a>
  );
}

/* ============================================================
   LOADING
============================================================ */

function LoadingTable() {
  return (
    <div className="space-y-3 p-5">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-20 animate-pulse rounded-xl bg-slate-100"
        />
      ))}
    </div>
  );
}

/* ============================================================
   EMPTY
============================================================ */

function EmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Users size={30} />
      </div>

      <h3 className="mt-4 text-lg font-extrabold text-[#071d49]">
        No applications found
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        No candidate applications match the current search or recruitment stage filter.
      </p>
    </div>
  );
}

/* ============================================================
   CANDIDATE MODAL
============================================================ */

function CandidateModal({
  application,
  updatingId,
  onClose,
  onStageChange,
}: {
  application: Application;
  updatingId: string | null;
  onClose: () => void;
  onStageChange: (
    application: Application,
    stage: number
  ) => Promise<void>;
}) {
  const stageNumber = getStageNumber(
    application.stage
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#071d49]/70 p-3 backdrop-blur-sm sm:p-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal header */}
        <div className="border-b-4 border-orange-500 bg-[#071d49] px-4 py-4 text-white sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <UserRound size={25} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-300">
                  Candidate Application
                </p>

                <h2 className="text-xl font-black">
                  {safe(
                    application.fullName
                  )}
                </h2>

                <p className="text-xs text-blue-100">
                  {safe(
                    application.applicationId
                  )}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-150px)] overflow-y-auto p-4 sm:p-6">
          {/* Stage selector */}
          <section className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-black text-[#071d49]">
                  Recruitment Stage
                </h3>

                <p className="text-xs text-slate-500">
                  Select Stage 1–7 to update this candidate.
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-3 py-1.5 text-xs font-black ${getStageColor(
                  stageNumber
                )}`}
              >
                Stage {stageNumber}:{" "}
                {getStageLabel(
                  stageNumber
                )}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {STAGES.map((stage) => {
                const Icon = stage.icon;

                const active =
                  stage.number ===
                  stageNumber;

                const busy =
                  updatingId ===
                  application.applicationId;

                return (
                  <button
                    key={stage.number}
                    type="button"
                    disabled={busy}
                    onClick={() =>
                      onStageChange(
                        application,
                        stage.number
                      )
                    }
                    className={`rounded-xl border p-3 text-left transition ${
                      active
                        ? getStageColor(
                            stage.number
                          ) +
                          " shadow-md"
                        : "border-slate-200 bg-white hover:border-[#071d49]"
                    } disabled:opacity-50`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-black">
                        {stage.number}
                      </span>

                      <Icon size={15} />
                    </div>

                    <p className="mt-2 text-[10px] font-black uppercase">
                      {stage.short}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 opacity-75">
                      {stage.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Personal */}
          <DetailSection
            title="Personal Information"
            icon={UserRound}
          >
            <Detail
              label="Full Name"
              value={application.fullName}
            />

            <Detail
              label="Father's Name"
              value={application.fatherName}
            />

            <Detail
              label="Email"
              value={application.email}
            />

            <Detail
              label="Mobile Number"
              value={application.phone}
            />

            <Detail
              label="Alternate Mobile"
              value={
                application.alternatePhone
              }
            />

            <Detail
              label="Date of Birth"
              value={
                application.dateOfBirth
              }
            />

            <Detail
              label="Gender"
              value={application.gender}
            />

            <Detail
              label="Category"
              value={
                application.category
              }
            />
          </DetailSection>

          {/* Job */}
          <DetailSection
            title="Job Information"
            icon={BriefcaseBusiness}
          >
            <Detail
              label="Application ID"
              value={
                application.applicationId
              }
            />

            <Detail
              label="Job ID"
              value={application.jobId}
            />

            <Detail
              label="Job Title"
              value={
                application.jobTitle
              }
            />

            <Detail
              label="Department"
              value={
                application.department
              }
            />

            <Detail
              label="Location"
              value={
                application.location
              }
            />

            <Detail
              label="Employment Type"
              value={
                application.employmentType
              }
            />

            <Detail
              label="Applied Date"
              value={formatDate(
                application.createdAt
              )}
            />

            <Detail
              label="Last Updated"
              value={formatDateTime(
                application.updatedAt
              )}
            />
          </DetailSection>

          {/* Address */}
          <DetailSection
            title="Address Information"
            icon={MapPin}
          >
            <Detail
              label="Address"
              value={application.address}
              wide
            />

            <Detail
              label="City"
              value={application.city}
            />

            <Detail
              label="District"
              value={
                application.district
              }
            />

            <Detail
              label="State"
              value={application.state}
            />

            <Detail
              label="PIN Code"
              value={application.pincode}
            />
          </DetailSection>

          {/* Education */}
          <DetailSection
            title="Education"
            icon={GraduationCap}
          >
            <Detail
              label="Highest Qualification"
              value={
                application.highestQualification
              }
            />

            <Detail
              label="University / Board"
              value={
                application.university
              }
            />

            <Detail
              label="Passing Year"
              value={
                application.passingYear
              }
            />

            <Detail
              label="Percentage / CGPA"
              value={
                application.percentage
              }
            />
          </DetailSection>

          {/* Experience */}
          <DetailSection
            title="Professional Experience"
            icon={BriefcaseBusiness}
          >
            <Detail
              label="Experience"
              value={
                application.experience
              }
            />

            <Detail
              label="Current Organization"
              value={
                application.currentOrganization
              }
            />

            <Detail
              label="Current Designation"
              value={
                application.currentDesignation
              }
            />

            <Detail
              label="Total Experience"
              value={
                application.totalExperience
              }
            />

            <Detail
              label="Expected Salary"
              value={
                application.expectedSalary
              }
            />
          </DetailSection>

          {/* Documents */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <FileText
                  size={18}
                  className="text-[#071d49]"
                />

                <h3 className="font-black text-[#071d49]">
                  Candidate Documents
                </h3>
              </div>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-3">
              <LargeDocument
                label="Resume / CV"
                value={
                  application.resume
                }
              />

              <LargeDocument
                label="Candidate Photograph"
                value={
                  application.photo
                }
              />

              <LargeDocument
                label="Cover Letter"
                value={
                  application.coverLetter
                }
              />
            </div>
          </section>

          {/* Admin */}
          <DetailSection
            title="Recruitment Administration"
            icon={ShieldCheck}
          >
            <Detail
              label="Current Status"
              value={application.status}
            />

            <Detail
              label="Current Stage"
              value={application.stage}
            />

            <Detail
              label="Admin Remarks"
              value={
                application.adminRemarks
              }
              wide
            />

            <Detail
              label="Interview Date"
              value={formatDateTime(
                application.interviewDate
              )}
            />

            <Detail
              label="Interview Mode"
              value={
                application.interviewMode
              }
            />

            <Detail
              label="Interview Remarks"
              value={
                application.interviewRemarks
              }
              wide
            />

            <Detail
              label="Selected At"
              value={formatDateTime(
                application.selectedAt
              )}
            />

            <Detail
              label="Joined At"
              value={formatDateTime(
                application.joinedAt
              )}
            />
          </DetailSection>

          {/* Declaration */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-green-700"
              />

              <p className="text-sm font-bold text-green-800">
                Declaration Accepted:{" "}
                {application.declarationAccepted
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500">
              <p>
                Application ID:{" "}
                <strong>
                  {application.applicationId}
                </strong>
              </p>

              <p className="mt-1">
                Last updated:{" "}
                {formatDateTime(
                  application.updatedAt
                )}
              </p>
            </div>

            <div className="flex gap-2">
              {application.email && (
                <a
                  href={`mailto:${application.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700"
                >
                  <Send size={15} />
                  Email Candidate
                </a>
              )}

              {application.phone && (
                <a
                  href={`tel:${application.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-xs font-bold text-green-700"
                >
                  <Phone size={15} />
                  Call
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-[#071d49] px-5 py-2.5 text-xs font-bold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DETAIL SECTION
============================================================ */

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon
            size={18}
            className="text-[#071d49]"
          />

          <h3 className="font-black text-[#071d49]">
            {title}
          </h3>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   DETAIL
============================================================ */

function Detail({
  label,
  value,
  wide = false,
}: {
  label: string;
  value?: string | null;
  wide?: boolean;
}) {
  return (
    <div
      className={
        wide
          ? "sm:col-span-2 lg:col-span-4"
          : ""
      }
    >
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {safe(value)}
      </p>
    </div>
  );
}

/* ============================================================
   LARGE DOCUMENT
============================================================ */

function LargeDocument({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
        <FileText
          size={22}
          className="text-slate-400"
        />

        <p className="mt-2 text-sm font-bold text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Document not uploaded
        </p>
      </div>
    );
  }

  const url = getDocumentUrl(value);

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <FileText
        size={22}
        className="text-blue-700"
      />

      <p className="mt-2 text-sm font-bold text-blue-900">
        {label}
      </p>

      <p className="mt-1 truncate text-xs text-blue-700">
        Document available
      </p>

      <div className="mt-3 flex gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg bg-[#071d49] px-3 py-2 text-xs font-bold text-white"
        >
          <Eye size={13} />
          View
        </a>

        <a
          href={url}
          download
          className="inline-flex items-center gap-1 rounded-lg border border-blue-300 bg-white px-3 py-2 text-xs font-bold text-blue-700"
        >
          <Download size={13} />
          Download
        </a>
      </div>
    </div>
  );
}