"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CareerJob = {
  _id?: string;
  id?: string;
  jobId?: string;

  title?: string;
  jobTitle?: string;

  department?: string;
  location?: string;
  employmentType?: string;

  description?: string;
  requirements?: string[];

  salary?: string;
  experience?: string;

  lastDate?: string;
  applicationDeadline?: string;
  deadline?: string;

  status?: string;
  featured?: boolean;
};

/* =========================================================
   DEFAULT JOBS
   These remain visible even when API returns count: 0
========================================================= */

const DEFAULT_JOBS: CareerJob[] = [
  {
    jobId: "AJFT-MGR-001",
    title: "Program Manager",
    department: "Programs & Operations",
    location: "Darbhanga, Bihar",
    employmentType: "Full Time",
    experience: "3–6 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
    description:
      "Lead program planning, implementation, team coordination, reporting and stakeholder engagement across AJFT initiatives.",
    requirements: [
      "Graduate / Post Graduate in relevant discipline",
      "3+ years experience in NGO, development or social sector",
      "Strong team management and communication skills",
      "Ability to manage projects, budgets and reports",
    ],
    featured: true,
  },

  {
    jobId: "AJFT-SUP-002",
    title: "Field Supervisor",
    department: "Field Operations",
    location: "Bihar",
    employmentType: "Full Time",
    experience: "1–4 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
    description:
      "Supervise field activities, coordinate field staff, monitor beneficiaries and ensure timely implementation of assigned programs.",
    requirements: [
      "Graduate preferred",
      "Experience in field work or community development",
      "Good communication and reporting skills",
      "Willingness to travel to project locations",
    ],
    featured: true,
  },

  {
    jobId: "AJFT-FLD-003",
    title: "Field Staff",
    department: "Community Development",
    location: "Bihar",
    employmentType: "Full Time",
    experience: "0–3 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
    description:
      "Work directly with communities and beneficiaries for surveys, awareness programs, documentation and project implementation.",
    requirements: [
      "12th / Graduate",
      "Freshers can apply",
      "Good local communication skills",
      "Ability to travel in field areas",
    ],
    featured: false,
  },

  {
    jobId: "AJFT-PO-004",
    title: "Program Officer",
    department: "Program Management",
    location: "Darbhanga, Bihar",
    employmentType: "Full Time",
    experience: "2–5 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
    description:
      "Support program design, implementation, monitoring, documentation and coordination with internal and external stakeholders.",
    requirements: [
      "Graduate / Post Graduate",
      "Relevant NGO / development sector experience preferred",
      "Strong documentation and reporting ability",
      "MS Office / Google Workspace knowledge",
    ],
    featured: false,
  },

  {
    jobId: "AJFT-CO-005",
    title: "Community Outreach Coordinator",
    department: "Community Outreach",
    location: "Bihar",
    employmentType: "Full Time",
    experience: "1–3 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
    description:
      "Build community relationships and coordinate awareness, education, health and welfare activities.",
    requirements: [
      "Graduate preferred",
      "Strong interpersonal and communication skills",
      "Community mobilization experience preferred",
      "Willingness to travel",
    ],
    featured: false,
  },

  {
    jobId: "AJFT-ACC-006",
    title: "Accounts & Administration Executive",
    department: "Finance & Administration",
    location: "Darbhanga, Bihar",
    employmentType: "Full Time",
    experience: "1–4 Years",
    salary: "Competitive",
    lastDate: "22-11-2026",
    description:
      "Manage day-to-day accounting, documentation, administrative records and financial reporting support.",
    requirements: [
      "B.Com / relevant qualification",
      "Accounting and documentation knowledge",
      "Tally / Excel knowledge preferred",
      "Good attention to detail",
    ],
    featured: false,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getJobId(job: CareerJob) {
  return job.jobId || job.id || job._id || "";
}

function getTitle(job: CareerJob) {
  return job.title || job.jobTitle || "Open Position";
}

function getDeadline(job: CareerJob) {
  return (
    job.lastDate ||
    job.applicationDeadline ||
    job.deadline ||
    "22-11-2026"
  );
}

function normalizeJobs(data: unknown): CareerJob[] {
  if (!data || typeof data !== "object") {
    return [];
  }

  const value = data as {
    jobs?: CareerJob[];
    data?: CareerJob[];
  };

  if (Array.isArray(value.jobs)) {
    return value.jobs;
  }

  if (Array.isArray(value.data)) {
    return value.data;
  }

  return [];
}

/* =========================================================
   PAGE
========================================================= */

export default function CareersPage() {
  const [apiJobs, setApiJobs] = useState<CareerJob[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [employmentType, setEmploymentType] =
    useState("All");

  const [selectedJob, setSelectedJob] =
    useState<CareerJob | null>(null);

  /* =======================================================
   LOAD JOBS
======================================================= */

useEffect(() => {
  let mounted = true;

  async function loadJobs() {
    try {
      const response = await fetch(
        "/api/careers",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      /*
       * API error होने पर page को error नहीं करेंगे.
       * DEFAULT_JOBS automatically use होंगे.
       */
      if (!response.ok) {
        console.warn(
          `Careers API returned ${response.status}. Using default jobs.`
        );

        if (mounted) {
          setApiJobs([]);
        }

        return;
      }

      const data = await response.json();

      if (mounted) {
        setApiJobs(normalizeJobs(data));
      }
    } catch (error) {
      /*
       * Network/API unavailable होने पर
       * default jobs दिखाए जाएंगे.
       */
      console.warn(
        "Careers API unavailable. Using default jobs.",
        error
      );

      if (mounted) {
        setApiJobs([]);
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }

  loadJobs();

  return () => {
    mounted = false;
  };
}, []);
  /* =======================================================
     COMBINE API + DEFAULT JOBS
  ======================================================= */

  const jobs = useMemo(() => {
    if (apiJobs.length === 0) {
      return DEFAULT_JOBS;
    }

    return apiJobs;
  }, [apiJobs]);

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const departments = useMemo(() => {
    const values = jobs
      .map((job) => job.department || "")
      .filter(Boolean);

    return ["All", ...Array.from(new Set(values))];
  }, [jobs]);

  const employmentTypes = useMemo(() => {
    const values = jobs
      .map((job) => job.employmentType || "")
      .filter(Boolean);

    return ["All", ...Array.from(new Set(values))];
  }, [jobs]);

  /* =======================================================
     FILTERED JOBS
  ======================================================= */

  const filteredJobs = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return jobs.filter((job) => {
      const title =
        getTitle(job).toLowerCase();

      const dept =
        (job.department || "").toLowerCase();

      const location =
        (job.location || "").toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        dept.includes(query) ||
        location.includes(query);

      const matchesDepartment =
        department === "All" ||
        job.department === department;

      const matchesEmployment =
        employmentType === "All" ||
        job.employmentType === employmentType;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesEmployment
      );
    });
  }, [
    jobs,
    search,
    department,
    employmentType,
  ]);

  const featuredJobs = useMemo(
    () =>
      jobs.filter(
        (job) => job.featured === true
      ),
    [jobs]
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#f6f9fb] text-slate-900">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-[#062d3a]">

        {/* background grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* glow */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
              <BriefcaseBusiness className="h-4 w-4" />
              Careers at Anand Jivan
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Build a career
              <span className="block text-amber-300">
                that creates impact.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Join Anand Jivan Foundation Trust and
              work with a mission-driven team creating
              meaningful change in education, healthcare,
              community development, women empowerment
              and social welfare.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="#openings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact HR
              </Link>

            </div>

          </div>

          {/* HERO STATS */}

          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">

            {[
              {
                value: jobs.length,
                label: "Open Roles",
              },
              {
                value: "22 Nov",
                label: "Application Deadline",
              },
              {
                value: "Bihar",
                label: "Primary Location",
              },
              {
                value: "Impact",
                label: "Our Mission",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
              >
                <div className="text-xl font-black text-white sm:text-2xl">
                  {item.value}
                </div>

                <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===================================================
          FEATURED ROLES
      =================================================== */}

      {featuredJobs.length > 0 && (
        <section className="border-b border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">
                  Featured opportunities
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Roles we are hiring for
                </h2>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Applications Open
              </span>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {featuredJobs
                .slice(0, 2)
                .map((job) => (
                  <JobCard
                    key={getJobId(job)}
                    job={job}
                    featured
                    onView={() =>
                      setSelectedJob(job)
                    }
                  />
                ))}

            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          JOB SEARCH
      =================================================== */}

      <section
        id="openings"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8"
      >

        <div className="mb-8">

          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">
            Current openings
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Find your next opportunity
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Explore available positions and apply
            before the closing date.
          </p>

        </div>

        {/* FILTER BOX */}

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]">

            {/* Search */}

            <div className="relative">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search job title, department or location..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
              />

            </div>

            {/* Department */}

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
            >
              {departments.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Employment */}

            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value)
              }
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
            >
              {employmentTypes.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Reset */}

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setDepartment("All");
                setEmploymentType("All");
              }}
              className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Reset
            </button>

          </div>

        </div>

        {/* RESULT COUNT */}

        <div className="mt-7 flex items-center justify-between">

          <p className="text-sm font-semibold text-slate-500">
            {filteredJobs.length}{" "}
            {filteredJobs.length === 1
              ? "position"
              : "positions"}{" "}
            available
          </p>

          {loading && (
            <span className="text-xs font-bold text-slate-400">
              Updating...
            </span>
          )}

        </div>

        {/* =================================================
            JOB LIST
        ================================================= */}

        <div className="mt-5 grid gap-5">

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={getJobId(job)}
                job={job}
                onView={() =>
                  setSelectedJob(job)
                }
              />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <BriefcaseBusiness className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-5 text-lg font-black">
                No matching positions
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try changing your search or filters
                to find other available opportunities.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* ===================================================
          WHY JOIN
      =================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">
                Why join us
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Work with purpose.
                <span className="block text-[#0b5264]">
                  Grow with impact.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                At Anand Jivan Foundation Trust,
                every team member contributes to
                building stronger communities and
                creating opportunities for people who
                need them most.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: Users,
                  title: "Mission Driven Team",
                  text: "Work alongside people committed to social impact.",
                },
                {
                  icon: BriefcaseBusiness,
                  title: "Meaningful Work",
                  text: "Take ownership of programs that create measurable change.",
                },
                {
                  icon: Clock3,
                  title: "Professional Growth",
                  text: "Develop leadership, field and program management skills.",
                },
                {
                  icon: MapPin,
                  title: "Community Impact",
                  text: "Work directly with communities across project locations.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b5264] text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}

            </div>

          </div>
        </div>
      </section>

      {/* ===================================================
          APPLICATION CTA
      =================================================== */}

      <section className="bg-[#062d3a]">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-white/[0.05] p-7 sm:p-10 lg:flex-row lg:items-center">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
                Join Anand Jivan
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-black text-white sm:text-4xl">
                Ready to make a difference?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Apply for an open position before
                <strong className="text-white">
                  {" "}22 November 2026
                </strong>
                .
              </p>

            </div>

            <a
              href="#openings"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300"
            >
              Explore Positions
              <ArrowRight className="h-4 w-4" />
            </a>

          </div>

        </div>
      </section>

      {/* ===================================================
          JOB DETAILS MODAL
      =================================================== */}

      {selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedJob(null)
          }
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal header */}

            <div className="relative overflow-hidden bg-[#062d3a] p-6 sm:p-8">

              <button
                type="button"
                onClick={() =>
                  setSelectedJob(null)
                }
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
                Open Position
              </span>

              <h2 className="mt-4 pr-10 text-2xl font-black text-white sm:text-3xl">
                {getTitle(selectedJob)}
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                  {selectedJob.department ||
                    "Programs"}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                  {selectedJob.location ||
                    "Bihar"}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                  {selectedJob.employmentType ||
                    "Full Time"}
                </span>

              </div>

            </div>

            <div className="p-6 sm:p-8">

              {/* Meta */}

              <div className="grid gap-3 sm:grid-cols-3">

                <InfoBox
                  icon={CalendarDays}
                  label="Last Date"
                  value={getDeadline(
                    selectedJob
                  )}
                  highlight
                />

                <InfoBox
                  icon={Clock3}
                  label="Experience"
                  value={
                    selectedJob.experience ||
                    "As per role"
                  }
                />

                <InfoBox
                  icon={MapPin}
                  label="Location"
                  value={
                    selectedJob.location ||
                    "Bihar"
                  }
                />

              </div>

              {/* Description */}

              <div className="mt-8">

                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  About the role
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {selectedJob.description ||
                    "This position will support Anand Jivan Foundation Trust programs and contribute to effective implementation of organizational activities."}
                </p>

              </div>

              {/* Requirements */}

              {selectedJob.requirements &&
                selectedJob.requirements
                  .length > 0 && (
                  <div className="mt-7">

                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                      Key requirements
                    </h3>

                    <div className="mt-3 space-y-3">

                      {selectedJob.requirements.map(
                        (requirement, index) => (
                          <div
                            key={index}
                            className="flex gap-3 text-sm text-slate-600"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <span>
                              {requirement}
                            </span>
                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

              {/* Apply */}

              <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">

                <Link
                  href={`/careers/apply?jobId=${encodeURIComponent(
                    getJobId(
                      selectedJob
                    )
                  )}&jobTitle=${encodeURIComponent(
                    getTitle(
                      selectedJob
                    )
                  )}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0b5264] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#083f4d]"
                >
                  Apply for this position
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedJob(null)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}

/* =========================================================
   JOB CARD
========================================================= */

function JobCard({
  job,
  featured = false,
  onView,
}: {
  job: CareerJob;
  featured?: boolean;
  onView: () => void;
}) {
  const jobId = getJobId(job);

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? "border-amber-200 shadow-sm"
          : "border-slate-200 shadow-sm"
      }`}
    >

      {featured && (
        <div className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
          Featured
        </div>
      )}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-lg bg-[#e8f4f7] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0b5264]">
              {job.department ||
                "Programs"}
            </span>

            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
              {job.employmentType ||
                "Full Time"}
            </span>

          </div>

          <h3 className="mt-4 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            {getTitle(job)}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {job.description ||
              "Join our mission-driven team and contribute to meaningful community development programs."}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">

            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {job.location || "Bihar"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {job.experience ||
                "Experience as per role"}
            </span>

            <span className="inline-flex items-center gap-1.5 text-red-600">
              <CalendarDays className="h-3.5 w-3.5" />
              Last Date: {getDeadline(job)}
            </span>

          </div>

        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">

          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b5264] px-5 py-3 text-sm font-black text-white transition hover:bg-[#083f4d]"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </button>

          <Link
            href={`/careers/apply?jobId=${encodeURIComponent(
              jobId
            )}&jobTitle=${encodeURIComponent(
              getTitle(job)
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-amber-300 hover:bg-amber-50"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-red-100 bg-red-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-wider ${
          highlight
            ? "text-red-600"
            : "text-slate-500"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      <div className="mt-2 text-sm font-black text-slate-900">
        {value}
      </div>
    </div>
  );
}