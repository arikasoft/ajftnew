"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Heart,
  Lock,
  ShieldCheck,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type FormData = {
  name: string;
  mobile: string;
  email: string;
  address: string;
  receipt80G: "yes" | "no";
  pan: string;
};

type CreateOrderResponse = {
  success: boolean;
  message?: string;

  donationId?: string;
  donationReference?: string;

  orderId?: string;
  razorpayOrderId?: string;

  amount?: number;
  amountPaise?: number;
  currency?: string;

  razorpay?: {
    keyId?: string;
    orderId?: string;
    amount?: number;
    currency?: string;
  };
};

function clean(value: unknown): string {
  return String(value ?? "").trim();
}

export default function DonatePage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    receipt80G: "no",
    pan: "",
  });

  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const paymentStarted =
    useRef(false);

  /* =========================================================
     LOAD RAZORPAY
  ========================================================= */

  useEffect(() => {
    const existing =
      document.getElementById(
        "razorpay-checkout-js"
      );

    if (existing) {
      return;
    }

    const script =
      document.createElement("script");

    script.id =
      "razorpay-checkout-js";

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  /* =========================================================
     UPDATE FORM
  ========================================================= */

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* =========================================================
     AMOUNT
  ========================================================= */

  function getDonationAmount() {
    const custom =
      Number(customAmount);

    if (
      customAmount.trim() &&
      Number.isFinite(custom) &&
      custom >= 100
    ) {
      return custom;
    }

    return amount;
  }

  /* =========================================================
     CREATE PAYMENT
  ========================================================= */

  async function startPayment() {
    if (paymentStarted.current) {
      return;
    }

    setError("");

    /* -------------------------------------------------------
       VALIDATION
    ------------------------------------------------------- */

    if (!form.name.trim()) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        form.mobile.trim()
      )
    ) {
      setError(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!form.address.trim()) {
      setError(
        "Please enter your address."
      );
      return;
    }

    if (
      form.receipt80G === "yes" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(
        form.pan.trim()
      )
    ) {
      setError(
        "Please enter a valid PAN number for 80G receipt."
      );
      return;
    }

    const donationAmount =
      getDonationAmount();

    if (
      !Number.isFinite(
        donationAmount
      ) ||
      donationAmount < 100
    ) {
      setError(
        "Minimum donation amount is ₹100."
      );
      return;
    }

    try {
      paymentStarted.current =
        true;

      setLoading(true);

      /* =====================================================
         CREATE ORDER
      ===================================================== */

      const response =
        await fetch(
          "/api/donate/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body: JSON.stringify({
              donorName:
                form.name.trim(),

              mobile:
                form.mobile.trim(),

              email:
                form.email.trim(),

              address:
                form.address.trim(),

              amount:
                donationAmount,

              currency: "INR",

              donationType:
                "one-time",

              donorType:
                "indian",

              donationMode:
                "indian",

              country:
                "India",

              requires80G:
                form.receipt80G ===
                "yes",

              pan:
                form.receipt80G ===
                "yes"
                  ? form.pan
                      .trim()
                      .toUpperCase()
                  : "",

              sourceAction:
                "donate-page",

              action:
                "donate",

              buttonId:
                "donate-submit",

              landingPage:
                window.location.href,
            }),

            cache:
              "no-store",
          }
        );

      /* =====================================================
         SAFE JSON RESPONSE
      ===================================================== */

      const raw =
        await response.text();

      let data:
        CreateOrderResponse;

      try {
        data =
          JSON.parse(raw);
      } catch (jsonError) {
        console.error(
          "CREATE ORDER INVALID JSON:",
          raw
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Unable to create donation order."
        );
      }

      /* =====================================================
         IMPORTANT:
         DONATION ID
      ===================================================== */

      const donationId =
        clean(
          data.donationId
        );

      const donationReference =
        clean(
          data.donationReference
        );

      /* =====================================================
         RAZORPAY ORDER ID
      ===================================================== */

      const razorpayOrderId =
        clean(
          data.razorpayOrderId ||
            data.orderId ||
            data.razorpay?.orderId
        );

      const razorpayKeyId =
        clean(
          data.razorpay?.keyId
        );

      const razorpayAmount =
        Number(
          data.razorpay?.amount ||
            data.amountPaise ||
            0
        );

      /* =====================================================
         REQUIRED CHECK
      ===================================================== */

      if (!donationId) {
        console.error(
          "CREATE ORDER RESPONSE:",
          data
        );

        throw new Error(
          "Donation ID was not returned by the server."
        );
      }

      if (!razorpayOrderId) {
        throw new Error(
          "Razorpay Order ID was not returned."
        );
      }

      if (!razorpayKeyId) {
        throw new Error(
          "Razorpay Key ID was not returned."
        );
      }

      if (!razorpayAmount) {
        throw new Error(
          "Razorpay amount was not returned."
        );
      }

      /* =====================================================
         SAVE DONATION ID
         BEFORE RAZORPAY OPENS
      ===================================================== */

      sessionStorage.setItem(
        "AJFT_DONATION_ID",
        donationId
      );

      sessionStorage.setItem(
        "AJFT_RAZORPAY_ORDER_ID",
        razorpayOrderId
      );

      if (donationReference) {
        sessionStorage.setItem(
          "AJFT_DONATION_REFERENCE",
          donationReference
        );
      }

      console.log(
        "AJFT DONATION CREATED:",
        {
          donationId,
          donationReference,
          razorpayOrderId,
        }
      );

      /* =====================================================
         RAZORPAY READY CHECK
      ===================================================== */

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay checkout is not loaded. Please try again."
        );
      }

      /* =====================================================
         RAZORPAY OPTIONS
      ===================================================== */

      const options = {
        key:
          razorpayKeyId,

        amount:
          razorpayAmount,

        currency:
          data.currency ||
          data.razorpay?.currency ||
          "INR",

        name:
          "Anand Jivan Foundation Trust",

        description:
          "Donation to Anand Jivan Foundation Trust",

        order_id:
          razorpayOrderId,

        prefill: {
          name:
            form.name.trim(),

          email:
            form.email.trim(),

          contact:
            form.mobile.trim(),
        },

        notes: {
          donationId,

          donationReference,
        },

        theme: {
          color:
            "#08744F",
        },

        modal: {
          ondismiss:
            () => {
              paymentStarted.current =
                false;

              setLoading(false);
            },
        },

        /* ===================================================
           PAYMENT SUCCESS
        =================================================== */

        handler:
          async (
            paymentResponse: any
          ) => {
            try {
              setLoading(true);

              console.log(
                "================================"
              );

              console.log(
                "RAZORPAY PAYMENT SUCCESS"
              );

              console.log(
                paymentResponse
              );

              console.log(
                "================================"
              );

              /* ---------------------------------------------
                 ALWAYS GET DONATION ID
              --------------------------------------------- */

              const finalDonationId =
                clean(
                  donationId
                ) ||
                clean(
                  sessionStorage.getItem(
                    "AJFT_DONATION_ID"
                  )
                );

              /* ---------------------------------------------
                 PAYMENT DETAILS
              --------------------------------------------- */

              const paymentId =
                clean(
                  paymentResponse
                    ?.razorpay_payment_id
                );

              const orderId =
                clean(
                  paymentResponse
                    ?.razorpay_order_id
                ) ||
                clean(
                  razorpayOrderId
                );

              const signature =
                clean(
                  paymentResponse
                    ?.razorpay_signature
                );

              console.log(
                "FINAL DONATION ID:",
                finalDonationId
              );

              console.log(
                "PAYMENT ID:",
                paymentId
              );

              console.log(
                "ORDER ID:",
                orderId
              );

              /* ---------------------------------------------
                 REQUIRED
              --------------------------------------------- */

              if (!finalDonationId) {
                throw new Error(
                  "Donation ID is missing after payment."
                );
              }

              if (!paymentId) {
                throw new Error(
                  "Razorpay Payment ID is missing."
                );
              }

              if (!orderId) {
                throw new Error(
                  "Razorpay Order ID is missing."
                );
              }

              if (!signature) {
                throw new Error(
                  "Razorpay Signature is missing."
                );
              }

              /* =================================================
                 VERIFY PAYMENT
              ================================================= */

              const verifyResponse =
                await fetch(
                  "/api/donate/verify",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",

                      Accept:
                        "application/json",
                    },

                    body:
                      JSON.stringify({
                        donationId:
                          finalDonationId,

                        razorpay_payment_id:
                          paymentId,

                        razorpay_order_id:
                          orderId,

                        razorpay_signature:
                          signature,
                      }),

                    cache:
                      "no-store",
                  }
                );

              /* =================================================
                 SAFE VERIFY RESPONSE
              ================================================= */

              const verifyRaw =
                await verifyResponse.text();

              console.log(
                "VERIFY STATUS:",
                verifyResponse.status
              );

              console.log(
                "VERIFY RESPONSE:",
                verifyRaw
              );

              let verifyData:
                any;

              try {
                verifyData =
                  JSON.parse(
                    verifyRaw
                  );
              } catch {
                console.error(
                  "VERIFY INVALID JSON:",
                  verifyRaw
                );

                throw new Error(
                  "Payment verification returned an invalid response."
                );
              }

              /* =================================================
                 VERIFY FAILED
              ================================================= */

              if (
                !verifyResponse.ok ||
                !verifyData?.success
              ) {
                throw new Error(
                  verifyData?.message ||
                    "Payment verification failed."
                );
              }

              /* =================================================
                 GET VERIFIED DONATION ID
              ================================================= */

              const verifiedDonationId =
                clean(
                  verifyData?.donationId
                ) ||
                clean(
                  verifyData?.donation?._id
                ) ||
                finalDonationId;

              if (!verifiedDonationId) {
                throw new Error(
                  "Payment verified but Donation ID was not returned."
                );
              }

              /* =================================================
                 SUCCESS URL
              ================================================= */

              const successUrl =
                new URL(
                  "/donate/success",
                  window.location.origin
                );

              successUrl.searchParams.set(
                "donationId",
                verifiedDonationId
              );

              successUrl.searchParams.set(
                "paymentId",
                paymentId
              );

              successUrl.searchParams.set(
                "orderId",
                orderId
              );

              const verifiedReference =
                clean(
                  verifyData
                    ?.donationReference
                ) ||
                donationReference;

              if (
                verifiedReference
              ) {
                successUrl.searchParams.set(
                  "reference",
                  verifiedReference
                );
              }

              const receiptNo =
                clean(
                  verifyData?.receiptNo
                ) ||
                clean(
                  verifyData
                    ?.donation
                    ?.receiptNo
                );

              if (receiptNo) {
                successUrl.searchParams.set(
                  "receiptNo",
                  receiptNo
                );
              }

              console.log(
                "================================"
              );

              console.log(
                "PAYMENT VERIFIED"
              );

              console.log(
                "REDIRECTING TO:",
                successUrl.toString()
              );

              console.log(
                "================================"
              );

              /* =================================================
                 FINAL REDIRECT
              ================================================= */

              window.location.replace(
                successUrl.toString()
              );
            } catch (error) {
              console.error(
                "PAYMENT VERIFY ERROR:",
                error
              );

              paymentStarted.current =
                false;

              setLoading(false);

              setError(
                error instanceof Error
                  ? error.message
                  : "Payment verification failed."
              );
            }
          },
      };

      /* =====================================================
         OPEN RAZORPAY
      ===================================================== */

      setLoading(false);

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        (response: any) => {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response
          );

          paymentStarted.current =
            false;

          setLoading(false);

          setError(
            response?.error
              ?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "DONATION ERROR:",
        error
      );

      paymentStarted.current =
        false;

      setLoading(false);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to process donation."
      );
    }
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#003B36] via-[#00796B] to-[#00ACC1]">

      {/* =====================================================
          COLORFUL WAVES
      ===================================================== */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0">

        <svg
          viewBox="0 0 1440 320"
          className="h-52 w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.08)"
            d="M0,192L60,181.3C120,171,240,149,360,138.7C480,128,600,128,720,149.3C840,171,960,213,1080,202.7C1200,192,1320,128,1380,96L1440,64L1440,320L0,320Z"
          />

          <path
            fill="rgba(255,193,7,0.10)"
            d="M0,256L80,234.7C160,213,320,171,480,181.3C640,192,800,256,960,250.7C1120,245,1280,171,1360,133.3L1440,96L1440,320L0,320Z"
          />

        </svg>

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_615px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <section className="hidden text-white lg:block">

            <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-xl">

              <Heart
                className="mr-2 h-4 w-4"
              />

              Make a Difference

            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-tight">

              Your Support Can{" "}

              <span className="text-amber-300">
                Change Lives
              </span>

            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">

              Your contribution helps support
              education, healthcare, clean water
              and community-focused initiatives.

            </p>

            <div className="mt-8 space-y-4">

              {[
                "Community-focused initiatives",
                "Transparent donation process",
                "Secure online payment",
                "Donation receipt support",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold"
                  >

                    <ShieldCheck
                      className="h-5 w-5 text-emerald-200"
                    />

                    {item}

                  </div>
                )
              )}

            </div>

          </section>

          {/* =================================================
              DONATION FORM
          ================================================= */}

          <section className="w-full">

            <div className="rounded-[28px] border border-white/25 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">

              {/* HEADER */}

              <div className="mb-5 flex items-center justify-between border-b border-white/20 pb-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">

                    <Heart
                      className="h-6 w-6 text-white"
                    />

                  </div>

                  <div>

                    <h2 className="text-xl font-black text-white">
                      Make a Donation
                    </h2>

                    <p className="text-xs text-white/65">
                      Every contribution matters
                    </p>

                  </div>

                </div>

                <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white">

                  <Lock
                    className="mr-1 inline h-3 w-3"
                  />

                  Secure

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-4 rounded-xl border border-red-300/30 bg-red-500/20 px-4 py-3 text-sm font-semibold text-white">

                  {error}

                </div>
              )}

              {/* FORM */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="text-xs font-bold text-white">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Your full name"
                    className="mt-1.5 h-11 w-full rounded-xl border border-white/20 bg-white/90 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-amber-300"
                  />

                </div>

                {/* MOBILE */}

                <div>

                  <label className="text-xs font-bold text-white">
                    Mobile *
                  </label>

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.mobile}
                    onChange={(e) =>
                      updateField(
                        "mobile",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="10 digit mobile"
                    className="mt-1.5 h-11 w-full rounded-xl border border-white/20 bg-white/90 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-amber-300"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="text-xs font-bold text-white">
                    Email *
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="mt-1.5 h-11 w-full rounded-xl border border-white/20 bg-white/90 px-4 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-amber-300"
                  />

                </div>

                {/* 80G */}

                <div>

                  <label className="text-xs font-bold text-white">
                    80G Receipt *
                  </label>

                  <div className="mt-1.5 grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "receipt80G",
                          "yes"
                        )
                      }
                      className={`h-11 rounded-xl border text-sm font-black transition ${
                        form.receipt80G ===
                        "yes"
                          ? "border-white bg-white text-[#08744F]"
                          : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      YES
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "receipt80G",
                          "no"
                        )
                      }
                      className={`h-11 rounded-xl border text-sm font-black transition ${
                        form.receipt80G ===
                        "no"
                          ? "border-white bg-white text-[#08744F]"
                          : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      NO
                    </button>

                  </div>

                </div>

              </div>

              {/* PAN */}

              {form.receipt80G ===
                "yes" && (
                <div className="mt-4">

                  <label className="text-xs font-bold text-white">
                    PAN *
                  </label>

                  <input
                    type="text"
                    maxLength={10}
                    value={form.pan}
                    onChange={(e) =>
                      updateField(
                        "pan",
                        e.target.value
                          .toUpperCase()
                          .replace(
                            /[^A-Z0-9]/g,
                            ""
                          )
                      )
                    }
                    placeholder="ABCDE1234F"
                    className="mt-1.5 h-11 w-full rounded-xl border border-white/20 bg-white/90 px-4 text-sm font-bold uppercase text-slate-800 outline-none focus:ring-2 focus:ring-amber-300"
                  />

                </div>
              )}

              {/* ADDRESS */}

              <div className="mt-4">

                <label className="text-xs font-bold text-white">
                  Address *
                </label>

                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) =>
                    updateField(
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Complete address"
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/20 bg-white/90 px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-amber-300"
                />

              </div>

              {/* AMOUNT */}

              <div className="mt-4">

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-xs font-bold text-white">
                    Donation Amount *
                  </label>

                  <span className="text-sm font-black text-amber-300">
                    ₹
                    {getDonationAmount().toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="grid grid-cols-4 gap-2">

                  {[500, 1000, 2500, 5000].map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setAmount(value);
                          setCustomAmount(
                            ""
                          );
                        }}
                        className={`h-10 rounded-xl border text-xs font-black transition ${
                          amount ===
                            value &&
                          !customAmount
                            ? "border-white bg-white text-[#08744F]"
                            : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        ₹
                        {value.toLocaleString(
                          "en-IN"
                        )}
                      </button>
                    )
                  )}

                </div>

                <input
                  type="number"
                  min={100}
                  value={customAmount}
                  onChange={(e) =>
                    setCustomAmount(
                      e.target.value
                    )
                  }
                  placeholder="Or enter custom amount"
                  className="mt-2 h-11 w-full rounded-xl border border-white/20 bg-white/90 px-4 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-300"
                />

              </div>

              {/* DONATE BUTTON */}

              <button
                type="button"
                disabled={loading}
                onClick={
                  startPayment
                }
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-sm font-black text-slate-900 shadow-xl transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Processing..."
                  : "Continue to Donate"}

                {!loading && (
                  <ArrowRight
                    className="h-4 w-4"
                  />
                )}

              </button>

              {/* SECURITY */}

              <div className="mt-3 text-center text-[10px] text-white/60">

                <ShieldCheck
                  className="mr-1 inline h-3 w-3"
                />

                Secure donation • Your information is protected

              </div>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}