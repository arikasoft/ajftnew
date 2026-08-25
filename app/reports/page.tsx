import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  FolderOpen,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const reportCategories = [
  {
    icon: FileText,
    title: "Annual Reports",
    description:
      "Annual organisational reports, activity summaries and relevant disclosures.",
    href: "/reports/annual",
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    description:
      "Financial statements and relevant financial information when published.",
    href: "/reports/financials",
  },
  {
    icon: ClipboardList,
    title: "Project Reports",
    description:
      "Reports and documentation relating to charitable projects and initiatives.",
    href: "/reports/projects",
  },
];

const reportingPrinciples = [
  {
    icon: CheckCircle2,
    title: "Accuracy",
    text: "Information should be based on appropriate organisational records.",
  },
  {
    icon: FolderOpen,
    title: "Documentation",
    text: "Relevant supporting documents can be maintained for activities and projects.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    text: "Reporting supports responsible organisational management.",
  },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#102A43] px-4 py-10 sm:px-5 sm:py-12">

        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#C59A3A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59A3A] text-white shadow-lg">
            <FileText size={25} />
          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
            Reports & Documentation
          </p>

          <h1 className="mt-1.5 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Reports
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            Access organisational reports, project documentation
            and relevant information as they become available.
          </p>

        </div>

      </section>

      {/* =====================================================
          TRUST BAR
      ====================================================== */}

      <section className="border-b border-[#DCE4EA] bg-white">

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-[8px] font-semibold text-[#687B8C] sm:text-[9px]">

          <span>DARPAN ID: BR/2023/0343963</span>

          <span className="text-[#C59A3A]">•</span>

          <span>PAN: AAJTA9323K</span>

          <span className="text-[#C59A3A]">•</span>

          <span>+91 9155751363</span>

          <span className="text-[#C59A3A]">•</span>

          <span>info@ajftrust.org</span>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6 shadow-[0_8px_30px_rgba(16,42,67,0.05)] md:p-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                Reporting & Accountability
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                Information that helps build trust
              </h2>

              <div className="mt-4 space-y-3 text-[11px] leading-6 text-[#627789] sm:text-xs">

                <p>
                  Reports help stakeholders understand the
                  activities, projects and organisational progress
                  of Anand Jivan Foundation Trust.
                </p>

                <p>
                  Relevant reports and documents can be made
                  available through this section as they are
                  prepared, reviewed and published.
                </p>

                <p>
                  Financial information and other disclosures
                  should be based on appropriate records and
                  supporting documentation.
                </p>

              </div>

            </div>

            {/* HIGHLIGHT */}

            <div className="rounded-2xl bg-[#173B4D] p-6 text-white shadow-[0_8px_30px_rgba(16,42,67,0.12)] md:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C59A3A]">
                <ShieldCheck size={21} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Responsible Reporting
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Clear. Relevant. Documented.
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55">
                Our reporting approach focuses on presenting
                useful information while maintaining appropriate
                organisational records.
              </p>

              <div className="mt-5 space-y-2.5">

                {[
                  "Activity documentation",
                  "Project information",
                  "Financial records",
                  "Organisational disclosures",
                  "Progress reporting",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 border-b border-white/10 pb-2.5 last:border-0"
                  >

                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-[#D9B65A]"
                    />

                    <span className="text-[10px] font-semibold text-white/75">
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
          REPORT CATEGORIES
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
              Documents
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
              Explore Our Reports
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
              Select a category to explore the relevant
              reports and documentation.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {reportCategories.map(
              ({
                icon: Icon,
                title,
                description,
                href,
              }) => (
                <Link
                  key={title}
                  href={href}
                  className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-6 transition hover:-translate-y-0.5 hover:border-[#176B87] hover:shadow-md"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3F6]">

                      <Icon
                        size={22}
                        className="text-[#176B87]"
                      />

                    </div>

                    <ArrowRight
                      size={16}
                      className="text-[#C59A3A] transition group-hover:translate-x-1"
                    />

                  </div>

                  <h3 className="mt-5 font-serif text-xl font-bold text-[#102A43] group-hover:text-[#176B87]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                    {description}
                  </p>

                  <div className="mt-5 text-[9px] font-bold uppercase tracking-wider text-[#176B87]">
                    Explore Reports →
                  </div>

                </Link>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          AVAILABLE DOCUMENTS
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6 md:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF7E5]">

                  <FolderOpen
                    size={22}
                    className="text-[#C59A3A]"
                  />

                </div>

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C59A3A]">
                    Document Library
                  </p>

                  <h2 className="mt-1 font-serif text-xl font-bold text-[#102A43]">
                    Reports will appear here
                  </h2>

                  <p className="mt-1 max-w-xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                    Published PDF reports and other official
                    documents can be added to this section.
                  </p>

                </div>

              </div>

              <div className="rounded-xl bg-[#F4F7FA] px-5 py-4 text-center">

                <p className="text-[8px] font-bold uppercase tracking-wider text-[#8997A2]">
                  Published Documents
                </p>

                <p className="mt-1 font-serif text-2xl font-bold text-[#102A43]">
                  —
                </p>

                <p className="text-[8px] text-[#8997A2]">
                  To be published
                </p>

              </div>

            </div>

            {/* EMPTY DOCUMENT STATE */}

            <div className="mt-7 rounded-xl border border-dashed border-[#CBD7DF] bg-[#F9FBFC] p-7 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">

                <FileText
                  size={21}
                  className="text-[#176B87]"
                />

              </div>

              <h3 className="mt-3 text-sm font-bold text-[#102A43]">
                No reports published yet
              </h3>

              <p className="mx-auto mt-1 max-w-md text-[9px] leading-5 text-[#8997A2] sm:text-[10px]">
                Official reports can be added here once they
                are ready for public access.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          REPORTING PRINCIPLES
      ====================================================== */}

      <section className="bg-[#173B4D] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-7 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
              Our Approach
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
              Reporting Principles
            </h2>

          </div>

          <div className="grid gap-3 md:grid-cols-3">

            {reportingPrinciples.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C59A3A]">

                    <Icon
                      size={18}
                      className="text-white"
                    />

                  </div>

                  <h3 className="mt-4 font-serif text-lg font-bold text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-white/45 sm:text-[11px]">
                    {text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          RELATED INFORMATION
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/transparency"
              className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:border-[#176B87] hover:shadow-md"
            >

              <ShieldCheck
                size={21}
                className="text-[#176B87]"
              />

              <h3 className="mt-3 font-serif text-lg font-bold text-[#102A43]">
                Transparency
              </h3>

              <p className="mt-1 text-[9px] leading-5 text-[#718394]">
                Learn about our transparency approach.
              </p>

              <ArrowRight
                size={14}
                className="mt-3 text-[#C59A3A] transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              href="/impact"
              className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:border-[#176B87] hover:shadow-md"
            >

              <BarChart3
                size={21}
                className="text-[#176B87]"
              />

              <h3 className="mt-3 font-serif text-lg font-bold text-[#102A43]">
                Impact
              </h3>

              <p className="mt-1 text-[9px] leading-5 text-[#718394]">
                Understand our approach to impact.
              </p>

              <ArrowRight
                size={14}
                className="mt-3 text-[#C59A3A] transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              href="/projects"
              className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:border-[#176B87] hover:shadow-md"
            >

              <ClipboardList
                size={21}
                className="text-[#176B87]"
              />

              <h3 className="mt-3 font-serif text-lg font-bold text-[#102A43]">
                Projects
              </h3>

              <p className="mt-1 text-[9px] leading-5 text-[#718394]">
                Explore our projects and initiatives.
              </p>

              <ArrowRight
                size={14}
                className="mt-3 text-[#C59A3A] transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              href="/verify"
              className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:border-[#176B87] hover:shadow-md"
            >

              <FileText
                size={21}
                className="text-[#176B87]"
              />

              <h3 className="mt-3 font-serif text-lg font-bold text-[#102A43]">
                Verify Receipt
              </h3>

              <p className="mt-1 text-[9px] leading-5 text-[#718394]">
                Verify an AJFT donation receipt.
              </p>

              <ArrowRight
                size={14}
                className="mt-3 text-[#C59A3A] transition group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#F4F7FA] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF7E5]">

            <HeartHandshake
              size={20}
              className="text-[#C59A3A]"
            />

          </div>

          <h2 className="mt-3 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            Learn more about our work
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            Explore our programs, projects and transparency
            information to learn more about the Trust.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/projects"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Explore Projects
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white shadow-md transition hover:bg-[#12566D]"
            >
              Support Our Work
              <HeartHandshake size={15} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}