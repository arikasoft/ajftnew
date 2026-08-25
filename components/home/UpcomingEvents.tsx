import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

const events = [
  {
    month: "AUG",
    day: "25",
    category: "Community",
    title: "Community Outreach Initiative",
    description:
      "A community-focused engagement activity supporting awareness, participation and local development.",
    time: "10:00 AM",
    location: "Darbhanga, Bihar",
  },
  {
    month: "SEP",
    day: "07",
    category: "Education",
    title: "Education Support Activity",
    description:
      "An education-focused activity supporting learning, participation and opportunities for children.",
    time: "11:00 AM",
    location: "Bihar",
  },
  {
    month: "SEP",
    day: "21",
    category: "Awareness",
    title: "Community Awareness Programme",
    description:
      "A community awareness initiative focused on participation, dignity and responsible social action.",
    time: "10:30 AM",
    location: "Darbhanga, Bihar",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-white px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#C09230]">
                Events & Activities
              </p>

            </div>

            <h2 className="mt-4 font-serif text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
              Upcoming
              <span className="text-[#087E8B]">
                {" "}Events
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-[#718394] md:text-sm">
              Stay connected with upcoming activities, community
              programmes and initiatives of Anand Jivan Foundation Trust.
            </p>

          </div>

          <Link
            href="/events"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-[#D8E2E7]
              bg-white
              px-5
              py-3
              text-[10px]
              font-black
              text-[#087E8B]
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-[#087E8B]
              hover:shadow-md
            "
          >
            View All Events
            <ArrowRight size={14} />
          </Link>

        </div>

        {/* =====================================================
            FEATURED EVENT
        ====================================================== */}

        <div className="mt-10 overflow-hidden rounded-[28px] bg-[#102A43]">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* DATE PANEL */}

            <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-[#0B3549] via-[#087E8B] to-[#15536A]">

              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />

              <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full border border-[#D6A63A]/20" />

              <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D9B65A]">
                  Featured Event
                </p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.08] px-8 py-5 backdrop-blur">

                  <p className="text-xs font-black tracking-[0.2em] text-white/60">
                    AUGUST
                  </p>

                  <p className="mt-1 font-serif text-6xl font-black leading-none text-white">
                    25
                  </p>

                  <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-white/45">
                    2026
                  </p>

                </div>

              </div>

            </div>

            {/* EVENT CONTENT */}

            <div className="p-7 sm:p-9 md:p-12">

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-[#D6A63A]/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#D6A63A]">
                  Community
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[8px] font-bold text-white/55">
                  Upcoming
                </span>

              </div>

              <h3 className="mt-5 max-w-2xl font-serif text-2xl font-black leading-tight text-white sm:text-3xl">
                Community Outreach Initiative
              </h3>

              <p className="mt-4 max-w-2xl text-xs leading-6 text-white/45 md:text-sm">
                A community-focused engagement activity supporting
                awareness, participation and local development.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] text-[#D9B65A]">
                    <Clock3 size={16} />
                  </div>

                  <div>

                    <p className="text-[8px] font-black uppercase tracking-wider text-white/25">
                      Time
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-white/65">
                      10:00 AM
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] text-[#D9B65A]">
                    <MapPin size={16} />
                  </div>

                  <div>

                    <p className="text-[8px] font-black uppercase tracking-wider text-white/25">
                      Location
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-white/65">
                      Darbhanga, Bihar
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-7 flex flex-col gap-2 sm:flex-row">

                <Link
                  href="/events"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#D6A63A]
                    px-5
                    py-3
                    text-[10px]
                    font-black
                    text-white
                    transition
                    hover:bg-[#BD8D28]
                  "
                >
                  Event Details
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    px-5
                    py-3
                    text-[10px]
                    font-black
                    text-white
                    transition
                    hover:bg-white/10
                  "
                >
                  Contact Us
                  <ArrowUpRight size={14} />
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            EVENT CARDS
        ====================================================== */}

        <div className="mt-5 grid gap-5 md:grid-cols-3">

          {events.map((event) => (
            <article
              key={`${event.month}-${event.day}`}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-[#DCE5EA]
                bg-[#F8FAFB]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#087E8B]/30
                hover:bg-white
                hover:shadow-[0_18px_45px_rgba(16,42,67,0.08)]
              "
            >

              <div className="flex">

                {/* DATE */}

                <div
                  className="
                    flex
                    w-[82px]
                    shrink-0
                    flex-col
                    items-center
                    justify-center
                    bg-[#102A43]
                    px-3
                    py-7
                    text-center
                  "
                >

                  <span className="text-[9px] font-black tracking-[0.2em] text-[#D9B65A]">
                    {event.month}
                  </span>

                  <span className="mt-1 font-serif text-4xl font-black leading-none text-white">
                    {event.day}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1 p-5">

                  <div className="flex items-center justify-between gap-3">

                    <span className="rounded-full bg-[#EAF5F7] px-2.5 py-1 text-[7px] font-black uppercase tracking-wider text-[#087E8B]">
                      {event.category}
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="
                        text-[#B0BBC2]
                        transition
                        group-hover:text-[#D6A63A]
                      "
                    />

                  </div>

                  <h3 className="mt-4 font-serif text-lg font-black leading-tight text-[#102A43]">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-[9px] leading-5 text-[#718394]">
                    {event.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <span className="flex items-center gap-1.5 text-[8px] font-bold text-[#8997A2]">
                      <Clock3
                        size={11}
                        className="text-[#087E8B]"
                      />
                      {event.time}
                    </span>

                    <span className="flex items-center gap-1.5 text-[8px] font-bold text-[#8997A2]">
                      <MapPin
                        size={11}
                        className="text-[#087E8B]"
                      />
                      {event.location}
                    </span>

                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* =====================================================
            EVENT CTA
        ====================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-5
            rounded-3xl
            border
            border-[#DCE5EA]
            bg-white
            p-6
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
            md:p-7
          "
        >

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F7] text-[#087E8B]">
              <Users size={19} />
            </div>

            <div>

              <h3 className="text-sm font-black text-[#102A43]">
                Want to participate?
              </h3>

              <p className="mt-1 text-[9px] text-[#8997A2]">
                Connect with AJFT for upcoming activities and opportunities.
              </p>

            </div>

          </div>

          <Link
            href="/volunteer"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#087E8B]
              px-6
              py-3
              text-[10px]
              font-black
              text-white
              transition
              hover:bg-[#066C77]
            "
          >
            Join as Volunteer
            <ArrowRight size={14} />
          </Link>

        </div>

        {/* =====================================================
            CALENDAR NOTE
        ====================================================== */}

        <div className="mt-5 flex items-center justify-center gap-2 text-center">

          <Sparkles
            size={13}
            className="text-[#D6A63A]"
          />

          <p className="text-[9px] font-semibold text-[#9AA6AE]">
            Event dates and activities may change according to organisational requirements.
          </p>

          <CalendarDays
            size={13}
            className="text-[#087E8B]"
          />

        </div>

      </div>
    </section>
  );
}