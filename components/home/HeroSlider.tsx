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
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    image: "/images/home/hero-01.jpg",
    title: "Building Better Lives",
    text: "Together we can create opportunities, restore hope and make a meaningful difference in the lives of people and communities.",
    tag: "Compassion • Commitment • Change",
  },
  {
    image: "/images/home/hero-02.jpg",
    title: "Education Creates Opportunity",
    text: "Supporting children and communities through education, learning opportunities and inclusive development.",
    tag: "Learning For A Better Tomorrow",
  },
  {
    image: "/images/home/hero-03.jpg",
    title: "Empowering Women",
    text: "Creating opportunities that support confidence, dignity, independence and meaningful participation in society.",
    tag: "Equality • Dignity • Progress",
  },
  {
    image: "/images/home/hero-04.jpg",
    title: "Building Stronger Communities",
    text: "Working with communities and partners to promote inclusive, sustainable and people-centred development.",
    tag: "People • Partnership • Progress",
  },
  {
    image: "/images/home/hero-05.jpg",
    title: "Every Child Matters",
    text: "Supporting care, education, dignity and opportunity so that every child can grow towards a brighter future.",
    tag: "Care • Protection • Opportunity",
  },
  {
    image: "/images/home/hero-06.jpg",
    title: "Care For Our Environment",
    text: "Promoting environmental awareness and collective action for a cleaner, healthier and sustainable future.",
    tag: "Nature • Responsibility • Future",
  },
  {
    image: "/images/home/hero-07.jpg",
    title: "Together We Can Create Change",
    text: "Join Anand Jivan Foundation Trust in building a future where compassion, opportunity and dignity reach more people.",
    tag: "Together For Social Change",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 6500);

    return () => clearInterval(timer);
  }, []);

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

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden bg-[#042F3B]">

      {/* HERO */}
      <div className="relative min-h-[580px] w-full sm:min-h-[640px] lg:min-h-[700px]">

        {/* IMAGE */}
        <div className="absolute inset-0">
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
              scale-[1.01]
              transition-all
              duration-[6500ms]
              ease-out
            "
          />
        </div>

        {/* IMAGE PROTECTION LAYER */}
        <div className="absolute inset-0 bg-[#042F3B]/25" />

        {/* LEFT CONTENT OVERLAY */}
        <div className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#042F3B]/95
          via-[#073B4C]/78
          to-[#073B4C]/15
        " />

        {/* BOTTOM DEPTH */}
        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#042F3B]/85
          via-transparent
          to-black/10
        " />

        {/* SOFT GOLD LIGHT */}
        <div className="
          absolute
          left-[30%]
          top-[10%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#D6A63A]/10
          blur-[120px]
        " />

        {/* RIGHT VISUAL GRADIENT */}
        <div className="
          absolute
          right-0
          top-0
          h-full
          w-[30%]
          bg-gradient-to-l
          from-[#042F3B]/20
          to-transparent
        " />

        {/* MAIN CONTENT */}
        <div className="
          relative
          z-20
          mx-auto
          flex
          min-h-[580px]
          max-w-7xl
          items-center
          px-5
          py-20
          sm:min-h-[640px]
          sm:px-8
          lg:min-h-[700px]
          lg:px-12
        ">

          <div className="max-w-3xl">

            {/* TRUST BADGE */}
            <div className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/10
              px-4
              py-2
              text-[9px]
              font-black
              uppercase
              tracking-[0.22em]
              text-[#F4C95D]
              backdrop-blur-md
            ">
              <Sparkles size={13} />
              {slide.tag}
            </div>

            {/* ORGANIZATION */}
            <p className="
              mt-7
              text-[10px]
              font-black
              uppercase
              tracking-[0.35em]
              text-[#F4C95D]
            ">
              Anand Jivan Foundation Trust
            </p>

            {/* TITLE */}
            <h1 className="
              mt-5
              max-w-3xl
              font-serif
              text-4xl
              font-black
              leading-[1.02]
              tracking-tight
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            ">
              {slide.title}
            </h1>

            {/* GOLD LINE */}
            <div className="mt-7 flex items-center gap-3">
              <div className="h-[3px] w-16 rounded-full bg-[#D6A63A]" />
              <div className="h-[3px] w-6 rounded-full bg-[#D6A63A]/40" />
            </div>

            {/* DESCRIPTION */}
            <p className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-white/80
              sm:text-base
              sm:leading-8
            ">
              {slide.text}
            </p>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-3">

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
                  shadow-black/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C2922E]
                "
              >
                <Heart size={16} fill="currentColor" />
                Support Our Work
              </Link>

              <Link
                href="/programs"
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
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#073B4C]
                "
              >
                Explore Our Programs
                <ArrowRight size={16} />
              </Link>

            </div>

            {/* VISITOR TRUST INFO */}
            <div className="
              mt-10
              flex
              flex-wrap
              gap-3
            ">

              <div className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-4
                py-3
                backdrop-blur-md
              ">
                <div className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#D6A63A]
                  text-white
                ">
                  <Users size={17} />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-wider text-white/50">
                    Community First
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-white">
                    People • Purpose • Impact
                  </p>
                </div>
              </div>

              <div className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-4
                py-3
                backdrop-blur-md
              ">
                <div className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  text-[#F4C95D]
                ">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-wider text-white/50">
                    Our Commitment
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-white">
                    Dignity & Transparency
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT VISITOR CARD */}
        <div className="
          absolute
          bottom-36
          right-8
          z-30
          hidden
          xl:block
        ">

          <div className="
            w-[250px]
            rounded-[28px]
            border
            border-white/15
            bg-[#073B4C]/70
            p-6
            shadow-2xl
            backdrop-blur-xl
          ">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#D6A63A]
              text-white
            ">
              <Globe2 size={22} />
            </div>

            <p className="
              mt-5
              text-[9px]
              font-black
              uppercase
              tracking-[0.2em]
              text-[#F4C95D]
            ">
              Welcome
            </p>

            <h3 className="
              mt-2
              text-lg
              font-black
              leading-snug
              text-white
            ">
              Every visitor can become part of positive change.
            </h3>

            <p className="
              mt-3
              text-xs
              leading-6
              text-white/65
            ">
              Learn about our work, share our mission or support initiatives that create meaningful community impact.
            </p>

          </div>

        </div>

        {/* PREVIOUS */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-3
            top-1/2
            z-40
            hidden
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/25
            text-white
            backdrop-blur-md
            transition-all
            hover:scale-110
            hover:bg-white
            hover:text-[#073B4C]
            sm:flex
          "
        >
          <ChevronLeft size={21} />
        </button>

        {/* NEXT */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-3
            top-1/2
            z-40
            hidden
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/25
            text-white
            backdrop-blur-md
            transition-all
            hover:scale-110
            hover:bg-white
            hover:text-[#073B4C]
            sm:flex
          "
        >
          <ChevronRight size={21} />
        </button>

        {/* SLIDE COUNTER */}
        <div className="
          absolute
          bottom-28
          left-5
          z-30
          hidden
          items-center
          gap-3
          text-white
          sm:flex
          lg:left-10
        ">

          <span className="
            text-sm
            font-black
            text-[#F4C95D]
          ">
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="h-px w-10 bg-white/30" />

          <span className="text-xs text-white/60">
            {String(slides.length).padStart(2, "0")}
          </span>

        </div>

        {/* DOTS */}
        <div className="
          absolute
          bottom-24
          left-1/2
          z-40
          flex
          -translate-x-1/2
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-black/25
          px-4
          py-2.5
          backdrop-blur-md
        ">

          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Slide ${index + 1}`}
              className={`
                rounded-full
                transition-all
                duration-300
                ${
                  active === index
                    ? "h-1.5 w-8 bg-[#D6A63A]"
                    : "h-1.5 w-1.5 bg-white/50 hover:bg-white"
                }
              `}
            />
          ))}

        </div>

        {/* WAVE 1 */}
        <div className="
          absolute
          bottom-[-1px]
          left-0
          z-20
          w-full
        ">

          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="h-[80px] w-full sm:h-[110px]"
          >

            <path
              d="
                M0 90
                C180 130 300 130 470 95
                C650 55 770 35 940 70
                C1120 108 1270 125 1440 78
                L1440 150
                L0 150
                Z
              "
              fill="#F5F8FA"
            />

          </svg>

        </div>

        {/* WAVE 2 */}
        <div className="
          absolute
          bottom-[-1px]
          left-0
          z-10
          w-full
          opacity-30
        ">

          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="h-[100px] w-full sm:h-[135px]"
          >

            <path
              d="
                M0 105
                C200 50 350 145 560 95
                C780 45 980 145 1190 90
                C1300 60 1380 65 1440 80
                L1440 150
                L0 150
                Z
              "
              fill="#D6A63A"
            />

          </svg>

        </div>

      </div>

    </section>
  );
}