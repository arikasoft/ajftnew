"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  Eye,
  FileText,
  Loader2,
  Newspaper,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  TriangleAlert,
} from "lucide-react";

type News = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  image?: string;
  status?: "published" | "draft";
  featured?: boolean;
  important?: boolean;
  author?: string;
  publishedAt?: string;
  createdAt?: string;
};

type FilterStatus = "all" | "published" | "draft";

function formatDate(date?: string) {
  if (!date) return "Not published";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "Not published";
  }
}

export default function NewsAdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("all");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadNews() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/news?status=all&limit=100",
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to load news."
        );
      }

      setNews(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load news."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  async function deleteNews(
    id: string,
    title: string
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to delete:\n\n${title}\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setMessage("");

      const response = await fetch(
        `/api/news/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to delete news."
        );
      }

      setNews((currentNews) =>
        currentNews.filter(
          (item) => item._id !== id
        )
      );

      setMessage(
        "News deleted successfully."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete news."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredNews = useMemo(() => {
    const searchTerm =
      search.trim().toLowerCase();

    return news
      .filter((item) => {
        if (
          statusFilter !== "all" &&
          item.status !== statusFilter
        ) {
          return false;
        }

        if (!searchTerm) {
          return true;
        }

        return [
          item.title,
          item.slug,
          item.category,
          item.author,
          item.excerpt,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(searchTerm)
          );
      })
      .sort((a, b) => {
        const aDate = new Date(
          a.createdAt ||
            a.publishedAt ||
            0
        ).getTime();

        const bDate = new Date(
          b.createdAt ||
            b.publishedAt ||
            0
        ).getTime();

        return bDate - aDate;
      });
  }, [
    news,
    search,
    statusFilter,
  ]);

  const totalNews = news.length;

  const publishedCount = news.filter(
    (item) => item.status === "published"
  ).length;

  const draftCount = news.filter(
    (item) => item.status === "draft"
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f8f7]">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073b4c] text-white shadow-lg">

              <Newspaper size={21} />

            </div>

            <div>

              <p className="text-base font-black text-[#073b4c]">
                News Management
              </p>

              <p className="text-[10px] text-slate-400">
                AJFT Official News Portal
              </p>

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <Link
              href="/news-admin/dashboard"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              href="/news"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <Eye size={15} />

              View Website
            </Link>

            <Link
              href="/news-admin/news/create"
              className="inline-flex items-center gap-2 rounded-xl bg-[#08744f] px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-[#08744f]/20 transition hover:bg-[#066441]"
            >
              <Plus size={16} />

              Add News
            </Link>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* TITLE */}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b68b2c]">
              Content Management
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#073b4c]">
              All News & Updates
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create, edit, publish and manage AJFT
              official announcements.
            </p>

          </div>

          <button
            type="button"
            onClick={loadNews}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>

        {/* STATS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-xs font-bold text-slate-400">
              Total News
            </p>

            <p className="mt-2 text-3xl font-black text-[#073b4c]">
              {totalNews}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold text-slate-400">
                  Published
                </p>

                <p className="mt-2 text-3xl font-black text-[#08744f]">
                  {publishedCount}
                </p>

              </div>

              <CheckCircle2
                size={22}
                className="text-[#08744f]"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold text-slate-400">
                  Drafts
                </p>

                <p className="mt-2 text-3xl font-black text-amber-600">
                  {draftCount}
                </p>

              </div>

              <FileText
                size={22}
                className="text-amber-500"
              />

            </div>

          </div>

        </section>

        {/* ALERTS */}

        {message && (

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">

            <CheckCircle2 size={18} />

            {message}

          </div>

        )}

        {error && (

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">

            <TriangleAlert size={18} />

            {error}

          </div>

        )}

        {/* FILTER */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-xl">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by title, category, author or slug..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#08744f] focus:bg-white focus:ring-4 focus:ring-[#08744f]/10"
              />

            </div>

            {/* STATUS FILTER */}

            <div className="flex flex-wrap gap-2">

              {(
                [
                  "all",
                  "published",
                  "draft",
                ] as FilterStatus[]
              ).map((status) => (

                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setStatusFilter(status)
                  }
                  className={`rounded-xl px-4 py-3 text-xs font-black capitalize transition ${
                    statusFilter === status
                      ? "bg-[#073b4c] text-white shadow-lg"
                      : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {status}
                </button>

              ))}

            </div>

          </div>

        </section>

        {/* NEWS LIST */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b68b2c]">
                  News Records
                </p>

                <h2 className="mt-1 text-xl font-black text-[#073b4c]">
                  Showing {filteredNews.length} News
                </h2>

              </div>

              <Link
                href="/news-admin/news/create"
                className="hidden items-center gap-2 text-xs font-black text-[#08744f] sm:inline-flex"
              >
                <Plus size={15} />

                Create News
              </Link>

            </div>

          </div>

          {/* LOADING */}

          {loading && (

            <div className="flex min-h-[350px] flex-col items-center justify-center gap-4">

              <Loader2
                size={34}
                className="animate-spin text-[#08744f]"
              />

              <p className="text-sm font-semibold text-slate-500">
                Loading news...
              </p>

            </div>

          )}

          {/* EMPTY */}

          {!loading &&
            filteredNews.length === 0 && (

              <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef6f2] text-[#08744f]">

                  <Newspaper size={28} />

                </div>

                <h3 className="mt-5 text-lg font-black text-[#073b4c]">
                  No News Found
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">

                  {search ||
                  statusFilter !== "all"
                    ? "No news matches your current search or filter."
                    : "You have not created any news yet."}

                </p>

                <Link
                  href="/news-admin/news/create"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08744f] px-5 py-3 text-xs font-black text-white"
                >
                  <Plus size={16} />

                  Create First News
                </Link>

              </div>

            )}

          {/* LIST */}

          {!loading &&
            filteredNews.length > 0 && (

              <div className="divide-y divide-slate-100">

                {filteredNews.map((item) => (

                  <div
                    key={item._id}
                    className="group flex flex-col gap-5 px-5 py-6 transition hover:bg-slate-50 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
                  >

                    {/* LEFT */}

                    <div className="flex min-w-0 gap-4">

                      {/* IMAGE */}

                      <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e8f0ee]">

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <Newspaper
                            size={26}
                            className="text-[#08744f]/40"
                          />

                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#b68b2c]">

                            {item.category ||
                              "General"}

                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                              item.status ===
                              "published"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {item.status ===
                            "published"
                              ? "Published"
                              : "Draft"}
                          </span>

                          {item.featured && (

                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-[9px] font-black text-[#b68b2c]">

                              <Star size={10} />

                              Featured

                            </span>

                          )}

                          {item.important && (

                            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-black text-red-600">

                              Important

                            </span>

                          )}

                        </div>

                        <h3 className="mt-2 line-clamp-2 text-base font-black text-[#073b4c]">

                          {item.title}

                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">

                          <span>
                            {formatDate(
                              item.publishedAt ||
                                item.createdAt
                            )}
                          </span>

                          <span>
                            /news/{item.slug}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex shrink-0 flex-wrap items-center gap-2">

                      {item.status ===
                        "published" && (

                        <Link
                          href={`/news/${item.slug}`}
                          target="_blank"
                          title="View Public News"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-[#08744f] hover:text-[#08744f]"
                        >
                          <Eye size={16} />
                        </Link>

                      )}

                      <Link
                        href={`/news-admin/news/${item._id}/edit`}
                        title="Edit News"
                        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-[#08744f] hover:text-[#08744f]"
                      >
                        <Edit3 size={15} />

                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          deleteNews(
                            item._id,
                            item.title
                          )
                        }
                        disabled={
                          deletingId ===
                          item._id
                        }
                        title="Delete News"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId ===
                        item._id ? (

                          <Loader2
                            size={16}
                            className="animate-spin"
                          />

                        ) : (

                          <Trash2 size={16} />

                        )}
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </section>

      </div>

    </main>
  );
}