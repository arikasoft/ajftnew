"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Heart,
  Home,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

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
}

interface VerifyResponse {
  success?: boolean;

  message?: string;

  donation?: Donation;

  receiptUrl?: string;

  verifyUrl?: string;
}

// ============================================================
// HELPERS
// ============================================================

function clean(value: unknown): string {
  const result =
    String(value ?? "").trim();

  if (
    !result ||
    result === "undefined" ||
    result === "null"
  ) {
    return "";
  }

  return result;
}

// ============================================================

function formatAmount(
  amount: number,
  currency = "INR"
) {
  try {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(
      Number(amount || 0)
    );
  } catch {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  }
}

// ============================================================

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  try {
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(
      new Date(value)
    );
  } catch {
    return value;
  }
}

// ============================================================
// PAGE
// ============================================================

export default function DonationSuccessPage() {
  const searchParams =
    useSearchParams();

  // ==========================================================
  // STATE
  // ==========================================================

  const [donation, setDonation] =
    useState<Donation | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [downloading, setDownloading] =
    useState(false);

  // ==========================================================
  // PARAMETERS
  // ==========================================================

  const donationId =
    clean(
      searchParams.get(
        "donationId"
      )
    ) ||
    clean(
      searchParams.get(
        "donation"
      )
    );

  const receiptNo =
    clean(
      searchParams.get(
        "receiptNo"
      )
    ) ||
    clean(
      searchParams.get(
        "receipt"
      )
    );

  const reference =
    clean(
      searchParams.get(
        "reference"
      )
    );

  const paymentId =
    clean(
      searchParams.get(
        "paymentId"
      )
    ) ||
    clean(
      searchParams.get(
        "payment"
      )
    );

  const orderId =
    clean(
      searchParams.get(
        "orderId"
      )
    );

  // ==========================================================
  // LOAD DONATION
  // ==========================================================

  const loadDonation =
    useCallback(
      async () => {
        try {
          setLoading(true);

          setError("");

          console.log(
            "======================================"
          );

          console.log(
            "AJFT DONATION SUCCESS PAGE"
          );

          console.log(
            "URL:",
            window.location.href
          );

          console.log(
            "Donation ID:",
            donationId
          );

          console.log(
            "Receipt:",
            receiptNo
          );

          console.log(
            "Reference:",
            reference
          );

          console.log(
            "Payment:",
            paymentId
          );

          console.log(
            "Order:",
            orderId
          );

          console.log(
            "======================================"
          );

          // ==================================================
          // BUILD QUERY
          // ==================================================

          const query =
            new URLSearchParams();

          if (donationId) {
            query.set(
              "donationId",
              donationId
            );
          } else if (receiptNo) {
            query.set(
              "receiptNo",
              receiptNo
            );
          } else if (reference) {
            query.set(
              "reference",
              reference
            );
          } else if (orderId) {
            query.set(
              "orderId",
              orderId
            );
          } else if (paymentId) {
            query.set(
              "paymentId",
              paymentId
            );
          }

          // ==================================================
          // IDENTIFIER REQUIRED
          // ==================================================

          if (!query.toString()) {
            throw new Error(
              "Donation ID or receipt number is missing."
            );
          }

          // ==================================================
          // VERIFY API
          // ==================================================

          const apiUrl =
            `/api/donate/verify?${query.toString()}`;

          console.log(
            "VERIFY URL:",
            apiUrl
          );

          const response =
            await fetch(
              apiUrl,
              {
                method: "GET",

                headers: {
                  Accept:
                    "application/json",
                },

                cache: "no-store",
              }
            );

          // ==================================================
          // TEXT FIRST
          // ==================================================

          const raw =
            await response.text();

          console.log(
            "VERIFY STATUS:",
            response.status
          );

          console.log(
            "VERIFY RESPONSE:",
            raw
          );

          if (!raw.trim()) {
            throw new Error(
              "Verification server returned an empty response."
            );
          }

          // ==================================================
          // JSON ONLY
          // ==================================================

          let data: VerifyResponse;

          try {
            data =
              JSON.parse(raw);
          } catch {
            console.error(
              "INVALID JSON:",
              raw
            );

            throw new Error(
              "Verification server returned invalid JSON."
            );
          }

          // ==================================================
          // API ERROR
          // ==================================================

          if (
            !response.ok ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Donation verification failed."
            );
          }

          // ==================================================
          // DONATION
          // ==================================================

          if (!data.donation) {
            throw new Error(
              "Donation details were not returned by the server."
            );
          }

          // ==================================================
          // PAYMENT STATUS
          // ==================================================

          const status =
            clean(
              data.donation
                .paymentStatus
            ).toUpperCase();

          if (
            status !==
            "SUCCESS"
          ) {
            throw new Error(
              "This donation payment is not marked as successful."
            );
          }

          // ==================================================
          // SET DONATION
          // ==================================================

          setDonation(
            data.donation
          );

          console.log(
            "======================================"
          );

          console.log(
            "AJFT DONATION LOADED"
          );

          console.log(
            "ID:",
            data.donation._id
          );

          console.log(
            "Reference:",
            data.donation
              .donationReference
          );

          console.log(
            "Receipt:",
            data.donation
              .receiptNo
          );

          console.log(
            "Payment:",
            data.donation
              .paymentId
          );

          console.log(
            "Status:",
            data.donation
              .paymentStatus
          );

          console.log(
            "======================================"
          );
        } catch (err) {
          console.error(
            "AJFT SUCCESS PAGE ERROR:",
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
      },
      [
        donationId,
        receiptNo,
        reference,
        paymentId,
        orderId,
      ]
    );

  // ==========================================================
  // EFFECT
  // ==========================================================

  useEffect(() => {
    loadDonation();
  }, [
    loadDonation,
  ]);

  // ==========================================================
  // DOWNLOAD PDF
  // ==========================================================

  async function downloadReceipt() {
    const id =
      clean(
        donation?._id
      );

    if (!id) {
      setError(
        "Donation ID is not available."
      );

      return;
    }

    try {
      setDownloading(true);

      setError("");

      const pdfUrl =
        `/api/donate/receipt?donationId=${encodeURIComponent(
          id
        )}`;

      const response =
        await fetch(
          pdfUrl,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      if (!response.ok) {
        const text =
          await response.text();

        let message =
          "Unable to generate receipt.";

        try {
          const json =
            JSON.parse(text);

          message =
            json?.message ||
            message;
        } catch {
          if (text.trim()) {
            console.error(
              "Receipt API error:",
              text
            );
          }
        }

        throw new Error(
          message
        );
      }

      // ======================================================
      // PDF = BLOB
      // ======================================================

      const blob =
        await response.blob();

      if (
        !blob ||
        blob.size === 0
      ) {
        throw new Error(
          "Receipt PDF is empty."
        );
      }

      const blobUrl =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href =
        blobUrl;

      link.download =
        `${
          donation.receiptNo ||
          "AJFT-Donation"
        }.pdf`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.setTimeout(
        () => {
          window.URL.revokeObjectURL(
            blobUrl
          );
        },
        1000
      );
    } catch (err) {
      console.error(
        "AJFT PDF ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to download receipt."
      );
    } finally {
      setDownloading(false);
    }
  }

  // ==========================================================
  // VIEW PDF
  // ==========================================================

  function viewReceipt() {
    const id =
      clean(
        donation?._id
      );

    if (!id) {
      setError(
        "Donation ID is not available."
      );

      return;
    }

    const url =
      `/api/donate/receipt?donationId=${encodeURIComponent(
        id
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F3F6F4] px-4">

        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F4EF]">

            <Loader2
              size={28}
              className="animate-spin text-[#08744F]"
            />

          </div>

          <h1 className="mt-4 text-base font-bold text-[#073B4C]">
            Verifying Donation
          </h1>

          <p className="mt-2 text-[9px] leading-5 text-gray-500">
            Please wait while we verify your payment.
          </p>

        </div>

      </main>
    );
  }

  // ==========================================================
  // ERROR SCREEN
  // ==========================================================

  if (!donation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#073B4C] px-4">

        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

          <div className="bg-[#9C3E46] px-5 py-7 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">

              <ShieldCheck
                size={30}
                className="text-white"
              />

            </div>

            <h1 className="mt-3 text-xl font-bold text-white">
              Verification Failed
            </h1>

            <p className="mt-1 text-[9px] text-white/70">
              Donation receipt could not be verified.
            </p>

          </div>

          <div className="p-5">

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

              <p className="text-[9px] font-semibold leading-5 text-red-700">
                {error ||
                  "Unable to verify donation."}
              </p>

            </div>

            <button
              type="button"
              onClick={
                loadDonation
              }
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#073B4C] text-[9px] font-bold text-white"
            >

              <ShieldCheck
                size={14}
              />

              Try Verification Again

            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">

              <Link
                href="/"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-[9px] font-bold text-[#073B4C]"
              >

                <Home
                  size={14}
                />

                Home

              </Link>

              <Link
                href="/donate"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-[9px] font-bold text-[#073B4C]"
              >

                <Heart
                  size={14}
                />

                Donate

              </Link>

            </div>

            {/* DEBUG */}

            <div className="mt-4 rounded-lg bg-gray-50 p-3">

              <p className="text-[7px] font-bold uppercase tracking-wider text-gray-400">
                Current URL
              </p>

              <p className="mt-1 break-all text-[7px] leading-4 text-gray-500">
                {typeof window !==
                "undefined"
                  ? window.location.href
                  : ""}
              </p>

            </div>

          </div>

        </div>

      </main>
    );
  }

  // ==========================================================
  // SUCCESS
  // ==========================================================

  return (
    <main className="min-h-screen bg-[#F3F6F4]">

      {/* ======================================================
          TOP GOLD LINE
      ======================================================= */}

      <div className="h-1 bg-[#D2AD4B]" />

      {/* ======================================================
          HEADER
      ======================================================= */}

      <header className="bg-[#073B4C]">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">

          {/* LEFT BRAND */}

          <div className="flex items-center gap-2.5">

            
            

          </div>

          {/* ==================================================
              SMALL VERIFIED BADGE
          ================================================== */}

          <div className="flex items-center gap-1 rounded-full border border-[#D2AD4B]/50 bg-[#D2AD4B]/10 px-2.5 py-1 text-[6px] font-bold tracking-wide text-[#D2AD4B]">

            <ShieldCheck
              size={10}
              strokeWidth={2.5}
            />

            VERIFIED

          </div>

        </div>

      </header>

      {/* ======================================================
          SUCCESS HERO
      ======================================================= */}

      <section className="bg-[#073B4C]">

        <div className="mx-auto max-w-5xl px-4 pb-7 pt-5 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">

            <CheckCircle2
              size={32}
              className="text-[#08744F]"
            />

          </div>

          <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.28em] text-[#D2AD4B]">
            Official Payment Confirmation
          </p>

          <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">
            Donation Successful
          </h1>

          <p className="mx-auto mt-2 max-w-lg text-[9px] leading-5 text-white/65">
            Thank you for supporting Anand Jivan
            Foundation Trust.
          </p>

        </div>

      </section>

      {/* ======================================================
          MAIN
      ======================================================= */}

      <section className="px-3 py-5 sm:px-5 sm:py-8">

        <div className="mx-auto max-w-5xl">

          {/* =================================================
              RECEIPT CARD
          ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

            {/* =================================================
                TRUST HEADER
            ================================================== */}

            <div className="border-b border-gray-200 bg-[#FCFDFC] px-4 py-5 sm:px-6">

              <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D2AD4B] bg-white p-1.5">

                  <img
                    src="/images/ajft-logo.png"
                    alt="Anand Jivan Foundation Trust"
                    className="h-full w-full object-contain"
                  />

                </div>

                <div>

                  <h2 className="font-serif text-base font-bold tracking-wide text-[#073B4C] sm:text-lg">
                    ANAND JIVAN FOUNDATION TRUST
                  </h2>

                  <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#9A7620]">
                    Digital Donation Receipt
                  </p>

                  <p className="mt-1 text-[7px] leading-4 text-gray-500 sm:text-[8px]">
                    Mabbi Belauna, Post - Lalshahpur,
                    Panchayat - Shahbazpur,
                    Darbhanga, Bihar - 846005, India
                  </p>

                  <p className="mt-1 text-[7px] font-semibold text-[#9A7620]">
                    DARPAN ID: BR/2023/0343963
                    {" • "}
                    PAN: AAJTA9323K
                    {" • "}
                    +91 9155751363
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                VERIFIED STATUS
            ================================================== */}

            <div className="border-b border-[#DCEBE4] bg-[#EFF9F4] px-4 py-3 sm:px-6">

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={18}
                    className="text-[#08744F]"
                  />

                  <div>

                    <p className="text-[10px] font-bold text-[#073B4C]">
                      Payment Verified Successfully
                    </p>

                    <p className="text-[7px] text-gray-500">
                      Donation has been successfully recorded.
                    </p>

                  </div>

                </div>

                {/* SMALL SUCCESS BADGE */}

                <span className="rounded-full border border-[#08744F]/20 bg-[#08744F]/10 px-2.5 py-1 text-[6px] font-bold tracking-wider text-[#08744F]">
                  ✓ SUCCESS
                </span>

              </div>

            </div>

            {/* =================================================
                SUMMARY
            ================================================== */}

            <div className="grid border-b border-gray-100 md:grid-cols-3">

              <SummaryBox
                icon={
                  <FileText
                    size={15}
                  />
                }
                title="Receipt Number"
                value={
                  donation.receiptNo ||
                  "—"
                }
              />

              <SummaryBox
                icon={
                  <ShieldCheck
                    size={15}
                  />
                }
                title="Donation Reference"
                value={
                  donation.donationReference ||
                  "—"
                }
                border
              />

              <SummaryBox
                icon={
                  <CreditCard
                    size={15}
                  />
                }
                title="Payment ID"
                value={
                  donation.paymentId ||
                  "—"
                }
                border
              />

            </div>

            {/* =================================================
                DETAILS
            ================================================== */}

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">

              {/* DONOR */}

              <div className="rounded-xl border border-gray-200 bg-[#FBFCFB] p-4">

                <SectionTitle
                  icon={
                    <UserRound
                      size={15}
                    />
                  }
                  title="Donor Details"
                />

                <DetailRow
                  icon={
                    <UserRound
                      size={11}
                    />
                  }
                  label="Full Name"
                  value={
                    donation.donorName ||
                    "—"
                  }
                />

                <DetailRow
                  icon={
                    <Phone
                      size={11}
                    />
                  }
                  label="Mobile"
                  value={
                    donation.mobile ||
                    "—"
                  }
                />

                <DetailRow
                  icon={
                    <Mail
                      size={11}
                    />
                  }
                  label="Email"
                  value={
                    donation.email ||
                    "—"
                  }
                />

                <DetailRow
                  icon={
                    <MapPin
                      size={11}
                    />
                  }
                  label="Address"
                  value={
                    donation.address ||
                    "Not Provided"
                  }
                />

                {donation.requires80G && (
                  <>
                    <DetailRow
                      icon={
                        <ShieldCheck
                          size={11}
                        />
                      }
                      label="PAN"
                      value={
                        donation.pan ||
                        "—"
                      }
                    />

                    <DetailRow
                      icon={
                        <CheckCircle2
                          size={11}
                        />
                      }
                      label="80G"
                      value="Required"
                      green
                    />
                  </>
                )}

              </div>

              {/* PAYMENT */}

              <div className="rounded-xl border border-gray-200 bg-[#FBFCFB] p-4">

                <SectionTitle
                  icon={
                    <CreditCard
                      size={15}
                    />
                  }
                  title="Payment Details"
                />

                <div className="mb-3 rounded-xl border border-[#DCEEE5] bg-[#EDF8F3] p-3">

                  <p className="text-[7px] font-bold uppercase tracking-wider text-gray-400">
                    Donation Amount
                  </p>

                  <div className="mt-1 flex items-center gap-1">

                    <IndianRupee
                      size={20}
                      className="text-[#08744F]"
                    />

                    <span className="text-2xl font-black text-[#08744F]">
                      {formatAmount(
                        donation.amount,
                        donation.currency
                      )}
                    </span>

                  </div>

                </div>

                <DetailRow
                  icon={
                    <CheckCircle2
                      size={11}
                    />
                  }
                  label="Status"
                  value={
                    donation.paymentStatus ||
                    "SUCCESS"
                  }
                  green
                />

                <DetailRow
                  icon={
                    <CreditCard
                      size={11}
                    />
                  }
                  label="Gateway"
                  value="Razorpay"
                />

                <DetailRow
                  icon={
                    <FileText
                      size={11}
                    />
                  }
                  label="Order ID"
                  value={
                    donation.razorpayOrderId ||
                    donation.orderId ||
                    "—"
                  }
                />

                <DetailRow
                  icon={
                    <ShieldCheck
                      size={11}
                    />
                  }
                  label="Payment ID"
                  value={
                    donation.paymentId ||
                    "—"
                  }
                />

                <DetailRow
                  icon={
                    <CalendarDays
                      size={11}
                    />
                  }
                  label="Date"
                  value={
                    formatDate(
                      donation.createdAt
                    )
                  }
                />

              </div>

            </div>

            {/* =================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="mx-4 mb-4 rounded-xl border border-red-200 bg-red-50 p-3 sm:mx-6">

                <p className="text-[8px] font-semibold leading-5 text-red-700">
                  {error}
                </p>

              </div>
            )}

            {/* =================================================
                ACTIONS
            ================================================== */}

            <div className="border-t border-gray-100 bg-[#FAFCFB] px-4 py-4 sm:px-6">

              <div className="grid gap-2 sm:grid-cols-4">

                <button
                  type="button"
                  onClick={
                    downloadReceipt
                  }
                  disabled={
                    downloading
                  }
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#08744F] text-[9px] font-bold text-white hover:bg-[#075D40] disabled:opacity-50"
                >

                  {downloading ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <Download
                      size={14}
                    />
                  )}

                  {downloading
                    ? "Generating..."
                    : "Download Receipt"}

                </button>

                <button
                  type="button"
                  onClick={
                    viewReceipt
                  }
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-[9px] font-bold text-[#073B4C]"
                >

                  <FileText
                    size={14}
                  />

                  View PDF

                </button>

                <Link
                  href={
                    donation.receiptNo
                      ? `/verify?receiptNo=${encodeURIComponent(
                          donation.receiptNo
                        )}`
                      : "/verify"
                  }
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-[9px] font-bold text-[#073B4C]"
                >

                  <ShieldCheck
                    size={14}
                  />

                  Verify Receipt

                </Link>

                <Link
                  href="/"
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-[9px] font-bold text-[#073B4C]"
                >

                  <Home
                    size={14}
                  />

                  Home

                </Link>

              </div>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="flex flex-col items-center gap-1 py-5">

            <div className="flex items-center gap-1.5">

              <Heart
                size={11}
                className="text-[#C39A3A]"
                fill="currentColor"
              />

              <p className="text-[8px] font-semibold text-[#073B4C]">
                Every contribution makes a difference.
              </p>

            </div>

            <p className="text-[7px] text-gray-400">
              Anand Jivan Foundation Trust • Darbhanga, Bihar
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

// ============================================================
// SUMMARY BOX
// ============================================================

function SummaryBox({
  icon,
  title,
  value,
  border = false,
}: {
  icon: React.ReactNode;

  title: string;

  value: string;

  border?: boolean;
}) {
  return (
    <div
      className={`p-4 ${
        border
          ? "border-t border-gray-100 md:border-l md:border-t-0"
          : ""
      }`}
    >

      <div className="flex gap-2.5">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDF5F1] text-[#08744F]">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[7px] font-bold uppercase tracking-wider text-gray-400">
            {title}
          </p>

          <p className="mt-1 break-all font-mono text-[8px] font-bold text-[#073B4C]">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

// ============================================================
// SECTION TITLE
// ============================================================

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;

  title: string;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2 border-b border-gray-200 pb-2.5">

      <span className="text-[#08744F]">
        {icon}
      </span>

      <h3 className="text-[9px] font-bold uppercase tracking-wider text-[#073B4C]">
        {title}
      </h3>

    </div>
  );
}

// ============================================================
// DETAIL ROW
// ============================================================

function DetailRow({
  icon,
  label,
  value,
  green = false,
}: {
  icon: React.ReactNode;

  label: string;

  value: string;

  green?: boolean;
}) {
  return (
    <div className="flex gap-2 border-b border-[#EDF1EF] py-1.5 last:border-0">

      <div className="flex w-4 shrink-0 items-center justify-center text-[#08744F]">
        {icon}
      </div>

      <span className="w-20 shrink-0 text-[7px] font-semibold text-gray-400 sm:w-24">
        {label}
      </span>

      <span
        className={`min-w-0 break-all text-[8px] font-semibold sm:text-[9px] ${
          green
            ? "text-[#08744F]"
            : "text-gray-700"
        }`}
      >
        {value || "—"}
      </span>

    </div>
  );
}