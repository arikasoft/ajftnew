import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const opportunities = [
  {
    number: "01",
    title: "Education Support",
    text: "Support education-focused activities, learning initiatives and community engagement.",
    icon: <Target size={21} />,
  },
  {
    number: "02",
    title: "Community Activities",
    text: "Participate in community-focused activities and local initiatives.",
    icon: <Users size={21} />,
  },
  {
    number: "03",
    title: "Project Support",
    text: "Assist with project coordination, documentation and field-level activities.",
    icon: <Briefcase size={21} />,
  },
  {
    number: "04",
    title: "Digital & Communication",
    text: "Help with digital communication, content, documentation and outreach.",
    icon: <Sparkles size={21} />,
  },
];

const process = [
  {
    number: "01",
    title: "Apply",
    text: "Share your basic information and area of interest.",
  },
  {
    number: "02",
    title: "Connect",
    text: "Our team can review your interest and contact you.",
  },
  {
    number: "03",
    title: "Discuss",
    text: "Understand the available opportunity and requirements.",
  },
  {
    number: "04",
    title: "Participate",
    text: "Contribute to suitable activities according to the requirement.",
  },
];

const volunteerTypes = [
  {
    title: "Students",
    text: "Students can contribute their time, creativity and learning skills.",
    icon: <Users size={20} />,
  },
  {
    title: "Working Professionals",
    text: "Professionals can share technical, managerial and communication skills.",
    icon: <Briefcase size={20} />,
  },
  {
    title: "Community Members",
    text: "Local community members can participate in field activities.",
    icon: <HeartHandshake size={20} />,
  },
];

const skills = [
  "Teaching & Education",
  "Community Outreach",
  "Content Writing",
  "Graphic Design",
  "Photography",
  "Social Media",
  "Documentation",
  "Event Support",
];

