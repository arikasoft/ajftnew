"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HandHeart,
  HeartHandshake,
  Home,
  Leaf,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sprout,
  Users,
  WalletCards,
} from "lucide-react";

/* ==========================================================
   AJFT — COMMUNITY DEVELOPMENT
   SPECIAL PROGRAMME AREA
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
   PROGRAMME AREAS
========================================================== */

const programmeAreas = [
  {
    icon: Users,
    title: "Community Empowerment",
    text:
      "Encouraging communities to participate in identifying needs, planning solutions and creating positive local change.",
  },
  {
    icon: Sprout,
    title: "Rural Development",
    text:
      "Supporting practical initiatives that contribute to stronger rural communities and improved local opportunities.",
  },
  {
    icon: HeartHandshake,
    title: "Women & Youth",
    text:
      "Encouraging participation, leadership, skills and meaningful opportunities for women and young people.",
  },
  {
    icon: Building2,
    title: "Community Infrastructure",
    text:
      "Supporting useful facilities and basic infrastructure where identified needs and resources allow.",
  },
];

const focusAreas = [
  "Village and community development",
  "Women empowerment and participation",
  "Youth engagement and leadership",
  "Livelihood and skill development",
  "Community awareness and mobilisation",
  "Basic facilities and local infrastructure",
  "Environmental responsibility",
  "Partnerships with local stakeholders",
];

const approach = [
  {
    number: "01",
    title: "Listen",
    text:
      "Understand local needs, priorities and challenges through community engagement.",
  },
  {
    number: "02",
    title: "Plan",
    text:
      "Develop practical activities according to identified needs and available resources.",
  },
  {
    number: "03",
    title: "Collaborate",
    text:
      "Work with communities, volunteers, institutions and responsible partners.",
  },
  {
    number: "04",
    title: "Strengthen",
    text:
      "Focus on participation, ownership and solutions that can support longer-term progress.",
  },
];

const outcomes = [
  {
    icon: Users,
    title: "Stronger Communities",
    text:
      "Encouraging people to participate in decisions and activities affecting their communities.",
  },
  {
    icon: Lightbulb,
    title: "Local Solutions",
    text:
      "Supporting practical ideas that respond to real community needs.",
  },
  {
    icon: WalletCards,
    title: "Better Opportunities",
    text:
      "Promoting pathways towards skills, participation and livelihoods.",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    text:
      "Encouraging responsible and environmentally conscious community development.",
  },
];

/* ==========================================================
   PAGE
========================================================== */

