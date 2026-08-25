import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  Target,
} from "lucide-react";

const highlights = [
  "Community-focused initiatives",
  "Education and social development",
  "Inclusive and responsible action",
  "Long-term community engagement",
];

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-[#F5F8F7] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            SECTION HEADING
        ================================================== */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#1769AA]">
            ABOUT AJFT
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
            Working Together for a
            <span className="text-[#1769AA]">
              {" "}Better Life
            </span>
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#D9B54A]" />

        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="relative">

            <div className="relative overflow-hidden rounded-[2rem] bg-[#073B4C] p-2 shadow-2xl">

              <div className="relative h-[340px] overflow-hidden rounded-[1.6rem] sm:h-[430px]">

                <Image
                  src="/images/home/about-ajft.jpg"
                  alt="Anand Jivan Foundation Trust community work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition duration-700 hover:scale-105"
                />

                {/* Image overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C]/80 via-transparent to-transparent" />

                {/* Image label */}

                <div className="absolute bottom-5 left-5 right-5">

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-md">

                    <Heart
                      size={13}
                      className="text-[#D9B54A]"
                      fill="currentColor"
                    />

                    <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white">
                      Faith in Action
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Decorative card */}

            <div className="absolute -bottom-5 -right-3 hidden w-48 rounded-2xl border border-white bg-white p-4 shadow-xl sm:block">

              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#3C9A32]">
                Our Approach
              </p>

              <p className="mt-1 text-xs font-black leading-5 text-[#073B4C]">
                People • Community • Impact
              </p>

            </div>

          </div>

          {/* =================================================
              TEXT
          ================================================== */}

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#3C9A32]">
              ANAND JIVAN FOUNDATION TRUST
            </p>

            <h3 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Serving communities
              <span className="block text-[#3C9A32]">
                with purpose.
              </span>
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Anand Jivan Foundation Trust works towards
              charitable and community-focused initiatives
              intended to create opportunities, strengthen
              participation and support social well-being.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Our approach places people and communities at the
              centre of our work, while encouraging responsible,
              inclusive and sustainable action.
            </p>

            {/* Highlights */}

            <div className="mt-6 grid gap-2 sm:grid-cols-2">

              {highlights.map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
                >

                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0 text-[#3C9A32]"
                  />

                  <span className="text-[10px] font-bold leading-5 text-slate-600">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            {/* =================================================
                MISSION / VISION
            ================================================== */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <div className="rounded-2xl border border-[#D7EAF8] bg-[#EEF7FD] p-4">

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1769AA] text-white">
                    <Target size={16} />
                  </div>

                  <p className="text-xs font-black text-[#073B4C]">
                    Our Mission
                  </p>

                </div>

                <p className="mt-3 text-[9px] leading-5 text-slate-500">
                  To contribute towards meaningful social
                  development through community-focused
                  charitable initiatives.
                </p>

              </div>

              <div className="rounded-2xl border border-[#D8ECD2] bg-[#F0F9ED] p-4">

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3C9A32] text-white">
                    <Eye size={16} />
                  </div>

                  <p className="text-xs font-black text-[#073B4C]">
                    Our Vision
                  </p>

                </div>

                <p className="mt-3 text-[9px] leading-5 text-slate-500">
                  A stronger, inclusive and compassionate society
                  where communities can access opportunities and
                  support.
                </p>

              </div>

            </div>

            {/* =================================================
                CTA
            ================================================== */}

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#073B4C] px-5 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#052D39]"
              >
                Learn More
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/our-work"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black text-[#073B4C] transition hover:border-[#1769AA]"
              >
                Explore Our Work
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}