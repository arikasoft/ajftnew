import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  HeartHandshake,
  MapPin,
  Share2,
  Target,
  Users,
} from "lucide-react";

type Project = {
  slug: string;
  title: string;
  category: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  location: string;
  startDate: string;
  beneficiaries: string;
  budget: string;
  shortDescription: string;
  description: string;
  objectives: string[];
  activities: string[];
  impact: string[];
};

const projects: Project[] = [
  {
    slug: "education-support-programme",
    title: "Education Support Programme",
    category: "Education",
    status: "Ongoing",
    location: "Darbhanga, Bihar",
    startDate: "April 2025",
    beneficiaries: "500+ Students",
    budget: "As per project requirement",
    shortDescription:
      "Supporting children and students from underserved communities through educational initiatives and learning opportunities.",
    description:
      "The Education Support Programme of Anand Jivan Foundation Trust focuses on promoting access to education and encouraging children and young people to continue their learning journey. The programme aims to identify educational needs within communities and support initiatives that can contribute to better learning opportunities.",
    objectives: [
      "Promote access to quality educational opportunities.",
      "Support students from underserved and economically disadvantaged communities.",
      "Encourage children to continue their education.",
      "Create awareness about the importance of education.",
      "Promote community participation in educational development.",
    ],
    activities: [
      "Educational awareness programmes.",
      "Student support initiatives.",
      "Learning material assistance.",
      "Community engagement activities.",
      "Volunteer-led educational support.",
    ],
    impact: [
      "Improved awareness about education.",
      "Greater community participation.",
      "Support for children and students.",
      "Encouragement for continued learning.",
    ],
  },
  {
    slug: "community-health-support",
    title: "Community Health Support Initiative",
    category: "Health",
    status: "Ongoing",
    location: "Bihar, India",
    startDate: "January 2026",
    beneficiaries: "Community Members",
    budget: "As per programme requirement",
    shortDescription:
      "Supporting community health awareness and access to essential health-related initiatives.",
    description:
      "The Community Health Support Initiative aims to promote health awareness and support communities through need-based programmes. The initiative focuses on encouraging preventive healthcare awareness, community participation and access to information related to health and wellbeing.",
    objectives: [
      "Promote health awareness.",
      "Encourage preventive healthcare practices.",
      "Support community-based health initiatives.",
      "Increase awareness regarding essential healthcare services.",
    ],
    activities: [
      "Health awareness sessions.",
      "Community outreach.",
      "Health support programmes.",
      "Awareness and information campaigns.",
    ],
    impact: [
      "Improved health awareness.",
      "Increased community participation.",
      "Better access to health information.",
    ],
  },
  {
    slug: "community-development-programme",
    title: "Community Development Programme",
    category: "Social Development",
    status: "Ongoing",
    location: "Darbhanga District, Bihar",
    startDate: "July 2025",
    beneficiaries: "Local Communities",
    budget: "Project based",
    shortDescription:
      "Supporting sustainable community development and social welfare initiatives.",
    description:
      "The Community Development Programme works towards identifying local needs and encouraging collective efforts for social development. The programme promotes participation, awareness and collaboration for the improvement of community wellbeing.",
    objectives: [
      "Encourage sustainable community development.",
      "Promote social awareness.",
      "Support need-based development initiatives.",
      "Encourage community participation.",
    ],
    activities: [
      "Community meetings.",
      "Awareness programmes.",
      "Development initiatives.",
      "Volunteer engagement.",
    ],
    impact: [
      "Greater community engagement.",
      "Improved awareness.",
      "Support for social development initiatives.",
    ],
  },
];

