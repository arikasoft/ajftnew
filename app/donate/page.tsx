"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  CheckCircle2,
  Globe2,
  Heart,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Repeat2,
  WalletCards,
  ArrowRight,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

// ============================================================
// RAZORPAY TYPES
// ============================================================

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

// ============================================================
// TYPES
// ============================================================

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

// ============================================================
// HELPERS
// ============================================================

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

function formatAmount(amount: number) {
  return Number(amount || 0).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
}

// ============================================================
// RAZORPAY LOADER
// ============================================================

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
        () => resolve(true)
      );

      existing.addEventListener(
        "error",
        () => resolve(false)
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

// ============================================================
// PAGE
// ============================================================

export default function DonatePage() {
  // ==========================================================
  // MODE
  // ==========================================================

  const [donationType, setDonationType] =
    useState<DonationType>("one-time");

  const [donationMode, setDonationMode] =
    useState<DonationMode>("indian");

  // ==========================================================
  // FORM
  // ==========================================================

  const [donorName, setDonorName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [country, setCountry] =
    useState("United States");

  const [currency, setCurrency] =
    useState("USD");

  const [amount, setAmount] =
    useState("500");

  const [requires80G, setRequires80G] =
    useState(false);

  const [pan, setPan] =
    useState("");

  // ==========================================================
  // STATE
  // ==========================================================

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // ==========================================================
  // THEME
  // ==========================================================

  const isMonthly =
    donationType === "monthly";

  const isNRI =
    donationMode === "nri";

  const primaryColor =
    isNRI
      ? "#B7791F"
      : isMonthly
      ? "#6D28D9"
      : "#08744F";

  const primaryDark =
    isNRI
      ? "#8E5D16"
      : isMonthly
      ? "#55209B"
      : "#075D40";

  const heroColor =
    isNRI
      ? "#432A0D"
      : isMonthly
      ? "#25103F"
      : "#073B4C";

  const softBg =
    isNRI
      ? "#FFF9ED"
      : isMonthly
      ? "#F7F3FF"
      : "#EFF9F4";

  const softBorder =
    isNRI
      ? "#EFD79A"
      : isMonthly
      ? "#DDD0F8"
      : "#D5EADF";

  // ==========================================================
  // QUICK AMOUNTS
  // ==========================================================

  const oneTimeAmounts = [
    "500",
    "1000",
    "2500",
    "5000",
  ];

  const monthlyAmounts = [
    "500",
    "1000",
    "2500",
    "5000",
  ];

  const nriAmounts = [
    "25",
    "50",
    "100",
    "250",
  ];

  const quickAmounts =
    isNRI
      ? nriAmounts
      : isMonthly
      ? monthlyAmounts
      : oneTimeAmounts;

  // ==========================================================
  // SELECT ONE-TIME
  // ==========================================================

  function selectOneTime() {
    setDonationType("one-time");
    setDonationMode("indian");
    setCurrency("INR");
    setAmount("500");
    setRequires80G(false);
    setPan("");
    setError("");
    setMessage("");
  }

  // ==========================================================
  // SELECT MONTHLY
  // ==========================================================

  function selectMonthly() {
    setDonationType("monthly");
    setDonationMode("indian");
    setCurrency("INR");
    setAmount("500");
    setRequires80G(false);
    setPan("");
    setError("");
    setMessage("");
  }

  // ==========================================================
  // SELECT NRI
  // ==========================================================

  function selectNRI() {
    setDonationMode("nri");
    setDonationType("one-time");
    setCurrency("USD");
    setAmount("25");
    setRequires80G(false);
    setPan("");
    setError("");
    setMessage("");
  }

  // ==========================================================
  // CREATE PAYMENT
  // ==========================================================

  async function createOrder(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    const finalName =
      clean(donorName);

    const finalMobile =
      clean(mobile);

    const finalEmail =
      clean(email).toLowerCase();

    const finalAddress =
      clean(address);

    const finalCountry =
      clean(country);

    const finalPan =
      clean(pan).toUpperCase();

    const finalAmount =
      Number(amount);

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!finalName) {
      setError(
        "Please enter donor name."
      );
      return;
    }

    if (!finalEmail) {
      setError(
        "Please enter email address."
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

    if (!finalMobile) {
      setError(
        "Please enter mobile number."
      );
      return;
    }

    if (
      !/^\d{10,15}$/.test(
        finalMobile
      )
    ) {
      setError(
        "Please enter a valid mobile number."
      );
      return;
    }

    if (
      !Number.isFinite(finalAmount) ||
      finalAmount <= 0
    ) {
      setError(
        "Please enter a valid donation amount."
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

    // ========================================================
    // MONTHLY
    // ========================================================

    if (isMonthly) {
      setError(
        "Monthly recurring donation requires Razorpay Subscription API configuration in the backend."
      );
      return;
    }

    try {
      setLoading(true);

      setMessage(
        "Creating secure payment..."
      );

      // ======================================================
      // LOAD RAZORPAY
      // ======================================================

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

      // ======================================================
      // CREATE ORDER
      // ======================================================

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

              currency:
                isNRI
                  ? currency
                  : "INR",

              donationType:
                donationType,

              donationMode:
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

      console.log(
        "CREATE ORDER STATUS:",
        response.status
      );

      console.log(
        "CREATE ORDER RAW:",
        raw
      );

      if (!raw.trim()) {
        throw new Error(
          "Create-order server returned an empty response."
        );
      }

      let data:
        CreateOrderResponse;

      try {
        data =
          JSON.parse(raw);
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

      // ======================================================
      // VALUES
      // ======================================================

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
        ) || "INR";

      if (!createdDonationId) {
        throw new Error(
          "Donation ID was not returned by create-order."
        );
      }

      if (!razorpayOrderId) {
        throw new Error(
          "Razorpay order ID was not returned."
        );
      }

      if (!razorpayKey) {
        throw new Error(
          "Razorpay key was not returned by server."
        );
      }

      // ======================================================
      // RAZORPAY OPTIONS
      // ======================================================

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

          donationType:
            donationType,

          donationMode:
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

        // ====================================================
        // PAYMENT SUCCESS
        // ====================================================

        handler:
          async (
            paymentResponse
          ) => {
            try {
              setMessage(
                "Payment received. Verifying securely..."
              );

              const returnedOrderId =
                clean(
                  paymentResponse
                    ?.razorpay_order_id
                );

              const paymentId =
                clean(
                  paymentResponse
                    ?.razorpay_payment_id
                );

              const signature =
                clean(
                  paymentResponse
                    ?.razorpay_signature
                );

              if (!returnedOrderId) {
                throw new Error(
                  "Razorpay order ID is missing."
                );
              }

              if (
                returnedOrderId !==
                razorpayOrderId
              ) {
                throw new Error(
                  "Razorpay order ID does not match the created order."
                );
              }

              if (!paymentId) {
                throw new Error(
                  "Razorpay payment ID is missing."
                );
              }

              if (!signature) {
                throw new Error(
                  "Razorpay payment signature is missing."
                );
              }

              // ==============================================
              // VERIFY PAYMENT
              // ==============================================

              const verifyResponse =
                await fetch(
                  "/api/donate/verify",
                  {
                    method:
                      "POST",

                    headers: {
                      "Content-Type":
                        "application/json",

                      Accept:
                        "application/json",
                    },

                    body:
                      JSON.stringify({
                        donationId:
                          createdDonationId,

                        razorpay_order_id:
                          returnedOrderId,

                        razorpay_payment_id:
                          paymentId,

                        razorpay_signature:
                          signature,
                      }),

                    cache:
                      "no-store",
                  }
                );

              const verifyRaw =
                await verifyResponse.text();

              console.log(
                "VERIFY STATUS:",
                verifyResponse.status
              );

              console.log(
                "VERIFY RAW:",
                verifyRaw
              );

              if (
                !verifyRaw.trim()
              ) {
                throw new Error(
                  "Verification server returned an empty response."
                );
              }

              let verifyData:
                any;

              try {
                verifyData =
                  JSON.parse(
                    verifyRaw
                  );
              } catch {
                throw new Error(
                  "Verification server returned invalid JSON."
                );
              }

              if (
                !verifyResponse.ok ||
                !verifyData?.success
              ) {
                throw new Error(
                  verifyData?.message ||
                    "Payment verification failed."
                );
              }

              const verifiedDonation =
                verifyData?.donation;

              if (
                !verifiedDonation
              ) {
                throw new Error(
                  "Payment verified but donation data was not returned."
                );
              }

              // ==============================================
              // VERIFIED VALUES
              // ==============================================

              const verifiedDonationId =
                clean(
                  verifiedDonation?._id
                );

              const verifiedReference =
                clean(
                  verifiedDonation
                    ?.donationReference
                );

              const verifiedPaymentId =
                clean(
                  verifiedDonation
                    ?.paymentId
                ) ||
                paymentId;

              const verifiedReceiptNo =
                clean(
                  verifiedDonation
                    ?.receiptNo
                );

              if (
                !verifiedDonationId
              ) {
                throw new Error(
                  "Payment verified but Donation ID is missing."
                );
              }

              // ==============================================
              // SUCCESS URL
              // ==============================================

              const params =
                new URLSearchParams();

              params.set(
                "donationId",
                verifiedDonationId
              );

              if (
                verifiedReference
              ) {
                params.set(
                  "reference",
                  verifiedReference
                );
              }

              if (
                verifiedPaymentId
              ) {
                params.set(
                  "paymentId",
                  verifiedPaymentId
                );
              }

              if (
                verifiedReceiptNo
              ) {
                params.set(
                  "receiptNo",
                  verifiedReceiptNo
                );
              }

              const successUrl =
                `/donate/success?${params.toString()}`;

              console.log(
                "AJFT SUCCESS URL:",
                successUrl
              );

              window.location.assign(
                successUrl
              );
            } catch (
              verifyError
            ) {
              console.error(
                "AJFT PAYMENT VERIFICATION ERROR:",
                verifyError
              );

              setLoading(false);
              setMessage("");

              setError(
                verifyError instanceof
                  Error
                  ? verifyError.message
                  : "Payment verification failed."
              );
            }
          },
      };

      // ======================================================
      // OPEN RAZORPAY
      // ======================================================

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    } catch (error) {
      console.error(
        "AJFT CREATE PAYMENT ERROR:",
        error
      );

      setLoading(false);
      setMessage("");

      setError(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
      );
    }
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <main className="min-h-screen bg-[#F4F7F6]">

      {/* ======================================================
          TOP ACCENT
      ======================================================= */}

      <div
        className="h-1"
        style={{
          backgroundColor:
            primaryColor,
        }}
      />

      {/* ======================================================
          HEADER
      ======================================================= */}

      <header
        className="border-b border-white/10"
        style={{
          backgroundColor:
            "#073B4C",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">

          <div className="flex items-center gap-2.5">

            

          </div>

          <div className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[7px] font-bold tracking-wide text-white/70 sm:flex">

            <ShieldCheck
              size={11}
            />

            SECURE PAYMENT

          </div>

        </div>
      </header>

      {/* ======================================================
          COMPACT HERO
      ======================================================= */}

      <section
        style={{
          backgroundColor:
            heroColor,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-7 text-center sm:py-9">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl">

            {isNRI ? (
              <Globe2
                size={24}
                style={{
                  color:
                    primaryColor,
                }}
              />
            ) : isMonthly ? (
              <Repeat2
                size={24}
                style={{
                  color:
                    primaryColor,
                }}
              />
            ) : (
              <Heart
                size={24}
                style={{
                  color:
                    primaryColor,
                }}
                fill="currentColor"
              />
            )}

          </div>

          <div
            className="mx-auto mt-3 h-1 w-10 rounded-full"
            style={{
              backgroundColor:
                primaryColor,
            }}
          />

          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">

            {isNRI
              ? "International Donation"
              : isMonthly
              ? "Monthly Giving"
              : "Make a Donation"}

          </h1>

          <p className="mt-1 text-[9px] text-white/55">
            {isNRI
              ? "Support our charitable work worldwide."
              : isMonthly
              ? "Create lasting impact every month."
              : "Support our charitable and social welfare activities."}
          </p>

        </div>
      </section>

      {/* ======================================================
          DONATION OPTIONS
      ======================================================= */}

      <section className="px-3 pt-5 sm:px-5">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-3 md:grid-cols-3">

            {/* ONE TIME */}

            <DonationTypeCard
              active={
                donationType ===
                  "one-time" &&
                donationMode ===
                  "indian"
              }
              color="#08744F"
              bg="#EFF9F4"
              icon={
                <Heart
                  size={20}
                  fill="currentColor"
                />
              }
              title="One-Time"
              description="Make a single contribution."
              onClick={
                selectOneTime
              }
            />

            {/* MONTHLY */}

            <DonationTypeCard
              active={
                donationType ===
                  "monthly" &&
                donationMode ===
                  "indian"
              }
              color="#6D28D9"
              bg="#F7F3FF"
              icon={
                <Repeat2
                  size={20}
                />
              }
              title="Monthly"
              description="Give regularly every month."
              onClick={
                selectMonthly
              }
            />

            {/* NRI */}

            <DonationTypeCard
              active={
                donationMode ===
                "nri"
              }
              color="#B7791F"
              bg="#FFF9ED"
              icon={
                <Globe2
                  size={20}
                />
              }
              title="NRI / International"
              description="Support us from abroad."
              onClick={
                selectNRI
              }
            />

          </div>

        </div>
      </section>

      {/* ======================================================
          MAIN FORM
      ======================================================= */}

      <section className="px-3 py-5 sm:px-5 sm:py-7">

        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_60px_rgba(7,59,76,0.10)]">

            {/* FORM TITLE */}

            <div
              className="border-b px-5 py-4 sm:px-6"
              style={{
                backgroundColor:
                  softBg,
                borderColor:
                  softBorder,
              }}
            >

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{
                      backgroundColor:
                        primaryColor,
                    }}
                  >

                    {isNRI ? (
                      <Globe2
                        size={17}
                      />
                    ) : isMonthly ? (
                      <Repeat2
                        size={17}
                      />
                    ) : (
                      <Heart
                        size={17}
                        fill="currentColor"
                      />
                    )}

                  </div>

                  <div>

                    <h2 className="text-sm font-black text-[#073B4C]">
                      {isNRI
                        ? "International Donation"
                        : isMonthly
                        ? "Monthly Donation"
                        : "Donation Details"}
                    </h2>

                    <p className="mt-0.5 text-[7px] text-gray-500">
                      Enter your details to continue.
                    </p>

                  </div>

                </div>

                <span
                  className="rounded-full px-3 py-1.5 text-[6px] font-black uppercase tracking-widest text-white"
                  style={{
                    backgroundColor:
                      primaryColor,
                  }}
                >
                  {isNRI
                    ? "NRI"
                    : isMonthly
                    ? "MONTHLY"
                    : "ONE-TIME"}
                </span>

              </div>

            </div>

            <form
              onSubmit={
                createOrder
              }
              className="p-4 sm:p-6"
            >

              {/* ==================================================
                  ERROR
              =================================================== */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                  <p className="text-[9px] font-semibold leading-5 text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {/* ==================================================
                  PROCESSING
              =================================================== */}

              {message && (
                <div
                  className="mb-5 flex items-center gap-2 rounded-xl border px-4 py-3"
                  style={{
                    backgroundColor:
                      softBg,
                    borderColor:
                      softBorder,
                  }}
                >

                  <Loader2
                    size={14}
                    className="animate-spin"
                    style={{
                      color:
                        primaryColor,
                    }}
                  />

                  <p
                    className="text-[9px] font-semibold"
                    style={{
                      color:
                        primaryColor,
                    }}
                  >
                    {message}
                  </p>

                </div>
              )}

              {/* ==================================================
                  NRI
              =================================================== */}

              {isNRI && (
                <div className="mb-5 rounded-2xl border border-[#EFD79A] bg-[#FFF9ED] p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B7791F] text-white">

                      <Globe2
                        size={17}
                      />

                    </div>

                    <div>

                      <p className="text-[9px] font-black text-[#6B4315]">
                        International Donor
                      </p>

                      <p className="mt-1 text-[7px] leading-4 text-[#80683E]">
                        Please select your country and preferred
                        international currency.
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">

                    <SelectField
                      label="Country"
                      value={
                        country
                      }
                      onChange={
                        setCountry
                      }
                      options={[
                        "United States",
                        "United Kingdom",
                        "Canada",
                        "Australia",
                        "United Arab Emirates",
                        "Singapore",
                        "Germany",
                        "Other",
                      ]}
                      borderColor="#E8D5A3"
                    />

                    <SelectField
                      label="Currency"
                      value={
                        currency
                      }
                      onChange={
                        setCurrency
                      }
                      options={[
                        "USD",
                        "GBP",
                        "EUR",
                        "CAD",
                        "AUD",
                        "AED",
                      ]}
                      borderColor="#E8D5A3"
                    />

                  </div>

                </div>
              )}

              {/* ==================================================
                  DONOR DETAILS
              =================================================== */}

              <div className="grid gap-4 md:grid-cols-2">

                <InputField
                  label="Full Name"
                  icon={
                    <UserRound
                      size={13}
                    />
                  }
                  value={
                    donorName
                  }
                  onChange={
                    setDonorName
                  }
                  placeholder="Enter full name"
                  required
                  iconColor={
                    primaryColor
                  }
                />

                <InputField
                  label="Mobile Number"
                  icon={
                    <Phone
                      size={13}
                    />
                  }
                  value={
                    mobile
                  }
                  onChange={
                    setMobile
                  }
                  placeholder="Mobile number"
                  inputMode="numeric"
                  maxLength={15}
                  required
                  iconColor={
                    primaryColor
                  }
                />

                <InputField
                  label="Email Address"
                  icon={
                    <Mail
                      size={13}
                    />
                  }
                  value={
                    email
                  }
                  onChange={
                    setEmail
                  }
                  placeholder="you@example.com"
                  type="email"
                  required
                  iconColor={
                    primaryColor
                  }
                />

                <InputField
                  label="Address"
                  icon={
                    <MapPin
                      size={13}
                    />
                  }
                  value={
                    address
                  }
                  onChange={
                    setAddress
                  }
                  placeholder={
                    isNRI
                      ? "International address"
                      : "Full address"
                  }
                  iconColor={
                    primaryColor
                  }
                />

              </div>

              {/* ==================================================
                  AMOUNT
              =================================================== */}

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-500">
                    {isMonthly
                      ? "Monthly Amount"
                      : "Donation Amount"}
                  </label>

                  <span
                    className="text-[8px] font-black"
                    style={{
                      color:
                        primaryColor,
                    }}
                  >
                    {isNRI
                      ? currency
                      : "INR"}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                  {quickAmounts.map(
                    (value) => {
                      const active =
                        amount ===
                        value;

                      return (
                        <button
                          key={
                            value
                          }
                          type="button"
                          onClick={() =>
                            setAmount(
                              value
                            )
                          }
                          className="h-11 rounded-xl border-2 text-[9px] font-black transition-all"
                          style={{
                            borderColor:
                              active
                                ? primaryColor
                                : "#E5E7EB",

                            backgroundColor:
                              active
                                ? primaryColor
                                : "#FFFFFF",

                            color:
                              active
                                ? "#FFFFFF"
                                : "#073B4C",

                            boxShadow:
                              active
                                ? `0 8px 20px ${primaryColor}22`
                                : "none",
                          }}
                        >
                          {isNRI
                            ? currency
                            : "₹"}{" "}
                          {Number(
                            value
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </button>
                      );
                    }
                  )}

                </div>

                <div className="relative mt-2">

                  {isNRI ? (
                    <WalletCards
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{
                        color:
                          primaryColor,
                      }}
                    />
                  ) : (
                    <IndianRupee
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{
                        color:
                          primaryColor,
                      }}
                    />
                  )}

                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={
                      amount
                    }
                    onChange={(
                      e
                    ) =>
                      setAmount(
                        e.target.value
                      )
                    }
                    className="h-12 w-full rounded-xl border bg-white pl-9 pr-4 text-sm font-black text-[#073B4C] outline-none transition"
                    style={{
                      borderColor:
                        softBorder,
                    }}
                    placeholder="Enter donation amount"
                    required
                  />

                </div>

              </div>

              {/* ==================================================
                  MONTHLY INFO
              =================================================== */}

              {isMonthly && (
                <div className="mt-5 rounded-2xl border border-[#DDD0F8] bg-[#F7F3FF] p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6D28D9] text-white">

                      <Repeat2
                        size={17}
                      />

                    </div>

                    <div>

                      <p className="text-[9px] font-black text-[#4C1D95]">
                        Monthly Contribution
                      </p>

                      <p className="mt-1 text-[7px] leading-4 text-[#6B5A8A]">
                        Monthly donations help support
                        sustainable long-term charitable work.
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* ==================================================
                  80G
              =================================================== */}

              {!isNRI && (
                <div className="mt-5 rounded-2xl border border-gray-200 bg-[#FBFDFC] p-4">

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      checked={
                        requires80G
                      }
                      onChange={(
                        e
                      ) =>
                        setRequires80G(
                          e.target
                            .checked
                        )
                      }
                      className="mt-0.5 h-4 w-4"
                      style={{
                        accentColor:
                          primaryColor,
                      }}
                    />

                    <div>

                      <p className="text-[9px] font-black text-[#073B4C]">
                        I require 80G donation details
                      </p>

                      <p className="mt-1 text-[7px] leading-4 text-gray-400">
                        PAN may be required for applicable
                        donation documentation.
                      </p>

                    </div>

                  </label>

                  {requires80G && (
                    <div className="mt-4">

                      <label className="mb-1.5 block text-[8px] font-black uppercase tracking-wider text-gray-500">
                        PAN Number
                      </label>

                      <input
                        type="text"
                        value={
                          pan
                        }
                        onChange={(
                          e
                        ) =>
                          setPan(
                            e.target.value.toUpperCase()
                          )
                        }
                        maxLength={
                          10
                        }
                        placeholder="ABCDE1234F"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-bold uppercase text-[#073B4C] outline-none"
                      />

                    </div>
                  )}

                </div>
              )}

              {/* ==================================================
                  SUMMARY
              =================================================== */}

              <div
                className="mt-6 rounded-2xl border p-4"
                style={{
                  backgroundColor:
                    softBg,
                  borderColor:
                    softBorder,
                }}
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">
                      {isMonthly
                        ? "Monthly Contribution"
                        : isNRI
                        ? "International Donation"
                        : "Total Donation"}
                    </p>

                    <p
                      className="mt-1 text-2xl font-black"
                      style={{
                        color:
                          primaryColor,
                      }}
                    >

                      {isNRI
                        ? currency
                        : "₹"}{" "}

                      {formatAmount(
                        Number(
                          amount || 0
                        )
                      )}

                      {isMonthly && (
                        <span className="ml-1 text-xs">
                          / month
                        </span>
                      )}

                    </p>

                  </div>

                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        `${primaryColor}18`,
                    }}
                  >

                    <BadgeCheck
                      size={24}
                      style={{
                        color:
                          primaryColor,
                      }}
                    />

                  </div>

                </div>

              </div>

              {/* ==================================================
                  PAYMENT BUTTON
              =================================================== */}

              <button
                type="submit"
                disabled={
                  loading
                }
                className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl text-xs font-black text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor:
                    primaryColor,
                }}
              >

                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    {isNRI ? (
                      <Globe2
                        size={17}
                      />
                    ) : isMonthly ? (
                      <Repeat2
                        size={17}
                      />
                    ) : (
                      <CreditCard
                        size={17}
                      />
                    )}

                    {isMonthly
                      ? "Start Monthly Donation"
                      : isNRI
                      ? "Continue International Donation"
                      : "Proceed to Secure Payment"}

                    <ArrowRight
                      size={16}
                    />
                  </>
                )}

              </button>

              {/* ==================================================
                  SECURITY
              =================================================== */}

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[7px] text-gray-400">

                <ShieldCheck
                  size={11}
                  style={{
                    color:
                      primaryColor,
                  }}
                />

                Secure payment processed by Razorpay

              </div>

            </form>

          </div>

          {/* ====================================================
              FOOTER INFO
          ===================================================== */}

          <div className="mt-5 flex flex-col items-center justify-center gap-1 text-center">

            <p className="text-[8px] font-black text-[#073B4C]">
              Anand Jivan Foundation Trust
            </p>

            <p className="text-[7px] text-gray-400">
              Darbhanga, Bihar
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

// ============================================================
// DONATION TYPE CARD
// ============================================================

function DonationTypeCard({
  active,
  color,
  bg,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  color: string;
  bg: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border-2 bg-white p-4 text-left transition-all hover:-translate-y-0.5"
      style={{
        borderColor:
          active
            ? color
            : "#E5E7EB",

        backgroundColor:
          active
            ? bg
            : "#FFFFFF",

        boxShadow:
          active
            ? `0 14px 35px ${color}18`
            : "none",
      }}
    >

      <div className="flex items-start justify-between">

        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
          style={{
            backgroundColor:
              color,
          }}
        >
          {icon}
        </div>

        {active && (
          <CheckCircle2
            size={18}
            style={{
              color,
            }}
          />
        )}

      </div>

      <p className="mt-3 text-xs font-black text-[#073B4C]">
        {title}
      </p>

      <p className="mt-1 text-[8px] leading-4 text-gray-500">
        {description}
      </p>

    </button>
  );
}

// ============================================================
// INPUT
// ============================================================

function InputField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  inputMode,
  maxLength,
  iconColor,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  inputMode?:
    | "text"
    | "numeric"
    | "email";
  maxLength?: number;
  iconColor: string;
}) {
  return (
    <div>

      <label className="mb-1.5 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wider text-gray-500">

        <span
          style={{
            color:
              iconColor,
          }}
        >
          {icon}
        </span>

        {label}

      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-[10px] font-semibold text-[#073B4C] outline-none transition placeholder:text-gray-300"
      />

    </div>
  );
}

// ============================================================
// SELECT
// ============================================================

function SelectField({
  label,
  value,
  onChange,
  options,
  borderColor,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  options: string[];
  borderColor: string;
}) {
  return (
    <div>

      <label className="mb-1.5 block text-[8px] font-black uppercase tracking-wider text-[#80683E]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="h-11 w-full rounded-xl bg-white px-3 text-[9px] font-bold text-[#073B4C] outline-none"
        style={{
          border:
            `1px solid ${borderColor}`,
        }}
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

      </select>

    </div>
  );
}