import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Users,
  GraduationCap,
  Stethoscope,
  HandHeart,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const stories = [
  {
    category: "Education",
    title: "Creating Better Learning Opportunities",
    description:
      "Supporting children and students through learning resources, educational activities and community participation.",
    icon: GraduationCap,
    color: "blue",
    location: "Community Education Initiative",
  },
  {
    category: "Healthcare",
    title: "Building Health Awareness",
    description:
      "Community-focused health and awareness activities designed to encourage better well-being and preventive care.",
    icon: Stethoscope,
    color: "green",
    location: "Community Health Initiative",
  },
  {
    category: "Community",
    title: "Stronger Communities Together",
    description:
      "Working with communities to encourage participation, dignity, inclusion and sustainable development.",
    icon: Users,
    color: "gold",
    location: "Community Development Initiative",
  },
  {
    category: "Social Support",
    title: "Compassion In Action",
    description:
      "Supporting individuals and families through meaningful social welfare and community-focused initiatives.",
    icon: HandHeart,
    color: "violet",
    location: "Social Welfare Initiative",
  },
];

const steps = [
  "Understand community needs",
  "Plan practical interventions",
  "Work with local communities",
  "Implement activities responsibly",
  "Review outcomes and learning",
];

export default function ImpactStoriesPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1769AA]/30 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#3C9A32]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B54A]">
              <Heart size={12} fill="currentColor" />
              Impact Stories
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stories Of
              <span className="block text-[#55A9E8]">
                Meaningful Impact
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Every activity begins with people and communities.
              These stories represent the purpose behind our
              community-focused work and the difference we aim
              to create.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/donate"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D9B54A] px-5 text-xs font-black text-[#073B4C] shadow-lg transition hover:-translate-y-0.5"
              >
                Support Our Impact
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/impact/beneficiaries"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-bold text-white"
              >
                Our Beneficiaries
              </Link>

            </div>

          </div>

        </div>

        <div className="absolute bottom-[-1px] left-[-5%] h-12 w-[110%] rounded-[50%_50%_0_0] bg-[#F5F8F7]" />

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1769AA]">
              FROM ACTION TO IMPACT
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Small actions can create
              <span className="block text-[#1769AA]">
                meaningful change.
              </span>
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#D9B54A]" />

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Our impact is built through consistent community
              engagement, responsible implementation and
              meaningful participation.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              We believe that sustainable change is created when
              communities participate in identifying needs and
              developing practical solutions.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-100">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF4FF] text-[#1769AA]">
                <Heart size={27} fill="currentColor" />
              </div>

              <div>
                <p className="text-lg font-black text-[#073B4C]">
                  Our Impact Philosophy
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  People • Participation • Progress
                </p>
              </div>

            </div>

            <div className="mt-7 space-y-3">

              {[
                "Listen to communities",
                "Identify meaningful needs",
                "Support practical solutions",
                "Encourage participation",
                "Learn and improve",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-[#F7FAF9] p-3"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-[#3C9A32]"
                  />

                  <span className="text-xs font-bold text-slate-600">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STORIES
      ====================================================== */}

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#3C9A32]">
              FEATURED IMPACT AREAS
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#073B4C] sm:text-4xl">
              Where our work
              <span className="text-[#3C9A32]">
                {" "}creates value
              </span>
            </h2>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {stories.map((story) => {

              const Icon = story.icon;

              const theme =
                story.color === "blue"
                  ? {
                      bg: "bg-[#EEF7FD]",
                      border: "border-[#D7EAF8]",
                      icon: "bg-[#1769AA]",
                      text: "text-[#1769AA]",
                    }
                  : story.color === "green"
                  ? {
                      bg: "bg-[#F0F9ED]",
                      border: "border-[#D8ECD2]",
                      icon: "bg-[#3C9A32]",
                      text: "text-[#3C9A32]",
                    }
                  : story.color === "gold"
                  ? {
                      bg: "bg-[#FFFAED]",
                      border: "border-[#F0E2B7]",
                      icon: "bg-[#B88918]",
                      text: "text-[#A5740F]",
                    }
                  : {
                      bg: "bg-[#F7F2FC]",
                      border: "border-[#E7DCF3]",
                      icon: "bg-[#7C3AAF]",
                      text: "text-[#7C3AAF]",
                    };

              return (
                <article
                  key={story.title}
                  className={`group overflow-hidden rounded-3xl border ${theme.border} ${theme.bg} transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >

                  {/* Image-style visual area */}

                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#073B4C] to-[#1769AA]">

                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border-[25px] border-white" />
                      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border-[18px] border-white" />
                    </div>

                    <div className="relative flex h-full items-center justify-center">

                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl">
                        <Icon
                          size={38}
                          className={theme.text}
                        />
                      </div>

                    </div>

                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-[8px] font-black uppercase tracking-wider text-[#073B4C]">
                      {story.category}
                    </span>

                  </div>

                  <div className="p-6">

                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                      <MapPin size={12} />
                      {story.location}
                    </div>

                    <h3 className="mt-3 text-xl font-black leading-tight text-[#073B4C]">
                      {story.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {story.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2">
                      <span
                        className={`h-1.5 w-8 rounded-full ${theme.icon}`}
                      />

                      <span className={`text-[8px] font-black uppercase tracking-wider ${theme.text}`}>
                        Meaningful Change
                      </span>
                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          IMPACT PROCESS
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#073B4C] px-6 py-10 sm:px-10 lg:px-14">

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B54A]">
                HOW WE WORK
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                From community needs
                <span className="block text-[#55A9E8]">
                  to meaningful action.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/60">
                Responsible implementation and community
                participation help us turn ideas into practical
                activities.
              </p>

            </div>

            <div className="space-y-3">

              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D9B54A] text-xs font-black text-[#073B4C]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="text-xs font-bold text-white/80">
                    {step}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-white px-5 py-14 sm:px-8">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF7FD] text-[#1769AA]">
            <Heart size={27} fill="currentColor" />
          </div>

          <h2 className="mt-5 text-3xl font-black text-[#073B4C]">
            Be part of the next story.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Your support can help us continue working with
            communities and expand meaningful initiatives.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <Link
              href="/donate"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1769AA] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Donate Now
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/projects"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-6 text-xs font-black text-[#073B4C]"
            >
              View Projects
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}