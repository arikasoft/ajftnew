"use client";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";

import { useMemo, useState } from "react";

type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  important?: boolean;
};

const newsItems: NewsItem[] = [
  {
    id: "1",
    slug: "ajft-school-adoption-program",
    title:
      "AJFT School Adoption & Education Support Programme",
    excerpt:
      "Anand Jivan Foundation Trust continues its commitment towards education, school infrastructure and student welfare initiatives.",
    category: "Education",
    date: "12 May 2026",
    readTime: "4 min read",
    image:
      "/images/news/school-adoption.jpg",
    featured: true,
  },

  {
    id: "2",
    slug: "community-development-initiative",
    title:
      "Community Development & Social Welfare Initiative",
    excerpt:
      "Community-focused activities aimed at improving access to basic facilities and supporting vulnerable communities.",
    category: "Community",
    date: "05 May 2026",
    readTime: "3 min read",
    image:
      "/images/news/community.jpg",
  },

  {
    id: "3",
    slug: "health-awareness-program",
    title:
      "Health Awareness & Public Welfare Activities",
    excerpt:
      "AJFT promotes awareness and community participation through health and welfare programmes.",
    category: "Health",
    date: "28 April 2026",
    readTime: "3 min read",
    image:
      "/images/news/health.jpg",
  },

  {
    id: "4",
    slug: "donation-support-program",
    title:
      "Donation Support for Charitable Activities",
    excerpt:
      "Donor contributions help support the Trust's charitable, educational and social welfare programmes.",
    category: "Donation",
    date: "18 April 2026",
    readTime: "2 min read",
    image:
      "/images/news/donation.jpg",
  },

  {
    id: "5",
    slug: "ngo-development-update",
    title:
      "Organisational Development & NGO Activities",
    excerpt:
      "Updates regarding organisational development, partnerships and ongoing charitable activities.",
    category: "Organisation",
    date: "08 April 2026",
    readTime: "4 min read",
    image:
      "/images/news/organisation.jpg",
  },

  {
    id: "6",
    slug: "important-notice",
    title:
      "Important Notice for Donors & Supporters",
    excerpt:
      "Important information and updates for donors, beneficiaries, volunteers and supporters of AJFT.",
    category: "Notice",
    date: "01 April 2026",
    readTime: "2 min read",
    image:
      "/images/news/notice.jpg",
    important: true,
  },
];

const categories = [
  "All",
  "Education",
  "Community",
  "Health",
  "Donation",
  "Organisation",
  "Notice",
];

