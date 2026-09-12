"use client";

import Link from "next/link";

import {
  ArrowRight,
  Award,
  CheckCircle2,
  CircleDollarSign,
  Leaf,
  LogIn,
  MapPin,
  ShieldCheck,
  Sprout,
  TreePine,
  Users,
  Wind,
} from "lucide-react";

export default function EnvironmentProgramPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950">

        {/* Background decorations */}

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-400 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-lime-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-teal-300 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* LEFT */}

          <div className="flex flex-col justify-center">

            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur">
              <Leaf className="h-4 w-4" />
              AJFT Environment & Sustainability Programme
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Plant Today.
              <span className="block bg-gradient-to-r from-lime-300 to-emerald-300 bg-clip-text text-transparent">
                Protect Tomorrow.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100/80">
              Join Anand Jivan Foundation Trust in building a greener,
              healthier and more sustainable future through community
              plantation, environmental awareness and long-term
              sustainability initiatives.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/programs/environment/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lime-300 to-emerald-300 px-6 py-4 font-black text-emerald-950 shadow-xl transition hover:scale-[1.02]"
              >
                Join Green Mission
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/programs/environment/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <LogIn className="h-5 w-5" />
                Participant Login
              </Link>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">

              <div>
                <p className="text-2xl font-black text-lime-300">
                  Green
                </p>

                <p className="mt-1 text-xs text-emerald-100/60">
                  Communities
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-lime-300">
                  Clean
                </p>

                <p className="mt-1 text-xs text-emerald-100/60">
                  Environment
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-lime-300">
                  Better
                </p>

                <p className="mt-1 text-xs text-emerald-100/60">
                  Future
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT CARD */}

          <div className="relative flex items-center justify-center">

            <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">

              <div className="rounded-[1.5rem] bg-white p-8">

                <div className="flex items-center justify-between">

                  <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-700">
                    <TreePine className="h-9 w-9" />
                  </div>

                  <span className="rounded-full bg-lime-100 px-4 py-2 text-xs font-black text-emerald-800">
                    GREEN ACTION
                  </span>

                </div>

                <h2 className="mt-8 text-3xl font-black text-slate-900">
                  Every Tree Matters
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Your participation helps create greener spaces,
                  improve environmental awareness and strengthen
                  community responsibility towards nature.
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <span className="font-semibold text-slate-700">
                      Easy participant registration
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <span className="font-semibold text-slate-700">
                      Plantation activity tracking
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <span className="font-semibold text-slate-700">
                      Digital programme participation record
                    </span>

                  </div>

                </div>

                <Link
                  href="/programs/environment/register"
                  className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 font-black text-white transition hover:scale-[1.01]"
                >
                  Start Your Green Journey
                  <ArrowRight className="h-5 w-5" />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section className="relative z-10 mx-auto -mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          {/* REGISTER */}

          <Link
            href="/programs/environment/register"
            className="group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-700 transition group-hover:scale-110">
                <Users className="h-7 w-7" />
              </div>

              <div>

                <h3 className="font-black text-slate-900">
                  New Participant
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your participant account
                </p>

              </div>

            </div>

          </Link>


          {/* DASHBOARD */}

          <Link
            href="/programs/environment/dashboard"
            className="group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-teal-100 p-4 text-teal-700 transition group-hover:scale-110">
                <MapPin className="h-7 w-7" />
              </div>

              <div>

                <h3 className="font-black text-slate-900">
                  Track Plantation
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View plantation activity and progress
                </p>

              </div>

            </div>

          </Link>


          {/* LOGIN */}

          <Link
            href="/programs/environment/login"
            className="group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-yellow-100 p-4 text-yellow-700 transition group-hover:scale-110">
                <CircleDollarSign className="h-7 w-7" />
              </div>

              <div>

                <h3 className="font-black text-slate-900">
                  My Dashboard
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View your participation and impact
                </p>

              </div>

            </div>

          </Link>

        </div>

      </section>


      {/* =====================================================
          PROGRAMME OVERVIEW
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
            <Sprout className="h-4 w-4" />
            OUR ENVIRONMENT MISSION
          </div>

          <h2 className="mt-6 text-3xl font-black text-slate-900 sm:text-4xl">
            Creating Sustainable Communities
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Environmental protection requires collective action.
            Through our programmes, communities, volunteers and
            participants can contribute towards a greener and
            more sustainable future.
          </p>

        </div>


        <div className="mt-16 grid gap-6 md:grid-cols-3">


          {/* CARD 1 */}

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

            <div className="inline-flex rounded-2xl bg-emerald-100 p-4 text-emerald-700">
              <TreePine className="h-8 w-8" />
            </div>

            <h3 className="mt-6 text-xl font-black text-slate-900">
              Plantation Activities
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Encourage plantation and tree protection activities
              that contribute towards greener surroundings and
              healthier communities.
            </p>

          </div>


          {/* CARD 2 */}

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

            <div className="inline-flex rounded-2xl bg-teal-100 p-4 text-teal-700">
              <Wind className="h-8 w-8" />
            </div>

            <h3 className="mt-6 text-xl font-black text-slate-900">
              Environmental Awareness
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Promote awareness about clean surroundings,
              environmental responsibility and sustainable
              lifestyle practices.
            </p>

          </div>


          {/* CARD 3 */}

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

            <div className="inline-flex rounded-2xl bg-lime-100 p-4 text-lime-700">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h3 className="mt-6 text-xl font-black text-slate-900">
              Sustainable Future
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Support long-term initiatives that strengthen
              environmental responsibility and community
              participation.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-emerald-950 py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-black tracking-[0.25em] text-lime-300">
              HOW TO PARTICIPATE
            </span>

            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Your Green Journey in Simple Steps
            </h2>

          </div>


          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <div className="text-5xl font-black text-lime-300">
                01
              </div>

              <h3 className="mt-6 text-xl font-black text-white">
                Register
              </h3>

              <p className="mt-4 leading-7 text-emerald-100/70">
                Create your participant account and join the
                environment programme.
              </p>

            </div>


            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <div className="text-5xl font-black text-lime-300">
                02
              </div>

              <h3 className="mt-6 text-xl font-black text-white">
                Participate
              </h3>

              <p className="mt-4 leading-7 text-emerald-100/70">
                Take part in plantation and environmental
                activities under the programme.
              </p>

            </div>


            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <div className="text-5xl font-black text-lime-300">
                03
              </div>

              <h3 className="mt-6 text-xl font-black text-white">
                Track Impact
              </h3>

              <p className="mt-4 leading-7 text-emerald-100/70">
                Login to your dashboard and view your programme
                participation and environmental contribution.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPACT / TRUST SECTION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-4 py-2 text-sm font-bold text-lime-700">
              <Award className="h-4 w-4" />
              COMMUNITY IMPACT
            </span>

            <h2 className="mt-6 text-3xl font-black text-slate-900 sm:text-4xl">
              Small Actions Can Create Big Change
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Every responsible environmental action contributes
              towards a stronger and more sustainable community.
              AJFT encourages people to actively participate in
              environmental protection and plantation initiatives.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex gap-4">

                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />

                <p className="text-slate-700">
                  Community-based environmental participation
                </p>

              </div>

              <div className="flex gap-4">

                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />

                <p className="text-slate-700">
                  Digital participant registration and tracking
                </p>

              </div>

              <div className="flex gap-4">

                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />

                <p className="text-slate-700">
                  Long-term commitment towards sustainability
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-700 p-8 shadow-2xl sm:p-12">

            <TreePine className="h-16 w-16 text-lime-300" />

            <h3 className="mt-8 text-3xl font-black text-white">
              Join the Green Movement
            </h3>

            <p className="mt-5 leading-8 text-emerald-50/80">
              Become part of the AJFT Environment Programme and
              contribute towards cleaner surroundings, greener
              communities and a better tomorrow.
            </p>

            <Link
              href="/programs/environment/register"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-emerald-800 shadow-lg transition hover:scale-[1.02]"
            >
              Register Now
              <ArrowRight className="h-5 w-5" />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="border-t border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto inline-flex rounded-3xl bg-emerald-100 p-5 text-emerald-700">
            <Leaf className="h-10 w-10" />
          </div>

          <h2 className="mt-8 text-3xl font-black text-slate-900 sm:text-4xl">
            Ready to Make a Difference?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Join Anand Jivan Foundation Trust's Environment
            Programme and become part of a responsible community
            working towards a greener future.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/programs/environment/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-7 py-4 font-black text-white shadow-lg transition hover:bg-emerald-800"
            >
              Register as Participant
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/programs/environment/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Login to Dashboard
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}