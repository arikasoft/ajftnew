import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata = {
  title:
    "Give a Child a Chance to Learn | Education Support | Anand Jivan Foundation Trust",
  description:
    "Support education and learning opportunities for children from underserved communities through Anand Jivan Foundation Trust.",
};

const supportAreas = [
  {
    icon: BookOpen,
    title: "Learning Materials",
    description:
      "Help provide books, notebooks, stationery and essential learning resources that can support a child's education.",
  },
  {
    icon: School,
    title: "School Support",
    description:
      "Support practical educational needs that can help children remain connected with learning.",
  },
  {
    icon: GraduationCap,
    title: "Learning Opportunities",
    description:
      "Encourage educational activities that help children learn, participate and develop confidence.",
  },
  {
    icon: Users,
    title: "Children & Communities",
    description:
      "Support children and families who face financial or social barriers to educational opportunities.",
  },
];

const supportPoints = [
  "Educational books and learning resources",
  "Notebooks and essential stationery",
  "School-related educational support",
  "Learning and educational activities",
  "Support for children from vulnerable families",
  "Community-focused education initiatives",
];

export default function EducationSupportPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800 pt-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-green-300/10 blur-3xl" />

        {/* Decorative circles */}
        <div className="pointer-events-none absolute right-[8%] top-[18%] hidden h-5 w-5 rounded-full bg-emerald-300/50 lg:block" />
        <div className="pointer-events-none absolute right-[18%] top-[38%] hidden h-3 w-3 rounded-full bg-cyan-300/60 lg:block" />
        <div className="pointer-events-none absolute left-[8%] top-[35%] hidden h-4 w-4 rounded-full bg-green-300/50 lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 pb-0 pt-16 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* LEFT */}
            <div className="pb-20 lg:pb-28">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Education Support Initiative
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Give a Child a{" "}
                <span className="text-emerald-300">Chance to Learn</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/85 sm:text-xl">
                Every child deserves the opportunity to learn, grow and build
                a better future — regardless of their family&apos;s financial
                situation.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-100/70">
                Your support can help provide essential educational resources
                and learning support to children from underserved communities.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/donate"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-extrabold text-emerald-800 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-emerald-50"
                >
                  Support Education
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/transparency"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  View Transparency
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-emerald-50/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  Transparent Giving
                </div>

                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-emerald-300" />
                  Community Focused
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative pb-16 lg:pb-24">
              <div className="relative mx-auto max-w-lg">
                {/* Glow */}
                <div className="absolute -inset-5 rounded-[3rem] bg-emerald-300/20 blur-2xl" />

                <div className="relative rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur">
                  <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-white via-emerald-50 to-cyan-50 px-7 py-12 text-center sm:px-10">
                    {/* Decorative wave-like background */}
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/50" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-200/40" />

                    <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-600/30">
                      <BookOpen className="h-14 w-14" />
                    </div>

                    <h2 className="relative mt-7 text-3xl font-black tracking-tight text-slate-900">
                      Education Creates Opportunity
                    </h2>

                    <p className="relative mx-auto mt-4 max-w-md leading-7 text-slate-600">
                      Helping children access learning resources and
                      educational support for a brighter future.
                    </p>

                    <div className="relative mt-7 flex flex-wrap justify-center gap-3">
                      <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                        Learn
                      </span>

                      <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
                        Grow
                      </span>

                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                        Thrive
                      </span>
                    </div>

                    <div className="relative mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                      <HeartHandshake className="h-4 w-4 text-emerald-600" />
                      Every contribution matters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO WAVE */}
        <div className="relative -mb-1 w-full">
          <svg
            viewBox="0 0 1440 180"
            className="block h-[100px] w-full sm:h-[130px] lg:h-[170px]"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="#ffffff"
              d="M0,96 C180,165 350,25 540,75 C730,125 850,165 1050,85 C1210,20 1320,50 1440,105 L1440,180 L0,180 Z"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================== */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Why Education Matters
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Every child deserves a chance to learn.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Financial hardship can make it difficult for children to access
              basic educational resources. Practical support can help remove
              some of these barriers and keep children connected with learning.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportAreas.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          STORY / APPROACH
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-24">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                Our Approach
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Turning support into educational opportunity.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Anand Jivan Foundation Trust works with a community-focused
                approach to support children and families facing barriers to
                education. The initiative focuses on practical educational
                resources and support that can make learning more accessible.
              </p>

              <div className="mt-8">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 font-bold text-emerald-300 transition hover:text-white"
                >
                  Explore Our Projects
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                {supportPoints.map((point) => (
                  <div key={point} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />

                    <span className="text-sm leading-6 text-slate-200">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPACT
      ========================================================== */}
      <section className="relative overflow-hidden bg-emerald-50 py-20 lg:py-24">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Education Impact
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
              Your support can help a child continue learning.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              A contribution can help provide practical educational resources
              to children who need additional support.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="group rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <BookOpen className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Learning Resources
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Support books, notebooks, stationery and other educational
                resources.
              </p>
            </div>

            <div className="group rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
                <School className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                School Support
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Help address practical educational needs that support
                children&apos;s learning.
              </p>
            </div>

            <div className="group rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                <GraduationCap className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Future Opportunities
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Help create opportunities for children to learn, grow and
                develop confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DONATION CTA
      ========================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-700 py-20 text-white lg:py-24">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <HeartHandshake className="h-8 w-8 text-emerald-100" />
          </div>

          <h2 className="mt-7 text-3xl font-black sm:text-4xl lg:text-5xl">
            Give a Child a Chance to Learn
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
            Your support can help provide educational resources and learning
            support to children from underserved communities.
          </p>

          {/* Donation psychology */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
              <div className="text-2xl font-black">₹500</div>
              <div className="mt-1 text-sm text-emerald-100">
                Support learning
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
              <div className="text-2xl font-black">₹1,000</div>
              <div className="mt-1 text-sm text-emerald-100">
                Support education
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
              <div className="text-2xl font-black">₹2,500</div>
              <div className="mt-1 text-sm text-emerald-100">
                Support a child
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 font-extrabold text-emerald-700 shadow-2xl transition hover:-translate-y-1 hover:bg-emerald-50"
            >
              Donate for Education
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-9 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
            >
              Contact AJFT
            </Link>
          </div>

          <p className="mt-6 text-sm text-emerald-100/70">
            Every contribution can become part of a child&apos;s learning
            journey.
          </p>
        </div>
      </section>

      {/* =========================================================
          TRUST
      ========================================================== */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-slate-500">
            Anand Jivan Foundation Trust
          </span>

          <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">
            Education, opportunity and community support.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Anand Jivan Foundation Trust works towards education, healthcare,
            drinking water, women empowerment, environmental protection,
            livelihood development, child welfare and community-focused social
            initiatives.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              Public Charitable Trust
            </span>

            <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
              Education
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
              Community Focused
            </span>
          </div>

          <Link
            href="/transparency"
            className="mt-8 inline-flex items-center gap-2 font-bold text-emerald-700 transition hover:text-emerald-800"
          >
            View Transparency Information
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA + WAVE
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-50 pt-14">
        {/* Small wave */}
        <svg
          viewBox="0 0 1440 120"
          className="absolute left-0 top-0 h-20 w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0,40 C180,95 350,10 540,45 C720,80 870,105 1050,50 C1220,0 1330,30 1440,65 L1440,0 L0,0 Z"
          />
        </svg>

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-20 text-center">
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Every child deserves a chance.
          </h2>

          <p className="mt-3 text-slate-600">
            Together, we can help turn educational support into opportunity.
          </p>

          <Link
            href="/donate"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-extrabold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-emerald-700"
          >
            Support Education
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}