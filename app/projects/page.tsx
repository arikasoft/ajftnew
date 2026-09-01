import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HandHeart,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Target,
  Users,
  BriefcaseBusiness,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Education Support Initiative",
    category: "Education",
    status: "Ongoing",
    description:
      "Supporting children and students from underserved communities through educational assistance, learning resources and community-based programmes.",
    icon: GraduationCap,
    location: "Darbhanga, Bihar",
    beneficiaries: "Students & Children",
    year: "2025–26",
    href: "/programs/education",
    number: "01",
  },
  {
    id: 2,
    title: "Community Healthcare Support",
    category: "Healthcare",
    status: "Ongoing",
    description:
      "Supporting healthcare awareness, medical assistance and community health initiatives for people from economically weaker sections.",
    icon: HeartPulse,
    location: "Bihar, India",
    beneficiaries: "Communities",
    year: "2025–26",
    href: "/programs/health",
    number: "02",
  },
  {
    id: 3,
    title: "Social Support Programme",
    category: "Social Welfare",
    status: "Ongoing",
    description:
      "Providing social assistance and support initiatives for vulnerable individuals and families in underserved communities.",
    icon: HandHeart,
    location: "Bihar, India",
    beneficiaries: "Families",
    year: "2025–26",
    href: "/programs/social-support",
    number: "03",
  },
  {
    id: 4,
    title: "Community Development Initiative",
    category: "Development",
    status: "Ongoing",
    description:
      "Promoting sustainable community development through participation, awareness, capacity building and local support initiatives.",
    icon: Building2,
    location: "Darbhanga & Bihar",
    beneficiaries: "Local Communities",
    year: "2025–26",
    href: "/programs/community-development",
    number: "04",
  },
];

