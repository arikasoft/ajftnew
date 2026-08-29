"use client";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Newspaper,
  Search,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Tag,
  Bell,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type News = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  image?: string;
  status?: string;
  featured?: boolean;
  important?: boolean;
  author?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

function formatDate(value?: string) {
  if (!value) {
    return "AJFT Update";
  }

  try {
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(
      new Date(value)
    );
  } catch {
    return "AJFT Update";
  }
}

function getReadingTime(
  content?: string
) {
  if (!content) {
    return "1 min read";
  }

  const wordCount =
    content
      .replace(
        /<[^>]*>/g,
        " "
      )
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  const minutes =
    Math.max(
      1,
      Math.ceil(
        wordCount / 200
      )
    );

  return `${minutes} min read`;
}

export default function NewsPage() {

  const [news, setNews] =
    useState<News[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  /* =======================================================
     LOAD NEWS
  ======================================================= */

  async function loadNews() {

    try {

      setLoading(true);

      setError("");

      const response =
        await fetch(
          "/api/news?status=published",
          {
            method: "GET",

            headers: {
              Accept:
                "application/json",
            },

            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Unable to load news."
        );
      }

      const publishedNews =
        Array.isArray(
          result.data
        )
          ? result.data
          : [];

      setNews(
        publishedNews
      );

    } catch (err) {

      console.error(
        "PUBLIC NEWS LOAD ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load news."
      );

      setNews([]);

    } finally {

      setLoading(false);

    }
  }

  useEffect(
    () => {

      loadNews();

    },
    []
  );

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories =
    useMemo(
      () => {

        return [
          "All",

          ...Array.from(
            new Set(
              news
                .map(
                  (item) =>
                    item.category ||
                    "General"
                )
                .filter(Boolean)
            )
          ),
        ];

      },
      [news]
    );

  /* =======================================================
     FILTER NEWS
  ======================================================= */

  const filteredNews =
    useMemo(
      () => {

        const query =
          search
            .trim()
            .toLowerCase();

        return news.filter(
          (item) => {

            const itemCategory =
              item.category ||
              "General";

            const matchesCategory =
              category === "All" ||
              itemCategory ===
                category;

            const matchesSearch =
              !query ||

              item.title
                .toLowerCase()
                .includes(query) ||

              (
                item.excerpt ||
                ""
              )
                .toLowerCase()
                .includes(query) ||

              (
                item.content ||
                ""
              )
                .toLowerCase()
                .includes(query) ||

              itemCategory
                .toLowerCase()
                .includes(query);

            return (
              matchesCategory &&
              matchesSearch
            );

          }
        );

      },
      [
        news,
        search,
        category,
      ]
    );

  /* =======================================================
     FEATURED NEWS
  ======================================================= */

  const featuredNews =
    news.find(
      (item) =>
        item.featured
    ) ||
    news[0];

  const showFeatured =
    category === "All" &&
    !search.trim() &&
    !!featuredNews;

  const remainingNews =
    filteredNews.filter(
      (item) =>
        !showFeatured ||
        item._id !==
          featuredNews?._id
    );

  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <main className="min-h-screen bg-[#f5f8f7]">

      {/* ===================================================
          TOP ACCENT
      ==================================================== */}

      <div className="h-1 bg-[#b68b2c]" />

      {/* ===================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-[#073b4c]">

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#b68b2c]/10 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#d8b65e]">

              <Newspaper size={14} />

              Official Updates

            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">

              News & Updates

            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">

              Latest news, programmes,
              announcements and official
              updates from Anand Jivan
              Foundation Trust.

            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-white/55">

              <div className="flex items-center gap-2">

                <ShieldCheck size={15} />

                Official AJFT Information

              </div>

              <div className="h-1 w-1 rounded-full bg-[#b68b2c]" />

              <div>

                {loading
                  ? "Loading Updates..."
                  : `${news.length} Published Update${
                      news.length === 1
                        ? ""
                        : "s"
                    }`}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          SEARCH + CATEGORY
      ==================================================== */}

      {!loading &&
        news.length > 0 && (

        <section className="border-b border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex gap-2 overflow-x-auto pb-1">

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
                        className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                          active
                            ? "bg-[#073b4c] text-white shadow-sm"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >

                        {item}

                      </button>

                    );

                  }
                )}

              </div>

              <div className="relative w-full lg:max-w-sm">

                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search news..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#08744f] focus:bg-white focus:ring-4 focus:ring-[#08744f]/10"
                />

              </div>

            </div>

          </div>

        </section>

      )}

      {/* ===================================================
          CONTENT
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* LOADING */}

        {loading && (

          <div className="flex min-h-[360px] flex-col items-center justify-center text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#08744f]">

              <Loader2
                size={28}
                className="animate-spin"
              />

            </div>

            <h2 className="mt-5 text-xl font-black text-[#073b4c]">

              Loading News

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              Please wait while official
              updates are loaded.

            </p>

          </div>

        )}

        {/* ERROR */}

        {!loading &&
          error && (

          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">

              <AlertCircle
                size={26}
              />

            </div>

            <h2 className="mt-5 text-lg font-black text-[#073b4c]">

              Unable to Load News

            </h2>

            <p className="mt-2 text-sm text-red-600">

              {error}

            </p>

            <button
              type="button"
              onClick={loadNews}
              className="mt-6 rounded-xl bg-[#073b4c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0a5066]"
            >

              Try Again

            </button>

          </div>

        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          news.length === 0 && (

          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-center shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#08744f]">

              <Newspaper
                size={30}
              />

            </div>

            <h2 className="mt-6 text-2xl font-black text-[#073b4c]">

              No News Available

            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">

              Official news and updates
              published by Anand Jivan
              Foundation Trust will appear
              here.

            </p>

          </div>

        )}

        {/* =================================================
            FEATURED NEWS
        ================================================== */}

        {!loading &&
          !error &&
          showFeatured &&
          featuredNews && (

          <div>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff5e5] text-[#b68b2c]">

                <Bell
                  size={19}
                />

              </div>

              <div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b68b2c]">

                  Featured

                </p>

                <h2 className="mt-1 text-2xl font-black text-[#073b4c]">

                  Featured Update

                </h2>

              </div>

            </div>

            <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">

              <div className="grid lg:grid-cols-2">

                {/* IMAGE */}

                <div className="relative min-h-[300px] overflow-hidden bg-slate-100 lg:min-h-[430px]">

                  {featuredNews.image ? (

                    <img
                      src={
                        featuredNews.image
                      }
                      alt={
                        featuredNews.title
                      }
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                  ) : (

                    <div className="flex h-full min-h-[300px] items-center justify-center bg-[#eaf3ef] text-[#08744f]">

                      <Newspaper
                        size={55}
                      />

                    </div>

                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#073b4c]/60 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-[#b68b2c] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white">

                      Featured

                    </span>

                    {featuredNews.important && (

                      <span className="rounded-full bg-red-500 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white">

                        Important

                      </span>

                    )}

                  </div>

                </div>

                {/* CONTENT */}

                <div className="flex flex-col justify-center p-7 sm:p-10">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#08744f]">

                      <Tag size={11} />

                      {featuredNews.category ||
                        "General"}

                    </span>

                  </div>

                  <h3 className="mt-5 text-2xl font-black leading-tight text-[#073b4c] sm:text-3xl">

                    {featuredNews.title}

                  </h3>

                  <p className="mt-5 text-sm leading-7 text-slate-500">

                    {featuredNews.excerpt ||
                      "Read the latest official update from Anand Jivan Foundation Trust."}

                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-400">

                    <span className="flex items-center gap-2">

                      <CalendarDays
                        size={15}
                      />

                      {formatDate(
                        featuredNews.publishedAt ||
                          featuredNews.createdAt
                      )}

                    </span>

                    <span className="flex items-center gap-2">

                      <Clock3
                        size={15}
                      />

                      {getReadingTime(
                        featuredNews.content
                      )}

                    </span>

                  </div>

                  <Link
                    href={`/news/${featuredNews.slug}`}
                    className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-[#073b4c] px-6 text-sm font-black text-white transition hover:bg-[#0a5066]"
                  >

                    Read Full Update

                    <ArrowRight
                      size={17}
                    />

                  </Link>

                </div>

              </div>

            </article>

          </div>

        )}

        {/* =================================================
            NEWS LIST
        ================================================== */}

        {!loading &&
          !error &&
          remainingNews.length > 0 && (

          <div className={showFeatured ? "mt-12" : ""}>

            {showFeatured && (

              <div className="mb-6">

                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b68b2c]">

                  Latest Updates

                </p>

                <h2 className="mt-2 text-2xl font-black text-[#073b4c]">

                  More News

                </h2>

              </div>

            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {remainingNews.map(
                (item) => (

                  <article
                    key={item._id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    <div className="relative h-52 overflow-hidden bg-slate-100">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center bg-[#eaf3ef] text-[#08744f]">

                          <Newspaper
                            size={42}
                          />

                        </div>

                      )}

                      <div className="absolute left-4 top-4 flex gap-2">

                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-[#08744f] shadow-sm">

                          {item.category ||
                            "General"}

                        </span>

                        {item.important && (

                          <span className="rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black text-white shadow-sm">

                            Important

                          </span>

                        )}

                      </div>

                    </div>

                    <div className="p-6">

                      <h3 className="text-lg font-black leading-6 text-[#073b4c]">

                        {item.title}

                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">

                        {item.excerpt ||
                          "Read the official update from Anand Jivan Foundation Trust."}

                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3 text-xs font-semibold text-slate-400">

                        <span className="flex items-center gap-1.5">

                          <CalendarDays
                            size={14}
                          />

                          {formatDate(
                            item.publishedAt ||
                              item.createdAt
                          )}

                        </span>

                        <span>

                          {getReadingTime(
                            item.content
                          )}

                        </span>

                      </div>

                      <Link
                        href={`/news/${item.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#08744f] transition hover:text-[#073b4c]"
                      >

                        Read More

                        <ArrowRight
                          size={15}
                        />

                      </Link>

                    </div>

                  </article>

                )
              )}

            </div>

          </div>

        )}

        {/* =================================================
            FILTER EMPTY
        ================================================== */}

        {!loading &&
          !error &&
          news.length > 0 &&
          filteredNews.length === 0 && (

          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-center">

            <Search
              size={35}
              className="text-slate-300"
            />

            <h2 className="mt-5 text-xl font-black text-[#073b4c]">

              No Matching News Found

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              Try another keyword or category.

            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-[#073b4c] px-5 py-3 text-sm font-bold text-white"
            >

              Clear Filters

            </button>

          </div>

        )}

      </section>

    </main>

  );
}