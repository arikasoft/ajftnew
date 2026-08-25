import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

/* ==========================================================
   STATIC TRUST INFORMATION
   ========================================================== */

const TRUST = {
  name: "Anand Jivan Foundation Trust",
  shortName: "AJFT",
  darpan: "BR/2023/0343963",
  pan: "AAJTA9323K",
  phone: "+91 9155751363",
  email: "info@ajftrust.org",
  address:
    "MABBI BELAUNA, POST - LALSHAHPUR, PANCHAYAT - SHAHBAJPUR, DARBHANGA, BIHAR - 846005, INDIA",
};

/* ==========================================================
   AREAS OF WORK
   ========================================================== */

const areasOfWork = [
  {
    number: "01",
    title: "Education",
    text: "Supporting meaningful learning opportunities and stronger educational environments.",
  },
  {
    number: "02",
    title: "Community Development",
    text: "Contributing to initiatives that strengthen local communities and social infrastructure.",
  },
  {
    number: "03",
    title: "Health & Well-being",
    text: "Supporting activities that promote health, dignity and community well-being.",
  },
  {
    number: "04",
    title: "Social Support",
    text: "Working towards practical assistance and support for people and communities.",
  },
  {
    number: "05",
    title: "Empowerment",
    text: "Encouraging participation, opportunity and greater community capacity.",
  },
  {
    number: "06",
    title: "Basic Infrastructure",
    text: "Supporting useful infrastructure and facilities where community needs are identified.",
  },
];

/* ==========================================================
   VALUES
   ========================================================== */

const values = [
  {
    icon: Heart,
    title: "Compassion",
    text: "We believe service begins with empathy, dignity and care.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "We value responsible conduct, accountability and transparency.",
  },
  {
    icon: Users,
    title: "Participation",
    text: "We encourage collaboration with communities and partners.",
  },
  {
    icon: Target,
    title: "Purpose",
    text: "We focus our efforts on meaningful and practical outcomes.",
  },
];

