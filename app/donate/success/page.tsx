
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
  Sparkles,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

export default function DonationSuccessPage() {
  const [reference, setReference] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [donationId, setDonationId] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);

    setReference(p.get("reference") || p.get("donationReference") || "");
    setReceiptNo(p.get("receiptNo") || p.get("receiptNumber") || "");
    setPaymentId(p.get("paymentId") || p.get("payment_id") || "");
    setDonationId(p.get("donationId") || "");
  }, []);

  async function copyReceipt() {
    if (!receiptNo) return;

    try {
      await navigator.clipboard.writeText(receiptNo);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Receipt Number copy नहीं हो पाया।");
    }
  }

  async function downloadReceipt() {
    if (!donationId) {
      alert("Donation ID नहीं मिला।");
      return;
    }

    try {
      setDownloading(true);

      const res = await fetch(
        `/api/donate/receipt?donationId=${encodeURIComponent(donationId)}`,
        { headers: { Accept: "application/pdf" } }
      );

      if (!res.ok) throw new Error("Receipt download नहीं हो पाया।");

      const type = res.headers.get("content-type") || "";
      if (!type.includes("application/pdf")) {
        throw new Error("Valid PDF receipt नहीं मिली।");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `AJFT-Donation-${receiptNo || reference || donationId}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Download failed");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#20082F] px-4 py-8 sm:px-8">

      {/* DIWALI LANDSCAPE BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-orange-500/25 blur-[120px]" />
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" />

        {Array.from({ length: 70 }).map((_, i) => (
          <span
            key={i}
            className="absolute animate-pulse rounded-full bg-yellow-200 shadow-[0_0_10px_2px_rgba(253,224,71,.7)]"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 100}%`,
              width: i % 4 === 0 ? "4px" : "2px",
              height: i % 4 === 0 ? "4px" : "2px",
              animationDelay: `${(i % 8) * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* DIWALI DECORATIONS */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[3%] top-[7%] animate-pulse text-5xl drop-shadow-[0_0_20px_rgba(251,191,36,.9)] sm:text-6xl">
          🪔
        </div>

        <div className="absolute right-[3%] top-[7%] animate-pulse text-5xl drop-shadow-[0_0_20px_rgba(251,191,36,.9)] sm:text-6xl">
          🪔
        </div>

        <div className="absolute left-[12%] bottom-[10%] text-4xl">
          🪷
        </div>

        <div className="absolute right-[12%] bottom-[10%] text-4xl">
          🪷
        </div>

        <div className="absolute left-[25%] top-[12%] animate-pulse text-2xl">
          ✨
        </div>

        <div className="absolute right-[25%] top-[12%] animate-pulse text-2xl">
          ✨
        </div>

        <div className="absolute left-[5%] top-1/2 text-2xl">🌟</div>
        <div className="absolute right-[5%] top-1/2 text-2xl">🌟</div>
      </div>

      {/* LANDSCAPE CONTENT */}

      <div className="relative z-10 w-full max-w-[1050px]">

        {/* FESTIVAL TOP HEADER */}

        <div className="mb-5 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">🪔</span>

          <div className="text-center">
            <h2 className="text-xl font-black uppercase tracking-[0.3em] text-yellow-200 sm:text-2xl">
              Happy Diwali
            </h2>
            <p className="mt-1 text-[9px] font-bold tracking-[0.4em] text-orange-200/70">
              THE FESTIVAL OF LIGHTS • CELEBRATION OF HOPE
            </p>
          </div>

          <span className="text-3xl sm:text-4xl">🪔</span>
        </div>

        {/* MAIN LANDSCAPE CARD */}

        <div className="relative overflow-hidden rounded-[30px] border border-yellow-300/40 bg-gradient-to-br from-[#52154E]/95 via-[#481443]/95 to-[#281039]/95 p-5 shadow-[0_0_70px_rgba(245,158,11,.18)] backdrop-blur-xl sm:p-8">

          {/* GOLD BORDER */}

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

          {/* CARD DECORATIONS */}

          <div className="pointer-events-none absolute right-5 top-4 text-2xl opacity-50">
            🌸
          </div>

          <div className="pointer-events-none absolute bottom-3 left-5 text-2xl opacity-50">
            🌺
          </div>

          {/* TWO COLUMN LAYOUT */}

          <div className="grid items-center gap-7 md:grid-cols-[0.9fr_1.1fr] md:gap-10">

            {/* LEFT SIDE */}

            <div className="text-center md:border-r md:border-yellow-200/20 md:pr-8">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-yellow-300/50 bg-gradient-to-br from-yellow-300/25 to-orange-500/15 shadow-[0_0_45px_rgba(251,191,36,.3)]">
                <CheckCircle2 className="h-16 w-16 text-yellow-200" />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                Payment Successful
              </div>

              <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
                Thank You!
                <span className="ml-2 text-yellow-300">💛</span>
              </h1>

              <p className="mt-3 text-sm font-semibold text-yellow-200">
                आपकी उदारता ही हमारी रोशनी है।
              </p>

              <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-white/70">
                Your donation has been successfully received by
                Anand Jivan Foundation Trust.
              </p>

              <div className="mt-6 rounded-2xl border border-yellow-300/25 bg-gradient-to-r from-orange-400/15 via-yellow-300/10 to-orange-400/15 p-3">
                <p className="text-2xl">🪔 🌸 ✨ 🌸 🪔</p>
                <p className="mt-2 text-[10px] font-bold text-yellow-100">
                  Spreading Light • Sharing Happiness
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div>

              <div className="mb-4 text-center md:text-left">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-200">
                  Donation Confirmation
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  Your contribution details
                </p>
              </div>

              {/* REFERENCE */}

              <div className="rounded-2xl border border-yellow-300/25 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/45">
                      Donation Reference
                    </p>
                    <p className="mt-2 break-all text-sm font-black text-yellow-300">
                      {reference || "Not available"}
                    </p>
                  </div>
                  <Heart className="h-6 w-6 shrink-0 text-rose-300" />
                </div>
              </div>

              {/* RECEIPT NUMBER WITH COPY */}

              <div className="mt-3 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">
                      Receipt Number
                    </p>

                    <p className="mt-2 break-all text-sm font-black text-emerald-300">
                      {receiptNo || "Processing..."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={copyReceipt}
                    disabled={!receiptNo}
                    className="flex shrink-0 items-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-[10px] font-bold text-emerald-200 transition hover:bg-emerald-300/20 disabled:opacity-40"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PAYMENT ID */}

              {paymentId && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/15 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                    Payment ID
                  </p>
                  <p className="mt-2 break-all text-xs font-semibold text-white/65">
                    {paymentId}
                  </p>
                </div>
              )}

              {/* ACTION BUTTONS */}

              <div className="mt-5 grid grid-cols-3 gap-2">

                <Link
                  href="/"
                  className="flex h-12 items-center justify-center gap-1 rounded-xl border border-yellow-200/30 bg-white/10 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>

                <button
                  type="button"
                  onClick={downloadReceipt}
                  disabled={downloading || !donationId}
                  className="flex h-12 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-400 text-xs font-black text-[#45105C] transition hover:brightness-110 disabled:opacity-50"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {downloading ? "Wait..." : "Receipt"}
                </button>

                <Link
                  href="/donate"
                  className="flex h-12 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-rose-400 to-orange-400 text-xs font-bold text-white transition hover:brightness-110"
                >
                  <Heart className="h-4 w-4" />
                  Donate
                </Link>

              </div>

              <div className="mt-4 text-center">
                <a
                  href="https://ajftrust.org/verify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-yellow-200 underline decoration-yellow-200/40 underline-offset-4 hover:text-white"
                >
                  Verify Donation Receipt
                </a>
              </div>

            </div>
          </div>

          {/* BOTTOM FOOTER */}

          <div className="mt-7 border-t border-yellow-200/20 pt-4 text-center">
            <p className="text-xs font-black text-yellow-200">
              Anand Jivan Foundation Trust
            </p>
            <p className="mt-1 text-[9px] tracking-widest text-white/45">
              SERVING HUMANITY • SPREADING HAPPINESS
            </p>
          </div>
        </div>

        {/* OUTSIDE DIWALI FOOTER */}

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-yellow-200/80">
          <span>✨</span>
          <span>May this Diwali bring light, peace and prosperity to every home.</span>
          <span>✨</span>
        </div>

      </div>
    </main>
  );
}
