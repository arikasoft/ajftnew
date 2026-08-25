"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Library,
  Lightbulb,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

/* ==========================================================
   AJFT — EDUCATION PROGRAM
   SPECIAL FOCUS AREA
   ========================================================== */

const educationAreas = [
  {
    icon: School,
    title: "Better Learning Spaces",
    text: "Supporting schools with improved learning environments, essential facilities and child-friendly spaces.",
  },
  {
    icon: BookOpen,
    title: "Learning Support",
    text: "Helping children strengthen foundational learning, reading habits and academic confidence.",
  },
  {
    icon: Laptop,
    title: "Digital Learning",
    text: "Promoting access to digital learning resources, ICT-based education and technology awareness.",
  },
  {
    icon: Users,
    title: "Teacher & Community Support",
    text: "Working with teachers, families and communities to create stronger support systems for children.",
  },
];

const focusPoints = [
  "School infrastructure and basic learning facilities",
  "Foundational literacy and learning support",
  "Digital education and ICT awareness",
  "Library and reading initiatives",
  "Arts, creativity and activity-based learning",
  "Girl child education and inclusion",
  "Community participation in education",
  "Career, skills and future-readiness awareness",
];

const approach = [
  {
    number: "01",
    title: "Identify",
    text: "Understand the educational needs of children, schools and communities.",
  },
  {
    number: "02",
    title: "Support",
    text: "Provide practical support according to identified priorities and available resources.",
  },
  {
    number: "03",
    title: "Engage",
    text: "Work with schools, teachers, families, volunteers and local communities.",
  },
  {
    number: "04",
    title: "Sustain",
    text: "Focus on solutions that can create meaningful and lasting educational impact.",
  },
];

const outcomes = [
  {
    icon: BookOpen,
    title: "Stronger Learning",
    text: "Children receive better opportunities to learn and participate.",
  },
  {
    icon: Lightbulb,
    title: "Confidence & Creativity",
    text: "Learning becomes more practical, engaging and child-friendly.",
  },
  {
    icon: Laptop,
    title: "Digital Readiness",
    text: "Children and communities gain greater exposure to technology.",
  },
  {
    icon: GraduationCap,
    title: "Future Opportunities",
    text: "Education becomes a stronger pathway towards future possibilities.",
  },
];

