import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const sections = [
  {
    id: "information",
    title: "Information We Collect",
    icon: FileText,
    content: [
      "Information you voluntarily provide through forms, enquiries, volunteer applications, donation forms or other website interactions.",
      "Basic technical information such as browser type, device information, pages visited and general usage information may be collected for website operation and analytics.",
      "We aim to collect only information that is reasonably necessary for the relevant purpose.",
    ],
  },
  {
    id: "usage",
    title: "How We Use Information",
    icon: Eye,
    content: [
      "To respond to enquiries and requests submitted through the website.",
      "To process and maintain records relating to donations, volunteering, events or other services where applicable.",
      "To improve website functionality, security, user experience and organisational communication.",
    ],
  },
  {
    id: "protection",
    title: "Data Protection",
    icon: LockKeyhole,
    content: [
      "We take reasonable steps to protect information against unauthorised access, alteration, disclosure or misuse.",
      "Access to information should be limited to authorised persons who need it for legitimate organisational purposes.",
      "No online transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "sharing",
    title: "Information Sharing",
    icon: UserCheck,
    content: [
      "We do not intend to sell personal information.",
      "Information may be shared with authorised service providers where reasonably necessary to operate specific website or organisational services.",
      "Information may also be disclosed where required by applicable law or a lawful authority.",
    ],
  },
];

const principles = [
  "Purposeful collection",
  "Responsible use",
  "Reasonable security",
  "Limited access",
  "Transparency",
  "Respect for user rights",
];

export default function PrivacyPage() {
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

              <LockKeyhole
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                Privacy & Data Protection
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Your Privacy.
              <span className="block text-[#F2C94C]">
                Our Responsibility.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              This page explains how Anand Jivan Foundation
              Trust approaches information collected through
              its website and related online interactions.
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
          TRUST BANNER
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-8">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087E8B]/10 text-[#087E8B]">

              <ShieldCheck size={30} />

            </div>

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
                Our Commitment
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#102A43]">
                We Respect Your Information
              </h2>

              <p className="mt-3 max-w-4xl text-xs leading-6 text-slate-500">
                Anand Jivan Foundation Trust seeks to handle
                personal information responsibly and to use
                information for legitimate and clearly understood
                purposes.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT + SIDEBAR
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* CONTENT */}

          <div className="space-y-6">

            {sections.map(
              (section, index) => {

                const Icon = section.icon;

                return (
                  <article
                    key={`${section.id}-${index}`}
                    id={section.id}
                    className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                        <Icon size={20} />

                      </div>

                      <div>

                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                          Section {String(index + 1).padStart(2, "0")}
                        </span>

                        <h2 className="mt-1 text-xl font-black text-[#102A43]">
                          {section.title}
                        </h2>

                      </div>

                    </div>

                    <div className="mt-6 space-y-4">

                      {section.content.map(
                        (text, itemIndex) => (
                          <div
                            key={`${section.id}-${itemIndex}`}
                            className="flex gap-3"
                          >

                            <CheckCircle2
                              size={15}
                              className="mt-1 shrink-0 text-[#087E8B]"
                            />

                            <p className="text-xs leading-7 text-slate-500">
                              {text}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </article>
                );
              }
            )}

            {/* COOKIES */}

            <article
              id="cookies"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                  <Eye size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 05
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    Cookies & Analytics
                  </h2>

                </div>

              </div>

              <p className="mt-6 text-xs leading-7 text-slate-500">
                This website may use cookies or similar
                technologies to support functionality, understand
                website usage and improve the visitor experience.
                Analytics information may be used in aggregated
                or operational form to understand website
                performance.
              </p>

            </article>

            {/* RIGHTS */}

            <article
              id="rights"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                  <UserCheck size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 06
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    Your Requests
                  </h2>

                </div>

              </div>

              <p className="mt-6 text-xs leading-7 text-slate-500">
                If you have questions about information you have
                submitted through this website, or wish to request
                clarification regarding its use, please contact
                Anand Jivan Foundation Trust using the contact
                details provided below.
              </p>

            </article>

            {/* CHANGES */}

            <article
              id="changes"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                  <FileText size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 07
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    Changes to This Policy
                  </h2>

                </div>

              </div>

              <p className="mt-6 text-xs leading-7 text-slate-500">
                This privacy information may be updated from time
                to time to reflect changes in website functionality,
                organisational practices or applicable requirements.
                The latest version will be published on this page.
              </p>

            </article>

          </div>

          {/* SIDEBAR */}

          <aside className="h-fit lg:sticky lg:top-24">

            <div className="rounded-[1.5rem] bg-[#073B4C] p-6 text-white shadow-xl">

              <LockKeyhole
                size={25}
                className="text-[#F2C94C]"
              />

              <h3 className="mt-5 text-lg font-black">
                Privacy Policy
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-white/60">
                Quick navigation
              </p>

              <nav className="mt-5 space-y-1">

                <SideLink
                  href="#information"
                  label="Information We Collect"
                />

                <SideLink
                  href="#usage"
                  label="How We Use Information"
                />

                <SideLink
                  href="#protection"
                  label="Data Protection"
                />

                <SideLink
                  href="#sharing"
                  label="Information Sharing"
                />

                <SideLink
                  href="#cookies"
                  label="Cookies & Analytics"
                />

                <SideLink
                  href="#rights"
                  label="Your Requests"
                />

                <SideLink
                  href="#changes"
                  label="Policy Changes"
                />

              </nav>

            </div>

            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-6">

              <Mail
                size={22}
                className="text-[#087E8B]"
              />

              <h3 className="mt-4 text-base font-black text-[#102A43]">
                Privacy Questions?
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                Contact our team if you have questions about
                information submitted through this website.
              </p>

              <a
                href="mailto:info@ajftrust.org"
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
          PRINCIPLES
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="text-center">

            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
              Our Approach
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#102A43]">
              Privacy Principles
            </h2>

          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {principles.map(
              (principle, index) => (
                <div
                  key={`${principle}-${index}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,113,131,.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(217,154,22,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">

          <ShieldCheck
            size={29}
            className="mx-auto text-[#F2C94C]"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Questions About Your Privacy?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Our team is available to help clarify how
            information submitted through the website is
            handled.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/policies"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              All Policies
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   SIDEBAR LINK
===================================================== */

function SideLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[9px] font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
    >
      <span>{label}</span>
      <ArrowRight size={11} />
    </a>
  );
}