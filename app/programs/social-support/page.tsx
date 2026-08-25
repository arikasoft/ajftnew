"use client";

import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Home,
  LifeBuoy,
  MapPin,
  Package,
  Phone,
  Shirt,
  Utensils,
} from "lucide-react";

// ============================================================
// SUPPORT TYPES
// ============================================================

const supportTypes = [
  {
    title: "Food Support",
    description:
      "Emergency food and essential grocery support.",
    icon: Utensils,
  },
  {
    title: "Medical Support",
    description:
      "Help for urgent medical and health needs.",
    icon: HeartHandshake,
  },
  {
    title: "Education Support",
    description:
      "Educational materials and learning assistance.",
    icon: GraduationCap,
  },
  {
    title: "Clothing Support",
    description:
      "Clothes and essential items for families.",
    icon: Shirt,
  },
  {
    title: "Emergency Support",
    description:
      "Immediate assistance during difficult situations.",
    icon: LifeBuoy,
  },
  {
    title: "Livelihood Support",
    description:
      "Support for skills, work and self-reliance.",
    icon: BriefcaseBusiness,
  },
];

// ============================================================
// HOW SUPPORT WORKS
// ============================================================

const helpSteps = [
  {
    number: "01",
    title: "Submit Request",
    text: "Tell us what kind of support you need.",
  },
  {
    number: "02",
    title: "Verification",
    text: "Our team reviews the request and available information.",
  },
  {
    number: "03",
    title: "Support",
    text: "Eligible requests are connected with available assistance.",
  },
];

// ============================================================
// PAGE
// ============================================================

export default function SocialSupportPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7] text-[#24332F]">

      
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#123B4A]">

        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0D6655]/40 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#C6A15B]/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D2AF62]/30 bg-white/5 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#E5CB91]">

              <HeartHandshake size={12} />

              Community Care

            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Social Support
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Need help or want to help someone?
              Connect with our community support
              programme for essential assistance.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">

              <Link
                href="/programs/social-support/request"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D2AF62] px-5 py-3 text-xs font-black text-[#123B4A] transition hover:bg-[#E0C57D]"
              >

                <LifeBuoy size={15} />

                Request Help

                <ArrowRight size={14} />

              </Link>

              <Link
                href="/programs/social-support/offer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >

                <HeartHandshake size={15} />

                Offer Support

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-4 py-7 sm:px-6">

        <div className="grid gap-4 md:grid-cols-2">

          {/* REQUEST HELP */}

          <Link
            href="/programs/social-support/request"
            className="group rounded-2xl border border-[#CFE0DB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F3EF] text-[#0D6655]">

                <LifeBuoy size={22} />

              </div>

              <ChevronRight
                size={18}
                className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#0D6655]"
              />

            </div>

            <h2 className="mt-4 text-base font-black text-[#123B4A]">
              I Need Help
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Request assistance for food,
              education, medical, emergency or
              livelihood needs.
            </p>

            <div className="mt-4 text-[10px] font-black uppercase tracking-wider text-[#0D6655]">
              Submit Help Request →
            </div>

          </Link>

          {/* OFFER SUPPORT */}

          <Link
            href="/programs/social-support/offer"
            className="group rounded-2xl border border-[#E4D9BA] bg-[#FFFCF4] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6EDD8] text-[#9A7835]">

                <Package size={22} />

              </div>

              <ChevronRight
                size={18}
                className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#9A7835]"
              />

            </div>

            <h2 className="mt-4 text-base font-black text-[#123B4A]">
              I Want to Help
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Offer your time, resources, skills or
              financial support to people in need.
            </p>

            <div className="mt-4 text-[10px] font-black uppercase tracking-wider text-[#9A7835]">
              Offer Your Support →
            </div>

          </Link>

        </div>

      </section>

      {/* =====================================================
          SUPPORT TYPES
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">

        <div>

          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0D6655]">
            Quick Support
          </p>

          <h2 className="mt-1 text-xl font-black text-[#123B4A]">
            What kind of help is available?
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Select a support category to submit a request.
          </p>

        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">

          {supportTypes.map(
            (item) => {

              const Icon =
                item.icon;

              return (
                <Link
                  key={item.title}
                  href={`/programs/social-support/request?type=${encodeURIComponent(
                    item.title
                  )}`}
                  className="group rounded-xl border border-[#DCE6E3] bg-white p-4 transition hover:border-[#9CC9BC] hover:shadow-sm"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EDF6F3] text-[#0D6655]">

                    <Icon size={18} />

                  </div>

                  <h3 className="mt-3 text-xs font-black text-[#123B4A]">
                    {item.title}
                  </h3>

                  <p className="mt-1 hidden text-[10px] leading-4 text-gray-500 sm:block">
                    {item.description}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-[#0D6655]">

                    Request

                    <ArrowRight size={10} />

                  </div>

                </Link>
              );
            }
          )}

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="border-y border-[#DCE6E3] bg-white">

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0D6655]">
              Simple Process
            </p>

            <h2 className="mt-1 text-xl font-black text-[#123B4A]">
              How support works
            </h2>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            {helpSteps.map(
              (step) => (

                <div
                  key={step.number}
                  className="rounded-xl border border-[#DCE6E3] bg-[#F8FAF9] p-4"
                >

                  <span className="text-2xl font-black text-[#D2AF62]/60">
                    {step.number}
                  </span>

                  <h3 className="mt-1 text-sm font-black text-[#123B4A]">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-5 text-gray-500">
                    {step.text}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          EMERGENCY CONTACT
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-4 py-7 sm:px-6">

        <div className="flex flex-col gap-4 rounded-2xl bg-[#0D6655] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">

              <Phone size={19} />

            </div>

            <div>

              <p className="text-xs font-black">
                Need immediate assistance?
              </p>

              <p className="mt-1 text-[10px] leading-5 text-white/60">
                For urgent social support,
                contact our team directly.
              </p>

            </div>

          </div>

          <a
            href="tel:+919155751363"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-black text-[#0D6655]"
          >

            <Phone size={14} />

            +91 9155751363

          </a>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#092F3D]">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div>

            <p className="text-xs font-black text-white">
              Anand Jivan Foundation Trust
            </p>

            <p className="mt-0.5 text-[9px] text-white/40">
              Social Support Programme
            </p>

          </div>

          <div className="flex flex-wrap gap-4 text-[9px] text-white/45">

            <span className="flex items-center gap-1">

              <MapPin size={10} />

              Darbhanga, Bihar

            </span>

            <a
              href="mailto:info@ajftrust.org"
              className="transition hover:text-white"
            >
              info@ajftrust.org
            </a>

          </div>

        </div>

      </footer>

    </main>
  );
}