import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

const projects = [
  {
    number: "01",
    icon: Building2,
    title: "Community Infrastructure",
    category: "Community Development",
    description:
      "Need-based infrastructure initiatives designed to improve essential facilities and support community well-being.",
    status: "Project Portfolio",
  },
  {
    number: "02",
    icon: Users,
    title: "Education Support",
    category: "Education",
    description:
      "Initiatives focused on strengthening learning environments, educational resources and opportunities.",
    status: "Project Portfolio",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Social Support Initiatives",
    category: "Social Development",
    description:
      "Community-oriented support activities intended to assist people and families based on identified needs.",
    status: "Project Portfolio",
  },
];

const projectProcess = [
  "Identify the community need",
  "Assess feasibility and resources",
  "Develop an appropriate project plan",
  "Implement with responsible oversight",
  "Document activities and outcomes",
  "Review and communicate progress",
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#243B53]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#102A43] px-4 py-9 sm:px-5 sm:py-11">

        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#C59A3A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C59A3A] text-white shadow-lg">

            <Building2 size={25} />

          </div>

          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D9B65A]">
            Anand Jivan Foundation Trust
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Projects
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-sm">
            A portfolio of initiatives through which the
            Trust seeks to translate its mission into
            practical community action.
          </p>

        </div>

      </section>

      {/* =====================================================
          TRUST BAR
      ====================================================== */}

      <section className="border-b border-[#DCE4EA] bg-white">

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-[8px] font-semibold text-[#687B8C] sm:text-[9px]">

          <span>
            DARPAN ID: BR/2023/0343963
          </span>

          <span className="text-[#C59A3A]">•</span>

          <span>
            PAN: AAJTA9323K
          </span>

          <span className="text-[#C59A3A]">•</span>

          <span>
            +91 9155751363
          </span>

          <span className="text-[#C59A3A]">•</span>

          <span>
            info@ajftrust.org
          </span>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-8 sm:px-5 md:py-10">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            Project Portfolio
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
            From ideas to measurable action
          </h2>

          <p className="mx-auto mt-3 text-[11px] leading-6 text-[#687B8C] sm:text-xs">
            Projects are developed around identified needs,
            available resources and the Trust's charitable
            objectives.
          </p>

        </div>

      </section>

      {/* =====================================================
          PROJECT CARDS
      ====================================================== */}

      <section className="px-4 pb-10 sm:px-5">

        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">

          {projects.map(
            ({
              number,
              icon: Icon,
              title,
              category,
              description,
              status,
            }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-2xl border border-[#DCE4EA] bg-white shadow-[0_8px_25px_rgba(16,42,67,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(16,42,67,0.10)]"
              >

                {/* Card top */}

                <div className="bg-[#173B4D] p-5">

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C59A3A] text-white">

                      <Icon size={21} />

                    </div>

                    <span className="font-serif text-2xl font-bold text-white/10">
                      {number}
                    </span>

                  </div>

                  <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#D9B65A]">
                    {category}
                  </p>

                  <h3 className="mt-1 font-serif text-xl font-bold text-white">
                    {title}
                  </h3>

                </div>

                {/* Card body */}

                <div className="p-5">

                  <p className="text-[10px] leading-5 text-[#718394] sm:text-[11px]">
                    {description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E9EEF1] pt-4">

                    <span className="flex items-center gap-1.5 rounded-full bg-[#EEF6F8] px-2.5 py-1 text-[8px] font-bold text-[#176B87]">

                      <CheckCircle2 size={11} />

                      {status}

                    </span>

                    <span className="text-[9px] font-semibold text-[#9AA8B3]">
                      Details coming
                    </span>

                  </div>

                </div>

              </article>
            )
          )}

        </div>

      </section>

      {/* =====================================================
          PROJECT INFORMATION
      ====================================================== */}

      <section className="border-y border-[#DCE4EA] bg-white px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
                Project Information
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43] md:text-3xl">
                What every project page can show
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-[#627789] sm:text-xs">
                As individual projects are added, their
                public pages can include verified details,
                progress and outcomes.
              </p>

            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">

              <InfoCard
                icon={CalendarDays}
                title="Project Duration"
                text="Start date, duration and current status."
              />

              <InfoCard
                icon={MapPin}
                title="Location"
                text="Project location and community served."
              />

              <InfoCard
                icon={Users}
                title="Beneficiaries"
                text="Intended beneficiaries and reach."
              />

              <InfoCard
                icon={ShieldCheck}
                title="Progress"
                text="Activities, updates and documented outcomes."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="bg-[#173B4D] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-center">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9B65A]">
                Our Project Approach
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                Responsible project development
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/55 sm:text-xs">
                We aim to approach projects in a structured
                manner, keeping community needs,
                implementation and accountability in focus.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">

              {projectProcess.map(
                (item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C59A3A]">

                      <span className="text-[9px] font-bold text-white">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                    </div>

                    <p className="mt-3 text-[10px] font-semibold leading-4 text-white/80">
                      {item}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRANSPARENCY
      ====================================================== */}

      <section className="bg-[#F4F7FA] px-4 py-9 sm:px-5 md:py-11">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#DCE4EA] bg-white p-6 text-center md:p-8">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3F6]">

            <ShieldCheck
              size={20}
              className="text-[#176B87]"
            />

          </div>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C59A3A]">
            Transparency
          </p>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#102A43]">
            Project information should be verifiable
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[10px] leading-5 text-[#718394] sm:text-[11px]">
            As project records become available, individual
            project pages can publish appropriate details,
            photographs, progress updates and reports.
          </p>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="border-t border-[#DCE4EA] bg-white px-4 py-8">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="font-serif text-2xl font-bold text-[#102A43]">
            Support community-focused initiatives
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-[#718394]">
            Your support can contribute towards charitable
            and community development initiatives.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#176B87] px-6 text-xs font-bold text-white shadow-md transition hover:bg-[#12566D]"
            >
              Support Our Work
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/programs"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#CBD5DC] bg-white px-6 text-xs font-bold text-[#176B87] transition hover:border-[#176B87]"
            >
              View Programs
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#102A43] px-4 py-5 text-center">

        <p className="text-[9px] font-bold tracking-wide text-white">
          ANAND JIVAN FOUNDATION TRUST
        </p>

        <p className="mt-1 text-[8px] leading-4 text-white/45">
          MABBI BELAUNA, POST - LALSHAHPUR,
          PANCHAYAT - SHAHBAJPUR,
          DARBHANGA, BIHAR - 846005, INDIA
        </p>

        <p className="mt-1 text-[8px] text-[#D9B65A]">
          DARPAN ID: BR/2023/0343963
          &nbsp; • &nbsp;
          PAN: AAJTA9323K
          &nbsp; • &nbsp;
          +91 9155751363
          &nbsp; • &nbsp;
          info@ajftrust.org
        </p>

      </footer>

    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CalendarDays;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#DCE4EA] bg-[#F7FAFC] p-4">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F3F6]">

        <Icon
          size={17}
          className="text-[#176B87]"
        />

      </div>

      <h3 className="mt-3 text-xs font-bold text-[#102A43]">
        {title}
      </h3>

      <p className="mt-1 text-[9px] leading-4 text-[#718394]">
        {text}
      </p>

    </div>
  );
}