"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  FileCheck,
  FileText,
  GalleryHorizontal,
  HandHeart,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

/* =========================================================
   TYPES
========================================================= */

type MenuItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type NavigationMenu = {
  label: string;
  items: MenuItem[];
};

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/ajftrust",
    icon: <FaFacebookF size={10} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ajftrusts",
    icon: <FaInstagram size={11} />,
  },
  {
    name: "X",
    href: "https://x.com/ajftrust",
    icon: <FaXTwitter size={10} />,
  },
];

/* =========================================================
   NAVIGATION
========================================================= */

const navigation: NavigationMenu[] = [
  {
    label: "About",
    items: [
      {
        title: "About AJFT",
        description:
          "Know about Anand Jivan Foundation Trust.",
        href: "/about",
        icon: <Home size={16} />,
      },
      {
        title: "Vision & Mission",
        description:
          "Our vision, mission and core values.",
        href: "/about/vision-mission",
        icon: <Target size={16} />,
      },
      {
        title: "Governance",
        description:
          "Governance and organisational oversight.",
        href: "/governance",
        icon: <ShieldCheck size={16} />,
      },
      {
        title: "Our Team",
        description:
          "Meet our leadership and team.",
        href: "/governance/team",
        icon: <Users size={16} />,
      },
      {
        title: "Legal Status",
        description:
          "Registration and legal information.",
        href: "/about/legal-status",
        icon: <FileCheck size={16} />,
      },
    ],
  },

  {
    label: "Our Work",
    items: [
      {
        title: "All Programs",
        description:
          "Explore all our community programs.",
        href: "/programs",
        icon: <Heart size={16} />,
      },
      {
        title: "Education",
        description:
          "Supporting education and learning.",
        href: "/programs/education",
        icon: <FileText size={16} />,
      },
      {
        title: "Healthcare",
        description:
          "Health and community well-being.",
        href: "/programs/health",
        icon: <Heart size={16} />,
      },
      {
        title: "Community Development",
        description:
          "Building stronger communities.",
        href: "/programs/community-development",
        icon: <Users size={16} />,
      },
      {
        title: "Women Empowerment",
        description:
          "Creating opportunities for women.",
        href: "/programs/women-empowerment",
        icon: <Users size={16} />,
      },
      {
        title: "Skill Development",
        description:
          "Skills, training and livelihood opportunities.",
        href: "/programs/skill-development",
        icon: <Sparkles size={16} />,
      },
      {
        title: "Child Welfare",
        description:
          "Care, education and support for children.",
        href: "/programs/child-welfare",
        icon: <Heart size={16} />,
      },
      {
        title: "Environment",
        description:
          "Environmental awareness and action.",
        href: "/programs/environment",
        icon: <Sparkles size={16} />,
      },
      {
        title: "Emergency Relief",
        description:
          "Support during emergencies and crises.",
        href: "/programs/emergency-relief",
        icon: <HandHeart size={16} />,
      },
      {
        title: "Projects",
        description:
          "Explore ongoing and completed projects.",
        href: "/projects",
        icon: <Briefcase size={16} />,
      },
    ],
  },

  {
    label: "Impact",
    items: [
      {
        title: "Our Impact",
        description:
          "See the impact of our initiatives.",
        href: "/impact",
        icon: <Target size={16} />,
      },
      {
        title: "Beneficiaries",
        description:
          "People and communities reached.",
        href: "/impact/beneficiaries",
        icon: <Users size={16} />,
      },
      {
        title: "Success Stories",
        description:
          "Stories from our community work.",
        href: "/impact/stories",
        icon: <Heart size={16} />,
      },
      {
        title: "Impact Reports",
        description:
          "Detailed impact and activity reports.",
        href: "/impact/reports",
        icon: <FileText size={16} />,
      },
    ],
  },

  {
    label: "Get Involved",
    items: [
      {
        title: "Volunteer",
        description:
          "Join us and contribute your time.",
        href: "/volunteer",
        icon: <Users size={16} />,
      },
      {
        title: "Internship",
        description:
          "Learn and contribute through internships.",
        href: "/internship",
        icon: <Briefcase size={16} />,
      },
      {
        title: "Partner With Us",
        description:
          "Build meaningful partnerships with AJFT.",
        href: "/partner",
        icon: <HandHeart size={16} />,
      },
      {
        title: "Careers",
        description:
          "Explore opportunities to work with us.",
        href: "/careers",
        icon: <Briefcase size={16} />,
      },
      {
        title: "Donate",
        description:
          "Support our charitable activities.",
        href: "/donate",
        icon: <Heart size={16} />,
      },
    ],
  },

  {
    label: "Transparency",
    items: [
      {
        title: "Financial Transparency",
        description:
          "Responsible use of charitable resources.",
        href: "/transparency",
        icon: <ShieldCheck size={16} />,
      },
      {
        title: "Annual Reports",
        description:
          "Annual reports and disclosures.",
        href: "/reports",
        icon: <FileText size={16} />,
      },
      {
        title: "Certificates",
        description:
          "Registration and compliance documents.",
        href: "/certificates",
        icon: <FileCheck size={16} />,
      },
      {
        title: "Policies",
        description:
          "Organisational policies and guidelines.",
        href: "/policies",
        icon: <FileText size={16} />,
      },
      {
        title: "Verify Receipt",
        description:
          "Verify an AJFT donation receipt.",
        href: "/verify",
        icon: <ShieldCheck size={16} />,
      },
    ],
  },

  {
    label: "Resources",
    items: [
      {
        title: "News",
        description:
          "Latest news and organisational updates.",
        href: "/news",
        icon: <Newspaper size={16} />,
      },
      {
        title: "Events",
        description:
          "Upcoming and past AJFT events.",
        href: "/events",
        icon: <Sparkles size={16} />,
      },
      {
        title: "Gallery",
        description:
          "Photos from our activities.",
        href: "/gallery",
        icon: <GalleryHorizontal size={16} />,
      },
      {
        title: "Publications",
        description:
          "Reports, publications and resources.",
        href: "/publications",
        icon: <FileText size={16} />,
      },
      {
        title: "Blog",
        description:
          "Stories, articles and updates.",
        href: "/blog",
        icon: <Newspaper size={16} />,
      },
    ],
  },
];

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState<string | null>(null);

  const [mobileMenu, setMobileMenu] =
    useState<string | null>(null);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen || searchOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  /* =======================================================
     ESC KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE
  ======================================================= */

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMenu(null);
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-[9999] w-full">

        {/* ===================================================
            SOCIAL BAR
        ==================================================== */}

        <div
          className={`
            hidden
            overflow-hidden
            bg-[#102A43]
            transition-all
            duration-300
            lg:block
            ${
              scrolled
                ? "h-0 opacity-0"
                : "h-[30px] opacity-100"
            }
          `}
        >

          <div
            className="
              mx-auto
              flex
              h-full
              max-w-[1440px]
              items-center
              justify-end
              px-6
            "
          >

            <div className="flex items-center gap-1.5">

              {socialLinks.map(
                (social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                      text-white/70
                      transition
                      hover:bg-white
                      hover:text-[#102A43]
                    "
                  >
                    {social.icon}
                  </a>
                )
              )}

            </div>

          </div>

        </div>

        {/* ===================================================
            MAIN NAVIGATION
        ==================================================== */}

        <div
          className={`
            border-b
            transition-all
            duration-300
            ${
              scrolled
                ? `
                  border-[#D7E0E5]
                  bg-white/95
                  shadow-[0_5px_25px_rgba(16,42,67,0.10)]
                  backdrop-blur-xl
                `
                : `
                  border-[#E5EBEF]
                  bg-white
                `
            }
          `}
        >

          <div
            className={`
              mx-auto
              flex
              max-w-[1440px]
              items-center
              justify-between
              px-4
              sm:px-5
              md:px-7
              transition-all
              duration-300
              ${
                scrolled
                  ? "h-[55px]"
                  : "h-[66px]"
              }
            `}
          >

            {/* =================================================
                LOGO
            ================================================== */}

            <Link
              href="/"
              onClick={() =>
                setActiveMenu(null)
              }
              className="
                flex
                shrink-0
                items-center
                gap-2.5
              "
            >

              <div
                className={`
                  relative
                  shrink-0
                  overflow-hidden
                  rounded-full
                  bg-white
                  transition-all
                  duration-300
                  ${
                    scrolled
                      ? "h-9 w-9"
                      : "h-12 w-12"
                  }
                `}
              >

                <Image
                  src="/logo.png"
                  alt="Anand Jivan Foundation Trust"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain"
                />

              </div>

              <div className="hidden sm:block">

                <div
                  className={`
                    font-serif
                    font-bold
                    leading-none
                    text-[#102A43]
                    ${
                      scrolled
                        ? "text-[15px]"
                        : "text-[18px] lg:text-[20px]"
                    }
                  `}
                >
                  Anand Jivan
                </div>

                <div
                  className="
                    mt-1
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#718394]
                    lg:text-[9px]
                  "
                >
                  Foundation Trust
                </div>

              </div>

            </Link>

            {/* =================================================
                DESKTOP NAV
            ================================================== */}

            <nav className="hidden items-center xl:flex">

              {/* HOME */}

              <Link
                href="/"
                className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  px-2.5
                  py-2
                  text-[11px]
                  font-semibold
                  text-[#526575]
                  transition
                  hover:bg-[#EEF6F8]
                  hover:text-[#176B87]
                "
              >

                <Home size={12} />

                Home

              </Link>

              {/* DROPDOWN MENUS */}

              {navigation.map(
                (menu) => (
                  <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() =>
                      setActiveMenu(
                        menu.label
                      )
                    }
                    onMouseLeave={() =>
                      setActiveMenu(null)
                    }
                  >

                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={
                        activeMenu ===
                        menu.label
                      }
                      className={`
                        flex
                        items-center
                        gap-1
                        rounded-full
                        px-2.5
                        py-2
                        text-[11px]
                        font-semibold
                        transition
                        ${
                          activeMenu ===
                          menu.label
                            ? "bg-[#EEF6F8] text-[#176B87]"
                            : "text-[#526575] hover:bg-[#EEF6F8] hover:text-[#176B87]"
                        }
                      `}
                    >

                      {menu.label}

                      <ChevronDown
                        size={11}
                        className={`
                          transition-transform
                          ${
                            activeMenu ===
                            menu.label
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>

                    {/* =================================================
                        MEGA DROPDOWN
                    ================================================== */}

                    {activeMenu ===
                      menu.label && (
                      <div
                        className="
                          absolute
                          left-1/2
                          top-full
                          w-[760px]
                          -translate-x-1/2
                          pt-2
                        "
                      >

                        <div
                          className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#DCE4EA]
                            bg-white
                            p-3
                            shadow-[0_25px_70px_rgba(16,42,67,0.18)]
                          "
                        >

                          <div
                            className="
                              grid
                              grid-cols-2
                              gap-1
                            "
                          >

                            {menu.items.map(
                              (item) => (
                                <Link
                                  key={
                                    item.href
                                  }
                                  href={
                                    item.href
                                  }
                                  className="
                                    group
                                    rounded-xl
                                    p-3
                                    transition
                                    hover:bg-[#F3F8FA]
                                  "
                                >

                                  <div className="flex gap-3">

                                    <div
                                      className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#EEF6F8]
                                        text-[#176B87]
                                        transition
                                        group-hover:bg-[#176B87]
                                        group-hover:text-white
                                      "
                                    >
                                      {item.icon}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                      <div
                                        className="
                                          flex
                                          items-center
                                          justify-between
                                          gap-2
                                        "
                                      >

                                        <h3
                                          className="
                                            text-[12px]
                                            font-bold
                                            text-[#243B53]
                                            group-hover:text-[#176B87]
                                          "
                                        >
                                          {item.title}
                                        </h3>

                                        <ArrowUpRight
                                          size={13}
                                          className="
                                            shrink-0
                                            text-[#C4CDD3]
                                            group-hover:text-[#C59A3A]
                                          "
                                        />

                                      </div>

                                      <p
                                        className="
                                          mt-1
                                          text-[9px]
                                          leading-4
                                          text-[#7A8A98]
                                        "
                                      >
                                        {item.description}
                                      </p>

                                    </div>

                                  </div>

                                </Link>
                              )
                            )}

                          </div>

                          {/* DROPDOWN CTA */}

                          <div
                            className="
                              mt-3
                              flex
                              items-center
                              justify-between
                              gap-4
                              rounded-xl
                              bg-gradient-to-r
                              from-[#102A43]
                              to-[#176B87]
                              px-5
                              py-3
                            "
                          >

                            <div>

                              <p className="text-[11px] font-bold text-white">
                                Let's Make Better Life
                              </p>

                              <p className="mt-0.5 text-[8px] text-white/55">
                                Support meaningful community initiatives.
                              </p>

                            </div>

                            <Link
                              href="/donate"
                              className="
                                flex
                                shrink-0
                                items-center
                                gap-1.5
                                rounded-full
                                bg-[#D3A640]
                                px-4
                                py-2
                                text-[9px]
                                font-bold
                                text-white
                                transition
                                hover:bg-[#B98E2E]
                              "
                            >

                              <Heart
                                size={11}
                                fill="currentColor"
                              />

                              Donate Now

                              <ArrowUpRight
                                size={11}
                              />

                            </Link>

                          </div>

                        </div>

                      </div>
                    )}

                  </div>
                )
              )}

              {/* CONTACT */}

              <Link
                href="/contact"
                className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  px-2.5
                  py-2
                  text-[11px]
                  font-semibold
                  text-[#526575]
                  transition
                  hover:bg-[#EEF6F8]
                  hover:text-[#176B87]
                "
              >

                <Mail size={12} />

                Contact

              </Link>

            </nav>

            {/* =================================================
                RIGHT ACTIONS
            ================================================== */}

            <div className="flex items-center gap-1.5">

              {/* SEARCH */}

              <button
                type="button"
                onClick={() =>
                  setSearchOpen(true)
                }
                aria-label="Search website"
                className="
                  hidden
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[#607585]
                  transition
                  hover:bg-[#EEF6F8]
                  hover:text-[#176B87]
                  lg:flex
                "
              >

                <Search size={16} />

              </button>

              {/* VERIFY */}

              <Link
                href="/verify"
                className="
                  hidden
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-[#DCE4EA]
                  px-3
                  py-2
                  text-[9px]
                  font-bold
                  text-[#526575]
                  transition
                  hover:border-[#176B87]
                  hover:text-[#176B87]
                  lg:flex
                "
              >

                <ShieldCheck size={12} />

                Verify

              </Link>

              {/* DONATE */}

              <Link
                href="/donate"
                className="
                  hidden
                  items-center
                  gap-1.5
                  rounded-full
                  bg-[#176B87]
                  px-3.5
                  py-2
                  text-[9px]
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:bg-[#12566D]
                  hover:shadow-md
                  lg:flex
                "
              >

                <Heart
                  size={12}
                  fill="currentColor"
                />

                Donate

              </Link>

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(true)
                }
                aria-label="Open menu"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#102A43]
                  text-white
                  xl:hidden
                "
              >

                <Menu size={18} />

              </button>

            </div>

          </div>

        </div>

      </header>

      {/* ======================================================
          SEARCH OVERLAY
      ======================================================= */}

      {searchOpen && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            bg-[#081C29]/95
            backdrop-blur-xl
          "
        >

          <div
            className="
              mx-auto
              max-w-4xl
              px-5
              pt-10
              md:pt-16
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#D9B65A]
                  "
                >
                  Anand Jivan Foundation Trust
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Search website
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSearchOpen(false)
                }
                aria-label="Close search"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                "
              >

                <X size={18} />

              </button>

            </div>

            <div className="mt-12">

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-white/15
                  pb-4
                "
              >

                <Search
                  size={22}
                  className="shrink-0 text-white/30"
                />

                <input
                  autoFocus
                  type="search"
                  placeholder="Search programs, projects, reports..."
                  className="
                    w-full
                    bg-transparent
                    text-xl
                    text-white
                    outline-none
                    placeholder:text-white/20
                    md:text-2xl
                  "
                />

              </div>

              <div className="mt-6">

                <p
                  className="
                    mb-3
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-white/30
                  "
                >
                  Quick Access
                </p>

                <div className="flex flex-wrap gap-2">

                  {[
                    ["About", "/about"],
                    ["Programs", "/programs"],
                    ["Projects", "/projects"],
                    ["Impact", "/impact"],
                    ["Volunteer", "/volunteer"],
                    ["Internship", "/internship"],
                    ["News", "/news"],
                    ["Events", "/events"],
                    ["Reports", "/reports"],
                    ["Gallery", "/gallery"],
                    ["Certificates", "/certificates"],
                    ["Contact", "/contact"],
                  ].map(
                    ([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() =>
                          setSearchOpen(false)
                        }
                        className="
                          rounded-full
                          bg-white/10
                          px-4
                          py-2
                          text-[9px]
                          font-semibold
                          text-white/70
                          transition
                          hover:bg-white/20
                          hover:text-white
                        "
                      >
                        {label}
                      </Link>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================
          MOBILE DRAWER
      ======================================================= */}

      {mobileOpen && (
        <div className="fixed inset-0 z-[9998] xl:hidden">

          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobile}
            className="
              absolute
              inset-0
              h-full
              w-full
              bg-black/50
              backdrop-blur-sm
            "
          />

          {/* DRAWER */}

          <aside
            className="
              absolute
              right-0
              top-0
              h-full
              w-[92%]
              max-w-md
              overflow-y-auto
              bg-white
              shadow-2xl
            "
          >

            {/* MOBILE HEADER */}

            <div
              className="
                sticky
                top-0
                z-20
                flex
                h-[62px]
                items-center
                justify-between
                border-b
                border-[#E1E8EC]
                bg-white
                px-4
              "
            >

              <Link
                href="/"
                onClick={closeMobile}
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <div className="relative h-9 w-9">

                  <Image
                    src="/logo.png"
                    alt="AJFT Logo"
                    fill
                    sizes="36px"
                    className="object-contain"
                  />

                </div>

                <div>

                  <div
                    className="
                      font-serif
                      text-sm
                      font-bold
                      leading-none
                      text-[#102A43]
                    "
                  >
                    Anand Jivan
                  </div>

                  <div
                    className="
                      mt-1
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#718394]
                    "
                  >
                    Foundation Trust
                  </div>

                </div>

              </Link>

              <button
                type="button"
                onClick={closeMobile}
                aria-label="Close menu"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F1F5F7]
                  text-[#526575]
                "
              >

                <X size={16} />

              </button>

            </div>

            {/* MOBILE CONTENT */}

            <div className="px-3 py-3">

              {/* HOME */}

              <Link
                href="/"
                onClick={closeMobile}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#EEF6F8]
                  px-3.5
                  py-3
                  text-xs
                  font-bold
                  text-[#176B87]
                "
              >

                <Home size={14} />

                Home

              </Link>

              {/* NAVIGATION */}

              {navigation.map(
                (menu) => (
                  <div
                    key={menu.label}
                    className="
                      border-b
                      border-[#E7ECEF]
                    "
                  >

                    <button
                      type="button"
                      aria-expanded={
                        mobileMenu ===
                        menu.label
                      }
                      onClick={() =>
                        setMobileMenu(
                          mobileMenu ===
                            menu.label
                            ? null
                            : menu.label
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        px-3.5
                        py-3.5
                        text-left
                        text-xs
                        font-bold
                        text-[#243B53]
                      "
                    >

                      {menu.label}

                      <ChevronDown
                        size={15}
                        className={`
                          transition-transform
                          ${
                            mobileMenu ===
                            menu.label
                              ? "rotate-180 text-[#176B87]"
                              : ""
                          }
                        `}
                      />

                    </button>

                    {mobileMenu ===
                      menu.label && (
                      <div
                        className="
                          mb-2
                          ml-2
                          border-l-2
                          border-[#C59A3A]/40
                          pl-2
                        "
                      >

                        {menu.items.map(
                          (item) => (
                            <Link
                              key={
                                item.href
                              }
                              href={
                                item.href
                              }
                              onClick={
                                closeMobile
                              }
                              className="
                                flex
                                gap-2.5
                                rounded-lg
                                px-3
                                py-2.5
                                transition
                                hover:bg-[#F4F8FA]
                              "
                            >

                              <div
                                className="
                                  flex
                                  h-7
                                  w-7
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-[#EEF6F8]
                                  text-[#176B87]
                                "
                              >
                                {item.icon}
                              </div>

                              <div
                                className="
                                  min-w-0
                                  flex-1
                                "
                              >

                                <div
                                  className="
                                    flex
                                    items-center
                                    justify-between
                                  "
                                >

                                  <p
                                    className="
                                      text-[11px]
                                      font-bold
                                      text-[#243B53]
                                    "
                                  >
                                    {item.title}
                                  </p>

                                  <ArrowUpRight
                                    size={11}
                                    className="text-[#C59A3A]"
                                  />

                                </div>

                                <p
                                  className="
                                    mt-0.5
                                    text-[8px]
                                    leading-4
                                    text-[#7A8A98]
                                  "
                                >
                                  {item.description}
                                </p>

                              </div>

                            </Link>
                          )
                        )}

                      </div>
                    )}

                  </div>
                )
              )}

              {/* CONTACT */}

              <Link
                href="/contact"
                onClick={closeMobile}
                className="
                  flex
                  items-center
                  gap-2
                  px-3.5
                  py-3.5
                  text-xs
                  font-bold
                  text-[#243B53]
                "
              >

                <Mail size={14} />

                Contact Us

              </Link>

              {/* VERIFY */}

              <Link
                href="/verify"
                onClick={closeMobile}
                className="
                  mt-1
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DCE4EA]
                  px-3.5
                  py-3
                  text-[10px]
                  font-bold
                  text-[#176B87]
                "
              >

                <ShieldCheck size={14} />

                Verify Donation Receipt

              </Link>

              {/* DONATE */}

              <Link
                href="/donate"
                onClick={closeMobile}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#176B87]
                  px-4
                  py-3
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                "
              >

                <Heart
                  size={15}
                  fill="currentColor"
                />

                Donate Now

              </Link>

              {/* =================================================
                  CONTACT INFORMATION
              ================================================== */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  bg-[#F4F8FA]
                  p-4
                "
              >

                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#176B87]
                  "
                >
                  Contact AJFT
                </p>

                <div className="mt-3 space-y-3">

                  {/* EMAIL */}

                  <a
                    href="mailto:info@ajftrust.org"
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-[10px]
                      text-[#607585]
                    "
                  >

                    <Mail
                      size={14}
                      className="text-[#176B87]"
                    />

                    info@ajftrust.org

                  </a>

                  {/* PHONE */}

                  <a
                    href="tel:+919155751363"
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-[10px]
                      text-[#607585]
                    "
                  >

                    <Phone
                      size={14}
                      className="text-[#176B87]"
                    />

                    +91 9155751363

                  </a>

                  {/* ADDRESS */}

                  <div
                    className="
                      flex
                      items-start
                      gap-2.5
                      text-[10px]
                      leading-4
                      text-[#607585]
                    "
                  >

                    <MapPin
                      size={14}
                      className="
                        mt-0.5
                        shrink-0
                        text-[#176B87]
                      "
                    />

                    <span>
                      MABBI BELAUNA,
                      <br />
                      POST - LALSHAHPUR,
                      <br />
                      PANCHAYAT - SHAHBAJPUR,
                      <br />
                      DARBHANGA, BIHAR - 846005
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SOCIAL
              ================================================== */}

              <div className="mt-5">

                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#176B87]
                  "
                >
                  Follow AJFT
                </p>

                <div className="mt-3 flex gap-2">

                  {socialLinks.map(
                    (social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          social.name
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-[#102A43]
                          text-white
                          transition
                          hover:bg-[#C59A3A]
                        "
                      >
                        {social.icon}
                      </a>
                    )
                  )}

                </div>

              </div>

              {/* FOOTER TEXT */}

              <div className="px-2 pb-6 pt-6 text-center">

                <p
                  className="
                    text-[8px]
                    leading-4
                    text-[#8997A2]
                  "
                >
                  Anand Jivan Foundation Trust
                  <br />
                  Let's Make Better Life
                </p>

              </div>

            </div>

          </aside>

        </div>
      )}
    </>
  );
}