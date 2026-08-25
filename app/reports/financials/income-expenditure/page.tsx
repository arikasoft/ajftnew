import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const financialYears = [
  {
    year: "2025–26",
    income: "₹ —",
    expenditure: "₹ —",
    balance: "₹ —",
    status: "Report Pending",
  },
  {
    year: "2024–25",
    income: "₹ —",
    expenditure: "₹ —",
    balance: "₹ —",
    status: "Report Pending",
  },
  {
    year: "2023–24",
    income: "₹ —",
    expenditure: "₹ —",
    balance: "₹ —",
    status: "Report Pending",
  },
];

export default function IncomeExpenditurePage() {
  return (
    <main className="min-h-screen bg-[#F3F7F8] text-[#193247]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#123B4A]">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#2A8C9E]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6A83C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-11 text-center md:py-14">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6A83C] shadow-lg">

            <BarChart3
              size={24}
              className="text-white"
            />

          </div>

          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E7C96B]">
            Financial Transparency
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-5xl">
            Income & Expenditure
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-5 text-white/65 md:text-xs">
            Year-wise overview of income and expenditure
            information published by the Trust.
          </p>

        </div>

      </section>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="border-b border-[#D8E5E8] bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <Link
            href="/reports/financials"
            className="flex items-center gap-2 text-[9px] font-bold text-[#16758A] transition hover:text-[#B48726]"
          >
            <ArrowLeft size={13} />
            Back to Financials
          </Link>

          <Link
            href="/reports/financials/statements"
            className="flex items-center gap-2 text-[8px] font-semibold text-gray-400 transition hover:text-[#16758A]"
          >
            Financial Statements
            <ArrowRight size={11} />
          </Link>

        </div>

      </div>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-[#D8E5E8] bg-white p-5 sm:p-6">

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F7]">

                <ShieldCheck
                  size={20}
                  className="text-[#16758A]"
                />

              </div>

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
                  Financial Overview
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
                  Income & Expenditure Summary
                </h2>

                <p className="mt-2 max-w-3xl text-[9px] leading-5 text-gray-500">
                  This section provides a year-wise structure
                  for presenting income and expenditure
                  information. Actual figures should be
                  published only from approved financial
                  records.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <section className="px-4 pb-5 sm:px-6">

        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">

          <SummaryCard
            icon={<TrendingUp size={18} />}
            label="Total Income"
            value="₹ —"
            text="Published financial data"
          />

          <SummaryCard
            icon={<TrendingDown size={18} />}
            label="Total Expenditure"
            value="₹ —"
            text="Published financial data"
          />

          <SummaryCard
            icon={<BarChart3 size={18} />}
            label="Net Position"
            value="₹ —"
            text="Calculated from approved records"
          />

        </div>

      </section>

      {/* =====================================================
          YEAR-WISE TABLE
      ====================================================== */}

      <section className="px-4 pb-8 sm:px-6">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#D8E5E8] bg-white">

          <div className="border-b border-[#D8E5E8] p-5">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Financial Years
            </p>

            <h2 className="mt-1 font-serif text-xl font-bold text-[#123B4A]">
              Year-wise Summary
            </h2>

          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-[#F5F9FA] text-left">

                  <th className="px-5 py-3 text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Financial Year
                  </th>

                  <th className="px-5 py-3 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Income
                  </th>

                  <th className="px-5 py-3 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Expenditure
                  </th>

                  <th className="px-5 py-3 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Net Position
                  </th>

                  <th className="px-5 py-3 text-center text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {financialYears.map((item) => (
                  <tr
                    key={item.year}
                    className="border-t border-[#E8EEF0]"
                  >

                    <td className="px-5 py-4">

                      <p className="text-[10px] font-bold text-[#123B4A]">
                        {item.year}
                      </p>

                    </td>

                    <td className="px-5 py-4 text-right text-[10px] font-semibold text-[#16758A]">
                      {item.income}
                    </td>

                    <td className="px-5 py-4 text-right text-[10px] font-semibold text-[#B65D52]">
                      {item.expenditure}
                    </td>

                    <td className="px-5 py-4 text-right text-[10px] font-bold text-[#123B4A]">
                      {item.balance}
                    </td>

                    <td className="px-5 py-4 text-center">

                      <span className="rounded-full bg-[#FFF7E4] px-2.5 py-1 text-[7px] font-bold text-[#9A7623]">
                        {item.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* MOBILE CARDS */}

          <div className="space-y-3 p-4 md:hidden">

            {financialYears.map((item) => (
              <div
                key={item.year}
                className="rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-4"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-serif text-lg font-bold text-[#123B4A]">
                    {item.year}
                  </h3>

                  <span className="rounded-full bg-[#FFF7E4] px-2 py-1 text-[7px] font-bold text-[#9A7623]">
                    {item.status}
                  </span>

                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">

                  <MobileValue
                    label="Income"
                    value={item.income}
                  />

                  <MobileValue
                    label="Expense"
                    value={item.expenditure}
                  />

                  <MobileValue
                    label="Net"
                    value={item.balance}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          ACCOUNTING PRINCIPLES
      ====================================================== */}

      <section className="border-y border-[#D8E5E8] bg-white px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B48726]">
              Financial Responsibility
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#123B4A]">
              Our Reporting Approach
            </h2>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            <Principle text="Maintain proper financial records." />

            <Principle text="Report financial information responsibly." />

            <Principle text="Support transparency for stakeholders." />

            <Principle text="Publish approved information where appropriate." />

          </div>

        </div>

      </section>

      {/* =====================================================
          DOCUMENT LINKS
      ====================================================== */}

      <section className="bg-[#F3F7F8] px-4 py-8 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-3 sm:grid-cols-3">

            <QuickLink
              href="/reports/financials/statements"
              title="Financial Statements"
              icon={<FileText size={16} />}
            />

            <QuickLink
              href="/reports/financials/audit"
              title="Audit Reports"
              icon={<ShieldCheck size={16} />}
            />

            <QuickLink
              href="/reports/annual"
              title="Annual Reports"
              icon={<BarChart3 size={16} />}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          NOTICE
      ====================================================== */}

      <section className="px-4 pb-8 sm:px-6">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#E7D6A8] bg-[#FFFBEF] p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-[#B18428]"
            />

            <div>

              <h3 className="text-[10px] font-bold text-[#123B4A]">
                Important Financial Information
              </h3>

              <p className="mt-1 text-[8px] leading-5 text-gray-600">
                The figures displayed on this page should be
                replaced with figures from the Trust&apos;s
                approved accounts and financial records before
                publication. Placeholder values are intentionally
                shown as “—” until verified figures are available.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#123B4A] px-4 py-9 text-center">

        <BarChart3
          size={21}
          className="mx-auto text-[#D6A83C]"
        />

        <h2 className="mt-2 font-serif text-2xl font-bold text-white">
          Explore Financial Information
        </h2>

        <p className="mx-auto mt-1 max-w-lg text-[9px] leading-5 text-white/45">
          View annual reports, financial statements and
          other transparency information.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">

          <Link
            href="/reports/financials/statements"
            className="flex items-center gap-2 rounded-lg bg-[#D6A83C] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#B98D29]"
          >
            Financial Statements
            <ArrowRight size={12} />
          </Link>

          <Link
            href="/transparency"
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-[9px] font-bold text-white transition hover:border-[#D6A83C]"
          >
            Transparency Centre
            <ArrowRight size={12} />
          </Link>

        </div>

      </section>

    </main>
  );
}

/* ==========================================================
   SUMMARY CARD
========================================================== */

function SummaryCard({
  icon,
  label,
  value,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#D8E5E8] bg-white p-4">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F5F7] text-[#16758A]">
        {icon}
      </div>

      <p className="mt-3 text-[8px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-serif text-xl font-bold text-[#123B4A]">
        {value}
      </p>

      <p className="mt-1 text-[8px] text-gray-500">
        {text}
      </p>

    </div>
  );
}

/* ==========================================================
   MOBILE VALUE
========================================================== */

function MobileValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-white p-2 text-center">

      <p className="text-[7px] font-bold uppercase text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-[9px] font-bold text-[#123B4A]">
        {value}
      </p>

    </div>
  );
}

/* ==========================================================
   PRINCIPLE
========================================================== */

function Principle({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#D8E5E8] bg-[#F9FBFC] p-3">

      <CheckCircle2
        size={15}
        className="shrink-0 text-[#16758A]"
      />

      <span className="text-[9px] font-semibold text-[#526575]">
        {text}
      </span>

    </div>
  );
}

/* ==========================================================
   QUICK LINK
========================================================== */

function QuickLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-[#D8E5E8] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#D6A83C] hover:shadow-sm"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F5F7] text-[#16758A]">
          {icon}
        </div>

        <span className="text-[9px] font-bold text-[#123B4A]">
          {title}
        </span>

      </div>

      <ArrowRight
        size={13}
        className="text-[#16758A] transition group-hover:translate-x-1"
      />

    </Link>
  );
}