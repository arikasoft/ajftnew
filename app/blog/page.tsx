import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Newspaper,
} from "lucide-react";

const posts = [
  {
    title: "Together We Can Make a Difference",
    excerpt:
      "Discover how community participation, compassion and collective action can create meaningful change.",
    date: "25 August 2026",
    category: "Community",
    image: "/images/home/hero-07.jpg",
  },
  {
    title: "Education & Opportunity",
    excerpt:
      "Supporting children with education and opportunities remains an important part of our community work.",
    date: "20 August 2026",
    category: "Education",
    image: "/images/home/hero-01.jpg",
  },
  {
    title: "Building Stronger Communities",
    excerpt:
      "Working together with communities to create sustainable and inclusive development.",
    date: "15 August 2026",
    category: "Community Development",
    image: "/images/home/hero-04.jpg",
  },
  {
    title: "Women Empowerment & Skill Development",
    excerpt:
      "Creating opportunities that encourage confidence, skills and participation.",
    date: "10 August 2026",
    category: "Women Empowerment",
    image: "/images/home/hero-03.jpg",
  },
  {
    title: "Child Welfare & Care",
    excerpt:
      "Every child deserves dignity, care, education and an opportunity to build a better future.",
    date: "05 August 2026",
    category: "Child Welfare",
    image: "/images/home/hero-05.jpg",
  },
  {
    title: "Care for Our Environment",
    excerpt:
      "Small community actions can contribute towards a cleaner and healthier environment.",
    date: "01 August 2026",
    category: "Environment",
    image: "/images/home/hero-06.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0E7183]/30 blur-3xl" />

        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#D99A16]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">

              <Newspaper
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                AJFT Stories & Updates
              </span>

            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Stories of
              <span className="block text-[#F2C94C]">
                Hope & Impact
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Read about our community initiatives,
              people, activities and the meaningful
              work being carried out by Anand Jivan
              Foundation Trust.
            </p>

          </div>

        </div>

        {/* WAVE */}

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">

          <svg
            viewBox="0 0 1440 120"
            className="relative block h-[70px] w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C240,10 360,115 600,65 C850,10 1000,110 1200,55 C1320,25 1380,45 1440,20 L1440,120 L0,120 Z"
              fill="#F5F8F7"
            />
          </svg>

        </div>

      </section>

      {/* =========================================
          FEATURED
      ========================================= */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <div className="relative overflow-hidden rounded-[2rem]">

            <img
              src="/images/home/hero-07.jpg"
              alt="Together We Can"
              className="h-[360px] w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <span className="absolute bottom-5 left-5 rounded-full bg-[#D99A16] px-4 py-2 text-[9px] font-black uppercase tracking-wider text-white">
              Featured Story
            </span>

          </div>

          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
              Our Latest Story
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
              Together We Can
              <span className="block text-[#087E8B]">
                Make a Difference
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Real change becomes possible when people,
              volunteers, communities and supporters come
              together with a shared purpose. Follow our
              journey and discover the people behind our
              community-focused initiatives.
            </p>

            <div className="mt-6 flex items-center gap-4 text-[10px] font-bold text-slate-400">

              <span className="flex items-center gap-2">
                <CalendarDays size={14} />
                25 August 2026
              </span>

              <span className="rounded-full bg-[#087E8B]/10 px-3 py-1.5 text-[#087E8B]">
                Community
              </span>

            </div>

            <Link
              href="/blog/together-we-can"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-5 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
            >
              Read Story
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* =========================================
          BLOG GRID
      ========================================= */}

      <section className="border-t border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
                Latest Updates
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#102A43]">
                From Our Community
              </h2>

            </div>

            <p className="max-w-md text-xs leading-6 text-slate-400">
              Updates, stories and insights from
              Anand Jivan Foundation Trust.
            </p>

          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {posts.map((post, index) => (

              <article
                key={`${post.title}-${index}`}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="relative h-56 overflow-hidden">

                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#087E8B]">
                    {post.category}
                  </span>

                </div>

                <div className="p-6">

                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">

                    <CalendarDays size={12} />

                    {post.date}

                  </div>

                  <h3 className="mt-3 text-xl font-black leading-snug text-[#102A43] transition group-hover:text-[#087E8B]">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-500">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${index + 1}`}
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#087E8B]"
                  >
                    Read More
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================
          CTA
      ========================================= */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_50%,rgba(14,113,131,.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(217,154,22,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center sm:px-10">

          <Heart
            size={28}
            className="mx-auto text-[#F2C94C]"
            fill="currentColor"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Be Part of the Story
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Your support, time and participation can
            help us create more meaningful stories of
            hope and positive change.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
            >
              <Heart
                size={15}
                fill="currentColor"
              />
              Donate Now
            </Link>

            <Link
              href="/volunteer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Get Involved
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}