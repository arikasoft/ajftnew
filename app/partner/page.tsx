import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HandHeart,
  Heart,
  HeartHandshake,
  Landmark,
  Mail,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

const partnershipTypes = [
  {
    icon: Building2,
    title: "Corporate Partnership",
    description:
      "Partner with AJFT to support meaningful community development and social impact initiatives.",
  },
  {
    icon: Landmark,
    title: "Institutional Partnership",
    description:
      "Collaborate with AJFT on education, healthcare, community development and capacity-building programmes.",
  },
  {
    icon: Users,
    title: "Community Partnership",
    description:
      "Work together with local communities and organisations to create sustainable social solutions.",
  },
  {
    icon: HandHeart,
    title: "Programme Support",
    description:
      "Support specific AJFT programmes, campaigns, events or community initiatives.",
  },
];

const benefits = [
  "Support measurable community impact",
  "Collaborate on meaningful social programmes",
  "Build long-term community relationships",
  "Support education and skill development",
  "Contribute to healthcare and social welfare",
  "Promote sustainable community development",
];

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFB]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#102A43]">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#176B87]/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C59A3A]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
              <HeartHandshake
                size={14}
                className="text-[#F2C94C]"
              />

              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/80">
                Partner With AJFT
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Together We Can
              <span className="block text-[#F2C94C]">
                Create Greater Impact.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Anand Jivan Foundation Trust welcomes partnerships
              with organisations, institutions, businesses and
              community groups committed to creating positive and
              sustainable change.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="#partnership"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2C94C] px-6 py-3.5 text-xs font-black text-[#102A43] transition hover:-translate-y-0.5 hover:bg-[#E8BB38]"
              >
                Explore Partnership
                <ArrowRight size={15} />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-black text-white transition hover:bg-white/10"
              >
                Contact AJFT
                <Mail size={15} />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#176B87]">
              Why Partner With Us
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
              Partnership that turns
              <span className="text-[#176B87]">
                {" "}commitment into action.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#607585]">
              Partnerships can help bring resources, expertise,
              networks and opportunities together to strengthen
              community-focused initiatives.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#607585]">
              Whether you are a company, institution, organisation
              or community group, we welcome conversations around
              areas where our objectives and capabilities can work
              together.
            </p>

          </div>

          <div className="rounded-[2rem] border border-[#DCE6EB] bg-white p-7 shadow-[0_20px_60px_rgba(16,42,67,0.08)]">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF6F8] text-[#176B87]">
              <ShieldCheck size={24} />
            </div>

            <h3 className="mt-5 text-lg font-black text-[#102A43]">
              Responsible Collaboration
            </h3>

            <p className="mt-3 text-xs leading-6 text-[#718394]">
              AJFT aims to build transparent, responsible and
              purpose-driven relationships focused on genuine
              community benefit.
            </p>

          </div>

        </div>
      </section>

      {/* PARTNERSHIP TYPES */}
      <section
        id="partnership"
        className="border-y border-[#E3EAEE] bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#176B87]">
              Partnership Opportunities
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#102A43]">
              Ways to work together
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#718394]">
              Explore possible areas of collaboration with
              Anand Jivan Foundation Trust.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {partnershipTypes.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[1.5rem] border border-[#E1E8EC] bg-[#FBFDFD] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#BFD7DF] hover:shadow-[0_18px_45px_rgba(16,42,67,0.08)]"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6F8] text-[#176B87] transition group-hover:bg-[#176B87] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-sm font-black text-[#243B53]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-5 text-[#718394]">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[#F4F8FA]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#176B87]">
                Shared Purpose
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#102A43]">
                Build something that matters.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#607585]">
                A strong partnership starts with a shared purpose.
                Together, organisations can contribute knowledge,
                resources, networks and opportunities toward
                meaningful community outcomes.
              </p>

              <Link
                href="/programs"
                className="mt-7 inline-flex items-center gap-2 text-xs font-black text-[#176B87] hover:text-[#102A43]"
              >
                Explore Our Programmes
                <ArrowRight size={14} />
              </Link>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-[#DCE6EB] bg-white p-4"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#176B87]"
                  />

                  <span className="text-[11px] font-semibold leading-5 text-[#526575]">
                    {benefit}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >

        <div className="overflow-hidden rounded-[2rem] bg-[#102A43]">

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

            <div className="p-8 sm:p-10 lg:p-12">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                Start a Conversation
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                Interested in partnering with AJFT?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                Tell us about your organisation, your area of
                interest and how you would like to collaborate.
                Our team can discuss suitable opportunities with
                you.
              </p>

              <a
                href="mailto:info@ajftrust.org?subject=Partnership%20Enquiry%20-%20AJFT"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F2C94C] px-6 py-3.5 text-xs font-black text-[#102A43] transition hover:-translate-y-0.5 hover:bg-[#E8BB38]"
              >
                Send Partnership Enquiry
                <ArrowRight size={15} />
              </a>

            </div>

            <div className="border-t border-white/10 bg-white/5 p-8 sm:p-10 lg:border-l lg:border-t-0">

              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/40">
                Contact AJFT
              </p>

              <div className="mt-6 space-y-5">

                <a
                  href="mailto:info@ajftrust.org"
                  className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Mail size={16} />
                  </span>
                  info@ajftrust.org
                </a>

                <a
                  href="tel:+919155751363"
                  className="flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Phone size={16} />
                  </span>
                  +91 9155751363
                </a>

                <div className="flex items-start gap-3 text-sm leading-6 text-white/65">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Heart size={16} />
                  </span>

                  <span>
                    Anand Jivan Foundation Trust
                    <br />
                    Darbhanga, Bihar - 846005
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#E3EAEE] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6F8] text-[#176B87]">
            <HeartHandshake size={23} />
          </div>

          <h2 className="mt-5 text-2xl font-black text-[#102A43]">
            Let&apos;s build a better tomorrow together.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#718394]">
            Every meaningful partnership can help create
            opportunities and strengthen communities.
          </p>

          <Link
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#176B87] px-6 py-3 text-xs font-black text-white transition hover:bg-[#102A43]"
          >
            Become a Partner
            <ArrowRight size={14} />
          </Link>

        </div>
      </section>

    </main>
  );
}