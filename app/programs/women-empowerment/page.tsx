"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  HeartHandshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

const focusAreas = [
  {
    icon: BookOpen,
    title: "Education & Skills",
    description:
      "Promoting education, digital awareness, life skills and practical training opportunities for women and girls.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Livelihood Support",
    description:
      "Encouraging skill development, entrepreneurship and livelihood opportunities for greater financial independence.",
  },
  {
    icon: WalletCards,
    title: "Financial Awareness",
    description:
      "Supporting awareness about savings, financial literacy, responsible financial planning and access to opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Rights & Protection",
    description:
      "Promoting awareness regarding dignity, equality, legal rights, safety and protection against discrimination.",
  },
];

const programmeActivities = [
  "Women and girls education awareness programmes",
  "Skill development and livelihood-oriented training",
  "Digital literacy and technology awareness",
  "Entrepreneurship and self-employment awareness",
  "Financial literacy and savings awareness",
  "Health, hygiene and wellbeing awareness",
  "Leadership and community participation initiatives",
  "Awareness regarding rights, dignity and social inclusion",
];

const impactAreas = [
  {
    value: "Skills",
    label: "Capacity Building",
  },
  {
    value: "Income",
    label: "Livelihood Focus",
  },
  {
    value: "Rights",
    label: "Awareness & Inclusion",
  },
  {
    value: "Growth",
    label: "Community Leadership",
  },
];

export default function WomenEmpowermentPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#2a124b] via-[#5b1b58] to-[#9d2c5c]">
        {/* Background Effects */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="absolute right-0 top-10 h-[32rem] w-[32rem] rounded-full bg-pink-300/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link
              href="/"
              className="transition hover:text-white"
            >
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
              Women Empowerment
            </span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-pink-100 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-pink-300" />

                AJFT SOCIAL DEVELOPMENT PROGRAMME
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Women Empowerment
                <span className="block bg-gradient-to-r from-pink-200 via-rose-100 to-orange-200 bg-clip-text text-transparent">
                  for Equal Opportunities
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                Anand Jivan Foundation Trust works to support
                women and girls through awareness, education,
                skill development, livelihood opportunities,
                financial literacy and community participation.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-pink-100/70">
                Our programme focuses on strengthening confidence,
                capabilities and access to opportunities so that
                women can participate more actively in social and
                economic development.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-[#6b1d5c] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-pink-50"
                >
                  <HeartHandshake className="h-5 w-5" />

                  Support This Programme

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

            {/* Right Card */}

            <div className="rounded-[2rem] border border-white/15 bg-white/[0.09] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-300/15 text-pink-100">
                <Users className="h-8 w-8" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-white">
                Building Confidence.
                <br />
                Creating Opportunities.
              </h2>

              <p className="mt-4 leading-7 text-white/70">
                Empowerment begins when individuals have knowledge,
                skills, confidence and opportunities to make informed
                choices and participate equally in society.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {impactAreas.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    <p className="text-lg font-black text-white">
                      {item.value}
                    </p>

                    <p className="mt-1 text-xs font-medium leading-5 text-white/60">
                      {item.label}
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
              d="M0,70 C180,110 350,20 560,55 C790,95 1000,25 1220,58 C1320,72 1380,80 1440,70 L1440,120 L0,120 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section
        id="programme"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700">
              <Target className="h-4 w-4" />

              OUR APPROACH
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Supporting Women to Participate,
              Lead and Grow
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Women play a central role in families, communities and
              economic development. However, many women and girls
              continue to face barriers related to education, skills,
              income opportunities, financial awareness and social
              participation.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              The Women Empowerment Programme of Anand Jivan
              Foundation Trust seeks to promote inclusive
              opportunities through awareness, capacity building and
              community-based initiatives.
            </p>

            <div className="mt-8 rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white p-3 text-pink-700 shadow-sm">
                  <Lightbulb className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-black text-slate-900">
                    Programme Vision
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    To encourage a more inclusive society where women
                    and girls have improved access to knowledge,
                    skills, opportunities and meaningful participation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Objectives */}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
                <BadgeCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-500">
                  PROGRAMME OBJECTIVES
                </p>

                <h3 className="text-xl font-black text-slate-950">
                  Key Focus Areas
                </h3>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {[
                "Promote awareness regarding education and opportunities",
                "Support skill development and capacity building",
                "Encourage livelihood and entrepreneurship awareness",
                "Improve financial literacy and informed decision-making",
                "Promote dignity, equality and social inclusion",
                "Encourage leadership and participation in community development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />

                  <p className="font-medium leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOCUS AREAS
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
              <Sparkles className="h-4 w-4" />

              WHAT WE FOCUS ON
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Pathways Towards Empowerment
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Our programme connects different aspects of empowerment
              to encourage long-term personal, social and economic
              participation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-700 transition group-hover:scale-110">
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

      {/* =====================================================
          ACTIVITIES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
              <TrendingUp className="h-4 w-4" />

              PROGRAMME ACTIVITIES
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Community-Based Activities
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-600">
              Activities may be implemented through awareness
              programmes, community meetings, training sessions,
              educational support and partnerships based on programme
              requirements and available resources.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {programmeActivities.map((activity, index) => (
                <div
                  key={activity}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="font-semibold leading-6 text-slate-700">
                    {activity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Card */}

          <aside className="sticky top-24 rounded-[2rem] bg-gradient-to-br from-[#431a57] via-[#7a235d] to-[#b23b61] p-7 text-white shadow-2xl sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-pink-100">
              <HeartHandshake className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Join the Journey
            </h3>

            <p className="mt-4 leading-8 text-white/75">
              Sustainable empowerment requires collective support.
              Individuals, communities and institutions can contribute
              towards creating better opportunities for women and girls.
            </p>

            <div className="mt-7 space-y-3">
              <Link
                href="/donate"
                className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-black text-[#6a215b] transition hover:-translate-y-0.5"
              >
                Support the Programme

                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-white/15"
              >
                Partner With AJFT

                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          LOCATION & IMPLEMENTATION
      ====================================================== */}

      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
              <MapPin className="h-8 w-8 text-pink-300" />

              <h3 className="mt-5 text-xl font-black text-white">
                Programme Geography
              </h3>

              <p className="mt-3 leading-7 text-white/60">
                Community-focused initiatives in Bihar and other areas
                based on programme requirements and available support.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
              <Users className="h-8 w-8 text-purple-300" />

              <h3 className="mt-5 text-xl font-black text-white">
                Community Participation
              </h3>

              <p className="mt-3 leading-7 text-white/60">
                Encouraging participation of women, families,
                community groups and local stakeholders in development
                activities.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
              <Target className="h-8 w-8 text-orange-300" />

              <h3 className="mt-5 text-xl font-black text-white">
                Long-Term Goal
              </h3>

              <p className="mt-3 leading-7 text-white/60">
                Supporting pathways towards greater confidence,
                participation, opportunities and inclusive development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-pink-700">
              <HeartHandshake className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Together, We Can Create More Opportunities
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Support initiatives that promote education, skills,
              awareness, inclusion and opportunities for women and
              girls.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-700 px-6 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
              >
                Support Women Empowerment

                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-black text-slate-800 transition hover:bg-slate-50"
              >
                Explore All Programmes

                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}