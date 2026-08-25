import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  MapPin,
  Stethoscope,
  Users,
  UserRound,
} from "lucide-react";

const stats = [
  {
    value: "10,000+",
    label: "People Reached",
    icon: Users,
  },
  {
    value: "5,000+",
    label: "Children Supported",
    icon: Baby,
  },
  {
    value: "2,500+",
    label: "Families Reached",
    icon: Home,
  },
  {
    value: "25+",
    label: "Communities",
    icon: MapPin,
  },
];

const categories = [
  {
    title: "Children & Students",
    description:
      "Supporting children and students through education, learning resources, awareness and opportunities.",
    icon: GraduationCap,
    points: [
      "Education support",
      "Learning materials",
      "Child welfare",
      "Community activities",
    ],
    color: "blue",
  },
  {
    title: "Women & Families",
    description:
      "Promoting dignity, participation and opportunities for women and families within communities.",
    icon: UserRound,
    points: [
      "Women empowerment",
      "Family support",
      "Awareness activities",
      "Community participation",
    ],
    color: "green",
  },
  {
    title: "Health & Well-being",
    description:
      "Supporting health awareness and community-oriented initiatives focused on better well-being.",
    icon: Stethoscope,
    points: [
      "Health awareness",
      "Preventive care",
      "Community outreach",
      "Well-being support",
    ],
    color: "rose",
  },
  {
    title: "Youth & Livelihood",
    description:
      "Encouraging skills, confidence and opportunities for young people and community members.",
    icon: BriefcaseBusiness,
    points: [
      "Skill development",
      "Youth participation",
      "Livelihood support",
      "Opportunity creation",
    ],
    color: "violet",
  },
];

const principles = [
  "Community-focused support",
  "Inclusive participation",
  "Dignity and respect",
  "Transparent implementation",
  "Sustainable impact",
  "Needs-based initiatives",
];

export default function BeneficiariesPage() {
  return (
    <main className="min-h-screen bg-[#F5F8F7]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#1769AA]/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#3C9A32]/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B54A]">
              <Heart size={12} fill="currentColor" />
              Our Impact
            </div>

            <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              People We
              <span className="block text-[#55A9E8]">
                Serve & Support
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Anand Jivan Foundation Trust works with individuals,
              families and communities to create meaningful
              opportunities and strengthen social well-being.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/donate"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D9B54A] px-5 text-xs font-black text-[#073B4C] shadow-lg transition hover:-translate-y-0.5"
              >
                Support Our Work
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/impact"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/15"
              >
                Explore Our Impact
              </Link>

            </div>

          </div>

        </div>

        {/* bottom curve */}
        <div className="absolute bottom-[-1px] left-[-5%] h-12 w-[110%] rounded-[50%_50%_0_0] bg-[#F5F8F7]" />

      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section className="relative z-10 px-5 sm:px-8">

        <div className="mx-auto -mt-5 max-w-6xl">

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-4">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`p-6 ${
                    index !== stats.length - 1
                      ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1769AA]">
                      <Icon size={21} />
                    </div>

                    <div>
                      <p className="text-2xl font-black text-[#073B4C]">
                        {stat.value}
                      </p>

                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {stat.label}
                      </p>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1769AA]">
              WHO WE SERVE
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Our work begins
              <span className="block text-[#1769AA]">
                with people.
              </span>
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#D9B54A]" />

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Our beneficiaries are at the heart of our
              community-focused activities. We seek to understand
              local needs and support initiatives that encourage
              dignity, participation and opportunity.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              From children and students to women, families,
              youth and communities, our approach is designed
              around practical and meaningful support.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-[#D8EAF7] bg-[#EEF7FD] p-6">
              <HeartHandshake
                className="text-[#1769AA]"
                size={28}
              />

              <h3 className="mt-5 text-base font-black text-[#073B4C]">
                People First
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                We place dignity, participation and community
                needs at the centre of our activities.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D7EBD1] bg-[#F0F9ED] p-6">
              <Users
                className="text-[#3C9A32]"
                size={28}
              />

              <h3 className="mt-5 text-base font-black text-[#073B4C]">
                Community Focus
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                We work with communities to encourage inclusive
                and sustainable development.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7DDF5] bg-[#F7F2FC] p-6">
              <GraduationCap
                className="text-[#7C3AAF]"
                size={28}
              />

              <h3 className="mt-5 text-base font-black text-[#073B4C]">
                Opportunity
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Education, skills and awareness can help create
                stronger opportunities.
              </p>
            </div>

            <div className="rounded-2xl border border-[#F0E1B5] bg-[#FFFAED] p-6">
              <Heart
                className="text-[#B88918]"
                size={28}
                fill="currentColor"
              />

              <h3 className="mt-5 text-base font-black text-[#073B4C]">
                Compassion
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                We believe meaningful service begins with empathy
                and responsible action.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BENEFICIARY CATEGORIES
      ====================================================== */}

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#3C9A32]">
              BENEFICIARY GROUPS
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#073B4C] sm:text-4xl">
              Who benefits from
              <span className="text-[#3C9A32]">
                {" "}our work?
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Our activities are designed to respond to different
              community needs and create practical opportunities.
            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            {categories.map((category) => {

              const Icon = category.icon;

              const styles =
                category.color === "blue"
                  ? {
                      bg: "bg-[#EEF7FD]",
                      border: "border-[#D5EAF8]",
                      icon: "bg-[#1769AA]",
                      text: "text-[#1769AA]",
                    }
                  : category.color === "green"
                  ? {
                      bg: "bg-[#F0F9ED]",
                      border: "border-[#D9EBD3]",
                      icon: "bg-[#3C9A32]",
                      text: "text-[#3C9A32]",
                    }
                  : category.color === "rose"
                  ? {
                      bg: "bg-[#FFF3F3]",
                      border: "border-[#F5D9D9]",
                      icon: "bg-[#C94C5A]",
                      text: "text-[#C94C5A]",
                    }
                  : {
                      bg: "bg-[#F7F2FC]",
                      border: "border-[#E7DCF3]",
                      icon: "bg-[#7C3AAF]",
                      text: "text-[#7C3AAF]",
                    };

              return (
                <div
                  key={category.title}
                  className={`rounded-2xl border p-6 ${styles.bg} ${styles.border}`}
                >

                  <div className="flex items-start gap-4">

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${styles.icon}`}
                    >
                      <Icon size={23} />
                    </div>

                    <div>

                      <h3 className="text-lg font-black text-[#073B4C]">
                        {category.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        {category.description}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">

                    {category.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2 text-[10px] font-bold text-slate-600"
                      >
                        <CheckCircle2
                          size={14}
                          className={styles.text}
                        />

                        {point}
                      </div>
                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          APPROACH
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#073B4C] px-6 py-10 sm:px-10 lg:px-14">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#D9B54A]">
                OUR APPROACH
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Support that respects
                <span className="block text-[#55A9E8]">
                  dignity and opportunity.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/60">
                We aim to build meaningful relationships with
                communities and support activities that create
                practical and sustainable value.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {principles.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9B54A] text-[#073B4C] text-[10px] font-black">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="text-xs font-bold text-white/80">
                    {item}
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

      <section className="border-t border-slate-100 bg-white px-5 py-14 sm:px-8">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF7FD] text-[#1769AA]">
            <Heart
              size={27}
              fill="currentColor"
            />
          </div>

          <h2 className="mt-5 text-3xl font-black text-[#073B4C]">
            Help us reach more people.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Your contribution can help support community-focused
            initiatives and create meaningful opportunities.
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
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#073B4C] transition hover:border-[#1769AA]"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}