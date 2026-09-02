import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Anand Jivan Foundation Trust",
  description:
    "Cookie Policy of Anand Jivan Foundation Trust explaining how cookies and similar technologies are used on ajftrust.org.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Website Policies
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Cookie Policy
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              This Cookie Policy explains how Anand Jivan Foundation Trust
              uses cookies and similar technologies when you visit our
              website.
            </p>

            <p className="mt-5 text-sm text-slate-400">
              Last updated: September 2, 2026
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Cookie Policy
              </h2>

              <nav className="mt-4 space-y-1 text-sm">
                <a
                  href="#what-are-cookies"
                  className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  What Are Cookies?
                </a>

                <a
                  href="#how-we-use"
                  className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  How We Use Cookies
                </a>

                <a
                  href="#cookie-types"
                  className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Types of Cookies
                </a>

                <a
                  href="#third-party"
                  className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Third-Party Cookies
                </a>

                <a
                  href="#manage-cookies"
                  className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Manage Cookies
                </a>

                <a
                  href="#contact"
                  className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Contact Us
                </a>
              </nav>
            </div>
          </aside>

          {/* MAIN POLICY */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            {/* INTRODUCTION */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                Introduction
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Anand Jivan Foundation Trust (“AJFT”, “we”, “our”, or “us”)
                uses cookies and similar technologies to operate, protect and
                improve our website and digital services.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                By visiting or using our website, you may allow the use of
                cookies in accordance with your preferences and applicable
                laws.
              </p>
            </section>

            {/* WHAT ARE COOKIES */}
            <section
              id="what-are-cookies"
              className="mt-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                What Are Cookies?
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Cookies are small text files that are stored on your device
                when you visit a website. They help websites remember certain
                information about your visit and can improve functionality,
                security and user experience.
              </p>
            </section>

            {/* HOW WE USE */}
            <section
              id="how-we-use"
              className="mt-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                How We Use Cookies
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                We may use cookies and similar technologies for purposes
                including:
              </p>

              <ul className="mt-5 space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">•</span>
                  Operating and maintaining website functionality.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">•</span>
                  Remembering user preferences and consent choices.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">•</span>
                  Understanding how visitors interact with our website.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">•</span>
                  Improving website performance and user experience.
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">•</span>
                  Protecting the security and integrity of our digital
                  services.
                </li>
              </ul>
            </section>

            {/* COOKIE TYPES */}
            <section
              id="cookie-types"
              className="mt-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                Types of Cookies We May Use
              </h2>

              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-950">
                    Necessary Cookies
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    These cookies are necessary for essential website
                    functionality, security and proper operation.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-950">
                    Analytics Cookies
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    These cookies help us understand how visitors use our
                    website, such as which pages are visited and how users
                    interact with website content.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-950">
                    Preference Cookies
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    These cookies may remember your choices, settings and
                    consent preferences to improve your browsing experience.
                  </p>
                </div>
              </div>
            </section>

            {/* THIRD PARTY */}
            <section
              id="third-party"
              className="mt-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                Third-Party Cookies and Services
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Our website may use trusted third-party services that may
                place or access cookies according to your consent preferences.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                  <h3 className="font-bold text-blue-950">
                    Google Analytics
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    We may use Google Analytics to understand website traffic
                    and visitor interactions.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                  <h3 className="font-bold text-emerald-950">
                    CookieYes
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    We use CookieYes to help manage cookie consent preferences
                    and provide users with controls over non-essential
                    cookies.
                  </p>
                </div>
              </div>
            </section>

            {/* MANAGE */}
            <section
              id="manage-cookies"
              className="mt-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                Managing Your Cookie Preferences
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                You can manage your cookie preferences through the cookie
                consent banner displayed on our website.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                You may also control or delete cookies through your browser
                settings. Please note that disabling certain cookies may affect
                some website functionality.
              </p>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm leading-7 text-amber-900">
                  Your consent preferences may be changed at any time through
                  the cookie consent controls available on our website.
                </p>
              </div>
            </section>

            {/* POLICY CHANGES */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-950">
                Changes to This Cookie Policy
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                We may update this Cookie Policy from time to time to reflect
                changes in our website, services, legal requirements or cookie
                practices. The latest version will always be published on this
                page.
              </p>
            </section>

            {/* CONTACT */}
            <section
              id="contact"
              className="mt-12 scroll-mt-24"
            >
              <div className="rounded-2xl bg-slate-950 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">
                  Contact Us
                </h2>

                <p className="mt-4 leading-8 text-slate-300">
                  If you have any questions regarding this Cookie Policy or
                  our use of cookies, please contact Anand Jivan Foundation
                  Trust.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/privacy"
                    className="rounded-lg border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}