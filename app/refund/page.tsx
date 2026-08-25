import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  Heart,
  Mail,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

const refundSections = [
  {
    title: "Donation Refund Requests",
    icon: RefreshCcw,
    text: "If you believe a donation has been made incorrectly or you need to raise a refund-related request, please contact Anand Jivan Foundation Trust as soon as reasonably possible with the transaction details.",
  },
  {
    title: "Duplicate Transactions",
    icon: CreditCard,
    text: "If the same donation appears to have been charged more than once, please provide the relevant transaction references so that the payment can be reviewed.",
  },
  {
    title: "Failed or Interrupted Payments",
    icon: AlertCircle,
    text: "A payment may occasionally appear unsuccessful while the amount is temporarily debited. Such transactions should be checked against the payment gateway and bank records before a refund is requested.",
  },
  {
    title: "Refund Verification",
    icon: FileCheck2,
    text: "Refund requests may require verification of the transaction, donor details and payment reference before any eligible refund is processed.",
  },
];

const steps = [
  {
    number: "01",
    title: "Contact Us",
    text: "Send your refund request with the relevant donation and transaction details.",
  },
  {
    number: "02",
    title: "Verification",
    text: "Our team reviews the transaction and verifies the information provided.",
  },
  {
    number: "03",
    title: "Decision",
    text: "The request is assessed according to the applicable donation and payment terms.",
  },
  {
    number: "04",
    title: "Processing",
    text: "If approved, the applicable refund process is initiated through the relevant payment channel.",
  },
];

export default function RefundPage() {
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

              <RefreshCcw
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                Donation Refund Policy
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Refund &
              <span className="block text-[#F2C94C]">
                Cancellation
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Information for donors regarding payment issues,
              duplicate transactions, refund requests and
              donation-related enquiries.
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

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D99A16]/10 text-[#D99A16]">

              <AlertCircle size={22} />

            </div>

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D99A16]">
                Important Information
              </p>

              <h2 className="mt-2 text-xl font-black text-[#102A43]">
                Please Check Your Transaction Before Requesting a Refund
              </h2>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Payment status can sometimes take time to update.
                Please check your bank or payment-gateway transaction
                status before submitting a refund request. This helps
                avoid duplicate requests and unnecessary delays.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          REFUND CONDITIONS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="mb-9">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            Refund Information
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
            When You Need Help With a Payment
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            The following situations can be raised with our team
            for review.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {refundSections.map(
            (section, index) => {

              const Icon = section.icon;

              return (
                <article
                  key={`${section.title}-${index}`}
                  className="group rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B] transition group-hover:bg-[#087E8B] group-hover:text-white">

                    <Icon size={21} />

                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#102A43]">
                    {section.title}
                  </h3>

                  <p className="mt-3 text-xs leading-7 text-slate-500">
                    {section.text}
                  </p>

                </article>
              );
            }
          )}

        </div>

      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="border-y border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

          <div className="text-center">

            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
              Refund Process
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
              How to Raise a Request
            </h2>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">

            {steps.map(
              (step, index) => (
                <div
                  key={`${step.number}-${index}`}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <span className="text-3xl font-black text-[#D99A16]">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-base font-black text-[#102A43]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-slate-500">
                    {step.text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          INFORMATION REQUIRED
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-8">

        <div className="grid gap-7 lg:grid-cols-[1fr_360px]">

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

            <div className="flex items-center gap-3">

              <FileCheck2
                size={24}
                className="text-[#087E8B]"
              />

              <h2 className="text-2xl font-black text-[#102A43]">
                Information to Include
              </h2>

            </div>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              To help us investigate a transaction efficiently,
              please include as much of the following information
              as available:
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {[
                "Donor name",
                "Email address",
                "Donation date",
                "Donation amount",
                "Transaction / payment reference",
                "Payment method",
                "Reason for refund request",
                "Relevant supporting details",
              ].map(
                (item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-3 rounded-xl bg-[#F5F8F7] px-4 py-3"
                  >

                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-[#087E8B]"
                    />

                    <span className="text-[10px] font-bold text-slate-600">
                      {item}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          <div className="rounded-[2rem] bg-[#073B4C] p-7 text-white shadow-xl sm:p-8">

            <Clock3
              size={27}
              className="text-[#F2C94C]"
            />

            <h2 className="mt-5 text-xl font-black">
              Processing Time
            </h2>

            <p className="mt-3 text-xs leading-6 text-white/65">
              Refund requests may require verification before
              processing. The actual time for a completed refund
              may also depend on the payment gateway, bank or
              financial institution involved.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">

              <p className="text-[9px] font-black uppercase tracking-wider text-[#F2C94C]">
                Please Note
              </p>

              <p className="mt-2 text-[10px] leading-5 text-white/60">
                A refund request does not automatically mean that
                a refund will be approved. Each request may be
                reviewed based on the transaction circumstances
                and applicable terms.
              </p>

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

          <Mail
            size={29}
            className="mx-auto text-[#F2C94C]"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Need Help With a Donation?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Contact our team with your transaction details and
            we will review your request.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <a
              href="mailto:info@ajftrust.org?subject=Donation%20Refund%20Request"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-6 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
            >
              <Mail size={14} />
              Email Refund Request
            </a>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUPPORT
      ====================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:px-10">

          <Heart
            size={27}
            className="mx-auto text-[#D99A16]"
            fill="currentColor"
          />

          <h2 className="mt-4 text-2xl font-black text-[#102A43]">
            Thank You for Supporting Our Work
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-slate-500">
            Your contribution supports charitable and
            community-focused initiatives of Anand Jivan
            Foundation Trust.
          </p>

          <Link
            href="/donate"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#087E8B] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#066C77]"
          >
            <Heart
              size={14}
              fill="currentColor"
            />
            Donate Now
          </Link>

        </div>

      </section>

    </main>
  );
}