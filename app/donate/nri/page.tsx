"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  FileText,
  Send,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

import type { ReactNode } from "react";

export default function NRIDonationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);

    // ------------------------------------------------------
    // NRI enquiry API can be connected later.
    // ------------------------------------------------------

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F3F7F8] text-[#193247]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#123B4A]">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#2A8C9E]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6A83C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-12 text-center md:py-14">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6A83C] shadow-lg">

            <Globe2
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Global Support
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            NRI / International Donation
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Thank you for your interest in supporting
            the charitable work of Anand Jivan Foundation Trust.
          </p>

        </div>

      </section>

      {/* =====================================================
          BACK NAVIGATION
      ====================================================== */}

      <div className="border-b border-[#D8E5E8] bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <Link
            href="/donate"
            className="flex items-center gap-2 text-[9px] font-bold text-[#16758A] transition hover:text-[#B48726]"
          >
            <ArrowLeft size={13} />
            Back to Donation
          </Link>

          <span className="hidden text-[8px] font-semibold text-gray-400 sm:block">
            International Support
          </span>

        </div>

      </div>

      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">

            {/* =================================================
                LEFT INFORMATION
            ================================================== */}

            <div className="rounded-2xl bg-[#123B4A] p-6 text-white">

              <div className="flex items-center gap-2">

                <Globe2
                  size={17}
                  className="text-[#D6A83C]"
                />

                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#E7C96B]">
                  International Support
                </span>

              </div>

              <h2 className="mt-3 font-serif text-2xl font-bold">
                Support from anywhere in the world.
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-white/55">
                We appreciate supporters living outside
                India who wish to contribute to charitable
                and community-focused activities.
              </p>

              {/* FEATURES */}

              <div className="mt-6 space-y-3">

                <InfoItem
                  icon={<FileText size={16} />}
                  title="Donation Information"
                  text="Submit your details so our team can guide you through the applicable process."
                />

                <InfoItem
                  icon={<ShieldCheck size={16} />}
                  title="Compliance First"
                  text="International contributions are subject to applicable legal and regulatory requirements."
                />

                <InfoItem
                  icon={<CheckCircle2 size={16} />}
                  title="Donation Record"
                  text="Our team can provide the appropriate donation and receipt information."
                />

              </div>

              {/* CONTACT */}

              <div className="mt-6 border-t border-white/10 pt-5">

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#E7C96B]">
                  Contact AJFT
                </p>

                <div className="mt-3 space-y-2">

                  <a
                    href="mailto:info@ajftrust.org"
                    className="flex items-center gap-2 text-[9px] text-white/65 transition hover:text-white"
                  >
                    <Mail size={13} />
                    info@ajftrust.org
                  </a>

                  <a
                    href="tel:+919155751363"
                    className="flex items-center gap-2 text-[9px] text-white/65 transition hover:text-white"
                  >
                    <Phone size={13} />
                    +91 9155751363
                  </a>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT FORM
            ================================================== */}

            <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 shadow-[0_8px_30px_rgba(18,59,74,0.06)] sm:p-6">

              {!submitted ? (
                <>
                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                      NRI Donor Enquiry
                    </p>

                    <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                      Tell Us About Yourself
                    </h2>

                    <p className="mt-2 text-[9px] leading-5 text-gray-500">
                      Submit your information and our team
                      will guide you regarding the applicable
                      international donation process.
                    </p>

                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-5"
                  >

                    {/* NAME / COUNTRY */}

                    <div className="grid gap-3 sm:grid-cols-2">

                      <FormInput
                        id="name"
                        name="name"
                        label="Full Name"
                        placeholder="Your full name"
                        required
                      />

                      <FormInput
                        id="country"
                        name="country"
                        label="Country"
                        placeholder="Country of residence"
                        required
                      />

                    </div>

                    {/* EMAIL / PHONE */}

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">

                      <FormInput
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />

                      <FormInput
                        id="mobile"
                        name="mobile"
                        label="Mobile / WhatsApp"
                        type="tel"
                        placeholder="+Country Code"
                        required
                      />

                    </div>

                    {/* ADDRESS */}

                    <div className="mt-3">

                      <label
                        htmlFor="address"
                        className="mb-1.5 block text-[9px] font-bold text-[#526575]"
                      >
                        Address
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        placeholder="Your current address"
                        className="w-full resize-none rounded-lg border border-[#D7E0E6] px-3 py-2.5 text-xs text-[#123B4A] outline-none placeholder:text-gray-400 focus:border-[#16758A] focus:ring-2 focus:ring-[#16758A]/10"
                      />

                    </div>

                    {/* DONATION PURPOSE */}

                    <div className="mt-3">

                      <label
                        htmlFor="purpose"
                        className="mb-1.5 block text-[9px] font-bold text-[#526575]"
                      >
                        Donation Purpose
                      </label>

                      <select
                        id="purpose"
                        name="purpose"
                        className="h-10 w-full rounded-lg border border-[#D7E0E6] bg-white px-3 text-xs text-[#123B4A] outline-none focus:border-[#16758A]"
                      >
                        <option value="">
                          Select purpose
                        </option>

                        <option value="education">
                          Education
                        </option>

                        <option value="healthcare">
                          Healthcare
                        </option>

                        <option value="water">
                          Drinking Water
                        </option>

                        <option value="women">
                          Women Empowerment
                        </option>

                        <option value="environment">
                          Environment
                        </option>

                        <option value="social-welfare">
                          Social Welfare
                        </option>

                        <option value="general">
                          General Donation
                        </option>

                      </select>

                    </div>

                    {/* EXPECTED AMOUNT */}

                    <div className="mt-3">

                      <label
                        htmlFor="amount"
                        className="mb-1.5 block text-[9px] font-bold text-[#526575]"
                      >
                        Expected Donation Amount
                      </label>

                      <div className="flex overflow-hidden rounded-lg border border-[#D7E0E6]">

                        <select
                          name="currency"
                          className="h-10 border-r border-[#D7E0E6] bg-[#F5F8F9] px-2 text-[10px] font-bold text-[#16758A] outline-none"
                        >
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                          <option>AED</option>
                          <option>CAD</option>
                          <option>AUD</option>
                          <option>OTHER</option>
                        </select>

                        <input
                          id="amount"
                          name="amount"
                          type="number"
                          min="1"
                          placeholder="Amount"
                          className="h-10 w-full px-3 text-xs outline-none"
                        />

                      </div>

                    </div>

                    {/* MESSAGE */}

                    <div className="mt-3">

                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-[9px] font-bold text-[#526575]"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Tell us how you would like to support our work..."
                        className="w-full resize-none rounded-lg border border-[#D7E0E6] px-3 py-2.5 text-xs text-[#123B4A] outline-none placeholder:text-gray-400 focus:border-[#16758A] focus:ring-2 focus:ring-[#16758A]/10"
                      />

                    </div>

                    {/* NOTICE */}

                    <div className="mt-4 rounded-xl border border-[#E7D6A8] bg-[#FFFBEF] p-3">

                      <div className="flex gap-2">

                        <ShieldCheck
                          size={15}
                          className="mt-0.5 shrink-0 text-[#B18428]"
                        />

                        <p className="text-[8px] leading-4 text-gray-600">
                          International contributions are
                          subject to applicable legal,
                          regulatory and receiving-account
                          requirements. Submission of this
                          form is an enquiry and does not
                          itself constitute a payment.
                        </p>

                      </div>

                    </div>

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#16758A] text-xs font-bold text-white shadow-sm transition hover:bg-[#125E70] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit NRI Donation Enquiry
                          <Send size={14} />
                        </>
                      )}

                    </button>

                  </form>
                </>
              ) : (
                /* =================================================
                   SUCCESS
                ================================================== */

                <div className="flex min-h-[480px] flex-col items-center justify-center text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F6ED]">

                    <CheckCircle2
                      size={34}
                      className="text-[#17824D]"
                    />

                  </div>

                  <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                    Enquiry Received
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#123B4A]">
                    Thank You
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-[10px] leading-5 text-gray-500">
                    Your NRI donation enquiry has been
                    received. Our team will contact you
                    using the information provided.
                  </p>

                  <div className="mt-6 grid w-full max-w-sm gap-2 sm:grid-cols-2">

                    <a
                      href="mailto:info@ajftrust.org"
                      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#D8E5E8] text-[9px] font-bold text-[#16758A]"
                    >
                      <Mail size={13} />
                      Email Us
                    </a>

                    <a
                      href="tel:+919155751363"
                      className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#16758A] text-[9px] font-bold text-white"
                    >
                      <Phone size={13} />
                      Call Us
                    </a>

                  </div>

                  <Link
                    href="/donate"
                    className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-[#16758A]"
                  >
                    <ArrowLeft size={13} />
                    Back to Donation
                  </Link>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRUST DETAILS
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-7 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-3 sm:grid-cols-3">

            <TrustCard
              title="Anand Jivan Foundation Trust"
              text="Registered Public Charitable Trust"
            />

            <TrustCard
              title="DARPAN ID"
              text="BR/2023/0343963"
            />

            <TrustCard
              title="PAN"
              text="AAJTA9323K"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          OFFICE
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-7">

        <div className="mx-auto max-w-4xl rounded-2xl border border-[#D8E5E8] bg-white p-5 text-center">

          <MapPin
            size={19}
            className="mx-auto text-[#16758A]"
          />

          <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
            Registered Office
          </p>

          <h3 className="mt-1 font-serif text-lg font-bold text-[#123B4A]">
            MABBI BELAUNA, DARBHANGA
          </h3>

          <p className="mx-auto mt-1 max-w-2xl text-[9px] leading-5 text-gray-500">
            POST - LALSHAHPUR, PANCHAYAT -
            SHAHBAJPUR, DARBHANGA, BIHAR -
            846005, INDIA
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-4">

            <a
              href="tel:+919155751363"
              className="flex items-center gap-1.5 text-[9px] font-semibold text-[#16758A]"
            >
              <Phone size={12} />
              +91 9155751363
            </a>

            <a
              href="mailto:info@ajftrust.org"
              className="flex items-center gap-1.5 text-[9px] font-semibold text-[#16758A]"
            >
              <Mail size={12} />
              info@ajftrust.org
            </a>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-8 text-center">

        <Heart
          size={20}
          fill="currentColor"
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-xl font-bold text-white">
          Thank You for Supporting Our Mission
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          Your interest in supporting charitable work
          makes a meaningful difference.
        </p>

        <Link
          href="/donate"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-[9px] font-bold text-white transition hover:border-[#D6A83C] hover:text-[#D6A83C]"
        >
          Back to Donation
          <ArrowLeft size={12} />
        </Link>

      </section>

    </main>
  );
}

/* ==========================================================
   FORM INPUT
========================================================== */

function FormInput({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label
        htmlFor={id}
        className="mb-1.5 block text-[9px] font-bold text-[#526575]"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#D7E0E6] bg-white px-3 text-xs text-[#123B4A] outline-none transition placeholder:text-gray-400 focus:border-[#16758A] focus:ring-2 focus:ring-[#16758A]/10"
      />

    </div>
  );
}

/* ==========================================================
   INFO ITEM
========================================================== */

function InfoItem({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D6A83C] text-white">
        {icon}
      </div>

      <div>

        <p className="text-[10px] font-bold text-white">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-white/45">
          {text}
        </p>

      </div>

    </div>
  );
}

/* ==========================================================
   TRUST CARD
========================================================== */

function TrustCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4 text-center">

      <CheckCircle2
        size={17}
        className="mx-auto text-[#16758A]"
      />

      <p className="mt-2 text-[10px] font-bold text-[#123B4A]">
        {title}
      </p>

      <p className="mt-1 text-[8px] text-gray-500">
        {text}
      </p>

    </div>
  );
}