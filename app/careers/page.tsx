/* app/careers/page.tsx */
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  MapPin,
  Search,
  Users,
} from "lucide-react";

const openings = [
  {
    id: "CAREER-2026-001",
    title: "Programme Coordinator",
    department: "Programme & Community Development",
    location: "Darbhanga, Bihar",
    type: "Full Time",
    qualification: "Graduate / Post Graduate",
    experience: "0–3 Years",
  },
  {
    id: "CAREER-2026-002",
    title: "Field Coordinator",
    department: "Community Outreach",
    location: "Darbhanga, Bihar",
    type: "Full Time",
    qualification: "Graduate",
    experience: "0–2 Years",
  },
  {
    id: "CAREER-2026-003",
    title: "Digital & Documentation Executive",
    department: "Digital Communication",
    location: "Darbhanga, Bihar",
    type: "Full Time",
    qualification: "Graduate / Diploma",
    experience: "0–2 Years",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#f3f5f7] text-slate-800">
      <header className="border-b-4 border-[#c99a2e] bg-[#12345b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white text-[#12345b]">
                <BriefcaseBusiness size={27} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7c86c]">
                  Anand Jivan Foundation Trust
                </p>
                <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                  Careers & Recruitment
                </h1>
                <p className="mt-1 text-[9px] text-white/70">
                  Official Employment Opportunity Portal
                </p>
              </div>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[9px] uppercase tracking-wider text-white/50">
                Recruitment Portal
              </p>
              <p className="mt-1 text-xs font-semibold">
                Join us in serving communities
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="text-[10px] font-bold text-[#244e78] hover:text-[#12345b]"
          >
            Home
          </Link>
          <Link
            href="/internship"
            className="text-[10px] font-bold text-[#244e78] hover:text-[#12345b]"
          >
            Internship Programme
          </Link>
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.35fr_.65fr] lg:py-14">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a6a08]">
              Careers at AJFT
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-[#172b40] sm:text-5xl">
              Work with purpose. Serve with impact.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
              Explore current employment opportunities with Anand Jivan
              Foundation Trust. Select a suitable vacancy and submit your
              application through the official recruitment process.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 rounded bg-[#12345b] px-5 py-3 text-xs font-bold text-white hover:bg-[#0c2846]"
              >
                View Current Openings
                <ArrowRight size={14} />
              </a>

              <Link
                href="/careers/status"
                className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-[#24364a] hover:border-[#12345b]"
              >
                Check Application Status
              </Link>
            </div>
          </div>

          <div className="border border-slate-200 bg-[#f8fafc] p-6">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a6a08]">
              Recruitment Information
            </p>

            <div className="mt-5 space-y-4">
              <Info icon={<FileText size={16} />} title="Online Application" text="Apply only through the official recruitment portal." />
              <Info icon={<Users size={16} />} title="Fair Selection" text="Applications are reviewed against the requirements of each vacancy." />
              <Info icon={<CalendarDays size={16} />} title="Interview Process" text="Shortlisted applicants may be contacted for further stages." />
              <Info icon={<BriefcaseBusiness size={16} />} title="Application Number" text="Every successful submission receives a unique recruitment number." />
            </div>
          </div>
        </div>
      </section>

      <section id="openings" className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a6a08]">
              Vacancies
            </p>
            <h2 className="mt-1 text-2xl font-black text-[#172b40]">
              Current Openings
            </h2>
          </div>

          <div className="flex items-center gap-2 border border-slate-300 bg-white px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <span className="text-[10px] text-slate-400">
              Current vacancies
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {openings.map((job) => (
            <article
              key={job.id}
              className="border border-slate-200 bg-white shadow-sm transition hover:border-[#9a6a08]"
            >
              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#e8eef5] px-2 py-1 text-[8px] font-bold uppercase text-[#12345b]">
                      {job.type}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400">
                      {job.id}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-black text-[#172b40]">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-[#244e78]">
                    {job.department}
                  </p>

                  <div className="mt-5 grid gap-3 text-[10px] text-slate-500 sm:grid-cols-2 lg:grid-cols-4">
                    <Meta icon={<MapPin size={13} />} text={job.location} />
                    <Meta icon={<Building2 size={13} />} text={job.department} />
                    <Meta icon={<GraduationCap size={13} />} text={job.qualification} />
                    <Meta icon={<Clock3 size={13} />} text={job.experience} />
                  </div>
                </div>

                <div className="flex items-center">
                  <Link
                    href={`/careers/apply?jobId=${encodeURIComponent(job.id)}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#12345b] px-5 py-3 text-xs font-bold text-white hover:bg-[#0c2846] sm:w-auto"
                  >
                    Apply Now
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8 md:grid-cols-3">
          <Card icon={<Users size={20} />} title="People First" text="A professional environment focused on community impact and responsible service." />
          <Card icon={<GraduationCap size={20} />} title="Learning" text="Opportunities to develop practical skills through meaningful programmes." />
          <Card icon={<BriefcaseBusiness size={20} />} title="Purpose" text="Build your career while contributing to social development initiatives." />
        </div>
      </section>

      <footer className="border-t-4 border-[#c99a2e] bg-[#12345b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center sm:px-8">
          <p className="text-[9px] font-bold">ANAND JIVAN FOUNDATION TRUST</p>
          <p className="mt-1 text-[8px] text-white/55">
            Careers & Recruitment Portal · Darbhanga, Bihar, India
          </p>
        </div>
      </footer>
    </main>
  );
}

function Info({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#e8eef5] text-[#12345b]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#172b40]">{title}</p>
        <p className="mt-1 text-[9px] leading-4 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function Meta({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span className="flex items-start gap-2">
      <span className="mt-0.5 text-[#9a6a08]">{icon}</span>
      <span>{text}</span>
    </span>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-slate-200 bg-[#f8fafc] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded bg-[#e8eef5] text-[#12345b]">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#172b40]">{title}</h3>
      <p className="mt-2 text-[10px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}