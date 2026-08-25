import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const financialDocuments = [
  {
    title: "Annual Financial Statements",
    description:
      "Financial statements and related information for the applicable reporting period.",
    href: "/reports/financials/statements",
  },
  {
    title: "Income & Expenditure",
    description:
      "Overview of income and expenditure information presented for transparency.",
    href: "/reports/financials/income-expenditure",
  },
  {
    title: "Audit Reports",
    description:
      "Audit-related documents and reporting information, where published.",
    href: "/reports/financials/audit",
  },
];

const principles = [
  "Responsible financial management",
  "Transparent reporting",
  "Proper documentation",
  "Accountability to stakeholders",
];

export default function FinancialsPage() {
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

            <TrendingUp
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Transparency & Accountability
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Financial Information
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Financial reporting and organisational
            information for transparency and responsible
            stewardship.
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

          <span className="text-[8px] font-semibold text-gray-400">
            Financial Information
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
                Financial Transparency
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                Responsible Financial Management
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Financial information helps stakeholders
                understand how an organisation manages and
                reports its resources.
              </p>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Relevant financial documents can be published
                here as they become available for public
                disclosure.
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">

                {principles.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-[#F5F9FA] px-3 py-2.5"
                  >

                    <CheckCircle2
                      size={13}
                      className="shrink-0 text-[#16758A]"
                    />

                    <span className="text-[8px] font-semibold text-[#526575]">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div className="rounded-2xl bg-[#123B4A] p-5 text-white sm:p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

                <ShieldCheck size={20} />

              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                Transparency
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                Financial Documents
              </h2>

              <p className="mt-3 text-[9px] leading-5 text-white/50">
                Explore available financial information
                and reporting documents.
              </p>

              <div className="mt-5 space-y-2">

                <SideItem text="Annual Reports" />

                <SideItem text="Financial Statements" />

                <SideItem text="Income & Expenditure" />

                <SideItem text="Audit Information" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DOCUMENTS
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Documents
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Financial Records
            </h2>

            <p className="mt-1 text-[9px] text-gray-500">
              Select a category to explore the available
              financial information.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {financialDocuments.map((document) => (
              <DocumentCard
                key={document.title}
                title={document.title}
                description={document.description}
                href={document.href}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          ANNUAL REPORT CTA
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F7]">

                <BarChart3
                  size={18}
                  className="text-[#16758A]"
                />

              </div>

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                  Reports
                </p>

                <h3 className="mt-1 font-serif text-lg font-bold text-[#123B4A]">
                  Annual Reports
                </h3>

                <p className="mt-1 text-[9px] text-gray-500">
                  View year-wise annual reporting information.
                </p>

              </div>

            </div>

            <Link
              href="/reports/annual"
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#16758A] px-5 text-[9px] font-bold text-white transition hover:bg-[#125E70]"
            >
              View Annual Reports
              <ArrowRight size={13} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRUST DETAILS
      ====================================================== */}

      <section className="px-4 pb-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#D8E5E8] bg-white p-5 text-center">

          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
            Organisation
          </p>

          <h2 className="mt-1 font-serif text-xl font-bold text-[#123B4A]">
            Anand Jivan Foundation Trust
          </h2>

          <div className="mt-3 flex flex-wrap justify-center gap-2">

            <span className="rounded-full bg-[#EEF6F8] px-3 py-1 text-[7px] font-bold text-[#16758A]">
              DARPAN ID: BR/2023/0343963
            </span>

            <span className="rounded-full bg-[#FFF7E4] px-3 py-1 text-[7px] font-bold text-[#9A7623]">
              PAN: AAJTA9323K
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <FileText
          size={21}
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Transparency Matters
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Explore our reports and organisational
          information.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">

          <Link
            href="/reports/annual"
            className="flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[9px] font-bold text-white hover:bg-[#B98D29]"
          >
            Annual Reports
            <ArrowRight size={12} />
          </Link>

          <Link
            href="/transparency"
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-[9px] font-bold text-white hover:border-[#D6A83C]"
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
   SIDE ITEM
========================================================== */

function SideItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-3 py-2">

      <CheckCircle2
        size={12}
        className="shrink-0 text-[#D6A83C]"
      />

      <span className="text-[9px] text-white/65">
        {text}
      </span>

    </div>
  );
}

/* ==========================================================
   DOCUMENT CARD
========================================================== */

function DocumentCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="group rounded-2xl border border-[#D8E5E8] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5F7]">

        <FileText
          size={20}
          className="text-[#16758A]"
        />

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
        Explore
        <ArrowRight size={12} />
      </Link>

    </article>
  );
}