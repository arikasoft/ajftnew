import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  HeartHandshake,
  Home,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Clean Water for Vulnerable Communities | Anand Jivan Foundation Trust",
  description:
    "Support Anand Jivan Foundation Trust in improving access to safe drinking water and essential community water infrastructure for vulnerable communities.",
};

const supportAreas = [
  {
    icon: Droplets,
    title: "Safe Drinking Water",
    description:
      "Support initiatives that improve access to safer and more reliable drinking water.",
  },
  {
    icon: Home,
    title: "Water Infrastructure",
    description:
      "Help support essential community-level water facilities and infrastructure.",
  },
  {
    icon: Users,
    title: "Vulnerable Communities",
    description:
      "Focus support where communities and families face greater challenges accessing basic resources.",
  },
  {
    icon: HeartHandshake,
    title: "Health & Dignity",
    description:
      "Clean water contributes to healthier living conditions and greater everyday dignity.",
  },
];

const impactPoints = [
  "Access to safer drinking water",
  "Community water facilities",
  "Water storage and essential infrastructure",
  "Health and hygiene awareness",
  "Support for vulnerable families",
  "Community-focused and responsible action",
];

export default function CleanWaterPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <Droplets className="h-4 w-4" />
                Community Water Initiative
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Clean Water for{" "}
                <span className="text-blue-600">
                  Vulnerable Communities
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Safe water. Healthier families. Stronger communities.
                Together, we can support practical water initiatives for
                communities that need them most.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Support Clean Water
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/transparency"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                >
                  View Transparency
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Transparent Giving
                </div>

                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-green-600" />
                  Community Focused
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-400 p-2 shadow-2xl">
                <div className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-sky-100 via-white to-blue-100 p-8 text-center">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/50" />
                  <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-200/50" />

                  <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl">
                    <Droplets className="h-14 w-14" />
                  </div>

                  <h2 className="relative text-3xl font-extrabold text-slate-900">
                    Water Changes Lives
                  </h2>

                  <p className="relative mt-4 max-w-md text-slate-600">
                    Supporting safer water access and stronger communities,
                    one initiative at a time.
                  </p>

                  <div className="relative mt-7 flex flex-wrap justify-center gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                      Safe Water
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
                      Health
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                      Dignity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WATER MATTERS */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Why This Matters
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Clean water is a basic human need.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Access to safe and reliable water is closely connected with
              health, hygiene, dignity and everyday community well-being.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportAreas.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-slate-950 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Our Approach
              </span>

              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                Practical support for real community needs.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Anand Jivan Foundation Trust works towards community-focused
                charitable initiatives. Through this project, we aim to
                support water-related needs in underserved communities through
                responsible and practical action.
              </p>

              <Link
                href="/projects"
                className="mt-8 inline-flex items-center gap-2 font-bold text-cyan-300 transition hover:text-white"
              >
                Explore Our Projects
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="grid gap-5 sm:grid-cols-2">
                {impactPoints.map((point) => (
                  <div key={point} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                    <span className="text-sm leading-6 text-slate-200">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-sky-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Community Impact
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Your support can help create meaningful change.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Droplets className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-bold">Safer Water</h3>

              <p className="mt-3 text-slate-600">
                Support initiatives that work towards improved access to
                drinking water.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Users className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-bold">Stronger Communities</h3>

              <p className="mt-3 text-slate-600">
                Community-focused solutions can strengthen everyday living
                conditions.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                <HeartHandshake className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-bold">Health & Dignity</h3>

              <p className="mt-3 text-slate-600">
                Better access to basic resources can contribute to healthier
                and more dignified communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DONATION CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-cyan-600 py-20 text-white">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <Droplets className="mx-auto h-12 w-12 text-cyan-100" />

          <h2 className="mt-6 text-3xl font-extrabold sm:text-4xl">
            Help Bring Clean Water Closer
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-50">
            Your contribution can support water-related community initiatives
            and help vulnerable communities work towards safer, healthier
            living conditions.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-blue-700 shadow-xl transition hover:bg-slate-100"
            >
              Donate Now
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Contact AJFT
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            Anand Jivan Foundation Trust
          </span>

          <h2 className="mt-4 text-2xl font-extrabold text-slate-950 sm:text-3xl">
            Serving communities with purpose.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Anand Jivan Foundation Trust works towards education, healthcare,
            drinking water, women empowerment, environmental protection,
            livelihood development, child welfare and community-focused social
            initiatives.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Public Charitable Trust
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Bihar
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Community Focused
            </span>
          </div>

          <Link
            href="/transparency"
            className="mt-8 inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
          >
            View Transparency Information
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-extrabold text-slate-950">
            Every contribution matters.
          </h2>

          <p className="mt-3 text-slate-600">
            Together, we can support healthier and stronger communities.
          </p>

          <Link
            href="/donate"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-700"
          >
            Support Clean Water
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}