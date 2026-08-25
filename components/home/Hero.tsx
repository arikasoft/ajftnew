"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
  Stethoscope,
  HandHeart,
  Leaf,
  Baby,
  BriefcaseBusiness,
  ShieldCheck,
  HeartHandshake,
  Laptop,
  Home,
  HandCoins,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";

/* ============================================================
   AJFT PREMIUM HERO
   17 SLIDES
============================================================ */

const slides = [
  {
    image: "/images/hero/education.jpg",
    eyebrow: "CHARITY FOR HUMANITY",
    title: "Education",
    highlight: "& Opportunity",
    description:
      "Creating meaningful learning opportunities and stronger educational environments for children and communities.",
    label: "LEARNING FOR A BETTER FUTURE",
    primary: "Support Education",
    primaryLink: "/donate",
    secondary: "Explore Programs",
    secondaryLink: "/programs/education",
    icon: GraduationCap,
    accent: "green",
  },

  {
    image: "/images/hero/community.jpg",
    eyebrow: "SOCIAL DEVELOPMENT",
    title: "Social Activity",
    highlight: "& Community",
    description:
      "Working with communities to encourage inclusion, dignity, participation and sustainable development.",
    label: "TOGETHER WE CAN MAKE A DIFFERENCE",
    primary: "Support Our Work",
    primaryLink: "/donate",
    secondary: "Our Projects",
    secondaryLink: "/projects",
    icon: Users,
    accent: "blue",
  },

  {
    image: "/images/hero/children.jpg",
    eyebrow: "CHILD WELFARE",
    title: "Every Child",
    highlight: "Deserves A Future",
    description:
      "Supporting children with care, education, opportunity and community-focused initiatives.",
    label: "CARE • EDUCATION • OPPORTUNITY",
    primary: "Support Children",
    primaryLink: "/donate",
    secondary: "Child Welfare",
    secondaryLink: "/programs/child-welfare",
    icon: Baby,
    accent: "orange",
  },

  {
    image: "/images/hero/healthcare.jpg",
    eyebrow: "HEALTH & WELL-BEING",
    title: "Healthy People",
    highlight: "Stronger Communities",
    description:
      "Promoting health awareness, access and well-being through community-oriented initiatives.",
    label: "HEALTH • AWARENESS • CARE",
    primary: "Support Healthcare",
    primaryLink: "/donate",
    secondary: "Health Programs",
    secondaryLink: "/programs/health",
    icon: Stethoscope,
    accent: "blue",
  },

  {
    image: "/images/hero/women.jpg",
    eyebrow: "WOMEN EMPOWERMENT",
    title: "Empowering Women",
    highlight: "Building Confidence",
    description:
      "Creating opportunities that encourage confidence, participation, dignity and sustainable progress.",
    label: "EMPOWER • PARTICIPATE • PROGRESS",
    primary: "Support Women",
    primaryLink: "/donate",
    secondary: "Our Programs",
    secondaryLink: "/programs",
    icon: HandHeart,
    accent: "pink",
  },

  {
    image: "/images/hero/skill.jpg",
    eyebrow: "SKILL DEVELOPMENT",
    title: "Skills Create",
    highlight: "New Possibilities",
    description:
      "Encouraging practical learning and skill development for a more confident and capable future.",
    label: "LEARN • DEVELOP • GROW",
    primary: "Support Skills",
    primaryLink: "/donate",
    secondary: "Explore Programs",
    secondaryLink: "/programs",
    icon: BriefcaseBusiness,
    accent: "purple",
  },

  {
    image: "/images/hero/livelihood.jpg",
    eyebrow: "LIVELIHOOD SUPPORT",
    title: "Dignity Through",
    highlight: "Opportunity",
    description:
      "Supporting initiatives that encourage self-reliance, dignity and sustainable livelihood opportunities.",
    label: "OPPORTUNITY • DIGNITY • SELF-RELIANCE",
    primary: "Support Livelihood",
    primaryLink: "/donate",
    secondary: "Our Work",
    secondaryLink: "/our-work",
    icon: HandCoins,
    accent: "green",
  },

  {
    image: "/images/hero/rural.jpg",
    eyebrow: "RURAL DEVELOPMENT",
    title: "Growing Together",
    highlight: "Stronger Villages",
    description:
      "Supporting rural communities through development, awareness and better opportunities.",
    label: "COMMUNITY • DEVELOPMENT • PROGRESS",
    primary: "Support Communities",
    primaryLink: "/donate",
    secondary: "Our Projects",
    secondaryLink: "/projects",
    icon: Home,
    accent: "blue",
  },

  {
    image: "/images/hero/environment.jpg",
    eyebrow: "ENVIRONMENT",
    title: "Care For Nature",
    highlight: "Care For Tomorrow",
    description:
      "Encouraging environmental awareness and responsible community participation for a healthier future.",
    label: "GREEN TODAY • BETTER TOMORROW",
    primary: "Support Environment",
    primaryLink: "/donate",
    secondary: "Our Work",
    secondaryLink: "/our-work",
    icon: Leaf,
    accent: "green",
  },

  {
    image: "/images/hero/relief.jpg",
    eyebrow: "EMERGENCY RELIEF",
    title: "Standing Together",
    highlight: "When It Matters",
    description:
      "Supporting communities with compassion and timely assistance during difficult situations.",
    label: "COMPASSION • RESPONSE • RELIEF",
    primary: "Support Relief",
    primaryLink: "/donate",
    secondary: "Our Response",
    secondaryLink: "/projects",
    icon: ShieldCheck,
    accent: "red",
  },

  {
    image: "/images/hero/social.jpg",
    eyebrow: "SOCIAL SUPPORT",
    title: "Compassion",
    highlight: "In Action",
    description:
      "Working towards meaningful social support for individuals, families and communities in need.",
    label: "HELPING HANDS • CARING HEARTS",
    primary: "Support Our Work",
    primaryLink: "/donate",
    secondary: "Our Programs",
    secondaryLink: "/programs",
    icon: HeartHandshake,
    accent: "green",
  },

  {
    image: "/images/hero/youth.jpg",
    eyebrow: "YOUTH EMPOWERMENT",
    title: "Invest In Youth",
    highlight: "Build The Future",
    description:
      "Encouraging young people through learning, participation, skills and meaningful opportunities.",
    label: "YOUTH • SKILLS • LEADERSHIP",
    primary: "Support Youth",
    primaryLink: "/donate",
    secondary: "Our Programs",
    secondaryLink: "/programs",
    icon: Sparkles,
    accent: "blue",
  },

  {
    image: "/images/hero/digital.jpg",
    eyebrow: "DIGITAL INCLUSION",
    title: "Technology",
    highlight: "For Opportunity",
    description:
      "Encouraging access to digital knowledge and technology-enabled opportunities for communities.",
    label: "CONNECT • LEARN • PARTICIPATE",
    primary: "Support Digital Inclusion",
    primaryLink: "/donate",
    secondary: "Our Work",
    secondaryLink: "/our-work",
    icon: Laptop,
    accent: "blue",
  },

  {
    image: "/images/hero/health.jpg",
    eyebrow: "COMMUNITY HEALTH",
    title: "Awareness Today",
    highlight: "Healthier Tomorrow",
    description:
      "Promoting awareness, preventive care and community participation for better health outcomes.",
    label: "AWARENESS • PREVENTION • WELL-BEING",
    primary: "Support Health",
    primaryLink: "/donate",
    secondary: "Health Initiatives",
    secondaryLink: "/programs/health",
    icon: Stethoscope,
    accent: "green",
  },

  {
    image: "/images/hero/volunteer.jpg",
    eyebrow: "VOLUNTEER & PARTICIPATION",
    title: "Be Part Of",
    highlight: "Something Meaningful",
    description:
      "People make change possible. Join us in supporting meaningful community-focused initiatives.",
    label: "VOLUNTEER • SUPPORT • SERVE",
    primary: "Become A Volunteer",
    primaryLink: "/volunteer",
    secondary: "Support Our Work",
    secondaryLink: "/donate",
    icon: HandHeart,
    accent: "orange",
  },

  {
    image: "/images/hero/transparency.jpg",
    eyebrow: "TRANSPARENCY & TRUST",
    title: "Responsible Action",
    highlight: "Builds Trust",
    description:
      "We believe transparency, accountability and responsible practices are essential to meaningful service.",
    label: "TRANSPARENCY • ACCOUNTABILITY • TRUST",
    primary: "View Transparency",
    primaryLink: "/transparency",
    secondary: "Certificates",
    secondaryLink: "/certificates",
    icon: ShieldCheck,
    accent: "slate",
  },

  {
    image: "/images/hero/community.jpg",
    eyebrow: "ANAND JIVAN FOUNDATION TRUST",
    title: "Together We Can",
    highlight: "Make A Difference",
    description:
      "Your support can contribute towards meaningful charitable and community-focused initiatives.",
    label: "SUPPORT • DONATE • VOLUNTEER",
    primary: "Donate Now",
    primaryLink: "/donate",
    secondary: "About The Trust",
    secondaryLink: "/about",
    icon: Heart,
    accent: "blue",
  },
];

