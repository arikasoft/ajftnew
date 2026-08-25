"use client";

import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  HandHeart,
  HeartPulse,
  Hospital,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

/* ==========================================================
   AJFT — HEALTH & QUICK HELP
========================================================== */

const trust = {
  name: "ANAND JIVAN FOUNDATION TRUST",
  darpan: "BR/2023/0343963",
  pan: "AAJTA9323K",
  phone: "+91 9155751363",
  email: "info@ajftrust.org",
  address:
    "MABBI BELAUNA, POST - LALSHAHPUR, PANCHAYAT - SHAHBAJPUR, DARBHANGA, BIHAR - 846005, INDIA",
};

/* ==========================================================
   QUICK HELP TYPES
========================================================== */

const helpTypes = [
  {
    icon: HeartPulse,
    title: "Medical Assistance",
    text: "For people who need help related to a health or medical situation.",
    color: "bg-[#FEECEC] text-[#D9485F]",
  },
  {
    icon: Pill,
    title: "Medicine Support",
    text: "Request support for essential medicines where assistance may be possible.",
    color: "bg-[#FFF4DD] text-[#B7791F]",
  },
  {
    icon: Hospital,
    title: "Health Facility",
    text: "Help related to accessing appropriate healthcare services or facilities.",
    color: "bg-[#EAF5FF] text-[#1877B8]",
  },
  {
    icon: Users,
    title: "Health Camp",
    text: "Community health camps, awareness activities and outreach support.",
    color: "bg-[#EAF7F1] text-[#16845C]",
  },
];

/* ==========================================================
   HOW HELP WORKS
========================================================== */

const steps = [
  {
    number: "01",
    title: "Tell Us",
    text: "Submit a short help request with the essential information.",
  },
  {
    number: "02",
    title: "We Review",
    text: "Our team reviews the request and available information.",
  },
  {
    number: "03",
    title: "We Connect",
    text: "Where possible, we connect the person with an appropriate support option.",
  },
  {
    number: "04",
    title: "Follow Up",
    text: "The team may follow up for additional information or updates.",
  },
];

/* ==========================================================
   SUPPORT OPTIONS
========================================================== */

const supportOptions = [
  {
    icon: Stethoscope,
    title: "Medical Professionals",
    text: "Doctors, nurses, pharmacists and healthcare professionals can support outreach activities.",
  },
  {
    icon: HandHeart,
    title: "Volunteers",
    text: "Help with health camps, awareness programmes, community mobilisation and coordination.",
  },
  {
    icon: Activity,
    title: "Community Partners",
    text: "Hospitals, clinics, institutions and local organisations can collaborate with us.",
  },
  {
    icon: HeartPulse,
    title: "Donors",
    text: "Financial support can help strengthen health-related charitable activities.",
  },
];

/* ==========================================================
   PAGE
========================================================== */

