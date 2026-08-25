import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

/* ==========================================================
   AJFT — PERMANENT / STATIC MISSION
   ----------------------------------------------------------
   IMPORTANT:
   - No database
   - No API
   - No admin editing
   - No CMS
   - No environment variable
   These values are intentionally fixed in source code.
========================================================== */

const TRUST_MISSION = Object.freeze({
  title: "Our Mission",

  description:
    "To contribute towards social and community development through purposeful charitable initiatives, partnerships and responsible service.",

  points: Object.freeze([
    "Identify meaningful community needs and respond through purposeful initiatives.",
    "Support education, development, well-being and social opportunities.",
    "Work collaboratively with communities, volunteers and partners.",
    "Encourage responsible and sustainable approaches to social development.",
  ]),
});

/* ==========================================================
   AJFT — PERMANENT / STATIC VISION
   ----------------------------------------------------------
   These values are not connected to any editable system.
========================================================== */

const TRUST_VISION = Object.freeze({
  title: "Our Vision",

  description:
    "To support the development of stronger, inclusive and empowered communities where people have greater opportunities to build a better future.",

  points: Object.freeze([
    "Stronger and more inclusive communities.",
    "Greater opportunities for individuals and families.",
    "Communities empowered to participate in their own development.",
    "A future built around dignity, opportunity and shared responsibility.",
  ]),
});

/* ==========================================================
   CORE VALUES
========================================================== */

const VALUES = [
  {
    icon: Heart,
    title: "Compassion",
    text: "Serving people with dignity, empathy and care.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Maintaining responsible and transparent practices.",
  },
  {
    icon: Users,
    title: "Participation",
    text: "Working together with communities and partners.",
  },
  {
    icon: Target,
    title: "Purpose",
    text: "Focusing efforts on meaningful social outcomes.",
  },
] as const;

/* ==========================================================
   PAGE
========================================================== */

export default function VisionMissionPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#243B53]">

      {/* ====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#102A43] px-4 py-9 sm:px-5 sm:py-11">

        {/* Decorative background */}

        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#C59A3A]/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-5xl text-center">

          {/* Icon */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59A3A] text-white shadow-lg">

            <Eye size={25} />

          </div>

          {/* Label */}

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          {/* Heading */}

          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Vision & Mission
          </h1>

          {/* Description */}

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            Our direction, purpose and commitment towards
            meaningful community development.
          </p>

        </div>

      </section>

      {/* ====================================================
          TRUST INFORMATION BAR
      ===================================================== */}

      <section className="border-b border-[#DCE4EA] bg-white">

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-[8px] font-semibold text-[#687B8C] sm:text-[9px]">

          <span>
            DARPAN ID: BR/2023/0343963
          </span>

          <span className="text-[#C59A3A]">
            •
          </span>

          <span>
            PAN: AAJTA9323K
          </span>

          <span className="text-[#C59A3A]">
            •
          </span>

          <span>
            +91 9155751363
          </span>

          <span className="text-[#C59A3A]">
            •
          </span>

          <span>
            info@ajftrust.org
          </span>

        </div>

      </section>

      {/* ====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="px-4 py-8 sm:px-5 md:py-10">

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            Our Direction
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            Purpose that guides our work
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-6 text-[#687B8C] sm:text-xs">
            Our vision describes the future we aspire to
            contribute towards, while our mission guides
            the practical work and partnerships through
            which we seek to create positive change.
          </p>

        </div>

      </section>

      {/* ====================================================
          MISSION & VISION
          STATIC — NOT EDITABLE FROM ADMIN
      ===================================================== */}

      <section className="px-4 pb-9 sm:px-5 md:pb-11">

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">

          {/* ==================================================
              MISSION
          =================================================== */}

          <article className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(16,42,67,0.07)]">

            {/* Mission Header */}

            <div className="bg-[#176B87] px-6 py-6 text-white">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">

                <Target size={24} />

              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9EAF0]">
                What We Do
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                {TRUST_MISSION.title}
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-white/70">
                {TRUST_MISSION.description}
              </p>

            </div>

            {/* Mission Points */}

            <div className="p-6">

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C59A3A]">
                Mission in Action
              </p>

              <div className="mt-4 space-y-3">

                {TRUST_MISSION.points.map(
                  (point, index) => (
                    <div
                      key={point}
                      className="flex gap-3"
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F3F6]">

                        <span className="text-[9px] font-bold text-[#176B87]">
                          {index + 1}
                        </span>

                      </div>

                      <p className="text-[10px] leading-5 text-[#627789] sm:text-[11px]">
                        {point}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

          </article>

          {/* ==================================================
              VISION
          =================================================== */}

          <article className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(16,42,67,0.07)]">

            {/* Vision Header */}

            <div className="bg-[#102A43] px-6 py-6 text-white">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C59A3A]">

                <Eye size={24} />

              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9B65A]">
                What We Aspire
              </p>

              <h2 className="mt-1 font-serif text-2xl font-bold">
                {TRUST_VISION.title}
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-white/60">
                {TRUST_VISION.description}
              </p>

            </div>

            {/* Vision Points */}

            <div className="p-6">

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C59A3A]">
                Vision for the Future
              </p>

              <div className="mt-4 space-y-3">

                {TRUST_VISION.points.map(
                  (point, index) => (
                    <div
                      key={point}
                      className="flex gap-3"
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF7E5]">

                        <span className="text-[9px] font-bold text-[#B48A2B]">
                          {index + 1}
                        </span>

                      </div>

                      <p className="text-[10px] leading-5 text-[#627789] sm:text-[11px]">
                        {point}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

          </article>

        </div>

      </section>

      {/* ====================================================
          PERMANENT INFORMATION NOTICE
      ===================================================== */}

      <section className="px-4 pb-9 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="flex items-start gap-3 rounded-2xl border border-[#D9E4EA] bg-[#F8FBFC] p-4">

            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-[#176B87]"
            />

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#102A43]">
                Official Trust Information
              </p>

              <p className="mt-1 text-[9px] leading-5 text-[#718394]">
                The Mission and Vision displayed on this page
                are maintained as fixed website content and are
                not connected to the Trust&apos;s database,
                administration panel or public editing system.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          VALUES
      ===================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
              Our Foundation
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
              Values Behind Our Work
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {VALUES.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#176B87]/30 hover:shadow-lg"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F3F6] transition group-hover:bg-[#176B87]">

                    <Icon
                      size={19}
                      className="text-[#176B87] transition group-hover:text-white"
                    />

                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#102A43]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#718394]">
                    {text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* ====================================================
          COMMITMENT
      ===================================================== */}

      <section className="bg-[#173B4D] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#C59A3A] text-white">

            <Heart
              size={19}
              fill="currentColor"
            />

          </div>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
            Our Commitment
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Turning purpose into action.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-6 text-white/55 sm:text-xs">
            We seek to work responsibly with communities,
            supporters and partners so that our efforts
            contribute towards practical and meaningful
            social outcomes.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/about"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/15"
            >
              About Our Trust
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/programs"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#C59A3A] px-5 text-xs font-bold text-white transition hover:bg-[#B48A2B]"
            >
              Explore Our Work
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-bold text-[#102A43] transition hover:bg-[#F4F7FA]"
            >
              Support Our Work
              <Heart
                size={14}
                fill="currentColor"
              />
            </Link>

          </div>

        </div>

      </section>

      

    </main>
  );
}