"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  HeartPulse,
  MapPin,
  Search,
  Users,
  Building2,
  CalendarDays,
  IndianRupee,
  Clock3,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  HandHeart,
  Activity,
  FileText,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";

type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

type Project = {
  id: number;
  title: string;
  category:
    | "Education"
    | "Healthcare"
    | "Community Development"
    | "Emergency Relief"
    | "Social Support";
  status: ProjectStatus;
  location: string;
  period: string;
  beneficiaries: string;
  budget: string;
  icon: "education" | "health" | "community" | "relief" | "support";
  description: string;
  achievements: string[];
  progress: number;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Education Support & Learning Development Programme",
    category: "Education",
    status: "Ongoing",
    location: "Darbhanga, Bihar",
    period: "2025 – 2026",
    beneficiaries: "500+",
    budget: "₹ 4,50,000",
    icon: "education",
    progress: 78,
    description:
      "Supporting children from economically weaker families through learning materials, educational support, awareness programmes and improved access to education.",
    achievements: [
      "Educational support provided to children from vulnerable communities",
      "Distribution of learning and study materials",
      "Community awareness regarding school education",
      "Support for improved learning participation",
    ],
  },
  {
    id: 2,
    title: "Community Health Support & Awareness Programme",
    category: "Healthcare",
    status: "Ongoing",
    location: "Darbhanga District, Bihar",
    period: "2025 – 2026",
    beneficiaries: "1,000+",
    budget: "₹ 6,25,000",
    icon: "health",
    progress: 72,
    description:
      "Community-focused health awareness and support programme designed to improve access to health information and assistance for vulnerable families.",
    achievements: [
      "Community health awareness activities",
      "Support for vulnerable and low-income families",
      "Health information and preventive awareness",
      "Assistance through community-based outreach",
    ],
  },
  {
    id: 3,
    title: "Sanitation & Infrastructure Development Initiative",
    category: "Community Development",
    status: "Ongoing",
    location: "Rural Bihar",
    period: "2025 – 2026",
    beneficiaries: "300+",
    budget: "₹ 1,25,000",
    icon: "community",
    progress: 65,
    description:
      "Improving sanitation and basic infrastructure through community-focused development activities for underserved areas.",
    achievements: [
      "Sanitation-focused community development activities",
      "Improved awareness regarding hygiene",
      "Support for infrastructure development",
      "Community participation in development initiatives",
    ],
  },
  {
    id: 4,
    title: "Emergency Relief & Family Assistance Programme",
    category: "Emergency Relief",
    status: "Ongoing",
    location: "Bihar",
    period: "2025 – 2026",
    beneficiaries: "250+",
    budget: "₹ 3,00,000",
    icon: "relief",
    progress: 58,
    description:
      "Providing emergency support and essential assistance to families facing financial hardship, emergencies and other vulnerable situations.",
    achievements: [
      "Emergency assistance for vulnerable families",
      "Community-based relief support",
      "Essential needs assistance",
      "Rapid response support initiatives",
    ],
  },
  {
    id: 5,
    title: "Social Support & Inclusive Development Programme",
    category: "Social Support",
    status: "Completed",
    location: "Darbhanga, Bihar",
    period: "2024 – 2025",
    beneficiaries: "700+",
    budget: "₹ 2,75,000",
    icon: "support",
    progress: 100,
    description:
      "A social support initiative focused on inclusion, community welfare and assistance for individuals and families requiring support.",
    achievements: [
      "Community welfare assistance",
      "Support for vulnerable individuals",
      "Inclusive development activities",
      "Improved community participation",
    ],
  },
];

const categoryOptions = [
  "All",
  "Education",
  "Healthcare",
  "Community Development",
  "Emergency Relief",
  "Social Support",
];

function ProjectIcon({
  type,
  className = "",
}: {
  type: Project["icon"];
  className?: string;
}) {
  const props = {
    className,
    strokeWidth: 2,
  };

  switch (type) {
    case "education":
      return <GraduationCap {...props} />;

    case "health":
      return <HeartPulse {...props} />;

    case "community":
      return <Building2 {...props} />;

    case "relief":
      return <HandHeart {...props} />;

    default:
      return <Users {...props} />;
  }
}

