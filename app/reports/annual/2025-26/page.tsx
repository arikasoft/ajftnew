import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    title: "Education",
    text: "Education-focused initiatives, learning support and community engagement.",
  },
  {
    title: "Healthcare",
    text: "Community wellbeing and awareness-oriented activities.",
  },
  {
    title: "Community Development",
    text: "Initiatives focused on basic needs and stronger communities.",
  },
  {
    title: "Social Welfare",
    text: "Support-oriented activities for communities and vulnerable groups.",
  },
];

export default function AnnualReport202526Page() {
  return (
    <main className="min-h-screen bg-[#F3F7F8] text-[#193247]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#123B4A]">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#2A8C9E]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6A83C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-11 text-center md:py-14">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6A83C]">

            <FileText
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Annual Report
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Annual Report 2025–26
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            A consolidated overview of activities,
            programmes, achievements and organisational
            progress during the financial year 2025–26.
          </p>

        </div>

      </section>

      {/* =====================================================
          NAV
      ====================================================== */}

      <div className="border-b border-[#D8E5E8] bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <Link
            href="/reports/annual"
            className="flex items-center gap-2 text-[9px] font-bold text-[#16758A] hover:text-[#B48726]"
          >
            <ArrowLeft size={13} />
            Back to Annual Reports
          </Link>

          <a
            href="/reports/annual/2025-26.pdf"
            download
            className="flex items-center gap-2 rounded-lg bg-[#16758A] px-3 py-2 text-[8px] font-bold text-white hover:bg-[#125E70]"
          >
            <Download size={12} />
            Download PDF
          </a>

        </div>

      </div>

      {/* =====================================================
          REPORT SUMMARY
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">

            {/* SIDEBAR */}

            <aside className="rounded-2xl bg-[#123B4A] p-5 text-white">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A83C]">

                <BarChart3 size={20} />

              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                Reporting Period
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                2025–26
              </h2>

              <div className="mt-5 space-y-2">

                <SideItem text="Annual Activities" />

                <SideItem text="Programme Highlights" />

                <SideItem text="Community Initiatives" />

                <SideItem text="Organisational Progress" />

              </div>

              <div className="mt-6 border-t border-white/10 pt-5">

                <div className="flex items-start gap-2">

                  <ShieldCheck
                    size={15}
                    className="mt-0.5 text-[#D6A83C]"
                  />

                  <p className="text-[8px] leading-4 text-white/45">
                    This page presents an online summary.
                    Refer to the official report for the
                    complete document.
                  </p>

                </div>

              </div>

            </aside>

            {/* CONTENT */}

            <div className="space-y-4">

              <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                  About This Report
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                  Year in Review
                </h2>

                <p className="mt-3 text-[10px] leading-6 text-gray-600">
                  The Annual Report provides a consolidated
                  view of the Trust&apos;s activities and
                  programme areas during the reporting year.
                  It is intended to help stakeholders understand
                  the organisation&apos;s work and progress.
                </p>

                <p className="mt-3 text-[10px] leading-6 text-gray-600">
                  The report brings together key programme
                  information, community-focused activities
                  and organisational highlights for the
                  financial year 2025–26.
                </p>

              </div>

              {/* HIGHLIGHTS */}

              <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                  Key Areas
                </p>

                <h2 className="mt-1 font-serif text-xl font-bold text-[#123B4A]">
                  Programme Highlights
                </h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4"
                    >

                      <div className="flex items-center gap-2">

                        <CheckCircle2
                          size={15}
                          className="text-[#16758A]"
                        />

                        <h3 className="text-[10px] font-bold text-[#123B4A]">
                          {item.title}
                        </h3>

                      </div>

                      <p className="mt-2 text-[8px] leading-4 text-gray-500">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DOCUMENT
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
              Official Annual Report
            </h2>

            <p className="mx-auto mt-1 max-w-xl text-[9px] leading-5 text-gray-500">
              View or download the complete Annual Report
              for the financial year 2025–26.
            </p>

            <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">

              <a
                href="/reports/annual/2025-26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#123B4A] px-5 text-[9px] font-bold text-white hover:bg-[#0C2E3A]"
              >
                <FileText size={13} />
                View PDF
              </a>

              <a
                href="/reports/annual/2025-26.pdf"
                download
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#D8E5E8] bg-white px-5 text-[9px] font-bold text-[#16758A] hover:border-[#D6A83C]"
              >
                <Download size={13} />
                Download Report
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E7C96B]">
          Transparency
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Explore More Reports
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Explore annual reports and other organisational
          information published by the Trust.
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
   SIDEBAR ITEM
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