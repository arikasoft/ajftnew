import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Download,
  FileText,
  IndianRupee,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type FinancialReport = {
  year: string;
  title: string;
  income: number;
  expenditure: number;
  netPosition: number;
  file: string;
  status: "Published" | "Pending";
};

const reports: FinancialReport[] = [
  {
    year: "FY 2025–26",
    title: "Income & Expenditure Report",
    income: 5210000,
    expenditure: 5178000,
    netPosition: 32000,
    file: "/reports/financials/income-expenditure/2025-26.pdf",
    status: "Published",
  },

  {
    year: "FY 2024–25",
    title: "Income & Expenditure Report",
    income: 3668118,
    expenditure: 3688118,
    netPosition: -20000,
    file: "/reports/financials/income-expenditure/2024-25.pdf",
    status: "Published",
  },

  {
    year: "FY 2023–24",
    title: "Income & Expenditure Report",
    income: 1650000,
    expenditure: 1600000,
    netPosition: 50000,
    file: "/reports/financials/income-expenditure/2023-24.pdf",
    status: "Published",
  },
];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNetPosition(amount: number) {
  const formatted = formatINR(Math.abs(amount));

  if (amount > 0) {
    return `+ ${formatted}`;
  }

  if (amount < 0) {
    return `− ${formatted}`;
  }

  return formatted;
}

export default function IncomeExpenditurePage() {
  const latestReport = reports[0];

  return (
    <main className="min-h-screen bg-[#f6f8fa]">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <BarChart3 size={22} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                Financial Transparency
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Income & Expenditure
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Review year-wise Income and Expenditure statements published by
              Anand Jivan Foundation Trust for financial transparency and
              public information.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/reports/financials/audit"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
              >
                <FileText size={17} />
                Audit Reports
              </Link>

              <Link
                href="/reports"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                All Reports
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">

          {/* TOTAL INCOME */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={21} />
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                {latestReport.year}
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Income
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {formatINR(latestReport.income)}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Based on published financial records
            </p>
          </div>

          {/* TOTAL EXPENDITURE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <TrendingDown size={21} />
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                {latestReport.year}
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Expenditure
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {formatINR(latestReport.expenditure)}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Based on published financial records
            </p>
          </div>

          {/* NET POSITION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <IndianRupee size={21} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  latestReport.netPosition >= 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {latestReport.netPosition >= 0
                  ? "Surplus"
                  : "Deficit"}
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Net Position
            </p>

            <p
              className={`mt-2 text-2xl font-bold ${
                latestReport.netPosition >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {formatNetPosition(latestReport.netPosition)}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Calculated from approved records
            </p>
          </div>
        </div>
      </section>

      {/* REPORTS */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}
          <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Financial Years
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Year-wise Income & Expenditure
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View published financial reports and download supporting
                documents.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <FileText size={23} />
            </div>
          </div>

          {/* TABLE HEADER */}
          <div className="hidden grid-cols-[2.2fr_1fr_1fr_1fr_1.1fr_1fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 lg:grid">
            <div>Financial Year</div>
            <div>Income</div>
            <div>Expenditure</div>
            <div>Net Position</div>
            <div>Status</div>
            <div className="text-right">Report</div>
          </div>

          {/* REPORT ROWS */}
          <div>
            {reports.map((report) => {
              const isSurplus = report.netPosition >= 0;

              return (
                <div
                  key={report.year}
                  className="border-b border-slate-100 transition hover:bg-slate-50/70 last:border-b-0"
                >
                  <div className="grid gap-5 px-6 py-6 lg:grid-cols-[2.2fr_1fr_1fr_1fr_1.1fr_1fr] lg:items-center">

                    {/* YEAR */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                        <FileText size={21} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {report.year}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {report.title}
                        </p>
                      </div>
                    </div>

                    {/* INCOME */}
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 lg:hidden">
                        Income
                      </p>

                      <p className="mt-1 font-semibold text-emerald-700 lg:mt-0">
                        {formatINR(report.income)}
                      </p>
                    </div>

                    {/* EXPENDITURE */}
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 lg:hidden">
                        Expenditure
                      </p>

                      <p className="mt-1 font-semibold text-rose-700 lg:mt-0">
                        {formatINR(report.expenditure)}
                      </p>
                    </div>

                    {/* NET POSITION */}
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400 lg:hidden">
                        Net Position
                      </p>

                      <div className="mt-1 lg:mt-0">
                        <p
                          className={`font-bold ${
                            isSurplus
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }`}
                        >
                          {formatNetPosition(report.netPosition)}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {isSurplus ? "Surplus" : "Deficit"}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div>
                      <span
                        className={
                          report.status === "Published"
                            ? "inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
                            : "inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700"
                        }
                      >
                        {report.status === "Published"
                          ? "Report Available"
                          : "Report Pending"}
                      </span>
                    </div>

                    {/* PDF */}
                    <div className="lg:text-right">
                      {report.status === "Published" ? (
                        <a
                          href={report.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                        >
                          <Download size={16} />
                          View PDF
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-slate-400">
                          PDF Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
            <p className="text-sm text-slate-500">
              Financial reports are published for transparency and public
              information purposes. Figures are based on the respective
              published Income & Expenditure statements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}