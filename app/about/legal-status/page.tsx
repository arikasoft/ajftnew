import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileText,
  Gavel,
  Heart,
  Landmark,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const legalCards = [
  {
    title: "Trust Registration",
    label: "Legal Identity",
    icon: Landmark,
    description:
      "Anand Jivan Foundation Trust operates as a public charitable trust for community-focused charitable and social welfare activities.",
  },
  {
    title: "Charitable Purpose",
    label: "Core Objective",
    icon: Heart,
    description:
      "The Trust is established to support charitable, educational, healthcare, community development and other permitted welfare activities.",
  },
  {
    title: "Governance",
    label: "Accountability",
    icon: ShieldCheck,
    description:
      "The Trust follows an organisational governance structure for responsible administration, programme implementation and oversight.",
  },
  {
    title: "Documentation",
    label: "Records",
    icon: FileText,
    description:
      "Relevant organisational records, certificates and compliance documents may be made available through the Trust's transparency and verification channels.",
  },
];

const documentLinks = [
  {
    title: "Certificates",
    description:
      "View available registration and compliance documents.",
    href: "/certificates",
    icon: FileCheck2,
  },
  {
    title: "Transparency",
    description:
      "Explore financial and organisational transparency information.",
    href: "/transparency",
    icon: ShieldCheck,
  },
  {
    title: "Reports",
    description:
      "View annual, activity and organisational reports.",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Verify",
    description:
      "Verify an AJFT donation receipt or related information.",
    href: "/verify",
    icon: CheckCircle2,
  },
];

const principles = [
  "Responsible governance",
  "Transparent administration",
  "Charitable purpose",
  "Documented activities",
  "Accountability",
  "Community-focused service",
];

export default function LegalStatusPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0E7183]/30 blur-3xl" />

        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#D99A16]/20 blur-3xl" />

        <div className="absolute right-[20%] top-20 h-24 w-24 rounded-full border border-white/10" />

        <div className="absolute right-[24%] top-24 h-16 w-16 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-8">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">

              <Gavel
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                Legal Status & Registration
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">

              Official Identity.
              
              <span className="block text-[#F2C94C]">
                Responsible Service.
              </span>

            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">

              Learn about the legal identity, charitable purpose,
              governance and documentation framework of Anand Jivan
              Foundation Trust.

            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/certificates"
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#D99A16]
                  px-6
                  text-xs
                  font-black
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-1
                  hover:bg-[#C4870B]
                "
              >

                View Certificates

                <ArrowRight size={14} />

              </Link>

              <Link
                href="/transparency"
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-6
                  text-xs
                  font-black
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-white/20
                "
              >

                Transparency

              </Link>

            </div>

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
          STATUS INTRO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-8">

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-[1fr_320px]">

            <div className="p-7 sm:p-9 lg:p-10">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
                Anand Jivan Foundation Trust
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#102A43]">
                Public Charitable Trust
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500">

                Anand Jivan Foundation Trust is a charitable
                organisation working towards community welfare,
                education, health, empowerment and other
                socially beneficial initiatives.

              </p>

              <p className="mt-4 max-w-3xl text-xs leading-6 text-slate-400">

                The information displayed on this page is intended
                to provide visitors with a clear overview of the
                Trust's organisational and legal framework.

              </p>

            </div>

            <div className="flex items-center bg-[#073B4C] p-7 sm:p-9">

              <div>

                <ShieldCheck
                  size={30}
                  className="text-[#F2C94C]"
                />

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
                  Trust Identity
                </p>

                <p className="mt-2 text-lg font-black text-white">
                  Anand Jivan Foundation Trust
                </p>

                <p className="mt-2 text-xs leading-5 text-white/60">
                  Empowering Lives • Building Better Communities
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LEGAL OVERVIEW
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="mb-9">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            Legal Framework
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
            Organisational Status
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Key areas through which the Trust maintains its
            organisational identity and accountability.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {legalCards.map((card) => {

            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                  group
                  rounded-[1.5rem]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B] transition group-hover:bg-[#087E8B] group-hover:text-white">

                  <Icon size={21} />

                </div>

                <p className="mt-5 text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                  {card.label}
                </p>

                <h3 className="mt-2 text-lg font-black text-[#102A43]">
                  {card.title}
                </h3>

                <p className="mt-3 text-[10px] leading-6 text-slate-500">
                  {card.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>

      {/* =====================================================
          DOCUMENTATION
      ====================================================== */}

      <section className="border-y border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
                Official Documentation
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#102A43] sm:text-4xl">
                Documents & Verification
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500">

                For visitors, donors, partners and other
                stakeholders, relevant organisational documents
                can be accessed through the Trust's dedicated
                transparency and verification sections.

              </p>

              <div className="mt-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2C94C]/20 text-[#C4870B]">

                  <FileCheck2 size={18} />

                </div>

                <p className="text-[10px] font-bold leading-5 text-slate-500">

                  Always refer to the latest official document
                  where specific legal or registration details
                  are required.

                </p>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {documentLinks.map((item) => {

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="
                      group
                      rounded-[1.4rem]
                      border
                      border-slate-200
                      bg-[#F5F8F7]
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#087E8B]/30
                      hover:bg-white
                      hover:shadow-lg
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#087E8B] shadow-sm transition group-hover:bg-[#087E8B] group-hover:text-white">

                        <Icon size={18} />

                      </div>

                      <ArrowRight
                        size={15}
                        className="
                          text-slate-300
                          transition
                          group-hover:translate-x-1
                          group-hover:text-[#D99A16]
                        "
                      />

                    </div>

                    <h3 className="mt-5 text-base font-black text-[#102A43]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      {item.description}
                    </p>

                  </Link>
                );

              })}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

        <div className="text-center">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            Our Commitment
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
            Built on Trust & Accountability
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-slate-500">
            Our organisational approach is guided by responsible
            administration, transparency and community service.
          </p>

        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {principles.map((principle, index) => (

            <div
              key={principle}
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[9px] font-black text-[#087E8B]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-xs font-black text-[#102A43]">
                  {principle}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          IMPORTANT NOTICE
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

          <div className="rounded-[2rem] border border-[#D99A16]/20 bg-[#FFF9EA] p-7 sm:p-9">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D99A16]/15 text-[#C4870B]">

                <Sparkles size={22} />

              </div>

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C4870B]">
                  Important
                </p>

                <h2 className="mt-2 text-xl font-black text-[#102A43]">
                  Verify Specific Registration Details From Official Documents
                </h2>

                <p className="mt-3 text-xs leading-6 text-slate-600">

                  Legal registrations, certificates, approval
                  numbers, validity periods and other formal
                  particulars should always be checked against
                  the latest official certificate or document
                  issued to the Trust.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,113,131,.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(217,154,22,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">

          <ShieldCheck
            size={30}
            className="mx-auto text-[#F2C94C]"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Need Legal or Registration Information?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">

            For specific documentation or organisational
            enquiries, contact Anand Jivan Foundation Trust.

          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/certificates"
              className="
                inline-flex
                h-11
                items-center
                gap-2
                rounded-xl
                bg-[#D99A16]
                px-6
                text-xs
                font-black
                text-white
                transition
                hover:-translate-y-1
                hover:bg-[#C4870B]
              "
            >

              View Certificates

              <ArrowRight size={14} />

            </Link>

            <Link
              href="/contact"
              className="
                inline-flex
                h-11
                items-center
                gap-2
                rounded-xl
                border
                border-white/20
                bg-white/10
                px-6
                text-xs
                font-black
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/20
              "
            >

              <Mail size={14} />

              Contact Us

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}