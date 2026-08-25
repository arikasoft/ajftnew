import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

const principles = [
  "Children should be treated with dignity and respect.",
  "The safety and wellbeing of children should remain a priority.",
  "Concerns relating to child safety should be handled responsibly.",
  "Staff, volunteers and representatives should follow approved safeguarding procedures.",
];

const responsibilities = [
  {
    title: "Safe Environment",
    text: "Support an environment where children can participate safely and respectfully.",
  },
  {
    title: "Responsible Conduct",
    text: "Maintain appropriate professional behaviour when interacting with children.",
  },
  {
    title: "Reporting Concerns",
    text: "Concerns should be brought to the attention of the appropriate responsible person.",
  },
  {
    title: "Confidentiality",
    text: "Information relating to safeguarding concerns should be handled appropriately.",
  },
];

export default function ChildProtectionPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3F7F8] text-[#193247]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#123B4A]">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#2A8C9E]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6A83C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-11 text-center md:py-14">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6A83C] shadow-lg">

            <ShieldCheck
              size={25}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Governance & Safeguarding
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Child Protection Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Principles and responsibilities for supporting
            the safety, dignity and wellbeing of children.
          </p>

        </div>

      </section>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="border-b border-[#D8E5E8] bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <Link
            href="/reports/policies"
            className="flex items-center gap-2 text-[9px] font-bold text-[#16758A] transition hover:text-[#B48726]"
          >
            <ArrowLeft size={13} />
            Back to Policies
          </Link>

          <span className="text-[8px] font-semibold text-gray-400">
            Child Protection
          </span>

        </div>

      </div>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}

            <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                Policy Overview
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                Protecting Children
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Child protection is an important part of
                responsible community work. All activities
                involving children should be planned and
                conducted with appropriate attention to
                their safety and wellbeing.
              </p>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                The policy framework is intended to promote
                respectful conduct and responsible handling
                of concerns involving children.
              </p>

            </div>

            {/* RIGHT */}

            <div className="rounded-2xl bg-[#123B4A] p-5 text-white sm:p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

                <Users size={20} />

              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                Priority
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                Child Safety
              </h2>

              <p className="mt-3 text-[9px] leading-5 text-white/50">
                Every person representing the organisation
                should contribute to a safe and respectful
                environment.
              </p>

              <div className="mt-5 flex items-center gap-2">

                <CheckCircle2
                  size={14}
                  className="text-[#D6A83C]"
                />

                <span className="text-[9px] text-white/65">
                  Safety • Dignity • Respect
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CORE PRINCIPLES
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
            Core Principles
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
            Our Commitment
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {principles.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4"
              >

                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-[#16758A]"
                />

                <p className="text-[9px] leading-5 text-gray-600">
                  {item}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          RESPONSIBILITIES
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Responsibilities
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Implementation Areas
            </h2>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {responsibilities.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#D8E5E8] bg-white p-5"
              >

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5F7] text-[9px] font-bold text-[#16758A]">
                    0{index + 1}
                  </div>

                  <div>

                    <h3 className="font-serif text-lg font-bold text-[#123B4A]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[9px] leading-5 text-gray-500">
                      {item.text}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          POLICY DOCUMENT
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-[#D8E5E8] bg-[#F9FBFC] p-5 text-center sm:p-7">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5F7]">

              <FileText
                size={22}
                className="text-[#16758A]"
              />

            </div>

            <h2 className="mt-3 font-serif text-xl font-bold text-[#123B4A]">
              Policy Document
            </h2>

            <p className="mx-auto mt-1 max-w-xl text-[9px] leading-5 text-gray-500">
              The final approved policy document can be
              made available here for download.
            </p>

            <div className="mt-5">

              <span className="inline-flex items-center gap-2 rounded-lg border border-[#D8E5E8] bg-white px-5 py-2.5 text-[8px] font-bold text-gray-400">
                <FileText size={13} />
                Document to be published
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          IMPORTANT NOTE
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#E7D6A8] bg-[#FFFBEF] p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-[#B18428]"
            />

            <div>

              <h3 className="text-[10px] font-bold text-[#123B4A]">
                Policy Publication Note
              </h3>

              <p className="mt-1 text-[8px] leading-5 text-gray-600">
                The content on this page is a website
                framework and should not be treated as the
                Trust&apos;s formally adopted policy until the
                relevant document has been approved and
                published by the Trust.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK LINKS
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-3 sm:grid-cols-3">

            <QuickLink
              href="/reports/policies"
              title="All Policies"
            />

            <QuickLink
              href="/governance"
              title="Governance"
            />

            <QuickLink
              href="/transparency"
              title="Transparency Centre"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <ShieldCheck
          size={21}
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Safe & Responsible Community Work
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Explore our governance and transparency
          information.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">

          <Link
            href="/reports/policies"
            className="flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#B98D29]"
          >
            All Policies
            <ArrowRight size={12} />
          </Link>

          <Link
            href="/transparency"
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-[9px] font-bold text-white transition hover:border-[#D6A83C]"
          >
            Transparency Centre
            <ArrowRight size={12} />
          </Link>

        </div>

      </section>

    </main>
  );
}

/* ==========================================================
   QUICK LINK
========================================================== */

function QuickLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4 transition hover:-translate-y-0.5 hover:border-[#D6A83C] hover:bg-white hover:shadow-sm"
    >

      <span className="text-[9px] font-bold text-[#123B4A]">
        {title}
      </span>

      <ArrowRight
        size={13}
        className="text-[#16758A] transition group-hover:translate-x-1"
      />

    </Link>
  );
}