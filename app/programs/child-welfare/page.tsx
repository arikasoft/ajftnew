"use client";

import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Home,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

const impactStats = [
  {
    value: "5,000+",
    label: "Children Supported",
  },
  {
    value: "100+",
    label: "Communities Reached",
  },
  {
    value: "250+",
    label: "Volunteers & Partners",
  },
  {
    value: "24/7",
    label: "Child Support Focus",
  },
];

const focusAreas = [
  {
    icon: BookOpen,
    title: "Education Support",
    description:
      "Supporting children with access to learning opportunities, educational resources and a brighter future.",
  },
  {
    icon: Stethoscope,
    title: "Health & Nutrition",
    description:
      "Promoting child health, nutrition awareness and access to essential wellbeing support.",
  },
  {
    icon: ShieldCheck,
    title: "Child Protection",
    description:
      "Working towards a safer environment where every child is protected, respected and supported.",
  },
  {
    icon: Home,
    title: "Care & Rehabilitation",
    description:
      "Providing support pathways for vulnerable children and helping families build stable futures.",
  },
];

const programmeBenefits = [
  "Child-focused welfare and support initiatives",
  "Education and learning assistance",
  "Health and nutrition awareness programmes",
  "Support for vulnerable and disadvantaged children",
  "Community-based child protection initiatives",
  "Volunteer and partner participation opportunities",
];

export default function ChildWelfarePage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#06234e] via-[#075b9c] to-[#0c9a8d]">
        {/* Decorative backgrounds */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-300 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-300 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-cyan-100 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              AJFT SOCIAL IMPACT PROGRAMME
            </div>

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Every Child
              <span className="block bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                Deserves a Future.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Anand Jivan Foundation Trust works towards creating a safer,
              healthier and more empowered future for children through
              education, health, protection and community support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/programs/child-welfare/apply"
                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-[#063568] shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-950/30"
              >
                Apply for Support
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                Contact Our Team
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-7 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                Child Centred
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                Community Driven
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                Impact Focused
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[45px] bg-cyan-400/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[38px] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[28px] bg-gradient-to-br from-white to-cyan-50 p-8 sm:p-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#075b9c] to-[#0c9a8d] text-white shadow-xl">
                  <Baby className="h-10 w-10" />
                </div>

                <p className="mt-8 text-sm font-black uppercase tracking-[0.25em] text-[#0c9a8d]">
                  CHILD WELFARE PROGRAMME
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                  Protecting childhood.
                  <br />
                  Empowering tomorrow.
                </h2>

                <p className="mt-6 leading-7 text-slate-600">
                  Our programme brings together communities, volunteers,
                  institutions and supporters to create meaningful
                  opportunities for children.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#eff8ff] p-5">
                    <BookOpen className="h-7 w-7 text-[#075b9c]" />
                    <p className="mt-3 text-sm font-black text-slate-900">
                      Education
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#effcf7] p-5">
                    <HeartHandshake className="h-7 w-7 text-[#0c9a8d]" />
                    <p className="mt-3 text-sm font-black text-slate-900">
                      Care
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#fff8ed] p-5">
                    <Stethoscope className="h-7 w-7 text-orange-500" />
                    <p className="mt-3 text-sm font-black text-slate-900">
                      Health
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f3ff] p-5">
                    <ShieldCheck className="h-7 w-7 text-violet-600" />
                    <p className="mt-3 text-sm font-black text-slate-900">
                      Protection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full text-white"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L0,120Z"
          />
        </svg>
      </section>

      {/* IMPACT */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-slate-100 bg-white p-7 shadow-lg shadow-slate-200/40"
            >
              <p className="text-3xl font-black text-[#075b9c]">
                {item.value}
              </p>

              <p className="mt-2 text-sm font-bold text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-black tracking-[0.25em] text-[#0c9a8d]">
              OUR MISSION
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Building a world where every child can thrive.
            </h2>

            <p className="mt-7 leading-8 text-slate-600">
              Children are at the heart of a stronger society. Through our
              Child Welfare Programme, we aim to support initiatives that
              promote education, wellbeing, safety and long-term development.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              We believe that sustainable change is created when communities
              come together and every child receives the opportunity to learn,
              grow and live with dignity.
            </p>

            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-2 font-black text-[#075b9c]"
            >
              Learn About AJFT
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {focusAreas.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[30px] bg-white p-7 shadow-xl shadow-slate-200/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-[#075b9c]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[40px] bg-gradient-to-br from-[#06234e] to-[#075b9c] p-8 text-white shadow-2xl sm:p-14">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-black tracking-[0.25em] text-cyan-200">
                  PROGRAMME SUPPORT
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                  Creating meaningful opportunities for children.
                </h2>

                <p className="mt-6 max-w-xl leading-8 text-blue-100">
                  Our programme is designed to bring together resources,
                  support systems and communities for the wellbeing and
                  development of children.
                </p>

                <Link
                  href="/programs/child-welfare/apply"
                  className="mt-9 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-black text-[#063568] transition hover:-translate-y-1"
                >
                  Start Application
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid gap-4">
                {programmeBenefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 font-black text-emerald-200">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="font-bold text-blue-50">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#eff9ff] via-white to-[#effcf7] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#075b9c] to-[#0c9a8d] text-white shadow-xl">
            <Users className="h-10 w-10" />
          </div>

          <p className="mt-8 text-sm font-black tracking-[0.25em] text-[#0c9a8d]">
            GET INVOLVED
          </p>

          <h2 className="mt-5 text-4xl font-black text-slate-950 sm:text-5xl">
            Together, we can create a better childhood.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
            Apply for support, become a volunteer or connect with Anand Jivan
            Foundation Trust to contribute towards meaningful social impact.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/programs/child-welfare/apply"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#075b9c] to-[#0c9a8d] px-8 py-4 font-black text-white shadow-xl"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/donate"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-4 font-black text-slate-800 shadow-sm"
            >
              Support Our Work
              <HeartHandshake className="h-5 w-5 text-rose-500" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}