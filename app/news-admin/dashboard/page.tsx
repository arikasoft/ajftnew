import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Edit3,
  FileText,
  Newspaper,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

type News = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  status?: "published" | "draft";
  featured?: boolean;
  important?: boolean;
  publishedAt?: string;
  createdAt?: string;
};

async function getNews(): Promise<News[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/news?status=all&limit=100`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    return Array.isArray(result.data)
      ? result.data
      : [];
  } catch (error) {
    console.error(
      "NEWS ADMIN DASHBOARD ERROR:",
      error
    );

    return [];
  }
}

function formatDate(date?: string) {
  if (!date) {
    return "Not published";
  }

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

export default async function NewsAdminDashboard() {
  const news = await getNews();

  const published = news.filter(
    (item) => item.status === "published"
  );

  const drafts = news.filter(
    (item) => item.status === "draft"
  );

  const featured = news.filter(
    (item) => item.featured
  );

  const important = news.filter(
    (item) => item.important
  );

  const recentNews = [...news]
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
    })
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f5f8f7]">

      {/* TOP BAR */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073b4c] text-white shadow-lg">

              <Newspaper size={21} />

            </div>

            <div>

              <p className="text-sm font-black text-[#073b4c]">
                AJFT News Admin
              </p>

              <p className="text-[10px] text-slate-400">
                News Management Dashboard
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <Link
              href="/news"
              target="_blank"
              className="hidden rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
            >
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

        {/* PAGE TITLE */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b68b2c]">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#073b4c]">
              News Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage AJFT official news, announcements
              and updates.
            </p>

          </div>

          <Link
            href="/news-admin/news"
            className="inline-flex items-center gap-2 text-xs font-black text-[#08744f]"
          >
            Manage All News

            <TrendingUp size={15} />

          </Link>

        </div>

        {/* STATS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold text-slate-400">
                  Total News
                </p>

                <p className="mt-2 text-3xl font-black text-[#073b4c]">
                  {news.length}
                </p>

              </div>

              <div className="rounded-xl bg-[#e8f0ee] p-3 text-[#08744f]">
                <Newspaper size={20} />
              </div>

            </div>

          </div>

          {/* PUBLISHED */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold text-slate-400">
                  Published
                </p>

                <p className="mt-2 text-3xl font-black text-[#08744f]">
                  {published.length}
                </p>

              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

            </div>

          </div>

          {/* DRAFT */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold text-slate-400">
                  Drafts
                </p>

                <p className="mt-2 text-3xl font-black text-amber-600">
                  {drafts.length}
                </p>

              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <FileText size={20} />
              </div>

            </div>

          </div>

          {/* FEATURED */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold text-slate-400">
                  Featured
                </p>

                <p className="mt-2 text-3xl font-black text-[#b68b2c]">
                  {featured.length}
                </p>

              </div>

              <div className="rounded-xl bg-yellow-50 p-3 text-[#b68b2c]">
                <Star size={20} />
              </div>

            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">

          <div className="rounded-3xl bg-[#073b4c] p-7 text-white">

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d8b65e]">
              Quick Action
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Publish a New Update
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
              Create official announcements,
              programme updates, project news and
              important information for the public.
            </p>

            <Link
              href="/news-admin/news/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-[#073b4c] transition hover:bg-slate-100"
            >
              <Plus size={16} />

              Create News

            </Link>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b68b2c]">
              Important Updates
            </p>

            <h2 className="mt-3 text-2xl font-black text-[#073b4c]">
              {important.length} Important News
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Mark critical announcements as important
              so visitors can easily identify priority
              AJFT updates.
            </p>

            <Link
              href="/news-admin/news"
              className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#08744f]"
            >
              Manage News

              <TrendingUp size={15} />

            </Link>

          </div>

        </section>

        {/* RECENT NEWS */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b68b2c]">
                Latest Activity
              </p>

              <h2 className="mt-1 text-xl font-black text-[#073b4c]">
                Recent News
              </h2>

            </div>

            <Link
              href="/news-admin/news"
              className="text-xs font-black text-[#08744f]"
            >
              View All
            </Link>

          </div>

          {recentNews.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef6f2] text-[#08744f]">

                <Newspaper size={25} />

              </div>

              <h3 className="mt-5 font-black text-[#073b4c]">
                No News Created Yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create your first official news update.
              </p>

              <Link
                href="/news-admin/news/create"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#08744f] px-5 py-3 text-xs font-black text-white"
              >
                <Plus size={16} />

                Create First News
              </Link>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {recentNews.map((item) => (

                <div
                  key={item._id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#b68b2c]">

                        {item.category || "General"}

                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>

                      {item.featured && (

                        <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-[9px] font-black text-[#b68b2c]">

                          <Star size={10} />

                          Featured

                        </span>

                      )}

                    </div>

                    <h3 className="mt-2 truncate text-sm font-black text-[#073b4c]">

                      {item.title}

                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">

                      <Clock3 size={13} />

                      {formatDate(
                        item.createdAt ||
                          item.publishedAt
                      )}

                    </div>

                  </div>

                  <Link
                    href={`/news-admin/news/${item._id}/edit`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#08744f] hover:text-[#08744f]"
                  >
                    <Edit3 size={14} />

                    Edit

                  </Link>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}