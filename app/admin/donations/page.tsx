"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  IndianRupee,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
  XCircle,
  WalletCards,
} from "lucide-react";

type Donation = {
  _id?: string;
  donationReference: string;
  donorName: string;
  mobile: string;
  email: string;
  address?: string;
  requires80G: boolean;
  pan?: string;
  amount: number;
  currency?: string;
  razorpayOrderId?: string;
  orderId?: string;
  paymentStatus: string;
  paymentId?: string;
  receiptNo?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Stats = {
  total: number;
  pending: number;
  success: number;
  failed: number;
  cancelled: number;
  successfulAmount: number;
};

const statuses = [
  "ALL",
  "SUCCESS",
  "PENDING",
  "FAILED",
  "CANCELLED",
];

function money(
  amount: number,
  currency = "INR"
) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  } catch {
    return `₹${amount || 0}`;
  }
}

function dateText(value?: string) {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return value;
  }
}

function statusClass(
  status?: string
) {
  switch (status) {
    case "SUCCESS":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "FAILED":
      return "border-red-200 bg-red-50 text-red-700";

    case "CANCELLED":
      return "border-slate-200 bg-slate-100 text-slate-600";

    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

function maskPAN(pan?: string) {
  if (!pan) return "—";

  const value = pan.trim();

  if (value.length <= 4) {
    return "••••";
  }

  return (
    value.slice(0, 2) +
    "••••••" +
    value.slice(-2)
  );
}

export default function AdminDonationsPage() {
  const [donations, setDonations] =
    useState<Donation[]>([]);

  const [stats, setStats] =
    useState<Stats>({
      total: 0,
      pending: 0,
      success: 0,
      failed: 0,
      cancelled: 0,
      successfulAmount: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [selected, setSelected] =
    useState<Donation | null>(null);

  const [error, setError] =
    useState("");

  async function loadDonations(
    refresh = false
  ) {
    try {
      setError("");

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const params =
        new URLSearchParams();

      if (status !== "ALL") {
        params.set(
          "status",
          status
        );
      }

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      const response =
        await fetch(
          `/api/admin/donations?${params.toString()}`,
          {
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Unable to load donations."
        );
      }

      setDonations(
        Array.isArray(result.donations)
          ? result.donations
          : []
      );

      setStats(
        result.stats || {
          total: 0,
          pending: 0,
          success: 0,
          failed: 0,
          cancelled: 0,
          successfulAmount: 0,
        }
      );
    } catch (err) {
      console.error(
        "DONATIONS PAGE ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load donations."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const timer =
      setTimeout(() => {
        loadDonations();
      }, 250);

    return () =>
      clearTimeout(timer);
  }, [status, search]);

  const filteredCount =
    useMemo(
      () => donations.length,
      [donations]
    );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7F9]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-xl">
            <Loader2
              size={24}
              className="animate-spin"
            />
          </div>

          <p className="mt-4 text-xs font-black text-[#526575]">
            Loading Donations...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7F9]">

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071D2B]/95 text-white shadow-xl backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">

            <Link
              href="/admin"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <ArrowLeft size={15} />
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2C94C] text-[#071D2B]">
              <WalletCards size={19} />
            </div>

            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                AJFT ADMIN
              </p>

              <h1 className="text-base font-black">
                Donation Management
              </h1>
            </div>

          </div>

          <button
            onClick={() =>
              loadDonations(true)
            }
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[9px] font-black hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw
              size={13}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>

        </div>

      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[2rem] bg-[#102A43] p-7 text-white shadow-xl sm:p-9">

          <div className="relative z-10">

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F2C94C]">
              DONATION & PAYMENT MANAGEMENT
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Donation Centre
            </h2>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-white/60">
              Monitor donor information,
              payment status, 80G requests,
              receipts and successful
              donation collections.
            </p>

          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5" />

        </section>

        {/* ERROR */}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700">
            {error}
          </div>
        )}

        {/* STATS */}

        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">

          <Stat
            title="Total"
            value={String(stats.total)}
            icon={<WalletCards size={16} />}
          />

          <Stat
            title="Successful"
            value={String(
              stats.success
            )}
            icon={<CheckCircle2 size={16} />}
          />

          <Stat
            title="Pending"
            value={String(
              stats.pending
            )}
            icon={<Clock3 size={16} />}
          />

          <Stat
            title="Failed"
            value={String(
              stats.failed
            )}
            icon={<XCircle size={16} />}
          />

          <Stat
            title="Cancelled"
            value={String(
              stats.cancelled
            )}
            icon={<XCircle size={16} />}
          />

          <Stat
            title="Collected"
            value={money(
              stats.successfulAmount
            )}
            icon={<IndianRupee size={16} />}
          />

        </section>

        {/* FILTERS */}

        <section className="mt-6 rounded-2xl border border-[#DCE6EB] bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA7AF]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search donor, reference, email, mobile, payment ID..."
                className="h-11 w-full rounded-xl border border-[#DCE5EA] bg-[#FAFCFD] pl-10 pr-4 text-xs outline-none focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
              />

            </div>

            <div className="flex flex-wrap gap-2">

              {statuses.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setStatus(item)
                    }
                    className={`rounded-xl px-3 py-2.5 text-[8px] font-black transition ${
                      status === item
                        ? "bg-[#102A43] text-white"
                        : "bg-[#F4F7F9] text-[#526575] hover:bg-[#EAF2F4]"
                    }`}
                  >
                    {item === "ALL"
                      ? "ALL"
                      : item}
                  </button>
                )
              )}

            </div>

          </div>

        </section>

        {/* TABLE */}

        <section className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#DCE6EB] bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-[#E8EEF1] px-5 py-4">

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#176B87]">
                Donations
              </p>

              <p className="mt-1 text-[10px] text-[#8997A2]">
                Showing{" "}
                {filteredCount}{" "}
                records
              </p>
            </div>

          </div>

          {donations.length ===
          0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <WalletCards
                size={32}
                className="text-[#B8C5CC]"
              />

              <h3 className="mt-4 text-sm font-black text-[#243B53]">
                No donations found
              </h3>

              <p className="mt-2 text-[10px] text-[#8997A2]">
                Try another search or
                payment status.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px]">

                <thead>
                  <tr className="border-b border-[#E8EEF1] bg-[#F8FAFB]">

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Donor
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Reference
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Payment
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      80G
                    </th>

                    <th className="px-5 py-3 text-left text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Date
                    </th>

                    <th className="px-5 py-3 text-right text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {donations.map(
                    (donation) => (
                      <tr
                        key={
                          donation._id ||
                          donation.donationReference
                        }
                        className="border-b border-[#EEF2F4] hover:bg-[#FAFCFD]"
                      >

                        <td className="px-5 py-4">

                          <p className="text-xs font-black text-[#243B53]">
                            {
                              donation.donorName
                            }
                          </p>

                          <p className="mt-1 text-[9px] text-[#8997A2]">
                            {donation.email}
                          </p>

                          <p className="mt-1 text-[9px] text-[#8997A2]">
                            {donation.mobile}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <p className="font-mono text-[9px] font-bold text-[#176B87]">
                            {
                              donation.donationReference
                            }
                          </p>

                          {donation.receiptNo && (
                            <p className="mt-1 text-[8px] text-[#8997A2]">
                              Receipt:{" "}
                              {
                                donation.receiptNo
                              }
                            </p>
                          )}

                        </td>

                        <td className="px-5 py-4">

                          <p className="text-sm font-black text-[#102A43]">
                            {money(
                              donation.amount,
                              donation.currency
                            )}
                          </p>

                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black ${statusClass(
                              donation.paymentStatus
                            )}`}
                          >
                            {
                              donation.paymentStatus
                            }
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          {donation.requires80G ? (
                            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-700">
                              YES
                            </span>
                          ) : (
                            <span className="text-[9px] text-[#9AA7AF]">
                              NO
                            </span>
                          )}

                        </td>

                        <td className="px-5 py-4 text-[9px] text-[#8997A2]">
                          {dateText(
                            donation.createdAt
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">

                          <button
                            onClick={() =>
                              setSelected(
                                donation
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-[#102A43] px-3.5 py-2.5 text-[9px] font-black text-white hover:bg-[#176B87]"
                          >
                            <Eye size={13} />
                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

      {/* DETAIL DRAWER */}

      {selected && (
        <div className="fixed inset-0 z-50">

          <button
            onClick={() =>
              setSelected(null)
            }
            className="absolute inset-0 bg-[#071D2B]/60 backdrop-blur-sm"
            aria-label="Close"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">

            <div className="shrink-0 bg-[#071D2B] px-6 py-6 text-white">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#F2C94C]">
                    Donation Details
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    {
                      selected.donorName
                    }
                  </h2>

                  <p className="mt-1 font-mono text-[9px] text-white/50">
                    {
                      selected.donationReference
                    }
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelected(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <X size={16} />
                </button>

              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/5 p-4">

                <div>

                  <p className="text-[8px] uppercase tracking-widest text-white/40">
                    Donation Amount
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#F2C94C]">
                    {money(
                      selected.amount,
                      selected.currency
                    )}
                  </p>

                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-[8px] font-black ${statusClass(
                    selected.paymentStatus
                  )}`}
                >
                  {
                    selected.paymentStatus
                  }
                </span>

              </div>

            </div>

            <div className="flex-1 overflow-y-auto p-6">

              <div className="space-y-5">

                <Info
                  label="Email"
                  value={
                    selected.email
                  }
                />

                <Info
                  label="Mobile"
                  value={
                    selected.mobile
                  }
                />

                <Info
                  label="Address"
                  value={
                    selected.address
                  }
                />

                <Info
                  label="80G Required"
                  value={
                    selected.requires80G
                      ? "YES"
                      : "NO"
                  }
                />

                {selected.requires80G && (
                  <Info
                    label="PAN"
                    value={maskPAN(
                      selected.pan
                    )}
                  />
                )}

                <Info
                  label="Receipt Number"
                  value={
                    selected.receiptNo
                  }
                />

                <Info
                  label="Payment ID"
                  value={
                    selected.paymentId
                  }
                />

                <Info
                  label="Razorpay Order ID"
                  value={
                    selected.razorpayOrderId ||
                    selected.orderId
                  }
                />

                <Info
                  label="Created"
                  value={dateText(
                    selected.createdAt
                  )}
                />

                <Info
                  label="Last Updated"
                  value={dateText(
                    selected.updatedAt
                  )}
                />

                <div className="rounded-2xl border border-[#E2EAEE] bg-[#F8FAFB] p-4">

                  <div className="flex items-center gap-2">

                    <ShieldCheck
                      size={15}
                      className="text-[#176B87]"
                    />

                    <p className="text-[9px] font-black uppercase tracking-widest text-[#526575]">
                      Donation Reference
                    </p>

                  </div>

                  <p className="mt-3 font-mono text-xs font-bold text-[#102A43]">
                    {
                      selected.donationReference
                    }
                  </p>

                </div>

              </div>

            </div>

            <div className="shrink-0 border-t border-[#E5ECEF] bg-[#F8FAFB] p-5">

              <div className="grid grid-cols-2 gap-2">

                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#102A43] py-3 text-[9px] font-black text-white hover:bg-[#176B87]"
                  >
                    Email Donor
                  </a>
                )}

                {selected.paymentStatus ===
                  "SUCCESS" &&
                  selected.receiptNo && (
                    <button
                      onClick={() =>
                        window.print()
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#DCE5EA] bg-white py-3 text-[9px] font-black text-[#526575]"
                    >
                      <FileText size={13} />
                      Print
                    </button>
                  )}

              </div>

            </div>

          </aside>

        </div>
      )}

    </main>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#DCE6EB] bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF6F8] text-[#176B87]">
          {icon}
        </div>

        <p className="text-sm font-black text-[#102A43]">
          {value}
        </p>

      </div>

      <p className="mt-3 text-[8px] font-black uppercase tracking-widest text-[#8997A2]">
        {title}
      </p>

    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-[#E5ECEF] bg-[#FAFCFD] p-3">

      <p className="text-[7px] font-black uppercase tracking-widest text-[#9AA7AF]">
        {label}
      </p>

      <p className="mt-1.5 break-words text-[10px] font-semibold leading-5 text-[#526575]">
        {value || "—"}
      </p>

    </div>
  );
}