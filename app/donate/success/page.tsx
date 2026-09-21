"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Download,
  Heart,
  Home,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

export default function DonationSuccessPage() {
  const [reference, setReference] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setReference(
      params.get("reference") ||
        params.get("donationReference") ||
        "AJFT-1789960824586-MJ737M"
    );

    setReceiptNo(
      params.get("receiptNo") ||
        params.get("receiptNumber") ||
        ""
    );

    setPaymentId(
      params.get("paymentId") ||
        params.get("payment_id") ||
        ""
    );
  }, []);

  function downloadReceipt() {
    const content = `
ANAND JIVAN FOUNDATION TRUST
DONATION RECEIPT
==============================

Donation Reference:
${reference}

Receipt Number:
${receiptNo || "Not available"}

Payment ID:
${paymentId || "Not available"}

Payment Status:
SUCCESS

Thank you for supporting
Anand Jivan Foundation Trust.

==============================
`;

    const blob = new Blob(
      [content],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `AJFT-Donation-${reference}.txt`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#043C3A] via-[#087F73] to-[#075985]">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-10 top-20 h-60 w-60 rounded-full bg-emerald-300/20 blur-[100px]" />

        <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-amber-300/20 blur-[110px]" />

        <div className="absolute bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[100px]" />

      </div>

      {/* =====================================================
          FLOWERS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[8%] top-[12%] animate-bounce text-3xl">
          🌸
        </div>

        <div className="absolute right-[12%] top-[18%] animate-pulse text-3xl">
          🌼
        </div>

        <div className="absolute left-[18%] top-[55%] animate-pulse text-2xl">
          🌺
        </div>

        <div className="absolute right-[20%] top-[65%] animate-bounce text-2xl">
          🌷
        </div>

        <div className="absolute left-[30%] top-[8%] animate-pulse text-xl">
          ✨
        </div>

        <div className="absolute right-[32%] top-[10%] animate-pulse text-xl">
          ✨
        </div>

      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">

        {/* ===================================================
            CARD 515 x 515
        =================================================== */}

        <div className="relative flex min-h-[515px] w-full max-w-[515px] flex-col rounded-[30px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">

          {/* SUCCESS ICON */}

          <div className="flex justify-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/20 shadow-[0_0_50px_rgba(52,211,153,.25)]">

              <CheckCircle2
                className="h-12 w-12 text-emerald-300"
                strokeWidth={1.8}
              />

            </div>

          </div>

          {/* TITLE */}

          <div className="mt-5 text-center">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-200">

              <ShieldCheck className="h-3.5 w-3.5" />

              Payment Successful

            </div>

            <h1 className="mt-3 text-3xl font-black text-white">
              Thank You! 💚
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Your donation has been successfully
              received by Anand Jivan Foundation Trust.
            </p>

          </div>

          {/* DETAILS */}

          <div className="mt-6 space-y-3">

            {/* REFERENCE */}

            <div className="rounded-2xl border border-amber-300/15 bg-black/10 p-4">

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/45">
                    Donation Reference
                  </p>

                  <p className="mt-1 break-all text-sm font-black text-amber-300">
                    {reference}
                  </p>

                </div>

                <Heart className="h-5 w-5 shrink-0 text-rose-300" />

              </div>

            </div>

            {/* RECEIPT */}

            <div className="rounded-2xl border border-emerald-300/15 bg-black/10 p-4">

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/45">
                    Receipt Number
                  </p>

                  <p className="mt-1 break-all text-sm font-black text-emerald-300">
                    {receiptNo || "Processing..."}
                  </p>

                </div>

                <ReceiptText className="h-5 w-5 shrink-0 text-emerald-300" />

              </div>

            </div>

            {/* PAYMENT */}

            {paymentId && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">

                <p className="text-[9px] uppercase tracking-widest text-white/40">
                  Payment ID
                </p>

                <p className="mt-1 break-all text-[10px] font-semibold text-white/60">
                  {paymentId}
                </p>

              </div>
            )}

          </div>

          {/* BUTTONS */}

          <div className="mt-auto grid grid-cols-3 gap-2 pt-6">

            <Link
              href="/"
              className="flex h-11 items-center justify-center gap-1 rounded-xl border border-white/20 bg-white/10 text-xs font-black text-white transition hover:bg-white/20"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <button
              type="button"
              onClick={downloadReceipt}
              className="flex h-11 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-emerald-300 to-teal-300 text-xs font-black text-[#043C3A] shadow-lg transition hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download
            </button>

            <Link
              href="/donate"
              className="flex h-11 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-xs font-black text-[#043C3A] shadow-lg transition hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4" />
              Donate
            </Link>

          </div>

          <p className="mt-4 text-center text-[10px] text-white/40">
            🌸 Thank you for making a difference 🌸
          </p>

        </div>

      </div>

      {/* =====================================================
          WAVE
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">

        <svg
          viewBox="0 0 1440 180"
          className="h-24 w-full"
          preserveAspectRatio="none"
        >

          <path
            fill="#14B8A6"
            opacity="0.65"
            d="
              M0 90
              C180 150 350 30 540 75
              C730 120 850 155 1050 75
              C1220 15 1340 55 1440 95
              L1440 180
              L0 180
              Z
            "
          />

          <path
            fill="#F0FDFA"
            d="
              M0 130
              C200 170 390 100 590 115
              C800 130 930 170 1120 115
              C1260 75 1360 100 1440 130
              L1440 180
              L0 180
              Z
            "
          />

        </svg>

      </div>

    </main>
  );
}