const focusAreas = [
  {
    title: "Education",
    description:
      "Creating better learning opportunities and supporting children and students.",
    icon: BookOpen,
    href: "/programs/education",
  },
  {
    title: "Healthcare",
    description:
      "Promoting healthcare awareness and community health support initiatives.",
    icon: HeartPulse,
    href: "/programs/health",
  },
  {
    title: "Social Welfare",
    description:
      "Supporting vulnerable individuals and families through social initiatives.",
    icon: HandHeart,
    href: "/programs/social-support",
  },
  {
    title: "Community Development",
    description:
      "Encouraging sustainable and inclusive community development.",
    icon: Users,
    href: "/programs/community-development",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F7FB]">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0B1F3A]">
        {/* Background Decorations */}

        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#146C94]/25 blur-3xl" />

          <div className="absolute -bottom-52 -right-40 h-[560px] w-[560px] rounded-full bg-[#F4B942]/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur">
                <BriefcaseBusiness size={15} className="text-[#F4B942]" />

                AJFT Development Portfolio
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Creating Impact.
                <span className="block text-[#F4B942]">
                  Transforming Communities.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Anand Jivan Foundation Trust implements meaningful social
                development initiatives focused on education, healthcare,
                social welfare and sustainable community development.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#F4B942] px-6 py-3.5 text-sm font-black text-[#0B1F3A] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd16a]"
                >
                  Explore Our Projects

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </a>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  About AJFT
                  <ChevronRight size={17} />
                </Link>
              </div>
            </div>

            {/* HERO INFORMATION CARD */}

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4B942] text-[#0B1F3A]">
                    <TrendingUp size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Development Focus
                    </p>

                    <h3 className="mt-1 text-lg font-black text-white">
                      Sustainable Social Impact
                    </h3>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-black text-white">
                      4+
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Focus Areas
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-black text-white">
                      Ongoing
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Development Work
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-black text-[#F4B942]">
                      Bihar
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Primary Region
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-black text-white">
                      People
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      At The Centre
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#F4B942]/20 bg-[#F4B942]/10 p-4">
                  <Sparkles
                    size={19}
                    className="shrink-0 text-[#F4B942]"
                  />

                  <p className="text-xs leading-6 text-slate-200">
                    Working towards inclusive, responsible and sustainable
                    development through community participation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK IMPACT BAR
      ====================================================== */}

      <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 sm:grid-cols-4">
          {[
            ["4+", "Key Development Areas"],
            ["Education", "Supporting Learning"],
            ["Healthcare", "Community Support"],
            ["Development", "Building Communities"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`p-6 text-center ${
                index !== 3
                  ? "border-b border-slate-100 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <p className="text-xl font-black text-[#0B1F3A]">
                {value}
              </p>

              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[#146C94]">
              <Target size={18} />

              <span className="text-xs font-black uppercase tracking-[0.18em]">
                Our Approach
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#0B1F3A] sm:text-4xl">
              Projects Designed Around
              <span className="block text-[#146C94]">
                Community Needs.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-slate-600">
              Our development initiatives are designed to respond to the real
              needs of communities and promote inclusive opportunities for
              individuals and families.
            </p>

            <p className="mt-4 max-w-2xl leading-8 text-slate-600">
              We believe meaningful development requires responsible planning,
              community participation and continuous evaluation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Community-focused planning",
                "Inclusive implementation",
                "Responsible project management",
                "Long-term social impact",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#1E7A46]"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* IMPLEMENTATION CARD */}

          <div className="rounded-3xl bg-gradient-to-br from-[#146C94] to-[#0B1F3A] p-7 shadow-2xl sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#F4B942]">
              <ShieldCheck size={28} />
            </div>

            <h3 className="mt-6 text-2xl font-black text-white">
              Responsible Implementation
            </h3>

            <p className="mt-4 leading-7 text-slate-200">
              Each initiative follows a structured approach designed to promote
              transparency, participation and measurable social outcomes.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Needs Assessment",
                "Project Planning",
                "Community Participation",
                "Monitoring & Review",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-black text-[#F4B942]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="font-semibold text-white">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT LIST
      ====================================================== */}

      <section
        id="projects"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#146C94]">
                Development Initiatives
              </p>

              <h2 className="mt-4 text-3xl font-black text-[#0B1F3A] sm:text-4xl">
                Our Ongoing Projects
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Explore AJFT initiatives designed to create meaningful and
                sustainable impact across different areas of social
                development.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EAF3F7] px-4 py-2 text-xs font-bold text-[#146C94]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#1E7A46]" />
              Active Development Initiatives
            </div>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {projects.map((project) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#146C94]/30 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  {/* TOP STRIP */}

                  <div className="h-1.5 bg-gradient-to-r from-[#146C94] via-[#1E7A46] to-[#F4B942]" />

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3F7] text-[#146C94]">
                          <Icon size={28} />
                        </div>

                        <div>
                          <p className="text-[10px] font-black tracking-[0.16em] text-slate-400">
                            PROJECT {project.number}
                          </p>

                          <span className="mt-1 inline-block text-xs font-bold text-[#146C94]">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <span className="rounded-full border border-[#1E7A46]/20 bg-[#EAF7EF] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#1E7A46]">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-black leading-snug text-[#0B1F3A] sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {project.description}
                    </p>

                    <div className="mt-7 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                      <div>
                        <div className="flex items-center gap-2 text-[#146C94]">
                          <MapPin size={14} />

                          <span className="text-[10px] font-bold uppercase tracking-wide">
                            Location
                          </span>
                        </div>

                        <p className="mt-2 text-xs font-semibold text-slate-600">
                          {project.location}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#146C94]">
                          <Users size={14} />

                          <span className="text-[10px] font-bold uppercase tracking-wide">
                            Focus
                          </span>
                        </div>

                        <p className="mt-2 text-xs font-semibold text-slate-600">
                          {project.beneficiaries}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#146C94]">
                          <CalendarDays size={14} />

                          <span className="text-[10px] font-bold uppercase tracking-wide">
                            Period
                          </span>
                        </div>

                        <p className="mt-2 text-xs font-semibold text-slate-600">
                          {project.year}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={project.href}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#146C94] transition hover:gap-3"
                    >
                      Explore Programme

                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FOCUS AREAS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#146C94]">
            Areas Of Intervention
          </p>

          <h2 className="mt-4 text-3xl font-black text-[#0B1F3A] sm:text-4xl">
            Our Development Focus
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Our programmes are focused on areas where collective action and
            community participation can create meaningful social impact.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => {
            const Icon = area.icon;

            return (
              <Link
                key={area.title}
                href={area.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#146C94]/30 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3F7] text-[#146C94] transition group-hover:bg-[#146C94] group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 font-black text-[#0B1F3A]">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {area.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-black text-[#146C94]">
                  Explore

                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0B1F3A] px-6 py-14 sm:px-10 lg:px-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#146C94]/30 blur-3xl" />

          <div className="absolute -bottom-32 left-1/2 h-64 w-64 rounded-full bg-[#F4B942]/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[#F4B942]">
                <Sparkles size={17} />

                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Work With AJFT
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                Together We Can Create
                <span className="block text-[#F4B942]">
                  Meaningful Social Impact.
                </span>
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                Partner with Anand Jivan Foundation Trust to support meaningful
                initiatives and contribute towards stronger and more inclusive
                communities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-xl bg-[#F4B942] px-6 py-3.5 text-sm font-black text-[#0B1F3A] transition hover:bg-[#ffd16a]"
              >
                Partner With Us
              </Link>

              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}