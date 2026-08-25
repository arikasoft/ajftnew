import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Quote,
  Users,
} from "lucide-react";

const stories = [
  {
    category: "Education",
    title: "Creating Better Learning Opportunities",
    text: "Education-focused initiatives can help children and communities access better learning opportunities and build confidence for the future.",
    name: "Community Education Initiative",
    location: "Darbhanga, Bihar",
    icon: "📚",
  },
  {
    category: "Community",
    title: "Strengthening Communities Together",
    text: "Community participation helps identify local needs and supports practical initiatives designed around dignity, inclusion and shared responsibility.",
    name: "Community Development Initiative",
    location: "Bihar",
    icon: "🤝",
  },
  {
    category: "Women Empowerment",
    title: "Opportunities That Build Confidence",
    text: "Skills, awareness and participation can create pathways for women to contribute more actively to their families and communities.",
    name: "Women Empowerment Initiative",
    location: "Bihar",
    icon: "🌱",
  },
];

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      {/* =====================================================
          DECORATION
      ====================================================== */}

      <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-[#087E8B]/5 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#D6A63A]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">

          <div>

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#C09230]">
                Stories of Impact
              </p>

            </div>

            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
              People Are At The
              <span className="text-[#087E8B]">
                {" "}Heart
              </span>
              <br />
              Of Our Work
            </h2>

          </div>

          <div>

            <p className="text-xs leading-6 text-[#718394] md:text-sm">
              Behind every initiative are people, communities and
              experiences. These stories represent the spirit of
              participation, service and positive change.
            </p>

            <Link
              href="/impact/stories"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-black
                text-[#087E8B]
                transition
                hover:text-[#C09230]
              "
            >
              View All Stories
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

        {/* =================================================
            FEATURED STORY
        ================================================== */}

        <div className="mt-10 overflow-hidden rounded-[28px] bg-[#102A43]">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* VISUAL */}

            <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-[#0B3549] via-[#087E8B] to-[#16556A]">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.16),transparent_35%)]" />

              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/10" />

              <div className="absolute left-10 top-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.08] text-4xl backdrop-blur">
                🌱
              </div>

              <div className="absolute bottom-8 left-7 right-7">

                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B65A]">
                  Impact Story
                </p>

                <h3 className="mt-2 max-w-sm font-serif text-2xl font-black leading-tight text-white">
                  Small Steps Can Create Meaningful Change
                </h3>

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-7 sm:p-9 md:p-12">

              <div className="flex items-start justify-between gap-5">

                <Quote
                  size={32}
                  className="text-[#D6A63A]"
                />

                <span className="rounded-full bg-[#087E8B]/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#087E8B]">
                  Community Impact
                </span>

              </div>

              <blockquote className="mt-7 max-w-2xl font-serif text-2xl font-black leading-relaxed text-white sm:text-3xl">
                “Meaningful community work begins by listening,
                understanding local needs and working together.”
              </blockquote>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D6A63A]/10 text-[#D6A63A]">
                  <Users size={19} />
                </div>

                <div>

                  <p className="text-[11px] font-black text-white">
                    Community Initiative
                  </p>

                  <p className="mt-1 text-[9px] text-white/40">
                    Darbhanga, Bihar
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            STORY CARDS
        ================================================== */}

        <div className="mt-5 grid gap-5 lg:grid-cols-3">

          {stories.map((story) => (
            <article
              key={story.title}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-[#DCE5EA]
                bg-[#F8FAFB]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#087E8B]/30
                hover:bg-white
                hover:shadow-[0_18px_45px_rgba(16,42,67,0.08)]
              "
            >

              {/* TOP */}

              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#EAF5F7] via-[#D9EEF0] to-[#F8F1DA]">

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/60" />

                <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full border border-[#087E8B]/10" />

                <div className="relative flex h-full items-center justify-center">

                  <span className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {story.icon}
                  </span>

                </div>

                <span className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#087E8B] backdrop-blur">
                  {story.category}
                </span>

              </div>

              {/* BODY */}

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                    <Quote size={16} />
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="
                      text-[#A9B6BE]
                      transition
                      group-hover:text-[#D6A63A]
                    "
                  />

                </div>

                <h3 className="mt-5 font-serif text-xl font-black leading-tight text-[#102A43]">
                  {story.title}
                </h3>

                <p className="mt-3 text-[10px] leading-6 text-[#718394]">
                  {story.text}
                </p>

                <div className="mt-5 border-t border-[#E5EBEE] pt-4">

                  <p className="text-[10px] font-black text-[#334E68]">
                    {story.name}
                  </p>

                  <p className="mt-1 text-[9px] text-[#9AA6AE]">
                    {story.location}
                  </p>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            CTA
        ================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-5
            rounded-3xl
            border
            border-[#DCE5EA]
            bg-[#F8FAFB]
            p-6
            sm:flex-row
            sm:items-center
            sm:justify-between
            md:p-7
          "
        >

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#087E8B] text-white shadow-lg">
              <Heart
                size={20}
                fill="currentColor"
              />
            </div>

            <div>

              <h3 className="text-sm font-black text-[#102A43]">
                Your support can become part of the story.
              </h3>

              <p className="mt-1 text-[10px] text-[#8997A2]">
                Support our work or become a volunteer.
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            <Link
              href="/donate"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#D6A63A]
                px-5
                py-3
                text-[10px]
                font-black
                text-white
                transition
                hover:bg-[#BD8D28]
              "
            >
              <Heart size={13} fill="currentColor" />
              Donate
            </Link>

            <Link
              href="/volunteer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#D6E0E5]
                bg-white
                px-5
                py-3
                text-[10px]
                font-black
                text-[#087E8B]
                transition
                hover:border-[#087E8B]
              "
            >
              Volunteer
              <ArrowRight size={13} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}