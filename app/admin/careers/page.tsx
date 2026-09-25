"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    title: "Application Submitted",
    short: "Submitted",
    description:
      "Application successfully received.",
  },
  {
    number: 2,
    title: "Under Review",
    short: "Review",
    description:
      "Application is under recruitment review.",
  },
  {
    number: 3,
    title: "Shortlisted",
    short: "Shortlisted",
    description:
      "Candidate has been shortlisted.",
  },
  {
    number: 4,
    title: "Interview",
    short: "Interview",
    description:
      "Interview or assessment stage.",
  },
  {
    number: 5,
    title: "Selected",
    short: "Selected",
    description:
      "Candidate selected for the position.",
  },
  {
    number: 6,
    title: "Document Verification",
    short: "Verification",
    description:
      "Candidate documents are being verified.",
  },
  {
    number: 7,
    title: "Appointment",
    short: "Appointment",
    description:
      "Appointment and joining formalities.",
  },
];

function getStageNumber(application: Application) {
  const stage = String(
    application.stage || ""
  ).toLowerCase();

  const status = String(
    application.status || ""
  ).toLowerCase();

  if (
    stage.includes("appointment") ||
    status.includes("appointment")
  )
    return 7;

  if (
    stage.includes("verification") ||
    stage.includes("document")
  )
    return 6;

  if (
    stage.includes("selected") ||
    status.includes("selected")
  )
    return 5;

  if (stage.includes("interview"))
    return 4;

  if (stage.includes("shortlisted"))
    return 3;

  if (
    stage.includes("review") ||
    status.includes("review")
  )
    return 2;

  return 1;
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime()))
    return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function safe(value?: string | null) {
  return value?.trim() || "—";
}

