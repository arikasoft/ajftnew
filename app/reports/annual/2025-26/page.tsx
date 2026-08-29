import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  Banknote,
  BookOpen,
  CheckCircle2,
  Droplets,
  Download,
  FileText,
  HeartHandshake,
  Landmark,
  Leaf,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatCompactINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

const financialData = {
  income: 5210000,
  expenditure: 5178000,
  surplus: 32000,
  openingBalance: 45000,
  closingBalance: 77000,
  assets: 77000,
  generalFund: 77000,
};

const programmes = [
  {
    title: "Educational & Social Welfare",
    amount: 633500,
    icon: BookOpen,
    description:
      "Support for educational and social welfare activities.",
  },
  {
    title: "Drinking Water Project",
    amount: 512823,
    icon: Droplets,
    description:
      "Community-focused drinking water support initiatives.",
  },
  {
    title: "Winter Relief Programme",
    amount: 471645,
    icon: HeartHandshake,
    description:
      "Sweaters and jackets support programme for children.",
  },
  {
    title: "Go Green Environmental Project",
    amount: 425000,
    icon: Leaf,
    description:
      "Tree plantation and environmental awareness activities.",
  },
  {
    title: "Hand Pump Donation & Installation",
    amount: 412300,
    icon: Droplets,
    description:
      "Community water access through hand pump support.",
  },
  {
    title: "Widow Saree Distribution",
    amount: 377550,
    icon: HeartHandshake,
    description:
      "Support programme for widows through saree distribution.",
  },
  {
    title: "Health & Community Development",
    amount: 375200,
    icon: HeartHandshake,
    description:
      "Health and community development programme support.",
  },
  {
    title: "Blanket Distribution Programme",
    amount: 332715,
    icon: HeartHandshake,
    description:
      "Winter support through blanket distribution activities.",
  },
  {
    title: "Support to Poor & Needy Families",
    amount: 248100,
    icon: Users,
    description:
      "Direct support and assistance for poor and needy families.",
  },
  {
    title: "Educational & Social Awareness",
    amount: 125000,
    icon: BookOpen,
    description:
      "Educational and social awareness programme activities.",
  },
  {
    title: "Sewage Worker Support",
    amount: 105000,
    icon: Users,
    description:
      "Support activities for sewage workers.",
  },
  {
    title: "Swachh Awareness Programme",
    amount: 75000,
    icon: Sparkles,
    description:
      "Public awareness activities related to cleanliness.",
  },
];

const administrativeExpenses = [
  {
    title: "Honorarium",
    amount: 320000,
  },
  {
    title: "Office Rent",
    amount: 420000,
  },
  {
    title: "Electricity Bill",
    amount: 15000,
  },
  {
    title: "Stationery & Printing",
    amount: 35000,
  },
  {
    title: "Travelling Expenses",
    amount: 50000,
  },
  {
    title: "Office Expenses",
    amount: 244045,
  },
  {
    title: "Miscellaneous Expenses",
    amount: 122,
  },
];

const programmeTotal = programmes.reduce(
  (total, item) => total + item.amount,
  0
);

const administrativeTotal = administrativeExpenses.reduce(
  (total, item) => total + item.amount,
  0
);

