import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  Info,
  Mail,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    id: "general",
    number: "01",
    title: "General Information",
    icon: Info,
    text: "The information published on the Anand Jivan Foundation Trust website is provided for general informational and organisational purposes. While reasonable efforts may be made to keep information useful and current, information may change over time.",
  },
  {
    id: "accuracy",
    number: "02",
    title: "Accuracy of Information",
    icon: CheckCircle2,
    text: "We aim to present information responsibly and accurately. However, the Trust does not guarantee that every piece of information on the website will always be complete, current, error-free or suitable for every individual purpose.",
  },
  {
    id: "external",
    number: "03",
    title: "External Websites",
    icon: Globe2,
    text: "The website may contain links to external websites, social media platforms, payment providers or other third-party services. These external resources are operated independently and may have their own terms and privacy policies.",
  },
  {
    id: "financial",
    number: "04",
    title: "Donations & Financial Information",
    icon: ShieldCheck,
    text: "Information relating to donations, programmes, financial activities or organisational reports is provided for transparency and general information. Users should refer to the relevant official document or transaction record where specific verification is required.",
  },
  {
    id: "third-party",
    number: "05",
    title: "Third-Party Services",
    icon: Globe2,
    text: "Certain website features may depend on third-party services such as payment gateways, analytics systems, maps, hosting services or social media platforms. Their availability and performance may be outside the direct control of the Trust.",
  },
  {
    id: "availability",
    number: "06",
    title: "Website Availability",
    icon: AlertTriangle,
    text: "We may temporarily modify, suspend or discontinue portions of the website for maintenance, security, technical upgrades or other operational reasons. Continuous availability cannot be guaranteed.",
  },
  {
    id: "professional",
    number: "07",
    title: "No Professional Advice",
    icon: FileText,
    text: "Information on this website should not automatically be treated as legal, financial, medical, tax, investment or other professional advice. Where professional advice is required, users should consult an appropriately qualified professional.",
  },
  {
    id: "responsibility",
    number: "08",
    title: "User Responsibility",
    icon: ShieldCheck,
    text: "Users are responsible for independently evaluating information before relying on it for decisions. Where a specific official certificate, report, receipt or communication is required, users should obtain and verify the relevant document.",
  },
];

const quickPoints = [
  "Information is provided for general purposes",
  "Website content may be updated",
  "External links are independently operated",
  "Third-party services may change",
  "Users should verify important information",
  "Professional advice should be obtained when required",
];

export default function DisclaimerPage() {
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

              <AlertTriangle
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                Website Disclaimer
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Important
              <span className="block text-[#F2C94C]">
                Information
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              This disclaimer explains the general nature of
              information published on the Anand Jivan Foundation
              Trust website and the limitations that may apply to
              website content and third-party services.
            </p>

            <p className="mt-4 text-[10px] font-bold text-white/50">
              Last Updated: 25 August 2026
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
          IMPORTANT NOTICE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-8">

        <div className="rounded-[2rem] border border-[#D99A16]/20 bg-white p-7 shadow-sm sm:p-9">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D99A16]/10 text-[#D99A16]">

              <AlertTriangle size={25} />

            </div>

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D99A16]">
                Please Read
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#102A43]">
                Information on This Website Has a General Purpose
              </h2>

              <p className="mt-3 max-w-4xl text-xs leading-7 text-slate-500">
                Website visitors should use appropriate judgement
                when relying on information published online.
                Important organisational, financial, legal or
                transaction-related information should be verified
                through the appropriate official source.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK POINTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-8">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {quickPoints.map((point, index) => (

            <div
              key={`${point}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-start gap-3">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[9px] font-black text-[#087E8B]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="pt-1 text-xs font-bold leading-5 text-[#102A43]">
                  {point}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* CONTENT */}

          <div className="space-y-6">

            {sections.map((section) => {

              const Icon = section.icon;

              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                      <Icon size={20} />

                    </div>

                    <div>

                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                        Section {section.number}
                      </span>

                      <h2 className="mt-1 text-xl font-black text-[#102A43]">
                        {section.title}
                      </h2>

                    </div>

                  </div>

                  <p className="mt-6 text-xs leading-7 text-slate-500">
                    {section.text}
                  </p>

                </article>
              );
            })}

            {/* LIMITATION */}

            <article
              id="limitation"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D99A16]/10 text-[#D99A16]">

                  <AlertTriangle size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 09
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    Limitation of Responsibility
                  </h2>

                </div>

              </div>

              <p className="mt-6 text-xs leading-7 text-slate-500">
                To the extent permitted by applicable law, Anand
                Jivan Foundation Trust shall not be responsible for
                decisions made solely on the basis of general
                website information, temporary technical problems,
                third-party service interruptions or external
                website content.
              </p>

            </article>

            {/* UPDATES */}

            <article
              id="updates"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                  <FileText size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 10
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    Updates to This Disclaimer
                  </h2>

                </div>

              </div>

              <p className="mt-6 text-xs leading-7 text-slate-500">
                This disclaimer may be updated when website
                functionality, organisational practices or
                applicable requirements change. Visitors are
                encouraged to review the latest version when using
                important website information.
              </p>

            </article>

          </div>

          {/* SIDEBAR */}

          <aside className="h-fit lg:sticky lg:top-24">

            <div className="rounded-[1.5rem] bg-[#073B4C] p-6 text-white shadow-xl">

              <AlertTriangle
                size={25}
                className="text-[#F2C94C]"
              />

              <h3 className="mt-5 text-lg font-black">
                Disclaimer
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-white/60">
                Quick navigation
              </p>

              <nav className="mt-5 space-y-1">

                {sections.map((section) => (

                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[9px] font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    <span>
                      {section.title}
                    </span>

                    <ArrowRight size={11} />

                  </a>

                ))}

                <a
                  href="#limitation"
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[9px] font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <span>
                    Limitation
                  </span>

                  <ArrowRight size={11} />

                </a>

                <a
                  href="#updates"
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[9px] font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <span>
                    Updates
                  </span>

                  <ArrowRight size={11} />

                </a>

              </nav>

            </div>

            {/* CONTACT */}

            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-6">

              <Mail
                size={22}
                className="text-[#087E8B]"
              />

              <h3 className="mt-4 text-base font-black text-[#102A43]">
                Need Clarification?
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                Contact the Trust if you need clarification
                regarding information published on this website.
              </p>

              <a
                href="mailto:info@ajftrust.org?subject=Website%20Disclaimer%20Enquiry"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-[#087E8B]"
              >
                Email Us
                <ArrowRight size={12} />
              </a>

            </div>

          </aside>

        </div>

      </section>

      {/* =====================================================
          RELATED LEGAL PAGES
      ====================================================== */}

      <section className="border-y border-slate-200/70 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:px-10">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            Legal Information
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43]">
            Explore Related Policies
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500">
            Review our other website policies and terms for
            additional information.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/privacy"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
            >
              Privacy Policy
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/terms"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#087E8B] transition hover:border-[#087E8B]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/refund"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#087E8B] transition hover:border-[#087E8B]"
            >
              Refund Policy
            </Link>

            <Link
              href="/policies"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#087E8B] transition hover:border-[#087E8B]"
            >
              All Policies
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,113,131,.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(217,154,22,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">

          <ShieldCheck
            size={29}
            className="mx-auto text-[#F2C94C]"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Transparency Builds Trust
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            We aim to provide clear and responsible information
            to everyone who visits Anand Jivan Foundation Trust.
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
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}