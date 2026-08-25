import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Gavel,
  Globe2,
  Heart,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    icon: FileCheck2,
    text: "By accessing or using the Anand Jivan Foundation Trust website, you acknowledge that you have read and understood these Terms and agree to use the website responsibly and in accordance with applicable laws.",
  },
  {
    id: "website-use",
    number: "02",
    title: "Use of the Website",
    icon: Globe2,
    text: "The website is provided for information, communication, charitable activities, programme information and related purposes. Users should not use the website for unlawful, fraudulent, abusive or unauthorised activities.",
  },
  {
    id: "content",
    number: "03",
    title: "Website Content",
    icon: FileCheck2,
    text: "Information, photographs, graphics, documents and other materials published on this website are provided for general informational and organisational purposes. Reasonable efforts may be made to keep information accurate and updated.",
  },
  {
    id: "donations",
    number: "04",
    title: "Donations & Payments",
    icon: Heart,
    text: "Where online donations or payments are available, transactions may be processed through applicable payment service providers. Donors should review the relevant donation, payment and refund information before completing a transaction.",
  },
  {
    id: "intellectual",
    number: "05",
    title: "Intellectual Property",
    icon: ShieldCheck,
    text: "Unless otherwise stated, website content including organisational branding, text, graphics and original materials should not be reproduced, copied, modified or commercially exploited without appropriate permission.",
  },
  {
    id: "external",
    number: "06",
    title: "External Links",
    icon: Globe2,
    text: "The website may contain links to external websites or social media platforms. Anand Jivan Foundation Trust is not responsible for the content, availability or privacy practices of third-party websites.",
  },
  {
    id: "liability",
    number: "07",
    title: "Limitation of Liability",
    icon: Gavel,
    text: "To the extent permitted by applicable law, the Trust shall not be responsible for losses arising from temporary website unavailability, technical interruptions, third-party services or reliance on general information published on the website.",
  },
  {
    id: "changes",
    number: "08",
    title: "Changes to These Terms",
    icon: FileCheck2,
    text: "These Terms may be updated from time to time to reflect changes in website functionality, organisational practices or applicable requirements. Updated terms will be published on this page.",
  },
];

const principles = [
  "Responsible website use",
  "Respect for people and communities",
  "Protection of organisational content",
  "Responsible donation activity",
  "Compliance with applicable law",
  "Respect for third-party rights",
];

export default function TermsPage() {
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

              <Gavel
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                Website Terms
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Terms of
              <span className="block text-[#F2C94C]">
                Use
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              These terms describe the general conditions
              governing access to and use of the Anand Jivan
              Foundation Trust website.
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
          INTRO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-8">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087E8B]/10 text-[#087E8B]">

              <ShieldCheck size={30} />

            </div>

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
                Anand Jivan Foundation Trust
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#102A43]">
                Responsible & Respectful Use
              </h2>

              <p className="mt-3 max-w-4xl text-xs leading-6 text-slate-500">
                We want this website to remain a useful,
                trustworthy and accessible source of information
                for beneficiaries, donors, volunteers, partners
                and members of the public.
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

          {/* MAIN CONTENT */}

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

            {/* USER RESPONSIBILITIES */}

            <article
              id="responsibilities"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                  <UserCheck size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 09
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    User Responsibilities
                  </h2>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                {[
                  "Use the website only for lawful and legitimate purposes.",
                  "Do not attempt to gain unauthorised access to website systems or data.",
                  "Do not knowingly submit false, misleading or fraudulent information.",
                  "Do not upload harmful code, malicious files or content intended to disrupt the website.",
                  "Respect the privacy, dignity and rights of other people.",
                ].map((item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="flex gap-3"
                  >

                    <CheckCircle2
                      size={15}
                      className="mt-1 shrink-0 text-[#087E8B]"
                    />

                    <p className="text-xs leading-6 text-slate-500">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </article>

            {/* GOVERNING LAW */}

            <article
              id="law"
              className="scroll-mt-24 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">

                  <Gavel size={20} />

                </div>

                <div>

                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D99A16]">
                    Section 10
                  </span>

                  <h2 className="mt-1 text-xl font-black text-[#102A43]">
                    Applicable Law
                  </h2>

                </div>

              </div>

              <p className="mt-6 text-xs leading-7 text-slate-500">
                These Terms are intended to be interpreted in
                accordance with applicable laws and regulations.
                Any dispute relating to the website or its use
                shall be addressed through the appropriate legal
                process and jurisdiction applicable to Anand Jivan
                Foundation Trust.
              </p>

            </article>

          </div>

          {/* SIDEBAR */}

          <aside className="h-fit lg:sticky lg:top-24">

            <div className="rounded-[1.5rem] bg-[#073B4C] p-6 text-white shadow-xl">

              <Gavel
                size={25}
                className="text-[#F2C94C]"
              />

              <h3 className="mt-5 text-lg font-black">
                Terms of Use
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-white/60">
                Quick navigation
              </p>

              <nav className="mt-5 space-y-1">

                <SideLink
                  href="#acceptance"
                  label="Acceptance"
                />

                <SideLink
                  href="#website-use"
                  label="Website Use"
                />

                <SideLink
                  href="#content"
                  label="Website Content"
                />

                <SideLink
                  href="#donations"
                  label="Donations & Payments"
                />

                <SideLink
                  href="#intellectual"
                  label="Intellectual Property"
                />

                <SideLink
                  href="#external"
                  label="External Links"
                />

                <SideLink
                  href="#liability"
                  label="Limitation of Liability"
                />

                <SideLink
                  href="#changes"
                  label="Changes"
                />

                <SideLink
                  href="#responsibilities"
                  label="Responsibilities"
                />

                <SideLink
                  href="#law"
                  label="Applicable Law"
                />

              </nav>

            </div>

            {/* CONTACT */}

            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-6">

              <Mail
                size={22}
                className="text-[#087E8B]"
              />

              <h3 className="mt-4 text-base font-black text-[#102A43]">
                Questions?
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                If you have questions about these terms,
                please contact the Trust.
              </p>

              <a
                href="mailto:info@ajftrust.org?subject=Website%20Terms%20Enquiry"
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
              Our Standards
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#102A43]">
              Responsible Use Principles
            </h2>

          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {principles.map((principle, index) => (

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

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          RELATED LINKS
      ====================================================== */}

      <section className="bg-[#F5F8F7]">

        <div className="mx-auto max-w-5xl px-6 py-14 text-center sm:px-10">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            Related Information
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43]">
            Explore Our Policies
          </h2>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/privacy"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
            >
              Privacy Policy
              <ArrowRight size={14} />
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

          <Heart
            size={29}
            className="mx-auto text-[#F2C94C]"
            fill="currentColor"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Thank You for Visiting AJFT
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            We appreciate your interest in Anand Jivan
            Foundation Trust and our community-focused work.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
            >
              Back to Home
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