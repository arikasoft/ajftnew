import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";

const statements = [
  {
    year: "2025–26",
    title: "Financial Statements 2025–26",
    description:
      "Financial statements for the applicable reporting period.",
    status: "Available",
    pdf: "/reports/financials/2025-26.pdf",
  },
  {
    year: "2024–25",
    title: "Financial Statements 2024–25",
    description:
      "Financial reporting documents for the applicable financial year.",
    status: "Available",
    pdf: "/reports/financials/2024-25.pdf",
  },
  {
    year: "2023–24",
    title: "Financial Statements 2023–24",
    description:
      "Financial statements and related reporting information.",
    status: "Available",
    pdf: "/reports/financials/2023-24.pdf",
  },
];

export default function FinancialStatementsPage() {
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

            <FileSpreadsheet
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Financial Transparency
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Financial Statements
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            View financial statement information by
            reporting year.
          </p>

        </div>

      </section>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="border-b border-[#D8E5E8] bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <Link
            href="/reports/financials"
            className="flex items-center gap-2 text-[9px] font-bold text-[#16758A] transition hover:text-[#B48726]"
          >
            <ArrowLeft size={13} />
            Back to Financials
          </Link>

          <Link
            href="/reports/annual"
            className="flex items-center gap-2 text-[8px] font-semibold text-gray-400 hover:text-[#16758A]"
          >
            Annual Reports
            <ArrowRight size={11} />
          </Link>

        </div>

      </div>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F7]">

                <ShieldCheck
                  size={20}
                  className="text-[#16758A]"
                />

              </div>

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                  Financial Reporting
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                  Financial Statements Archive
                </h2>

                <p className="mt-2 max-w-3xl text-[9px] leading-5 text-gray-500">
                  This section is intended to provide
                  year-wise access to financial statement
                  documents published by the Trust.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATEMENT CARDS
      ====================================================== */}

      <section className="px-4 pb-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Reporting Years
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Available Statements
            </h2>

          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {statements.map((statement) => (
              <StatementCard
                key={statement.year}
                {...statement}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          DOCUMENT NOTE
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-[#E7D6A8] bg-[#FFFBEF] p-5">

            <div className="flex items-start gap-3">

              <FileText
                size={18}
                className="mt-0.5 shrink-0 text-[#B18428]"
              />

              <div>

                <h3 className="text-[10px] font-bold text-[#123B4A]">
                  Document Availability
                </h3>

                <p className="mt-1 text-[8px] leading-5 text-gray-600">
                  Replace the document paths with the Trust&apos;s
                  actual approved financial statements before
                  publishing them publicly.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK LINKS
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-3 sm:grid-cols-3">

            <QuickLink
              href="/reports/annual"
              title="Annual Reports"
              text="Year-wise annual reports"
            />

            <QuickLink
              href="/reports/financials/income-expenditure"
              title="Income & Expenditure"
              text="Financial activity information"
            />

            <QuickLink
              href="/reports/financials/audit"
              title="Audit Reports"
              text="Audit-related documents"
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
          Transparency & Accountability
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Explore financial and organisational information
          published by Anand Jivan Foundation Trust.
        </p>

        <Link
          href="/transparency"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#B98D29]"
        >
          Transparency Centre
          <ArrowRight size={12} />
        </Link>

      </section>

    </main>
  );
}

/* ==========================================================
   STATEMENT CARD
========================================================== */

function StatementCard({
  year,
  title,
  description,
  status,
  pdf,
}: {
  year: string;
  title: string;
  description: string;
  status: string;
  pdf: string;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#D8E5E8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* TOP */}

      <div className="bg-[#123B4A] p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

            <FileSpreadsheet
              size={20}
              className="text-white"
            />

          </div>

          <span className="rounded-full bg-[#E5F5EC] px-2.5 py-1 text-[7px] font-bold text-[#17824D]">
            {status}
          </span>

        </div>

        <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
          Financial Year
        </p>

        <h3 className="mt-1 font-serif text-2xl font-bold text-white">
          {year}
        </h3>

      </div>

      {/* BODY */}

      <div className="p-5">

        <h4 className="font-serif text-lg font-bold text-[#123B4A]">
          {title}
        </h4>

        <p className="mt-2 min-h-[42px] text-[9px] leading-5 text-gray-500">
          {description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">

          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#16758A] text-[8px] font-bold text-white transition hover:bg-[#125E70]"
          >
            <FileText size={12} />
            View
          </a>

          <a
            href={pdf}
            download
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#D8E5E8] bg-[#F8FAFB] text-[8px] font-bold text-[#16758A] transition hover:border-[#D6A83C] hover:bg-[#FFF9E9]"
          >
            <Download size={12} />
            Download
          </a>

        </div>

      </div>

    </article>
  );
}

/* ==========================================================
   QUICK LINK
========================================================== */

function QuickLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-[#D8E5E8] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#D6A83C] hover:shadow-sm"
    >

      <div className="flex items-center justify-between gap-3">

        <div>

          <h3 className="text-[10px] font-bold text-[#123B4A]">
            {title}
          </h3>

          <p className="mt-1 text-[8px] text-gray-500">
            {text}
          </p>

        </div>

        <ArrowRight
          size={14}
          className="text-[#16758A] transition group-hover:translate-x-1"
        />

      </div>

    </Link>
  );
}