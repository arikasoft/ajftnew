"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Home,
  Loader2,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

interface Donation {
  _id: string;
  donationReference: string;
  donorName: string;
  mobile: string;
  email: string;
  address: string;
  requires80G: boolean;
  pan: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  orderId: string;
  paymentStatus: string;
  paymentId: string;
  receiptNo: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
}

export default function VerifyPage() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [donation, setDonation] =
    useState<Donation | null>(null);
  const [error, setError] = useState("");

  // =========================================================
  // READ URL
  // =========================================================

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const receiptNo =
      params.get("receiptNo")?.trim() || "";

    const donationId =
      params.get("donationId")?.trim() || "";

    const reference =
      params.get("reference")?.trim() || "";

    const orderId =
      params.get("orderId")?.trim() || "";

    const paymentId =
      params.get("paymentId")?.trim() || "";

    console.log("VERIFY URL:", window.location.href);

    console.log({
      receiptNo,
      donationId,
      reference,
      orderId,
      paymentId,
    });

    // =======================================================
    // AUTOMATIC VERIFICATION
    // =======================================================

    if (receiptNo) {
      setIdentifier(receiptNo);
      verifyDonation("receiptNo", receiptNo);
      return;
    }

    if (donationId) {
      setIdentifier(donationId);
      verifyDonation("donationId", donationId);
      return;
    }

    if (reference) {
      setIdentifier(reference);
      verifyDonation("reference", reference);
      return;
    }

    if (orderId) {
      setIdentifier(orderId);
      verifyDonation("orderId", orderId);
      return;
    }

    if (paymentId) {
      setIdentifier(paymentId);
      verifyDonation("paymentId", paymentId);
      return;
    }

    // =======================================================
    // NO PARAMETER
    // Show manual verification form.
    // =======================================================

    setLoading(false);
  }, []);

  // =========================================================
  // VERIFY
  // =========================================================

  async function verifyDonation(
    type?: string,
    value?: string
  ) {
    const searchValue =
      (
        value ||
        identifier ||
        ""
      ).trim();

    if (!searchValue) {
      setError(
        "Please enter a receipt number or donation ID."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setDonation(null);

      const params = new URLSearchParams();

      // =====================================================
      // DETECT TYPE
      // =====================================================

      if (
        type === "donationId" ||
        /^[a-f0-9]{24}$/i.test(
          searchValue
        )
      ) {
        params.set(
          "donationId",
          searchValue
        );
      } else if (
        type === "reference" ||
        searchValue.startsWith(
          "AJFT-"
        )
      ) {
        // Receipt number or donation reference.
        //
        // First try receiptNo.
        params.set(
          "receiptNo",
          searchValue
        );
      } else if (
        type === "orderId" ||
        searchValue.startsWith(
          "order_"
        )
      ) {
        params.set(
          "orderId",
          searchValue
        );
      } else if (
        type === "paymentId" ||
        searchValue.startsWith(
          "pay_"
        )
      ) {
        params.set(
          "paymentId",
          searchValue
        );
      } else {
        params.set(
          "receiptNo",
          searchValue
        );
      }

      const apiUrl =
        `/api/donate/verify?${params.toString()}`;

      console.log(
        "VERIFY API:",
        apiUrl
      );

      const response =
        await fetch(
          apiUrl,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept:
                "application/json",
            },
          }
        );

      const text =
        await response.text();

      console.log(
        "VERIFY STATUS:",
        response.status
      );

      console.log(
        "VERIFY RESPONSE:",
        text
      );

      if (!text.trim()) {
        throw new Error(
          "Verification server returned an empty response."
        );
      }

      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Verification server returned invalid JSON."
        );
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Donation receipt could not be verified."
        );
      }

      if (!data.donation) {
        throw new Error(
          "Donation details were not returned."
        );
      }

      setDonation(
        data.donation
      );

      // =====================================================
      // UPDATE URL
      // This is important.
      // =====================================================

      const finalReceipt =
        data.donation.receiptNo;

      if (finalReceipt) {
        window.history.replaceState(
          {},
          "",
          `/verify?receiptNo=${encodeURIComponent(
            finalReceipt
          )}`
        );
      }
    } catch (err) {
      console.error(
        "VERIFY ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify donation."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // DOWNLOAD
  // =========================================================

  function downloadReceipt() {
    if (!donation?._id) {
      return;
    }

    const url =
      `/api/donate/receipt?donationId=${encodeURIComponent(
        donation._id
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#062A36] px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#087443]" />

          <h1 className="mt-4 text-xl font-bold text-[#073B4C]">
            Verifying Donation
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Checking official donation records...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // VERIFIED
  // =========================================================

  if (donation) {
    return (
      <main className="min-h-screen bg-[#F3F6F7] px-4 py-8">
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}

          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">

            <div className="bg-[#062A36] p-5">
              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-white p-1">
                  <img
                    src="/images/ajft-logo.png"
                    alt="Anand Jivan Foundation Trust"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-lg font-bold text-white md:text-xl">
                    ANAND JIVAN FOUNDATION TRUST
                  </h1>

                  <p className="mt-1 text-xs font-semibold text-[#D4AF37]">
                    OFFICIAL DONATION VERIFICATION
                  </p>

                  <p className="mt-1 text-xs text-white/70">
                    MABBI BELAUNA, POST -
                    LALSHAHPUR, PANCHAYAT -
                    SHAHBAJPUR, DARBHANGA,
                    BIHAR - 846005, INDIA
                  </p>
                </div>

              </div>
            </div>

            {/* VERIFIED BAR */}

            <div className="flex flex-col gap-3 bg-[#EEF8F3] p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="h-9 w-9 text-emerald-600" />

                <div>
                  <h2 className="font-bold text-emerald-800">
                    Donation Verified Successfully
                  </h2>

                  <p className="text-xs text-emerald-700">
                    Official digital record found.
                  </p>
                </div>

              </div>

              <span className="w-fit rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
                VERIFIED
              </span>

            </div>
          </div>

          {/* IDENTIFIERS */}

          <div className="mt-4 grid gap-4 md:grid-cols-3">

            <Info
              title="Receipt Number"
              value={
                donation.receiptNo
              }
            />

            <Info
              title="Donation Reference"
              value={
                donation.donationReference
              }
            />

            <Info
              title="Payment Status"
              value="SUCCESS"
            />

          </div>

          {/* DETAILS */}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">

            <Card title="Donor Information">

              <Row
                label="Name"
                value={
                  donation.donorName
                }
              />

              <Row
                label="Mobile"
                value={
                  donation.mobile
                }
              />

              <Row
                label="Email"
                value={
                  donation.email
                }
              />

              <Row
                label="Address"
                value={
                  donation.address ||
                  "Not Provided"
                }
              />

            </Card>

            <Card title="Donation Information">

              <div className="mb-4 rounded-xl bg-[#EEF8F3] p-4">

                <p className="text-xs font-bold text-slate-500">
                  DONATION AMOUNT
                </p>

                <p className="mt-1 text-3xl font-black text-[#00695C]">
                  {formatMoney(
                    donation.amount,
                    donation.currency
                  )}
                </p>

              </div>

              <Row
                label="Payment Mode"
                value="Online - Razorpay"
              />

              <Row
                label="Payment Status"
                value="SUCCESS"
                green
              />

              <Row
                label="Donation Date"
                value={formatDate(
                  donation.createdAt
                )}
              />

            </Card>

          </div>

          {/* TRANSACTION */}

          <div className="mt-4">
            <Card title="Transaction Details">

              <div className="grid gap-3 md:grid-cols-2">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold text-slate-400">
                    RAZORPAY PAYMENT ID
                  </p>

                  <p className="mt-2 break-all font-mono text-xs font-bold text-[#073B4C]">
                    {donation.paymentId ||
                      "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold text-slate-400">
                    RAZORPAY ORDER ID
                  </p>

                  <p className="mt-2 break-all font-mono text-xs font-bold text-[#073B4C]">
                    {donation.razorpayOrderId ||
                      donation.orderId ||
                      "—"}
                  </p>
                </div>

              </div>

            </Card>
          </div>

          {/* DOWNLOAD */}

          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">

            <button
              type="button"
              onClick={
                downloadReceipt
              }
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087443] text-sm font-bold text-white shadow-md transition hover:bg-[#075C36]"
            >
              <Download className="h-5 w-5" />
              Download Official Receipt
            </button>

          </div>

          <footer className="py-6 text-center">
            <p className="text-sm font-bold text-[#073B4C]">
              ANAND JIVAN FOUNDATION TRUST
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Official Digital Verification Portal
            </p>
          </footer>

        </div>
      </main>
    );
  }

  // =========================================================
  // MANUAL VERIFICATION PAGE
  // =========================================================

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#062A36] px-4 py-10">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="bg-[#062A36] px-6 py-7 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-white p-2">
            <img
              src="/images/ajft-logo.png"
              alt="AJFT"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="mt-4 text-xl font-bold text-white">
            ANAND JIVAN FOUNDATION TRUST
          </h1>

          <p className="mt-1 text-xs font-semibold text-[#D4AF37]">
            DONATION RECEIPT VERIFICATION
          </p>

        </div>

        {/* FORM */}

        <div className="p-6">

          {error && (
            <div className="mb-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

              <XCircle className="h-5 w-5 shrink-0 text-red-600" />

              <p className="text-sm font-medium text-red-700">
                {error}
              </p>

            </div>
          )}

          <div className="mb-5 rounded-xl bg-[#EEF5F8] p-4">

            <div className="flex gap-3">

              <ShieldCheck className="h-6 w-6 shrink-0 text-[#087443]" />

              <div>
                <p className="text-sm font-bold text-[#073B4C]">
                  Verify Donation Receipt
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Enter your receipt number
                  or donation ID to verify
                  the donation.
                </p>
              </div>

            </div>

          </div>

          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Receipt Number / Donation ID
          </label>

          <input
            value={identifier}
            onChange={(e) =>
              setIdentifier(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                verifyDonation();
              }
            }}
            placeholder="AJFT-2026-XXXXXXXX"
            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-semibold text-[#073B4C] outline-none transition focus:border-[#087443] focus:ring-2 focus:ring-[#087443]/10"
          />

          <button
            type="button"
            onClick={() =>
              verifyDonation()
            }
            disabled={
              !identifier.trim()
            }
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087443] text-sm font-bold text-white transition hover:bg-[#075C36] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Search className="h-5 w-5" />
            Verify Receipt
          </button>

          <div className="mt-4 grid grid-cols-2 gap-3">

            <Link
              href="/"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-[#073B4C]"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <Link
              href="/donate"
              className="flex h-11 items-center justify-center text-sm font-bold text-[#073B4C]"
            >
              Donate
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}

// ============================================================
// INFO
// ============================================================

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-2 truncate text-sm font-bold text-[#073B4C]">
        {value || "—"}
      </p>
    </div>
  );
}

// ============================================================
// CARD
// ============================================================

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b bg-slate-50 px-5 py-3">

        <h2 className="text-sm font-bold text-[#073B4C]">
          {title}
        </h2>

      </div>

      <div className="p-5">
        {children}
      </div>

    </div>
  );
}

// ============================================================
// ROW
// ============================================================

function Row({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex gap-4 border-b border-slate-100 py-3 last:border-0">

      <div className="w-32 shrink-0 text-xs font-bold text-slate-400">
        {label}
      </div>

      <div
        className={`break-words text-sm font-semibold ${
          green
            ? "text-emerald-600"
            : "text-[#263631]"
        }`}
      >
        {value || "—"}
      </div>

    </div>
  );
}

// ============================================================
// MONEY
// ============================================================

function formatMoney(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency:
        currency || "INR",
      minimumFractionDigits: 2,
    }
  ).format(amount || 0);
}

// ============================================================
// DATE
// ============================================================

function formatDate(
  value: string
) {
  if (!value) {
    return "—";
  }

  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}