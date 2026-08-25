"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const opportunities = [
  {
    title: "Community Outreach",
    icon: HeartHandshake,
    duration: "4–12 Weeks",
    description:
      "Participate in community engagement, awareness drives, field activities and social initiatives.",
    tags: ["Field Work", "Community"],
  },
  {
    title: "Education & Learning",
    icon: GraduationCap,
    duration: "4–12 Weeks",
    description:
      "Support educational activities, learning resources, student engagement and programme coordination.",
    tags: ["Education", "Learning"],
  },
  {
    title: "Digital & Communication",
    icon: Rocket,
    duration: "4–12 Weeks",
    description:
      "Contribute to digital campaigns, content, social media communication and online outreach.",
    tags: ["Digital", "Creative"],
  },
  {
    title: "Research & Documentation",
    icon: FileText,
    duration: "4–12 Weeks",
    description:
      "Assist with research, reports, documentation, data collection and knowledge resources.",
    tags: ["Research", "Reports"],
  },
];

const benefits = [
  {
    icon: Target,
    title: "Real Project Exposure",
    text: "Work on practical assignments connected with meaningful social initiatives.",
  },
  {
    icon: Users,
    title: "Community Experience",
    text: "Understand real community needs and participate in people-focused activities.",
  },
  {
    icon: Lightbulb,
    title: "Learn & Create",
    text: "Develop practical skills through supervised tasks and project-based learning.",
  },
  {
    icon: Award,
    title: "Internship Certificate",
    text: "Eligible interns may receive a certificate after successfully completing programme requirements.",
  },
];

const journey = [
  {
    number: "01",
    title: "Online Application",
    text: "Submit your details and choose your preferred internship area.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Application ID",
    text: "Receive your unique AJFT internship application reference.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Print & Submit",
    text: "Print your application, add photograph and signature, then submit the physical documents.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Verification",
    text: "AJFT verifies the physical application and supporting documents.",
    icon: CheckCircle2,
  },
  {
    number: "05",
    title: "ID Card",
    text: "Approved interns receive an official internship identity card.",
    icon: Award,
  },
  {
    number: "06",
    title: "Internship",
    text: "Complete the assigned internship programme and project work.",
    icon: BriefcaseBusiness,
  },
];

const requirements = [
  "Basic academic information",
  "Valid mobile number",
  "Active email address",
  "Preferred internship area",
  "Preferred internship duration",
  "Passport-size photograph",
  "Student signature",
];