/* ============================================================
   COLOR SYSTEM
============================================================ */

type Accent =
  | "green"
  | "blue"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "slate";

function getColors(accent: Accent) {
  const colors = {
    green: {
      primary: "#159447",
      dark: "#08743E",
      soft: "#DDF4E7",
      light: "#F0FBF5",
    },

    blue: {
      primary: "#1677C8",
      dark: "#075A9F",
      soft: "#DCEEFF",
      light: "#F1F8FF",
    },

    orange: {
      primary: "#E46A13",
      dark: "#B94E05",
      soft: "#FFE6D2",
      light: "#FFF7F0",
    },

    pink: {
      primary: "#D12C76",
      dark: "#A91C5A",
      soft: "#F9DCEB",
      light: "#FFF4F8",
    },

    purple: {
      primary: "#7544E8",
      dark: "#5925C4",
      soft: "#E9E0FF",
      light: "#F7F3FF",
    },

    red: {
      primary: "#D93636",
      dark: "#AD2222",
      soft: "#F9DDDD",
      light: "#FFF5F5",
    },

    slate: {
      primary: "#52657A",
      dark: "#34475A",
      soft: "#E2E8EF",
      light: "#F6F8FA",
    },
  };

  return colors[accent];
}

/* ============================================================
   HERO
============================================================ */

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = slides[active];

  const colors = getColors(
    slide.accent as Accent
  );

  const Icon = slide.icon;

  /* ==========================================================
     AUTO PLAY
  ========================================================== */

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) =>
        current === slides.length - 1
          ? 0
          : current + 1
      );
    }, 6000);

    return () =>
      window.clearInterval(timer);
  }, [paused]);

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  function nextSlide() {
    setActive((current) =>
      current === slides.length - 1
        ? 0
        : current + 1
    );
  }

  function previousSlide() {
    setActive((current) =>
      current === 0
        ? slides.length - 1
        : current - 1
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
    >

      {/* ======================================================
          TOP ACCENT
      ======================================================= */}

      <div
        className="h-[4px] w-full"
        style={{
          background: `
            linear-gradient(
              90deg,
              ${colors.dark},
              ${colors.primary},
              #16A3D8
            )
          `,
        }}
      />

      {/* ======================================================
          SLIDER
      ======================================================= */}

      <div
        className="
          relative
          h-[650px]
          overflow-hidden
          sm:h-[690px]
          lg:h-[660px]
          xl:h-[700px]
        "
      >

        {slides.map((item, index) => {
          const itemColors =
            getColors(
              item.accent as Accent
            );

          const ItemIcon =
            item.icon;

          const activeSlide =
            index === active;

          return (
            <article
              key={`${item.image}-${index}`}
              className={`
                absolute
                inset-0
                transition-opacity
                duration-700
                ${
                  activeSlide
                    ? "z-20 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }
              `}
            >

              {/* =================================================
                  BACKGROUND
              ================================================== */}

              <div
                className="absolute inset-0"
                style={{
                  background:
                    `linear-gradient(
                      180deg,
                      ${itemColors.light} 0%,
                      #ffffff 62%,
                      #F7FAF9 100%
                    )`,
                }}
              />

              {/* =================================================
                  IMAGE AREA
                  
                  IMPORTANT:
                  IMAGE IS NOT CROPPED AGGRESSIVELY
              ================================================== */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[390px]
                  overflow-hidden
                  sm:h-[420px]
                  lg:h-[440px]
                "
              >

                <div className="absolute inset-0 bg-[#073B4C]" />

                <Image
                  src={item.image}
                  alt={`${item.eyebrow} - ${item.title}`}
                  fill
                  priority={
                    index === 0
                  }
                  sizes="100vw"
                  className="
                    object-cover
                    object-center
                    transition-transform
                    duration-[7000ms]
                    ease-out
                    scale-[1.01]
                  "
                />

                {/* IMAGE SOFT COLOR */}

                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(
                        90deg,
                        ${itemColors.dark}25 0%,
                        transparent 42%,
                        ${itemColors.primary}18 100%
                      )
                    `,
                  }}
                />

                {/* IMAGE DARK TOP */}

                <div
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-24
                    bg-gradient-to-b
                    from-black/25
                    to-transparent
                  "
                />

                {/* =================================================
                    BRAND MARK
                ================================================== */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-7
                    z-20
                    -translate-x-1/2
                    text-center
                  "
                >

                  <div className="
                    rounded-full
                    border
                    border-white/30
                    bg-black/10
                    px-5
                    py-2
                    backdrop-blur-md
                  ">

                    <p className="
                      text-[9px]
                      font-black
                      tracking-[0.28em]
                      text-white
                      sm:text-[11px]
                    ">
                      ANAND JIVAN
                    </p>

                    <p className="
                      mt-0.5
                      text-[6px]
                      font-bold
                      tracking-[0.25em]
                      text-white/80
                      sm:text-[7px]
                    ">
                      FOUNDATION TRUST
                    </p>

                  </div>

                </div>

                {/* =================================================
                    IMAGE BOTTOM FADE
                    
                    THIS removes hard image/white boundary.
                ================================================== */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-[190px]
                    bg-gradient-to-t
                    from-white
                    via-white/70
                    to-transparent
                  "
                />

              </div>

              {/* =================================================
                  DECORATIVE CURVE
              ================================================== */}

              <div
                className="
                  absolute
                  left-[-5%]
                  right-[-5%]
                  top-[350px]
                  z-10
                  h-[100px]
                  rounded-[50%]
                "
                style={{
                  background:
                    itemColors.primary,
                  opacity: 0.95,
                }}
              />

              <div
                className="
                  absolute
                  left-[-5%]
                  right-[-5%]
                  top-[370px]
                  z-20
                  h-[105px]
                  rounded-[50%]
                  bg-white
                "
              />

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-30
                  mx-auto
                  flex
                  h-full
                  max-w-7xl
                  items-end
                  px-5
                  pb-10
                  sm:px-8
                  sm:pb-12
                  lg:px-10
                "
              >

                <div className="
                  grid
                  w-full
                  grid-cols-1
                  items-end
                  gap-8
                  lg:grid-cols-[1.4fr_0.6fr]
                ">

                  {/* =================================================
                      TEXT
                  ================================================== */}

                  <div className="max-w-3xl">

                    <p
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.25em]
                        sm:text-[9px]
                      "
                      style={{
                        color:
                          itemColors.primary,
                      }}
                    >
                      {item.eyebrow}
                    </p>

                    <h1
                      className="
                        mt-1
                        text-[40px]
                        font-black
                        leading-[0.95]
                        tracking-tight
                        text-[#165B99]
                        sm:text-[50px]
                        md:text-[56px]
                        lg:text-[62px]
                      "
                    >

                      {item.title}

                      <span
                        className="block"
                        style={{
                          color:
                            itemColors.primary,
                        }}
                      >
                        {item.highlight}
                      </span>

                    </h1>

                    <div
                      className="
                        mt-4
                        h-[4px]
                        w-28
                        rounded-full
                      "
                      style={{
                        background:
                          `linear-gradient(
                            90deg,
                            ${itemColors.primary},
                            #18A5D8
                          )`,
                      }}
                    />

                    <p className="
                      mt-4
                      max-w-2xl
                      text-[10px]
                      font-medium
                      leading-5
                      text-slate-500
                      sm:text-[12px]
                      sm:leading-6
                    ">
                      {item.description}
                    </p>

                    <p
                      className="
                        mt-2
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.12em]
                      "
                      style={{
                        color:
                          itemColors.dark,
                      }}
                    >
                      {item.label}
                    </p>

                    {/* BUTTONS */}

                    <div className="
                      mt-5
                      flex
                      flex-wrap
                      gap-3
                    ">

                      <Link
                        href={
                          item.primaryLink
                        }
                        className="
                          inline-flex
                          h-11
                          items-center
                          gap-2
                          rounded-xl
                          px-5
                          text-[9px]
                          font-black
                          text-white
                          shadow-lg
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-xl
                        "
                        style={{
                          background:
                            itemColors.primary,
                        }}
                      >

                        <Heart
                          size={14}
                          fill="currentColor"
                        />

                        {item.primary}

                        <ArrowRight
                          size={14}
                        />

                      </Link>

                      <Link
                        href={
                          item.secondaryLink
                        }
                        className="
                          inline-flex
                          h-11
                          items-center
                          gap-2
                          rounded-xl
                          border
                          bg-white
                          px-5
                          text-[9px]
                          font-black
                          shadow-sm
                          transition-all
                          duration-300
                          hover:-translate-y-1
                        "
                        style={{
                          borderColor:
                            itemColors.soft,
                          color:
                            itemColors.dark,
                        }}
                      >
                        {item.secondary}
                      </Link>

                    </div>

                  </div>

                  {/* =================================================
                      SUPPORT ICONS
                  ================================================== */}

                  <div className="
                    hidden
                    items-end
                    justify-end
                    gap-3
                    pb-3
                    lg:flex
                  ">

                    <SupportIcon
                      icon={
                        <ItemIcon
                          size={25}
                        />
                      }
                      label="Helping Hands"
                      color={
                        itemColors.primary
                      }
                      border={
                        itemColors.soft
                      }
                    />

                    <SupportIcon
                      icon={
                        <HeartHandshake
                          size={25}
                        />
                      }
                      label="Together"
                      color="#1677C8"
                      border="#DCEEFF"
                    />

                    <SupportIcon
                      icon={
                        <Heart
                          size={25}
                          fill="currentColor"
                        />
                      }
                      label="Better Tomorrow"
                      color={
                        itemColors.primary
                      }
                      border={
                        itemColors.soft
                      }
                    />

                  </div>

                </div>

              </div>

              {/* =================================================
                  DECORATIVE CIRCLE
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-2
                  right-[-50px]
                  z-30
                  hidden
                  h-44
                  w-44
                  rounded-full
                  border-[12px]
                  lg:block
                "
                style={{
                  borderColor:
                    `${itemColors.primary}25`,
                }}
              />

            </article>
          );
        })}

        {/* ======================================================
            PREVIOUS
        ======================================================= */}

        <button
          type="button"
          aria-label="Previous slide"
          onClick={
            previousSlide
          }
          className="
            absolute
            left-3
            top-[47%]
            z-50
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-[#1267B1]
            shadow-xl
            transition-all
            hover:scale-110
            hover:bg-[#1267B1]
            hover:text-white
            sm:left-5
          "
        >
          <ChevronLeft
            size={20}
          />
        </button>

        {/* ======================================================
            NEXT
        ======================================================= */}

        <button
          type="button"
          aria-label="Next slide"
          onClick={
            nextSlide
          }
          className="
            absolute
            right-3
            top-[47%]
            z-50
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-[#1267B1]
            shadow-xl
            transition-all
            hover:scale-110
            hover:bg-[#1267B1]
            hover:text-white
            sm:right-5
          "
        >
          <ChevronRight
            size={20}
          />
        </button>

      </div>

      {/* ======================================================
          SLIDE CONTROL
      ======================================================= */}

      <div className="
        absolute
        bottom-3
        left-1/2
        z-[60]
        flex
        -translate-x-1/2
        items-center
        gap-2
        rounded-full
        border
        border-slate-200
        bg-white/95
        px-3
        py-2
        shadow-xl
        backdrop-blur-md
      ">

        <span className="
          text-[8px]
          font-black
          text-slate-500
        ">
          {String(
            active + 1
          ).padStart(2, "0")}
        </span>

        <div className="
          flex
          max-w-[240px]
          items-center
          gap-1
          overflow-hidden
        ">

          {slides.map(
            (item, index) => {
              const dotColors =
                getColors(
                  item.accent as Accent
                );

              return (
                <button
                  key={
                    `dot-${index}`
                  }
                  type="button"
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  onClick={() =>
                    setActive(
                      index
                    )
                  }
                  className="
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                  "
                  style={{
                    width:
                      active ===
                      index
                        ? 22
                        : 6,
                    background:
                      active ===
                      index
                        ? dotColors.primary
                        : "#CBD5E1",
                  }}
                />
              );
            }
          )}

        </div>

        <span className="
          text-[8px]
          font-black
          text-slate-400
        ">
          17
        </span>

        <button
          type="button"
          aria-label={
            paused
              ? "Play slider"
              : "Pause slider"
          }
          onClick={() =>
            setPaused(
              !paused
            )
          }
          className="
            ml-1
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-slate-100
            text-slate-600
            transition
            hover:bg-slate-200
          "
        >

          {paused ? (
            <Play
              size={9}
              fill="currentColor"
            />
          ) : (
            <Pause
              size={9}
              fill="currentColor"
            />
          )}

        </button>

      </div>

    </section>
  );
}

/* ============================================================
   SUPPORT ICON
============================================================ */

function SupportIcon({
  icon,
  label,
  color,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  border: string;
}) {
  return (
    <div className="text-center">

      <div
        className="
          flex
          h-[58px]
          w-[58px]
          items-center
          justify-center
          rounded-full
          border-[4px]
          bg-white
          shadow-md
        "
        style={{
          borderColor:
            border,
          color,
        }}
      >
        {icon}
      </div>

      <p
        className="
          mt-2
          whitespace-nowrap
          text-[7px]
          font-black
          uppercase
          tracking-wide
        "
        style={{
          color,
        }}
      >
        {label}
      </p>

    </div>
  );
}