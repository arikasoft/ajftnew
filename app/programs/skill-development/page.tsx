import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  GraduationCap,
  Laptop,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";

const benefits = [
  "Online student application",
  "Unique Student ID",
  "Student login credentials",
  "Structured skill assessment",
  "70 multiple-choice questions",
  "45 marks required to qualify",
  "Automatic result calculation",
  "Digital certificate after qualification",
];

const learningAreas = [
  {
    icon: Laptop,
    title: "Digital Literacy",
    description:
      "Basic understanding of computers, digital devices, internet usage and essential technology tools.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Employability Skills",
    description:
      "Practical skills and knowledge that can help learners prepare for employment and professional opportunities.",
  },
  {
    icon: BookOpen,
    title: "Office Productivity",
    description:
      "Awareness of commonly used digital productivity tools and fundamental workplace technology concepts.",
  },
  {
    icon: Brain,
    title: "Digital Awareness",
    description:
      "Understanding responsible digital practices, online awareness and effective use of digital resources.",
  },
];

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Apply Online",
    description:
      "Submit your Skill Development Programme application using the online application form.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Receive Student Account",
    description:
      "After successful application processing, your student account details can be used for portal access.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Complete Assessment",
    description:
      "Attempt the programme assessment consisting of 70 multiple-choice questions.",
  },
  {
    number: "04",
    icon: Award,
    title: "Receive Result & Certificate",
    description:
      "Students scoring 45 or more marks qualify according to the configured assessment criteria.",
  },
];

