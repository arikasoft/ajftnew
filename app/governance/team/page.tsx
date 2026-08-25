"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

/* ==========================================================
   AJFT — TEAM PAGE
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
   TEAM DATA
   Keep your existing image paths if filenames are different.
========================================================== */

const team = [
  {
    name: "Mrs. Pooja Kumari",
    designation: "Head of Welfare & Education Department",
    qualification:
      "M.Sc. Extension Education & Communication Management",
    department: "Education & Women Empowerment",
    email: "pooja@ajftrust.org",
    image: "/images/team/pooja-kumari.jpg",
    icon: "👩‍🏫",
    description:
      "Leads the Welfare, Education and Women Empowerment Department. She manages scholarship support, educational outreach, women leadership programs, skill development initiatives, community awareness campaigns and beneficiary welfare activities aimed at empowering vulnerable communities.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Mr. Guddu Kumar",
    designation: "Head of Community Development",
    qualification: "Master of Psychology",
    department: "Community Development",
    email: "guddu@ajftrust.org",
    image: "/images/team/guddu-kumar.jpg",
    icon: "🏛️",
    description:
      "Leads Community Development initiatives and provides strategic direction for social impact programs, governance, donor engagement, partnerships, institutional growth and sustainable community transformation projects.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Mrs. Ankita Kumari",
    designation: "Head of Rural Development & Environment",
    qualification: "Master of Geography",
    department: "Rural Development & Environment",
    email: "ankita@ajftrust.org",
    image: "/images/team/ankita-kumari.jpg",
    icon: "🌱",
    description:
      "Leads Rural Development and Environment programs including village development, plantation drives, environmental awareness campaigns, water conservation initiatives and sustainable livelihood projects.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Er. Amit Ranjan",
    designation: "Senior Manager",
    qualification: "Engineering & Program Management",
    department: "Operations & Project Management",
    email: "amit@ajftrust.org",
    image: "/images/team/amit-ranjan.jpg",
    icon: "⚙️",
    description:
      "Oversees project implementation, operations management, MIS systems, monitoring, reporting, technology integration and coordination across all departments of the organization.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Mr. Rahul Kumar",
    designation: "Head of Healthcare & Nutrition",
    qualification: "Master of Public Health (MPH)",
    department: "Healthcare & Nutrition",
    email: "health@ajftrust.org",
    image: "/images/team/rahul-kumar.jpg",
    icon: "🏥",
    description:
      "Leads health awareness campaigns, medical camps, maternal and child health programs and nutrition support initiatives.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Ms. Neha Kumari",
    designation: "Head of Volunteer & Youth Engagement",
    qualification: "Master of Social Work (MSW)",
    department: "Volunteer & Youth Development",
    email: "volunteer@ajftrust.org",
    image: "/images/team/neha-kumari.jpg",
    icon: "🤝",
    description:
      "Coordinates volunteer engagement, youth leadership programs, training initiatives and community mobilization activities.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Dr. Priya Sharma",
    designation: "Head of Child Development & Protection",
    qualification: "Ph.D. Child Development",
    department: "Child Development & Protection",
    email: "childcare@ajftrust.org",
    image: "/images/team/priya-sharma.jpg",
    icon: "👶",
    description:
      "Leads child welfare, child protection, educational inclusion, nutrition awareness and child rights initiatives. She works to ensure safe, healthy and inclusive development opportunities for children from vulnerable communities.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },

  {
    name: "Mr. Vikash Kumar",
    designation: "Head of CSR & Partnerships",
    qualification: "MBA - Corporate Relations",
    department: "CSR & Strategic Partnerships",
    email: "csr@ajftrust.org",
    image: "/images/team/vikash-kumar.jpg",
    icon: "🤝",
    description:
      "Manages corporate partnerships, CSR collaborations, donor engagement, institutional networking and resource mobilization to strengthen the impact and sustainability of the Trust's programs.",
    tags: ["Leadership", "Community Impact", "Social Development"],
  },
];

/* ==========================================================
   RESPONSIBILITIES
========================================================== */

const responsibilities = [
  "Strategic direction and organisational oversight",
  "Responsible management of Trust resources",
  "Supervision of programmes and activities",
  "Maintenance of organisational records",
  "Stakeholder and community coordination",
  "Support for statutory and administrative compliance",
];

/* ==========================================================
   LEADERSHIP PRINCIPLES
========================================================== */

const principles = [
  {
    number: "01",
    title: "Responsibility",
    text: "Taking responsibility for organisational decisions, resources and activities.",
  },
  {
    number: "02",
    title: "Transparency",
    text: "Maintaining clear and responsible organisational practices.",
  },
  {
    number: "03",
    title: "Participation",
    text: "Encouraging collaboration with communities, volunteers and partners.",
  },
  {
    number: "04",
    title: "Accountability",
    text: "Working with a focus on responsible administration and public trust.",
  },
];

/* ==========================================================
   PAGE
========================================================== */

export default function GovernanceTeamPage() {
  return (
    <main className="min-h-screen bg-[#F5F7F6] text-[#20343D]">

      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-[#173B4D] px-4 py-10 sm:px-5 sm:py-12">

        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#178F87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#E46F57]/15 blur-3xl" />

        <div className="pointer-events-none absolute right-[15%] top-10 h-20 w-20 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E46F57] text-white shadow-xl">

            <Users size={25} />

          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.28em] text-[#D5A93A]">
            Anand Jivan Foundation Trust
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Team
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-6 text-white/60 sm:text-xs md:text-sm">
            Meet the people supporting the governance,
            programmes, operations and community-focused
            work of Anand Jivan Foundation Trust.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/governance"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#178F87] px-5 text-[10px] font-bold text-white transition hover:bg-[#106E69]"
            >
              Governance
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 text-[10px] font-bold text-white transition hover:bg-white/15"
            >
              Contact Trust
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          TRUST INFORMATION
      ==================================================== */}

      <section className="border-b border-[#DCE5E3] bg-white">

        <div className="mx-auto max-w-6xl px-4 py-3.5">

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center text-[8px] font-semibold text-[#718087] sm:text-[9px]">

            <span>
              DARPAN ID: {trust.darpan}
            </span>

            <span className="text-[#D5A93A]">•</span>

            <span>
              PAN: {trust.pan}
            </span>

            <span className="text-[#D5A93A]">•</span>

            <span>
              {trust.phone}
            </span>

            <span className="text-[#D5A93A]">•</span>

            <span>
              {trust.email}
            </span>

          </div>

        </div>

      </section>

      {/* ====================================================
          INTRO
      ==================================================== */}

      <section className="px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#E46F57]">
            Leadership & Responsibility
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#173B4D] md:text-3xl">
            People behind the purpose
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-6 text-[#718087] sm:text-[11px]">
            Our team supports the Trust through programme
            leadership, community engagement, administration,
            operations and strategic partnerships.
          </p>

        </div>

      </section>

      {/* ====================================================
          TEAM GRID
      ==================================================== */}

      <section className="px-3 pb-10 sm:px-5 md:pb-12">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {team.map((member, index) => (

              <article
                key={member.name}
                className="group relative overflow-hidden rounded-[24px] border border-[#DCE5E3] bg-white px-4 pb-5 pt-5 text-center shadow-[0_8px_28px_rgba(23,59,77,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#178F87]/40 hover:shadow-[0_18px_42px_rgba(23,59,77,0.12)]"
              >

                {/* TOP ACCENT */}

                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#178F87] via-[#D5A93A] to-[#E46F57]" />

                {/* NUMBER */}

                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F7F6]">

                  <span className="text-[7px] font-bold text-[#D5A93A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                {/* DEPARTMENT ICON */}

                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF9F2] text-2xl">
                  {member.icon}
                </div>

                {/* ==================================================
                    SAME TEAM IMAGE
                ================================================== */}

                <div className="relative mx-auto mt-4 h-28 w-28 overflow-hidden rounded-full border-[4px] border-white bg-[#E8EFED] shadow-[0_10px_25px_rgba(23,59,77,0.16)] ring-1 ring-[#DCE5E3]">

                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* NAME */}

                <h3 className="mt-4 min-h-[44px] font-serif text-lg font-bold leading-tight text-[#173B4D]">
                  {member.name}
                </h3>

                {/* DESIGNATION */}

                <p className="mt-2 min-h-[40px] text-[10px] font-bold leading-4 text-[#178F87]">
                  {member.designation}
                </p>

                {/* QUALIFICATION */}

                <div className="mx-auto mt-3 min-h-[30px] w-fit max-w-full rounded-full bg-[#F1F5F4] px-3 py-1.5 text-[7.5px] font-semibold leading-4 text-[#5F7078]">

                  🎓 {member.qualification}

                </div>

                {/* DEPARTMENT */}

                <div className="mx-auto mt-2 flex min-h-[38px] items-center justify-center rounded-xl bg-[#FFF0EC] px-3 py-2 text-[8px] font-bold leading-4 text-[#D45F49]">

                  🏢 {member.department}

                </div>

                {/* DESCRIPTION */}

                <p className="mt-4 min-h-[170px] text-[9.5px] leading-5 text-[#718087] sm:text-[10px]">

                  {member.description}

                </p>

                {/* TAGS */}

                <div className="mt-4 flex min-h-[48px] flex-wrap items-center justify-center gap-1.5">

                  <span className="rounded-full bg-[#E5F4F1] px-2.5 py-1 text-[7px] font-bold text-[#178F87]">
                    {member.tags[0]}
                  </span>

                  <span className="rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[7px] font-bold text-[#159447]">
                    {member.tags[1]}
                  </span>

                  <span className="rounded-full bg-[#FFF1D9] px-2.5 py-1 text-[7px] font-bold text-[#B47C18]">
                    {member.tags[2]}
                  </span>

                </div>

                {/* SOCIAL */}

                <div className="mt-5 flex justify-center gap-2">

                  {/* EMAIL */}

                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#178F87] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#106E69]"
                  >
                    <Mail size={14} />
                  </a>

                  {/* PROFILE */}

                  <Link
                    href="/governance/team"
                    aria-label={`Profile of ${member.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173B4D] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#102F3D]"
                  >
                    <Users size={14} />
                  </Link>

                  {/* WEBSITE */}

                  <Link
                    href="/"
                    aria-label="Trust website"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E46F57] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#CA5944]"
                  >
                    <Globe size={14} />
                  </Link>

                </div>

                {/* EMAIL */}

                <p className="mt-3 truncate text-[8px] font-medium text-[#718087]">
                  {member.email}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================
          TEAM STRUCTURE
      ==================================================== */}

      <section className="border-y border-[#DCE5E3] bg-[#FFF9F2] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-7 text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D5A93A]">
              Organisational Structure
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#173B4D] md:text-3xl">
              How our team works
            </h2>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <StructureCard
              number="01"
              title="Trust Management"
              icon={<ShieldCheck size={21} />}
              text="Responsible for overall organisational direction, administration and stewardship of the Trust."
            />

            <StructureCard
              number="02"
              title="Programme Leadership"
              icon={<Users size={21} />}
              text="Supports planning, implementation and oversight of charitable and community initiatives."
            />

            <StructureCard
              number="03"
              title="Administration"
              icon={<CheckCircle2 size={21} />}
              text="Supports documentation, records, communication and day-to-day organisational coordination."
            />

          </div>

        </div>

      </section>

      {/* ====================================================
          RESPONSIBILITIES
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#D5A93A]">
                Key Responsibilities
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#173B4D] md:text-3xl">
                Working together
              </h2>

              <p className="mt-3 max-w-md text-[10px] leading-6 text-[#718087] sm:text-[11px]">
                Clear responsibilities help the Trust maintain
                effective programme delivery, administration
                and organisational coordination.
              </p>

              <Link
                href="/governance"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-[#178F87] transition hover:text-[#E46F57]"
              >
                View Governance
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">

              {responsibilities.map((item, index) => (

                <div
                  key={item}
                  className="group flex items-start gap-3 rounded-xl border border-[#DCE5E3] bg-white p-4 shadow-[0_5px_20px_rgba(23,59,77,0.04)] transition hover:-translate-y-0.5 hover:border-[#178F87]/35"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5F4F1] transition group-hover:bg-[#178F87]">

                    <span className="text-[8px] font-bold text-[#178F87] group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <p className="text-[10px] font-semibold leading-5 text-[#20343D]">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          LEADERSHIP PRINCIPLES
      ==================================================== */}

      <section className="bg-[#173B4D] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#D5A93A] text-white">

              <ShieldCheck size={20} />

            </div>

            <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.28em] text-[#D5A93A]">
              Leadership Principles
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
              Leadership built on trust.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-6 text-white/50 sm:text-[11px]">
              We believe responsible leadership means
              protecting the purpose of the organisation,
              respecting stakeholders and using entrusted
              resources responsibly.
            </p>

          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {principles.map((item) => (

              <div
                key={item.number}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:bg-white/[0.08]"
              >

                <span className="text-[8px] font-bold text-[#D5A93A]">
                  {item.number}
                </span>

                <h3 className="mt-3 text-sm font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-[9px] leading-5 text-white/45">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/governance"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#178F87] px-5 text-[10px] font-bold text-white transition hover:bg-[#106E69]"
            >
              Governance
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/transparency"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#E46F57] px-5 text-[10px] font-bold text-white transition hover:bg-[#CA5944]"
            >
              Transparency
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/about/vision-mission"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 text-[10px] font-bold text-white transition hover:bg-white/15"
            >
              Vision & Mission
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          CONTACT
      ==================================================== */}

      <section className="border-t border-[#DCE5E3] bg-white px-4 py-8 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-3 md:grid-cols-3">

            <a
              href={`mailto:${trust.email}`}
              className="group rounded-2xl border border-[#DCE5E3] bg-[#F8FAF9] p-5 transition hover:-translate-y-0.5 hover:border-[#178F87] hover:bg-white"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F4F1] text-[#178F87]">

                <Mail size={18} />

              </div>

              <p className="mt-4 text-[8px] font-bold uppercase tracking-wider text-[#718087]">
                General Email
              </p>

              <p className="mt-1 text-[11px] font-bold text-[#173B4D]">
                {trust.email}
              </p>

            </a>

            <a
              href={`tel:${trust.phone.replace(/\s/g, "")}`}
              className="group rounded-2xl border border-[#DCE5E3] bg-[#F8FAF9] p-5 transition hover:-translate-y-0.5 hover:border-[#E46F57] hover:bg-white"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0EC] text-[#E46F57]">

                <span className="text-sm">
                  ☎
                </span>

              </div>

              <p className="mt-4 text-[8px] font-bold uppercase tracking-wider text-[#718087]">
                Contact
              </p>

              <p className="mt-1 text-[11px] font-bold text-[#173B4D]">
                {trust.phone}
              </p>

            </a>

            <Link
              href="/contact"
              className="group rounded-2xl border border-[#DCE5E3] bg-[#173B4D] p-5 transition hover:-translate-y-0.5 hover:bg-[#102F3D]"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D5A93A] text-white">

                <ArrowRight size={18} />

              </div>

              <p className="mt-4 text-[8px] font-bold uppercase tracking-wider text-[#D5A93A]">
                Get in Touch
              </p>

              <p className="mt-1 text-[11px] font-bold text-white">
                Contact Anand Jivan Foundation Trust
              </p>

            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          REGISTERED OFFICE
      ==================================================== */}

      <section className="bg-[#FFF9F2] px-4 py-8 sm:px-5">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#E46F57]">
            Registered Office
          </p>

          <h2 className="mt-2 font-serif text-xl font-bold text-[#173B4D]">
            {trust.name}
          </h2>

          <p className="mx-auto mt-2 max-w-3xl text-[9px] leading-5 text-[#718087]">
            {trust.address}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[8px] font-bold text-[#D5A93A]">

            <span>
              DARPAN ID: {trust.darpan}
            </span>

            <span>•</span>

            <span>
              PAN: {trust.pan}
            </span>

          </div>

        </div>

      </section>

      
    </main>
  );
}

/* ==========================================================
   STRUCTURE CARD
========================================================== */

function StructureCard({
  number,
  title,
  icon,
  text,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-[#DCE5E3] bg-white p-5 shadow-[0_8px_28px_rgba(23,59,77,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#178F87]/40 hover:shadow-[0_18px_42px_rgba(23,59,77,0.10)]">

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#178F87] via-[#D5A93A] to-[#E46F57]" />

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F4F1] text-[#178F87] transition group-hover:bg-[#178F87] group-hover:text-white">
          {icon}
        </div>

        <span className="text-[8px] font-bold text-[#D5A93A]">
          {number}
        </span>

      </div>

      <h3 className="mt-5 font-serif text-xl font-bold text-[#173B4D]">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-[#718087]">
        {text}
      </p>

    </div>
  );
}