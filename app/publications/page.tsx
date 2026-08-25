import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  Heart,
  Search,
  ShieldCheck,
} from "lucide-react";

const publications = [
  {
    title: "Annual Report 2025–26",
    description:
      "A consolidated overview of our activities, programmes, community initiatives and organisational progress during the year.",
    category: "Annual Report",
    year: "2025–26",
    type: "PDF",
    size: "2.8 MB",
    featured: true,
  },
  {
    title: "Annual Report 2024–25",
    description:
      "Yearly highlights, activities and important developments of Anand Jivan Foundation Trust.",
    category: "Annual Report",
    year: "2024–25",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    title: "Community Impact Report",
    description:
      "A summary of community-focused initiatives and the impact created through our programmes.",
    category: "Impact Report",
    year: "2025–26",
    type: "PDF",
    size: "1.9 MB",
  },
  {
    title: "Education & Child Welfare Report",
    description:
      "Highlights from education, child welfare and opportunity-focused initiatives.",
    category: "Programme Report",
    year: "2025–26",
    type: "PDF",
    size: "1.6 MB",
  },
  {
    title: "Women Empowerment & Skill Development",
    description:
      "Programme highlights covering skill development, participation and community empowerment.",
    category: "Programme Report",
    year: "2025–26",
    type: "PDF",
    size: "1.4 MB",
  },
  {
    title: "Community Development Newsletter",
    description:
      "Stories, updates and highlights from our community activities and initiatives.",
    category: "Newsletter",
    year: "2026",
    type: "PDF",
    size: "1.1 MB",
  },
];