export default function EducationProgramPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FB] text-[#17243A]">

      {/* ====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#172554] px-4 py-12 sm:px-5 md:py-16">

        {/* Lightweight decorative shapes */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#38BDF8]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#FBBF24]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-[12%] top-12 h-24 w-24 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute bottom-10 left-[18%] h-10 w-10 rounded-full border border-[#38BDF8]/15" />

        <div className="relative mx-auto max-w-6xl">

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#FBBF24]">
                  AJFT Special Focus Area
                </span>

              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#38BDF8]">
                Education & Opportunity
              </p>

              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-[1.02] text-white sm:text-5xl md:text-6xl">

                Building
                <br />

                <span className="text-[#38BDF8]">
                  Opportunities
                </span>

                <br />

                Through Education

              </h1>

              <p className="mt-5 max-w-xl text-[11px] leading-6 text-white/65 sm:text-sm">
                Education is one of our special focus areas.
                We work towards stronger learning environments,
                better educational opportunities and inclusive
                development for children and communities.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">

                <Link
                  href="/donate"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FBBF24] px-6 text-[10px] font-bold text-[#172554] shadow-lg transition hover:bg-[#F59E0B]"
                >
                  Support Education
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/programs"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-[10px] font-bold text-white transition hover:bg-white/15"
                >
                  Explore Our Work
                </Link>

              </div>

            </div>

            {/* RIGHT VISUAL — CSS ONLY, LIGHTWEIGHT */}

            <div className="relative">

              <div className="relative mx-auto max-w-md rounded-[30px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm">

                <div className="rounded-[24px] bg-[#F8FAFC] p-5">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DBEAFE] text-[#2563EB]">
                      <GraduationCap size={25} />
                    </div>

                    <span className="rounded-full bg-[#FEF3C7] px-3 py-1.5 text-[8px] font-bold text-[#A16207]">
                      EDUCATION
                    </span>

                  </div>

                  <h2 className="mt-6 font-serif text-2xl font-bold text-[#17243A]">
                    Every child deserves
                    <br />
                    a chance to learn.
                  </h2>

                  <p className="mt-3 text-[10px] leading-5 text-[#64748B]">
                    Creating pathways towards better
                    learning, confidence and opportunity.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-[#EFF6FF] p-4">
                      <BookOpen
                        size={18}
                        className="text-[#2563EB]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#17243A]">
                        Learning
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FFFBEB] p-4">
                      <Lightbulb
                        size={18}
                        className="text-[#D97706]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#17243A]">
                        Creativity
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F0FDFA] p-4">
                      <Laptop
                        size={18}
                        className="text-[#0F766E]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#17243A]">
                        Digital
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F5F3FF] p-4">
                      <Users
                        size={18}
                        className="text-[#7C3AED]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#17243A]">
                        Inclusion
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          SPECIAL FOCUS NOTICE
      ===================================================== */}

      <section className="border-b border-[#DCE5EE] bg-white px-4 py-5 sm:px-5">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <Sparkles size={18} />
            </div>

            <div>

              <p className="text-[9px] font-bold uppercase tracking-wider text-[#2563EB]">
                Our Special Focus
              </p>

              <p className="mt-0.5 text-[10px] text-[#64748B]">
                Education and learning opportunities for children
                and communities.
              </p>

            </div>

          </div>

          <Link
            href="/contact"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#BFDBFE] px-4 text-[9px] font-bold text-[#2563EB] transition hover:bg-[#EFF6FF]"
          >
            Partner With Us
            <ArrowRight size={13} />
          </Link>

        </div>

      </section>

      {/* ====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            {/* LEFT */}

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">
                Why Education Matters
              </p>

              <h2 className="mt-2 max-w-xl font-serif text-3xl font-bold leading-tight text-[#17243A] md:text-4xl">
                Education can change
                <span className="text-[#2563EB]">
                  {" "}the direction of a life.
                </span>
              </h2>

            </div>

            {/* RIGHT */}

            <div>

              <p className="text-[11px] leading-6 text-[#64748B] sm:text-xs">
                We believe meaningful education is more than
                classroom attendance. Children need supportive
                environments, learning resources, encouragement,
                technology exposure and opportunities to discover
                their abilities.
              </p>

              <p className="mt-4 text-[11px] leading-6 text-[#64748B] sm:text-xs">
                Our education work therefore looks at the wider
                learning environment and encourages collaboration
                between schools, teachers, families, communities,
                volunteers and partners.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          FOUR AREAS
      ===================================================== */}

      <section className="bg-[#EEF4FA] px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D97706]">
              Our Education Approach
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#17243A] md:text-3xl">
              Supporting the complete learning environment
            </h2>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {educationAreas.map((item, index) => {

              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-[22px] border border-[#DCE5EE] bg-white p-5 shadow-[0_7px_25px_rgba(23,37,61,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#93C5FD] hover:shadow-[0_16px_35px_rgba(23,37,61,0.09)]"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <span className="text-[8px] font-bold text-[#D97706]">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-[#17243A]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#64748B]">
                    {item.text}
                  </p>

                </article>
              );
            })}

          </div>

        </div>

      </section>

      {/* ====================================================
          FOCUS AREAS
      ===================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            {/* LEFT */}

            <div className="rounded-[26px] bg-[#172554] p-7 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBBF24] text-[#172554]">
                <Library size={22} />
              </div>

              <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.28em] text-[#38BDF8]">
                Priority Areas
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                Where we focus
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-white/55">
                Our education initiatives can respond to local
                needs and available partnerships while keeping
                children and learning at the centre.
              </p>

              <Link
                href="/projects"
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#38BDF8] px-5 text-[9px] font-bold text-[#172554] transition hover:bg-[#7DD3FC]"
              >
                View Projects
                <ArrowRight size={14} />
              </Link>

            </div>

            {/* RIGHT */}

            <div className="grid gap-2.5 sm:grid-cols-2">

              {focusPoints.map((item, index) => (

                <div
                  key={item}
                  className="group flex items-start gap-3 rounded-xl border border-[#DCE5EE] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#F8FBFF]"
                >

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] transition group-hover:bg-[#2563EB]">

                    <CheckCircle2
                      size={14}
                      className="text-[#2563EB] group-hover:text-white"
                    />

                  </div>

                  <div>

                    <span className="text-[7px] font-bold text-[#D97706]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-0.5 text-[10px] font-semibold leading-5 text-[#17243A]">
                      {item}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          OUR APPROACH
      ===================================================== */}

      <section className="border-y border-[#DCE5EE] bg-white px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">
              Our Approach
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#17243A] md:text-3xl">
              From need to meaningful action
            </h2>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">

            {approach.map((item) => (

              <article
                key={item.number}
                className="relative rounded-[22px] border border-[#DCE5EE] bg-[#F8FAFC] p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DBEAFE] text-[8px] font-bold text-[#2563EB]">
                    {item.number}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />

                </div>

                <h3 className="mt-5 font-serif text-lg font-bold text-[#17243A]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-[#64748B]">
                  {item.text}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================
          EXPECTED IMPACT
      ===================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D97706]">
                Education Impact
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#17243A]">
                Creating better
                <span className="text-[#2563EB]">
                  {" "}possibilities
                </span>
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-[#64748B] sm:text-[11px]">
                The goal is to create learning environments
                where children can participate, explore,
                build confidence and prepare for the future.
              </p>

              <Link
                href="/impact"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-[#2563EB] hover:text-[#D97706]"
              >
                See Our Impact
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {outcomes.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-[#DCE5EE] bg-white p-5 shadow-[0_6px_22px_rgba(23,37,61,0.05)]"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-[#17243A]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[9px] leading-5 text-[#64748B]">
                      {item.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          SCHOOL / PARTNERSHIP CTA
      ===================================================== */}

      <section className="bg-[#E0F2FE] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white">
            <School size={21} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#0369A1]">
            Schools • Communities • Partners
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#17243A] md:text-3xl">
            Let&apos;s strengthen education together.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-6 text-[#52677A]">
            Schools, institutions, community organisations,
            volunteers and responsible partners can work
            together to create stronger opportunities for
            children.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#172554] px-6 text-[10px] font-bold text-white transition hover:bg-[#0F1B42]"
            >
              Discuss a Partnership
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/volunteer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#93C5FD] bg-white px-6 text-[10px] font-bold text-[#2563EB] transition hover:bg-[#EFF6FF]"
            >
              Become a Volunteer
              <Users size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          DONATE CTA
      ===================================================== */}

      <section className="bg-[#172554] px-4 py-11 sm:px-5 md:py-14">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FBBF24] text-[#172554]">
            <GraduationCap size={22} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#38BDF8]">
            Support Education
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Help create the next opportunity.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[10px] leading-6 text-white/50">
            Your support can contribute towards education,
            learning environments and opportunities for
            children and communities.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FBBF24] px-7 text-[10px] font-bold text-[#172554] transition hover:bg-[#F59E0B]"
            >
              Donate for Education
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/programs"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 text-[10px] font-bold text-white transition hover:bg-white/15"
            >
              All Programmes
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          QUICK LINKS
      ===================================================== */}

      <section className="border-t border-[#DCE5EE] bg-white px-4 py-7 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/programs"
              title="All Programmes"
              text="Explore our wider programme areas."
            />

            <QuickLink
              href="/projects"
              title="Education Projects"
              text="Explore projects and initiatives."
            />

            <QuickLink
              href="/impact"
              title="Our Impact"
              text="See how our work creates change."
            />

            <QuickLink
              href="/contact"
              title="Contact Us"
              text="Talk to the Trust about education."
            />

          </div>

        </div>

      </section>

     
    </main>
  );
}

/* ==========================================================
   QUICK LINK COMPONENT
========================================================== */

function QuickLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-4 transition hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-white"
    >

      <div className="flex items-center justify-between">

        <h3 className="text-[10px] font-bold text-[#17243A]">
          {title}
        </h3>

        <ArrowRight
          size={13}
          className="text-[#2563EB] transition group-hover:translate-x-1"
        />

      </div>

      <p className="mt-1.5 text-[8px] leading-4 text-[#718096]">
        {text}
      </p>

    </Link>
  );
}