const faqs = [
  {
    question: "Who can volunteer with AJFT?",
    answer:
      "People who are interested in community service and responsible participation can express their interest. Suitable opportunities depend on current activities and organisational requirements.",
  },
  {
    question: "Is previous experience required?",
    answer:
      "Previous experience may be helpful for some activities, but it is not necessarily required for every volunteer opportunity.",
  },
  {
    question: "How much time do I need to give?",
    answer:
      "Time requirements can vary depending on the activity, project and volunteer role.",
  },
  {
    question: "How can I apply?",
    answer:
      "You can contact Anand Jivan Foundation Trust through email or phone and share your area of interest, skills and availability.",
  },
];

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-[#F5F8FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0D2B3E]">

        {/* Background decoration */}

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#176B87]/25 blur-3xl" />

        <div className="absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-[#D4A63A]/10 blur-3xl" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A63A]/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-20 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#D9AA42]" />

                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/70">
                  Anand Jivan Foundation Trust
                </span>

              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#D9B65A]">
                Volunteer With Us
              </p>

              <h1 className="mt-3 max-w-2xl font-serif text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl">
                Your Time.
                <br />
                <span className="text-[#D9B65A]">
                  Your Skills.
                </span>
                <br />
                Meaningful Impact.
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 md:text-base">
                Share your time, skills and ideas to support meaningful
                charitable and community-focused initiatives with Anand
                Jivan Foundation Trust.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <a
                  href="#apply"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#D4A238]
                    px-7
                    text-xs
                    font-black
                    text-white
                    shadow-[0_10px_30px_rgba(212,162,56,0.2)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#BC8C27]
                  "
                >
                  Become a Volunteer
                  <ArrowRight size={15} />
                </a>

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/[0.06]
                    px-7
                    text-xs
                    font-black
                    text-white
                    backdrop-blur
                    transition
                    hover:bg-white/10
                  "
                >
                  Contact Us
                  <MessageSquare size={15} />
                </Link>

              </div>

              {/* Trust */}

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-bold text-white/35">

                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-[#D9AA42]" />
                  Responsible Participation
                </span>

                <span className="flex items-center gap-1.5">
                  <Heart size={12} className="text-[#D9AA42]" />
                  Community Service
                </span>

              </div>

            </div>

            {/* RIGHT CARD */}

            <div className="relative">

              <div className="absolute -inset-5 rounded-[30px] bg-[#D4A238]/5 blur-2xl" />

              <div className="relative rounded-[26px] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl sm:p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A238] text-white shadow-xl">
                  <HeartHandshake size={27} />
                </div>

                <p className="mt-6 text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B65A]">
                  Why Volunteer?
                </p>

                <h2 className="mt-2 font-serif text-2xl font-black text-white">
                  Contribute With Purpose
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/50">
                  Every contribution of time, skill or effort can help
                  strengthen community-focused activities.
                </p>

                <div className="mt-6 space-y-3">

                  {[
                    "Support community-focused activities",
                    "Share your skills and experience",
                    "Learn through practical participation",
                    "Connect with people and communities",
                    "Contribute to meaningful initiatives",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-[#D9B65A]"
                      />

                      <span className="text-[11px] font-semibold text-white/65">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}

      <section className="border-b border-[#DCE5EA] bg-white">

        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#E3E9ED] sm:grid-cols-4">

          <div className="px-4 py-5 text-center">
            <p className="text-[8px] font-black uppercase tracking-wider text-[#8997A2]">
              DARPAN ID
            </p>
            <p className="mt-1 text-[10px] font-black text-[#102A43]">
              BR/2023/0343963
            </p>
          </div>

          <div className="px-4 py-5 text-center">
            <p className="text-[8px] font-black uppercase tracking-wider text-[#8997A2]">
              PAN
            </p>
            <p className="mt-1 text-[10px] font-black text-[#102A43]">
              AAJTA9323K
            </p>
          </div>

          <div className="px-4 py-5 text-center">
            <p className="text-[8px] font-black uppercase tracking-wider text-[#8997A2]">
              Phone
            </p>
            <p className="mt-1 text-[10px] font-black text-[#176B87]">
              +91 9155751363
            </p>
          </div>

          <div className="px-4 py-5 text-center">
            <p className="text-[8px] font-black uppercase tracking-wider text-[#8997A2]">
              Email
            </p>
            <p className="mt-1 text-[10px] font-black text-[#176B87]">
              info@ajftrust.org
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-5 py-14 sm:px-7 md:py-18 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

            <div className="rounded-3xl border border-[#DCE5EA] bg-white p-7 shadow-[0_12px_40px_rgba(16,42,67,0.05)] md:p-10">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A3A]">
                Volunteer With AJFT
              </p>

              <h2 className="mt-3 font-serif text-3xl font-black text-[#102A43] md:text-4xl">
                Your time can create value.
              </h2>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#D4A238]" />

              <div className="mt-6 space-y-4 text-xs leading-7 text-[#64798A] md:text-sm">

                <p>
                  Volunteers can contribute valuable time, skills and
                  ideas to charitable and community-focused activities.
                </p>

                <p>
                  Depending on the requirements of a particular activity
                  or project, volunteer opportunities may involve
                  education, community engagement, documentation,
                  communication or project support.
                </p>

                <p>
                  We encourage people who share our commitment to service
                  and responsible community participation to get in touch
                  with us.
                </p>

              </div>

            </div>

            {/* QUICK BENEFITS */}

            <div className="rounded-3xl bg-[#173B4D] p-7 text-white md:p-10">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B65A]">
                Volunteer Experience
              </p>

              <h2 className="mt-3 font-serif text-3xl font-black">
                Learn. Serve. Grow.
              </h2>

              <div className="mt-7 space-y-5">

                {[
                  [
                    "01",
                    "Learn",
                    "Gain practical exposure through community-focused activities.",
                  ],
                  [
                    "02",
                    "Serve",
                    "Contribute your time and skills to meaningful initiatives.",
                  ],
                  [
                    "03",
                    "Grow",
                    "Develop communication, teamwork and practical experience.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="flex gap-4"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A238] text-[10px] font-black">
                      {number}
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-white">
                        {title}
                      </h3>

                      <p className="mt-1 text-[10px] leading-5 text-white/50">
                        {text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          OPPORTUNITIES
      ====================================================== */}

      <section className="border-y border-[#DCE5EA] bg-white px-5 py-14 sm:px-7 md:py-18 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A3A]">
              Opportunities
            </p>

            <h2 className="mt-3 font-serif text-3xl font-black text-[#102A43] md:text-4xl">
              Ways You Can Contribute
            </h2>

            <p className="mt-3 text-xs leading-6 text-[#718394] md:text-sm">
              Volunteer opportunities can vary according to current
              programs, projects and organisational needs.
            </p>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {opportunities.map((item) => (
              <div
                key={item.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-[#DCE5EA]
                  bg-[#F8FAFB]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#176B87]
                  hover:bg-white
                  hover:shadow-[0_15px_40px_rgba(16,42,67,0.08)]
                "
              >

                <div className="flex items-center justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#EAF5F7]
                      text-[#176B87]
                      transition
                      group-hover:bg-[#176B87]
                      group-hover:text-white
                    "
                  >
                    {item.icon}
                  </div>

                  <span className="text-[9px] font-black text-[#C59A3A]">
                    {item.number}
                  </span>

                </div>

                <h3 className="mt-6 font-serif text-xl font-black text-[#102A43]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-[#718394]">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="bg-[#102A43] px-5 py-14 sm:px-7 md:py-18 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B65A]">
                Simple Process
              </p>

              <h2 className="mt-3 font-serif text-3xl font-black text-white md:text-4xl">
                How It Works
              </h2>

              <p className="mt-4 max-w-md text-xs leading-6 text-white/50 md:text-sm">
                Start by sharing your interest. The suitable opportunity
                can then be discussed based on current requirements.
              </p>

              <a
                href="#apply"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#D4A238]
                  px-6
                  py-3
                  text-[10px]
                  font-black
                  text-white
                  transition
                  hover:bg-[#BC8C27]
                "
              >
                Start Your Journey
                <ArrowRight size={14} />
              </a>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {process.map((item) => (
                <div
                  key={item.number}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-6
                    transition
                    hover:bg-white/[0.08]
                  "
                >

                  <span className="text-[9px] font-black tracking-widest text-[#D9B65A]">
                    STEP {item.number}
                  </span>

                  <h3 className="mt-3 text-base font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-white/45">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHO CAN VOLUNTEER
      ====================================================== */}

      <section className="px-5 py-14 sm:px-7 md:py-18 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A3A]">
              Who Can Join
            </p>

            <h2 className="mt-3 font-serif text-3xl font-black text-[#102A43] md:text-4xl">
              Everyone Can Contribute
            </h2>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            {volunteerTypes.map((item) => (
              <div
                key={item.title}
                className="
                  rounded-2xl
                  border
                  border-[#DCE5EA]
                  bg-white
                  p-7
                  text-center
                  shadow-[0_8px_30px_rgba(16,42,67,0.04)]
                "
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5F7] text-[#176B87]">
                  {item.icon}
                </div>

                <h3 className="mt-5 font-serif text-xl font-black text-[#102A43]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-[#718394]">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          SKILLS
      ====================================================== */}

      <section className="border-y border-[#DCE5EA] bg-[#F8FAFB] px-5 py-14 sm:px-7 md:py-18 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A3A]">
                Your Skills Matter
              </p>

              <h2 className="mt-3 font-serif text-3xl font-black text-[#102A43] md:text-4xl">
                Share What You Know
              </h2>

              <p className="mt-4 text-xs leading-6 text-[#718394] md:text-sm">
                If you have a skill, experience or creative idea that can
                support community-focused work, let us know.
              </p>

            </div>

            <div className="flex flex-wrap gap-2">

              {skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    border
                    border-[#D8E3E8]
                    bg-white
                    px-5
                    py-3
                    text-[10px]
                    font-black
                    text-[#40566A]
                    shadow-sm
                    transition
                    hover:border-[#176B87]
                    hover:text-[#176B87]
                  "
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          APPLICATION
      ====================================================== */}

      <section
        id="apply"
        className="px-5 py-14 sm:px-7 md:py-18 lg:px-8"
      >

        <div className="mx-auto max-w-5xl">

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              bg-gradient-to-br
              from-[#102A43]
              via-[#14536A]
              to-[#176B87]
              px-6
              py-12
              text-center
              shadow-[0_20px_60px_rgba(16,42,67,0.15)]
              md:px-10
              md:py-14
            "
          >

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-2xl" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A238] text-white shadow-xl">
                <MessageSquare size={25} />
              </div>

              <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B65A]">
                Volunteer Enquiry
              </p>

              <h2 className="mt-3 font-serif text-3xl font-black text-white md:text-4xl">
                Ready to Make a Difference?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/55 md:text-sm">
                Tell us about yourself, your skills and the area where
                you would like to contribute.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">

                <a
                  href="mailto:info@ajftrust.org?subject=Volunteer%20Enquiry"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#D4A238]
                    px-6
                    text-xs
                    font-black
                    text-white
                    transition
                    hover:bg-[#BC8C27]
                  "
                >
                  <Mail size={16} />
                  Email Volunteer Enquiry
                </a>

                <a
                  href="tel:+919155751363"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/[0.08]
                    px-6
                    text-xs
                    font-black
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  <Phone size={16} />
                  Call +91 9155751363
                </a>

              </div>

              <p className="mt-5 text-[9px] font-medium text-white/30">
                info@ajftrust.org
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="border-t border-[#DCE5EA] bg-white px-5 py-14 sm:px-7 md:py-18 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A3A]">
              FAQ
            </p>

            <h2 className="mt-3 font-serif text-3xl font-black text-[#102A43] md:text-4xl">
              Frequently Asked Questions
            </h2>

          </div>

          <div className="mt-8 space-y-3">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="
                  group
                  rounded-2xl
                  border
                  border-[#DCE5EA]
                  bg-[#F8FAFB]
                  px-5
                  py-4
                "
              >

                <summary
                  className="
                    flex
                    cursor-pointer
                    list-none
                    items-center
                    justify-between
                    gap-4
                    text-xs
                    font-black
                    text-[#243B53]
                    marker:hidden
                  "
                >

                  {faq.question}

                  <ChevronDown
                    size={17}
                    className="
                      shrink-0
                      text-[#176B87]
                      transition
                      group-open:rotate-180
                    "
                  />

                </summary>

                <p className="mt-4 max-w-3xl text-[11px] leading-6 text-[#718394]">
                  {faq.answer}
                </p>

              </details>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT
      ====================================================== */}

      <section className="px-5 py-12 sm:px-7 md:py-16 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 md:grid-cols-2">

            {/* ADDRESS */}

            <div className="rounded-3xl bg-[#102A43] p-7 text-white md:p-9">

              <MapPin
                size={25}
                className="text-[#D9B65A]"
              />

              <p className="mt-5 text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B65A]">
                Registered Address
              </p>

              <h3 className="mt-2 font-serif text-2xl font-black">
                Anand Jivan Foundation Trust
              </h3>

              <p className="mt-4 text-xs leading-6 text-white/55">
                MABBI BELAUNA,
                <br />
                POST - LALSHAHPUR,
                <br />
                PANCHAYAT - SHAHBAJPUR,
                <br />
                DARBHANGA, BIHAR - 846005,
                <br />
                INDIA
              </p>

            </div>

            {/* DETAILS */}

            <div className="rounded-3xl border border-[#DCE5EA] bg-white p-7 md:p-9">

              <ShieldCheck
                size={25}
                className="text-[#176B87]"
              />

              <p className="mt-5 text-[9px] font-black uppercase tracking-[0.22em] text-[#C59A3A]">
                Organisation Details
              </p>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-[#8997A2]">
                    DARPAN ID
                  </p>
                  <p className="mt-1 text-xs font-black text-[#102A43]">
                    BR/2023/0343963
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-[#8997A2]">
                    PAN
                  </p>
                  <p className="mt-1 text-xs font-black text-[#102A43]">
                    AAJTA9323K
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#176B87]" />
                  <span className="text-xs font-bold text-[#176B87]">
                    info@ajftrust.org
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#176B87]" />
                  <span className="text-xs font-bold text-[#176B87]">
                    +91 9155751363
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      

    </main>
  );
}