const categories = [
  {
    title: "Annual Reports",
    count: "02",
    icon: FileText,
  },
  {
    title: "Impact Reports",
    count: "01",
    icon: ShieldCheck,
  },
  {
    title: "Programme Reports",
    count: "02",
    icon: BookOpen,
  },
  {
    title: "Newsletters",
    count: "01",
    icon: Search,
  },
];

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0E7183]/30 blur-3xl" />

        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#D99A16]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">

              <BookOpen
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                AJFT Publications
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Reports,
              <span className="block text-[#F2C94C]">
                Publications & Resources
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Explore reports, publications and documents
              that provide information about our work,
              programmes, activities and community impact.
            </p>

          </div>

        </div>

        {/* WAVE */}

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">

          <svg
            viewBox="0 0 1440 120"
            className="block h-[70px] w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,85 C220,20 360,115 600,65 C850,10 1000,110 1200,55 C1320,25 1380,45 1440,20 L1440,120 L0,120 Z"
              fill="#F5F8F7"
            />
          </svg>

        </div>

      </section>

      {/* =====================================================
          CATEGORY CARDS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-8">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map(
            (category, index) => {

              const Icon = category.icon;

              return (
                <div
                  key={`${category.title}-${index}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B] transition group-hover:bg-[#087E8B] group-hover:text-white">

                      <Icon size={20} />

                    </div>

                    <span className="text-2xl font-black text-[#D99A16]">
                      {category.count}
                    </span>

                  </div>

                  <h3 className="mt-5 text-sm font-black text-[#102A43]">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Available publications
                  </p>

                </div>
              );
            }
          )}

        </div>

      </section>

      {/* =====================================================
          FEATURED PUBLICATION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm">

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#087E8B]/5 blur-3xl" />

          <div className="relative grid gap-8 p-7 md:grid-cols-[220px_1fr] md:items-center md:p-10">

            {/* DOCUMENT COVER */}

            <div className="mx-auto w-full max-w-[200px]">

              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#073B4C] p-5 shadow-2xl">

                <div className="flex h-full flex-col justify-between border border-white/15 p-5">

                  <div>

                    <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                      ANAND JIVAN
                    </p>

                    <p className="mt-1 text-[7px] font-black uppercase tracking-[0.25em] text-white/60">
                      FOUNDATION TRUST
                    </p>

                  </div>

                  <div>

                    <FileText
                      size={32}
                      className="text-white"
                    />

                    <h3 className="mt-5 text-xl font-black leading-tight text-white">
                      Annual
                      <span className="block text-[#F2C94C]">
                        Report
                      </span>
                    </h3>

                    <p className="mt-3 text-xs font-bold text-white/60">
                      2025–26
                    </p>

                  </div>

                  <div className="h-1 w-12 rounded-full bg-[#D99A16]" />

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div>

              <span className="inline-flex rounded-full bg-[#087E8B]/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#087E8B]">
                Featured Publication
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
                Annual Report
                <span className="text-[#087E8B]">
                  {" "}2025–26
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                Our annual report provides a consolidated
                view of organisational activities, programmes,
                community initiatives and important
                developments during the reporting period.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-[9px] font-bold text-slate-400">

                <span className="flex items-center gap-2">
                  <CalendarDays size={13} />
                  2025–26
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5">
                  PDF
                </span>

                <span>
                  2.8 MB
                </span>

              </div>

              <div className="mt-7 flex flex-wrap gap-3">

                <a
                  href="/publications/annual-report-2025-26.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-5 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
                >
                  <Download size={15} />
                  Download Report
                </a>

                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black text-[#087E8B] transition hover:border-[#087E8B]"
                >
                  Request Information
                  <ArrowRight size={14} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PUBLICATION LIST
      ====================================================== */}

      <section className="border-t border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="mb-10">

            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
              Document Library
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
              Our Publications
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Access reports and publications related to
              our programmes, activities and impact.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {publications.map(
              (publication, index) => (

                <article
                  key={`${publication.title}-${index}`}
                  className={`group rounded-2xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    publication.featured
                      ? "border-[#087E8B]/30"
                      : "border-slate-200"
                  }`}
                >

                  <div className="flex gap-5">

                    <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-xl bg-[#073B4C] shadow-sm">

                      <FileText
                        size={24}
                        className="text-[#F2C94C]"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-[#087E8B]/10 px-2.5 py-1 text-[7px] font-black uppercase tracking-wider text-[#087E8B]">
                          {publication.category}
                        </span>

                        {publication.featured && (
                          <span className="rounded-full bg-[#D99A16]/10 px-2.5 py-1 text-[7px] font-black uppercase tracking-wider text-[#B17B00]">
                            Featured
                          </span>
                        )}

                      </div>

                      <h3 className="mt-3 text-lg font-black leading-snug text-[#102A43] transition group-hover:text-[#087E8B]">
                        {publication.title}
                      </h3>

                      <p className="mt-2 text-[10px] leading-5 text-slate-500">
                        {publication.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-[8px] font-bold text-slate-400">

                        <span>
                          {publication.year}
                        </span>

                        <span>
                          {publication.type}
                        </span>

                        <span>
                          {publication.size}
                        </span>

                      </div>

                      <a
                        href={`/publications/${publication.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")}.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-[#087E8B]"
                      >
                        <Download size={13} />
                        Download PDF
                        <ArrowRight size={12} />
                      </a>

                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          TRANSPARENCY CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,113,131,.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(217,154,22,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">

          <ShieldCheck
            size={30}
            className="mx-auto text-[#F2C94C]"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Transparency & Accountability
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            We believe responsible reporting and
            transparent information help build trust
            with our communities, supporters and partners.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/transparency"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
            >
              Transparency
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/reports"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              View Reports
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUPPORT CTA
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:px-10">

          <Heart
            size={26}
            className="mx-auto text-[#D99A16]"
            fill="currentColor"
          />

          <h2 className="mt-4 text-2xl font-black text-[#102A43]">
            Want to Support Our Work?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-500">
            Your support helps us continue community-focused
            programmes and initiatives.
          </p>

          <Link
            href="/donate"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
          >
            <Heart
              size={14}
              fill="currentColor"
            />
            Donate Now
          </Link>

        </div>

      </section>

    </main>
  );
}