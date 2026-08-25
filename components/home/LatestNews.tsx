import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  Newspaper,
} from "lucide-react";

const news = [
  {
    date: "Recent Update",
    category: "Organisation",
    title: "Anand Jivan Foundation Trust",
    description:
      "Updates about the Trust, its activities and community-focused initiatives.",
    href: "/news",
  },
  {
    date: "Latest",
    category: "Community",
    title: "Community Development Activities",
    description:
      "Explore updates from our ongoing community development and social welfare activities.",
    href: "/news",
  },
  {
    date: "Update",
    category: "Projects",
    title: "Our Projects & Initiatives",
    description:
      "Read about selected projects and initiatives being undertaken for communities.",
    href: "/projects",
  },
];

export default function LatestNews() {
  return (
    <section className="bg-[#F5F8FA] px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#C09230]">
                Latest Updates
              </p>

            </div>

            <h2 className="mt-4 font-serif text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
              News &
              <span className="text-[#087E8B]">
                {" "}Updates
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-[#718394] md:text-sm">
              Stay informed about Anand Jivan Foundation Trust,
              our activities, projects and community initiatives.
            </p>

          </div>

          <Link
            href="/news"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-[#D8E2E7]
              bg-white
              px-5
              py-3
              text-[10px]
              font-black
              text-[#087E8B]
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-[#087E8B]
              hover:shadow-md
            "
          >
            View All News
            <ArrowRight size={14} />
          </Link>

        </div>

        {/* =================================================
            FEATURED UPDATE
        ================================================== */}

        <div className="mt-10 overflow-hidden rounded-[28px] border border-[#DCE5EA] bg-white shadow-[0_12px_40px_rgba(16,42,67,0.05)]">

          <div className="grid lg:grid-cols-[0.7fr_1.3fr]">

            {/* VISUAL */}

            <div className="relative min-h-[250px] overflow-hidden bg-gradient-to-br from-[#0B2D40] via-[#087E8B] to-[#15536A]">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.16),transparent_35%)]" />

              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />

              <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full border border-[#D6A63A]/20" />

              <div className="relative flex h-full flex-col justify-between p-7">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                    <Newspaper size={22} />
                  </div>

                  <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-white/70">
                    Featured Update
                  </span>

                </div>

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B65A]">
                    Anand Jivan Foundation Trust
                  </p>

                  <h3 className="mt-2 max-w-md font-serif text-2xl font-black leading-tight text-white">
                    Serving Communities With Purpose
                  </h3>

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-7 md:p-9">

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-[#EAF5F7] px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#087E8B]">
                  Organisation
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-[#FBF6E9] px-3 py-1.5 text-[8px] font-bold text-[#80651F]">
                  <CalendarDays size={11} />
                  Latest Update
                </span>

              </div>

              <h3 className="mt-5 font-serif text-2xl font-black leading-tight text-[#102A43] md:text-3xl">
                Building Better Lives Through Community-Focused Action
              </h3>

              <p className="mt-4 max-w-2xl text-xs leading-6 text-[#718394] md:text-sm">
                Anand Jivan Foundation Trust works towards charitable
                and community-focused initiatives covering education,
                healthcare, women empowerment, child welfare,
                environment, skill development and community support.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/news"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#087E8B]
                    px-5
                    py-3
                    text-[10px]
                    font-black
                    text-white
                    transition
                    hover:bg-[#066C77]
                  "
                >
                  Read Updates
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/about"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#D8E2E7]
                    bg-white
                    px-5
                    py-3
                    text-[10px]
                    font-black
                    text-[#40566A]
                    transition
                    hover:border-[#087E8B]
                    hover:text-[#087E8B]
                  "
                >
                  About AJFT
                  <ArrowUpRight size={14} />
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            NEWS CARDS
        ================================================== */}

        <div className="mt-5 grid gap-5 md:grid-cols-3">

          {news.map((item, index) => (
            <article
              key={item.title}
              className="
                group
                rounded-3xl
                border
                border-[#DCE5EA]
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(16,42,67,0.035)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#087E8B]/30
                hover:shadow-[0_18px_45px_rgba(16,42,67,0.08)]
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
                    text-[#087E8B]
                    transition
                    group-hover:bg-[#087E8B]
                    group-hover:text-white
                  "
                >
                  <FileText size={20} />
                </div>

                <span className="text-[9px] font-black text-[#C09230]">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>

              <div className="mt-5 flex items-center gap-2">

                <span className="rounded-full bg-[#F1F6F8] px-2.5 py-1 text-[8px] font-black uppercase tracking-wider text-[#087E8B]">
                  {item.category}
                </span>

                <span className="text-[8px] font-semibold text-[#A0ABB2]">
                  {item.date}
                </span>

              </div>

              <h3 className="mt-4 font-serif text-xl font-black leading-tight text-[#102A43]">
                {item.title}
              </h3>

              <p className="mt-3 text-[10px] leading-6 text-[#718394]">
                {item.description}
              </p>

              <Link
                href={item.href}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-[9px]
                  font-black
                  text-[#087E8B]
                  transition
                  hover:text-[#C09230]
                "
              >
                Explore
                <ArrowUpRight size={13} />
              </Link>

            </article>
          ))}

        </div>

        {/* =================================================
            RESOURCE BAR
        ================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            rounded-3xl
            border
            border-[#DCE5EA]
            bg-white
            p-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF6E9] text-[#C09230]">
              <FileText size={19} />
            </div>

            <div>

              <h3 className="text-sm font-black text-[#102A43]">
                Looking for official reports?
              </h3>

              <p className="mt-1 text-[9px] text-[#8997A2]">
                Access reports, documents and transparency information.
              </p>

            </div>

          </div>

          <Link
            href="/reports"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D8E2E7]
              px-5
              py-3
              text-[10px]
              font-black
              text-[#087E8B]
              transition
              hover:border-[#087E8B]
              hover:bg-[#F1F7F8]
            "
          >
            View Reports
            <ArrowRight size={14} />
          </Link>

        </div>

      </div>
    </section>
  );
}