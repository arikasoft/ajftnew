import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
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
            <MessageSquare size={25} />
          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
            Get In Touch
          </p>

          <h1 className="mt-1.5 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            We welcome enquiries, suggestions and communication
            related to our charitable activities and initiatives.
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
          CONTACT CONTENT
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">

            {/* =================================================
                CONTACT DETAILS
            ================================================== */}

            <div className="rounded-2xl bg-[#173B4D] p-6 text-white shadow-[0_10px_35px_rgba(16,42,67,0.12)] md:p-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Contact Information
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">
                Let&apos;s connect
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55 sm:text-xs">
                For general enquiries, charitable activities,
                project-related communication or other
                organisational matters, please contact us.
              </p>

              <div className="mt-7 space-y-5">

                {/* PHONE */}

                <a
                  href="tel:+919155751363"
                  className="group flex items-start gap-3"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition group-hover:bg-[#C59A3A]">
                    <Phone size={18} />
                  </div>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-wider text-white/35">
                      Phone
                    </p>

                    <p className="mt-1 text-xs font-semibold text-white/85">
                      +91 9155751363
                    </p>

                  </div>

                </a>

                {/* EMAIL */}

                <a
                  href="mailto:info@ajftrust.org"
                  className="group flex items-start gap-3"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition group-hover:bg-[#C59A3A]">
                    <Mail size={18} />
                  </div>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-wider text-white/35">
                      Email
                    </p>

                    <p className="mt-1 text-xs font-semibold text-white/85">
                      info@ajftrust.org
                    </p>

                  </div>

                </a>

                {/* ADDRESS */}

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <MapPin size={18} />
                  </div>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-wider text-white/35">
                      Registered Address
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-white/75">
                      MABBI BELAUNA,
                      <br />
                      POST - LALSHAHPUR,
                      <br />
                      PANCHAYAT - SHAHBAJPUR,
                      <br />
                      DARBHANGA, BIHAR - 846005,
                      <br />
                      INDIA
                    </p>

                  </div>

                </div>

                {/* HOURS */}

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Clock3 size={18} />
                  </div>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-wider text-white/35">
                      Communication
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-white/75">
                      Please use phone or email for
                      enquiries and official communication.
                    </p>

                  </div>

                </div>

              </div>

              {/* IDs */}

              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.05] p-4">

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-[8px] uppercase tracking-wider text-white/30">
                      DARPAN ID
                    </p>

                    <p className="mt-1 text-[9px] font-bold text-[#D9B65A]">
                      BR/2023/0343963
                    </p>

                  </div>

                  <div>

                    <p className="text-[8px] uppercase tracking-wider text-white/30">
                      PAN
                    </p>

                    <p className="mt-1 text-[9px] font-bold text-[#D9B65A]">
                      AAJTA9323K
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                CONTACT FORM
            ================================================== */}

            <div className="rounded-2xl border border-[#DCE4EA] bg-white p-6 shadow-[0_8px_30px_rgba(16,42,67,0.05)] md:p-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                Send A Message
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                How can we help?
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                Fill in the form below and our team can
                review your enquiry.
              </p>

              <form className="mt-6 space-y-4">

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[10px] font-bold text-[#526575]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-[#FAFCFD] px-4 text-xs text-[#243B53] outline-none transition placeholder:text-[#A2AFB9] focus:border-[#176B87] focus:ring-2 focus:ring-[#176B87]/10"
                  />

                </div>

                {/* EMAIL + PHONE */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-[10px] font-bold text-[#526575]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-[#FAFCFD] px-4 text-xs text-[#243B53] outline-none transition placeholder:text-[#A2AFB9] focus:border-[#176B87] focus:ring-2 focus:ring-[#176B87]/10"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-[10px] font-bold text-[#526575]"
                    >
                      Mobile Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-[#FAFCFD] px-4 text-xs text-[#243B53] outline-none transition placeholder:text-[#A2AFB9] focus:border-[#176B87] focus:ring-2 focus:ring-[#176B87]/10"
                    />

                  </div>

                </div>

                {/* SUBJECT */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-[10px] font-bold text-[#526575]"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-[#FAFCFD] px-4 text-xs text-[#243B53] outline-none transition focus:border-[#176B87] focus:ring-2 focus:ring-[#176B87]/10"
                    defaultValue=""
                  >

                    <option value="" disabled>
                      Select an enquiry type
                    </option>

                    <option value="general">
                      General Enquiry
                    </option>

                    <option value="program">
                      Program / Project
                    </option>

                    <option value="donation">
                      Donation
                    </option>

                    <option value="partnership">
                      Partnership
                    </option>

                    <option value="volunteer">
                      Volunteer
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

                {/* MESSAGE */}

                <div>

                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[10px] font-bold text-[#526575]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write your message..."
                    required
                    className="w-full resize-none rounded-xl border border-[#DCE4EA] bg-[#FAFCFD] px-4 py-3 text-xs text-[#243B53] outline-none transition placeholder:text-[#A2AFB9] focus:border-[#176B87] focus:ring-2 focus:ring-[#176B87]/10"
                  />

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#176B87] text-xs font-bold text-white shadow-md transition hover:bg-[#12566D] hover:shadow-lg"
                >
                  Send Message
                  <ArrowRight size={15} />
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-[8px] text-[#8997A2]">
                  <ShieldCheck size={12} />
                  Your information should be used only for
                  responding to your enquiry.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK LINKS
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 text-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
              Quick Access
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43]">
              Explore AJFT
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Our Programs",
                text: "Explore our areas of work.",
                href: "/programs",
              },
              {
                title: "Projects",
                text: "Explore individual initiatives.",
                href: "/projects",
              },
              {
                title: "Transparency",
                text: "View organisational information.",
                href: "/transparency",
              },
              {
                title: "Donate",
                text: "Support our charitable work.",
                href: "/donate",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[#DCE4EA] bg-[#F7FAFC] p-5 transition hover:-translate-y-0.5 hover:border-[#176B87] hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-serif text-lg font-bold text-[#102A43] group-hover:text-[#176B87]">
                    {item.title}
                  </h3>

                  <ArrowRight
                    size={15}
                    className="text-[#C59A3A] transition group-hover:translate-x-1"
                  />

                </div>

                <p className="mt-2 text-[10px] leading-5 text-[#718394]">
                  {item.text}
                </p>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          MAP / LOCATION
      ====================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-2xl border border-[#DCE4EA] bg-white">

            <div className="grid md:grid-cols-[0.8fr_1.2fr]">

              <div className="bg-[#173B4D] p-6 text-white md:p-8">

                <MapPin
                  size={25}
                  className="text-[#D9B65A]"
                />

                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                  Our Location
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold">
                  Darbhanga, Bihar
                </h2>

                <p className="mt-3 text-[11px] leading-6 text-white/55">
                  MABBI BELAUNA,
                  <br />
                  POST - LALSHAHPUR,
                  <br />
                  PANCHAYAT - SHAHBAJPUR,
                  <br />
                  DARBHANGA, BIHAR - 846005,
                  <br />
                  INDIA
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mabbi+Belauna+Darbhanga+Bihar+846005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C59A3A] px-5 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#B48A2B]"
                >
                  Open in Maps
                  <ArrowRight size={13} />
                </a>

              </div>

              <div className="flex min-h-[300px] items-center justify-center bg-[#EAF0F3] p-8">

                <div className="text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                    <MapPin
                      size={25}
                      className="text-[#176B87]"
                    />
                  </div>

                  <p className="mt-4 font-serif text-xl font-bold text-[#102A43]">
                    Mabbi Belauna
                  </p>

                  <p className="mt-1 text-[10px] text-[#718394]">
                    Darbhanga, Bihar – 846005
                  </p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mabbi+Belauna+Darbhanga+Bihar+846005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#176B87]"
                  >
                    Get Directions
                    <ArrowRight size={13} />
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#F4F7FA] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF7E5]">

            <CheckCircle2
              size={20}
              className="text-[#C59A3A]"
            />

          </div>

          <h2 className="mt-3 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            We&apos;re here to hear from you
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            For donations, project enquiries or general
            communication, please use the contact details
            above.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <a
              href="mailto:info@ajftrust.org"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white transition hover:bg-[#12566D]"
            >
              Email Us
              <Mail size={14} />
            </a>

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              Support Our Work
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </section>

      

    </main>
  );
}