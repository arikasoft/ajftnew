"use client";

import Link from "next/link";
import {
  Activity,
  Ambulance,
  ArrowRight,
  Baby,
  Brain,
  CheckCircle2,
  ChevronRight,
  Heart,
  HeartHandshake,
  Hospital,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Cross,
  Phone,
  CalendarDays,
  MapPin,
  HandHeart,
  Apple,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Primary Healthcare",
    description:
      "Supporting access to basic health consultations, awareness and essential healthcare services for underserved communities.",
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Heart,
    title: "Maternal & Child Health",
    description:
      "Promoting better health awareness and support for mothers, infants and children during important stages of life.",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
  },
  {
    icon: Ambulance,
    title: "Health Assistance",
    description:
      "Helping communities connect with healthcare support and essential assistance during medical needs.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
  },
  {
    icon: Pill,
    title: "Medicine Support",
    description:
      "Supporting access to essential medicines and healthcare resources for individuals facing financial challenges.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    icon: Brain,
    title: "Mental Wellbeing",
    description:
      "Promoting awareness, emotional wellbeing and supportive conversations around mental health.",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Apple,
    title: "Nutrition Awareness",
    description:
      "Encouraging healthy nutrition practices and awareness for stronger and healthier communities.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
];

const programs = [
  {
    number: "01",
    title: "Community Health Awareness",
    description:
      "Health awareness activities designed to help communities understand prevention, hygiene and healthy living.",
    icon: Users,
  },
  {
    number: "02",
    title: "Health Check-up Support",
    description:
      "Supporting health camps and initiatives that help communities access basic health screening and consultations.",
    icon: Activity,
  },
  {
    number: "03",
    title: "Women & Child Health",
    description:
      "Focused initiatives supporting awareness and wellbeing related to maternal and child health.",
    icon: Baby,
  },
  {
    number: "04",
    title: "Preventive Healthcare",
    description:
      "Promoting early awareness and healthier practices to reduce preventable health risks.",
    icon: ShieldCheck,
  },
];

const commitments = [
  "Promote access to basic healthcare",
  "Support health awareness in communities",
  "Encourage preventive healthcare",
  "Promote maternal and child wellbeing",
  "Support healthcare access for underserved groups",
  "Strengthen community health awareness",
];

