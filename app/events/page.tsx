import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Users,
} from "lucide-react";

const upcomingEvents = [
  {
    title: "Community Awareness & Development Camp",
    date: "12 September 2026",
    day: "12",
    month: "SEP",
    time: "10:00 AM – 2:00 PM",
    location: "Darbhanga, Bihar",
    category: "Community",
    description:
      "A community-focused programme bringing people together for awareness, participation and local development.",
    image: "/images/home/hero-04.jpg",
  },
  {
    title: "Education Support Programme",
    date: "25 September 2026",
    day: "25",
    month: "SEP",
    time: "9:30 AM – 1:00 PM",
    location: "Darbhanga, Bihar",
    category: "Education",
    description:
      "An initiative focused on supporting children and creating better educational opportunities.",
    image: "/images/home/hero-01.jpg",
  },
  {
    title: "Women Skill Development Workshop",
    date: "08 October 2026",
    day: "08",
    month: "OCT",
    time: "11:00 AM – 3:00 PM",
    location: "Darbhanga, Bihar",
    category: "Women Empowerment",
    description:
      "A practical workshop encouraging skills, confidence and opportunities for women in the community.",
    image: "/images/home/hero-03.jpg",
  },
];

const pastEvents = [
  {
    title: "Together We Can Community Activity",
    date: "August 2026",
    category: "Community",
    image: "/images/home/hero-07.jpg",
  },
  {
    title: "Child Welfare & Education Activity",
    date: "July 2026",
    category: "Child Welfare",
    image: "/images/home/hero-05.jpg",
  },
  {
    title: "Environment & Plantation Initiative",
    date: "June 2026",
    category: "Environment",
    image: "/images/home/hero-06.jpg",
  },
];

export default function EventsPage() {
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

              <CalendarDays
                size={15}
                className="text-[#F2C94C]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                AJFT Events
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Events That
              <span className="block text-[#F2C94C]">
                Bring Us Together
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Explore upcoming programmes, community
              activities and initiatives of Anand Jivan
              Foundation Trust.
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
          UPCOMING EVENTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

        <div className="mb-10">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            What&apos;s Coming
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
            Upcoming Events
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Join us in our upcoming programmes and help
            create meaningful change in communities.
          </p>

        </div>

        <div className="grid gap-7 lg:grid-cols-3">

          {upcomingEvents.map(
            (event, index) => (

              <article
                key={`${event.title}-${index}`}
                className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* IMAGE */}

                <div className="relative h-56 overflow-hidden">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-white shadow-xl">

                    <span className="text-xl font-black leading-none text-[#087E8B]">
                      {event.day}
                    </span>

                    <span className="mt-1 text-[8px] font-black tracking-widest text-slate-400">
                      {event.month}
                    </span>

                  </div>

                  <span className="absolute bottom-4 left-4 rounded-full bg-[#D99A16] px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-white">
                    {event.category}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <h3 className="text-xl font-black leading-snug text-[#102A43] transition group-hover:text-[#087E8B]">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3">

                    <EventMeta
                      icon={<CalendarDays size={14} />}
                      text={event.date}
                    />

                    <EventMeta
                      icon={<Clock3 size={14} />}
                      text={event.time}
                    />

                    <EventMeta
                      icon={<MapPin size={14} />}
                      text={event.location}
                    />

                  </div>

                  <Link
                    href={`/events/${index + 1}`}
                    className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#087E8B] text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-[#066C77]"
                  >
                    View Event
                    <ArrowRight size={14} />
                  </Link>

                </div>

              </article>

            )
          )}

        </div>

      </section>

      {/* =====================================================
          PARTICIPATION BANNER
      ====================================================== */}

      <section className="relative overflow-hidden bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#073B4C]">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D99A16]/20 blur-3xl" />

            <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-[#0E7183]/30 blur-3xl" />

            <div className="relative grid gap-8 px-7 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-10">

              <div>

                <div className="flex items-center gap-2 text-[#F2C94C]">

                  <Users size={18} />

                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                    Get Involved
                  </span>

                </div>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  Be Part of Our Next Event
                </h2>

                <p className="mt-3 max-w-xl text-xs leading-6 text-white/65">
                  Your time, skills and participation can
                  help make community programmes more
                  meaningful and impactful.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <Link
                  href="/volunteer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D99A16] px-5 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#C4870B]"
                >
                  Volunteer
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Contact Us
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PAST EVENTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-8">

        <div className="mb-10">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#087E8B]">
            Our Journey
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
            Past Events
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {pastEvents.map(
            (event, index) => (

              <article
                key={`${event.title}-${index}`}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="relative h-52 overflow-hidden">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                </div>

                <div className="p-5">

                  <span className="text-[8px] font-black uppercase tracking-wider text-[#087E8B]">
                    {event.category}
                  </span>

                  <h3 className="mt-2 text-lg font-black text-[#102A43]">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-[10px] font-semibold text-slate-400">
                    {event.date}
                  </p>

                </div>

              </article>

            )
          )}

        </div>

      </section>

      {/* =====================================================
          DONATE CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,113,131,.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(217,154,22,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">

          <Heart
            size={28}
            className="mx-auto text-[#F2C94C]"
            fill="currentColor"
          />

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Every Event Can Create Impact
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Support community-focused activities and
            help us continue creating opportunities for
            people and communities.
          </p>

          <Link
            href="/donate"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#D99A16] px-7 text-xs font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#C4870B]"
          >
            <Heart
              size={15}
              fill="currentColor"
            />
            Support Our Work
          </Link>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   EVENT META
===================================================== */

function EventMeta({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[#087E8B]">
        {icon}
      </span>

      <span>{text}</span>

    </div>
  );
}