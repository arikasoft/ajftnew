"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Send,
  Star,
  AlertCircle,
  Newspaper,
} from "lucide-react";

export default function CreateNewsPage() {
  const router =
    useRouter();

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("General");

  const [image, setImage] =
    useState("");

  const [author, setAuthor] =
    useState("AJFT Team");

  const [featured, setFeatured] =
    useState(false);

  const [important, setImportant] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function generateSlug(
    value: string
  ) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(
    value: string
  ) {
    setTitle(value);

    if (!slug) {
      setSlug(
        generateSlug(value)
      );
    }
  }

  async function submitNews(
    status:
      | "draft"
      | "published"
  ) {
    setError("");
    setMessage("");

    if (!title.trim()) {
      setError(
        "Please enter news title."
      );
      return;
    }

    if (!slug.trim()) {
      setError(
        "Please enter news URL slug."
      );
      return;
    }

    if (!excerpt.trim()) {
      setError(
        "Please enter a short summary."
      );
      return;
    }

    if (!content.trim()) {
      setError(
        "Please enter news content."
      );
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/news",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials:
              "include",

            body:
              JSON.stringify({
                title,
                slug:
                  generateSlug(
                    slug
                  ),
                excerpt,
                content,
                category,
                image,
                author,
                featured,
                important,
                status,
              }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        setError(
          result.message ||
            "Unable to save news."
        );

        return;
      }

      setMessage(
        result.message ||
          "News saved successfully."
      );

      setTimeout(() => {
        router.push(
          "/news-admin/news"
        );

        router.refresh();
      }, 1200);
    } catch {
      setError(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(
    event: FormEvent<
      HTMLFormElement
    >
  ) {
    event.preventDefault();

    submitNews(
      "published"
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">

            <Link
              href="/news-admin/news"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#08744f] hover:text-[#08744f]"
            >
              <ArrowLeft size={19} />
            </Link>

            <div>

              <div className="flex items-center gap-2">

                <Newspaper
                  size={18}
                  className="text-[#08744f]"
                />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#08744f]">
                  AJFT News Portal
                </span>

              </div>

              <h1 className="mt-1 text-xl font-black text-[#073b4c] sm:text-2xl">
                Create News
              </h1>

            </div>

          </div>

          <Link
            href="/news-admin/news"
            className="hidden text-sm font-bold text-slate-500 hover:text-[#08744f] sm:block"
          >
            Manage News
          </Link>

        </div>

      </header>

      {/* CONTENT */}

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {error && (

          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <span>
              {error}
            </span>

          </div>

        )}

        {message && (

          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">

            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0"
            />

            <span>
              {message}
            </span>

          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"
        >

          {/* MAIN FORM */}

          <div className="space-y-8">

            {/* BASIC DETAILS */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6">

                <div className="flex items-center gap-2 text-[#08744f]">

                  <FileText size={18} />

                  <span className="text-xs font-black uppercase tracking-[0.14em]">
                    News Details
                  </span>

                </div>

                <h2 className="mt-3 text-xl font-black text-[#073b4c]">
                  Create Official News
                </h2>

              </div>

              <div className="space-y-5">

                {/* TITLE */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    News Title *
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(event) =>
                      handleTitleChange(
                        event.target.value
                      )
                    }
                    placeholder="Enter official news title"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#08744f] focus:ring-4 focus:ring-[#08744f]/10"
                  />

                </div>

                {/* SLUG */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    News URL Slug *
                  </label>

                  <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-[#08744f] focus-within:ring-4 focus-within:ring-[#08744f]/10">

                    <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-400">
                      /news/
                    </span>

                    <input
                      type="text"
                      value={slug}
                      onChange={(event) =>
                        setSlug(
                          generateSlug(
                            event.target.value
                          )
                        )
                      }
                      placeholder="news-url"
                      className="h-12 min-w-0 flex-1 px-4 text-sm outline-none"
                    />

                  </div>

                </div>

                {/* EXCERPT */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Short Summary *
                  </label>

                  <textarea
                    value={excerpt}
                    onChange={(event) =>
                      setExcerpt(
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Write a short summary for the news listing page..."
                    className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none transition focus:border-[#08744f] focus:ring-4 focus:ring-[#08744f]/10"
                  />

                </div>

                {/* CONTENT */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Full News Content *
                  </label>

                  <textarea
                    value={content}
                    onChange={(event) =>
                      setContent(
                        event.target.value
                      )
                    }
                    rows={16}
                    placeholder="Write complete official news content..."
                    className="w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-7 outline-none transition focus:border-[#08744f] focus:ring-4 focus:ring-[#08744f]/10"
                  />

                </div>

              </div>

            </section>

            {/* MEDIA */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-2 text-[#08744f]">

                <ImageIcon size={18} />

                <span className="text-xs font-black uppercase tracking-[0.14em]">
                  Featured Image
                </span>

              </div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(event) =>
                  setImage(
                    event.target.value
                  )
                }
                placeholder="https://example.com/news-image.jpg"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#08744f] focus:ring-4 focus:ring-[#08744f]/10"
              />

              {image && (

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">

                  {/* eslint-disable-next-line @next/next/no-img-element */}

                  <img
                    src={image}
                    alt="News preview"
                    className="h-64 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                </div>

              )}

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="space-y-6">

            {/* PUBLISH */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center gap-2 text-[#08744f]">

                <CalendarDays size={18} />

                <span className="text-xs font-black uppercase tracking-[0.14em]">
                  Publishing
                </span>

              </div>

              <div className="space-y-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#08744f] text-sm font-black text-white shadow-lg shadow-[#08744f]/20 transition hover:bg-[#066441] disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? (

                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                  ) : (

                    <Send size={18} />

                  )}

                  Publish News

                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    submitNews(
                      "draft"
                    )
                  }
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  <Save size={18} />

                  Save as Draft

                </button>

              </div>

            </section>

            {/* CATEGORY */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <label className="mb-3 block text-xs font-black uppercase tracking-[0.14em] text-[#08744f]">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-[#08744f] focus:ring-4 focus:ring-[#08744f]/10"
              >

                <option>
                  General
                </option>

                <option>
                  Announcement
                </option>

                <option>
                  Education
                </option>

                <option>
                  Health
                </option>

                <option>
                  Social Support
                </option>

                <option>
                  Community Development
                </option>

                <option>
                  Event
                </option>

                <option>
                  Achievement
                </option>

              </select>

            </section>

            {/* AUTHOR */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <label className="mb-3 block text-xs font-black uppercase tracking-[0.14em] text-[#08744f]">
                Author
              </label>

              <input
                type="text"
                value={author}
                onChange={(event) =>
                  setAuthor(
                    event.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#08744f] focus:ring-4 focus:ring-[#08744f]/10"
              />

            </section>

            {/* OPTIONS */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center gap-2 text-[#08744f]">

                <Star size={18} />

                <span className="text-xs font-black uppercase tracking-[0.14em]">
                  Visibility
                </span>

              </div>

              <div className="space-y-4">

                <label className="flex cursor-pointer items-center justify-between gap-4">

                  <div>

                    <p className="text-sm font-bold text-slate-700">
                      Featured News
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Highlight on the news page.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(event) =>
                      setFeatured(
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#08744f]"
                  />

                </label>

                <div className="border-t border-slate-100" />

                <label className="flex cursor-pointer items-center justify-between gap-4">

                  <div>

                    <p className="text-sm font-bold text-slate-700">
                      Important
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Mark this as an important announcement.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={important}
                    onChange={(event) =>
                      setImportant(
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#08744f]"
                  />

                </label>

              </div>

            </section>

          </aside>

        </form>

      </div>

    </main>
  );
}