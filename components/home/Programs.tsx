import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  HeartPulse,
  HandHeart,
  Users,
  Droplets,
  Leaf,
} from "lucide-react";

const programs = [
  {
    number: "01",
    title: "Education",
    description:
      "Supporting access to learning, educational resources and better opportunities for children and communities.",
    href: "/programs/education",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Health & Wellbeing",
    description:
      "Promoting awareness, access and community initiatives that contribute to healthier lives.",
    href: "/programs/health",
    icon: HeartPulse,
  },
  {
    number: "03",
    title: "Livelihood",
    description:
      "Creating pathways toward skills, income opportunities and greater economic independence.",
    href: "/programs/livelihood",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Community Development",
    description:
      "Working with communities to strengthen local infrastructure, participation and resilience.",
    href: "/programs/community-development",
    icon: Users,
  },
  {
    number: "05",
    title: "Water & Sanitation",
    description:
      "Supporting access to essential sanitation, hygiene and safe water infrastructure.",
    href: "/programs/water-sanitation",
    icon: Droplets,
  },
  {
    number: "06",
    title: "Environment",
    description:
      "Encouraging responsible practices and community participation for a healthier environment.",
    href: "/programs/environment",
    icon: Leaf,
  },
];

export default function Programs() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c99a2e]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c99a2e]">
                What We Do
              </span>
            </div>

            <h2 className="font-serif text-4xl font-semibold leading-tight text-[#0b3d2e] md:text-5xl">
              Creating change where
              <span className="block text-[#c99a2e]">
                it matters most.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
              Our programs are designed around community needs, with a
              focus on practical action, dignity and sustainable outcomes.
            </p>

          </div>

          <Link
            href="/programs"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0b3d2e] transition hover:text-[#c99a2e]"
          >
            Explore all programs
            <ArrowUpRight size={17} />
          </Link>

        </div>

        {/* =====================================================
            PROGRAM GRID
        ====================================================== */}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <Link
                key={program.number}
                href={program.href}
                className="group relative overflow-hidden rounded-[28px] border border-gray-100 bg-[#f8fbf9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad45]/30 hover:bg-white hover:shadow-xl md:p-8"
              >

                {/* Decorative Number */}

                <div className="absolute -right-3 -top-5 font-serif text-8xl font-bold text-[#0b3d2e]/[0.035] transition duration-300 group-hover:text-[#c99a2e]/[0.08]">
                  {program.number}
                </div>

                {/* Icon */}

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3d2e]/5 text-[#0b3d2e] transition duration-300 group-hover:bg-[#0b3d2e] group-hover:text-[#d6ad45]">
                  <Icon size={21} />
                </div>

                {/* Number */}

                <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c99a2e]">
                  Program {program.number}
                </div>

                {/* Title */}

                <h3 className="mt-2 font-serif text-2xl font-semibold text-[#0b3d2e]">
                  {program.title}
                </h3>

                {/* Description */}

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {program.description}
                </p>

                {/* Bottom */}

                <div className="mt-7 flex items-center justify-between border-t border-gray-200 pt-5">

                  <span className="text-xs font-bold text-[#0b3d2e]">
                    Explore program
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b3d2e] shadow-sm transition duration-300 group-hover:bg-[#d6ad45] group-hover:text-white">
                    <ArrowUpRight size={15} />
                  </span>

                </div>

              </Link>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div className="mt-6 overflow-hidden rounded-[28px] bg-[#0b3d2e]">

          <div className="relative flex flex-col justify-between gap-7 px-7 py-8 md:flex-row md:items-center md:px-10 md:py-9">

            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d6ad45]/10 blur-2xl" />

            <div className="relative">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d6ad45]">
                Have a community need?
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
                Let&apos;s explore how we can help.
              </h3>

            </div>

            <Link
              href="/contact"
              className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0b3d2e] transition hover:bg-[#d6ad45] hover:text-white"
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}