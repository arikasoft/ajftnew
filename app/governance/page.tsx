import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Landmark,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";

const governancePrinciples = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    text: "We aim to maintain clear, responsible and transparent organisational practices.",
  },
  {
    icon: Scale,
    title: "Accountability",
    text: "Responsibilities are approached with integrity and proper stewardship of resources.",
  },
  {
    icon: Users,
    title: "Participation",
    text: "Community participation and collaboration are important to meaningful development.",
  },
  {
    icon: FileCheck2,
    title: "Compliance",
    text: "The Trust seeks to maintain appropriate records and organisational documentation.",
  },
];

const governanceAreas = [
  "Trust administration",
  "Programme oversight",
  "Financial responsibility",
  "Documentation & records",
  "Community engagement",
  "Partner coordination",
];

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#102A43] px-4 py-9 sm:px-5 sm:py-11">

        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#C59A3A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59A3A] text-white shadow-lg">

            <Landmark size={25} />

          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Governance
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            Responsible governance, accountability and
            transparent organisational practices.
          </p>

        </div>

      </section>

      {/* =====================================================
          TRUST IDENTITY BAR
      ====================================================== */}

      <section className="border-b border-[#DCE4EA] bg-white">

        <div className="mx-auto max-w-6xl px-4 py-4 text-center">

          <h2 className="font-serif text-lg font-bold text-[#102A43]">
            ANAND JIVAN FOUNDATION TRUST
          </h2>

          <p className="mx-auto mt-1 max-w-3xl text-[9px] leading-5 text-gray-500 sm:text-[10px]">
            MABBI BELAUNA, POST - LALSHAHPUR,
            PANCHAYAT - SHAHBAJPUR,
            DARBHANGA, BIHAR - 846005, INDIA
          </p>

          <div className="mt-1.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[9px] font-semibold text-[#9A7626]">

            <span>
              DARPAN ID: BR/2023/0343963
            </span>

            <span>
              PAN: AAJTA9323K
            </span>

            <span>
              +91 9155751363
            </span>

            <span>
              info@ajftrust.org
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="px-4 py-8 sm:px-5 md:py-10">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

            {/* CONTENT */}

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6 shadow-[0_8px_30px_rgba(16,42,67,0.06)] md:p-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                Governance Framework
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                Responsible stewardship
              </h2>

              <div className="mt-4 space-y-3 text-[11px] leading-6 text-[#627789] sm:text-xs">

                <p>
                  Good governance provides the foundation
                  for responsible charitable work. At Anand
                  Jivan Foundation Trust, organisational
                  responsibilities are approached with
                  integrity, accountability and a commitment
                  to serving the intended social purpose.
                </p>

                <p>
                  Our governance approach focuses on
                  appropriate administration, documentation,
                  oversight of activities and responsible
                  management of resources entrusted to the
                  Trust.
                </p>

                <p>
                  We also recognise the importance of
                  communication with stakeholders,
                  beneficiaries, supporters and partner
                  organisations.
                </p>

              </div>

            </div>

            {/* HIGHLIGHT */}

            <div className="rounded-2xl bg-[#173B4D] p-6 text-white shadow-[0_8px_30px_rgba(16,42,67,0.12)] md:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C59A3A]">

                <ShieldCheck size={22} />

              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Our Approach
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Trust through responsibility.
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55">
                We believe that responsible governance
                strengthens confidence among communities,
                supporters and partners.
              </p>

              <div className="mt-5 space-y-2.5">

                {[
                  "Clear responsibilities",
                  "Responsible resource management",
                  "Proper documentation",
                  "Stakeholder communication",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 border-b border-white/10 pb-2.5 last:border-0"
                  >

                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-[#D9B65A]"
                    />

                    <span className="text-[10px] font-semibold text-white/75">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          GOVERNANCE PRINCIPLES
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
              Core Principles
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
              Principles of Good Governance
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {governancePrinciples.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F3F6]">

                    <Icon
                      size={19}
                      className="text-[#176B87]"
                    />

                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#102A43]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#718394]">
                    {text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          MANAGEMENT AREAS
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                Organisational Oversight
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                Areas of Governance
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-[#627789] sm:text-xs">
                Governance responsibilities can cover
                administration, programmes, finance,
                documentation and stakeholder engagement.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {governanceAreas.map(
                (area, index) => (
                  <div
                    key={area}
                    className="rounded-xl border border-[#DCE4EA] bg-white p-4 shadow-sm"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F3F6]">

                      <span className="text-[9px] font-bold text-[#176B87]">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                    </div>

                    <p className="mt-3 text-[10px] font-semibold leading-4 text-[#102A43]">
                      {area}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATUTORY / IDENTITY
      ====================================================== */}

      <section className="bg-[#F7FAFC] px-4 py-8 sm:px-5 md:py-10">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6 md:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                  Organisation Identity
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43]">
                  Trust Information
                </h2>

                <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                  The following information identifies
                  Anand Jivan Foundation Trust for
                  organisational and public reference.
                </p>

              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F3F6]">

                <FileCheck2
                  size={25}
                  className="text-[#176B87]"
                />

              </div>

            </div>

            <div className="mt-6 grid gap-2.5 border-t border-[#E8EDF0] pt-5 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-[#F7FAFC] p-4">

                <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                  DARPAN ID
                </p>

                <p className="mt-1 text-[11px] font-bold text-[#102A43]">
                  BR/2023/0343963
                </p>

              </div>

              <div className="rounded-xl bg-[#F7FAFC] p-4">

                <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                  PAN
                </p>

                <p className="mt-1 text-[11px] font-bold text-[#102A43]">
                  AAJTA9323K
                </p>

              </div>

              <div className="rounded-xl bg-[#F7FAFC] p-4">

                <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                  PHONE
                </p>

                <p className="mt-1 text-[11px] font-bold text-[#102A43]">
                  +91 9155751363
                </p>

              </div>

              <div className="rounded-xl bg-[#F7FAFC] p-4">

                <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                  EMAIL
                </p>

                <p className="mt-1 break-all text-[11px] font-bold text-[#102A43]">
                  info@ajftrust.org
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT / CTA
      ====================================================== */}

      <section className="bg-[#173B4D] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
            Connect With Us
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Transparency begins with communication.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[11px] leading-6 text-white/55 sm:text-xs">
            For organisational information or general
            enquiries, you can contact Anand Jivan
            Foundation Trust.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">

            <a
              href="tel:+919155751363"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#C59A3A] px-5 text-xs font-bold text-white transition hover:bg-[#B48A2B]"
            >

              <Phone size={14} />

              +91 9155751363

            </a>

            <a
              href="mailto:info@ajftrust.org"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/15"
            >

              <Mail size={14} />

              info@ajftrust.org

            </a>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-xs font-bold text-white transition hover:bg-white/10"
            >

              Contact Page

              <ArrowRight size={14} />

            </Link>

          </div>

        </div>

      </section>

     

    </main>
  );
}