export default function ProjectReportsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch =
        project.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || project.category === category;

      const statusMatch =
        status === "All" || project.status === status;

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch
      );
    });
  }, [search, category, status]);

  const completed =
    projects.filter(
      (project) =>
        project.status === "Completed"
    ).length;

  const ongoing =
    projects.filter(
      (project) =>
        project.status === "Ongoing"
    ).length;

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950">

        <div className="absolute inset-0">

          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">

          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-emerald-100/70">

            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link
              href="/reports"
              className="transition hover:text-white"
            >
              Reports
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-white">
              Projects
            </span>

          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">

                <Sparkles className="h-4 w-4 text-amber-300" />

                PROJECT IMPLEMENTATION & IMPACT

              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">

                Project Reports &

                <span className="block bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">

                  Development Impact

                </span>

              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">

                Explore Anand Jivan Foundation Trust&apos;s
                development initiatives, programme progress,
                community outreach and project implementation
                activities across education, healthcare,
                social welfare and community development.

              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  View Projects

                  <ArrowRight className="h-5 w-5" />

                </Link>

                <Link
                  href="/reports"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  <FileText className="h-5 w-5" />

                  All Reports

                </Link>

              </div>

            </div>

            {/* Trust Card */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200">

                  <Target className="h-6 w-6" />

                </div>

                <div>

                  <p className="text-sm text-slate-300">

                    Programme Focus

                  </p>

                  <h2 className="font-bold text-white">

                    Sustainable Community Impact

                  </h2>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-2xl bg-black/20 p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-300">

                      Education

                    </span>

                    <span className="font-bold text-white">

                      Learning Support

                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-black/20 p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-300">

                      Healthcare

                    </span>

                    <span className="font-bold text-white">

                      Community Outreach

                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-black/20 p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-300">

                      Development

                    </span>

                    <span className="font-bold text-white">

                      Inclusive Growth

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Wave */}

        <div className="absolute bottom-0 left-0 w-full">

          <svg
            viewBox="0 0 1440 120"
            className="block h-auto w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,72 L1440,120 L0,120 Z"
              fill="#f8fafc"
            />
          </svg>

        </div>

      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">

                  Total Projects

                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">

                  {projects.length}

                </p>

              </div>

              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">

                <Building2 className="h-6 w-6" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">

                  Ongoing

                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">

                  {ongoing}

                </p>

              </div>

              <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">

                <Activity className="h-6 w-6" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">

                  Completed

                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">

                  {completed}

                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">

                <CheckCircle2 className="h-6 w-6" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">

                  Programme Reach

                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">

                  2,750+

                </p>

              </div>

              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">

                <Users className="h-6 w-6" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROJECT FILTER
      ====================================================== */}

      <section
        id="projects"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">

              <BarChart3 className="h-4 w-4" />

              PROJECT DATABASE

            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">

              Explore Our Projects

            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">

              Browse development programmes and view their
              implementation details, beneficiaries, progress
              and key outcomes.

            </p>

          </div>

          <div className="text-sm font-semibold text-slate-500">

            Showing{" "}

            <span className="text-slate-950">

              {filteredProjects.length}

            </span>{" "}

            projects

          </div>

        </div>

        <div className="mt-8 grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-lg lg:grid-cols-[1fr_auto_auto]">

          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search project, location or category..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="h-14 rounded-2xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 outline-none focus:border-emerald-500"
          >

            {categoryOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="h-14 rounded-2xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 outline-none focus:border-emerald-500"
          >

            <option value="All">

              All Status

            </option>

            <option value="Ongoing">

              Ongoing

            </option>

            <option value="Completed">

              Completed

            </option>

            <option value="Upcoming">

              Upcoming

            </option>

          </select>

        </div>

        {/* ===================================================
            PROJECT CARDS
        ==================================================== */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          {filteredProjects.map((project) => (

            <article
              key={project.id}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
            >

              <div className="p-7">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-700">

                      <ProjectIcon
                        type={project.icon}
                        className="h-7 w-7"
                      />

                    </div>

                    <div>

                      <div className="flex flex-wrap gap-2">

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">

                          {project.category}

                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            project.status ===
                            "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : project.status ===
                                "Ongoing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >

                          {project.status}

                        </span>

                      </div>

                      <h3 className="mt-3 text-xl font-black leading-7 text-slate-950">

                        {project.title}

                      </h3>

                    </div>

                  </div>

                </div>

                <p className="mt-6 leading-7 text-slate-600">

                  {project.description}

                </p>

                {/* Details */}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                    <MapPin className="h-5 w-5 text-emerald-600" />

                    <div>

                      <p className="text-xs text-slate-500">

                        Location

                      </p>

                      <p className="font-bold text-slate-800">

                        {project.location}

                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                    <CalendarDays className="h-5 w-5 text-blue-600" />

                    <div>

                      <p className="text-xs text-slate-500">

                        Period

                      </p>

                      <p className="font-bold text-slate-800">

                        {project.period}

                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                    <Users className="h-5 w-5 text-purple-600" />

                    <div>

                      <p className="text-xs text-slate-500">

                        Beneficiaries

                      </p>

                      <p className="font-bold text-slate-800">

                        {project.beneficiaries}

                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                    <IndianRupee className="h-5 w-5 text-amber-600" />

                    <div>

                      <p className="text-xs text-slate-500">

                        Programme Budget

                      </p>

                      <p className="font-bold text-slate-800">

                        {project.budget}

                      </p>

                    </div>

                  </div>

                </div>

                {/* Progress */}

                <div className="mt-7">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-bold text-slate-700">

                      Project Progress

                    </span>

                    <span className="text-sm font-black text-emerald-700">

                      {project.progress}%

                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Achievements */}

                <div className="mt-7 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5">

                  <div className="flex items-center gap-2">

                    <Sparkles className="h-5 w-5 text-emerald-700" />

                    <h4 className="font-black text-slate-900">

                      Key Activities & Outcomes

                    </h4>

                  </div>

                  <ul className="mt-4 space-y-3">

                    {project.achievements.map(
                      (achievement) => (

                        <li
                          key={achievement}
                          className="flex gap-3 text-sm leading-6 text-slate-700"
                        >

                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                          {achievement}

                        </li>

                      )
                    )}

                  </ul>

                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-700"
                  >

                    View Project Details

                    <ArrowRight className="h-5 w-5" />

                  </Link>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
                  >

                    <Download className="h-5 w-5" />

                    Report

                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

        {filteredProjects.length === 0 && (

          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white p-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">

              <Filter className="h-8 w-8" />

            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">

              No projects found

            </h3>

            <p className="mt-2 text-slate-500">

              Try changing your search or filters.

            </p>

          </div>

        )}

      </section>

      {/* =====================================================
          TRANSPARENCY SECTION
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

            <div>

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">

                <ShieldCheck className="h-8 w-8" />

              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950">

                Transparency & Accountability

              </h2>

              <p className="mt-4 leading-8 text-slate-600">

                Project information is presented to help
                donors, supporters, communities and stakeholders
                understand programme implementation and the
                development work undertaken by the Trust.

              </p>

              <Link
                href="/transparency"
                className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-700 transition hover:text-emerald-900"
              >

                Explore Transparency Information

                <ArrowRight className="h-5 w-5" />

              </Link>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-3xl bg-slate-50 p-6">

                <FileText className="h-7 w-7 text-blue-600" />

                <h3 className="mt-5 font-black text-slate-900">

                  Programme Reporting

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">

                  Project and programme information presented
                  in an accessible format.

                </p>

              </div>

              <div className="rounded-3xl bg-slate-50 p-6">

                <BarChart3 className="h-7 w-7 text-emerald-600" />

                <h3 className="mt-5 font-black text-slate-900">

                  Impact Monitoring

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">

                  Progress and beneficiary reach information
                  for programme monitoring.

                </p>

              </div>

              <div className="rounded-3xl bg-slate-50 p-6">

                <Users className="h-7 w-7 text-purple-600" />

                <h3 className="mt-5 font-black text-slate-900">

                  Community Focus

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">

                  Development activities designed around
                  community needs and inclusion.

                </p>

              </div>

              <div className="rounded-3xl bg-slate-50 p-6">

                <Clock3 className="h-7 w-7 text-amber-600" />

                <h3 className="mt-5 font-black text-slate-900">

                  Continuous Improvement

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">

                  Ongoing review and improvement of programme
                  implementation processes.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-950">

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl">

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">

              Support Meaningful Community Development

            </h2>

            <p className="mt-5 text-lg leading-8 text-emerald-50/80">

              Your support helps strengthen education,
              healthcare, community development and social
              welfare initiatives.

            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-emerald-900 shadow-xl transition hover:-translate-y-1"
              >

                <HeartPulse className="h-5 w-5" />

                Support Our Work

              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white backdrop-blur transition hover:bg-white/20"
              >

                View All Projects

                <ArrowRight className="h-5 w-5" />

              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}