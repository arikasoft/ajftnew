"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Library,
  School,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const focusAreas = [
  {
    icon: GraduationCap,
    title: "Access to Education",
    description:
      "Supporting awareness and initiatives that encourage children to access and continue quality education.",
  },
  {
    icon: BookOpen,
    title: "Learning Support",
    description:
      "Promoting improved learning opportunities, educational resources and academic support for children.",
  },
  {
    icon: Laptop,
    title: "Digital Learning",
    description:
      "Encouraging digital literacy and technology-enabled learning opportunities for children and students.",
  },
  {
    icon: Users,
    title: "Inclusive Education",
    description:
      "Promoting equal learning opportunities for children from vulnerable and underserved communities.",
  },
];

const activities = [
  "School education awareness programmes",
  "Educational material and learning resource support",
  "Digital literacy and technology awareness",
  "School infrastructure support initiatives",
  "Awareness for reducing school dropout",
  "Career guidance and learning motivation",
  "Community and parent engagement programmes",
  "Inclusive education awareness for vulnerable children",
];

export default function ChildEducationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#082f49] via-[#075985] to-[#0284c7]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="absolute right-0 top-20 h-[30rem] w-[30rem] rounded-full bg-blue-300/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link
              href="/programs"
              className="transition hover:text-white"
            >
              Programmes
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-white">
              Child Education
            </span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                AJFT EDUCATION PROGRAMME
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Child Education
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Building Brighter Futures
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                Anand Jivan Foundation Trust believes that education
                is one of the strongest foundations for social
                development and a better future for every child.
              </p>

              <p className="mt-4 max-w-3xl leading-8 text-cyan-100/70">
                Our programme focuses on promoting awareness, access,
                learning opportunities, digital education and
                community participation to support children's
                educational development.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-sky-700 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-50"
                >
                  <HeartHandshake className="h-5 w-5" />
                  Support Education
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="#programme"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  Explore Programme
                </Link>
              </div>
            </div>

            {/* Hero Card */}

            <div className="rounded-[2rem] border border-white/15 bg-white/[0.09] p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-300/15 text-cyan-100">
                <School className="h-8 w-8" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-white">
                Every Child Deserves
                <br />
                the Opportunity to Learn.
              </h2>

              <p className="mt-4 leading-7 text-white/70">
                Education helps children develop knowledge,
                confidence, skills and opportunities to participate
                positively in society.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  ["Learn", "Knowledge & Skills"],
                  ["Grow", "Personal Development"],
                  ["Dream", "Future Opportunities"],
                  ["Lead", "Community Participation"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    <p className="text-lg font-black text-white">
                      {value}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}

        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block h-auto w-full"
          >
            <path
              d="M0,70 C200,110 350,20 560,55 C790,95 1020,20 1220,58 C1320,75 1380,80 1440,70 L1440,120 L0,120 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* INTRODUCTION */}

      <section
        id="programme"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
              <Target className="h-4 w-4" />
              OUR APPROACH
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Education for Opportunity and Inclusion
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Many children face barriers that affect regular school
              attendance and learning opportunities. These challenges
              may include economic limitations, lack of awareness,
              limited educational resources and social barriers.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              AJFT works to promote awareness and community-based
              initiatives that support children's learning,
              educational participation and access to opportunities.
            </p>

            <div className="mt-8 rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white p-3 text-sky-700 shadow-sm">
                  <Library className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-black text-slate-950">
                    Programme Vision
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    To promote a more inclusive learning environment
                    where children have better access to education,
                    knowledge, skills and future opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Objectives */}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-500">
                  PROGRAMME OBJECTIVES
                </p>

                <h3 className="text-xl font-black text-slate-950">
                  Our Education Focus
                </h3>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {[
                "Promote awareness regarding the importance of education",
                "Encourage regular school participation",
                "Support learning and educational resource initiatives",
                "Promote digital literacy and technology awareness",
                "Encourage inclusive learning opportunities",
                "Promote parent and community participation in education",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />

                  <p className="font-medium leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              PROGRAMME FOCUS
            </div>

            <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">
              Supporting Every Stage of Learning
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Our approach connects education, learning resources,
              technology and inclusion to encourage broader
              opportunities for children.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-700 transition group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-950">
                    {area.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
              <BookOpen className="h-4 w-4" />
              ACTIVITIES
            </div>

            <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">
              Education Support Initiatives
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {activities.map((activity, index) => (
                <div
                  key={activity}
                  className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="font-semibold leading-6 text-slate-700">
                    {activity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="sticky top-24 h-fit rounded-[2rem] bg-gradient-to-br from-[#082f49] via-[#075985] to-[#0284c7] p-8 text-white shadow-2xl">
            <School className="h-10 w-10 text-cyan-200" />

            <h3 className="mt-6 text-2xl font-black">
              Help Build a Better Future
            </h3>

            <p className="mt-4 leading-8 text-white/75">
              Your support can contribute towards educational
              awareness, learning opportunities and community-based
              initiatives for children.
            </p>

            <Link
              href="/donate"
              className="mt-7 flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-black text-sky-700 transition hover:-translate-y-1"
            >
              Support Education
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="mt-3 flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-bold text-white"
            >
              Partner With AJFT
              <ArrowRight className="h-5 w-5" />
            </Link>
          </aside>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-gradient-to-br from-sky-50 via-white to-indigo-50">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-sky-700">
            <GraduationCap className="h-8 w-8" />
          </div>

          <h2 className="mt-6 text-3xl font-black text-slate-950 sm:text-4xl">
            Together We Can Support Learning
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Help us promote education, learning opportunities and a
            brighter future for children.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 px-7 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
            >
              Support Child Education
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-black text-slate-800"
            >
              All Programmes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}