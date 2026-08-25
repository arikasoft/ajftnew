import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  Landmark,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

const transparencyAreas = [
  {
    icon: Landmark,
    title: "Organisational Information",
    text: "Information about the Trust, its identity, governance and charitable activities.",
    href: "/about",
  },
  {
    icon: FileText,
    title: "Annual Reports",
    text: "Reports and organisational disclosures can provide a structured view of activities and progress.",
    href: "/reports",
  },
  {
    icon: BarChart3,
    title: "Financial Information",
    text: "Relevant financial and utilisation information can be presented through appropriate records and disclosures.",
    href: "/transparency/financial",
  },
  {
    icon: ReceiptText,
    title: "Donation Records",
    text: "Donation receipts include transaction and verification information for the donor.",
    href: "/verify",
  },
];

const principles = [
  {
    number: "01",
    title: "Accuracy",
    text: "Maintain appropriate and accurate organisational records.",
  },
  {
    number: "02",
    title: "Documentation",
    text: "Keep relevant supporting documents for activities and transactions.",
  },
  {
    number: "03",
    title: "Accountability",
    text: "Use appropriate processes for responsible management of resources.",
  },
  {
    number: "04",
    title: "Disclosure",
    text: "Present relevant information through suitable reports and records.",
  },
  {
    number: "05",
    title: "Verification",
    text: "Enable appropriate verification of donation receipts and records.",
  },
  {
    number: "06",
    title: "Continuous Improvement",
    text: "Strengthen systems and processes as the organisation develops.",
  },
];

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#102A43] px-4 py-10 sm:px-5 sm:py-12">

        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#C59A3A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59A3A] text-white shadow-lg">
            <ShieldCheck size={25} />
          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
            Accountability & Disclosure
          </p>

          <h1 className="mt-1.5 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Transparency
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            Responsible governance, appropriate documentation and
            transparent communication are important to building
            trust with our stakeholders.
          </p>

        </div>

      </section>

      {/* =====================================================
          TRUST BAR
      ====================================================== */}

      <section className="border-b border-[#DCE4EA] bg-white">

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-[8px] font-semibold text-[#687B8C] sm:text-[9px]">

          <span>DARPAN ID: BR/2023/0343963</span>

          <span className="text-[#C59A3A]">•</span>

          <span>PAN: AAJTA9323K</span>

          <span className="text-[#C59A3A]">•</span>

          <span>+91 9155751363</span>

          <span className="text-[#C59A3A]">•</span>

          <span>info@ajftrust.org</span>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6 shadow-[0_8px_30px_rgba(16,42,67,0.05)] md:p-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                Our Commitment
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                Transparency builds trust
              </h2>

              <div className="mt-4 space-y-3 text-[11px] leading-6 text-[#627789] sm:text-xs">

                <p>
                  Anand Jivan Foundation Trust seeks to maintain
                  appropriate organisational records and communicate
                  relevant information responsibly.
                </p>

                <p>
                  Transparency includes clear organisational
                  information, suitable documentation, responsible
                  financial processes and appropriate reporting.
                </p>

                <p>
                  Where information is made available publicly,
                  it should be presented in a clear and useful
                  manner so that stakeholders can understand
                  the Trust&apos;s work.
                </p>

              </div>

            </div>

            {/* HIGHLIGHT */}

            <div className="rounded-2xl bg-[#173B4D] p-6 text-white shadow-[0_8px_30px_rgba(16,42,67,0.12)] md:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C59A3A]">
                <LockKeyhole size={21} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Responsible Stewardship
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Trust through responsibility
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55">
                Appropriate systems help protect organisational
                records, donor information and charitable resources.
              </p>

              <div className="mt-5 space-y-2.5">

                {[
                  "Responsible record keeping",
                  "Appropriate documentation",
                  "Donation verification",
                  "Financial accountability",
                  "Organisational reporting",
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
          TRANSPARENCY AREAS
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
              Information Areas
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
              What We Make Accessible
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
              Explore the different sections through which
              organisational and activity-related information
              can be presented.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {transparencyAreas.map(
              ({
                icon: Icon,
                title,
                text,
                href,
              }) => (
                <Link
                  key={title}
                  href={href}
                  className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:-translate-y-0.5 hover:border-[#176B87] hover:shadow-md"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3F6]">

                      <Icon
                        size={21}
                        className="text-[#176B87]"
                      />

                    </div>

                    <ArrowRight
                      size={15}
                      className="text-[#C59A3A] transition group-hover:translate-x-1"
                    />

                  </div>

                  <h3 className="mt-4 font-serif text-lg font-bold text-[#102A43] group-hover:text-[#176B87]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                    {text}
                  </p>

                </Link>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}

      <section className="bg-[#173B4D] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Our Principles
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                How we approach accountability
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55 sm:text-xs">
                Transparency is supported by practical systems,
                documentation and responsible organisational
                processes.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">

              {principles.map((item) => (
                <div
                  key={item.number}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C59A3A]">

                    <span className="text-[9px] font-bold text-white">
                      {item.number}
                    </span>

                  </div>

                  <h3 className="mt-3 text-[11px] font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-white/45">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINANCIAL TRANSPARENCY
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 md:grid-cols-3">

            {/* FINANCIAL */}

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6">

              <WalletCards
                size={24}
                className="text-[#176B87]"
              />

              <h3 className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                Financial Information
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Financial information should be maintained and
                presented through appropriate records, statements
                and disclosures.
              </p>

              <Link
                href="/transparency/financial"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
              >
                Financial Information
                <ArrowRight size={13} />
              </Link>

            </div>

            {/* REPORTS */}

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6">

              <ClipboardCheck
                size={24}
                className="text-[#176B87]"
              />

              <h3 className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                Reports
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Annual and activity reports can provide useful
                information about the Trust&apos;s work and progress.
              </p>

              <Link
                href="/reports"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
              >
                View Reports
                <ArrowRight size={13} />
              </Link>

            </div>

            {/* RECEIPTS */}

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6">

              <ReceiptText
                size={24}
                className="text-[#176B87]"
              />

              <h3 className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                Receipt Verification
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Donors can use the online verification facility
                to check an AJFT donation receipt.
              </p>

              <Link
                href="/verify"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
              >
                Verify Receipt
                <ArrowRight size={13} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DONOR CONFIDENCE
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-6 text-center md:p-8">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3F6]">

            <HeartHandshake
              size={20}
              className="text-[#176B87]"
            />

          </div>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            For Our Donors & Stakeholders
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43]">
            Your trust matters
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            We recognise the importance of responsible
            communication and appropriate documentation
            in maintaining stakeholder confidence.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/reports"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white transition hover:bg-[#12566D]"
            >
              View Reports
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/verify"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Verify Receipt
              <ShieldCheck size={14} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#F4F7FA] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            Support responsible charitable work
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            Learn about our work, explore our projects or
            support our charitable initiatives.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/projects"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Explore Projects
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white shadow-md transition hover:bg-[#12566D]"
            >
              Donate Now
              <HeartHandshake size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#102A43] px-4 py-6 text-center">

        <p className="text-[9px] font-bold tracking-wide text-white">
          ANAND JIVAN FOUNDATION TRUST
        </p>

        <p className="mx-auto mt-1 max-w-2xl text-[8px] leading-4 text-white/45">
          MABBI BELAUNA, POST - LALSHAHPUR,
          PANCHAYAT - SHAHBAJPUR,
          DARBHANGA, BIHAR - 846005, INDIA
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[8px] text-[#D9B65A]">
          <span>DARPAN ID: BR/2023/0343963</span>
          <span>•</span>
          <span>PAN: AAJTA9323K</span>
          <span>•</span>
          <span>+91 9155751363</span>
          <span>•</span>
          <span>info@ajftrust.org</span>
        </div>

      </footer>

    </main>
  );
}