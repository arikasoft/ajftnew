import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  HeartHandshake,
  Mail,
  Phone,
  Users,
} from "lucide-react";

const benefits = [
  "Community engagement",
  "Education & awareness",
  "Event participation",
  "Skills & professional support",
];

export default function VolunteerCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0B2438] px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      {/* Background */}

      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#087E8B]/20 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#D6A63A]/10 blur-3xl" />

      <div className="absolute right-[15%] top-10 h-40 w-40 rounded-full border border-white/5" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            MAIN CTA
        ====================================================== */}

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] shadow-[0_25px_80px_rgba(0,0,0,0.18)]">

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}

            <div className="relative p-7 sm:p-10 md:p-14">

              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#087E8B]/10 blur-3xl" />

              <div className="relative">

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

                  <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#D9B65A]">
                    Get Involved
                  </p>

                </div>

                <h2 className="mt-5 max-w-2xl font-serif text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">

                  Your Time Can
                  <span className="text-[#D6A63A]">
                    {" "}Create Impact
                  </span>

                </h2>

                <p className="mt-5 max-w-2xl text-xs leading-6 text-white/50 md:text-sm">
                  Become part of a community of people who believe that
                  meaningful change begins with participation, compassion
                  and responsible action.
                </p>

                {/* BENEFITS */}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2.5"
                    >

                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-[#36B9C3]"
                      />

                      <span className="text-[10px] font-semibold text-white/60">
                        {benefit}
                      </span>

                    </div>
                  ))}

                </div>

                {/* BUTTONS */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href="/volunteer"
                    className="
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#D6A63A]
                      px-6
                      text-[10px]
                      font-black
                      text-white
                      shadow-[0_10px_30px_rgba(214,166,58,0.16)]
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#BD8D28]
                    "
                  >
                    Become a Volunteer
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/contact"
                    className="
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      px-6
                      text-[10px]
                      font-black
                      text-white
                      transition
                      hover:bg-white/10
                    "
                  >
                    Contact AJFT
                    <ArrowUpRight size={14} />
                  </Link>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#087E8B] to-[#0B4054] lg:border-l lg:border-t-0">

              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />

              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-[#D6A63A]/20" />

              <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">

                {/* ICON */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    text-white
                    backdrop-blur
                  "
                >
                  <HeartHandshake size={30} />
                </div>

                {/* MESSAGE */}

                <div className="mt-10">

                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B65A]">
                    Together We Can
                  </p>

                  <h3 className="mt-3 font-serif text-2xl font-black leading-tight text-white sm:text-3xl">
                    Serve With
                    <br />
                    Purpose.
                  </h3>

                  <p className="mt-4 text-[10px] leading-5 text-white/50">
                    Every volunteer brings something valuable:
                    time, skills, ideas, energy or compassion.
                  </p>

                </div>

                {/* CONTACT */}

                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">

                  <a
                    href="tel:+919155751363"
                    className="group flex items-center gap-3"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:bg-[#D6A63A]">
                      <Phone size={15} />
                    </span>

                    <span className="text-[10px] font-bold text-white/65 transition group-hover:text-white">
                      +91 9155751363
                    </span>

                  </a>

                  <a
                    href="mailto:info@ajftrust.org"
                    className="group flex items-center gap-3"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:bg-[#D6A63A]">
                      <Mail size={15} />
                    </span>

                    <span className="text-[10px] font-bold text-white/65 transition group-hover:text-white">
                      info@ajftrust.org
                    </span>

                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            MINI STATS
        ====================================================== */}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">

            <Users
              size={19}
              className="text-[#36B9C3]"
            />

            <div>

              <p className="text-[10px] font-black text-white">
                Community First
              </p>

              <p className="mt-1 text-[8px] text-white/30">
                People at the heart of our work
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">

            <HeartHandshake
              size={19}
              className="text-[#D6A63A]"
            />

            <div>

              <p className="text-[10px] font-black text-white">
                Serve Together
              </p>

              <p className="mt-1 text-[8px] text-white/30">
                Collaboration creates stronger impact
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">

            <CheckCircle2
              size={19}
              className="text-[#36B9C3]"
            />

            <div>

              <p className="text-[10px] font-black text-white">
                Make A Difference
              </p>

              <p className="mt-1 text-[8px] text-white/30">
                Every contribution matters
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom wave */}

      <div className="relative -mb-16 mt-12 h-10 overflow-hidden">

        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
        >
          <path
            d="M0,45 C180,10 340,12 520,45 C710,80 870,78 1060,38 C1220,4 1340,15 1440,42 L1440,80 L0,80 Z"
            fill="#F5F8FA"
          />
        </svg>

      </div>

    </section>
  );
}