function getStatusClasses(status: Project["status"]) {
  if (status === "Completed") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (status === "Upcoming") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f5f8f7]">
        <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
            <h1 className="text-3xl font-black text-[#073b4c]">
              Project Not Found
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
              The project you are looking for is currently
              unavailable or the project URL may be incorrect.
            </p>

            <Link
              href="/projects"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#08744f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#066441]"
            >
              <ArrowLeft size={17} />
              Back to Projects
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8f6]">
      {/* HERO */}

      <section className="relative overflow-hidden bg-[#073b4c]">
        <div className="absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#08744f]/30 blur-3xl" />

          <div className="absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full bg-[#c79b36]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          {/* BREADCRUMB */}

          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <Link
              href="/projects"
              className="transition hover:text-white"
            >
              Projects
            </Link>

            <ChevronRight size={14} />

            <span className="max-w-[260px] truncate text-white">
              {project.title}
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white">
                  {project.category}
                </span>

                <span
                  className={`rounded-full border px-4 py-2 text-xs font-bold ${getStatusClasses(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">
                {project.shortDescription}
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Share2 size={17} />
                Share Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT INFORMATION */}

      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 border-x border-b border-slate-200 bg-white p-5 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4 sm:border-b-0 sm:border-r sm:pb-0 lg:pr-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#08744f]">
              <MapPin size={21} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Location
              </p>

              <p className="mt-1 text-sm font-bold text-[#073b4c]">
                {project.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-slate-100 pb-4 sm:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Started
              </p>

              <p className="mt-1 text-sm font-bold text-[#073b4c]">
                {project.startDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-slate-100 pb-4 sm:border-b-0 sm:border-r sm:pb-0 lg:pr-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Users size={21} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Beneficiaries
              </p>

              <p className="mt-1 text-sm font-bold text-[#073b4c]">
                {project.beneficiaries}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#b68b2c]">
              <CircleDollarSign size={21} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Project Budget
              </p>

              <p className="mt-1 text-sm font-bold text-[#073b4c]">
                {project.budget}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* LEFT CONTENT */}

          <div className="space-y-8">
            {/* ABOUT */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#08744f]/10 text-[#08744f]">
                  <HeartHandshake size={21} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#08744f]">
                    About the Project
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-[#073b4c]">
                    Project Overview
                  </h2>
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-sm leading-8 text-slate-600">
                {project.description}
              </p>
            </section>

            {/* OBJECTIVES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Target size={21} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
                    Strategic Focus
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-[#073b4c]">
                    Project Objectives
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.objectives.map(
                  (objective, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#08744f]"
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {objective}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* ACTIVITIES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <Clock3 size={21} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-700">
                    Implementation
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-[#073b4c]">
                    Key Activities
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {project.activities.map(
                  (activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#073b4c] text-xs font-black text-white">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p className="text-sm font-medium text-slate-700">
                        {activity}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* IMPACT */}

            <section className="overflow-hidden rounded-2xl bg-[#073b4c] p-6 shadow-xl sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d9b65d]">
                Expected Impact
              </p>

              <h2 className="mt-3 text-2xl font-black text-white">
                Creating Meaningful Change
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {project.impact.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-white/5 p-5"
                    >
                      <CheckCircle2
                        size={21}
                        className="text-[#d9b65d]"
                      />

                      <p className="mt-3 text-sm leading-6 text-white/75">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#08744f]">
                Project Information
              </p>

              <h3 className="mt-3 text-xl font-black text-[#073b4c]">
                Quick Details
              </h3>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs text-slate-400">
                    Project Category
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#073b4c]">
                    {project.category}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">
                    Current Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">
                    Implementation Area
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#073b4c]">
                    {project.location}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">
                    Beneficiary Group
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#073b4c]">
                    {project.beneficiaries}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#08744f] p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                Support Our Work
              </p>

              <h3 className="mt-3 text-xl font-black leading-7 text-white">
                Help us create a positive impact.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/75">
                Your support helps Anand Jivan Foundation
                Trust continue its charitable and social
                development initiatives.
              </p>

              <Link
                href="/donate"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#08744f] transition hover:bg-slate-100"
              >
                Support the Foundation
                <ArrowRight size={17} />
              </Link>
            </div>

            <Link
              href="/projects"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-[#073b4c] shadow-sm transition hover:border-[#08744f] hover:text-[#08744f]"
            >
              <ArrowLeft size={17} />
              View All Projects
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}