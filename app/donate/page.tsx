"use client";

import { FormEvent, useState } from "react";

import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  Globe2,
  Heart,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Repeat2,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

/* =========================================================
   RAZORPAY TYPES
========================================================= */

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  notes?: Record<string, string>;

  theme?: {
    color?: string;
  };

  modal?: {
    ondismiss?: () => void;
  };

  handler: (
    response: RazorpayPaymentResponse
  ) => void;
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

/* =========================================================
   TYPES
========================================================= */

type DonationType =
  | "one-time"
  | "monthly";

type DonationMode =
  | "indian"
  | "nri";

interface CreateOrderResponse {
  success?: boolean;
  message?: string;

  donationId?: string;
  donationReference?: string;

  orderId?: string;
  razorpayOrderId?: string;

  amount?: number;
  amountPaise?: number;

  currency?: string;
  paymentStatus?: string;

  donorName?: string;
  email?: string;
  mobile?: string;

  razorpay?: {
    keyId?: string;
    orderId?: string;
    amount?: number;
    currency?: string;
  };
}

interface VerifyPaymentResponse {
  success?: boolean;
  message?: string;

  donation?: {
    _id?: string;
    donationReference?: string;
    receiptNo?: string;
  };
}

/* =========================================================
   CONSTANTS
========================================================= */

const primaryColor = "#0f766e";

const donationAmounts = [
  500,
  1000,
  2500,
  5000,
  10000,
  25000,
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "France",
  "Other",
];

/* =========================================================
   HELPERS
========================================================= */

function clean(value: unknown): string {
  const result = String(value ?? "").trim();

  if (
    !result ||
    result === "undefined" ||
    result === "null"
  ) {
    return "";
  }

  return result;
}

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
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    ).format(Number(amount || 0));
  } catch {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  }
}

/* =========================================================
   RAZORPAY LOADER
========================================================= */

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      window.Razorpay
    ) {
      resolve(true);
      return;
    }

    const existing =
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

    if (existing) {
      existing.addEventListener(
        "load",
        () => resolve(true),
        { once: true }
      );

      existing.addEventListener(
        "error",
        () => resolve(false),
        { once: true }
      );

      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () =>
      resolve(true);

    script.onerror = () =>
      resolve(false);

    document.body.appendChild(script);
  });
}

/* =========================================================
   PAGE
========================================================= */

