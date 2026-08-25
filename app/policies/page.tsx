import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  LockKeyhole,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const policies = [
  {
    title: "Child Protection Policy",
    description:
      "Our commitment to protecting children from abuse, exploitation, neglect and any form of harm.",
    icon: ShieldCheck,
    href: "/policies/child-protection",
    status: "Active",
  },
  {
    title: "Safeguarding Policy",
    description:
      "Standards and responsibilities designed to promote safety, dignity and respect for everyone.",
    icon: UserRoundCheck,
    href: "/policies/safeguarding",
    status: "Active",
  },
  {
    title: "Privacy & Data Protection",
    description:
      "Guidelines for responsible collection, use, storage and protection of personal information.",
    icon: LockKeyhole,
    href: "/policies/privacy",
    status: "Active",
  },
  {
    title: "Anti-Fraud & Anti-Corruption",
    description:
      "Our approach to preventing fraud, corruption, misuse of resources and unethical practices.",
    icon: Scale,
    href: "/policies/anti-fraud",
    status: "Active",
  },
  {
    title: "Conflict of Interest Policy",
    description:
      "Guidelines for identifying, disclosing and managing potential conflicts of interest.",
    icon: FileCheck2,
    href: "/policies/conflict-of-interest",
    status: "Active",
  },
  {
    title: "Whistleblower Policy",
    description:
      "A safe and responsible framework for raising concerns about misconduct or irregularities.",
    icon: HeartHandshake,
    href: "/policies/whistleblower",
    status: "Active",
  },
];

const principles = [
  "Integrity and ethical conduct",
  "Respect for human dignity",
  "Transparency and accountability",
  "Protection of children and vulnerable people",
  "Responsible use of resources",
  "Confidentiality and data protection",
];

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0E7183]/30 blur-3xl" />

        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#D99A16]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">

              <ShieldCheck
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                Governance & Policies
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Policies That
              <span className="block text-[#F2C94C]">
                Build Trust
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Our policies provide a framework for responsible,
              ethical, transparent and accountable work while
              protecting the people and communities we serve.
            </p>

          </div>

        </div>

        {/* WAVE */}

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">

          <svg
            viewBox="0 0 1440 120"
            className="block h-[70px] w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,85 C220,20 360,115 600,65 C850,10 1000,110 1200,55 C1320,25 1380,45 1440,20 L1440,120 L0,120 Z"
              fill="#F5F8F7"
            />
          </svg>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
              Our Commitment
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
              Responsible Action.
              <span className="block text-[#087E8B]">
                Meaningful Impact.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Anand Jivan Foundation Trust is committed to
              conducting its activities with integrity,
              accountability and respect for the communities,
              beneficiaries, volunteers, partners and supporters
              associated with its work.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Our policies help establish clear expectations,
              responsibilities and standards for responsible
              organisational conduct.
            </p>

          </div>

          <div className="rounded-[2rem] bg-[#073B4C] p-7 text-white shadow-xl">

            <ShieldCheck
              size={28}
              className="text-[#F2C94C]"
            />

            <h3 className="mt-5 text-xl font-black">
              Our Policy Principles
            </h3>

            <div className="mt-5 space-y-3">

              {principles.map(
                (principle, index) => (
                  <div
                    key={`${principle}-${index}`}
                    className="flex gap-3"
                  >

                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-[#F2C94C]"
                    />

                    <span className="text-[11px] leading-5 text-white/75">
                      {principle}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          POLICY GRID
      ====================================================== */}

      <section className="border-y border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="mb-10">

            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
              Policy Library
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
              Our Policies
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Explore the policies and frameworks that guide
              our organisational practices.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {policies.map(
              (policy, index) => {

                const Icon = policy.icon;

                return (
                  <article
                    key={`${policy.title}-${index}`}
                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#087E8B]/30 hover:shadow-xl"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B] transition group-hover:bg-[#087E8B] group-hover:text-white">

                        <Icon size={21} />

                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1.5 text-[7px] font-black uppercase tracking-wider text-green-600">
                        {policy.status}
                      </span>

                    </div>

                    <h3 className="mt-6 text-lg font-black leading-snug text-[#102A43] transition group-hover:text-[#087E8B]">
                      {policy.title}
                    </h3>

                    <p className="mt-3 text-[11px] leading-6 text-slate-500">
                      {policy.description}
                    </p>

                    <Link
                      href={policy.href}
                      className="mt-6 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-[#087E8B]"
                    >
                      Read Policy
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                  </article>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          SAFEGUARDING BANNER
      ====================================================== */}

      <section className="bg-[#F5F8F7]">

        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#073B4C]">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D99A16]/20 blur-3xl" />

            <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-[#0E7183]/30 blur-3xl" />

            <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">

              <div>

                <div className="flex items-center gap-2 text-[#F2C94C]">

                  <ShieldCheck size={18} />

                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                    Safeguarding Matters
                  </span>

                </div>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  Safety, Dignity & Respect
                </h2>

                <p className="mt-3 max-w-2xl text-xs leading-6 text-white/65">
                  We are committed to creating an environment
                  where people are treated with dignity and
                  where concerns can be raised responsibly.
                </p>

              </div>

              <Link
                href="/policies/safeguarding"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
              >
                Safeguarding Policy
                <ArrowRight size={14} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DOCUMENT REQUEST
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">

          <FileCheck2
            size={28}
            className="mx-auto text-[#087E8B]"
          />

          <h2 className="mt-5 text-3xl font-black text-[#102A43] sm:text-4xl">
            Need More Information?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            If you require information about a particular
            policy, governance process or organisational
            practice, please contact our team.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/transparency"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#087E8B] transition hover:border-[#087E8B]"
            >
              Transparency
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}