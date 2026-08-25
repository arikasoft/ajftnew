import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Heart,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const financialAreas = [
  {
    title: "Programme Activities",
    description:
      "Resources directed towards charitable and community-focused programmes and activities.",
    icon: Heart,
    color: "blue",
  },
  {
    title: "Administrative Support",
    description:
      "Responsible organisational expenses required to support effective programme implementation.",
    icon: Landmark,
    color: "green",
  },
  {
    title: "Compliance",
    description:
      "Maintaining appropriate documentation, records and statutory compliance processes.",
    icon: ShieldCheck,
    color: "gold",
  },
  {
    title: "Reporting",
    description:
      "Financial information is organised and documented to support transparency and accountability.",
    icon: FileText,
    color: "violet",
  },
];

const principles = [
  "Responsible use of resources",
  "Proper financial documentation",
  "Transparent record keeping",
  "Programme-focused spending",
  "Compliance-oriented processes",
  "Accountability to stakeholders",
];

export default function FinancialsPage() {
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
              <ShieldCheck size={12} />
              Financial Transparency
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Responsible
              <span className="block text-[#55A9E8]">
                Financial Stewardship
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              We believe that responsible financial management,
              proper documentation and transparent reporting are
              essential to building trust with donors, partners
              and communities.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <a
                href="#financial-information"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D9B54A] px-5 text-xs font-black text-[#073B4C] shadow-lg transition hover:-translate-y-0.5"
              >
                Financial Information
                <ArrowRight size={15} />
              </a>

              <Link
                href="/impact/reports"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/15"
              >
                Impact Reports
              </Link>

            </div>

          </div>

        </div>

        <div className="absolute bottom-[-1px] left-[-5%] h-12 w-[110%] rounded-[50%_50%_0_0] bg-[#F5F8F7]" />

      </section>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <section className="relative z-10 px-5 sm:px-8">

        <div className="mx-auto -mt-5 max-w-6xl">

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:grid-cols-3">

            <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF7FD] text-[#1769AA]">
                  <BarChart3 size={21} />
                </div>

                <div>
                  <p className="text-lg font-black text-[#073B4C]">
                    Accountable
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Resource Management
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
                  <p className="text-lg font-black text-[#073B4C]">
                    Programme
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Impact Focus
                  </p>
                </div>

              </div>

            </div>

            <div className="p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFFAED] text-[#B88918]">
                  <LockKeyhole size={21} />
                </div>

                <div>
                  <p className="text-lg font-black text-[#073B4C]">
                    Secure
                  </p>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Financial Records
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

      <section
        id="financial-information"
        className="px-5 py-16 sm:px-8 lg:py-20"
      >

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1769AA]">
              FINANCIAL RESPONSIBILITY
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Every resource should
              <span className="block text-[#1769AA]">
                serve a meaningful purpose.
              </span>
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#D9B54A]" />

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Financial stewardship is an important part of
              responsible charitable work. We aim to maintain
              appropriate records and use resources carefully
              in support of organisational objectives.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Detailed financial statements and statutory
              documents should be published only after they
              have been finalised and verified.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-100">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF7FD] text-[#1769AA]">
                <Landmark size={27} />
              </div>

              <div>
                <p className="text-lg font-black text-[#073B4C]">
                  Financial Governance
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  Documentation • Controls • Accountability
                </p>
              </div>

            </div>

            <div className="mt-7 space-y-3">

              {principles.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-[#F7FAF9] p-3"
                >

                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-[#3C9A32]"
                  />

                  <span className="text-[10px] font-bold text-slate-600">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINANCIAL AREAS
      ====================================================== */}

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#3C9A32]">
              FINANCIAL AREAS
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#073B4C] sm:text-4xl">
              How we approach
              <span className="text-[#3C9A32]">
                {" "}financial responsibility
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Our financial approach supports programme delivery,
              organisational operations and responsible reporting.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            {financialAreas.map((area) => {

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
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${theme.icon}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#073B4C]">
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
          FINANCIAL DOCUMENTS
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF7FD] text-[#1769AA]">
                <FileText size={22} />
              </div>

              <h3 className="mt-5 text-lg font-black text-[#073B4C]">
                Annual Financial Statements
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Finalised annual financial statements can be
                published here for stakeholder reference.
              </p>

              <div className="mt-5">

                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-[8px] font-bold text-slate-400">
                  Document to be published
                </span>

              </div>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F9ED] text-[#3C9A32]">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-5 text-lg font-black text-[#073B4C]">
                Statutory Documents
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Relevant verified statutory and compliance
                documents may be made available through the
                organisation's document section.
              </p>

              <div className="mt-5">

                <Link
                  href="/certificates"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[8px] font-black text-[#073B4C] transition hover:border-[#3C9A32]"
                >
                  View Certificates
                  <ArrowRight size={12} />
                </Link>

              </div>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFFAED] text-[#B88918]">
                <BarChart3 size={22} />
              </div>

              <h3 className="mt-5 text-lg font-black text-[#073B4C]">
                Impact Reporting
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Programme and impact reports provide context
                around activities and the communities we work
                with.
              </p>

              <div className="mt-5">

                <Link
                  href="/impact/reports"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[8px] font-black text-[#073B4C] transition hover:border-[#B88918]"
                >
                  View Impact Reports
                  <ArrowRight size={12} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          IMPORTANT NOTICE
      ====================================================== */}

      <section className="px-5 pb-16 sm:px-8 lg:pb-20">

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#073B4C] px-6 py-10 sm:px-10 lg:px-14">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9B54A] text-[#073B4C]">
                <ShieldCheck size={23} />
              </div>

              <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B54A]">
                TRANSPARENCY NOTE
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Verified information
                <span className="block text-[#55A9E8]">
                  comes first.
                </span>
              </h2>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <p className="text-sm leading-7 text-white/70">
                Financial figures, audited statements and other
                financial documents should be added to this page
                only after they have been finalised and verified.
                This helps ensure that information presented to
                donors and stakeholders remains accurate.
              </p>

              <div className="mt-5 flex items-center gap-2 text-[9px] font-bold text-[#D9B54A]">
                <CheckCircle2 size={14} />
                Accuracy • Accountability • Transparency
              </div>

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
            Support responsible charitable work.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Your contribution helps support AJFT's charitable
            and community-focused activities.
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