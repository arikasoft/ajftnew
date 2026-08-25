import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    number: "01",
    title: "Education & Learning",
    description:
      "Supporting access to learning opportunities, educational resources and initiatives that can help children and communities grow.",
    points: [
      "Learning support",
      "Educational resources",
      "School-focused initiatives",
    ],
  },
  {
    icon: Building2,
    number: "02",
    title: "Community Development",
    description:
      "Supporting practical community initiatives that contribute towards stronger and more resilient local communities.",
    points: [
      "Community infrastructure",
      "Local development",
      "Community participation",
    ],
  },
  {
    icon: Heart,
    number: "03",
    title: "Health & Well-being",
    description:
      "Promoting initiatives focused on basic well-being, awareness, support and access to community-oriented assistance.",
    points: [
      "Health awareness",
      "Well-being support",
      "Community assistance",
    ],
  },
  {
    icon: HeartHandshake,
    number: "04",
    title: "Social Support",
    description:
      "Working towards meaningful support for people and families facing social or economic challenges.",
    points: [
      "Social assistance",
      "Support initiatives",
      "Inclusive participation",
    ],
  },
  {
    icon: Users,
    number: "05",
    title: "Empowerment",
    description:
      "Encouraging opportunities that help individuals and communities participate actively in their own development.",
    points: [
      "Skill opportunities",
      "Community participation",
      "Individual empowerment",
    ],
  },
  {
    icon: Waves,
    number: "06",
    title: "Basic Infrastructure",
    description:
      "Supporting practical infrastructure-related initiatives based on identified community needs and available resources.",
    points: [
      "Basic facilities",
      "Improvement initiatives",
      "Need-based support",
    ],
  },
];

const approach = [
  "Identify community needs",
  "Plan practical interventions",
  "Work with local stakeholders",
  "Implement responsibly",
  "Review outcomes",
  "Maintain appropriate records",
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#102A43] px-4 py-9 sm:px-5 sm:py-11">

        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#C59A3A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59A3A] text-white shadow-lg">

            <HeartHandshake size={25} />

          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Programs
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            Areas of work through which we seek to support
            communities and create meaningful social impact.
          </p>

        </div>

      </section>

      {/* =====================================================
          TRUST BAR
      ====================================================== */}

      <section className="border-b border-[#DCE4EA] bg-white">

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-[8px] font-semibold text-[#687B8C] sm:text-[9px]">

          <span>
            DARPAN ID: BR/2023/0343963
          </span>

          <span className="text-[#C59A3A]">•</span>

          <span>
            PAN: AAJTA9323K
          </span>

          <span className="text-[#C59A3A]">•</span>

          <span>
            +91 9155751363
          </span>

          <span className="text-[#C59A3A]">•</span>

          <span>
            info@ajftrust.org
          </span>

        </div>

      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="px-4 py-8 sm:px-5 md:py-10">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            Areas of Focus
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            Turning purpose into practical action
          </h2>

          <p className="mx-auto mt-3 text-[11px] leading-6 text-[#687B8C] sm:text-xs">
            Our programs are intended to respond to
            identified needs and support meaningful
            opportunities for individuals and communities.
          </p>

        </div>

      </section>

      {/* =====================================================
          PROGRAM GRID
      ====================================================== */}

      <section className="px-4 pb-10 sm:px-5">

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {programs.map(
            ({
              icon: Icon,
              number,
              title,
              description,
              points,
            }) => (
              <article
                key={title}
                className="group rounded-2xl border border-[#DCE4EA] bg-white p-5 shadow-[0_8px_25px_rgba(16,42,67,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(16,42,67,0.09)]"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3F6]">

                    <Icon
                      size={21}
                      className="text-[#176B87]"
                    />

                  </div>

                  <span className="font-serif text-xl font-bold text-[#E4E9ED]">
                    {number}
                  </span>

                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-[#102A43]">
                  {title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                  {description}
                </p>

                <div className="mt-4 border-t border-[#E9EEF1] pt-4">

                  <div className="space-y-2">

                    {points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2"
                      >

                        <CheckCircle2
                          size={13}
                          className="shrink-0 text-[#C59A3A]"
                        />

                        <span className="text-[9px] font-semibold text-[#526575]">
                          {point}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </article>
            )
          )}

        </div>

      </section>

      {/* =====================================================
          PROGRAM APPROACH
      ====================================================== */}

      <section className="bg-[#173B4D] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-center">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Our Approach
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                From need to action
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55 sm:text-xs">
                We aim to approach initiatives thoughtfully,
                with attention to community needs,
                implementation and responsible follow-up.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">

              {approach.map(
                (item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C59A3A]">

                      <span className="text-[9px] font-bold text-white">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                    </div>

                    <p className="mt-3 text-[10px] font-semibold leading-4 text-white/80">
                      {item}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RESPONSIBILITY
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3F6]">

            <ShieldCheck
              size={20}
              className="text-[#176B87]"
            />

          </div>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            Responsible Implementation
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            Programs with purpose and accountability
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-6 text-[#718394] sm:text-xs">
            We believe social initiatives should be
            planned responsibly, implemented with care
            and communicated transparently to relevant
            stakeholders.
          </p>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#F7FAFC] px-4 py-8 sm:px-5 md:py-10">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#DCE4EA] bg-white p-6 text-center md:p-8">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF7E5]">

            <Heart
              size={19}
              className="text-[#C59A3A]"
              fill="currentColor"
            />

          </div>

          <h2 className="mt-3 font-serif text-2xl font-bold text-[#102A43]">
            Support meaningful community work
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            Your support can help us develop and
            strengthen initiatives based on genuine
            community needs.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white shadow-md transition hover:bg-[#12566D]"
            >
              Support Our Work
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

     

    </main>
  );
}