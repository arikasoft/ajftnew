/* app/careers/page.tsx */
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
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
    <main className="min-h-screen overflow-hidden bg-[#F5F8FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0B2535]">

        {/* Decorative background */}

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#176B87]/30 blur-3xl" />

        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#D3A640]/15 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">

            {/* LEFT */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-[#F2C94C]
                  backdrop-blur
                "
              >
                <BriefcaseBusiness size={12} />

                Careers at AJFT
              </div>

              <h1
                className="
                  mt-5
                  max-w-4xl
                  text-4xl
                  font-black
                  leading-[1.08]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Build your career.
                <span className="block text-[#F2C94C]">
                  Create meaningful impact.
                </span>
              </h1>

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/60
                  sm:text-base
                "
              >
                Explore employment opportunities with Anand Jivan
                Foundation Trust and become part of work that supports
                communities, education, development and social impact.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <a
                  href="#openings"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-[#E85D04]
                    via-[#F48C06]
                    to-[#FFB703]
                    px-5
                    py-3
                    text-xs
                    font-black
                    text-white
                    shadow-xl
                    shadow-orange-900/20
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-2xl
                  "
                >
                  Explore Openings
                  <ArrowRight size={14} />
                </a>

                <Link
                  href="/careers/status"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/5
                    px-5
                    py-3
                    text-xs
                    font-bold
                    text-white
                    backdrop-blur
                    transition
                    hover:bg-white/10
                  "
                >
                  <FileCheck2 size={14} />
                  Application Status
                </Link>

              </div>

              {/* QUICK STATS */}

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">

                <HeroStat
                  value="03"
                  label="Current Openings"
                />

                <HeroStat
                  value="Full Time"
                  label="Employment Type"
                />

                <HeroStat
                  value="Darbhanga"
                  label="Primary Location"
                />

              </div>

            </div>

            {/* RIGHT CARD */}

            <div className="relative">

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[1.7rem]
                  border
                  border-white/10
                  bg-white/[0.06]
                  p-5
                  shadow-2xl
                  backdrop-blur-xl
                  sm:p-6
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-[#F2C94C]
                      "
                    >
                      Recruitment Portal
                    </p>

                    <h2 className="mt-2 text-lg font-black text-white">
                      Join the AJFT Team
                    </h2>

                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#F2C94C]/10
                      text-[#F2C94C]
                    "
                  >
                    <Users size={20} />
                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  <PortalPoint
                    icon={<FileText size={15} />}
                    title="Simple Application"
                    text="Submit your application through the official portal."
                  />

                  <PortalPoint
                    icon={<ShieldCheck size={15} />}
                    title="Fair Selection"
                    text="Applications are reviewed against vacancy requirements."
                  />

                  <PortalPoint
                    icon={<CalendarDays size={15} />}
                    title="Interview Process"
                    text="Shortlisted applicants may be contacted for further stages."
                  />

                  <PortalPoint
                    icon={<FileCheck2 size={15} />}
                    title="Application Number"
                    text="Keep your unique recruitment number for future reference."
                  />

                </div>

                <div
                  className="
                    mt-6
                    rounded-xl
                    border
                    border-[#F2C94C]/15
                    bg-[#F2C94C]/5
                    p-4
                  "
                >
                  <p className="text-[9px] font-black uppercase tracking-wider text-[#F2C94C]">
                    Important
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-white/55">
                    Applicants should use only the official AJFT
                    recruitment process for submitting applications.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="border-b border-[#DCE5EA] bg-white">

        <div
          className="
            mx-auto
            flex
            max-w-[1440px]
            flex-wrap
            items-center
            justify-between
            gap-3
            px-5
            py-3
            sm:px-8
          "
        >

          <div className="flex items-center gap-2 text-[9px] font-bold text-[#82919C]">

            <Link
              href="/"
              className="transition hover:text-[#176B87]"
            >
              Home
            </Link>

            <ChevronRight size={11} />

            <span className="text-[#176B87]">
              Careers
            </span>

          </div>

          <Link
            href="/internship"
            className="
              inline-flex
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-[#176B87]
              transition
              hover:text-[#102A43]
            "
          >
            Internship Programme
            <ArrowRight size={11} />
          </Link>

        </div>

      </div>

      {/* =====================================================
          RECRUITMENT PROCESS
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">

          <SectionHeading
            eyebrow="How Recruitment Works"
            title="A simple and transparent process"
            description="From application to selection, every stage follows a structured recruitment process."
          />

          <div className="mt-9 grid gap-4 md:grid-cols-4">

            <ProcessCard
              number="01"
              icon={<Search size={19} />}
              title="Find a Vacancy"
              text="Explore the current openings and review the eligibility requirements."
            />

            <ProcessCard
              number="02"
              icon={<FileText size={19} />}
              title="Submit Application"
              text="Complete the official online application with accurate information."
            />

            <ProcessCard
              number="03"
              icon={<Users size={19} />}
              title="Review & Shortlist"
              text="Applications are assessed against the requirements of the role."
            />

            <ProcessCard
              number="04"
              icon={<CheckCircle2 size={19} />}
              title="Selection"
              text="Shortlisted candidates may be contacted for further recruitment stages."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          OPENINGS
      ====================================================== */}

      <section
        id="openings"
        className="border-y border-[#DCE5EA] bg-[#F5F8FA]"
      >

        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-[#B07B10]
                "
              >
                Opportunities
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102A43] sm:text-3xl">
                Current Openings
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-[#82919C]">
                Browse the currently available employment opportunities
                with Anand Jivan Foundation Trust.
              </p>

            </div>

            <div
              className="
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-[#D8E2E7]
                bg-white
                px-3
                py-2
                text-[9px]
                font-bold
                text-[#607585]
                shadow-sm
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2EBD85]" />

              {openings.length} Active Vacancies
            </div>

          </div>

          <div className="mt-8 space-y-4">

            {openings.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          WORK WITH PURPOSE
      ====================================================== */}

      <section className="bg-[#0B2535]">

        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">

          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

            <div>

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-[#F2C94C]
                "
              >
                Life at AJFT
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
                Work with purpose.
                <span className="block text-[#F2C94C]">
                  Grow with impact.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
                A career at AJFT is an opportunity to combine professional
                growth with meaningful community service and social impact.
              </p>

              <Link
                href="/about"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-[10px]
                  font-black
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Know About AJFT
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              <ImpactCard
                icon={<Users size={19} />}
                title="People First"
                text="A professional environment focused on people and communities."
              />

              <ImpactCard
                icon={<GraduationCap size={19} />}
                title="Learning"
                text="Develop practical skills through meaningful programmes."
              />

              <ImpactCard
                icon={<BriefcaseBusiness size={19} />}
                title="Purpose"
                text="Build your career while contributing to social development."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          APPLICATION STATUS CTA
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">

          <div
            className="
              overflow-hidden
              rounded-[1.5rem]
              border
              border-[#DCE5EA]
              bg-gradient-to-r
              from-[#F7FAFB]
              to-[#EEF6F8]
              p-6
              sm:p-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              <div>

                <div className="flex items-center gap-2">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#102A43]
                      text-white
                    "
                  >
                    <FileCheck2 size={16} />
                  </div>

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#176B87]">
                    Already Applied?
                  </p>

                </div>

                <h2 className="mt-4 text-xl font-black text-[#102A43] sm:text-2xl">
                  Check your application status
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-6 text-[#82919C]">
                  Use your recruitment application details to check the
                  current status of your submitted application.
                </p>

              </div>

              <Link
                href="/careers/status"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#102A43]
                  px-5
                  py-3
                  text-xs
                  font-black
                  text-white
                  shadow-lg
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#176B87]
                "
              >
                Check Application Status
                <ArrowRight size={14} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RECRUITMENT NOTICE
      ====================================================== */}

      <section className="border-t border-[#DCE5EA] bg-[#F5F8FA]">

        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-[#176B87]"
            />

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#526575]">
                Recruitment Notice
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#82919C]">
                Candidates should carefully review the requirements of
                each vacancy and provide accurate information during
                the application process.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-3
        backdrop-blur
      "
    >
      <p className="text-sm font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/35">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   PORTAL POINT
========================================================= */

function PortalPoint({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        flex
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/[0.04]
        p-3
      "
    >

      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#F2C94C]/10
          text-[#F2C94C]
        "
      >
        {icon}
      </div>

      <div>

        <p className="text-[10px] font-black text-white">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-white/40">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">

      <p
        className="
          text-[9px]
          font-black
          uppercase
          tracking-[0.22em]
          text-[#B07B10]
        "
      >
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102A43] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 text-xs leading-6 text-[#82919C]">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   PROCESS CARD
========================================================= */

function ProcessCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[1.25rem]
        border
        border-[#DCE5EA]
        bg-[#F8FAFB]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white
        hover:shadow-[0_18px_40px_rgba(16,42,67,0.08)]
      "
    >

      <div className="flex items-center justify-between">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#102A43]
            text-white
            transition
            group-hover:bg-[#176B87]
          "
        >
          {icon}
        </div>

        <span
          className="
            font-mono
            text-[11px]
            font-black
            text-[#C5D0D7]
          "
        >
          {number}
        </span>

      </div>

      <h3 className="mt-5 text-sm font-black text-[#243B53]">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-[#82919C]">
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   JOB CARD
========================================================= */

function JobCard({
  job,
}: {
  job: (typeof openings)[number];
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[1.4rem]
        border
        border-[#DCE5EA]
        bg-white
        shadow-[0_8px_30px_rgba(16,42,67,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#C59A3A]
        hover:shadow-[0_20px_45px_rgba(16,42,67,0.10)]
      "
    >

      <div className="p-5 sm:p-6 lg:p-7">

        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-[#EEF6F8]
                  px-3
                  py-1.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-wider
                  text-[#176B87]
                "
              >
                <BriefcaseBusiness size={10} />

                {job.type}
              </span>

              <span className="font-mono text-[9px] font-bold text-[#A0ACB5]">
                {job.id}
              </span>

            </div>

            <h3
              className="
                mt-4
                text-xl
                font-black
                tracking-tight
                text-[#102A43]
                transition
                group-hover:text-[#176B87]
                sm:text-2xl
              "
            >
              {job.title}
            </h3>

            <p className="mt-1 text-xs font-bold text-[#B07B10]">
              {job.department}
            </p>

            <div
              className="
                mt-6
                grid
                gap-3
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >

              <JobMeta
                icon={<MapPin size={13} />}
                label="Location"
                value={job.location}
              />

              <JobMeta
                icon={<Building2 size={13} />}
                label="Department"
                value={job.department}
              />

              <JobMeta
                icon={<GraduationCap size={13} />}
                label="Qualification"
                value={job.qualification}
              />

              <JobMeta
                icon={<Clock3 size={13} />}
                label="Experience"
                value={job.experience}
              />

            </div>

          </div>

          <div
            className="
              flex
              shrink-0
              flex-col
              gap-2
              sm:flex-row
              lg:flex-col
            "
          >

            <Link
              href={`/careers/apply?jobId=${encodeURIComponent(
                job.id
              )}`}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#102A43]
                px-5
                py-3
                text-[10px]
                font-black
                text-white
                shadow-lg
                transition-all
                hover:-translate-y-0.5
                hover:bg-[#176B87]
              "
            >
              Apply Now
              <ArrowRight size={13} />
            </Link>

            <span
              className="
                text-center
                text-[8px]
                font-bold
                text-[#9AA7B0]
              "
            >
              Official Application
            </span>

          </div>

        </div>

      </div>

      <div
        className="
          flex
          items-center
          gap-2
          border-t
          border-[#EDF2F4]
          bg-[#FBFCFD]
          px-5
          py-3
          text-[8px]
          font-bold
          text-[#8997A2]
          sm:px-6
          lg:px-7
        "
      >
        <CheckCircle2
          size={11}
          className="text-[#2EBD85]"
        />

        Applications are reviewed against the requirements of this vacancy.
      </div>

    </article>
  );
}

/* =========================================================
   JOB META
========================================================= */

function JobMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#E5ECEF]
        bg-[#F8FAFB]
        p-3
      "
    >

      <div className="flex items-center gap-2">

        <span className="text-[#176B87]">
          {icon}
        </span>

        <span
          className="
            text-[7px]
            font-black
            uppercase
            tracking-[0.14em]
            text-[#9AA7B0]
          "
        >
          {label}
        </span>

      </div>

      <p
        className="
          mt-2
          text-[10px]
          font-bold
          leading-4
          text-[#526575]
        "
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   IMPACT CARD
========================================================= */

function ImpactCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        rounded-[1.25rem]
        border
        border-white/10
        bg-white/[0.05]
        p-5
        transition
        hover:bg-white/[0.08]
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-[#F2C94C]/10
          text-[#F2C94C]
        "
      >
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black text-white">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-white/40">
        {text}
      </p>

    </div>
  );
}