"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Images,
  MapPin,
  X,
} from "lucide-react";

type GalleryItem = {
  image: string;
  title: string;
  category: string;
  location: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    image: "/images/gallery/gallery-01.jpg",
    title: "Community Development",
    category: "Community",
    location: "Darbhanga, Bihar",
    description:
      "Community-focused activities bringing people together for meaningful development.",
  },
  {
    image: "/images/gallery/gallery-02.jpg",
    title: "Education Support",
    category: "Education",
    location: "Darbhanga, Bihar",
    description:
      "Supporting children and communities through education and learning opportunities.",
  },
  {
    image: "/images/gallery/gallery-03.jpg",
    title: "Women Empowerment",
    category: "Women",
    location: "Bihar",
    description:
      "Encouraging confidence, skills and participation through community initiatives.",
  },
  {
    image: "/images/gallery/gallery-04.jpg",
    title: "Child Welfare",
    category: "Children",
    location: "Bihar",
    description:
      "Activities focused on care, dignity, education and opportunities for children.",
  },
  {
    image: "/images/gallery/gallery-05.jpg",
    title: "Health Awareness",
    category: "Health",
    location: "Bihar",
    description:
      "Community awareness activities promoting health and well-being.",
  },
  {
    image: "/images/gallery/gallery-06.jpg",
    title: "Environment Initiative",
    category: "Environment",
    location: "Bihar",
    description:
      "Working together for a cleaner, greener and healthier environment.",
  },
  {
    image: "/images/gallery/gallery-07.jpg",
    title: "Volunteer Activities",
    category: "Volunteer",
    location: "Darbhanga, Bihar",
    description:
      "Volunteers contributing their time, skills and energy to community work.",
  },
  {
    image: "/images/gallery/gallery-08.jpg",
    title: "Community Awareness",
    category: "Community",
    location: "Bihar",
    description:
      "Awareness and participation programmes created with local communities.",
  },
  {
    image: "/images/gallery/gallery-09.jpg",
    title: "Skill Development",
    category: "Skills",
    location: "Bihar",
    description:
      "Helping people build practical skills and explore new opportunities.",
  },
  {
    image: "/images/gallery/gallery-10.jpg",
    title: "Social Welfare",
    category: "Welfare",
    location: "Bihar",
    description:
      "Serving people and communities through compassionate social initiatives.",
  },
  {
    image: "/images/gallery/gallery-11.jpg",
    title: "Together We Can",
    category: "Community",
    location: "Bihar",
    description:
      "People coming together to create positive and meaningful community impact.",
  },
  {
    image: "/images/gallery/gallery-12.jpg",
    title: "Our Impact",
    category: "Impact",
    location: "Bihar",
    description:
      "Moments from our journey of community service and social development.",
  },
];

const categories = [
  "All",
  "Community",
  "Education",
  "Women",
  "Children",
  "Health",
  "Environment",
  "Volunteer",
  "Skills",
  "Welfare",
  "Impact",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeCategory
        );

  const selectedItem =
    selectedIndex !== null
      ? filteredItems[selectedIndex]
      : null;

  const previousImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? filteredItems.length - 1
        : selectedIndex - 1
    );
  };

  const nextImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex ===
        filteredItems.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

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

              <Camera
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                AJFT Gallery
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Moments of
              <span className="block text-[#F2C94C]">
                Hope & Impact
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Explore moments from our community activities,
              programmes, volunteers and initiatives through
              photographs and stories.
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
          INTRO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <Images
              size={23}
              className="text-[#087E8B]"
            />

            <p className="mt-4 text-3xl font-black text-[#102A43]">
              {galleryItems.length}+
            </p>

            <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
              Gallery Moments
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <Camera
              size={23}
              className="text-[#D99A16]"
            />

            <p className="mt-4 text-3xl font-black text-[#102A43]">
              10+
            </p>

            <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
              Community Activities
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <Heart
              size={23}
              className="text-[#087E8B]"
              fill="currentColor"
            />

            <p className="mt-4 text-3xl font-black text-[#102A43]">
              Together
            </p>

            <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
              Creating Positive Impact
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        {/* FILTER */}

        <div className="mb-8 overflow-x-auto pb-2">

          <div className="flex min-w-max gap-2">

            {categories.map(
              (category, index) => (

                <button
                  key={`${category}-${index}`}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`
                    rounded-full px-4 py-2.5
                    text-[9px] font-black uppercase
                    tracking-wider transition
                    ${
                      activeCategory === category
                        ? "bg-[#087E8B] text-white shadow-lg"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-[#087E8B] hover:text-[#087E8B]"
                    }
                  `}
                >
                  {category}
                </button>

              )
            )}

          </div>

        </div>

        {/* MASONRY-STYLE GRID */}

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {filteredItems.map(
            (item, index) => {

              const featured =
                index % 7 === 0;

              return (
                <button
                  key={`${item.image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                  className={`
                    group relative overflow-hidden
                    rounded-[1.5rem] bg-slate-200
                    text-left shadow-sm
                    transition duration-500
                    hover:-translate-y-1
                    hover:shadow-xl
                    ${
                      featured
                        ? "sm:col-span-2 sm:row-span-2"
                        : ""
                    }
                  `}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-5">

                    <span className="inline-flex rounded-full bg-[#D99A16] px-2.5 py-1 text-[7px] font-black uppercase tracking-wider text-white">
                      {item.category}
                    </span>

                    <h3
                      className={`
                        mt-2 font-black text-white
                        ${
                          featured
                            ? "text-xl"
                            : "text-base"
                        }
                      `}
                    >
                      {item.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-[8px] font-bold text-white/70">

                      <MapPin size={11} />

                      {item.location}

                    </div>

                  </div>

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">

                    <Camera size={15} />

                  </div>

                </button>
              );
            }
          )}

        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

            <Images
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 text-sm font-bold text-slate-500">
              No gallery images found.
            </p>

          </div>
        )}

      </section>

      {/* =====================================================
          STORY CTA
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#073B4C]">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D99A16]/20 blur-3xl" />

            <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[#0E7183]/30 blur-3xl" />

            <div className="relative grid gap-7 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                  Your Story Matters
                </p>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  Be Part of Our Next Moment
                </h2>

                <p className="mt-3 max-w-xl text-xs leading-6 text-white/65">
                  Volunteers, supporters and community members
                  help make every initiative meaningful.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <Link
                  href="/volunteer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
                >
                  Get Involved
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/donate"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Heart
                    size={14}
                    fill="currentColor"
                  />
                  Donate
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedIndex(null)
          }
        >

          <button
            type="button"
            onClick={() =>
              setSelectedIndex(null)
            }
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#073B4C]"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#073B4C] sm:left-8"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className="relative max-h-[90vh] w-full max-w-6xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">

              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="mx-auto max-h-[75vh] w-auto max-w-full object-contain"
              />

            </div>

            <div className="mt-4 text-center">

              <span className="rounded-full bg-[#D99A16] px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-white">
                {selectedItem.category}
              </span>

              <h3 className="mt-3 text-xl font-black text-white">
                {selectedItem.title}
              </h3>

              <p className="mt-2 text-xs text-white/60">
                {selectedItem.description}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#073B4C] sm:right-8"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      )}

    </main>
  );
}