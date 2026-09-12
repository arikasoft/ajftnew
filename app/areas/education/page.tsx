"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Library,
  School,
  Sparkles,
  Users,
  CheckCircle2,
  Quote,
  Award,
  Globe2,
  Target,
  Lightbulb,
} from "lucide-react";

const focusAreas = [
  {
    icon: School,
    title: "School Development",
    description:
      "Supporting schools with better learning spaces, essential facilities and resources that create a positive environment for every child.",
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    description:
      "Helping children access meaningful, inclusive and quality education that strengthens knowledge, confidence and future opportunities.",
  },
  {
    icon: Laptop,
    title: "Digital Learning",
    description:
      "Promoting digital literacy and technology-enabled learning so students can participate confidently in a changing world.",
  },
  {
    icon: GraduationCap,
    title: "Student Support",
    description:
      "Providing educational support and encouragement to students from underserved communities so financial challenges do not stop learning.",
  },
  {
    icon: Users,
    title: "Teacher Development",
    description:
      "Supporting educators and learning communities through resources, training opportunities and collaborative development.",
  },
  {
    icon: HeartHandshake,
    title: "Inclusive Education",
    description:
      "Encouraging equal learning opportunities for children regardless of background, gender, ability or economic circumstances.",
  },
];

const initiatives = [
  {
    number: "01",
    title: "School Adoption & Development",
    text: "Working with schools and communities to identify educational needs and support meaningful improvements.",
  },
  {
    number: "02",
    title: "Learning Resource Support",
    text: "Helping provide books, educational materials, learning resources and other essentials for students.",
  },
  {
    number: "03",
    title: "Digital Education",
    text: "Creating opportunities for students to access digital tools, technology awareness and modern learning resources.",
  },
  {
    number: "04",
    title: "Community Engagement",
    text: "Encouraging parents, teachers, volunteers and communities to actively participate in children's education.",
  },
];

const commitments = [
  "Promote access to quality education",
  "Support underserved children and communities",
  "Encourage digital literacy and modern learning",
  "Strengthen schools and learning environments",
  "Promote inclusive and equal opportunities",
  "Build confidence, skills and future readiness",
];

export default function EducationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[#061A2E]">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(21,168,160,0.28),transparent_35%),radial-gradient(circle_at_left,rgba(28,112,204,0.25),transparent_35%)]" />

          <div className="absolute -top-24 right-[-100px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Decorative circles */}
        <div className="absolute right-10 top-24 h-48 w-48 rounded-full border border-white/10" />
        <div className="absolute right-20 top-36 h-32 w-32 rounded-full border border-cyan-300/10" />

        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 lg:px-8 lg:pb-40 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur">
                <Sparkles size={16} />
                Education & Skill Development
              </div>

              <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Education Is The
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  Foundation Of Change.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Anand Jivan Foundation Trust works to promote accessible,
                inclusive and quality education so children and young people
                can build knowledge, confidence and a brighter future.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/donate"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[#061A2E] transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  Support Education
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/our-work"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Explore Our Work
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <div className="text-2xl font-bold text-white">Equal</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Opportunities
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-white">
                    Quality
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    Learning
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-white">
                    Future
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    Ready Skills
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-slate-900 p-8">
                  <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />

                  <div className="relative grid gap-5">
                    <div className="rounded-2xl border border-white/10 bg-[#071f35]/80 p-6 backdrop-blur">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-cyan-400/15 p-3 text-cyan-300">
                          <GraduationCap size={30} />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white">
                            Learning Creates Possibility
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            Every child deserves the opportunity to learn,
                            grow and discover their potential.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <BookOpen className="text-cyan-300" size={30} />

                        <h4 className="mt-5 font-bold text-white">
                          Knowledge
                        </h4>

                        <p className="mt-2 text-sm text-slate-400">
                          Building strong learning foundations.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <Lightbulb className="text-yellow-300" size={30} />

                        <h4 className="mt-5 font-bold text-white">
                          Innovation
                        </h4>

                        <p className="mt-2 text-sm text-slate-400">
                          Encouraging creativity and new ideas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-8 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700">
                    <Target size={22} />
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">
                      Our Commitment
                    </div>
                    <div className="text-sm text-slate-500">
                      Education for lasting change
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 160"
            className="block h-auto w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-10 bg-cyan-600" />
              Our Education Mission
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Empowering People Through
              <span className="text-cyan-700"> Education.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              Education has the power to transform individuals, families and
              entire communities. AJFT believes that access to quality learning
              should not depend on economic circumstances or social background.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Through educational initiatives, partnerships and community
              participation, we aim to strengthen learning environments and
              create opportunities that help children and young people move
              towards a more secure and independent future.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOCUS AREAS
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-50 py-24">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              What We Focus On
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Building Stronger Learning
              <span className="block text-cyan-700"> Ecosystems.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our education initiatives focus on the different factors that
              influence a child&apos;s learning journey.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-xl"
                >
                  <div className="inline-flex rounded-2xl bg-cyan-50 p-4 text-cyan-700 transition group-hover:bg-cyan-700 group-hover:text-white">
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {area.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {area.description}
                  </p>

                  <div className="mt-6 h-1 w-10 rounded-full bg-cyan-100 transition group-hover:w-20 group-hover:bg-cyan-600" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRAMS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Our Initiatives
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              From Learning Support
              <span className="block">To Long-Term Opportunity.</span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-600">
              Our approach brings together students, schools, educators,
              communities and supporters to create meaningful educational
              impact.
            </p>

            <div className="mt-10 rounded-3xl bg-[#061A2E] p-8 text-white">
              <Quote className="text-cyan-300" size={36} />

              <p className="mt-5 text-xl leading-8 text-slate-200">
                Education is not only about classrooms and books. It is about
                creating the confidence and opportunity to imagine a better
                future.
              </p>

              <div className="mt-6 font-semibold text-cyan-300">
                Anand Jivan Foundation Trust
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {initiatives.map((initiative) => (
              <div
                key={initiative.number}
                className="group flex gap-6 rounded-3xl border border-slate-200 p-7 transition hover:border-cyan-200 hover:bg-cyan-50/40"
              >
                <div className="text-3xl font-bold text-cyan-600">
                  {initiative.number}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {initiative.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {initiative.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMITMENT
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#061A2E] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.2),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <span className="h-px w-10 bg-cyan-300" />
                Our Commitment
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Creating Opportunities
                <span className="block text-cyan-300">
                  That Last Beyond Today.
                </span>
              </h2>

              <p className="mt-7 max-w-xl leading-8 text-slate-300">
                We are committed to supporting education as a long-term pathway
                towards empowerment, equality and sustainable community
                development.
              </p>

              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-[#061A2E] transition hover:bg-cyan-300"
              >
                Partner With Us
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {commitments.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-cyan-300"
                    size={22}
                  />

                  <span className="leading-7 text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan-700 via-cyan-600 to-blue-700 px-8 py-14 shadow-2xl sm:px-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-3 text-cyan-100">
                <Award size={22} />
                <span className="font-semibold">
                  Together We Can Make A Difference
                </span>
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Help Us Create More
                <span className="block">Learning Opportunities.</span>
              </h2>

              <p className="mt-6 max-w-2xl leading-8 text-cyan-50">
                Your support can help strengthen education initiatives and
                create meaningful opportunities for children and communities.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-cyan-700 transition hover:bg-slate-50"
              >
                Donate Now
                <HeartHandshake size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Get Involved
                <Globe2 size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}