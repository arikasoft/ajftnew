import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  MapPinned,
  Users,
} from "lucide-react";

const stats = [
  {
    number: "10K+",
    label: "People Reached",
    description: "Individuals and families reached through our initiatives.",
    icon: Users,
    color: "#1769AA",
  },
  {
    number: "50+",
    label: "Community Initiatives",
    description: "Activities focused on social and community development.",
    icon: HeartHandshake,
    color: "#3C9A32",
  },
  {
    number: "25+",
    label: "Projects & Activities",
    description: "Projects and activities supporting community priorities.",
    icon: Building2,
    color: "#B88918",
  },
  {
    number: "10+",
    label: "Communities",
    description: "Working with communities through focused initiatives.",
    icon: MapPinned,
    color: "#7C3AED",
  },
];

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-[#073B4C] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">

      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#1769AA]/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#3C9A32]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#D9B54A]">
              OUR IMPACT
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              Turning
              <span className="text-[#55A9E8]">
                {" "}action
              </span>
              {" "}into
              <span className="block text-[#3C9A32]">
                meaningful impact.
              </span>
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#D9B54A]" />

          </div>

          <div className="lg:pl-10">

            <p className="max-w-2xl text-sm leading-7 text-white/60">
              Our impact is reflected through the people we reach,
              the initiatives we undertake and the communities
              with whom we work.
            </p>

          </div>

        </div>

        {/* ===================================================
            STATS
        ==================================================== */}

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.10]"
              >

                {/* Decorative circle */}

                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 transition duration-500 group-hover:scale-125"
                  style={{
                    backgroundColor: stat.color,
                  }}
                />

                {/* Icon */}

                <div
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{
                    backgroundColor: stat.color,
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Number */}

                <p className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {stat.number}
                </p>

                {/* Label */}

                <p className="mt-1 text-xs font-black text-[#D9B54A]">
                  {stat.label}
                </p>

                {/* Description */}

                <p className="mt-2 text-[9px] leading-5 text-white/45">
                  {stat.description}
                </p>

                {/* Bottom line */}

                <div
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    backgroundColor: stat.color,
                  }}
                />

              </div>
            );
          })}

        </div>

        {/* ===================================================
            BOTTOM CTA
        ==================================================== */}

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9B54A] text-[#073B4C]">
              <HeartHandshake size={18} />
            </div>

            <div>

              <p className="text-xs font-black text-white">
                Every contribution can help create change.
              </p>

              <p className="mt-1 text-[9px] leading-5 text-white/45">
                Explore our impact and learn more about our
                community-focused initiatives.
              </p>

            </div>

          </div>

          <Link
            href="/impact/beneficiaries"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-[9px] font-black text-[#073B4C] transition hover:bg-[#D9B54A]"
          >
            Explore Our Impact
            <ArrowRight size={13} />
          </Link>

        </div>

      </div>
    </section>
  );
}