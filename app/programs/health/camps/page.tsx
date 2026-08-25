"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  HeartPulse,
  Hospital,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

const trust = {
  phone: "+91 9155751363",
  email: "info@ajftrust.org",
  address:
    "MABBI BELAUNA, POST - LALSHAHPUR, PANCHAYAT - SHAHBAJPUR, DARBHANGA, BIHAR - 846005, INDIA",
};

const campServices = [
  {
    icon: Stethoscope,
    title: "Basic Health Check-up",
    text: "Community-oriented health screening and basic health awareness support.",
  },
  {
    icon: HeartPulse,
    title: "Health Awareness",
    text: "Information and awareness activities around preventive health and wellbeing.",
  },
  {
    icon: Hospital,
    title: "Healthcare Guidance",
    text: "Helping community members understand available healthcare options.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    text: "Taking health awareness activities closer to communities where possible.",
  },
];

const campProcess = [
  {
    number: "01",
    title: "Plan",
    text: "Identify the community need, location and possible partners.",
  },
  {
    number: "02",
    title: "Mobilise",
    text: "Coordinate volunteers, professionals and community participants.",
  },
  {
    number: "03",
    title: "Conduct",
    text: "Organise the health awareness or outreach activity.",
  },
  {
    number: "04",
    title: "Follow Up",
    text: "Guide participants towards appropriate healthcare options where needed.",
  },
];