export default function HealthProgramPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#26343D]">

      {/* ====================================================
          QUICK HELP HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-[#7F1D3B] px-4 py-10 sm:px-5 md:py-14">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#F97373]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#FBBF24]/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          {/* TOP TRUST BAR */}

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[7px] font-semibold text-white/55 sm:justify-between">

            <span>
              ANAND JIVAN FOUNDATION TRUST
            </span>

            <div className="flex flex-wrap justify-center gap-x-3">

              <span>
                DARPAN: {trust.darpan}
              </span>

              <span>•</span>

              <span>
                {trust.phone}
              </span>

            </div>

          </div>

          <div className="mt-9 grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FBBF24]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#FBBF24]">
                  Health • Quick Help
                </span>

              </div>

              <h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">

                Need Health
                <br />

                <span className="text-[#FBBF24]">
                  Help?
                </span>

                <br />

                Start Here.

              </h1>

              <p className="mt-5 max-w-xl text-[11px] leading-6 text-white/65 sm:text-sm">
                If you or someone in your community needs
                health-related assistance, you can send us
                a request. Our team will review the information
                and respond where support may be possible.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">

                <Link
                  href="/programs/health/request"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#FBBF24] px-6 text-[10px] font-bold text-[#52152B] shadow-lg transition hover:bg-[#F59E0B]"
                >
                  Request Help
                  <ArrowRight size={16} />
                </Link>

                <a
                  href={`tel:${trust.phone.replace(/\s/g, "")}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-[10px] font-bold text-white transition hover:bg-white/15"
                >
                  <Phone size={15} />
                  Call for Assistance
                </a>

              </div>

              <p className="mt-4 flex items-center gap-2 text-[8px] text-white/40">

                <ShieldCheck size={12} />

                Please share only information necessary for
                reviewing your request.

              </p>

            </div>

            {/* RIGHT — QUICK ACTION CARD */}

            <div>

              <div className="rounded-[28px] border border-white/10 bg-white p-5 shadow-2xl sm:p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#D9485F]">
                      Quick Help Desk
                    </p>

                    <h2 className="mt-1 font-serif text-2xl font-bold text-[#26343D]">
                      How can we help?
                    </h2>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEECEC] text-[#D9485F]">
                    <HeartPulse size={24} />
                  </div>

                </div>

                <div className="mt-5 space-y-2">

                  <QuickAction
                    href="/programs/health/request"
                    icon={<MessageCircle size={17} />}
                    title="Request Health Help"
                    text="Submit a support request"
                  />

                  <QuickAction
                    href="/programs/health/camps"
                    icon={<CalendarDays size={17} />}
                    title="Health Camps"
                    text="View or support health camps"
                  />

                  <QuickAction
                    href="/volunteer"
                    icon={<Users size={17} />}
                    title="Become a Volunteer"
                    text="Help us reach communities"
                  />

                  <QuickAction
                    href="/donate"
                    icon={<HandHeart size={17} />}
                    title="Support Health Work"
                    text="Contribute towards healthcare activities"
                  />

                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F7F9FB] p-3">

                  <Clock3
                    size={14}
                    className="shrink-0 text-[#D9485F]"
                  />

                  <p className="text-[8px] leading-4 text-[#6B7780]">
                    Requests are reviewed during Trust
                    working/response hours. Submission does
                    not guarantee financial or medical assistance.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          EMERGENCY NOTICE
      ==================================================== */}

      <section className="border-b border-[#F2D5D8] bg-[#FFF7F7] px-4 py-4 sm:px-5">

        <div className="mx-auto flex max-w-6xl items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#DC2626]">

            <AlertCircle size={18} />

          </div>

          <div>

            <p className="text-[9px] font-bold text-[#B91C1C]">
              IMPORTANT — MEDICAL EMERGENCY
            </p>

            <p className="mt-1 text-[9px] leading-5 text-[#7F1D1D]">
              This page is not an emergency medical service.
              For an immediate life-threatening situation,
              contact the appropriate emergency medical service
              or nearest hospital without waiting for a response
              from the Trust.
            </p>

          </div>

        </div>

      </section>

      {/* ====================================================
          HELP TYPES
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D9485F]">
              Quick Support
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D] md:text-3xl">
              Choose what you need help with
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-5 text-[#6B7780]">
              Select the closest category when submitting
              a request. This helps us understand your need
              more quickly.
            </p>

          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {helpTypes.map((item) => {

              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href="/programs/health/request"
                  className="group rounded-[22px] border border-[#E2E7EA] bg-white p-5 shadow-[0_7px_25px_rgba(38,52,61,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E7B6BF] hover:shadow-[0_16px_35px_rgba(38,52,61,0.09)]"
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-[#A4ADB2] transition group-hover:translate-x-1 group-hover:text-[#D9485F]"
                    />

                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-[#26343D]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[9px] leading-5 text-[#6B7780]">
                    {item.text}
                  </p>

                  <p className="mt-4 text-[8px] font-bold text-[#D9485F]">
                    Request support →
                  </p>

                </Link>
              );
            })}

          </div>

        </div>

      </section>

      {/* ====================================================
          REQUEST FORM CTA
      ==================================================== */}

      <section className="bg-[#F1F5F8] px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">

            {/* FORM PREVIEW */}

            <div className="rounded-[28px] border border-[#DDE4E8] bg-white p-5 shadow-[0_10px_35px_rgba(38,52,61,0.06)] sm:p-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#D9485F]">
                    Quick Help Request
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D]">
                    Tell us what is needed
                  </h2>

                  <p className="mt-2 max-w-lg text-[9px] leading-5 text-[#6B7780]">
                    Keep your request simple and clear.
                    Our team may contact you for additional
                    information where required.
                  </p>

                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FEECEC] text-[#D9485F]">
                  <FileText size={22} />
                </div>

              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <FakeField
                  label="Name"
                  placeholder="Your name"
                />

                <FakeField
                  label="Phone"
                  placeholder="Mobile number"
                />

                <FakeField
                  label="Location"
                  placeholder="Village / City"
                />

                <FakeField
                  label="Help Type"
                  placeholder="Select support type"
                />

              </div>

              <div className="mt-3 rounded-xl border border-[#E2E7EA] bg-[#FAFBFC] px-4 py-4">

                <p className="text-[8px] font-bold text-[#77838A]">
                  Briefly describe the requirement
                </p>

                <div className="mt-3 h-16 rounded-lg border border-dashed border-[#CBD4D9] bg-white" />

              </div>

              <Link
                href="/programs/health/request"
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D9485F] text-[10px] font-bold text-white shadow-sm transition hover:bg-[#BE3850]"
              >
                Continue to Help Request
                <ArrowRight size={15} />
              </Link>

              <p className="mt-3 text-center text-[7px] text-[#98A2A8]">
                We request only information needed to assess
                the support requirement.
              </p>

            </div>

            {/* RIGHT INFO */}

            <div className="rounded-[28px] bg-[#7F1D3B] p-6 text-white sm:p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBBF24] text-[#52152B]">
                <ShieldCheck size={22} />
              </div>

              <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.25em] text-[#FBBF24]">
                Before You Submit
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                A few things to know
              </h2>

              <div className="mt-6 space-y-4">

                <InfoPoint
                  number="01"
                  title="Be accurate"
                  text="Provide correct contact and location details."
                />

                <InfoPoint
                  number="02"
                  title="Keep it relevant"
                  text="Tell us briefly what kind of health support is required."
                />

                <InfoPoint
                  number="03"
                  title="We may call"
                  text="Our team may contact you to understand the request."
                />

                <InfoPoint
                  number="04"
                  title="Support is not guaranteed"
                  text="Every request depends on need, verification and available resources."
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          HOW IT WORKS
      ==================================================== */}

      <section className="border-y border-[#E0E6EA] bg-white px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#1877B8]">
              Simple Process
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D] md:text-3xl">
              How a help request works
            </h2>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">

            {steps.map((step) => (

              <div
                key={step.number}
                className="rounded-[22px] border border-[#E0E6EA] bg-[#FAFBFC] p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5FF] text-[8px] font-bold text-[#1877B8]">
                    {step.number}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D9485F]" />

                </div>

                <h3 className="mt-5 font-serif text-lg font-bold text-[#26343D]">
                  {step.title}
                </h3>

                <p className="mt-2 text-[9px] leading-5 text-[#6B7780]">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================
          HOW PEOPLE CAN HELP
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#16845C]">
                Give Help
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#26343D]">
                Need help?
                <br />
                <span className="text-[#D9485F]">
                  Or want to help?
                </span>
              </h2>

              <p className="mt-3 max-w-md text-[10px] leading-6 text-[#6B7780] sm:text-[11px]">
                Health support is possible through people,
                partnerships, volunteering and responsible
                contributions.
              </p>

              <Link
                href="/volunteer"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-[#16845C] hover:text-[#D9485F]"
              >
                Become a Volunteer
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {supportOptions.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-[#E0E6EA] bg-white p-5 shadow-[0_6px_22px_rgba(38,52,61,0.05)]"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF7F1] text-[#16845C]">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-[#26343D]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[9px] leading-5 text-[#6B7780]">
                      {item.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          HEALTH CAMP
      ==================================================== */}

      <section className="bg-[#EAF7F1] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#16845C] text-white">
            <CalendarDays size={21} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#16845C]">
            Community Health
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#26343D] md:text-3xl">
            Organise or support a health camp
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-6 text-[#63736B]">
            Institutions, healthcare professionals and
            community partners can collaborate with the Trust
            for health awareness and outreach activities.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#16845C] px-6 text-[10px] font-bold text-white transition hover:bg-[#106B4A]"
            >
              Discuss a Health Camp
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/volunteer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#A8D7C1] bg-white px-6 text-[10px] font-bold text-[#16845C] transition hover:bg-[#F7FFFB]"
            >
              Volunteer
              <Users size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          DONATE
      ==================================================== */}

      <section className="bg-[#26343D] px-4 py-11 sm:px-5 md:py-14">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FBBF24] text-[#52152B]">
            <HandHeart size={22} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
            Support Health Activities
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Your support can help us reach more people.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[10px] leading-6 text-white/50">
            Donations can support charitable health activities,
            outreach, awareness and community programmes,
            subject to available resources and organisational
            priorities.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FBBF24] px-7 text-[10px] font-bold text-[#52152B] transition hover:bg-[#F59E0B]"
            >
              Donate for Health
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/programs"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 text-[10px] font-bold text-white transition hover:bg-white/15"
            >
              All Programmes
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          CONTACT / QUICK LINKS
      ==================================================== */}

      <section className="border-t border-[#E0E6EA] bg-white px-4 py-7 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <ContactCard
              href={`tel:${trust.phone.replace(/\s/g, "")}`}
              icon={<Phone size={17} />}
              title="Call Us"
              text={trust.phone}
              accent="red"
            />

            <ContactCard
              href={`mailto:${trust.email}`}
              icon={<Mail size={17} />}
              title="Email"
              text={trust.email}
              accent="blue"
            />

            <ContactCard
              href="/contact"
              icon={<MapPin size={17} />}
              title="Contact Office"
              text="Darbhanga, Bihar"
              accent="green"
            />

            <ContactCard
              href="/verify"
              icon={<ShieldCheck size={17} />}
              title="Verify Receipt"
              text="Check donation receipt"
              accent="gold"
            />

          </div>

        </div>

      </section>

    

    </main>
  );
}

/* ==========================================================
   QUICK ACTION
========================================================== */

function QuickAction({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-[#E5E9EC] bg-[#FAFBFC] p-3 transition hover:-translate-y-0.5 hover:border-[#E7B6BF] hover:bg-white"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FEECEC] text-[#D9485F] transition group-hover:bg-[#D9485F] group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[9px] font-bold text-[#26343D]">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[7px] text-[#8A959B]">
          {text}
        </p>

      </div>

      <ChevronRight
        size={14}
        className="shrink-0 text-[#AAB3B8] transition group-hover:translate-x-1 group-hover:text-[#D9485F]"
      />

    </Link>
  );
}

/* ==========================================================
   FAKE FIELD
========================================================== */

function FakeField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="rounded-xl border border-[#E2E7EA] bg-[#FAFBFC] px-4 py-3">

      <p className="text-[8px] font-bold text-[#77838A]">
        {label}
      </p>

      <p className="mt-2 text-[9px] text-[#A2ACB1]">
        {placeholder}
      </p>

    </div>
  );
}

/* ==========================================================
   INFO POINT
========================================================== */

function InfoPoint({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[7px] font-bold text-[#FBBF24]">
        {number}
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
   CONTACT CARD
========================================================== */

function ContactCard({
  href,
  icon,
  title,
  text,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  accent: "red" | "blue" | "green" | "gold";
}) {
  const accentClasses = {
    red: "bg-[#FEECEC] text-[#D9485F]",
    blue: "bg-[#EAF5FF] text-[#1877B8]",
    green: "bg-[#EAF7F1] text-[#16845C]",
    gold: "bg-[#FFF4DD] text-[#B7791F]",
  };

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#E0E6EA] bg-[#FAFBFC] p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_25px_rgba(38,52,61,0.07)]"
    >

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClasses[accent]}`}
      >
        {icon}
      </div>

      <p className="mt-3 text-[8px] font-bold uppercase tracking-wider text-[#8A959B]">
        {title}
      </p>

      <p className="mt-1 truncate text-[10px] font-bold text-[#26343D]">
        {text}
      </p>

    </Link>
  );
}