export default function InternshipPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F5FF] text-[#172033]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#21164F]">

        <div className="absolute -left-40 -top-40 h-[430px] w-[430px] rounded-full bg-[#8B5CF6]/25 blur-3xl" />

        <div className="absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-[#14B8A6]/20 blur-3xl" />

        <div className="absolute bottom-0 left-[40%] h-48 w-48 rounded-full bg-[#F59E0B]/10 blur-3xl" />

        <div className="absolute right-[10%] top-[20%] hidden h-32 w-32 rotate-12 rounded-[2rem] border border-white/10 lg:block" />

        <div className="absolute right-[15%] top-[28%] hidden h-20 w-20 -rotate-12 rounded-2xl border border-white/10 lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 sm:px-10 lg:px-8 lg:pb-36">

          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">

                <Sparkles
                  size={14}
                  className="text-[#FBBF24]"
                />

                <span className="text-[9px] font-black uppercase tracking-[0.24em] text-white/85">
                  AJFT Internship Programme
                </span>

              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.01] tracking-tight text-white sm:text-6xl lg:text-7xl">

                Learn.

                <span className="text-[#A78BFA]">
                  {" "}Serve.
                </span>

                <br />

                <span className="text-[#5EEAD4]">
                  Make an Impact.
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Build practical experience while contributing to
                meaningful community-focused work with Anand Jivan
                Foundation Trust.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  href="/internship/apply"
                  className="
                    inline-flex
                    h-12
                    items-center
                    gap-2
                    rounded-2xl
                    bg-[#FBBF24]
                    px-6
                    text-xs
                    font-black
                    text-[#21164F]
                    shadow-xl
                    transition-all
                    hover:-translate-y-1
                    hover:bg-[#FCD34D]
                  "
                >
                  Apply for Internship
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/internship/status"
                  className="
                    inline-flex
                    h-12
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/10
                    px-6
                    text-xs
                    font-black
                    text-white
                    backdrop-blur
                    transition
                    hover:bg-white/15
                  "
                >
                  <Search size={15} />
                  Track Application
                </Link>

              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">

                {[
                  "Student Friendly",
                  "Project Based",
                  "Community Focused",
                  "Certificate Path",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >

                    <CheckCircle2
                      size={13}
                      className="text-[#5EEAD4]"
                    />

                    <span className="text-[9px] font-bold text-white/55">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative hidden min-h-[460px] lg:block">

              <div className="absolute right-4 top-8 w-[360px] rotate-2 rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl">

                <div className="rounded-[1.5rem] bg-white p-6">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                      <GraduationCap size={23} />
                    </div>

                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1.5 text-[8px] font-black text-[#15803D]">
                      APPLICATION OPEN
                    </span>

                  </div>

                  <p className="mt-7 text-[8px] font-black uppercase tracking-[0.2em] text-[#8B5CF6]">
                    Internship Journey
                  </p>

                  <h2 className="mt-2 text-2xl font-black leading-tight text-[#172033]">
                    Turn your skills into service.
                  </h2>

                  <div className="mt-6 space-y-3">

                    {[
                      "Submit online application",
                      "Receive unique Application ID",
                      "Print and submit documents",
                      "Get verified by AJFT",
                      "Receive Internship ID Card",
                      "Complete your programme",
                    ].map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-2"
                      >

                        <CheckCircle2
                          size={14}
                          className="text-[#14B8A6]"
                        />

                        <span className="text-[10px] font-bold text-slate-500">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

              <div className="absolute bottom-2 left-3 w-52 -rotate-3 rounded-2xl bg-[#14B8A6] p-5 text-white shadow-2xl">

                <Rocket size={22} />

                <p className="mt-5 text-[9px] font-black uppercase tracking-wider text-white/60">
                  Your Next Step
                </p>

                <p className="mt-1 text-lg font-black">
                  Start Here.
                </p>

              </div>

              <div className="absolute bottom-24 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-[#FBBF24] text-center shadow-xl">

                <div>

                  <p className="text-lg font-black text-[#21164F]">
                    4+
                  </p>

                  <p className="text-[7px] font-black uppercase text-[#21164F]/60">
                    Areas
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* WAVE */}

        <div className="absolute bottom-[-1px] left-0 w-full">

          <svg
            viewBox="0 0 1440 120"
            className="block h-[70px] w-full"
            preserveAspectRatio="none"
          >

            <path
              d="M0 75 C180 15 350 115 570 65 C800 10 950 110 1160 58 C1290 25 1370 48 1440 25 V120 H0 Z"
              fill="#F7F5FF"
            />

          </svg>

        </div>

      </section>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section className="relative z-10 mx-auto -mt-2 max-w-7xl px-6 sm:px-10 lg:px-8">

        <div className="grid gap-4 md:grid-cols-3">

          <QuickAction
            icon={<Rocket size={20} />}
            title="Apply Online"
            text="Start your internship application."
            href="/internship/apply"
          />

          <QuickAction
            icon={<Search size={20} />}
            title="Track Application"
            text="Check your application status."
            href="/internship/status"
          />

          <QuickAction
            icon={<FileCheck2 size={20} />}
            title="Internship Process"
            text="Understand every step before applying."
            href="#journey"
          />

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-14 sm:px-10 lg:px-8">

        <div className="grid gap-4 md:grid-cols-3">

          {[
            {
              icon: Clock3,
              title: "Flexible Duration",
              text: "Choose a duration suitable for your academic or personal schedule.",
            },
            {
              icon: BriefcaseBusiness,
              title: "Practical Work",
              text: "Participate in real activities, documentation, outreach and project tasks.",
            },
            {
              icon: HeartHandshake,
              title: "Social Impact",
              text: "Use your skills to contribute towards meaningful community initiatives.",
            },
          ].map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  rounded-[1.5rem]
                  border
                  border-[#E8E2FF]
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED] transition group-hover:bg-[#7C3AED] group-hover:text-white">

                  <Icon size={20} />

                </div>

                <h3 className="mt-5 text-base font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-[10px] leading-6 text-slate-500">
                  {item.text}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* =====================================================
          OPPORTUNITIES
      ====================================================== */}

      <section
        id="opportunities"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 lg:px-8"
      >

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#7C3AED]">
              Find Your Area
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Internship Opportunities
            </h2>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-500">
              Choose an area that matches your skills,
              interests and learning goals.
            </p>

          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EDE9FE] px-4 py-2 text-[9px] font-black text-[#6D28D9]">
            <Sparkles size={12} />
            Learn Through Action
          </span>

        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">

          {opportunities.map((item, index) => {

            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[1.7rem]
                  border
                  border-[#E8E2FF]
                  bg-white
                  p-7
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_25px_60px_rgba(80,55,150,0.12)]
                "
              >

                <span className="absolute right-5 top-5 text-5xl font-black text-[#F2EEFF]">
                  0{index + 1}
                </span>

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#7C3AED] transition-all group-hover:bg-[#7C3AED] group-hover:text-white">

                      <Icon size={24} />

                    </div>

                    <span className="rounded-full bg-[#F0FDFA] px-3 py-1.5 text-[8px] font-black text-[#0F766E]">
                      {item.duration}
                    </span>

                  </div>

                  <h3 className="mt-7 text-xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">

                    {item.tags.map((tag) => (

                      <span
                        key={tag}
                        className="rounded-full bg-[#F7F5FF] px-3 py-1.5 text-[8px] font-bold text-[#6D28D9]"
                      >
                        #{tag}
                      </span>

                    ))}

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* =====================================================
          APPLICATION JOURNEY
      ====================================================== */}

      <section
        id="journey"
        className="relative overflow-hidden bg-[#EEFDF9]"
      >

        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#14B8A6]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#0F766E]">
              Application Journey
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              From Application to Internship
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500">
              A simple and transparent process designed to
              keep applicants informed at every stage.
            </p>

          </div>

          <div className="relative mt-12">

            <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-[#BFEDE3] xl:block" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-6">

              {journey.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="
                      relative
                      rounded-[1.5rem]
                      border
                      border-[#D8F3EC]
                      bg-white
                      p-5
                      text-center
                      shadow-sm
                      transition
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >

                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-lg">

                      <Icon size={20} />

                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FBBF24] text-[7px] font-black text-[#21164F]">
                        {item.number}
                      </span>

                    </div>

                    <h3 className="mt-5 text-sm font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[9px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY AJFT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#7C3AED]">
              Why Join
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              More Than an Internship
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Learn from practical community-focused work while
              building professional skills, confidence and a
              portfolio of meaningful experience.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-xs font-black text-[#7C3AED]"
            >
              Know About AJFT
              <ArrowRight size={14} />
            </Link>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {benefits.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#E8E2FF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-5 text-base font-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-6 text-slate-500">
                    {item.text}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          REQUIREMENTS
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-2">

            <div className="rounded-[2rem] bg-[#21164F] p-8 text-white sm:p-10">

              <FileText
                size={28}
                className="text-[#FBBF24]"
              />

              <h2 className="mt-6 text-3xl font-black">
                Before You Apply
              </h2>

              <p className="mt-4 text-xs leading-6 text-white/60">
                Keep the following information ready before
                starting your online application.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                {requirements.map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                  >

                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-[#5EEAD4]"
                    />

                    <span className="text-[9px] font-bold text-white/70">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            <div className="rounded-[2rem] border border-[#E8E2FF] bg-[#F7F5FF] p-8 sm:p-10">

              <ShieldCheck
                size={28}
                className="text-[#7C3AED]"
              />

              <h2 className="mt-6 text-3xl font-black">
                Transparent Process
              </h2>

              <p className="mt-4 text-xs leading-6 text-slate-500">
                Your application moves through defined stages.
                Keep your Application ID safely available for
                future status checks and communication.
              </p>

              <div className="mt-7 space-y-3">

                {[
                  "Application submitted",
                  "Application ID generated",
                  "PDF generated",
                  "Physical document submission",
                  "AJFT verification",
                  "Application approval",
                  "Internship ID Card",
                  "Internship completion",
                  "Certificate eligibility",
                ].map((item, index) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3"
                  >

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[7px] font-black text-[#7C3AED]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[10px] font-bold text-slate-600">
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
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#21164F]">

        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[#7C3AED]/30 blur-3xl" />

        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#14B8A6]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-10">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBBF24] text-[#21164F] shadow-xl">
            <Rocket size={26} />
          </div>

          <h2 className="mt-7 text-3xl font-black text-white sm:text-5xl">
            Ready to Start Your Journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60">
            Bring your curiosity, skills and energy.
            Let&apos;s create meaningful work together.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link
              href="/internship/apply"
              className="
                inline-flex
                h-12
                items-center
                gap-2
                rounded-2xl
                bg-[#FBBF24]
                px-7
                text-xs
                font-black
                text-[#21164F]
                transition
                hover:-translate-y-1
                hover:bg-[#FCD34D]
              "
            >
              Apply Now
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/internship/status"
              className="
                inline-flex
                h-12
                items-center
                gap-2
                rounded-2xl
                border
                border-white/15
                bg-white/10
                px-7
                text-xs
                font-black
                text-white
                backdrop-blur
              "
            >
              <Search size={15} />
              Track Application
            </Link>

            <a
              href="mailto:info@ajftrust.org?subject=Internship%20Enquiry"
              className="
                inline-flex
                h-12
                items-center
                gap-2
                rounded-2xl
                border
                border-white/15
                bg-white/10
                px-7
                text-xs
                font-black
                text-white
              "
            >
              <Mail size={15} />
              Contact AJFT
            </a>

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">

            <span className="flex items-center gap-2 text-[9px] font-bold text-white/45">
              <MapPin size={12} />
              Bihar
            </span>

            <span className="flex items-center gap-2 text-[9px] font-bold text-white/45">
              <HeartHandshake size={12} />
              Social Impact
            </span>

            <span className="flex items-center gap-2 text-[9px] font-bold text-white/45">
              <Users size={12} />
              Community
            </span>

          </div>

        </div>

        {/* bottom wave */}

        <svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 left-0 block h-10 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50 C200 10 350 80 550 45 C760 8 900 75 1100 42 C1250 18 1350 55 1440 25 V100 H0 Z"
            fill="#F7F5FF"
          />
        </svg>

      </section>

    </main>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex
        items-center
        gap-4
        rounded-[1.4rem]
        border
        border-[#E8E2FF]
        bg-white
        p-5
        shadow-lg
        shadow-[#7C3AED]/5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#C4B5FD]
        hover:shadow-xl
      "
    >

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED] transition group-hover:bg-[#7C3AED] group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="text-xs font-black">
          {title}
        </h3>

        <p className="mt-1 text-[9px] leading-5 text-slate-500">
          {text}
        </p>

      </div>

      <ArrowRight
        size={15}
        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#7C3AED]"
      />

    </Link>
  );
}