export default function DonatePage() {
  /* =======================================================
     STATES
  ======================================================= */

  const [donationType, setDonationType] =
    useState<DonationType>("one-time");

  const [donationMode, setDonationMode] =
    useState<DonationMode>("indian");

  const [amount, setAmount] =
    useState("");

  const [customAmount, setCustomAmount] =
    useState("");

  const [donorName, setDonorName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [requires80G, setRequires80G] =
    useState(true);

  const [pan, setPan] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =======================================================
     DERIVED VALUES
  ======================================================= */

  const isNRI =
    donationMode === "nri";

  const isMonthly =
    donationType === "monthly";

  const selectedAmount =
    Number(customAmount || amount || 0);

  const currency =
    isNRI ? "INR" : "INR";

  /* =======================================================
     SELECT AMOUNT
  ======================================================= */

  function selectAmount(
    value: number
  ) {
    setAmount(String(value));

    setCustomAmount("");

    setError("");
  }

  /* =======================================================
     VERIFY PAYMENT
  ======================================================= */

  async function verifyPayment(
    paymentResponse: RazorpayPaymentResponse,
    donationId: string
  ) {
    setMessage(
      "Payment received. Verifying your donation..."
    );

    const response =
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

          body: JSON.stringify({
            donationId,

            razorpay_order_id:
              paymentResponse.razorpay_order_id,

            razorpay_payment_id:
              paymentResponse.razorpay_payment_id,

            razorpay_signature:
              paymentResponse.razorpay_signature,
          }),

          cache: "no-store",
        }
      );

    const raw =
      await response.text();

    if (!raw.trim()) {
      throw new Error(
        "Payment verification server returned an empty response."
      );
    }

    let data:
      VerifyPaymentResponse;

    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(
        "Payment verification returned invalid JSON."
      );
    }

    if (
      !response.ok ||
      !data?.success
    ) {
      throw new Error(
        data?.message ||
          "Payment verification failed."
      );
    }

    const receiptNo =
      clean(
        data?.donation?.receiptNo
      );

    const reference =
      clean(
        data?.donation
          ?.donationReference
      );

    const params =
      new URLSearchParams();

    params.set(
      "donationId",
      donationId
    );

    if (receiptNo) {
      params.set(
        "receiptNo",
        receiptNo
      );
    }

    if (reference) {
      params.set(
        "reference",
        reference
      );
    }

    params.set(
      "paymentId",
      paymentResponse.razorpay_payment_id
    );

    window.location.href =
      `/donate/success?${params.toString()}`;
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setMessage("");

    /* =====================================================
       CLEAN VALUES
    ===================================================== */

    const finalName =
      donorName.trim();

    const finalMobile =
      mobile.replace(
        /\D/g,
        ""
      );

    const finalEmail =
      email.trim().toLowerCase();

    const finalAddress =
      address.trim();

    const finalCountry =
      country.trim();

    const finalPan =
      pan.trim().toUpperCase();

    const finalAmount =
      Number(
        customAmount ||
          amount ||
          0
      );

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!finalName) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (
      !/^[6-9]\d{9}$/.test(
        finalMobile
      )
    ) {
      setError(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        finalEmail
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!finalAddress) {
      setError(
        "Please enter your complete address."
      );
      return;
    }

    if (
      !Number.isFinite(
        finalAmount
      ) ||
      finalAmount <= 0
    ) {
      setError(
        "Please select or enter a valid donation amount."
      );
      return;
    }

    if (
      finalAmount < 100
    ) {
      setError(
        "Minimum donation amount is ₹100."
      );
      return;
    }

    if (
      isNRI &&
      !finalCountry
    ) {
      setError(
        "Please select your country."
      );
      return;
    }

    if (
      !isNRI &&
      requires80G &&
      finalPan &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        finalPan
      )
    ) {
      setError(
        "Please enter a valid PAN number."
      );
      return;
    }

    /* =====================================================
       MONTHLY DONATION
    ===================================================== */

    if (isMonthly) {
      setError(
        "Monthly recurring donation requires Razorpay Subscription API configuration in the backend."
      );
      return;
    }

    /* =====================================================
       PAYMENT
    ===================================================== */

    try {
      setLoading(true);

      setMessage(
        "Preparing your secure payment..."
      );

      const razorpayLoaded =
        await loadRazorpay();

      if (
        !razorpayLoaded ||
        !window.Razorpay
      ) {
        throw new Error(
          "Unable to load Razorpay payment gateway."
        );
      }

      /* ===================================================
         CREATE ORDER
      =================================================== */

      setMessage(
        "Creating secure payment order..."
      );

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
                finalName,

              mobile:
                finalMobile,

              email:
                finalEmail,

              address:
                finalAddress,

              amount:
                finalAmount,

              currency,

              donationType,

              donationMode,

              isNRI,

              country:
                finalCountry,

              requires80G:
                isNRI
                  ? false
                  : requires80G,

              pan:
                isNRI
                  ? ""
                  : finalPan,
            }),

            cache: "no-store",
          }
        );

      const raw =
        await response.text();

      if (!raw.trim()) {
        throw new Error(
          "Create-order server returned an empty response."
        );
      }

      let data:
        CreateOrderResponse;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          "Create-order server returned invalid JSON."
        );
      }

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Unable to create payment order."
        );
      }

      /* ===================================================
         ORDER VALUES
      =================================================== */

      const createdDonationId =
        clean(
          data?.donationId
        );

      const razorpayOrderId =
        clean(
          data?.razorpayOrderId ||
            data?.orderId ||
            data?.razorpay
              ?.orderId
        );

      const razorpayKey =
        clean(
          data?.razorpay
            ?.keyId
        );

      const amountPaise =
        Number(
          data?.amountPaise ||
            data?.razorpay
              ?.amount ||
            Math.round(
              finalAmount * 100
            )
        );

      const razorpayCurrency =
        clean(
          data?.currency ||
            data?.razorpay
              ?.currency
        ) || currency;

      if (
        !createdDonationId
      ) {
        throw new Error(
          "Donation ID was not returned by create-order."
        );
      }

      if (
        !razorpayOrderId
      ) {
        throw new Error(
          "Razorpay order ID was not returned."
        );
      }

      if (
        !razorpayKey
      ) {
        throw new Error(
          "Razorpay key was not returned by server."
        );
      }

      /* ===================================================
         RAZORPAY OPTIONS
      =================================================== */

      const options:
        RazorpayOptions = {
        key:
          razorpayKey,

        amount:
          amountPaise,

        currency:
          razorpayCurrency,

        name:
          "Anand Jivan Foundation Trust",

        description:
          isNRI
            ? "International Donation"
            : "Donation to Anand Jivan Foundation Trust",

        order_id:
          razorpayOrderId,

        prefill: {
          name:
            finalName,

          email:
            finalEmail,

          contact:
            finalMobile,
        },

        notes: {
          donationId:
            createdDonationId,

          donationType,

          donationMode,

          isNRI:
            String(isNRI),

          country:
            finalCountry,
        },

        theme: {
          color:
            primaryColor,
        },

        modal: {
          ondismiss: () => {
            setLoading(false);

            setMessage("");
          },
        },

        handler:
          async (
            paymentResponse
          ) => {
            try {
              await verifyPayment(
                paymentResponse,
                createdDonationId
              );
            } catch (paymentError) {
              setLoading(false);

              setMessage("");

              setError(
                paymentError instanceof Error
                  ? paymentError.message
                  : "Payment verification failed."
              );
            }
          },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      setMessage("");

      razorpay.open();
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to start secure payment."
      );

      setMessage("");

      setLoading(false);
    }
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">

      {/* ===================================================
         HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-700">

        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />

          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          <div className="mx-auto max-w-3xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur">
              <Heart size={15} />
              Make a Difference Today
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Your Contribution Can
              <span className="block text-emerald-200">
                Change a Life
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-teal-50 sm:text-base">
              Support education, healthcare,
              community development and social
              welfare initiatives through Anand
              Jivan Foundation Trust.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <ShieldCheck size={16} />
                Secure Payment
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <BadgeCheck size={16} />
                Transparent Process
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <CreditCard size={16} />
                Razorpay Protected
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
         MAIN CONTENT
      =================================================== */}

      <section className="relative mx-auto -mt-5 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1.65fr_0.85fr]">

          {/* ===============================================
             DONATION FORM
          =============================================== */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

            {/* HEADER */}

            <div className="border-b border-slate-100 bg-gradient-to-r from-white to-teal-50 px-5 py-5 sm:px-7">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/20">
                  <Heart size={23} />
                </div>

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                    Donation Form
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                    Make Your Contribution
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Complete the details below to
                    proceed with secure payment.
                  </p>

                </div>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8 p-5 sm:p-7"
            >

              {/* ===========================================
                 DONATION TYPE
              =========================================== */}

              <section>

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Repeat2 size={16} />
                  </div>

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      Donation Frequency
                    </h3>

                    <p className="text-xs text-slate-500">
                      Choose how you would like to contribute.
                    </p>

                  </div>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      setDonationType(
                        "one-time"
                      )
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      donationType ===
                      "one-time"
                        ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                        : "border-slate-200 bg-white hover:border-teal-300"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <WalletCards
                        size={21}
                        className={
                          donationType ===
                          "one-time"
                            ? "text-teal-700"
                            : "text-slate-400"
                        }
                      />

                      {donationType ===
                        "one-time" && (
                        <CheckCircle2
                          size={19}
                          className="text-teal-600"
                        />
                      )}

                    </div>

                    <p className="mt-4 text-sm font-black text-slate-900">
                      One-time Donation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Make a single contribution
                      whenever you choose.
                    </p>

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDonationType(
                        "monthly"
                      )
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      donationType ===
                      "monthly"
                        ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                        : "border-slate-200 bg-white hover:border-teal-300"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <Repeat2
                        size={21}
                        className={
                          donationType ===
                          "monthly"
                            ? "text-teal-700"
                            : "text-slate-400"
                        }
                      />

                      {donationType ===
                        "monthly" && (
                        <CheckCircle2
                          size={19}
                          className="text-teal-600"
                        />
                      )}

                    </div>

                    <p className="mt-4 text-sm font-black text-slate-900">
                      Monthly Support
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Support regularly every
                      month.
                    </p>

                  </button>

                </div>

              </section>

              {/* ===========================================
                 DONATION MODE
              =========================================== */}

              <section>

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Globe2 size={16} />
                  </div>

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      Donor Type
                    </h3>

                    <p className="text-xs text-slate-500">
                      Select your donation category.
                    </p>

                  </div>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      setDonationMode(
                        "indian"
                      )
                    }
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      donationMode ===
                      "indian"
                        ? "border-emerald-600 bg-emerald-50 ring-4 ring-emerald-600/10"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                        <IndianRupee size={20} />
                      </div>

                      <div>

                        <p className="text-sm font-black text-slate-900">
                          Indian Donor
                        </p>

                        <p className="text-xs text-slate-500">
                          Domestic donation
                        </p>

                      </div>

                    </div>

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDonationMode(
                        "nri"
                      )
                    }
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      donationMode ===
                      "nri"
                        ? "border-emerald-600 bg-emerald-50 ring-4 ring-emerald-600/10"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                        <Globe2 size={20} />
                      </div>

                      <div>

                        <p className="text-sm font-black text-slate-900">
                          NRI / International
                        </p>

                        <p className="text-xs text-slate-500">
                          Overseas contribution
                        </p>

                      </div>

                    </div>

                  </button>

                </div>

              </section>

              {/* ===========================================
                 AMOUNT
              =========================================== */}

              <section>

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <IndianRupee size={16} />
                  </div>

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      Select Donation Amount
                    </h3>

                    <p className="text-xs text-slate-500">
                      Every contribution makes an
                      impact.
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {donationAmounts.map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          selectAmount(
                            value
                          )
                        }
                        className={`rounded-xl border px-3 py-3 text-sm font-black transition ${
                          Number(amount) ===
                            value &&
                          !customAmount
                            ? "border-teal-600 bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                            : "border-slate-200 bg-white text-slate-700 hover:border-teal-400 hover:bg-teal-50"
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

                <div className="relative mt-4">

                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="100"
                    value={customAmount}
                    onChange={(event) => {
                      setCustomAmount(
                        event.target.value
                      );

                      setAmount("");
                    }}
                    placeholder="Enter custom amount"
                    className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  />

                </div>

                {selectedAmount > 0 && (
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-teal-950 px-4 py-3 text-white">

                    <span className="text-xs font-semibold text-teal-100">
                      Your Contribution
                    </span>

                    <span className="text-lg font-black">
                      {formatAmount(
                        selectedAmount,
                        currency
                      )}
                    </span>

                  </div>
                )}

              </section>

              {/* ===========================================
                 DONOR INFORMATION
              =========================================== */}

              <section>

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <UserRound size={16} />
                  </div>

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      Your Information
                    </h3>

                    <p className="text-xs text-slate-500">
                      Details are used for donation
                      records and communication.
                    </p>

                  </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Full Name
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        required
                        value={donorName}
                        onChange={(event) =>
                          setDonorName(
                            event.target.value
                          )
                        }
                        placeholder="Enter your full name"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Mobile Number
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        required
                        inputMode="numeric"
                        maxLength={10}
                        value={mobile}
                        onChange={(event) =>
                          setMobile(
                            event.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="9876543210"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Email Address
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(
                            event.target.value
                          )
                        }
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Complete Address
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <MapPin
                        size={18}
                        className="absolute left-4 top-4 text-slate-400"
                      />

                      <textarea
                        required
                        rows={3}
                        value={address}
                        onChange={(event) =>
                          setAddress(
                            event.target.value
                          )
                        }
                        placeholder="Enter your complete address"
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                </div>

              </section>

              {/* ===========================================
                 NRI
              =========================================== */}

              {isNRI && (
                <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Globe2 size={19} />
                    </div>

                    <div className="flex-1">

                      <h3 className="text-sm font-black text-blue-950">
                        International Donor Details
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Please select your current
                        country of residence.
                      </p>

                      <select
                        required={isNRI}
                        value={country}
                        onChange={(event) =>
                          setCountry(
                            event.target.value
                          )
                        }
                        className="mt-4 h-12 w-full rounded-xl border border-blue-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      >

                        <option value="">
                          Select Country
                        </option>

                        {countries.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                  </div>

                </section>
              )}

              {/* ===========================================
                 80G
              =========================================== */}

              {!isNRI && (
                <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <BadgeCheck size={19} />
                    </div>

                    <div className="flex-1">

                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                        <div>

                          <h3 className="text-sm font-black text-emerald-950">
                            80G Tax Benefit
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-emerald-700">
                            Enable this option if you
                            require your donation details
                            for applicable tax benefits.
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setRequires80G(
                              !requires80G
                            )
                          }
                          className={`relative h-7 w-12 rounded-full transition ${
                            requires80G
                              ? "bg-emerald-600"
                              : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                              requires80G
                                ? "left-6"
                                : "left-1"
                            }`}
                          />
                        </button>

                      </div>

                      {requires80G && (
                        <div className="mt-4">

                          <label className="mb-2 block text-xs font-bold text-emerald-800">
                            PAN Number
                          </label>

                          <input
                            value={pan}
                            maxLength={10}
                            onChange={(event) =>
                              setPan(
                                event.target.value
                                  .toUpperCase()
                                  .replace(
                                    /[^A-Z0-9]/g,
                                    ""
                                  )
                              )
                            }
                            placeholder="ABCDE1234F"
                            className="h-12 w-full rounded-xl border border-emerald-200 bg-white px-4 text-sm font-semibold uppercase outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                          />

                        </div>
                      )}

                    </div>

                  </div>

                </section>
              )}

              {/* ===========================================
                 ALERTS
              =========================================== */}

              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4">

                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <p className="text-sm font-semibold text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {message && (
                <div className="flex items-start gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-4">

                  <Loader2
                    size={19}
                    className="mt-0.5 shrink-0 animate-spin text-teal-700"
                  />

                  <p className="text-sm font-semibold text-teal-800">
                    {message}
                  </p>

                </div>
              )}

              {/* ===========================================
                 SUBMIT
              =========================================== */}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 px-6 text-sm font-black text-white shadow-xl shadow-teal-700/20 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Processing Secure Payment...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />

                    Donate{" "}

                    {selectedAmount > 0
                      ? formatAmount(
                          selectedAmount,
                          currency
                        )
                      : "Securely"}

                    <ArrowRight
                      size={19}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

              <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">

                <ShieldCheck
                  size={15}
                  className="text-teal-600"
                />

                Your payment is processed through
                a secure Razorpay checkout.

              </div>

            </form>

          </div>

          {/* ===============================================
             RIGHT SIDE
          =============================================== */}

          <aside className="space-y-5">

            {/* IMPACT */}

            <div className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                <Heart size={23} />
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Your Impact
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Small Acts.
                <br />
                Meaningful Change.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Your support helps strengthen
                programs focused on education,
                healthcare, social welfare and
                community development.
              </p>

              <div className="mt-6 space-y-3">

                {[
                  "Education & learning support",
                  "Healthcare assistance",
                  "Community development",
                  "Social support initiatives",
                ].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3"
                    >

                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-emerald-400"
                      />

                      <span className="text-xs font-semibold text-slate-200">
                        {item}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* SECURE */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <ShieldCheck size={21} />
                </div>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    Safe & Secure Donation
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Protected payment experience
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-4">

                <div className="flex gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>

                    <p className="text-xs font-black text-slate-800">
                      Secure Checkout
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Payments are initiated
                      through Razorpay checkout.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>

                    <p className="text-xs font-black text-slate-800">
                      Digital Records
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Donation details are securely
                      processed for verification and
                      receipts.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>

                    <p className="text-xs font-black text-slate-800">
                      Transparent Process
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your contribution is recorded
                      against the generated donation
                      reference.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* SUMMARY */}

            <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6">

              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                Donation Summary
              </p>

              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between border-b border-teal-100 pb-3">

                  <span className="text-xs text-slate-500">
                    Frequency
                  </span>

                  <span className="text-xs font-black text-slate-800">
                    {donationType ===
                    "monthly"
                      ? "Monthly"
                      : "One-time"}
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-teal-100 pb-3">

                  <span className="text-xs text-slate-500">
                    Donor Type
                  </span>

                  <span className="text-xs font-black text-slate-800">
                    {isNRI
                      ? "International"
                      : "Indian"}
                  </span>

                </div>

                <div className="flex items-end justify-between">

                  <span className="text-xs font-bold text-slate-500">
                    Amount
                  </span>

                  <span className="text-xl font-black text-teal-800">
                    {selectedAmount > 0
                      ? formatAmount(
                          selectedAmount,
                          currency
                        )
                      : "—"}
                  </span>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}