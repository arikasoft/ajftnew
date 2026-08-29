import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Share2,
} from "lucide-react";

export const dynamic = "force-dynamic";

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
};

async function getNews(slug: string): Promise<News | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/news/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("GET NEWS DETAIL ERROR:", error);

    return null;
  }
}

function formatDate(date?: string) {
  if (!date) {
    return "Official AJFT Update";
  }

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "Official AJFT Update";
  }
}

function getReadingTime(content?: string) {
  if (!content) {
    return "1 min read";
  }

  const words = content
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const minutes = Math.max(
    1,
    Math.ceil(words.length / 200)
  );

  return `${minutes} min read`;
}

function renderContent(content?: string) {
  if (!content) {
    return [
      "No additional details are available for this news update.",
    ];
  }

  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  if (news.status !== "published") {
    notFound();
  }

  const publishedDate =
    news.publishedAt || news.createdAt;

  const contentParagraphs = renderContent(
    news.content
  );

  return (
    <main className="min-h-screen bg-[#f5f8f7]">

      {/* TOP ACCENT */}
      <div className="h-1 bg-[#b68b2c]" />

      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#073b4c]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-lg">

              <img
                src="/images/ajft-logo.png"
                alt="AJFT Logo"
                className="h-full w-full object-contain"
              />

            </div>

            <div>
              <p className="text-xs font-black tracking-wide text-white sm:text-sm">
                ANAND JIVAN FOUNDATION TRUST
              </p>

              <p className="mt-1 text-[9px] text-white/55">
                Official News & Updates
              </p>
            </div>
          </Link>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
          >
            <ArrowLeft size={15} />

            All News
          </Link>

        </div>

      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#073b4c]">

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#b68b2c]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-[#b68b2c] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
              {news.category || "General"}
            </span>

            {news.important && (
              <span className="rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-200">
                Important
              </span>
            )}

            {news.featured && (
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                Featured Update
              </span>
            )}

          </div>

          <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>

          {news.excerpt && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">
              {news.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5 text-xs font-medium text-white/60">

            <div className="flex items-center gap-2">
              <CalendarDays size={15} />

              {formatDate(publishedDate)}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={15} />

              {getReadingTime(news.content)}
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={15} />

              {news.author ||
                "Anand Jivan Foundation Trust"}
            </div>

          </div>

        </div>

      </section>

      {/* FEATURE IMAGE */}
      {news.image && (

        <section className="px-4 pt-8 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="aspect-[16/8] bg-slate-100">

              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover"
              />

            </div>

          </div>

        </section>

      )}

      {/* CONTENT */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_230px]">

          {/* ARTICLE */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

            <div className="space-y-6">

              {contentParagraphs.map(
                (paragraph, index) => (

                  <p
                    key={index}
                    className="text-[15px] leading-8 text-slate-600"
                  >
                    {paragraph}
                  </p>

                )
              )}

            </div>

            {/* SHARE AREA */}
            <div className="mt-10 border-t border-slate-100 pt-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5f0] text-[#08744f]">

                    <Share2 size={18} />

                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#073b4c]">
                      Share this update
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Share official AJFT information
                    </p>
                  </div>

                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#073b4c] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#0b5367]"
                >
                  <ArrowLeft size={15} />

                  Back to News
                </Link>

              </div>

            </div>

          </article>

          {/* SIDEBAR */}
          <aside className="space-y-5">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b68b2c]">
                Published By
              </p>

              <h3 className="mt-3 text-base font-black text-[#073b4c]">
                {news.author ||
                  "Anand Jivan Foundation Trust"}
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Official news, announcements and
                updates from Anand Jivan Foundation
                Trust.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#08744f]">

                <ShieldCheck size={15} />

                Official Verified Update

              </div>

            </div>

            <div className="rounded-2xl bg-[#073b4c] p-5 text-white">

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b68b2c]">
                Stay Connected
              </p>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Follow AJFT official website for
                latest programmes, projects and
                announcements.
              </p>

              <Link
                href="/news"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-xs font-black text-[#073b4c] transition hover:bg-[#f3f5f4]"
              >
                View All Updates
              </Link>

            </div>

          </aside>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#073b4c]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">

          <div>

            <p className="font-black text-white">
              Anand Jivan Foundation Trust
            </p>

            <p className="mt-1 text-xs text-white/45">
              Official News & Updates
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs text-white/45">

            <ShieldCheck size={14} />

            Darbhanga, Bihar, India

          </div>

        </div>

      </footer>

    </main>
  );
}