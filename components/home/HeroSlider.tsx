"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
} from "lucide-react";

const slides = [
  {
    image: "/images/home/hero-01.jpg",
    title: "Building Better Lives",
    text: "Together we can create opportunities and make a meaningful difference.",
  },
  {
    image: "/images/home/hero-02.jpg",
    title: "Education & Opportunity",
    text: "Supporting children and communities through education and development.",
  },
  {
    image: "/images/home/hero-03.jpg",
    title: "Empowering Women",
    text: "Creating opportunities for confidence, dignity and progress.",
  },
  {
    image: "/images/home/hero-04.jpg",
    title: "Stronger Communities",
    text: "Working together for inclusive and sustainable community development.",
  },
  {
    image: "/images/home/hero-05.jpg",
    title: "Every Child Matters",
    text: "Supporting care, education, dignity and opportunity for children.",
  },
  {
    image: "/images/home/hero-06.jpg",
    title: "Care For Environment",
    text: "Protecting nature and creating a healthier future for everyone.",
  },
  {
    image: "/images/home/hero-07.jpg",
    title: "Together We Can",
    text: "Join Anand Jivan Foundation Trust in serving communities with compassion.",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  const previousSlide = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActive((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#073B4C]">

      {/* =====================================================
          HERO AREA
      ====================================================== */}

      <div className="relative min-h-[620px] w-full">

        {/* =================================================
            IMAGE
        ================================================== */}

        <div className="absolute inset-0">

          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-[6000ms] ease-out"
          />

        </div>

        {/* =================================================
            IMAGE + BACKGROUND BLEND
        ================================================== */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#073B4C] via-[#073B4C]/90 to-[#073B4C]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C] via-transparent to-[#073B4C]/10" />

        {/* =================================================
            SOFT LIGHT
        ================================================== */}

        <div className="absolute right-[10%] top-[15%] h-80 w-80 rounded-full bg-[#D6A63A]/10 blur-3xl" />

        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-12">

          <div className="max-w-2xl">

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D6A63A]">
              ANAND JIVAN FOUNDATION TRUST
            </p>

            <h1 className="mt-5 font-serif text-5xl font-black leading-[0.98] text-white sm:text-6xl md:text-7xl">
              {slide.title}
            </h1>

            <div className="mt-7 h-1 w-20 rounded-full bg-[#D6A63A]" />

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              {slide.text}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                href="/donate"
                className="
                  inline-flex
                  h-12
                  items-center
                  gap-2
                  rounded-full
                  bg-[#D6A63A]
                  px-7
                  text-xs
                  font-black
                  text-white
                  shadow-xl
                  transition
                  hover:-translate-y-1
                  hover:bg-[#BE8D29]
                "
              >
                <Heart
                  size={15}
                  fill="currentColor"
                />

                Donate Now
              </Link>

              <Link
                href="/our-work"
                className="
                  inline-flex
                  h-12
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/25
                  bg-white/10
                  px-7
                  text-xs
                  font-bold
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-white/20
                "
              >
                Explore Our Work
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

          {/* =================================================
              RIGHT FLOATING INFO
          ================================================== */}

          <div className="absolute bottom-32 right-10 hidden lg:block">

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 px-5 py-4 backdrop-blur-md">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A63A] text-white">
                <Users size={20} />
              </div>

              <div>

                <p className="text-[8px] font-black uppercase tracking-wider text-white/40">
                  Community Focus
                </p>

                <p className="mt-1 text-xs font-black text-white">
                  People • Purpose • Impact
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            LEFT / RIGHT BUTTONS
        ================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-4
            top-1/2
            z-20
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-black/25
            text-white
            backdrop-blur-md
            transition
            hover:bg-white
            hover:text-[#073B4C]
          "
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-4
            top-1/2
            z-20
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-black/25
            text-white
            backdrop-blur-md
            transition
            hover:bg-white
            hover:text-[#073B4C]
          "
        >
          <ChevronRight size={20} />
        </button>

        {/* =================================================
            DOTS
        ================================================== */}

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-4 py-2.5 backdrop-blur-md">

          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-8 bg-[#D6A63A]"
                  : "w-1.5 bg-white/50"
              }`}
            />
          ))}

        </div>

        {/* =================================================
            WAVE
        ================================================== */}

        <div className="absolute bottom-[-1px] left-0 z-10 w-full">

          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="h-[75px] w-full sm:h-[90px]"
          >
            <path
              d="
                M0 55
                C180 115 330 120 500 72
                C680 20 820 20 980 67
                C1150 117 1290 110 1440 52
                L1440 120
                L0 120
                Z
              "
              fill="#F5F8FA"
            />
          </svg>

        </div>

      </div>

    </section>
  );
}