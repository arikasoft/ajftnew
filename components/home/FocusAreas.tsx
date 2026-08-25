import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  HeartPulse,
  Leaf,
  Palette,
  ShieldAlert,
  UsersRound,
} from "lucide-react";

const areas = [
  {
    title: "Education",
    description:
      "Supporting learning opportunities, educational development and better futures for children and young people.",
    href: "/areas/education",
    icon: BookOpen,
    number: "01",
    color: "#1769AA",
    bg: "#EEF7FD",
  },
  {
    title: "Healthcare",
    description:
      "Promoting health awareness, preventive care and community well-being through focused initiatives.",
    href: "/areas/healthcare",
    icon: HeartPulse,
    number: "02",
    color: "#3C9A32",
    bg: "#F0F9ED",
  },
  {
    title: "Women Empowerment",
    description:
      "Encouraging confidence, skills, participation and opportunities for women and girls.",
    href: "/areas/women-empowerment",
    icon: UsersRound,
    number: "03",
    color: "#BE185D",
    bg: "#FDF0F6",
  },
  {
    title: "Skill Development",
    description:
      "Supporting practical skills and pathways that can improve individual and community opportunities.",
    href: "/areas/skill-development",
    icon: Palette,
    number: "04",
    color: "#7C3AED",
    bg: "#F5F0FF",
  },
  {
    title: "Environment",
    description:
      "Encouraging environmental awareness, responsible action and community participation.",
    href: "/areas/environment",
    icon: Leaf,
    number: "05",
    color: "#15803D",
    bg: "#EFFAF2",
  },
  {
    title: "Child Welfare",
    description:
      "Working towards safe, caring and inclusive environments that support children's well-being.",
    href: "/areas/child-welfare",
    icon: Baby,
    number: "06",
    color: "#EA580C",
    bg: "#FFF4EC",
  },
  {
    title: "Emergency Relief",
    description:
      "Supporting communities and vulnerable people during emergencies and difficult circumstances.",
    href: "/areas/emergency-relief",
    icon: ShieldAlert,
    number: "07",
    color: "#DC2626",
    bg: "#FEF1F1",
  },
];

export default function FocusAreas() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#1769AA]">
              WHAT WE DO
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              Our Focus
              <span className="text-[#1769AA]">
                {" "}Areas
              </span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#D9B54A]" />

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
              Our work focuses on areas where community participation,
              support and responsible action can contribute towards
              meaningful social development.
            </p>

          </div>

          <Link
            href="/our-work"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-slate-200 bg-[#F8FAF9] px-5 text-xs font-black text-[#073B4C] transition hover:border-[#1769AA] hover:bg-white"
          >
            Explore All Work
            <ArrowRight size={15} />
          </Link>

        </div>

        {/* ==================================================
            CARDS
        ================================================== */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {areas.map((area, index) => {
            const Icon = area.icon;

            const isLast =
              index === areas.length - 1;

            return (
              <Link
                key={area.title}
                href={area.href}
                className={`group relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isLast
                    ? "lg:col-span-2"
                    : ""
                }`}
                style={{
                  backgroundColor: area.bg,
                  borderColor: `${area.color}22`,
                }}
              >

                {/* Decorative circle */}

                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-10 transition duration-500 group-hover:scale-125"
                  style={{
                    backgroundColor: area.color,
                  }}
                />

                {/* Number */}

                <div className="flex items-start justify-between">

                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{
                      backgroundColor: area.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <span
                    className="text-[9px] font-black tracking-wider"
                    style={{
                      color: area.color,
                    }}
                  >
                    {area.number}
                  </span>

                </div>

                {/* Content */}

                <h3 className="mt-6 text-lg font-black text-[#073B4C]">
                  {area.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-500">
                  {area.description}
                </p>

                {/* Link */}

                <div
                  className="mt-5 flex items-center gap-1.5 text-[9px] font-black"
                  style={{
                    color: area.color,
                  }}
                >
                  Explore Area
                  <ArrowRight
                    size={12}
                    className="transition duration-300 group-hover:translate-x-1"
                  />
                </div>

                {/* Bottom accent */}

                <div
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: area.color,
                  }}
                />

              </Link>
            );
          })}

        </div>

        {/* ==================================================
            BOTTOM MESSAGE
        ================================================== */}

        <div className="mt-8 rounded-2xl border border-[#D7EAF8] bg-[#EEF7FD] p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1769AA] text-white">
                <HeartPulse size={18} />
              </div>

              <div>

                <p className="text-xs font-black text-[#073B4C]">
                  Every area begins with community needs.
                </p>

                <p className="mt-1 text-[9px] leading-5 text-slate-500">
                  We seek to understand local priorities and work
                  towards practical, responsible and inclusive action.
                </p>

              </div>

            </div>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#073B4C] px-4 text-[9px] font-black text-white transition hover:bg-[#052D39]"
            >
              Talk to Us
              <ArrowRight size={13} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}