/* ==========================================================
   PAGE
   ========================================================== */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F7F8] text-[#233746]">

      {/* ====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#102D3A]">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#218B86]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#E26D55]/15 blur-3xl" />

        <div className="absolute right-[15%] top-10 h-24 w-24 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-6xl px-5 py-11 text-center sm:py-13 md:py-15">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E26D55] shadow-xl">

            <Heart
              size={24}
              fill="currentColor"
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#D9B66A]">
            {TRUST.name}
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            About Our Trust
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-6 text-white/55 sm:text-xs">
            Building stronger communities through compassion,
            responsible service and meaningful opportunities.
          </p>

        </div>

      </section>

      {/* ====================================================
          TRUST INFO BAR
      ===================================================== */}

      <section className="border-b border-[#DDE5E9] bg-white">

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-[8px] font-semibold text-[#687985] sm:text-[9px]">

          <span>DARPAN ID: {TRUST.darpan}</span>

          <span className="text-[#D2A64D]">•</span>

          <span>PAN: {TRUST.pan}</span>

          <span className="text-[#D2A64D]">•</span>

          <span>{TRUST.phone}</span>

          <span className="text-[#D2A64D]">•</span>

          <span>{TRUST.email}</span>

        </div>

      </section>

      {/* ====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

            {/* LEFT */}

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#E26D55]">
                Who We Are
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#102D3A] md:text-4xl">
                Service with purpose.
                <br />
                Action with responsibility.
              </h2>

              <p className="mt-4 max-w-2xl text-[11px] leading-6 text-[#697A84] sm:text-xs">
                Anand Jivan Foundation Trust is a social
                organisation committed to meaningful
                charitable and community development
                initiatives.
              </p>

              <p className="mt-3 max-w-2xl text-[11px] leading-6 text-[#697A84] sm:text-xs">
                The Trust seeks to contribute towards
                communities through practical initiatives,
                partnerships, participation and responsible
                service.
              </p>

              <p className="mt-3 max-w-2xl text-[11px] leading-6 text-[#697A84] sm:text-xs">
                Our work is guided by the belief that
                sustainable social progress grows through
                compassion, opportunity and collective action.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">

                <Link
                  href="/about/vision-mission"
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#218B86] px-5 text-[10px] font-bold text-white transition hover:bg-[#18736F]"
                >
                  Vision & Mission
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/governance"
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#D5DEE3] bg-white px-5 text-[10px] font-bold text-[#102D3A] transition hover:border-[#218B86]"
                >
                  Our Governance
                  <ArrowRight size={14} />
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div className="rounded-[26px] bg-[#102D3A] p-6 text-white shadow-xl sm:p-7">

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9B66A]">
                Our Approach
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold">
                People first.
              </h3>

              <p className="mt-3 text-[10px] leading-5 text-white/55 sm:text-[11px]">
                We aim to understand community needs and
                support initiatives that can create practical
                value for people and communities.
              </p>

              <div className="mt-6 space-y-3">

                {[
                  "Community-focused work",
                  "Responsible use of resources",
                  "Collaboration and participation",
                  "Meaningful social outcomes",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 border-b border-white/10 pb-3 last:border-0"
                  >

                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-[#D9B66A]"
                    />

                    <span className="text-[10px] font-semibold text-white/70">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          LEADERSHIP
      ===================================================== */}

      <section className="border-y border-[#DDE5E9] bg-white px-4 py-9 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-6">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#E26D55]">
              Leadership
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#102D3A]">
              Managing Trustee & CEO
            </h2>

          </div>

          <div className="overflow-hidden rounded-[26px] border border-[#DDE5E9] bg-[#F8FAFA] shadow-[0_12px_40px_rgba(16,45,58,0.07)]">

            <div className="grid lg:grid-cols-[0.7fr_1.3fr]">

              {/* PHOTO */}

              <div className="relative min-h-[340px] overflow-hidden bg-[#DCE8E6] sm:min-h-[430px]">

                <Image
                  src="/images/guddu-kumar.jpg"
                  alt="Mr. Guddu Kumar - Managing Trustee & CEO"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102D3A]/95 via-[#102D3A]/25 to-transparent px-5 pb-5 pt-20">

                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9B66A]">
                    Anand Jivan Foundation Trust
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                    Mr. Guddu Kumar
                  </h3>

                  <p className="mt-0.5 text-[10px] font-semibold text-white/65">
                    Managing Trustee & CEO
                  </p>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-6 sm:p-8 md:p-10">

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-[#E8F4F2] px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-[#218B86]">
                    Trust Leadership
                  </span>

                  <span className="rounded-full bg-[#FFF0EC] px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-[#D85E48]">
                    Managing Trustee & CEO
                  </span>

                </div>

                <h3 className="mt-5 font-serif text-3xl font-bold text-[#102D3A]">
                  Leading with purpose.
                </h3>

                <p className="mt-3 text-[11px] leading-6 text-[#697A84] sm:text-xs">
                  Mr. Guddu Kumar serves as the Managing
                  Trustee & CEO of Anand Jivan Foundation
                  Trust and supports the organisation&apos;s
                  administration, governance and
                  community-focused activities.
                </p>

                <p className="mt-3 text-[11px] leading-6 text-[#697A84] sm:text-xs">
                  His role includes supporting responsible
                  organisational development, partnerships,
                  programme direction and community
                  engagement.
                </p>

                {/* CONTACT */}

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">

                  <a
                    href="tel:+919155751363"
                    className="flex items-center gap-3 rounded-xl border border-[#DDE5E9] bg-white p-3 transition hover:border-[#218B86]"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5F3F1] text-[#218B86]">
                      <Phone size={16} />
                    </span>

                    <span>

                      <span className="block text-[7px] font-bold uppercase tracking-wider text-gray-400">
                        Phone
                      </span>

                      <span className="mt-0.5 block text-[10px] font-bold text-[#102D3A]">
                        {TRUST.phone}
                      </span>

                    </span>

                  </a>

                  <a
                    href="mailto:guddusirg1@gmail.com"
                    className="flex items-center gap-3 rounded-xl border border-[#DDE5E9] bg-white p-3 transition hover:border-[#E26D55]"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0EC] text-[#E26D55]">
                      <Mail size={16} />
                    </span>

                    <span className="min-w-0">

                      <span className="block text-[7px] font-bold uppercase tracking-wider text-gray-400">
                        Direct Email
                      </span>

                      <span className="mt-0.5 block truncate text-[10px] font-bold text-[#102D3A]">
                        guddusirg1@gmail.com
                      </span>

                    </span>

                  </a>

                </div>

                {/* PROFILE LINK */}

                <div className="mt-5">

                  <Link
                    href="/governance/team"
                    className="inline-flex items-center gap-2 text-[9px] font-bold text-[#218B86] transition hover:text-[#D85E48]"
                  >
                    View Leadership & Team
                    <ArrowRight size={13} />
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          VALUES
      ===================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-7 text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#E26D55]">
              What Guides Us
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#102D3A]">
              Our Core Values
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {values.map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-[#DDE5E9] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F4F2] text-[#218B86] transition group-hover:bg-[#218B86] group-hover:text-white">

                    <Icon size={18} />

                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#102D3A]">
                    {title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#73838D]">
                    {text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* ====================================================
          AREAS OF WORK
      ===================================================== */}

      <section className="bg-[#102D3A] px-4 py-9 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D9B66A]">
                Areas of Work
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-white">
                Where we focus
              </h2>

              <p className="mt-3 max-w-md text-[11px] leading-6 text-white/50">
                Our activities may respond to identified
                community needs and available resources.
              </p>

              <Link
                href="/programs"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E26D55] px-5 py-2.5 text-[9px] font-bold text-white transition hover:bg-[#CA5842]"
              >
                Explore Programs
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">

              {areasOfWork.map((area) => (
                <div
                  key={area.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:bg-white/[0.08]"
                >

                  <span className="text-[8px] font-bold text-[#D9B66A]">
                    {area.number}
                  </span>

                  <h3 className="mt-1.5 text-sm font-bold text-white">
                    {area.title}
                  </h3>

                  <p className="mt-1.5 text-[9px] leading-5 text-white/45">
                    {area.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          REGISTRATION
      ===================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 md:grid-cols-2">

            {/* OFFICE */}

            <div className="rounded-[24px] bg-[#173D4A] p-6 text-white sm:p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E26D55]">

                <MapPin size={20} />

              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9B66A]">
                Registered Office
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold">
                {TRUST.name}
              </h3>

              <p className="mt-3 text-[10px] leading-5 text-white/55 sm:text-[11px]">
                {TRUST.address}
              </p>

              <a
                href="tel:+919155751363"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-white"
              >
                <Phone size={13} />
                {TRUST.phone}
              </a>

            </div>

            {/* REGISTRATION */}

            <div className="rounded-[24px] border border-[#DDE5E9] bg-white p-6 sm:p-7">

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E26D55]">
                Registration Details
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#102D3A]">
                Trust Information
              </h3>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">

                <InfoBox
                  label="DARPAN ID"
                  value={TRUST.darpan}
                />

                <InfoBox
                  label="PAN"
                  value={TRUST.pan}
                />

                <InfoBox
                  label="Phone"
                  value={TRUST.phone}
                />

                <InfoBox
                  label="Email"
                  value={TRUST.email}
                />

              </div>

              <Link
                href="/transparency"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-[#218B86]"
              >
                View Transparency
                <ArrowRight size={13} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          QUICK NAVIGATION
      ===================================================== */}

      <section className="border-y border-[#DDE5E9] bg-white px-4 py-8 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/about/vision-mission"
              title="Vision & Mission"
            />

            <QuickLink
              href="/governance"
              title="Governance"
            />

            <QuickLink
              href="/governance/team"
              title="Our Team"
            />

            <QuickLink
              href="/programs"
              title="Our Programs"
            />

          </div>

        </div>

      </section>

      {/* ====================================================
          CTA
      ===================================================== */}

      <section className="bg-[#FFF9F5] px-4 py-10 text-center">

        <div className="mx-auto max-w-2xl">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0EC] text-[#E26D55]">

            <Heart
              size={19}
              fill="currentColor"
            />

          </div>

          <h2 className="mt-4 font-serif text-2xl font-bold text-[#102D3A] sm:text-3xl">
            Be part of meaningful change.
          </h2>

          <p className="mt-2 text-[10px] leading-5 text-[#73838D]">
            Learn more about our work or support our
            community-focused initiatives.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/programs"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#218B86] px-6 text-[10px] font-bold text-white transition hover:bg-[#18736F]"
            >
              Explore Our Work
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#E26D55] px-6 text-[10px] font-bold text-white transition hover:bg-[#CA5842]"
            >
              Support Our Work
              <Heart
                size={13}
                fill="currentColor"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#D7E0E4] bg-white px-6 text-[10px] font-bold text-[#102D3A] transition hover:border-[#218B86]"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

/* ==========================================================
   INFO BOX
========================================================== */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F5F8F9] p-3.5">

      <p className="text-[7px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-[9px] font-bold text-[#102D3A]">
        {value}
      </p>

    </div>
  );
}

/* ==========================================================
   QUICK LINK
========================================================== */

function QuickLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-[#DDE5E9] bg-[#F8FAFA] p-4 transition hover:-translate-y-0.5 hover:border-[#218B86] hover:bg-white hover:shadow-sm"
    >

      <span className="text-[9px] font-bold text-[#102D3A]">
        {title}
      </span>

      <ArrowRight
        size={13}
        className="text-[#218B86] transition group-hover:translate-x-1"
      />

    </Link>
  );
}