export default function NewsPage() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const filteredNews =
    useMemo(() => {
      const query =
        search
          .toLowerCase()
          .trim();

      return newsItems.filter(
        (item) => {
          const matchesCategory =
            category === "All" ||
            item.category ===
              category;

          const matchesSearch =
            !query ||
            item.title
              .toLowerCase()
              .includes(query) ||
            item.excerpt
              .toLowerCase()
              .includes(query) ||
            item.category
              .toLowerCase()
              .includes(query);

          return (
            matchesCategory &&
            matchesSearch
          );
        }
      );
    }, [search, category]);

  const featured =
    newsItems.find(
      (item) =>
        item.featured
    ) || newsItems[0];

  const latest =
    newsItems.filter(
      (item) =>
        item.id !==
        featured.id
    );

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#073B4C]">

      {/* =====================================================
          TOP LINE
      ====================================================== */}

      <div className="h-1 bg-[#B68B2C]" />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-white/10 bg-[#073B4C]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-md sm:h-11 sm:w-11">

              <img
                src="/images/ajft-logo.png"
                alt="Anand Jivan Foundation Trust"
                className="h-full w-full object-contain"
              />

            </div>

            <div>

              <p className="text-[10px] font-black tracking-wide text-white sm:text-sm">
                ANAND JIVAN FOUNDATION TRUST
              </p>

              <p className="mt-0.5 text-[7px] text-white/55 sm:text-[8px]">
                News &amp; Updates
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[7px] font-bold text-white/70 sm:flex">

            <ShieldCheck
              size={12}
            />

            TRUST UPDATES

          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#B68B2C]/10 blur-3xl" />

        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-11 sm:px-6 sm:py-14 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#B68B2C]/40 bg-[#B68B2C]/10 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#E7C76A] sm:text-[8px]">

              <Sparkles
                size={12}
              />

              Latest Updates

            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">

              News &amp;

              <span className="text-[#D6B454]">
                {" "}Updates
              </span>

            </h1>

            <p className="mt-4 max-w-2xl text-[10px] leading-6 text-white/65 sm:text-xs">

              Stay informed about Anand Jivan
              Foundation Trust's programmes,
              initiatives, announcements and
              community activities.

            </p>

          </div>

          {/* HERO STATS */}

          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">

            <HeroStat
              icon={
                <FileText
                  size={15}
                />
              }
              value={
                String(
                  newsItems.length
                )
              }
              label="Updates"
            />

            <HeroStat
              icon={
                <Bell
                  size={15}
                />
              }
              value="Latest"
              label="News"
            />

            <HeroStat
              icon={
                <CalendarDays
                  size={15}
                />
              }
              value="2026"
              label="Updates"
            />

            <HeroStat
              icon={
                <ShieldCheck
                  size={15}
                />
              }
              value="AJFT"
              label="Source"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <section className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#B68B2C]">
                Information Centre
              </p>

              <h2 className="mt-1 text-lg font-black text-[#073B4C]">
                Latest News
              </h2>

            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-sm">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search news..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFCFB] pl-10 pr-4 text-[9px] font-semibold outline-none transition focus:border-[#B68B2C]"
              />

            </div>

          </div>

          {/* CATEGORY */}

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">

            {categories.map(
              (item) => {
                const active =
                  category ===
                  item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setCategory(
                        item
                      )
                    }
                    className="shrink-0 rounded-full px-4 py-2 text-[7px] font-black transition"
                    style={{
                      backgroundColor:
                        active
                          ? "#073B4C"
                          : "#F3F6F5",

                      color:
                        active
                          ? "#FFFFFF"
                          : "#58706B",
                    }}
                  >
                    {item}
                  </button>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURED NEWS
      ====================================================== */}

      {category === "All" &&
        !search && (
          <section className="px-4 pb-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

              <div className="mb-4 flex items-center justify-between">

                <div>

                  <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#B68B2C]">
                    Featured
                  </p>

                  <h2 className="mt-1 text-lg font-black text-[#073B4C]">
                    Featured Update
                  </h2>

                </div>

              </div>

              <FeaturedNews
                item={featured}
              />

            </div>

          </section>
        )}

      {/* =====================================================
          NEWS GRID
      ====================================================== */}

      <section className="px-4 pb-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-5 flex items-end justify-between">

            <div>

              <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#B68B2C]">
                {category ===
                "All"
                  ? "Recent"
                  : category}
              </p>

              <h2 className="mt-1 text-lg font-black text-[#073B4C]">
                News &amp; Announcements
              </h2>

            </div>

            <span className="text-[7px] font-bold text-gray-400">
              {filteredNews.length}{" "}
              updates
            </span>

          </div>

          {filteredNews.length ===
          0 ? (
            <EmptyNews />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredNews.map(
                (item) => (
                  <NewsCard
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                  />
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          SUBSCRIBE / NOTICE
      ====================================================== */}

      <section className="px-4 pb-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-2xl bg-[#073B4C]">

            <div className="flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B68B2C] text-white">

                  <Bell
                    size={18}
                  />

                </div>

                <div>

                  <h3 className="text-sm font-black text-white">
                    Stay Connected
                  </h3>

                  <p className="mt-1 max-w-xl text-[8px] leading-5 text-white/55">
                    Follow AJFT for important
                    programme announcements,
                    charitable activities and
                    community updates.
                  </p>

                </div>

              </div>

              <a
                href="/contact"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[8px] font-black text-[#073B4C] transition hover:bg-[#F7F2DF]"
              >

                Contact Trust

                <ArrowRight
                  size={13}
                />

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-[#DCE5E2] bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-7 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-1">

              <img
                src="/images/ajft-logo.png"
                alt="AJFT"
                className="h-full w-full object-contain"
              />

            </div>

            <div>

              <p className="text-[8px] font-black text-[#073B4C]">
                Anand Jivan Foundation Trust
              </p>

              <p className="text-[7px] text-gray-400">
                Darbhanga, Bihar
              </p>

            </div>

          </div>

          <div className="flex items-center gap-1.5 text-[7px] text-gray-400">

            <ShieldCheck
              size={11}
            />

            Official News &amp; Updates

          </div>

        </div>

      </footer>

    </main>
  );
}

// ============================================================
// HERO STAT
// ============================================================

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">

      <div className="flex items-center gap-2 text-[#D6B454]">

        {icon}

        <span className="text-sm font-black text-white">
          {value}
        </span>

      </div>

      <p className="mt-1 text-[6px] uppercase tracking-widest text-white/40">
        {label}
      </p>

    </div>
  );
}

// ============================================================
// FEATURED
// ============================================================

function FeaturedNews({
  item,
}: {
  item: NewsItem;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl">

      <div className="grid md:grid-cols-2">

        {/* IMAGE */}

        <div className="relative min-h-[240px] overflow-hidden bg-[#DDE7E4] md:min-h-[330px]">

          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display =
                "none";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C]/70 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-[#B68B2C] px-3 py-1.5 text-[6px] font-black uppercase tracking-widest text-white">

            Featured

          </div>

        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center p-6 sm:p-8">

          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-[#EFF7F3] px-2.5 py-1 text-[6px] font-black uppercase tracking-wider text-[#08744F]">
              {item.category}
            </span>

            {item.important && (
              <span className="rounded-full bg-[#FFF5E5] px-2.5 py-1 text-[6px] font-black uppercase tracking-wider text-[#9A6919]">
                Important
              </span>
            )}

          </div>

          <h3 className="mt-4 text-xl font-black leading-7 text-[#073B4C] sm:text-2xl">

            {item.title}

          </h3>

          <p className="mt-3 text-[9px] leading-6 text-gray-500">

            {item.excerpt}

          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-[7px] font-semibold text-gray-400">

            <span className="flex items-center gap-1.5">

              <CalendarDays
                size={12}
              />

              {item.date}

            </span>

            <span className="flex items-center gap-1.5">

              <Clock3
                size={12}
              />

              {item.readTime}

            </span>

          </div>

          <a
            href={`/news/${item.slug}`}
            className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-[#073B4C] px-5 text-[8px] font-black text-white transition hover:bg-[#0A5066]"
          >

            Read Full Update

            <ArrowRight
              size={13}
            />

          </a>

        </div>

      </div>

    </article>
  );
}

// ============================================================
// NEWS CARD
// ============================================================

function NewsCard({
  item,
}: {
  item: NewsItem;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}

      <div className="relative h-48 overflow-hidden bg-[#DDE7E4]">

        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display =
              "none";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C]/65 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">

          <span className="rounded-full bg-white/95 px-2.5 py-1.5 text-[6px] font-black uppercase tracking-wider text-[#073B4C]">

            {item.category}

          </span>

          {item.important && (
            <span className="rounded-full bg-[#B68B2C] px-2.5 py-1.5 text-[6px] font-black uppercase tracking-wider text-white">
              Important
            </span>
          )}

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-center gap-3 text-[7px] font-semibold text-gray-400">

          <span className="flex items-center gap-1">

            <CalendarDays
              size={11}
            />

            {item.date}

          </span>

          <span className="flex items-center gap-1">

            <Clock3
              size={11}
            />

            {item.readTime}

          </span>

        </div>

        <h3 className="mt-3 line-clamp-2 text-sm font-black leading-5 text-[#073B4C]">

          {item.title}

        </h3>

        <p className="mt-2 line-clamp-3 text-[8px] leading-5 text-gray-500">

          {item.excerpt}

        </p>

        <a
          href={`/news/${item.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-[8px] font-black text-[#08744F] transition hover:text-[#B68B2C]"
        >

          Read More

          <ChevronRight
            size={13}
          />

        </a>

      </div>

    </article>
  );
}

// ============================================================
// EMPTY
// ============================================================

function EmptyNews() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

      <Search
        size={30}
        className="mx-auto text-gray-300"
      />

      <h3 className="mt-4 text-sm font-black text-[#073B4C]">
        No News Found
      </h3>

      <p className="mt-1 text-[8px] text-gray-400">
        Try another keyword or category.
      </p>

    </div>
  );
}