import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Sparkles,
  HandHeart,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About AJFT", href: "/about" },
  { label: "Our Work", href: "/programs" },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact Us", href: "/contact" },
];

const workAreas = [
  ["📚", "Education", "/programs/education"],
  ["🏥", "Healthcare", "/programs/healthcare"],
  ["💧", "Drinking Water", "/programs/drinking-water"],
  ["👩", "Women Empowerment", "/programs/women-empowerment"],
  ["🌳", "Environment", "/programs/environment"],
  ["👶", "Child Welfare", "/programs/child-welfare"],
  ["🎓", "Skill Development", "/programs/skill-development"],
  ["🤝", "Emergency Relief", "/programs/emergency-relief"],
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M14.2 8.2h2.7V4h-2.7c-3.2 0-5.1 1.9-5.1 5.2v2.4H6v4.1h3.1V22h4.2v-6.3h3.2l.7-4.1h-3.9V9.5c0-.9.3-1.3.9-1.3Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M18.6 2H22l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.3L18.6 2Zm-1.2 17.4h1.9L6.7 4.4H4.6l12.8 15Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        className="fill-current stroke-none"
      />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex h-10 w-10 items-center justify-center rounded-full
        border border-white/10 bg-white/[0.06] text-white/60
        transition-all duration-300
        hover:-translate-y-1 hover:scale-105
        hover:border-[#D6A63A]
        hover:bg-[#D6A63A]
        hover:text-white
      "
    >
      {children}
    </a>
  );
}

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        group flex items-center gap-2
        text-[11px] font-semibold text-white/50
        transition-all duration-200
        hover:translate-x-1 hover:text-[#D6A63A]
      "
    >
      <ArrowRight
        size={11}
        className="text-[#D6A63A] opacity-0 transition group-hover:opacity-100"
      />
      <span>{label}</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#061A29] text-white">

      {/* =====================================================
          TOP WAVE
      ====================================================== */}

      <div className="relative h-20 overflow-hidden bg-[#F5F8FA]">

        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
        >
          <path
            d="
              M0 58
              C180 5 330 5 520 52
              C700 97 850 105 1030 55
              C1190 12 1310 10 1440 48
              L1440 120
              L0 120
              Z
            "
            fill="#061A29"
          />
        </svg>

      </div>

      {/* =====================================================
          FLOATING IMPACT MESSAGE
      ====================================================== */}

      <div className="relative z-20 mx-auto -mt-3 max-w-7xl px-5 sm:px-7 lg:px-8">

        <div
          className="
            relative overflow-hidden rounded-[28px]
            border border-white/10
            bg-gradient-to-r from-[#087E8B] via-[#087E8B] to-[#0B4054]
            p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            md:p-8
          "
        >

          {/* animated circles */}

          <div className="absolute -right-16 -top-16 h-48 w-48 animate-pulse rounded-full border border-white/10" />

          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-[#D6A63A]/20" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 animate-pulse items-center justify-center rounded-2xl bg-white/10 text-[#D9B65A] backdrop-blur">
                <HandHeart size={27} />
              </div>

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B65A]">
                  Together We Can
                </p>

                <h2 className="mt-1 font-serif text-xl font-black text-white sm:text-2xl">
                  Every helping hand creates hope.
                </h2>

                <p className="mt-1 text-[10px] text-white/50">
                  Thank you to our donors, volunteers and supporters.
                </p>

              </div>

            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <Link
                href="/donate"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-[#D6A63A] px-6
                  text-[10px] font-black text-white
                  shadow-lg transition
                  hover:-translate-y-1 hover:bg-[#BD8D28]
                "
              >
                <Heart size={14} fill="currentColor" />
                Donate Now
              </Link>

              <Link
                href="/volunteer"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl border border-white/15
                  bg-white/[0.06] px-6
                  text-[10px] font-black text-white
                  transition hover:bg-white/10
                "
              >
                Join Us
                <ArrowRight size={14} />
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-7 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1fr_1fr]">

          {/* ORGANISATION */}

          <div>

            <Link href="/" className="group inline-flex items-center gap-3">

              <div
                className="
                  flex h-16 w-16 shrink-0 items-center justify-center
                  rounded-2xl bg-white p-1
                  shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                  transition duration-300
                  group-hover:-translate-y-1
                  group-hover:rotate-1
                "
              >
                <img
                  src="/logo.png"
                  alt="Anand Jivan Foundation Trust"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>

                <h2 className="font-serif text-[19px] font-black leading-[1.05] tracking-tight">
                  ANAND JIVAN
                  <br />
                  FOUNDATION TRUST
                </h2>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#D6A63A]">
                    Public Charitable Trust
                  </p>

                </div>

              </div>

            </Link>

            <p className="mt-6 max-w-[390px] text-[11px] leading-6 text-white/45">
              Anand Jivan Foundation Trust works towards education,
              healthcare, drinking water, women empowerment,
              environmental protection, livelihood development,
              child welfare and community-focused social initiatives.
            </p>

            {/* ADDRESS */}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5">

              <div className="flex items-start gap-3">

                <MapPin className="mt-0.5 shrink-0 text-[#D6A63A]" size={18} />

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#D6A63A]">
                    Registered Office
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-white/50">
                    MABBI BELAUNA, POST - LALSHAHPUR,
                    PANCHAYAT - SHAHBAJPUR,
                    DARBHANGA, BIHAR - 846005, INDIA
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-sm font-black">
              Quick Links
            </h3>

            <div className="mt-4 h-px w-10 bg-[#D6A63A]" />

            <nav className="mt-5 space-y-3">

              {quickLinks.map((item) => (
                <FooterLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                />
              ))}

            </nav>

          </div>

          {/* WORK */}

          <div>

            <h3 className="text-sm font-black">
              Areas of Work
            </h3>

            <div className="mt-4 h-px w-10 bg-[#D6A63A]" />

            <div className="mt-5 grid grid-cols-1 gap-3">

              {workAreas.map(([icon, label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="
                    group flex items-center gap-2.5
                    text-[10px] font-semibold text-white/50
                    transition hover:translate-x-1 hover:text-[#D6A63A]
                  "
                >

                  <span
                    className="
                      flex h-7 w-7 items-center justify-center rounded-lg
                      bg-white/[0.06] text-[12px]
                      transition group-hover:bg-[#087E8B]/20
                    "
                  >
                    {icon}
                  </span>

                  {label}

                </Link>
              ))}

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-sm font-black">
              Contact Us
            </h3>

            <div className="mt-4 h-px w-10 bg-[#D6A63A]" />

            <div className="mt-5 space-y-4">

              <a
                href="tel:+919155751363"
                className="group flex items-center gap-3"
              >

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087E8B]/15 text-[#36B9C4] transition group-hover:bg-[#087E8B] group-hover:text-white">
                  <Phone size={16} />
                </span>

                <span className="text-[10px] font-semibold text-white/55 group-hover:text-[#D6A63A]">
                  +91 9155751363
                </span>

              </a>

              <a
                href="mailto:info@ajftrust.org"
                className="group flex items-center gap-3"
              >

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087E8B]/15 text-[#36B9C4] transition group-hover:bg-[#087E8B] group-hover:text-white">
                  <Mail size={16} />
                </span>

                <span className="text-[10px] font-semibold text-white/55 group-hover:text-[#D6A63A]">
                  info@ajftrust.org
                </span>

              </a>

            </div>

            <p className="mt-7 text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
              Follow AJFT
            </p>

            <div className="mt-3 flex gap-2">

              <SocialButton
                href="https://www.facebook.com/ajftrust"
                label="Facebook"
              >
                <FacebookIcon />
              </SocialButton>

              <SocialButton
                href="https://www.instagram.com/ajftrusts"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialButton>

              <SocialButton
                href="https://x.com/ajftrust"
                label="X"
              >
                <XIcon />
              </SocialButton>

            </div>

          </div>

        </div>

        {/* =====================================================
            DONOR / SUPPORTER STRIP
        ====================================================== */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.035] to-[#087E8B]/10">

          <div className="grid md:grid-cols-[1fr_auto] md:items-center">

            <div className="p-6 md:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6A63A]/10 text-[#D6A63A]">
                  <Users size={19} />
                </div>

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D6A63A]">
                    Our Community
                  </p>

                  <h3 className="mt-1 font-serif text-xl font-black">
                    Our Donors & Supporters
                  </h3>

                </div>

              </div>

              <p className="mt-4 max-w-2xl text-[10px] leading-5 text-white/40">
                We are grateful to every donor, volunteer, partner and
                well-wisher who contributes time, resources and trust
                towards our charitable activities.
              </p>

            </div>

            <div className="border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-7">

              <div className="flex items-center gap-3">

                <Sparkles
                  size={20}
                  className="text-[#D6A63A]"
                />

                <div>

                  <p className="text-[10px] font-black text-white">
                    Thank You
                  </p>

                  <p className="mt-1 text-[8px] text-white/35">
                    For believing in the mission.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            REGISTRATION
        ====================================================== */}

        <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="flex items-center gap-3">

            <CheckCircle2 size={17} className="text-[#36B9C4]" />

            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/25">
                DARPAN ID
              </p>

              <p className="mt-0.5 text-[10px] font-bold text-white/60">
                BR/2023/0343963
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2 size={17} className="text-[#36B9C4]" />

            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/25">
                PAN
              </p>

              <p className="mt-0.5 text-[10px] font-bold text-white/60">
                AAJTA9323K
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2 size={17} className="text-[#36B9C4]" />

            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/25">
                Legal Status
              </p>

              <p className="mt-0.5 text-[10px] font-bold text-white/60">
                Registered Public Charitable Trust
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <ShieldCheck size={17} className="text-[#D6A63A]" />

            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/25">
                Transparency
              </p>

              <Link
                href="/transparency"
                className="mt-0.5 inline-block text-[10px] font-bold text-[#D6A63A] hover:text-white"
              >
                View Details →
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          POLICY
      ====================================================== */}

      <div className="border-t border-white/10 bg-[#051522]">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4">

          {[
            ["Privacy Policy", "/privacy"],
            ["Refund Policy", "/refund"],
            ["Terms & Conditions", "/terms"],
            ["Disclaimer", "/disclaimer"],
            ["Transparency", "/transparency"],
            ["Reports", "/reports"],
            ["Verify Receipt", "/verify"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[9px] font-semibold text-white/30 transition hover:text-[#D6A63A]"
            >
              {label}
            </Link>
          ))}

        </div>

      </div>

      {/* =====================================================
          SECURITY
      ====================================================== */}

      <div className="border-t border-white/10 bg-[#071C2C]">

        <div className="flex items-center justify-center gap-2 px-5 py-4">

          <ShieldCheck size={15} className="text-[#36B9C4]" />

          <span className="text-[9px] font-bold text-white/40">
            Secure Donations • Trusted Payment Processing
          </span>

        </div>

      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}

      <div className="border-t border-white/10 bg-[#04131F]">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center md:flex-row md:items-center md:justify-between md:text-left">

          <p className="text-[9px] text-white/30">
            © {new Date().getFullYear()} Anand Jivan Foundation Trust.
            All Rights Reserved.
          </p>

          <p className="text-[9px] text-white/25">
            Registered Public Charitable Trust • Act 1882
          </p>

        </div>

      </div>

    </footer>
  );
}