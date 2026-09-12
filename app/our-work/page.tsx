"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Heart,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Accessibility,
  GraduationCap,
  HandHeart,
  Target,
  Globe2,
  Quote,
} from "lucide-react";

const programs = [
  {
    number: "01",
    title: "Education & Learning",
    description:
      "Creating opportunities for children and young people through education, learning resources, scholarships and community-based initiatives.",
    icon: GraduationCap,
    href: "/programs/education",
    stat: "Learning for every child",
  },
  {
    number: "02",
    title: "Healthcare & Wellbeing",
    description:
      "Supporting communities with healthcare awareness, medical assistance, preventive care and wellbeing initiatives.",
    icon: Stethoscope,
    href: "/programs/health",
    stat: "Health with dignity",
  },
  {
    number: "03",
    title: "Divyang Empowerment",
    description:
      "Promoting inclusion, accessibility, dignity and opportunities for persons with disabilities across communities.",
    icon: Accessibility,
    href: "/programs/divyang",
    stat: "Inclusion without barriers",
  },
  {
    number: "04",
    title: "Environmental Action",
    description:
      "Encouraging sustainable communities through environmental awareness, conservation and green initiatives.",
    icon: Leaf,
    href: "/programs/environment",
    stat: "A greener tomorrow",
  },
  {
    number: "05",
    title: "Women Empowerment",
    description:
      "Supporting women through awareness, education, skills development and opportunities for greater independence.",
    icon: HeartHandshake,
    href: "/programs/women-empowerment",
    stat: "Empowered women, stronger communities",
  },
  {
    number: "06",
    title: "Skill Development",
    description:
      "Helping individuals develop practical skills, confidence and pathways towards sustainable livelihoods.",
    icon: BriefcaseBusiness,
    href: "/programs/skill-development",
    stat: "Skills that create opportunities",
  },
  {
    number: "07",
    title: "Community Development",
    description:
      "Working with communities to strengthen participation, awareness, social development and collective progress.",
    icon: Users,
    href: "/programs/community-development",
    stat: "Communities growing together",
  },
  {
    number: "08",
    title: "Relief & Humanitarian Support",
    description:
      "Standing with vulnerable communities during emergencies and difficult situations with timely support.",
    icon: HandHeart,
    href: "/programs/relief",
    stat: "Support when it matters most",
  },
];

const impactStats = [
  {
    value: "8+",
    label: "Focus Areas",
  },
  {
    value: "100%",
    label: "Commitment",
  },
  {
    value: "Community",
    label: "Driven Approach",
  },
  {
    value: "Sustainable",
    label: "Long-Term Vision",
  },
];

export default function OurWorkPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate overflow-hidden bg-slate-950">
        {/* Background */}

        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.22),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.22),_transparent_30%),linear-gradient(135deg,#020617,#0f172a,#111827)]" />

          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24 lg:px-8 lg:pb-40 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Creating meaningful and lasting change
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl">
              Our Work.
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Our Commitment.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Anand Jivan Foundation Trust works alongside communities to
              create opportunities, strengthen dignity and build pathways
              towards a more inclusive and sustainable future.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/donate"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-4 font-bold text-white shadow-2xl shadow-emerald-500/20 transition hover:scale-105"
              >
                Support Our Work
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                <Globe2 className="h-5 w-5" />
                Learn About AJFT
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 180"
            className="relative block h-[90px] w-full sm:h-[130px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,180L1360,180C1280,180,1120,180,960,180C800,180,640,180,480,180C320,180,160,180,80,180L0,180Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <Target className="h-4 w-4" />
              Our Approach
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Change begins when
              <span className="block text-emerald-600">
                communities lead.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              We believe sustainable development is strongest when communities
              are active participants in shaping their own future.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our programmes focus on practical needs while building
              long-term capacity, awareness, opportunity and resilience.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-emerald-50 p-8 shadow-xl sm:p-10">
              <Quote className="h-12 w-12 text-emerald-500" />

              <p className="mt-6 text-2xl font-bold leading-relaxed text-slate-800">
                “Our work is guided by the belief that every person deserves
                dignity, opportunity and the ability to participate fully in
                society.”
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <Heart className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Anand Jivan Foundation Trust
                  </p>

                  <p className="text-sm text-slate-500">
                    Working for inclusive development
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 -z-10 h-48 w-48 rounded-full bg-emerald-100 blur-3xl" />
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-emerald-400">
              Our Focus
            </p>

            <h2 className="mt-5 text-4xl font-black text-white sm:text-5xl">
              Building impact across
              <span className="block text-emerald-400">
                every stage of life.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10"
              >
                <div className="text-3xl font-black text-white">
                  {item.value}
                </div>

                <div className="mt-3 text-sm font-medium text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRAMMES
      ====================================================== */}

      <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Award className="h-4 w-4" />
            Areas of Intervention
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Where we create
            <span className="block text-blue-600">meaningful change.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our initiatives are designed to address real challenges and
            support individuals and communities through practical,
            people-centred action.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <Link
                href={program.href}
                key={program.number}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="absolute right-6 top-5 text-7xl font-black text-slate-50 transition group-hover:text-emerald-50">
                  {program.number}
                </div>

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 transition group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-8 text-2xl font-black text-slate-900">
                    {program.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {program.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm font-bold text-emerald-600">
                    <span>{program.stat}</span>

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="font-bold uppercase tracking-[0.25em] text-emerald-600">
                How We Work
              </p>

              <h2 className="mt-5 text-4xl font-black text-slate-950">
                More than programmes.
                <span className="block text-emerald-600">
                  A shared mission.
                </span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Users className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Community Partnership
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Working alongside communities and valuing local voices.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Accountability
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Promoting responsible, transparent and ethical practices.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                  <BookOpen className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Learning & Growth
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Continuously learning and improving the way we serve.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                  <Heart className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Human Dignity
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Respecting every individual and promoting equal opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-cyan-700 py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-950 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/15 text-white backdrop-blur-xl">
            <HeartHandshake className="h-10 w-10" />
          </div>

          <h2 className="mt-8 text-4xl font-black text-white sm:text-6xl">
            Be part of the change.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
            Your support can help create opportunities, strengthen communities
            and build a more inclusive future for everyone.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-black text-emerald-700 shadow-2xl transition hover:scale-105"
            >
              Donate Now
              <Heart className="h-5 w-5 fill-current" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Get Involved
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Bottom Wave */}

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            className="relative block h-[70px] w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}