export default function SkillDevelopmentPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#071a3d] via-[#0a3b70] to-[#075985]">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-[28rem] w-[28rem] rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="absolute right-[-8rem] top-[-6rem] h-[35rem] w-[35rem] rounded-full bg-blue-300/15 blur-3xl" />

          <div className="absolute bottom-[-10rem] left-[30%] h-[25rem] w-[25rem] rounded-full bg-indigo-300/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-36 lg:pt-10">
          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-white/65">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link
              href="/programs"
              className="transition hover:text-white"
            >
              Programmes
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-white">
              Skill Development
            </span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-xs font-black tracking-[0.16em] text-cyan-100 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-300" />

                AJFT SKILL DEVELOPMENT PROGRAMME
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Learn.
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Develop Skills.
                </span>
                Build Opportunities.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                The Skill Development Programme is designed to promote
                learning, digital awareness, practical skills and
                employability-oriented knowledge through a structured
                student learning and assessment portal.
              </p>

              <p className="mt-4 max-w-3xl leading-8 text-cyan-100/65">
                Students can apply online, access their student portal,
                complete the programme assessment and view their result
                through a structured digital workflow.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/programs/skill-development/apply"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-blue-800 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-cyan-50"
                >
                  <GraduationCap className="h-5 w-5" />

                  Apply Now

                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/student/login"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  <LockKeyhole className="h-5 w-5" />

                  Student Login
                </Link>
              </div>

              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["70", "Questions"],
                  ["45", "Passing Marks"],
                  ["MCQ", "Assessment"],
                  ["CERT", "Qualification"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4 backdrop-blur-sm"
                  >
                    <p className="text-xl font-black text-white">
                      {value}
                    </p>

                    <p className="mt-1 text-xs text-white/55">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PORTAL CARD */}

            <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-blue-300/10 text-cyan-100">
                  <GraduationCap className="h-8 w-8" />
                </div>

                <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
                  Student Portal
                </div>
              </div>

              <h2 className="mt-7 text-2xl font-black text-white">
                Your Learning Journey
              </h2>

              <p className="mt-3 leading-7 text-white/65">
                A simple digital workflow from application to assessment
                and qualification status.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  ["01", "Submit Application"],
                  ["02", "Access Student Account"],
                  ["03", "Attempt Assessment"],
                  ["04", "View Result"],
                  ["05", "Certificate After Qualification"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/15 text-sm font-black text-cyan-100">
                      {number}
                    </div>

                    <p className="font-bold text-white/85">
                      {title}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/programs/skill-development/apply"
                className="mt-7 flex items-center justify-between rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-4 font-black text-slate-950 transition hover:brightness-110"
              >
                Start Your Application

                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}

        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block h-auto w-full"
          >
            <path
              d="M0,70 C180,110 360,20 560,55 C800,95 1010,20 1220,58 C1320,72 1390,82 1440,72 L1440,120 L0,120 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/programs/skill-development/apply"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                <UserCheck className="h-7 w-7" />
              </div>

              <div>
                <p className="font-black text-slate-950">
                  Apply for Programme
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Create your student application
                </p>
              </div>
            </div>

            <ArrowRight className="mt-5 h-5 w-5 text-blue-600 transition group-hover:translate-x-2" />
          </Link>

          <Link
            href="/student/login"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                <LockKeyhole className="h-7 w-7" />
              </div>

              <div>
                <p className="font-black text-slate-950">
                  Student Login
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Access your student dashboard
                </p>
              </div>
            </div>

            <ArrowRight className="mt-5 h-5 w-5 text-emerald-600 transition group-hover:translate-x-2" />
          </Link>

          <Link
            href="/certificate"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                <BadgeCheck className="h-7 w-7" />
              </div>

              <div>
                <p className="font-black text-slate-950">
                  Certificate Verification
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Verify certificate details
                </p>
              </div>
            </div>

            <ArrowRight className="mt-5 h-5 w-5 text-amber-600 transition group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
              <Target className="h-4 w-4" />

              PROGRAMME OVERVIEW
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Developing Skills for a Changing World
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Skills and digital awareness are increasingly important
              for learning, employment and participation in modern
              society. This programme focuses on structured learning and
              assessment-based participation.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              The student portal provides a digital journey that
              connects application, account access, assessment,
              evaluation and qualification status in one workflow.
            </p>

            <div className="mt-8 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <div className="flex gap-4">
                <div className="rounded-2xl bg-white p-3 text-blue-700 shadow-sm">
                  <Users className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="font-black text-slate-950">
                    Programme Goal
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    To encourage learning, practical awareness and skill
                    development through accessible digital programme
                    participation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {learningAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700 transition group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-950">
                    {area.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-black text-indigo-700">
              <Sparkles className="h-4 w-4" />

              HOW IT WORKS
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              From Application to Qualification
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Follow the programme journey through the student portal.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="text-3xl font-black text-slate-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-black text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ASSESSMENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
              <ClipboardCheck className="h-4 w-4" />

              PROGRAMME ASSESSMENT
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Assessment & Qualification Criteria
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              The programme assessment consists of multiple-choice
              questions. Student answers are evaluated automatically
              according to the configured question and answer system.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Total assessment questions: 70",
                "Question type: Multiple Choice Questions",
                "Passing requirement: 45 marks",
                "Automatic result calculation",
                "Qualification status displayed in student portal",
                "Certificate workflow after successful qualification",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <p className="font-semibold text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#052e2b] via-[#075e61] to-[#0f766e] p-7 text-white shadow-2xl sm:p-9">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-white/10 p-4">
                <Trophy className="h-8 w-8 text-yellow-200" />
              </div>

              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
                Assessment Criteria
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-black/10 p-6">
                <p className="text-4xl font-black text-white">
                  70
                </p>

                <p className="mt-2 text-sm text-white/60">
                  Total Questions
                </p>
              </div>

              <div className="rounded-3xl bg-black/10 p-6">
                <p className="text-4xl font-black text-emerald-200">
                  45
                </p>

                <p className="mt-2 text-sm text-white/60">
                  Required Marks
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6">
              <div className="flex items-center gap-3">
                <FileCheck2 className="h-6 w-6 text-emerald-200" />

                <div>
                  <p className="font-black">
                    Qualification Result
                  </p>

                  <p className="mt-1 text-sm text-white/65">
                    Result status is determined automatically according
                    to the configured assessment criteria.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/student/login"
              className="mt-7 flex items-center justify-between rounded-2xl bg-white px-6 py-4 font-black text-teal-700 transition hover:bg-emerald-50"
            >
              Go to Student Portal

              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ====================================================== */}

      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">
                <CircleHelp className="h-4 w-4" />

                STUDENT BENEFITS
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Everything Connected Through One Portal
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                The Skill Development portal is designed to provide a
                structured experience from application through
                assessment and qualification.
              </p>

              <Link
                href="/programs/skill-development/apply"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
              >
                Apply for Programme

                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex gap-3 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />

                  <p className="font-semibold leading-6 text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#071a3d] via-[#0a3b70] to-[#075985]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-cyan-200">
            <GraduationCap className="h-8 w-8" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Ready to Start Your Learning Journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Apply online to begin the programme application process and
            access the student learning workflow.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/programs/skill-development/apply"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-blue-800 shadow-xl transition hover:-translate-y-1"
            >
              Apply Now

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/student/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-black text-white transition hover:bg-white/15"
            >
              <LockKeyhole className="h-5 w-5" />

              Student Login
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-white/55">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Structured Assessment
            </span>

            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Student Portal Access
            </span>

            <span className="inline-flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certificate Workflow
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}