export default function HealthcarePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#071c35] via-[#073c5c] to-[#075c5a]">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute left-[-100px] top-20 h-[400px] w-[400px] rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute right-[-100px] top-[-80px] h-[450px] w-[450px] rounded-full bg-pink-400/15 blur-3xl" />
          <div className="absolute bottom-[-150px] left-1/3 h-[350px] w-[350px] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 lg:px-8 lg:pb-40 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur-xl">
                <Heart className="text-pink-300" size={17} />
                Healthcare & Community Wellbeing
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Better Health.
                <span className="block bg-gradient-to-r from-cyan-300 via-emerald-300 to-yellow-200 bg-clip-text text-transparent">
                  Stronger Communities.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-cyan-50/80">
                Anand Jivan Foundation Trust works towards improving health
                awareness, encouraging preventive healthcare and supporting
                access to essential healthcare services for communities.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/donate"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#063a50] shadow-xl transition hover:-translate-y-1 hover:bg-cyan-50"
                >
                  <HeartHandshake size={19} />
                  Support Healthcare
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <Phone size={18} />
                  Partner With Us
                </Link>
              </div>

              {/* Mini Stats */}
              <div className="mt-14 grid grid-cols-3 gap-5 border-t border-white/10 pt-8">
                <div>
                  <div className="text-xl font-bold text-white">
                    Healthy
                  </div>
                  <div className="mt-1 text-xs text-cyan-100/70">
                    Communities
                  </div>
                </div>

                <div>
                  <div className="text-xl font-bold text-white">
                    Equal
                  </div>
                  <div className="mt-1 text-xs text-cyan-100/70">
                    Access
                  </div>
                </div>

                <div>
                  <div className="text-xl font-bold text-white">
                    Better
                  </div>
                  <div className="mt-1 text-xs text-cyan-100/70">
                    Tomorrow
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PREMIUM HEALTH CARD */}
            <div className="relative">
              <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl">
                <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-emerald-400/10 p-7">
                  <div className="grid gap-5">
                    {/* Main Card */}
                    <div className="rounded-3xl border border-white/10 bg-[#06283c]/80 p-7 backdrop-blur">
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-pink-400/15 p-4 text-pink-300">
                          <Heart size={38} />
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-cyan-300">
                            OUR HEALTH MISSION
                          </div>

                          <h3 className="mt-2 text-2xl font-bold text-white">
                            Care That Reaches Everyone
                          </h3>

                          <p className="mt-3 leading-7 text-cyan-50/70">
                            Supporting healthier lives through awareness,
                            access, prevention and community participation.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Small Cards */}
                    <div className="grid grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
                        <Activity className="text-cyan-300" size={30} />

                        <div className="mt-5 font-bold text-white">
                          Prevention
                        </div>

                        <p className="mt-2 text-sm leading-6 text-cyan-100/70">
                          Awareness for healthier living.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
                        <Hospital className="text-emerald-300" size={30} />

                        <div className="mt-5 font-bold text-white">
                          Access
                        </div>

                        <p className="mt-2 text-sm leading-6 text-cyan-100/70">
                          Connecting people with support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Emergency Style Card */}
              <div className="absolute -bottom-8 -left-4 hidden rounded-2xl bg-white p-5 shadow-2xl sm:block">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-red-50 p-3 text-red-500">
                    <Cross size={24} />
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Community Care
                    </div>

                    <div className="text-sm text-slate-500">
                      Health support initiatives
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 150"
            className="block h-auto w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,150L0,150Z"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-10 bg-cyan-600" />
              Our Healthcare Vision
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Healthcare Is A
              <span className="block bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Basic Human Need.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              Good health enables people to learn, work, care for their
              families and actively participate in society. We believe that
              communities become stronger when people have access to health
              information and essential support.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Through awareness initiatives, health support activities and
              partnerships, AJFT aims to encourage healthier practices and
              reduce barriers that prevent communities from seeking timely
              healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-50 py-24">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-pink-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              Healthcare Focus Areas
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Supporting Health From
              <span className="block text-cyan-700">
                Every Important Direction.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our healthcare initiatives focus on awareness, prevention,
              wellbeing and improved access to essential support.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-3xl border border-white bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.color}`}
                  />

                  <div
                    className={`inline-flex rounded-2xl ${service.bg} p-4`}
                  >
                    <div
                      className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    >
                      <Icon size={32} />
                    </div>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-700"
                  >
                    Learn More
                    <ChevronRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRAMS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Our Programs
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Building A Healthier
              <span className="block">Community Together.</span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-600">
              Meaningful healthcare change requires community participation,
              awareness and collaboration between individuals and
              organizations.
            </p>

            <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 p-8 text-white shadow-xl">
              <HandHeart size={40} className="text-cyan-100" />

              <h3 className="mt-6 text-2xl font-bold">
                Together For Better Health
              </h3>

              <p className="mt-4 leading-7 text-cyan-50">
                We welcome individuals, volunteers and organizations to support
                healthcare awareness and community wellbeing initiatives.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-cyan-700 transition hover:bg-cyan-50"
              >
                Join Our Initiative
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            {programs.map((program) => {
              const Icon = program.icon;

              return (
                <div
                  key={program.number}
                  className="group flex gap-5 rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-cyan-200 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-emerald-50 text-cyan-700">
                    <Icon size={26} />
                  </div>

                  <div>
                    <div className="text-xs font-bold tracking-wider text-cyan-600">
                      PROGRAM {program.number}
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {program.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {program.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMITMENT
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#061A2E] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Our Commitment
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Healthier Lives.
                <span className="block text-cyan-300">
                  Stronger Futures.
                </span>
              </h2>

              <p className="mt-7 max-w-xl leading-8 text-slate-300">
                Our healthcare efforts are guided by the belief that every
                person deserves dignity, awareness and the opportunity to live
                a healthier life.
              </p>

              <Link
                href="/donate"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-[#061A2E] transition hover:bg-cyan-300"
              >
                Support Our Work
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <div
                  key={commitment}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-cyan-300"
                    size={22}
                  />

                  <span className="leading-7 text-slate-200">
                    {commitment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="px-6 py-24 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 px-8 py-16 shadow-2xl sm:px-14">
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-yellow-300/20 blur-2xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 font-semibold text-pink-50">
                <Sparkles size={20} />
                Make A Meaningful Difference
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Your Support Can Help
                <span className="block">Build Healthier Communities.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-pink-50">
                Join Anand Jivan Foundation Trust in supporting healthcare
                awareness, wellbeing and initiatives that create positive
                change.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-rose-600 shadow-lg transition hover:-translate-y-1 hover:bg-slate-50"
              >
                <Heart size={19} />
                Donate Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <CalendarDays size={19} />
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}