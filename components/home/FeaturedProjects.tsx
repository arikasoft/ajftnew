import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Heart,
  MapPin,
  Users,
} from "lucide-react";

const projects = [
  {
    category: "Education",
    title: "Education & Learning Support",
    description:
      "Supporting children and communities through education-focused activities, learning resources and better opportunities.",
    location: "Darbhanga, Bihar",
    status: "Ongoing",
    progress: 72,
    icon: "📚",
  },
  {
    category: "Community Development",
    title: "Community Infrastructure",
    description:
      "Supporting practical community infrastructure initiatives that contribute to healthier and more dignified living.",
    location: "Bihar",
    status: "Ongoing",
    progress: 58,
    icon: "🏘️",
  },
  {
    category: "Women Empowerment",
    title: "Women & Livelihood Support",
    description:
      "Creating opportunities for women through awareness, skills, participation and community-based support.",
    location: "Bihar",
    status: "Active",
    progress: 64,
    icon: "👩",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-[#F5F8FA] px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#C09230]">
                Featured Projects
              </p>

            </div>

            <h2 className="mt-4 font-serif text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
              Turning Ideas Into
              <span className="text-[#087E8B]">
                {" "}Action
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-[#718394] md:text-sm">
              Explore selected initiatives through which Anand Jivan
              Foundation Trust works with communities and supports
              practical social development.
            </p>

          </div>

          <Link
            href="/projects"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-[#D6E0E5]
              bg-white
              px-5
              py-3
              text-[10px]
              font-black
              text-[#176B87]
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:border-[#176B87]
              hover:shadow-md
            "
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>

        </div>

        {/* =================================================
            PROJECT CARDS
        ================================================== */}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">

          {projects.map((project, index) => (
            <article
              key={project.title}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-[#DCE5EA]
                bg-white
                shadow-[0_10px_35px_rgba(16,42,67,0.045)]
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:border-[#087E8B]/30
                hover:shadow-[0_20px_55px_rgba(16,42,67,0.10)]
              "
            >

              {/* =================================================
                  VISUAL HEADER
              ================================================== */}

              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0B3448] via-[#087E8B] to-[#14546A]">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.15),transparent_35%)]" />

                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />

                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-[#D6A63A]/20" />

                <div className="relative flex h-full flex-col justify-between p-6">

                  <div className="flex items-start justify-between">

                    <span className="rounded-full border border-white/15 bg-black/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-white/80 backdrop-blur">
                      {project.category}
                    </span>

                    <span className="text-3xl drop-shadow-lg">
                      {project.icon}
                    </span>

                  </div>

                  <div>

                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D9B65A]">
                      Project {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-1 font-serif text-2xl font-black leading-tight text-white">
                      {project.title}
                    </h3>

                  </div>

                </div>

              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div className="p-6">

                <p className="text-[11px] leading-6 text-[#718394]">
                  {project.description}
                </p>

                {/* Meta */}

                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F7F8] px-3 py-1.5 text-[8px] font-bold text-[#536A79]">
                    <MapPin
                      size={11}
                      className="text-[#087E8B]"
                    />
                    {project.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF6E9] px-3 py-1.5 text-[8px] font-bold text-[#80651F]">
                    <CalendarDays size={11} />
                    {project.status}
                  </span>

                </div>

                {/* Progress */}

                <div className="mt-6">

                  <div className="flex items-center justify-between">

                    <span className="text-[8px] font-black uppercase tracking-wider text-[#8997A2]">
                      Project Progress
                    </span>

                    <span className="text-[9px] font-black text-[#087E8B]">
                      {project.progress}%
                    </span>

                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E9EFF2]">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#087E8B] to-[#D6A63A]"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Footer */}

                <div className="mt-6 flex items-center justify-between border-t border-[#EDF1F3] pt-5">

                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#8997A2]">

                    <Users
                      size={13}
                      className="text-[#087E8B]"
                    />

                    Community Focused

                  </div>

                  <Link
                    href="/projects"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F1F7F8]
                      text-[#087E8B]
                      transition-all
                      group-hover:bg-[#087E8B]
                      group-hover:text-white
                    "
                    aria-label={`View ${project.title}`}
                  >
                    <ArrowUpRight size={15} />
                  </Link>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================== */}

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

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#EAF5F7]
                text-[#087E8B]
              "
            >
              <Heart
                size={21}
                fill="currentColor"
              />
            </div>

            <div>

              <h3 className="text-sm font-black text-[#102A43]">
                Want to support a project?
              </h3>

              <p className="mt-1 text-[10px] text-[#8997A2]">
                Your support can help strengthen community initiatives.
              </p>

            </div>

          </div>

          <Link
            href="/donate"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#D6A63A]
              to-[#B98218]
              px-6
              py-3
              text-[10px]
              font-black
              text-white
              shadow-[0_8px_20px_rgba(190,130,24,0.18)]
              transition
              hover:-translate-y-0.5
            "
          >
            Support Our Work
            <ArrowRight size={14} />
          </Link>

        </div>

      </div>

    </section>
  );
}