export default function CommunityDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F1] text-[#24352F]">

      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-[#173F35] px-4 py-12 sm:px-5 md:py-16">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#65A30D]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#D96B4A]/15 blur-3xl" />

        <div className="pointer-events-none absolute right-[12%] top-10 h-24 w-24 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-6xl">

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[#E5B84B]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E5B84B]">
                  Community Development
                </span>

              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#D96B4A]">
                People • Participation • Progress
              </p>

              <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">

                Stronger
                <br />

                <span className="text-[#D96B4A]">
                  Communities
                </span>

                <br />

                Better Opportunities

              </h1>

              <p className="mt-5 max-w-xl text-[11px] leading-6 text-white/65 sm:text-sm">
                We work with communities to support practical
                development, participation, empowerment and
                opportunities that can contribute to stronger
                and more resilient local communities.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">

                <Link
                  href="/donate"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E5B84B] px-6 text-[10px] font-bold text-[#173F35] shadow-lg transition hover:bg-[#D4A83D]"
                >
                  Support Community Work
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-[10px] font-bold text-white transition hover:bg-white/15"
                >
                  View Projects
                </Link>

              </div>

            </div>

            {/* RIGHT VISUAL */}

            <div className="relative">

              <div className="mx-auto max-w-md rounded-[30px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm">

                <div className="rounded-[24px] bg-[#FBFAF5] p-5">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F0DD] text-[#4D7C0F]">
                      <Users size={25} />
                    </div>

                    <span className="rounded-full bg-[#FBE8E1] px-3 py-1.5 text-[8px] font-bold text-[#B94F35]">
                      COMMUNITY
                    </span>

                  </div>

                  <h2 className="mt-6 font-serif text-2xl font-bold text-[#24352F]">
                    Change begins
                    <br />
                    with people.
                  </h2>

                  <p className="mt-3 text-[10px] leading-5 text-[#6B7973]">
                    Communities are strongest when people
                    participate, collaborate and create
                    solutions together.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-[#EEF6E9] p-4">
                      <Users
                        size={18}
                        className="text-[#4D7C0F]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#24352F]">
                        People
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FEF4D8] p-4">
                      <HandHeart
                        size={18}
                        className="text-[#B7791F]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#24352F]">
                        Participation
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#FBE8E1] p-4">
                      <Building2
                        size={18}
                        className="text-[#C85C42]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#24352F]">
                        Development
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#EDF5F2] p-4">
                      <Leaf
                        size={18}
                        className="text-[#28745E]"
                      />
                      <p className="mt-3 text-[9px] font-bold text-[#24352F]">
                        Sustainability
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          INFORMATION BAR
      ==================================================== */}

      <section className="border-b border-[#DDE4DE] bg-white px-4 py-5 sm:px-5">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E5] text-[#4D7C0F]">
              <MapPin size={18} />
            </div>

            <div>

              <p className="text-[9px] font-bold uppercase tracking-wider text-[#4D7C0F]">
                Community Focus
              </p>

              <p className="mt-0.5 text-[10px] text-[#68766F]">
                Working with communities towards practical
                and meaningful development.
              </p>

            </div>

          </div>

          <Link
            href="/contact"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#D9C9B5] px-4 text-[9px] font-bold text-[#B45335] transition hover:bg-[#FFF7F2]"
          >
            Partner With Us
            <ArrowRight size={13} />
          </Link>

        </div>

      </section>

      {/* ====================================================
          INTRODUCTION
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#B45335]">
                Why Community Development
              </p>

              <h2 className="mt-2 max-w-xl font-serif text-3xl font-bold leading-tight text-[#173F35] md:text-4xl">
                Development becomes stronger
                <span className="text-[#B45335]">
                  {" "}when communities participate.
                </span>
              </h2>

            </div>

            <div>

              <p className="text-[11px] leading-6 text-[#68766F] sm:text-xs">
                Community development is about people having
                opportunities to participate, identify local
                priorities and contribute towards solutions.
              </p>

              <p className="mt-4 text-[11px] leading-6 text-[#68766F] sm:text-xs">
                Our approach encourages collaboration with
                communities, volunteers, institutions and
                partners so that activities can respond to
                real local needs and available resources.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          FOUR AREAS
      ==================================================== */}

      <section className="bg-[#EEF2EA] px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#B7791F]">
              Our Approach
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#173F35] md:text-3xl">
              Building stronger local communities
            </h2>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {programmeAreas.map((item, index) => {

              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-[22px] border border-[#D8E1D7] bg-white p-5 shadow-[0_7px_25px_rgba(23,63,53,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9EBE8E] hover:shadow-[0_16px_35px_rgba(23,63,53,0.10)]"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3E5] text-[#4D7C0F] transition group-hover:bg-[#4D7C0F] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <span className="text-[8px] font-bold text-[#B7791F]">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-[#173F35]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-[#68766F]">
                    {item.text}
                  </p>

                </article>
              );
            })}

          </div>

        </div>

      </section>

      {/* ====================================================
          FOCUS AREAS
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">

            {/* LEFT PANEL */}

            <div className="rounded-[26px] bg-[#173F35] p-7 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5B84B] text-[#173F35]">
                <HandHeart size={22} />
              </div>

              <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.28em] text-[#D96B4A]">
                Priority Areas
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                Where we focus
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-white/55">
                Our activities can respond to local needs,
                community priorities and opportunities for
                collaboration.
              </p>

              <Link
                href="/projects"
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#D96B4A] px-5 text-[9px] font-bold text-white transition hover:bg-[#C75A3D]"
              >
                View Projects
                <ArrowRight size={14} />
              </Link>

            </div>

            {/* RIGHT */}

            <div className="grid gap-2.5 sm:grid-cols-2">

              {focusAreas.map((item, index) => (

                <div
                  key={item}
                  className="group flex items-start gap-3 rounded-xl border border-[#DDE4DE] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#A7BE9D] hover:bg-[#FCFDFB]"
                >

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDF5E9] transition group-hover:bg-[#4D7C0F]">

                    <CheckCircle2
                      size={14}
                      className="text-[#4D7C0F] group-hover:text-white"
                    />

                  </div>

                  <div>

                    <span className="text-[7px] font-bold text-[#B7791F]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-0.5 text-[10px] font-semibold leading-5 text-[#24352F]">
                      {item}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================
          APPROACH
      ==================================================== */}

      <section className="border-y border-[#DDE4DE] bg-white px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#B45335]">
              Our Process
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#173F35] md:text-3xl">
              From community need to action
            </h2>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">

            {approach.map((item) => (

              <article
                key={item.number}
                className="rounded-[22px] border border-[#DDE4DE] bg-[#FBFCFA] p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3E5] text-[8px] font-bold text-[#4D7C0F]">
                    {item.number}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D96B4A]" />

                </div>

                <h3 className="mt-5 font-serif text-lg font-bold text-[#173F35]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-[#68766F]">
                  {item.text}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================
          EXPECTED IMPACT
      ==================================================== */}

      <section className="px-4 py-10 sm:px-5 md:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#B7791F]">
                Community Impact
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#173F35]">
                Creating stronger
                <span className="text-[#B45335]">
                  {" "}possibilities
                </span>
              </h2>

              <p className="mt-3 text-[10px] leading-6 text-[#68766F] sm:text-[11px]">
                The aim is to support people and communities
                in creating practical pathways towards
                participation, opportunity and resilience.
              </p>

              <Link
                href="/impact"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold text-[#4D7C0F] hover:text-[#B45335]"
              >
                See Our Impact
                <ArrowRight size={13} />
              </Link>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {outcomes.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-[#DDE4DE] bg-white p-5 shadow-[0_6px_22px_rgba(23,63,53,0.05)]"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3E5] text-[#4D7C0F]">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-[#173F35]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[9px] leading-5 text-[#68766F]">
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
          VOLUNTEER / PARTNER
      ==================================================== */}

      <section className="bg-[#F7EDE6] px-4 py-10 sm:px-5 md:py-12">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D96B4A] text-white">
            <Users size={21} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#B45335]">
            Communities • Volunteers • Partners
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#173F35] md:text-3xl">
            Stronger communities are built together.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-6 text-[#68766F]">
            Individuals, volunteers, schools, institutions,
            community organisations and responsible partners
            can contribute to meaningful local development.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/volunteer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#173F35] px-6 text-[10px] font-bold text-white transition hover:bg-[#10332B]"
            >
              Become a Volunteer
              <Users size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D7BBAA] bg-white px-6 text-[10px] font-bold text-[#B45335] transition hover:bg-[#FFF9F5]"
            >
              Discuss a Partnership
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* ====================================================
          DONATE
      ==================================================== */}

      <section className="bg-[#173F35] px-4 py-11 sm:px-5 md:py-14">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E5B84B] text-[#173F35]">
            <HandHeart size={22} />
          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#D96B4A]">
            Support Community Development
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
            Help create stronger communities.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[10px] leading-6 text-white/50">
            Your support can contribute towards community
            initiatives, participation, opportunities and
            practical development activities.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E5B84B] px-7 text-[10px] font-bold text-[#173F35] transition hover:bg-[#D4A83D]"
            >
              Support Our Work
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
          QUICK LINKS
      ==================================================== */}

      <section className="border-t border-[#DDE4DE] bg-white px-4 py-7 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/programs"
              title="All Programmes"
              text="Explore the wider programme areas."
            />

            <QuickLink
              href="/projects"
              title="Our Projects"
              text="Explore community initiatives."
            />

            <QuickLink
              href="/impact"
              title="Our Impact"
              text="See the outcomes of our work."
            />

            <QuickLink
              href="/contact"
              title="Contact Us"
              text="Talk to the Trust about collaboration."
            />

          </div>

        </div>

      </section>

     

    </main>
  );
}

/* ==========================================================
   QUICK LINK
========================================================== */

function QuickLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#DDE4DE] bg-[#FAFBF9] p-4 transition hover:-translate-y-0.5 hover:border-[#A7BE9D] hover:bg-white"
    >

      <div className="flex items-center justify-between">

        <h3 className="text-[10px] font-bold text-[#173F35]">
          {title}
        </h3>

        <ArrowRight
          size={13}
          className="text-[#B45335] transition group-hover:translate-x-1"
        />

      </div>

      <p className="mt-1.5 text-[8px] leading-4 text-[#718078]">
        {text}
      </p>

    </Link>
  );
}