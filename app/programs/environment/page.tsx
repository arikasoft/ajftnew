"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  TreePine,
  Upload,
  Users,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Register",
    description:
      "Create your AJFT Environment Programme participant account.",
    icon: Users,
  },
  {
    number: "02",
    title: "Plant a Tree",
    description:
      "Plant a tree and help create a greener and healthier future.",
    icon: TreePine,
  },
  {
    number: "03",
    title: "Upload Proof",
    description:
      "Submit plantation details, photographs and location information.",
    icon: Upload,
  },
  {
    number: "04",
    title: "Get Verified",
    description:
      "Your plantation submission is reviewed by the AJFT programme team.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Earn Rewards",
    description:
      "Eligible and approved plantations may receive programme rewards.",
    icon: CircleDollarSign,
  },
];

const benefits = [
  "Digital participant account",
  "Plantation submission tracking",
  "Photo evidence submission",
  "Location-based verification",
  "Environmental contribution record",
  "Programme reward eligibility",
  "Personal impact dashboard",
  "Digital participation certificate",
];

export default function EnvironmentProgrammePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-400 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-lime-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                AJFT Environment Conservation Programme
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ped Lagao.
                <span className="block bg-gradient-to-r from-lime-300 to-emerald-300 bg-clip-text text-transparent">
                  Prakriti Bachao.
                </span>
                <span className="block">Rewards Pao.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100/90">
                Join the Anand Jivan Foundation Trust environment initiative.
                Plant trees, submit plantation proof, track your contribution
                and become part of a greener future.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/environment/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-emerald-950 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <TreePine className="h-5 w-5" />
                  Join the Programme
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/environment/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Participant Login
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-emerald-200/70">
                Rewards and cash bonuses, if offered, are subject to AJFT
                programme terms, verification and approval.
              </p>
            </div>

            {/* HERO CARD */}
            <div className="relative">
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-400 via-green-500 to-lime-400 p-1">
                  <div className="rounded-[1.35rem] bg-emerald-950 p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-emerald-300">
                          YOUR ENVIRONMENTAL JOURNEY
                        </p>

                        <h2 className="mt-2 text-2xl font-black text-white">
                          Plant. Verify. Impact.
                        </h2>
                      </div>

                      <div className="rounded-2xl bg-emerald-400/20 p-4">
                        <Leaf className="h-9 w-9 text-lime-300" />
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <TreePine className="h-7 w-7 text-lime-300" />
                        <p className="mt-4 text-2xl font-black text-white">
                          🌳
                        </p>
                        <p className="mt-1 text-sm text-emerald-200">
                          Plant Trees
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <Upload className="h-7 w-7 text-emerald-300" />
                        <p className="mt-4 text-2xl font-black text-white">
                          📸
                        </p>
                        <p className="mt-1 text-sm text-emerald-200">
                          Submit Proof
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <ShieldCheck className="h-7 w-7 text-teal-300" />
                        <p className="mt-4 text-2xl font-black text-white">
                          ✓
                        </p>
                        <p className="mt-1 text-sm text-emerald-200">
                          Get Verified
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <CircleDollarSign className="h-7 w-7 text-yellow-300" />
                        <p className="mt-4 text-2xl font-black text-white">
                          ₹
                        </p>
                        <p className="mt-1 text-sm text-emerald-200">
                          Eligible Rewards
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/environment/plant-tree"
                      className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lime-300 to-emerald-300 px-5 py-4 font-black text-emerald-950 transition hover:scale-[1.02]"
                    >
                      Start Your Green Journey
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="block h-auto w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,70 C240,120 480,0 720,45 C960,90 1200,20 1440,55 L1440,120 L0,120 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="relative z-10 mx-auto -mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/environment/register"
            className="group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-700">
                <Users />
              </div>

              <div>
                <h3 className="font-black text-slate-900">
                  New Participant
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your participant account
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/environment/track"
            className="group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-teal-100 p-4 text-teal-700">
                <MapPin />
              </div>

              <div>
                <h3 className="font-black text-slate-900">
                  Track Plantation
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Check plantation status
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/environment/login"
            className="group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-yellow-100 p-4 text-yellow-700">
                <CircleDollarSign />
              </div>

              <div>
                <h3 className="font-black text-slate-900">
                  My Dashboard
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View trees, impact and rewards
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
            SIMPLE & TRANSPARENT PROCESS
          </div>

          <h2 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl">
            How the Programme Works
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Participate in a few simple steps and build your personal
            environmental contribution record.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="absolute right-5 top-5 text-sm font-black text-emerald-500">
                  {step.number}
                </span>

                <div className="inline-flex rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 p-4">
                  <Icon className="h-7 w-7 text-emerald-700" />
                </div>

                <h3 className="mt-6 text-lg font-black text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              <Leaf className="h-4 w-4" />
              PROGRAMME BENEFITS
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Your Trees.
              <br />
              Your Impact.
              <br />
              Your Digital Record.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Every verified plantation becomes part of your personal AJFT
              environment contribution journey.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <span className="font-semibold text-slate-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-950 via-green-900 to-teal-900 p-8 shadow-2xl sm:p-10">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex rounded-2xl bg-white/10 p-4">
                  <TreePine className="h-10 w-10 text-lime-300" />
                </div>

                <h3 className="mt-8 text-3xl font-black text-white">
                  Make Your Green Contribution Count
                </h3>

                <p className="mt-5 text-lg leading-8 text-emerald-100/80">
                  Register today and start recording your tree plantation
                  contribution through the AJFT Environment Programme.
                </p>
              </div>

              <Link
                href="/environment/register"
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-emerald-950 transition hover:scale-[1.02]"
              >
                Become a Participant
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-lime-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <TreePine className="mx-auto h-14 w-14 text-lime-300" />

          <h2 className="mt-6 text-3xl font-black text-white sm:text-5xl">
            One Tree Can Start
            <br />
            a Bigger Change.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Join the AJFT Environment Programme and start your documented
            environmental contribution journey.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/programs/environment/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lime-300 to-emerald-300 px-7 py-4 font-black text-emerald-950"
            >
              Register Now
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/programs/environment/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-7 py-4 font-black text-white transition hover:bg-white/10"
            >
              Participant Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}