export default function HealthCampsPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#26343D]">

      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-[#14532D] px-4 py-10 sm:px-5 md:py-14">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#4ADE80]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#FBBF24]/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          <Link
            href="/programs/health"
            className="inline-flex items-center gap-2 text-[9px] font-bold text-white/60 hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Health
          </Link>

          <div className="mt-8 grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr]">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#FBBF24]">
                  Community Health Camps
                </span>

              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#86EFAC]">
                Health • Awareness • Outreach
              </p>

              <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">

                Health Support
                <br />

                <span className="text-[#86EFAC]">
                  Closer to
                </span>

                <br />

                Communities

              </h1>

              <p className="mt-5 max-w-xl text-[11px] leading-6 text-white/60 sm:text-sm">
                We aim to support community health activities,
                awareness initiatives and outreach programmes
                through collaboration with healthcare
                professionals, volunteers and local partners.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">

                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FBBF24] px-6 text-[10px] font-bold text-[#14532D] transition hover:bg-[#F59E0B]"
                >
                  Organise a Camp
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/volunteer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-[10px] font-bold text-white hover:bg-white/15"
                >
                  Volunteer
                  <Users size={15} />
                </Link>

              </div>

            </div>

            {/* RIGHT CARD */}

            <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-white p-5 shadow-2xl sm:p-6">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCFCE7] text-[#15803D]">
                  <CalendarDays size={24} />
                </div>

                <span className="rounded-full bg-[#FEF3C7] px-3 py-1.5 text-[8px] font-bold text-[#A16207]">
                  HEALTH OUTREACH
                </span>

              </div>

              <h2 className="mt-6 font-serif text-2xl font-bold text-[#26343D]">
                Bring health awareness
                <br />
                closer to people.
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-[#6B7780]">
                Health camps can bring professionals,
                volunteers and communities together for
                awareness and basic health outreach.
              </p>

              <div className="mt-6 space-y-2">

                <CampFeature
                  icon={<Stethoscope size={16} />}
                  text="Health check-up & awareness"
                />

                <CampFeature
                  icon={<Users size={16} />}
                  text="Community participation"
                />

                <CampFeature
                  icon={<HeartHandshake size={16} />}
                  text="Volunteer & partner support"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          NOTICE
      ==================================================== */}

      <section className="border-b border-[#DCE8DF] bg-[#F0FDF4] px-4 py-4 sm:px-5">

        <div className="mx-auto flex max-w-6xl items-start gap-3">

          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-[#15803D]"
          />

          <p className="text-[9px] leading-5 text-[#166534]">
            Health camps are charitable/community activities
            and are not a substitute for emergency medical
            services or professional medical treatment.
          </p>

        </div>

      </section>

      {/* ====================================================
          SERVICES
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#15803D]">
              Camp Activities
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D] md:text-3xl">
              What a community health camp can include
            </h2>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {campServices.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-[#E0E6EA] bg-white p-5 shadow-[0_7px_25px_rgba(38,52,61,0.05)] transition hover:-translate-y-1 hover:border-[#A7D7B4]"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#15803D]">
                      <Icon size={20} />
                    </div>

                    <span className="text-[8px] font-bold text-[#D97706]">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-[#26343D]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[9px] leading-5 text-[#6B7780]">
                    {item.text}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ====================================================
          CAMP STATUS / UPCOMING
      ==================================================== */}

      <section className="bg-[#F1F5F3] px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">

            {/* CAMP LIST */}

            <div className="rounded-[26px] border border-[#DDE6E0] bg-white p-5 shadow-[0_10px_30px_rgba(38,52,61,0.05)] sm:p-7">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#15803D]">
                    Camp Information
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D]">
                    Upcoming Activities
                  </h2>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#15803D]">
                  <CalendarDays size={20} />
                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-[#C8D7CC] bg-[#FAFCFA] p-6 text-center">

                <CalendarDays
                  size={27}
                  className="mx-auto text-[#9AA8A0]"
                />

                <h3 className="mt-4 text-sm font-bold text-[#52616A]">
                  Camp schedule will be announced here
                </h3>

                <p className="mx-auto mt-2 max-w-md text-[9px] leading-5 text-[#8A959B]">
                  Upcoming camp dates, locations and available
                  activities can be displayed here once the
                  Trust schedules them.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#15803D] px-5 text-[9px] font-bold text-white"
                >
                  Ask About Upcoming Camps
                  <ArrowRight size={14} />
                </Link>

              </div>

            </div>

            {/* QUICK CONTACT */}

            <div className="rounded-[26px] bg-[#14532D] p-6 text-white sm:p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBBF24] text-[#14532D]">
                <Phone size={20} />
              </div>

              <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.25em] text-[#FBBF24]">
                Need Information?
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Talk to the Trust
              </h2>

              <p className="mt-3 text-[9px] leading-5 text-white/50">
                Contact us to ask about upcoming activities,
                partnership opportunities or organising a
                community health camp.
              </p>

              <a
                href={`tel:${trust.phone.replace(/\s/g, "")}`}
                className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-[9px] font-bold text-[#14532D]"
              >
                <Phone size={14} />
                {trust.phone}
              </a>

              <a
                href={`mailto:${trust.email}`}
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 text-[8px] font-bold text-white"
              >
                {trust.email}
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          PROCESS
      ==================================================== */}

      <section className="border-y border-[#E0E6EA] bg-white px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D97706]">
              Organising A Camp
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D] md:text-3xl">
              From planning to community outreach
            </h2>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">

            {campProcess.map((item) => (

              <div
                key={item.number}
                className="rounded-[22px] border border-[#E0E6EA] bg-[#FAFBFC] p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-[8px] font-bold text-[#15803D]">
                    {item.number}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />

                </div>

                <h3 className="mt-5 font-serif text-lg font-bold text-[#26343D]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[9px] leading-5 text-[#6B7780]">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================
          VOLUNTEER / PARTNER
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 md:grid-cols-3">

            <SupportCard
              icon={<Stethoscope size={21} />}
              title="Healthcare Professionals"
              text="Doctors, nurses, pharmacists and other professionals can support outreach activities."
              href="/contact"
              button="Join as Professional"
            />

            <SupportCard
              icon={<Users size={21} />}
              title="Volunteers"
              text="Help with community mobilisation, camp coordination and awareness activities."
              href="/volunteer"
              button="Become a Volunteer"
            />

            <SupportCard
              icon={<HeartHandshake size={21} />}
              title="Community Partners"
              text="Institutions, hospitals and organisations can collaborate on health initiatives."
              href="/contact"
              button="Become a Partner"
            />

          </div>

        </div>

      </section>

      {/* ====================================================
          DONATE CTA
      ==================================================== */}

      <section className="bg-[#26343D] px-4 py-11 sm:px-5 md:py-14">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FBBF24] text-[#14532D]">
            <HeartHandshake size={22} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
            Support Community Health
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Help us take health support closer to communities.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[10px] leading-6 text-white/50">
            Your contribution can support charitable health
            awareness, outreach and community activities,
            subject to organisational priorities and available
            resources.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FBBF24] px-7 text-[10px] font-bold text-[#14532D] transition hover:bg-[#F59E0B]"
            >
              Donate for Health
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/programs/health"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 text-[10px] font-bold text-white"
            >
              Health Help Desk
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <footer className="bg-[#123C28] px-4 py-6 text-center">

        <p className="text-[9px] font-bold tracking-[0.14em] text-white">
          ANAND JIVAN FOUNDATION TRUST
        </p>

        <p className="mt-1 text-[8px] text-white/40">
          Health • Education • Community Development • Social Welfare
        </p>

        <p className="mx-auto mt-2 max-w-3xl text-[8px] leading-4 text-white/30">
          {trust.address}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[8px] text-[#FBBF24]">

          <span>{trust.phone}</span>

          <span>•</span>

          <span>{trust.email}</span>

        </div>

      </footer>

    </main>
  );
}

/* ==========================================================
   CAMP FEATURE
========================================================== */

function CampFeature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#F7F9FB] p-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#15803D]">
        {icon}
      </div>

      <p className="text-[9px] font-semibold text-[#52616A]">
        {text}
      </p>

      <CheckCircle2
        size={14}
        className="ml-auto shrink-0 text-[#16A34A]"
      />

    </div>
  );
}

/* ==========================================================
   SUPPORT CARD
========================================================== */

function SupportCard({
  icon,
  title,
  text,
  href,
  button,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  button: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#E0E6EA] bg-white p-5 shadow-[0_7px_25px_rgba(38,52,61,0.05)]">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#15803D]">
        {icon}
      </div>

      <h3 className="mt-5 font-serif text-lg font-bold text-[#26343D]">
        {title}
      </h3>

      <p className="mt-2 min-h-[55px] text-[9px] leading-5 text-[#6B7780]">
        {text}
      </p>

      <Link
        href={href}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-[#B7DCC1] px-4 text-[9px] font-bold text-[#15803D] transition hover:bg-[#F0FDF4]"
      >
        {button}
        <ArrowRight size={13} />
      </Link>

    </div>
  );
}