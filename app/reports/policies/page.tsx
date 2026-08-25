import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Scale,
  ShieldCheck,
} from "lucide-react";

const policies = [
  {
    title: "Child Protection Policy",
    description:
      "Guiding principles for maintaining a safe and respectful environment for children.",
    href: "/reports/policies/child-protection",
  },
  {
    title: "Safeguarding Policy",
    description:
      "Framework for safeguarding people participating in organisational activities.",
    href: "/reports/policies/safeguarding",
  },
  {
    title: "Financial Management Policy",
    description:
      "Principles for responsible financial management, records and accountability.",
    href: "/reports/policies/financial-management",
  },
  {
    title: "Conflict of Interest Policy",
    description:
      "Guidelines for identifying and appropriately managing conflicts of interest.",
    href: "/reports/policies/conflict-of-interest",
  },
  {
    title: "Privacy Policy",
    description:
      "Information about handling personal information and privacy-related practices.",
    href: "/reports/policies/privacy",
  },
  {
    title: "Code of Conduct",
    description:
      "Expected standards of professional, ethical and responsible conduct.",
    href: "/reports/policies/code-of-conduct",
  },
];

const principles = [
  "Integrity",
  "Accountability",
  "Transparency",
  "Respect",
];

export default function PoliciesPage() {
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

            <Scale
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Governance & Transparency
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Policies
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Organisational policies and guiding principles
            supporting responsible governance and operations.
          </p>

        </div>

      </section>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="border-b border-[#D8E5E8] bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <Link
            href="/reports"
            className="flex items-center gap-2 text-[9px] font-bold text-[#16758A] transition hover:text-[#B48726]"
          >
            <ArrowLeft size={13} />
            Back to Reports
          </Link>

          <Link
            href="/transparency"
            className="flex items-center gap-2 text-[8px] font-semibold text-gray-400 transition hover:text-[#16758A]"
          >
            Transparency
            <ArrowRight size={11} />
          </Link>

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
                Organisational Framework
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                Policies & Guidelines
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Policies provide a structured framework for
                responsible decision-making, organisational
                conduct and programme implementation.
              </p>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                The documents listed below can be published
                here once they have been formally approved
                and adopted by the Trust.
              </p>

            </div>

            <div className="rounded-2xl bg-[#123B4A] p-5 text-white sm:p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

                <ShieldCheck size={20} />

              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                Core Principles
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                Good Governance
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-2">

                {principles.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-white/[0.05] px-3 py-3 text-center"
                  >
                    <span className="text-[8px] font-bold text-white/70">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          POLICY CARDS
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Documents
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Organisational Policies
            </h2>

            <p className="mt-1 text-[9px] text-gray-500">
              Select a policy to view its dedicated information.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {policies.map((policy) => (
              <PolicyCard
                key={policy.title}
                {...policy}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          DOCUMENT NOTE
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#E7D6A8] bg-[#FFFBEF] p-5">

          <div className="flex items-start gap-3">

            <FileText
              size={18}
              className="mt-0.5 shrink-0 text-[#B18428]"
            />

            <div>

              <h3 className="text-[10px] font-bold text-[#123B4A]">
                Publication Note
              </h3>

              <p className="mt-1 text-[8px] leading-5 text-gray-600">
                The policy names and descriptions above are
                website structure placeholders. Publish the
                final documents only after confirming that the
                relevant policies have been formally approved
                by Anand Jivan Foundation Trust.
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
              href="/governance"
              title="Governance"
              icon={<Scale size={16} />}
            />

            <QuickLink
              href="/reports/financials"
              title="Financial Information"
              icon={<FileText size={16} />}
            />

            <QuickLink
              href="/transparency"
              title="Transparency Centre"
              icon={<ShieldCheck size={16} />}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <LockKeyhole
          size={21}
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Responsible Governance
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Explore governance, reports and transparency
          information of the Trust.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">

          <Link
            href="/governance"
            className="flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#B98D29]"
          >
            Governance
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
   POLICY CARD
========================================================== */

function PolicyCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="group rounded-2xl border border-[#D8E5E8] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D6A83C] hover:shadow-lg">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5F7] text-[#16758A]">

        <FileText size={20} />

      </div>

      <h3 className="mt-4 font-serif text-lg font-bold text-[#123B4A]">
        {title}
      </h3>

      <p className="mt-2 min-h-[48px] text-[9px] leading-5 text-gray-500">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 flex h-9 items-center justify-center gap-2 rounded-lg bg-[#16758A] text-[8px] font-bold text-white transition hover:bg-[#125E70]"
      >
        View Policy
        <ArrowRight size={12} />
      </Link>

    </article>
  );
}

/* ==========================================================
   QUICK LINK
========================================================== */

function QuickLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4 transition hover:-translate-y-0.5 hover:border-[#D6A83C] hover:bg-white hover:shadow-sm"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F5F7] text-[#16758A]">
          {icon}
        </div>

        <span className="text-[9px] font-bold text-[#123B4A]">
          {title}
        </span>

      </div>

      <ArrowRight
        size={13}
        className="text-[#16758A] transition group-hover:translate-x-1"
      />

    </Link>
  );
}