export default function AnnualReport202526Page() {
  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

          <Link
            href="/reports/annual"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-teal-700"
          >
            <ArrowLeft size={17} />
            Annual Reports
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">

            <div>

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/20">
                  <FileText size={30} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                    Anand Jivan Foundation Trust
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Annual Report
                  </p>
                </div>

              </div>

              <h1 className="mt-7 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Annual Report
                <span className="block text-teal-700">
                  FY 2025–26
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                A year of community-focused programmes, educational
                support, health and development initiatives, drinking
                water projects, environmental activities and direct
                support for vulnerable communities.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                  <CheckCircle2 size={16} />
                  Financial Year Completed
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  <ShieldCheck size={16} />
                  Audited Financial Statements
                </span>

              </div>

            </div>


            {/* REPORT CARD */}

            <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-7 text-white shadow-xl">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                FY 2025–26 at a Glance
              </p>

              <div className="mt-6 grid grid-cols-2 gap-5">

                <div>
                  <p className="text-xs text-slate-400">
                    Income
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    ₹52.10L
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Expenditure
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    ₹51.78L
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Surplus
                  </p>

                  <p className="mt-2 text-2xl font-black text-emerald-300">
                    ₹32,000
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Closing Fund
                  </p>

                  <p className="mt-2 text-2xl font-black text-cyan-300">
                    ₹77,000
                  </p>
                </div>

              </div>

              <a
                href="/reports/financials/audit/2025-26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-teal-50"
              >
                <Download size={17} />
                View Audited Financial Report
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINANCIAL HIGHLIGHTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

        <div className="mb-7">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
            Financial Highlights
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            FY 2025–26 Financial Overview
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            The following figures are based on the financial statements
            for the period from 01 April 2025 to 31 March 2026.
          </p>

        </div>


        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <FinancialCard
            label="Total Income"
            value={formatINR(financialData.income)}
            description="Donation income recorded"
            icon={Banknote}
            color="blue"
          />

          <FinancialCard
            label="Total Expenditure"
            value={formatINR(financialData.expenditure)}
            description="Programme and operating expenditure"
            icon={Wallet}
            color="orange"
          />

          <FinancialCard
            label="Annual Surplus"
            value={formatINR(financialData.surplus)}
            description="Transferred to General Fund"
            icon={TrendingUp}
            color="emerald"
          />

          <FinancialCard
            label="Closing Cash & Bank"
            value={formatINR(financialData.closingBalance)}
            description="Closing balance as reported"
            icon={Landmark}
            color="teal"
          />

        </div>

      </section>


      {/* =====================================================
          FINANCIAL POSITION
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Wallet size={23} />
              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Opening General Fund
              </p>

              <p className="mt-2 text-3xl font-black">
                {formatINR(
                  financialData.openingBalance
                )}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Balance brought forward from the previous Balance Sheet.
              </p>

            </div>


            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <TrendingUp size={23} />
              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Surplus During the Year
              </p>

              <p className="mt-2 text-3xl font-black">
                {formatINR(
                  financialData.surplus
                )}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Surplus transferred to the General Fund.
              </p>

            </div>


            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Scale size={23} />
              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                Closing Financial Position
              </p>

              <p className="mt-2 text-3xl font-black">
                {formatINR(
                  financialData.generalFund
                )}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                General Fund and closing Cash & Bank balance reported
                at the end of FY 2025–26.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROGRAMME INVESTMENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Our Work
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Programme & Community Activities
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              FY 2025–26 expenditure reflects a broad range of
              educational, social welfare, health, water, environmental
              and direct community support programmes.
            </p>

          </div>


          <div className="rounded-2xl border border-teal-100 bg-teal-50 px-6 py-4">

            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Listed Programme Activities
            </p>

            <p className="mt-1 text-2xl font-black text-slate-950">
              {formatINR(programmeTotal)}
            </p>

          </div>

        </div>


        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {programmes.map((programme) => {

            const Icon = programme.icon;

            const percentage =
              (programme.amount /
                financialData.expenditure) *
              100;

            return (
              <article
                key={programme.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon size={22} />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {percentage.toFixed(1)}%
                  </span>

                </div>


                <h3 className="mt-6 text-lg font-black leading-6 text-slate-900">
                  {programme.title}
                </h3>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                  {programme.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Reported Expenditure
                  </p>

                  <p className="mt-2 text-xl font-black text-teal-700">
                    {formatINR(
                      programme.amount
                    )}
                  </p>

                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          EXPENDITURE BREAKDOWN
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                Expenditure Overview
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                How Resources Were Utilised
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                The organisation incurred expenditure on programme
                implementation together with operational and
                administrative requirements required to support the
                Trust&apos;s activities.
              </p>


              <div className="mt-8 space-y-4">

                <SummaryRow
                  label="Programme & Community Activities"
                  value={programmeTotal}
                  total={financialData.expenditure}
                  colorClass="bg-teal-600"
                />

                <SummaryRow
                  label="Administrative & Operating Expenses"
                  value={administrativeTotal}
                  total={financialData.expenditure}
                  colorClass="bg-blue-600"
                />

                <SummaryRow
                  label="Annual Surplus"
                  value={financialData.surplus}
                  total={financialData.income}
                  colorClass="bg-emerald-600"
                />

              </div>

            </div>


            <div className="overflow-hidden rounded-3xl border border-slate-200">

              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Operating Expenses
                </p>

                <h3 className="mt-2 text-xl font-black">
                  Administrative Breakdown
                </h3>

              </div>


              <div className="divide-y divide-slate-100">

                {administrativeExpenses.map(
                  (item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-5 px-6 py-4"
                    >

                      <p className="text-sm font-medium text-slate-600">
                        {item.title}
                      </p>

                      <p className="whitespace-nowrap text-sm font-black text-slate-900">
                        {formatINR(
                          item.amount
                        )}
                      </p>

                    </div>
                  )
                )}

              </div>


              <div className="flex items-center justify-between bg-slate-950 px-6 py-5 text-white">

                <p className="text-sm font-bold">
                  Administrative Total
                </p>

                <p className="text-lg font-black">
                  {formatINR(
                    administrativeTotal
                  )}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPACT AND FINANCIAL SUMMARY
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

        <div className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-7 text-white sm:p-10 lg:p-12">

          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
                FY 2025–26 Summary
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Continuing Our Commitment
                to Community Development
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                During FY 2025–26, Anand Jivan Foundation Trust
                reported activities covering educational and social
                welfare, drinking water, environmental work, winter
                relief, support to poor and needy families, health and
                community development and other community-focused
                programmes.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  href="/reports/financials/income-expenditure"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-50"
                >
                  Income & Expenditure
                  <ArrowUpRight size={16} />
                </Link>

                <Link
                  href="/reports/financials/balance-sheet"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Balance Sheet
                  <ArrowUpRight size={16} />
                </Link>

              </div>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              <DarkStat
                label="Donation Income"
                value={formatCompactINR(
                  financialData.income
                )}
              />

              <DarkStat
                label="Annual Expenditure"
                value={formatCompactINR(
                  financialData.expenditure
                )}
              />

              <DarkStat
                label="Programme Categories"
                value={String(
                  programmes.length
                )}
              />

              <DarkStat
                label="Closing Cash & Bank"
                value={formatINR(
                  financialData.closingBalance
                )}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DOCUMENTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <ShieldCheck size={22} />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Financial Documents
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Access the FY 2025–26 audited financial statements and
                related financial transparency records.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <a
                href="/reports/financials/audit/2025-26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
              >
                <FileText size={17} />
                Audit Report
              </a>

              <Link
                href="/reports/financials/income-expenditure"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
              >
                Income & Expenditure
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/reports/financials/balance-sheet"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
              >
                Balance Sheet
                <ArrowUpRight size={16} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   FINANCIAL CARD
========================================================= */

function FinancialCard({
  label,
  value,
  description,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  color:
    | "blue"
    | "orange"
    | "emerald"
    | "teal";
}) {
  const styles = {
    blue: {
      icon: "bg-blue-50 text-blue-700",
      border: "hover:border-blue-200",
    },

    orange: {
      icon: "bg-orange-50 text-orange-700",
      border: "hover:border-orange-200",
    },

    emerald: {
      icon: "bg-emerald-50 text-emerald-700",
      border: "hover:border-emerald-200",
    },

    teal: {
      icon: "bg-teal-50 text-teal-700",
      border: "hover:border-teal-200",
    },
  };

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition ${styles[color].border}`}
    >

      <div className="flex items-center justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles[color].icon}`}
        >
          <Icon size={22} />
        </div>

        <BadgeIndianRupee
          size={18}
          className="text-slate-300"
        />

      </div>

      <p className="mt-6 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
  total,
  colorClass,
}: {
  label: string;
  value: number;
  total: number;
  colorClass: string;
}) {
  const percentage =
    total > 0
      ? (value / total) * 100
      : 0;

  return (
    <div>

      <div className="flex items-center justify-between gap-5">

        <p className="text-sm font-semibold text-slate-700">
          {label}
        </p>

        <p className="text-sm font-black text-slate-950">
          {formatINR(value)}
        </p>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{
            width: `${Math.min(
              percentage,
              100
            )}%`,
          }}
        />

      </div>

      <p className="mt-2 text-xs text-slate-400">
        {percentage.toFixed(1)}% of reference total
      </p>

    </div>
  );
}


/* =========================================================
   DARK STAT
========================================================= */

function DarkStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-2xl font-black text-white">
        {value}
      </p>

    </div>
  );
}