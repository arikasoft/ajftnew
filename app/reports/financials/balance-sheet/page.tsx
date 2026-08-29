import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Landmark,
  Scale,
  WalletCards,
} from "lucide-react";

type ReportStatus = "Published" | "Pending";

type BalanceSheetReport = {
  year: string;
  title: string;

  assets?: number;
  liabilities?: number;
  funds?: number;

  file: string;
  status: ReportStatus;
};

const reports: BalanceSheetReport[] = [
  {
    year: "FY 2025–26",
    title: "Balance Sheet",
    file: "/reports/financials/balance-sheet/2025-26.pdf",
    status: "Published",

    // Actual Balance Sheet figures can be added here later.
    // assets: 0,
    // liabilities: 0,
    // funds: 0,
  },

  {
    year: "FY 2024–25",
    title: "Balance Sheet",
    file: "/reports/financials/balance-sheet/2024-25.pdf",
    status: "Published",
  },

  {
    year: "FY 2023–24",
    title: "Balance Sheet",
    file: "/reports/financials/balance-sheet/2023-24.pdf",
    status: "Published",
  },
];

function formatINR(amount?: number) {
  if (typeof amount !== "number") {
    return null;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function hasFinancialData(report: BalanceSheetReport) {
  return (
    typeof report.assets === "number" ||
    typeof report.liabilities === "number" ||
    typeof report.funds === "number"
  );
}

export default function BalanceSheetPage() {
  const publishedReports = reports.filter(
    (report) => report.status === "Published"
  );

  const latestFinancialReport = reports.find(
    (report) =>
      report.status === "Published" &&
      hasFinancialData(report)
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

          <Link
            href="/transparency/financial"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-teal-700"
          >
            <ArrowLeft size={17} />
            Back to Financial Transparency
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div className="max-w-3xl">

              <div className="mb-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-700 shadow-sm">
                  <Scale size={28} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                    Financial Statements
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Anand Jivan Foundation Trust
                  </p>
                </div>

              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Balance Sheet
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                Access year-wise Balance Sheet documents and review the
                officially published financial position of Anand Jivan
                Foundation Trust.
              </p>

            </div>

            <div className="rounded-2xl border border-teal-100 bg-teal-50 px-6 py-5">

              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Published Reports
              </p>

              <p className="mt-2 text-4xl font-bold text-slate-900">
                {publishedReports.length}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Financial years available
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* FINANCIAL SUMMARY */}

      {latestFinancialReport && (
        <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-10">

          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              Latest Financial Position
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Summary from Published Balance Sheet
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {/* ASSETS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Building2 size={23} />
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  {latestFinancialReport.year}
                </span>

              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Total Assets
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                {formatINR(latestFinancialReport.assets)}
              </p>

            </div>


            {/* LIABILITIES */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
                  <WalletCards size={23} />
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                  {latestFinancialReport.year}
                </span>

              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Total Liabilities
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                {formatINR(latestFinancialReport.liabilities)}
              </p>

            </div>


            {/* FUNDS */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Landmark size={23} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {latestFinancialReport.year}
                </span>

              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Trust / Organization Funds
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                {formatINR(latestFinancialReport.funds)}
              </p>

            </div>

          </div>

        </section>
      )}


      {/* REPORTS */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}

          <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Financial Years
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Year-wise Balance Sheets
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View, open or download officially published Balance Sheet
                documents.
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <FileText size={23} />
            </div>

          </div>


          {/* REPORT LIST */}

          <div>

            {reports.map((report) => {

              const hasData = hasFinancialData(report);

              return (
                <div
                  key={report.year}
                  className="border-b border-slate-100 px-6 py-6 transition hover:bg-slate-50 last:border-b-0"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* LEFT */}

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                          report.status === "Published"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {report.status === "Published" ? (
                          <FileCheck2 size={23} />
                        ) : (
                          <FileText size={23} />
                        )}
                      </div>

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">
                          {report.year}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {report.title}
                        </p>

                        {hasData && (
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

                            {typeof report.assets === "number" && (
                              <span>
                                Assets:
                                {" "}
                                <strong className="text-slate-800">
                                  {formatINR(report.assets)}
                                </strong>
                              </span>
                            )}

                            {typeof report.liabilities === "number" && (
                              <span>
                                Liabilities:
                                {" "}
                                <strong className="text-slate-800">
                                  {formatINR(report.liabilities)}
                                </strong>
                              </span>
                            )}

                            {typeof report.funds === "number" && (
                              <span>
                                Funds:
                                {" "}
                                <strong className="text-slate-800">
                                  {formatINR(report.funds)}
                                </strong>
                              </span>
                            )}

                          </div>
                        )}

                      </div>

                    </div>


                    {/* RIGHT */}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                      {report.status === "Published" ? (

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">

                          <span className="h-2 w-2 rounded-full bg-emerald-500" />

                          Report Available

                        </span>

                      ) : (

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">

                          <span className="h-2 w-2 rounded-full bg-amber-500" />

                          Report Pending

                        </span>

                      )}


                      {report.status === "Published" && (

                        <div className="flex flex-wrap gap-2">

                          <a
                            href={report.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
                          >
                            <Eye size={16} />
                            View PDF
                          </a>

                          <a
                            href={report.file}
                            download
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
                          >
                            <Download size={16} />
                            Download
                          </a>

                        </div>

                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>


          {/* FOOTER */}

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">

            <p className="text-sm leading-6 text-slate-500">
              Published Balance Sheet documents are provided for public
              information, transparency and organizational accountability.
              Financial summary figures are displayed only when verified data
              from the corresponding Balance Sheet has been entered into the
              website records.
            </p>

          </div>

        </div>


        {/* RELATED REPORTS */}

        <div className="mt-10">

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Related Financial Reports
          </p>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/reports/financials/audit"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700"
            >
              Audit Reports
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/reports/financials/income-expenditure"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700"
            >
              Income & Expenditure
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/transparency/financial"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700"
            >
              Financial Transparency
              <ArrowUpRight size={16} />
            </Link>

          </div>

        </div>


        {/* TRANSPARENCY */}

        <div className="mt-8 rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 sm:p-8">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <Landmark size={22} />
            </div>

            <div>

              <h3 className="text-lg font-bold text-slate-900">
                Financial Transparency
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Anand Jivan Foundation Trust publishes relevant financial
                documents to support transparency, accountability and
                responsible organizational governance.
              </p>

              <p className="mt-4 text-sm font-bold text-teal-700">
                {publishedReports.length} published Balance Sheet{" "}
                {publishedReports.length === 1 ? "report" : "reports"}{" "}
                currently available
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}