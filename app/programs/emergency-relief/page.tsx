import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Home,
  MapPin,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function EmergencyReliefPage() {
  const services = [
    {
      title: "Emergency Assistance",
      description:
        "Need-based emergency support for individuals and families affected by difficult situations and unforeseen circumstances.",
      icon: AlertTriangle,
    },
    {
      title: "Relief Material Support",
      description:
        "Distribution and facilitation of essential relief materials based on identified community needs.",
      icon: Package,
    },
    {
      title: "Community Response",
      description:
        "Coordinated community-based support and volunteer participation during emergency situations.",
      icon: Users,
    },
    {
      title: "Humanitarian Support",
      description:
        "Providing compassionate and responsible support to vulnerable individuals and communities.",
      icon: HeartHandshake,
    },
  ];

  const objectives = [
    "Provide timely need-based assistance during emergency situations.",
    "Support vulnerable individuals and families facing difficult circumstances.",
    "Encourage community participation and volunteer support.",
    "Promote coordinated humanitarian and relief initiatives.",
    "Facilitate access to essential support based on available resources.",
  ];

  const responseSteps = [
    {
      number: "01",
      title: "Need Assessment",
      description:
        "The situation and immediate requirements are assessed based on available information and local conditions.",
    },
    {
      number: "02",
      title: "Support Planning",
      description:
        "Available resources, volunteers and community support are coordinated for an appropriate response.",
    },
    {
      number: "03",
      title: "Relief Response",
      description:
        "Need-based support and relief assistance are provided according to the nature of the situation.",
    },
    {
      number: "04",
      title: "Follow-up Support",
      description:
        "Where possible, follow-up and additional support are considered based on the continuing needs of affected individuals.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f8f7]">
      {/* HERO */}

      <section className="relative overflow-hidden bg-[#073b4c]">
        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#08744f]/25 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#c79b36]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          {/* BREADCRUMB */}

          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/programs"
              className="transition hover:text-white"
            >
              Programmes
            </Link>

            <span>/</span>

            <span className="text-white">
              Emergency Relief
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                <ShieldCheck size={16} />
                HUMANITARIAN SUPPORT PROGRAMME
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Emergency
                <span className="block text-[#d9b65d]">
                  Relief & Response
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Anand Jivan Foundation Trust works towards
                supporting vulnerable individuals and
                communities through need-based humanitarian
                assistance, relief support and community
                response initiatives.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#08744f] px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#066441]"
                >
                  Contact AJFT
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
                >
                  Support Relief Work
                  <HeartHandshake size={17} />
                </Link>
              </div>
            </div>

            {/* HERO CARD */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d9b65d] text-[#073b4c] shadow-lg">
                <AlertTriangle size={30} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-white">
                Compassion in Action
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                During difficult situations, collective
                support can help communities respond with
                dignity, care and responsibility.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Clock3
                    size={20}
                    className="text-[#d9b65d]"
                  />

                  <p className="mt-3 text-xs font-bold text-white/50">
                    RESPONSE
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    Need Based
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Users
                    size={20}
                    className="text-[#d9b65d]"
                  />

                  <p className="mt-3 text-xs font-bold text-white/50">
                    APPROACH
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    Community First
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#08744f]">
              Our Commitment
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#073b4c] sm:text-4xl">
              Supporting Communities During
              Difficult Times
            </h2>

            <p className="mt-6 text-sm leading-8 text-slate-600">
              Emergencies and unforeseen situations can
              create significant challenges for individuals,
              families and communities. Through its
              humanitarian and social development approach,
              Anand Jivan Foundation Trust seeks to support
              need-based relief and response initiatives
              whenever resources and circumstances permit.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              The programme focuses on responsible,
              community-oriented and need-based support,
              while encouraging volunteers, partners and
              communities to work together for the wellbeing
              of affected people.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#08744f]">
                <HeartHandshake size={28} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  AJFT Approach
                </p>

                <h3 className="mt-1 text-xl font-black text-[#073b4c]">
                  Responsible Humanitarian Support
                </h3>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {[
                "Need-based response",
                "Community participation",
                "Volunteer engagement",
                "Responsible resource utilisation",
                "Dignity and humanitarian values",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-[#08744f]"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#08744f]">
              Programme Areas
            </p>

            <h2 className="mt-4 text-3xl font-black text-[#073b4c] sm:text-4xl">
              Emergency Support Initiatives
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Our emergency relief efforts may include
              different forms of support depending on the
              situation, identified needs and available
              resources.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-slate-200 bg-[#f8faf9] p-6 transition hover:-translate-y-1 hover:border-[#08744f]/30 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#08744f]/10 p-3 text-[#08744f]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#073b4c]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#08744f]">
              Programme Objectives
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-[#073b4c]">
              Building a Responsive and Caring Community
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              The programme is designed to encourage
              coordinated support and responsible
              humanitarian action for people facing difficult
              circumstances.
            </p>
          </div>

          <div className="grid gap-4">
            {objectives.map((objective, index) => (
              <div
                key={objective}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#073b4c] text-sm font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="pt-2 text-sm leading-7 text-slate-700">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSE PROCESS */}

      <section className="bg-[#073b4c]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9b65d]">
              Response Process
            </p>

            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              A Structured Approach to Relief Support
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Support initiatives are approached with
              consideration for local needs, available
              resources and responsible implementation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {responseSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span className="text-3xl font-black text-[#d9b65d]">
                  {step.number}
                </span>

                <h3 className="mt-6 text-lg font-black text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#08744f] to-[#073b4c] p-8 shadow-2xl sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                Stand With Communities
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
                Together, We Can Support People During
                Difficult Times.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">
                Support from individuals, volunteers and
                communities helps strengthen humanitarian and
                social development initiatives.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black text-[#08744f] transition hover:bg-slate-100"
              >
                <HeartHandshake size={18} />
                Donate Now
              </Link>

              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/20"
              >
                <Users size={18} />
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM NAVIGATION */}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#073b4c] transition hover:text-[#08744f]"
          >
            <Home size={17} />
            All Programmes
          </Link>

          <Link
            href="/programs/social-support"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#08744f]"
          >
            Explore Social Support
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}