import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  FileSpreadsheet,
  FileText,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const financialSections = [
  {
    title: "Audit Reports",
    description:
      "View statutory audit reports and audited financial statements year-wise.",
    href: "/reports/financials/audit",
    icon: ShieldCheck,
    years: ["FY 2025–26", "FY 2024–25", "FY 2023–24"],
    available: 3,
  },
  {
    title: "Income & Expenditure",
    description:
      "View year-wise income, expenditure and financial performance reports.",
    href: "/reports/financials/income-expenditure",
    icon: BarChart3,
    years: ["FY 2025–26", "FY 2024–25", "FY 2023–24"],
    available: 3,
  },
  {
    title: "Balance Sheet",
    description:
      "View organization assets, liabilities and financial position.",
    href: "/reports/financials/balance-sheet",
    icon: Landmark,
    years: ["FY 2025–26", "FY 2024–25", "FY 2023–24"],
    available: 0,
  },
  {
    title: "Annual Reports",
    description:
      "Explore annual activities, programmes, achievements and financial highlights.",
    href: "/reports/annual",
    icon: BookOpenCheck,
    years: ["FY 2025–26", "FY 2024–25", "FY 2023–24"],
    available: 0,
  },
];

export default function FinancialTransparencyPage() {
  return (
    <main className="min-h-screen bg-[#f7fafc]">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
              <BadgeCheck size={17} />
              Transparency & Accountability
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Financial Transparency
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Anand Jivan Foundation Trust is committed to maintaining
              transparency and accountability in its financial management.
              Access our published financial reports and supporting documents
              below.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="mb-4 text-teal-600" size={28} />

            <h2 className="text-lg font-bold text-slate-900">
              Transparent Reporting
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Important financial documents are published for public review and
              institutional transparency.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <FileSpreadsheet className="mb-4 text-blue-600" size={28} />

            <h2 className="text-lg font-bold text-slate-900">
              Financial Records
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Year-wise financial information including income, expenditure and
              audited statements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <FileText className="mb-4 text-violet-600" size={28} />

            <h2 className="text-lg font-bold text-slate-900">
              Public Access
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reports are made available for donors, stakeholders and members
              to review.
            </p>
          </div>
        </div>
      </section>

      {/* FINANCIAL DOCUMENTS */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Financial Documents
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Reports & Financial Statements
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Select a category below to view and download available financial
            documents.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {financialSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <div className="rounded-full bg-slate-100 p-2 text-slate-500 transition group-hover:bg-teal-50 group-hover:text-teal-700">
                    <ArrowRight size={19} />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {section.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {section.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      Financial Years
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        section.available > 0
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {section.available > 0
                        ? `${section.available} Reports Available`
                        : "Coming Soon"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {section.years.map((year) => (
                      <span
                        key={year}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                      >
                        {year}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-teal-700">
                  View Reports
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* NOTE */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FileText size={21} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Document Availability
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Financial reports are published after completion, review and
                approval of the respective financial statements. Documents
                marked as unavailable will be published when officially
                finalized.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}