import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  FileCheck2,
  FileText,
  ShieldCheck,
} from "lucide-react";

const auditReports = [
  {
    year: "2025–26",
    title: "Audit Report 2025–26",
    description:
      "Audit-related financial reporting document for the financial year 2025–26.",
    status: "Document Pending",
    file: "/reports/financials/audit/2025-26.pdf",
  },
  {
    year: "2024–25",
    title: "Audit Report 2024–25",
    description:
      "Audit-related financial reporting document for the financial year 2024–25.",
    status: "Document Pending",
    file: "/reports/financials/audit/2024–25.pdf",
  },
  {
    year: "2023–24",
    title: "Audit Report 2023–24",
    description:
      "Audit-related financial reporting document for the financial year 2023–24.",
    status: "Document Pending",
    file: "/reports/financials/audit/2023-24.pdf",
  },
];

const auditPrinciples = [
  "Financial records are maintained systematically.",
  "Financial information should be supported by appropriate records.",
  "Approved audit documents should be published where appropriate.",
  "Transparency and accountability remain important organisational principles.",
];

export default function AuditReportsPage() {
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

            <FileCheck2
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Financial Transparency
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Audit Reports
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Year-wise audit-related information and
            documents published by the Trust.
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
            href="/reports/financials/statements"
            className="flex items-center gap-2 text-[8px] font-semibold text-gray-400 transition hover:text-[#16758A]"
          >
            Financial Statements
            <ArrowRight size={11} />
          </Link>

        </div>

      </div>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">

            {/* LEFT */}

            <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                Audit & Assurance
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                Audit Information
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Audit reports provide stakeholders with
                information relating to the examination of
                financial records and reporting for the
                relevant financial year.
              </p>

              <p className="mt-3 text-[10px] leading-6 text-gray-600">
                Only approved and final documents should be
                made publicly available through this section.
              </p>

            </div>

            {/* RIGHT */}

            <div className="rounded-2xl bg-[#123B4A] p-5 text-white sm:p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

                <ShieldCheck size={20} />

              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                Accountability
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                Responsible Reporting
              </h2>

              <p className="mt-3 text-[9px] leading-5 text-white/50">
                Financial reporting should be based on
                verified organisational records.
              </p>

              <div className="mt-5 flex items-center gap-2">

                <CheckCircle2
                  size={14}
                  className="text-[#D6A83C]"
                />

                <span className="text-[9px] text-white/65">
                  Transparency-focused reporting
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          AUDIT REPORTS
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Reporting Years
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Audit Report Archive
            </h2>

            <p className="mt-1 text-[9px] text-gray-500">
              Select a financial year to view the relevant
              audit document when available.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {auditReports.map((report) => (
              <AuditCard
                key={report.year}
                {...report}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Good Governance
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Audit & Financial Principles
            </h2>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {auditPrinciples.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-xl border border-[#D8E5E8] bg-white p-4"
              >

                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-[#16758A]"
                />

                <span className="text-[9px] leading-5 text-gray-600">
                  {item}
                </span>

              </div>
            ))}

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
              href="/reports/financials/statements"
              title="Financial Statements"
              icon={<FileText size={16} />}
            />

            <QuickLink
              href="/reports/financials/income-expenditure"
              title="Income & Expenditure"
              icon={<FileCheck2 size={16} />}
            />

            <QuickLink
              href="/reports/annual"
              title="Annual Reports"
              icon={<ShieldCheck size={16} />}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          NOTICE
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#E7D6A8] bg-[#FFFBEF] p-5">

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
                The report cards currently use placeholder
                document paths. Replace them with the actual
                approved audit reports before publishing.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <FileCheck2
          size={21}
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Explore Financial Transparency
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          View annual reports, financial statements and
          income & expenditure information.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">

          <Link
            href="/reports/financials"
            className="flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#B98D29]"
          >
            Financial Information
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
   AUDIT CARD
========================================================== */

function AuditCard({
  year,
  title,
  description,
  status,
  file,
}: {
  year: string;
  title: string;
  description: string;
  status: string;
  file: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#D8E5E8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* HEADER */}

      <div className="bg-[#123B4A] p-5">

        <div className="flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

            <FileCheck2
              size={20}
              className="text-white"
            />

          </div>

          <span className="rounded-full bg-[#FFF7E4] px-2.5 py-1 text-[7px] font-bold text-[#9A7623]">
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

        <p className="mt-2 min-h-[44px] text-[9px] leading-5 text-gray-500">
          {description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">

          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#16758A] text-[8px] font-bold text-white transition hover:bg-[#125E70]"
          >
            <Eye size={12} />
            View
          </a>

          <a
            href={file}
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
