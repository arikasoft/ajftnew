"use client";

import Link from "next/link";
import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  HeartHandshake,
  LogOut,
  Mail,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

const modules = [
  {
    title: "Career Management",
    description:
      "Manage job applications, shortlist candidates, interviews, approvals and recruitment emails.",
    href: "/admin/careers",
    icon: BriefcaseBusiness,
    label: "CAREERS",
  },
  {
    title: "Internship Management",
    description:
      "Manage internship applications, approvals, active interns and completed internships.",
    href: "/admin/internship",
    icon: Users,
    label: "INTERNSHIP",
  },
  {
    title: "Donation Management",
    description:
      "View donations, payment status and donor information.",
    href: "/admin/donations",
    icon: WalletCards,
    label: "DONATIONS",
  },
  {
    title: "Health Help",
    description:
      "Manage health assistance requests and their current status.",
    href: "/admin/health-help",
    icon: HeartHandshake,
    label: "HEALTH HELP",
  },
  {
    title: "Website Analytics",
    description:
      "Monitor visitors, sessions, page views, devices and website activity.",
    href: "/admin/analytics",
    icon: BarChart3,
    label: "ANALYTICS",
  },
  {
    title: "Visitor Management",
    description:
      "Review visitor sessions, traffic sources and website behaviour.",
    href: "/admin/analytics",
    icon: Activity,
    label: "VISITORS",
  },
];

export default function AdminDashboard() {
  async function logout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      window.location.href =
        "/admin/login";
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F7F9]">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071D2B]/95 text-white shadow-xl backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2C94C] text-[#071D2B] shadow-lg">
              <Building2 size={21} />
            </div>

            <div>

              <div className="flex items-center gap-2">

                <ShieldCheck
                  size={13}
                  className="text-[#F2C94C]"
                />

                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                  SECURE ADMIN
                </span>

              </div>

              <h1 className="text-base font-black sm:text-lg">
                AJFT Management
              </h1>

            </div>

          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[9px] font-black transition hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut size={14} />
            Logout
          </button>

        </div>

      </header>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 lg:py-10">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[2rem] bg-[#102A43] p-7 text-white shadow-xl sm:p-10">

          <div className="relative z-10 max-w-3xl">

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F2C94C]">
              ANAND JIVAN FOUNDATION TRUST
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Central Management
              Dashboard
            </h2>

            <p className="mt-4 max-w-2xl text-xs leading-6 text-white/60 sm:text-sm">
              Manage careers, internships,
              donations, health assistance and
              website analytics from one secure
              administration panel.
            </p>

          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-20 h-64 w-64 rounded-full border-[35px] border-[#F2C94C]/5" />

        </section>

        {/* ==================================================
            QUICK MANAGEMENT
        ================================================== */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#176B87]">
              Management Modules
            </p>

            <h3 className="mt-1 text-xl font-black text-[#102A43]">
              All Management
            </h3>

          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-[#DCE6EB] bg-white px-3 py-2 text-[9px] font-bold text-[#7A8A95] sm:flex">
            <ShieldCheck
              size={13}
              className="text-emerald-600"
            />
            Admin Session Active
          </div>

        </div>

        {/* ==================================================
            MODULES
        ================================================== */}

        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.href + module.title}
                href={module.href}
                className="group rounded-[1.5rem] border border-[#DCE6EB] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#176B87]/30 hover:shadow-xl"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6F8] text-[#176B87] transition group-hover:bg-[#102A43] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <span className="rounded-full bg-[#F5F8FA] px-2.5 py-1 text-[7px] font-black tracking-widest text-[#8997A2]">
                    {module.label}
                  </span>

                </div>

                <h4 className="mt-5 text-base font-black text-[#243B53]">
                  {module.title}
                </h4>

                <p className="mt-2 min-h-[48px] text-[10px] leading-5 text-[#8997A2]">
                  {module.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#EEF2F4] pt-4">

                  <span className="text-[9px] font-black text-[#176B87]">
                    Open Management
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F7F9] text-[#526575] transition group-hover:bg-[#176B87] group-hover:text-white">
                    <ChevronRight
                      size={14}
                    />
                  </span>

                </div>

              </Link>
            );
          })}

        </section>

        {/* ==================================================
            RECRUITMENT SHORTCUTS
        ================================================== */}

        <section className="mt-8 rounded-[1.5rem] border border-[#DCE6EB] bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#176B87]">
                Recruitment
              </p>

              <h3 className="mt-1 text-base font-black text-[#102A43]">
                Career Recruitment
              </h3>

            </div>

            <Link
              href="/admin/careers"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-3 text-[9px] font-black text-white transition hover:bg-[#176B87]"
            >
              <Mail size={13} />
              Open Career Applications
              <ChevronRight size={13} />
            </Link>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <QuickLink
              href="/admin/careers"
              title="Applications"
              description="Review all candidates"
            />

            <QuickLink
              href="/admin/internship"
              title="Internships"
              description="Manage internship workflow"
            />

            <QuickLink
              href="/admin/analytics"
              title="Analytics"
              description="Monitor website activity"
            />

          </div>

        </section>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="mt-8 pb-4 text-center">

          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#A0ADB5]">
            Anand Jivan Foundation Trust
          </p>

          <p className="mt-1 text-[9px] text-[#A0ADB5]">
            Secure Administration Portal
          </p>

        </footer>

      </div>

    </main>
  );
}

/* =========================================================
   QUICK LINK
========================================================= */

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-[#E5ECEF] bg-[#FAFCFD] p-4 transition hover:border-[#176B87]/30 hover:bg-[#F5FAFB]"
    >

      <div>

        <p className="text-[10px] font-black text-[#243B53]">
          {title}
        </p>

        <p className="mt-1 text-[8px] text-[#8997A2]">
          {description}
        </p>

      </div>

      <ChevronRight
        size={14}
        className="text-[#176B87]"
      />

    </Link>
  );
}