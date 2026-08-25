import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  FileText,
  Heart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const reports = [
  {
    year: "2025–26",
    title: "Annual Impact Report",
    description:
      "A consolidated overview of activities, beneficiaries, community initiatives and key outcomes during the financial year.",
    status: "Latest Report",
    available: false,
  },
  {
    year: "2024–25",
    title: "Annual Impact Report",
    description:
      "An overview of major programmes, community activities and social development initiatives.",
    status: "Annual Report",
    available: false,
  },
  {
    year: "2023–24",
    title: "Impact & Activities Report",
    description:
      "A summary of key activities, programme areas and community engagement during the year.",
    status: "Activity Report",
    available: false,
  },
];

const focusAreas = [
  {
    title: "Education",
    description:
      "Learning support, educational activities and opportunities for children and students.",
    icon: BarChart3,
    color: "blue",
  },
  {
    title: "Healthcare",
    description:
      "Health awareness, preventive care and community well-being initiatives.",
    icon: Heart,
    color: "green",
  },
  {
    title: "Community Development",
    description:
      "Activities that encourage participation, inclusion and stronger communities.",
    icon: TrendingUp,
    color: "gold",
  },
  {
    title: "Social Welfare",
    description:
      "Community-focused support for individuals and families facing social challenges.",
    icon: ShieldCheck,
    color: "violet",
  },
];

const transparencyPoints = [
  "Programme activities and outcomes",
  "Beneficiary and community engagement",
  "Key initiatives and achievements",
  "Financial-year activity overview",
  "Learning and future priorities",
  "Organisational transparency",
];

const transparencyItems = [
  "Clear documentation",
  "Activity reporting",
  "Outcome-focused learning",
  "Community perspective",
  "Responsible communication",
  "Continuous improvement",
];

