"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Eye,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const annualReports = [
  {
    year: "2025–26",
    title: "Annual Report 2025–26",
    description:
      "Annual activities, programmes, achievements and organisational highlights.",
    status: "Available",
    href: "/reports/annual/2025-26",
  },
  {
    year: "2024–25",
    title: "Annual Report 2024–25",
    description:
      "Overview of activities, community initiatives and organisational progress.",
    status: "Available",
    href: "/reports/annual/2024-25",
  },
  {
    year: "2023–24",
    title: "Annual Report 2023–24",
    description:
      "Programme highlights, activities and key organisational information.",
    status: "Available",
    href: "/reports/annual/2023-24",
  },
];

export default function AnnualReportsPage() {
  return (
    <main className="min-h-screen bg-[#F3F7F8] text-[#193247]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#123B4A]">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#2A8C9E]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6A83C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-11 text-center md:py-13">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6A83C] shadow-lg">

            <BarChart3
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Transparency & Accountability
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Annual Reports
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Explore our annual reports to learn about
            our programmes, activities, achievements and
            organisational progress.
          </p>

        </div>

      </section>

      {/* =====================================================
          BREADCRUMB
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
            Annual Reports
          </span>

        </div>

      </div>

      {/* =====================================================
          REPORTS
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          {/* TITLE */}

          <div className="mb-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Financial Year
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Annual Report Archive
            </h2>

            <p className="mt-1 max-w-2xl text-[9px] leading-5 text-gray-500">
              Annual reports provide a consolidated view of
              our work and organisational activities during
              each financial year.
            </p>

          </div>

          {/* REPORT GRID */}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {annualReports.map((report) => (
              <ReportCard
                key={report.year}
                year={report.year}
                title={report.title}
                description={report.description}
                status={report.status}
                href={report.href}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          TRANSPARENCY STRIP
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 md:grid-cols-3">

            <InfoCard
              icon={<FileText size={19} />}
              title="Annual Reports"
              text="Year-wise reports covering activities and organisational progress."
            />

            <InfoCard
              icon={<ShieldCheck size={19} />}
              title="Transparency"
              text="We aim to make relevant organisational information accessible."
            />

            <InfoCard
              icon={<CheckCircle2 size={19} />}
              title="Accountability"
              text="Our reporting supports responsible communication with stakeholders."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          REPORT INFORMATION
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F7]">

                <CalendarDays
                  size={18}
                  className="text-[#16758A]"
                />

              </div>

              <div>

                <h3 className="font-serif text-lg font-bold text-[#123B4A]">
                  Reporting Period
                </h3>

                <p className="mt-1 text-[9px] leading-5 text-gray-500">
                  Annual reporting follows the relevant
                  financial year period.
                </p>

              </div>

            </div>

            <Link
              href="/transparency"
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#123B4A] px-5 text-[9px] font-bold text-white transition hover:bg-[#0C2E3A]"
            >
              Transparency Centre
              <ArrowRight size={13} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <FileText
          size={21}
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-xl font-bold text-white">
          Need More Information?
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          For additional information regarding reports,
          transparency or organisational documents,
          please contact us.
        </p>

        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-[9px] font-bold text-white transition hover:border-[#D6A83C] hover:text-[#D6A83C]"
        >
          Contact Us
          <ArrowRight size={12} />
        </Link>

      </section>

    </main>
  );
}

/* ==========================================================
   REPORT CARD
========================================================== */

function ReportCard({
  year,
  title,
  description,
  status,
  href,
}: {
  year: string;
  title: string;
  description: string;
  status: string;
  href: string;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#D8E5E8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* TOP */}

      <div className="relative bg-[#123B4A] p-5">

        <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-white/[0.04]" />

        <div className="relative flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

            <FileText
              size={20}
              className="text-white"
            />

          </div>

          <span className="rounded-full bg-[#E5F5EC] px-2.5 py-1 text-[7px] font-bold text-[#17824D]">
            {status}
          </span>

        </div>

        <p className="relative mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
          Financial Year
        </p>

        <p className="relative mt-1 font-serif text-2xl font-bold text-white">
          {year}
        </p>

      </div>

      {/* BODY */}

      <div className="p-5">

        <h3 className="font-serif text-lg font-bold text-[#123B4A]">
          {title}
        </h3>

        <p className="mt-2 min-h-[45px] text-[9px] leading-5 text-gray-500">
          {description}
        </p>

        {/* ACTIONS */}

        <div className="mt-5 grid grid-cols-2 gap-2">

          <Link
            href={href}
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#16758A] text-[8px] font-bold text-white transition hover:bg-[#125E70]"
          >
            <Eye size={12} />
            View Report
          </Link>

          <a
            href={`/reports/annual/${year.replace("–", "-")}.pdf`}
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
   INFO CARD
========================================================== */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F5F7] text-[#16758A]">
        {icon}
      </div>

      <h3 className="mt-3 text-[11px] font-bold text-[#123B4A]">
        {title}
      </h3>

      <p className="mt-1 text-[8px] leading-4 text-gray-500">
        {text}
      </p>

    </div>
  );
}