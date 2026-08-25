import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Users,
  AlertTriangle,
} from "lucide-react";

const commitments = [
  "Promote a safe and respectful environment for everyone.",
  "Treat safeguarding concerns seriously and responsibly.",
  "Encourage appropriate reporting of concerns or incidents.",
  "Protect dignity, privacy and confidentiality wherever appropriate.",
];

const areas = [
  {
    title: "Prevention",
    text: "Promote awareness, responsible conduct and safe practices across organisational activities.",
    icon: <ShieldCheck size={18} />,
  },
  {
    title: "Identification",
    text: "Remain attentive to situations that may create safeguarding risks or concerns.",
    icon: <AlertTriangle size={18} />,
  },
  {
    title: "Response",
    text: "Concerns should be handled promptly through appropriate organisational procedures.",
    icon: <CheckCircle2 size={18} />,
  },
  {
    title: "Support",
    text: "Where appropriate, affected persons should be directed towards suitable support and responsible channels.",
    icon: <Users size={18} />,
  },
];

export default function SafeguardingPolicyPage() {
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
            Safeguarding Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            A framework for promoting safety, dignity and
            responsible conduct across organisational activities.
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
            Safeguarding
          </span>

        </div>

      </div>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

            <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                Policy Overview
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                Safeguarding People
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Safeguarding is an important part of responsible
                organisational practice. Activities should be
                planned and delivered in a way that reduces
                avoidable risks and promotes dignity and respect.
              </p>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                The safeguarding framework is intended to provide
                a clear approach to prevention, identification,
                reporting and responsible response.
              </p>

            </div>

            <div className="rounded-2xl bg-[#123B4A] p-5 text-white sm:p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">
                <Users size={20} />
              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                Core Focus
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                Safety & Dignity
              </h2>

              <p className="mt-3 text-[9px] leading-5 text-white/50">
                Everyone involved in organisational programmes
                should be treated fairly, respectfully and safely.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-[#D6A83C]"
                />

                <span className="text-[9px] text-white/65">
                  Respect • Safety • Accountability
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          COMMITMENTS
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
            Our Commitment
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
            Safeguarding Principles
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {commitments.map((item) => (
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
          IMPLEMENTATION
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Implementation
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Safeguarding Areas
            </h2>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {areas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-[#D8E5E8] bg-white p-5"
              >

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F7] text-[#16758A]">
                    {area.icon}
                  </div>

                  <div>

                    <h3 className="font-serif text-lg font-bold text-[#123B4A]">
                      {area.title}
                    </h3>

                    <p className="mt-1 text-[9px] leading-5 text-gray-500">
                      {area.text}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          REPORTING
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl bg-[#123B4A] p-5 text-white sm:p-6">

            <div className="flex items-start gap-3">

              <AlertTriangle
                size={19}
                className="mt-0.5 shrink-0 text-[#D6A83C]"
              />

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                  Reporting Concerns
                </p>

                <h2 className="mt-1 font-serif text-xl font-bold">
                  Raise Safeguarding Concerns Responsibly
                </h2>

                <p className="mt-2 text-[9px] leading-5 text-white/55">
                  Any safeguarding concern should be brought
                  through the appropriate organisational reporting
                  channel. Information should be handled with
                  care and appropriate confidentiality.
                </p>

                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[8px] font-bold text-white transition hover:bg-[#B98D29]"
                >
                  Contact the Trust
                  <ArrowRight size={12} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          POLICY DOCUMENT
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 text-center sm:p-7">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5F7]">

              <FileText
                size={22}
                className="text-[#16758A]"
              />

            </div>

            <h2 className="mt-3 font-serif text-xl font-bold text-[#123B4A]">
              Official Policy Document
            </h2>

            <p className="mx-auto mt-1 max-w-xl text-[9px] leading-5 text-gray-500">
              The formally approved safeguarding policy can
              be published here once available.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#D8E5E8] bg-[#F9FBFC] px-5 py-2.5 text-[8px] font-bold text-gray-400">
              <FileText size={13} />
              Document to be published
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          NOTE
      ====================================================== */}

      <section className="px-4 pb-8 sm:px-6">

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
                This webpage provides a structured presentation
                of safeguarding principles. The Trust&apos;s formally
                adopted policy document should be used as the
                authoritative version.
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
              href="/reports/policies/child-protection"
              title="Child Protection"
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
          Safety, Respect & Responsibility
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Explore the Trust&apos;s policies and governance
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
            href="/governance"
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-[9px] font-bold text-white transition hover:border-[#D6A83C]"
          >
            Governance
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