import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const impactAreas = [
  {
    icon: Users,
    title: "People & Communities",
    text: "Our work is designed around the needs of people and communities identified through charitable and development initiatives.",
  },
  {
    icon: Target,
    title: "Need-Based Action",
    text: "Activities can be developed according to identified needs, available resources and the objectives of each initiative.",
  },
  {
    icon: HeartHandshake,
    title: "Community Participation",
    text: "We value participation and coordination with relevant stakeholders while implementing community-focused activities.",
  },
  {
    icon: BarChart3,
    title: "Progress & Outcomes",
    text: "Project activities can be documented and reviewed to understand progress, implementation and outcomes.",
  },
];

const impactPrinciples = [
  {
    number: "01",
    title: "Identify",
    text: "Understand the need and the community context.",
  },
  {
    number: "02",
    title: "Plan",
    text: "Develop an appropriate and practical response.",
  },
  {
    number: "03",
    title: "Implement",
    text: "Carry out activities with responsible coordination.",
  },
  {
    number: "04",
    title: "Document",
    text: "Maintain appropriate records of activities and progress.",
  },
  {
    number: "05",
    title: "Review",
    text: "Reflect on progress, outcomes and future requirements.",
  },
  {
    number: "06",
    title: "Improve",
    text: "Use learning to strengthen future initiatives.",
  },
];

export default function ImpactPage() {
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
            <BarChart3 size={25} />
          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
            Our Impact
          </p>

          <h1 className="mt-1.5 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Creating Meaningful Impact
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            Understanding needs, taking responsible action and
            working towards meaningful outcomes for people
            and communities.
          </p>

        </div>

      </section>

      {/* =====================================================
          TRUST IDENTITY
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
                Our Approach to Impact
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                Impact begins with understanding
              </h2>

              <div className="mt-4 space-y-3 text-[11px] leading-6 text-[#627789] sm:text-xs">

                <p>
                  Meaningful social impact is not only about
                  the number of activities completed. It also
                  involves understanding community needs,
                  implementing suitable initiatives and
                  learning from the outcomes.
                </p>

                <p>
                  AJFT seeks to approach its charitable work
                  with a focus on practical needs, responsible
                  implementation and appropriate documentation.
                </p>

                <p>
                  As individual projects develop, relevant
                  project information can be presented through
                  dedicated project pages and reports.
                </p>

              </div>

            </div>

            {/* IMPACT CARD */}

            <div className="rounded-2xl bg-[#173B4D] p-6 text-white shadow-[0_8px_30px_rgba(16,42,67,0.12)] md:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C59A3A]">
                <Eye size={21} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Impact Philosophy
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Action with accountability
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55">
                We aim to connect community needs with
                responsible action and transparent
                documentation.
              </p>

              <div className="mt-5 space-y-2.5">

                {[
                  "Understand needs",
                  "Plan responsibly",
                  "Implement activities",
                  "Document progress",
                  "Review outcomes",
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
          IMPACT AREAS
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
              Impact Areas
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
              Where We Seek to Make a Difference
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
              Our impact framework can be applied across
              different charitable programs and projects.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {impactAreas.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3F6]">
                    <Icon
                      size={21}
                      className="text-[#176B87]"
                    />
                  </div>

                  <h3 className="mt-4 font-serif text-lg font-bold text-[#102A43]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                    {text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          IMPACT PROCESS
      ====================================================== */}

      <section className="bg-[#173B4D] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Impact Framework
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                From need to outcome
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55 sm:text-xs">
                A structured approach helps connect
                planning, implementation, documentation
                and learning.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">

              {impactPrinciples.map((item) => (
                <div
                  key={item.number}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C59A3A]">

                    <span className="text-[9px] font-bold text-white">
                      {item.number}
                    </span>

                  </div>

                  <h3 className="mt-3 text-[11px] font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-white/45">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BENEFICIARIES
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6">

              <Users
                size={23}
                className="text-[#176B87]"
              />

              <h3 className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                Beneficiaries
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Information about beneficiaries can be
                presented where appropriate and supported
                by project records.
              </p>

              <Link
                href="/impact/beneficiaries"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
              >
                View Beneficiaries
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6">

              <MapPin
                size={23}
                className="text-[#176B87]"
              />

              <h3 className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                Projects
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Explore individual initiatives and their
                available project information.
              </p>

              <Link
                href="/projects"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
              >
                View Projects
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6">

              <ShieldCheck
                size={23}
                className="text-[#176B87]"
              />

              <h3 className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                Transparency
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Appropriate reports and organisational
                information can help stakeholders understand
                our work.
              </p>

              <Link
                href="/transparency"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
              >
                Transparency
                <ArrowRight size={13} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          REPORTING
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-6 text-center md:p-8">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3F6]">

            <ShieldCheck
              size={20}
              className="text-[#176B87]"
            />

          </div>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            Accountability
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43]">
            Transparency strengthens impact
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            Project information, reports, documentation and
            appropriate disclosures can help stakeholders
            understand how initiatives are being implemented.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/reports"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white transition hover:bg-[#12566D]"
            >
              Annual Reports
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/transparency"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Financial Transparency
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#F4F7FA] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            Be part of meaningful change
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            Support charitable initiatives that seek to
            create meaningful opportunities for communities.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white shadow-md transition hover:bg-[#12566D]"
            >
              Support Our Work
              <HeartHandshake size={15} />
            </Link>

            <Link
              href="/projects"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Explore Projects
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </section>

      

    </main>
  );
}