export default function AdminCareersPage() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selected, setSelected] =
    useState<Application | null>(null);

  const [updating, setUpdating] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filterStage, setFilterStage] =
    useState("all");

  const [remarks, setRemarks] =
    useState("");

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

        const result =
          await response.json();

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
          Array.isArray(
            result.applications
          )
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

  const filteredApplications =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return applications.filter(
        (item) => {
          const matchesSearch =
            !query ||
            [
              item.applicationId,
              item.fullName,
              item.email,
              item.phone,
              item.jobTitle,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(query);

          const stageNo =
            getStageNumber(item);

          const matchesStage =
            filterStage === "all" ||
            String(stageNo) ===
              filterStage;

          return (
            matchesSearch &&
            matchesStage
          );
        }
      );
    },
    [
      applications,
      search,
      filterStage,
    ]);

  async function updateStage(
    application: Application,
    stageNumber: number
  ) {
    if (updating) return;

    const stage =
      STAGES.find(
        (item) =>
          item.number === stageNumber
      );

    if (!stage) return;

    const confirmed =
      window.confirm(
        `Change ${application.fullName || "candidate"} to Stage ${stageNumber} - ${stage.title}?`
      );

    if (!confirmed) return;

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

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
            action: "update_stage",
            stage: stage.title,
            stageNumber,
            status: stage.short,
            adminRemarks:
              remarks.trim(),
          }),
        }
      );

      const text =
        await response.text();

      let result: any = {};

      try {
        result = text
          ? JSON.parse(text)
          : {};
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

      setSuccess(
        `Stage ${stageNumber} updated successfully.`
      );

      setApplications((previous) =>
        previous.map((item) =>
          item.applicationId ===
          application.applicationId
            ? {
                ...item,
                stage:
                  stage.title,
                status:
                  stage.short,
                adminRemarks:
                  remarks.trim(),
                updatedAt:
                  new Date().toISOString(),
              }
            : item
        )
      );

      setSelected((previous) =>
        previous
          ? {
              ...previous,
              stage:
                stage.title,
              status:
                stage.short,
              adminRemarks:
                remarks.trim(),
              updatedAt:
                new Date().toISOString(),
            }
          : null
      );

      setRemarks("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update recruitment stage."
      );
    } finally {
      setUpdating(false);
    }
  }

  const stats = useMemo(() => {
    const result = {
      total: applications.length,
      submitted: 0,
      review: 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      verification: 0,
      appointment: 0,
    };

    applications.forEach(
      (application) => {
        const no =
          getStageNumber(application);

        if (no === 1) result.submitted++;
        if (no === 2) result.review++;
        if (no === 3)
          result.shortlisted++;
        if (no === 4)
          result.interview++;
        if (no === 5)
          result.selected++;
        if (no === 6)
          result.verification++;
        if (no === 7)
          result.appointment++;
      }
    );

    return result;
  }, [applications]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      {/* =====================================================
          GOVERNMENT HEADER
      ===================================================== */}

      <header className="border-b-4 border-amber-400 bg-[#12355b] text-white shadow-lg">
        <div className="mx-auto max-w-[1600px] px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">
                Official Recruitment Administration
              </div>

              <h1 className="text-2xl font-black md:text-3xl">
                Anand Jivan Foundation Trust
              </h1>

              <p className="mt-1 text-sm text-blue-100">
                Recruitment & Career Management Portal
              </p>
            </div>

            <div className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                Administrative Panel
              </div>

              <div className="mt-1 text-sm font-bold">
                Recruitment Cell
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-6">
        {/* ===================================================
            ALERTS
        =================================================== */}

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            ✓ {success}
          </div>
        )}

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          <Stat
            title="Total"
            value={stats.total}
            color="navy"
          />

          <Stat
            title="Submitted"
            value={stats.submitted}
            color="blue"
          />

          <Stat
            title="Review"
            value={stats.review}
            color="amber"
          />

          <Stat
            title="Shortlisted"
            value={stats.shortlisted}
            color="violet"
          />

          <Stat
            title="Interview"
            value={stats.interview}
            color="cyan"
          />

          <Stat
            title="Selected"
            value={stats.selected}
            color="emerald"
          />

          <Stat
            title="Verification"
            value={stats.verification}
            color="orange"
          />

          <Stat
            title="Appointment"
            value={stats.appointment}
            color="green"
          />
        </section>

        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <section className="mt-5 rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Search Candidate
              </label>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Application ID / Name / Email / Mobile / Job Title"
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#12355b] focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="w-full xl:w-64">
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Recruitment Stage
              </label>

              <select
                value={filterStage}
                onChange={(event) =>
                  setFilterStage(
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-[#12355b]"
              >
                <option value="all">
                  All Stages
                </option>

                {STAGES.map((stage) => (
                  <option
                    key={stage.number}
                    value={stage.number}
                  >
                    Stage {stage.number} -{" "}
                    {stage.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={loadApplications}
              className="mt-auto h-11 rounded-lg bg-[#12355b] px-5 text-sm font-bold text-white shadow transition hover:bg-[#0d2946]"
            >
              ↻ Refresh
            </button>
          </div>
        </section>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_500px]">
          {/* APPLICATION TABLE */}

          <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#12355b]">
                    Candidate Applications
                  </h2>

                  <p className="text-xs text-slate-500">
                    Official recruitment records
                  </p>
                </div>

                <span className="rounded-full bg-[#12355b] px-3 py-1 text-xs font-bold text-white">
                  {filteredApplications.length}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-sm font-semibold text-slate-500">
                Loading applications...
              </div>
            ) : filteredApplications.length ===
              0 ? (
              <div className="p-10 text-center">
                <div className="text-4xl">
                  📋
                </div>

                <p className="mt-3 text-sm font-bold text-slate-600">
                  No applications found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left">
                  <thead className="bg-[#12355b] text-[11px] uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-4 py-3">
                        Candidate
                      </th>

                      <th className="px-4 py-3">
                        Contact
                      </th>

                      <th className="px-4 py-3">
                        Position
                      </th>

                      <th className="px-4 py-3">
                        Applied
                      </th>

                      <th className="px-4 py-3">
                        Stage
                      </th>

                      <th className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {filteredApplications.map(
                      (application) => {
                        const stageNo =
                          getStageNumber(
                            application
                          );

                        return (
                          <tr
                            key={
                              application.applicationId
                            }
                            className={`transition hover:bg-blue-50 ${
                              selected
                                ?.applicationId ===
                              application.applicationId
                                ? "bg-blue-50"
                                : ""
                            }`}
                          >
                            <td className="px-4 py-4">
                              <div className="font-bold text-slate-800">
                                {safe(
                                  application.fullName
                                )}
                              </div>

                              <div className="mt-1 text-[11px] font-bold text-[#12355b]">
                                {
                                  application.applicationId
                                }
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <div className="text-xs font-semibold">
                                {safe(
                                  application.phone
                                )}
                              </div>

                              <div className="mt-1 text-[11px] text-slate-500">
                                {safe(
                                  application.email
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <div className="max-w-[220px] text-xs font-bold">
                                {safe(
                                  application.jobTitle
                                )}
                              </div>

                              <div className="mt-1 text-[11px] text-slate-500">
                                {safe(
                                  application.department
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-xs font-semibold">
                              {formatDate(
                                application.createdAt
                              )}
                            </td>

                            <td className="px-4 py-4">
                              <StageBadge
                                number={
                                  stageNo
                                }
                              />
                            </td>

                            <td className="px-4 py-4">
                              <button
                                onClick={() => {
                                  setSelected(
                                    application
                                  );

                                  setRemarks(
                                    application.adminRemarks ||
                                      ""
                                  );
                                }}
                                className="rounded-lg bg-[#12355b] px-3 py-2 text-xs font-bold text-white hover:bg-[#0d2946]"
                              >
                                View / Manage
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
          </div>

          {/* =================================================
              CANDIDATE DETAIL
          ================================================= */}

          <aside className="rounded-xl border border-slate-300 bg-white shadow-sm">
            {!selected ? (
              <div className="flex min-h-[500px] items-center justify-center p-8 text-center">
                <div>
                  <div className="text-5xl">
                    👤
                  </div>

                  <h3 className="mt-4 text-lg font-black text-[#12355b]">
                    Candidate Details
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Select an application to view
                    complete candidate information.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b-4 border-amber-400 bg-[#12355b] px-5 py-5 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                    Candidate Application
                  </div>

                  <h2 className="mt-1 text-xl font-black">
                    {safe(
                      selected.fullName
                    )}
                  </h2>

                  <p className="mt-1 text-xs text-blue-100">
                    {
                      selected.applicationId
                    }
                  </p>
                </div>

                <div className="max-h-[calc(100vh-180px)] overflow-y-auto p-5">
                  {/* BASIC */}

                  <DetailSection title="Personal Information">
                    <Detail
                      label="Full Name"
                      value={
                        selected.fullName
                      }
                    />

                    <Detail
                      label="Father Name"
                      value={
                        selected.fatherName
                      }
                    />

                    <Detail
                      label="Mobile Number"
                      value={
                        selected.phone
                      }
                    />

                    <Detail
                      label="Alternate Mobile"
                      value={
                        selected.alternatePhone
                      }
                    />

                    <Detail
                      label="Email"
                      value={
                        selected.email
                      }
                    />

                    <Detail
                      label="Date of Birth"
                      value={
                        selected.dateOfBirth
                      }
                    />

                    <Detail
                      label="Gender"
                      value={
                        selected.gender
                      }
                    />

                    <Detail
                      label="Category"
                      value={
                        selected.category
                      }
                    />
                  </DetailSection>

                  {/* JOB */}

                  <DetailSection title="Post / Recruitment Details">
                    <Detail
                      label="Job Title"
                      value={
                        selected.jobTitle
                      }
                    />

                    <Detail
                      label="Department"
                      value={
                        selected.department
                      }
                    />

                    <Detail
                      label="Location"
                      value={
                        selected.location
                      }
                    />

                    <Detail
                      label="Employment Type"
                      value={
                        selected.employmentType
                      }
                    />

                    <Detail
                      label="Applied Date"
                      value={formatDate(
                        selected.createdAt
                      )}
                    />
                  </DetailSection>

                  {/* ADDRESS */}

                  <DetailSection title="Address">
                    <Detail
                      label="Address"
                      value={
                        selected.address
                      }
                      full
                    />

                    <Detail
                      label="City"
                      value={
                        selected.city
                      }
                    />

                    <Detail
                      label="District"
                      value={
                        selected.district
                      }
                    />

                    <Detail
                      label="State"
                      value={
                        selected.state
                      }
                    />

                    <Detail
                      label="Pincode"
                      value={
                        selected.pincode
                      }
                    />
                  </DetailSection>

                  {/* EDUCATION */}

                  <DetailSection title="Education">
                    <Detail
                      label="Qualification"
                      value={
                        selected.highestQualification
                      }
                    />

                    <Detail
                      label="University"
                      value={
                        selected.university
                      }
                    />

                    <Detail
                      label="Passing Year"
                      value={
                        selected.passingYear
                      }
                    />

                    <Detail
                      label="Percentage"
                      value={
                        selected.percentage
                      }
                    />
                  </DetailSection>

                  {/* EXPERIENCE */}

                  <DetailSection title="Experience">
                    <Detail
                      label="Experience"
                      value={
                        selected.experience
                      }
                    />

                    <Detail
                      label="Current Organization"
                      value={
                        selected.currentOrganization
                      }
                    />

                    <Detail
                      label="Designation"
                      value={
                        selected.currentDesignation
                      }
                    />

                    <Detail
                      label="Total Experience"
                      value={
                        selected.totalExperience
                      }
                    />

                    <Detail
                      label="Expected Salary"
                      value={
                        selected.expectedSalary
                      }
                    />
                  </DetailSection>

                  {/* DOCUMENTS */}

                  <DetailSection title="Candidate Documents">
                    <DocumentButton
                      label="Resume"
                      url={
                        selected.resume
                      }
                    />

                    <DocumentButton
                      label="Candidate Photo"
                      url={
                        selected.photo
                      }
                    />

                    <DocumentButton
                      label="Cover Letter"
                      url={
                        selected.coverLetter
                      }
                    />
                  </DetailSection>

                  {/* CURRENT STATUS */}

                  <DetailSection title="Current Recruitment Status">
                    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Current Stage
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <StageBadge
                          number={getStageNumber(
                            selected
                          )}
                        />

                        <span className="text-sm font-black text-[#12355b]">
                          {safe(
                            selected.stage
                          )}
                        </span>
                      </div>
                    </div>

                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Admin Remarks
                    </label>

                    <textarea
                      value={remarks}
                      onChange={(event) =>
                        setRemarks(
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Enter recruitment remarks..."
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm outline-none focus:border-[#12355b] focus:bg-white"
                    />
                  </DetailSection>

                  {/* =================================================
                      STAGE 1-7
                  ================================================= */}

                  <DetailSection title="Recruitment Stage — 1 to 7">
                    <div className="space-y-2">
                      {STAGES.map(
                        (stage) => {
                          const current =
                            getStageNumber(
                              selected
                            );

                          const active =
                            current ===
                            stage.number;

                          const completed =
                            current >
                            stage.number;

                          return (
                            <button
                              key={
                                stage.number
                              }
                              disabled={
                                updating
                              }
                              onClick={() =>
                                updateStage(
                                  selected,
                                  stage.number
                                )
                              }
                              className={`group flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                                active
                                  ? "border-[#12355b] bg-[#12355b] text-white shadow-md"
                                  : completed
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                  : "border-slate-200 bg-white hover:border-[#12355b] hover:bg-blue-50"
                              }`}
                            >
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                                  active
                                    ? "bg-amber-400 text-[#12355b]"
                                    : completed
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-200 text-slate-600 group-hover:bg-[#12355b] group-hover:text-white"
                                }`}
                              >
                                {completed
                                  ? "✓"
                                  : stage.number}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block text-xs font-black ${
                                    active
                                      ? "text-white"
                                      : ""
                                  }`}
                                >
                                  {
                                    stage.title
                                  }
                                </span>

                                <span
                                  className={`mt-0.5 block text-[10px] ${
                                    active
                                      ? "text-blue-100"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {
                                    stage.description
                                  }
                                </span>
                              </span>

                              {active && (
                                <span className="rounded-full bg-amber-400 px-2 py-1 text-[9px] font-black text-[#12355b]">
                                  CURRENT
                                </span>
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>

                    {updating && (
                      <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-center text-xs font-bold text-amber-700">
                        Updating recruitment
                        stage...
                      </div>
                    )}

                    <p className="mt-3 text-[10px] leading-4 text-slate-500">
                      Stage change will be saved to
                      the candidate recruitment
                      record. Your action endpoint
                      can also send the corresponding
                      recruitment notification email.
                    </p>
                  </DetailSection>

                  {/* AUDIT */}

                  <DetailSection title="Record Information">
                    <Detail
                      label="Created"
                      value={formatDate(
                        selected.createdAt
                      )}
                    />

                    <Detail
                      label="Last Updated"
                      value={formatDate(
                        selected.updatedAt
                      )}
                    />

                    <Detail
                      label="Declaration"
                      value={
                        selected.declarationAccepted
                          ? "Accepted"
                          : "Not Accepted"
                      }
                    />
                  </DetailSection>
                </div>
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  const colors: Record<
    string,
    string
  > = {
    navy: "border-[#12355b] bg-white text-[#12355b]",
    blue: "border-blue-400 bg-blue-50 text-blue-700",
    amber:
      "border-amber-400 bg-amber-50 text-amber-700",
    violet:
      "border-violet-400 bg-violet-50 text-violet-700",
    cyan:
      "border-cyan-400 bg-cyan-50 text-cyan-700",
    emerald:
      "border-emerald-400 bg-emerald-50 text-emerald-700",
    orange:
      "border-orange-400 bg-orange-50 text-orange-700",
    green:
      "border-green-500 bg-green-50 text-green-700",
  };

  return (
    <div
      className={`rounded-xl border-l-4 p-4 shadow-sm ${colors[color]}`}
    >
      <div className="text-[10px] font-black uppercase tracking-wider opacity-70">
        {title}
      </div>

      <div className="mt-1 text-2xl font-black">
        {value}
      </div>
    </div>
  );
}

function StageBadge({
  number,
}: {
  number: number;
}) {
  const stage =
    STAGES.find(
      (item) => item.number === number
    ) || STAGES[0];

  const styles: Record<
    number,
    string
  > = {
    1: "bg-blue-100 text-blue-700 border-blue-200",
    2: "bg-amber-100 text-amber-700 border-amber-200",
    3: "bg-violet-100 text-violet-700 border-violet-200",
    4: "bg-cyan-100 text-cyan-700 border-cyan-200",
    5: "bg-emerald-100 text-emerald-700 border-emerald-200",
    6: "bg-orange-100 text-orange-700 border-orange-200",
    7: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black ${styles[number]}`}
    >
      <span>{number}</span>
      <span>{stage.short}</span>
    </span>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <h3 className="mb-3 border-l-4 border-amber-400 pl-2 text-xs font-black uppercase tracking-wider text-[#12355b]">
        {title}
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {children}
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
  full = false,
}: {
  label: string;
  value?: string | null;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50 p-2.5 ${
        full
          ? "col-span-2"
          : ""
      }`}
    >
      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </div>

      <div className="mt-1 break-words text-xs font-bold text-slate-700">
        {safe(value)}
      </div>
    </div>
  );
}

function DocumentButton({
  label,
  url,
}: {
  label: string;
  url?: string;
}) {
  if (!url) {
    return (
      <div className="col-span-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-400">
        {label}: Document not uploaded
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-3 text-xs font-black text-[#12355b] transition hover:border-[#12355b] hover:bg-blue-100"
    >
      <span>
        📄 {label}
      </span>

      <span className="rounded bg-[#12355b] px-2 py-1 text-[9px] text-white">
        VIEW
      </span>
    </a>
  );
}