export default function ImpactReportsPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1769AA]/30 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#3C9A32]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B54A]">
              <FileText size={12} />
              Impact Reports
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Measuring
              <span className="block text-[#55A9E8]">
                Meaningful Impact
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Our reports provide an organised view of our
              activities, programme areas, community engagement
              and the outcomes we work towards.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <a
                href="#reports"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D9B54A] px-5 text-xs font-black text-[#073B4C] shadow-lg transition hover:-translate-y-0.5"
              >
                View Reports
                <ArrowRight size={15} />
              </a>

              <Link
                href="/impact/stories"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/15"
              >
                Impact Stories
              </Link>

            </div>

          </div>

        </div>

        <div className="absolute bottom-[-1px] left-[-5%] h-12 w-[110%] rounded-[50%_50%_0_0] bg-[#F5F8F7]" />

      </section>

      {/* =====================================================
          REPORT SUMMARY
      ====================================================== */}

      <section className="relative z-10 px-5 sm:px-8">

        <div className="mx-auto -mt-5 max-w-6xl">

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

            <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF7FD] text-[#1769AA]">
                  <FileText size={21} />
                </div>

                <div>
                  <p className="text-2xl font-black text-[#073B4C]">
                    3+
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Report Years
                  </p>
                </div>

              </div>

            </div>

            <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F9ED] text-[#3C9A32]">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <p className="text-2xl font-black text-[#073B4C]">
                    4
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Key Focus Areas
                  </p>
                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFFAED] text-[#B88918]">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <p className="text-2xl font-black text-[#073B4C]">
                    Open
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Transparency
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1769AA]">
              WHY REPORTS MATTER
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Turning activities into
              <span className="block text-[#1769AA]">
                measurable learning.
              </span>
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#D9B54A]" />

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Impact reporting helps us document what we do,
              understand what works and identify opportunities
              for improvement.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              It also helps supporters, partners and community
              stakeholders understand the areas in which AJFT
              is working.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-100">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF7FD] text-[#1769AA]">
                <BarChart3 size={27} />
              </div>

              <div>
                <p className="text-lg font-black text-[#073B4C]">
                  What our reports cover
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  Activities • Outcomes • Learning
                </p>
              </div>

            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              {transparencyPoints.map((point) => (

                <div
                  key={point}
                  className="flex items-start gap-2 rounded-xl bg-[#F7FAF9] p-3"
                >

                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-[#3C9A32]"
                  />

                  <span className="text-[10px] font-bold leading-5 text-slate-600">
                    {point}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          REPORT LIBRARY
      ====================================================== */}

      <section
        id="reports"
        className="bg-white px-5 py-16 sm:px-8 lg:py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#3C9A32]">
                REPORT LIBRARY
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#073B4C] sm:text-4xl">
                Annual & Impact
                <span className="text-[#3C9A32]">
                  {" "}Reports
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                Browse our reporting archive and explore the
                activities and impact areas covered across
                different reporting periods.
              </p>

            </div>

            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
              <CalendarDays size={14} />
              Financial Year Reports
            </div>

          </div>

          {/* =================================================
              REPORT CARDS
          ================================================== */}

          <div className="mt-10 grid gap-5 lg:grid-cols-3">

            {reports.map((report, index) => (

              <article
                key={report.year}
                className={`group relative overflow-hidden rounded-3xl border bg-[#F8FAF9] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  index === 0
                    ? "border-[#BFDDED]"
                    : "border-slate-200"
                }`}
              >

                {index === 0 && (

                  <div className="absolute right-5 top-5 rounded-full bg-[#1769AA] px-3 py-1.5 text-[7px] font-black uppercase tracking-wider text-white">
                    Latest
                  </div>

                )}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#073B4C] text-white shadow-md">
                  <FileText size={25} />
                </div>

                <p className="mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-[#1769AA]">
                  {report.year}
                </p>

                <h3 className="mt-2 text-xl font-black text-[#073B4C]">
                  {report.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  {report.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">

                  <span className="rounded-full bg-white px-3 py-1.5 text-[8px] font-bold text-slate-500">
                    {report.status}
                  </span>

                  {/* =========================================
                      REPORT BUTTON
                  ========================================== */}

                  {report.available ? (

                    <Link
                      href={`/reports/${report.year.replace("–", "-")}.pdf`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1769AA] bg-[#1769AA] px-3 py-2 text-[8px] font-black text-white transition hover:bg-[#0F578E]"
                    >
                      <FileText size={12} />
                      View Report
                    </Link>

                  ) : (

                    <span
                      className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[8px] font-black text-slate-400"
                      title="Report document will be published after verification"
                    >
                      <FileText size={12} />
                      Coming Soon
                    </span>

                  )}

                </div>

              </article>

            ))}

          </div>

          {/* =================================================
              DOCUMENT NOTICE
          ================================================== */}

          <div className="mt-6 rounded-2xl border border-[#F0E2B7] bg-[#FFFAED] p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B88918] text-white">
                <FileText size={16} />
              </div>

              <div>

                <p className="text-[10px] font-black text-[#073B4C]">
                  Report documents
                </p>

                <p className="mt-1 text-[9px] leading-5 text-slate-500">
                  Verified PDF reports can be published here once
                  the corresponding documents are finalised and
                  approved for public access.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOCUS AREAS
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1769AA]">
              REPORTING AREAS
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#073B4C] sm:text-4xl">
              Areas reflected in our
              <span className="text-[#1769AA]">
                {" "}impact reporting
              </span>
            </h2>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {focusAreas.map((area) => {

              const Icon = area.icon;

              const theme =
                area.color === "blue"
                  ? {
                      bg: "bg-[#EEF7FD]",
                      border: "border-[#D7EAF8]",
                      icon: "bg-[#1769AA]",
                    }
                  : area.color === "green"
                  ? {
                      bg: "bg-[#F0F9ED]",
                      border: "border-[#D8ECD2]",
                      icon: "bg-[#3C9A32]",
                    }
                  : area.color === "gold"
                  ? {
                      bg: "bg-[#FFFAED]",
                      border: "border-[#F0E2B7]",
                      icon: "bg-[#B88918]",
                    }
                  : {
                      bg: "bg-[#F7F2FC]",
                      border: "border-[#E7DCF3]",
                      icon: "bg-[#7C3AAF]",
                    };

              return (

                <div
                  key={area.title}
                  className={`rounded-2xl border p-6 ${theme.bg} ${theme.border}`}
                >

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${theme.icon}`}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-5 text-base font-black text-[#073B4C]">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {area.description}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          TRANSPARENCY
      ====================================================== */}

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#073B4C] px-6 py-10 sm:px-10 lg:px-14">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9B54A] text-[#073B4C]">
                <ShieldCheck size={23} />
              </div>

              <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B54A]">
                TRANSPARENCY
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Responsible reporting
                <span className="block text-[#55A9E8]">
                  builds trust.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/60">
                We believe transparent communication helps
                stakeholders understand our work and the
                communities we seek to serve.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {transparencyItems.map((item, index) => (

                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9B54A] text-[9px] font-black text-[#073B4C]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="text-[10px] font-bold text-white/75">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="border-t border-slate-100 bg-white px-5 py-14 sm:px-8">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF7FD] text-[#1769AA]">
            <Heart size={27} fill="currentColor" />
          </div>

          <h2 className="mt-5 text-3xl font-black text-[#073B4C]">
            Support transparent impact.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Your support helps us continue community-focused
            initiatives and document the progress made through
            our work.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1769AA] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Donate Now
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#073B4C] transition hover:border-[#1769AA]"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}