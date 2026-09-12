"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Globe2,
  Heart,
  IndianRupee,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Repeat2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type DonorType = "indian" | "nri" | "foreign";
type DonationFrequency = "one-time" | "monthly";

interface TrackingData {
  sourceAction: string;
  action: string;
  buttonId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
}

/* =========================================================
   CONSTANTS
========================================================= */

const amounts = [
  {
    value: 500,
    title: "₹500",
    description: "Support a community activity",
  },
  {
    value: 1000,
    title: "₹1,000",
    description: "Support education initiatives",
  },
  {
    value: 2500,
    title: "₹2,500",
    description: "Support community development",
  },
  {
    value: 5000,
    title: "₹5,000",
    description: "Support social welfare",
  },
  {
    value: 10000,
    title: "₹10,000",
    description: "Support a larger initiative",
  },
  {
    value: 25000,
    title: "₹25,000",
    description: "Support long-term impact",
  },
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
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
  "Saudi Arabia",
  "Qatar",
  "Other",
];

const steps = [
  {
    number: 1,
    title: "Donation",
    description: "Choose your support",
  },
  {
    number: 2,
    title: "Details",
    description: "Your information",
  },
  {
    number: 3,
    title: "Review",
    description: "Confirm donation",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getTracking(): TrackingData {
  if (typeof window === "undefined") {
    return {
      sourceAction: "",
      action: "",
      buttonId: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    sourceAction: params.get("source-action") || "",
    action: params.get("action") || "",
    buttonId: params.get("button-id") || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
    utmTerm: params.get("utm_term") || "",
  };
}

function getAmountFromUrl(): number {
  if (typeof window === "undefined") return 0;

  const params = new URLSearchParams(window.location.search);
  const value = Number(params.get("donation_amount") || 0);

  if (Number.isFinite(value) && value >= 100) {
    return value;
  }

  return 0;
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getButtonTracking() {
  if (typeof window === "undefined") return {};

  const tracking = getTracking();

  return {
    sourceAction: tracking.sourceAction,
    action: tracking.action,
    buttonId: tracking.buttonId,
    utmSource: tracking.utmSource,
    utmMedium: tracking.utmMedium,
    utmCampaign: tracking.utmCampaign,
    utmContent: tracking.utmContent,
    utmTerm: tracking.utmTerm,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function DonatePage() {
  /* =======================================================
     STATE
  ======================================================= */

  const [step, setStep] = useState(1);

  const [donorType, setDonorType] =
    useState<DonorType>("indian");

  const [frequency, setFrequency] =
    useState<DonationFrequency>("one-time");

  const [selectedAmount, setSelectedAmount] =
    useState<number | null>(null);

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

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("");

  const [pinCode, setPinCode] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [pan, setPan] =
    useState("");

  const [requires80G, setRequires80G] =
    useState(true);

  const [agree, setAgree] =
    useState(false);

  const [error, setError] =
    useState("");

  const [tracking, setTracking] =
    useState<TrackingData>({
      sourceAction: "",
      action: "",
      buttonId: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
    });

  /* =======================================================
     READ URL TRACKING
  ======================================================= */

  useEffect(() => {
    const urlTracking = getTracking();

    setTracking(urlTracking);

    const urlAmount = getAmountFromUrl();

    if (urlAmount > 0) {
      setSelectedAmount(urlAmount);
      setCustomAmount("");
    }

    /*
      Save campaign attribution so it can be used
      later during the payment process.
    */

    try {
      sessionStorage.setItem(
        "ajft_donation_tracking",
        JSON.stringify(urlTracking)
      );

      localStorage.setItem(
        "ajft_donation_tracking",
        JSON.stringify(urlTracking)
      );
    } catch {
      // Storage can be unavailable in some browsers.
    }

    /*
      Push landing event.
    */

    const dataLayer =
      window.dataLayer ||
      [];

    dataLayer.push({
      event: "ajft_donation_page_view",
      page_path: window.location.pathname,
      source_action: urlTracking.sourceAction,
      action: urlTracking.action,
      button_id: urlTracking.buttonId,
      utm_source: urlTracking.utmSource,
      utm_medium: urlTracking.utmMedium,
      utm_campaign: urlTracking.utmCampaign,
      utm_content: urlTracking.utmContent,
      utm_term: urlTracking.utmTerm,
    });

    window.dataLayer = dataLayer;
  }, []);

  /* =======================================================
     DERIVED
  ======================================================= */

  const amount = useMemo(() => {
    if (customAmount.trim()) {
      return Number(customAmount);
    }

    return Number(selectedAmount || 0);
  }, [customAmount, selectedAmount]);

  const isForeign =
    donorType === "foreign";

  const isNri =
    donorType === "nri";

  /* =======================================================
     SELECT AMOUNT
  ======================================================= */

  function handleAmount(value: number) {
    setSelectedAmount(value);
    setCustomAmount("");
    setError("");
  }

  /* =======================================================
     VALIDATE STEP 1
  ======================================================= */

  function validateDonation() {
    if (
      !Number.isFinite(amount) ||
      amount < 100
    ) {
      setError(
        "Please select or enter a donation amount of at least ₹100."
      );

      return false;
    }

    /*
      Current backend supports INR Razorpay.
      Foreign currency processing should not be
      falsely presented as active.
    */

    if (isForeign) {
      setError(
        "Foreign currency donations are not currently enabled. Please use the supported Indian/NRI INR donation route or contact AJFT for international donation assistance."
      );

      return false;
    }

    /*
      Monthly subscription requires backend
      Razorpay Subscription API configuration.
    */

    if (frequency === "monthly") {
      setError(
        "Monthly recurring donation is currently being prepared. Please select Give Once for the available secure payment flow."
      );

      return false;
    }

    return true;
  }

  /* =======================================================
     VALIDATE STEP 2
  ======================================================= */

  function validateDetails() {
    const name =
      donorName.trim();

    const phone =
      mobile.replace(/\D/g, "");

    const mail =
      email.trim().toLowerCase();

    const completeAddress =
      address.trim();

    const completeCity =
      city.trim();

    const completeState =
      state.trim();

    const completePin =
      pinCode.replace(/\D/g, "");

    const completeCountry =
      country.trim();

    const completePan =
      pan.trim().toUpperCase();

    if (!name) {
      setError("Please enter your full name.");
      return false;
    }

    if (
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      setError(
        "Please enter a valid 10 digit mobile number."
      );
      return false;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        mail
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return false;
    }

    if (!completeAddress) {
      setError(
        "Please enter your complete address."
      );
      return false;
    }

    if (!completeCity) {
      setError("Please enter your city.");
      return false;
    }

    if (!completeState) {
      setError("Please select your state.");
      return false;
    }

    if (
      !/^\d{6}$/.test(
        completePin
      )
    ) {
      setError(
        "Please enter a valid 6 digit PIN code."
      );
      return false;
    }

    if (
      (isNri || isForeign) &&
      !completeCountry
    ) {
      setError(
        "Please select your country."
      );
      return false;
    }

    if (
      donorType === "indian" &&
      requires80G &&
      completePan &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        completePan
      )
    ) {
      setError(
        "Please enter a valid PAN number."
      );
      return false;
    }

    if (!agree) {
      setError(
        "Please confirm that the information provided is correct."
      );
      return false;
    }

    return true;
  }

  /* =======================================================
     NEXT STEP
  ======================================================= */

  function nextStep() {
    setError("");

    if (step === 1) {
      if (!validateDonation()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validateDetails()) return;
      setStep(3);
      return;
    }
  }

  /* =======================================================
     PREVIOUS STEP
  ======================================================= */

  function previousStep() {
    setError("");
    setStep((current) =>
      Math.max(1, current - 1)
    );
  }

  /* =======================================================
     PAYMENT SUBMIT
  ======================================================= */

  async function handlePayment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!validateDonation()) {
      setStep(1);
      return;
    }

    if (!validateDetails()) {
      setStep(2);
      return;
    }

    /*
      This first page prepares the complete
      donation information.

      Payment API integration will use this
      exact payload in the next files.
    */

    const payload = {
      donorName: donorName.trim(),
      mobile: mobile.replace(/\D/g, ""),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pinCode: pinCode.replace(/\D/g, ""),
      country:
        donorType === "indian"
          ? "India"
          : country.trim(),

      amount,
      currency: "INR",

      donationType: frequency,
      donationMode:
        donorType === "indian"
          ? "indian"
          : "nri",

      donorType,

      requires80G:
        donorType === "indian"
          ? requires80G
          : false,

      pan:
        donorType === "indian"
          ? pan.trim().toUpperCase()
          : "",

      tracking: {
        ...getButtonTracking(),
      },
    };

    /*
      Keep payload available for the payment
      API integration.
    */

    try {
      sessionStorage.setItem(
        "ajft_pending_donation",
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage errors.
    }

    /*
      Temporary event for analytics.
    */

    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      event: "ajft_donation_review_confirmed",

      donation_amount: amount,

      currency: "INR",

      donor_type: donorType,

      donation_frequency:
        frequency,

      requires_80g:
        donorType === "indian"
          ? requires80G
          : false,

      source_action:
        tracking.sourceAction,

      action:
        tracking.action,

      button_id:
        tracking.buttonId,

      utm_source:
        tracking.utmSource,

      utm_medium:
        tracking.utmMedium,

      utm_campaign:
        tracking.utmCampaign,

      utm_content:
        tracking.utmContent,

      utm_term:
        tracking.utmTerm,
    });

    /*
      The actual Razorpay create-order +
      verify flow will be connected through
      /api/donate/create-order and
      /api/donate/verify.
    */

    try {
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
            body: JSON.stringify(
              payload
            ),
            cache: "no-store",
          }
        );

      const raw =
        await response.text();

      if (!raw.trim()) {
        throw new Error(
          "Payment server returned an empty response."
        );
      }

      let data: any;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          "Payment server returned invalid JSON."
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

      /*
        If existing API is already configured,
        pass order information to Razorpay.
      */

      const orderId =
        data?.razorpayOrderId ||
        data?.orderId ||
        data?.razorpay?.orderId;

      const keyId =
        data?.razorpay?.keyId;

      const donationId =
        data?.donationId;

      if (
        !orderId ||
        !keyId ||
        !donationId
      ) {
        throw new Error(
          "Payment order was created but required Razorpay information was not returned."
        );
      }

      await openRazorpay({
        keyId,
        orderId,
        donationId,
        amount:
          data?.amountPaise ||
          data?.razorpay?.amount ||
          Math.round(amount * 100),
        currency:
          data?.currency ||
          data?.razorpay?.currency ||
          "INR",
      });
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to start secure payment."
      );
    }
  }

  /* =======================================================
     RAZORPAY
  ======================================================= */

  async function openRazorpay({
    keyId,
    orderId,
    donationId,
    amount: amountPaise,
    currency,
  }: {
    keyId: string;
    orderId: string;
    donationId: string;
    amount: number;
    currency: string;
  }) {
    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    const alreadyLoaded =
      Boolean(
        window.Razorpay
      );

    if (!alreadyLoaded) {
      await new Promise<void>(
        (resolve, reject) => {
          script.onload = () =>
            resolve();

          script.onerror = () =>
            reject(
              new Error(
                "Unable to load Razorpay."
              )
            );

          document.body.appendChild(
            script
          );
        }
      );
    }

    if (!window.Razorpay) {
      throw new Error(
        "Razorpay checkout is unavailable."
      );
    }

    const options = {
      key: keyId,

      amount:
        amountPaise,

      currency,

      name:
        "Anand Jivan Foundation Trust",

      description:
        "Donation to Anand Jivan Foundation Trust",

      order_id:
        orderId,

      prefill: {
        name:
          donorName.trim(),

        email:
          email.trim().toLowerCase(),

        contact:
          mobile.replace(/\D/g, ""),
      },

      notes: {
        donationId,
        donorType,
        donationType:
          frequency,

        sourceAction:
          tracking.sourceAction,

        action:
          tracking.action,

        buttonId:
          tracking.buttonId,

        utmSource:
          tracking.utmSource,

        utmMedium:
          tracking.utmMedium,

        utmCampaign:
          tracking.utmCampaign,
      },

      theme: {
        color: "#0F766E",
      },

      modal: {
        ondismiss: () => {
          setError(
            "Payment window was closed. You can try again."
          );
        },
      },

      handler:
        async (response: any) => {
          try {
            const verify =
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
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    tracking,
                  }),

                  cache: "no-store",
                }
              );

            const raw =
              await verify.text();

            if (!raw.trim()) {
              throw new Error(
                "Payment verification returned an empty response."
              );
            }

            const data =
              JSON.parse(raw);

            if (
              !verify.ok ||
              !data?.success
            ) {
              throw new Error(
                data?.message ||
                  "Payment verification failed."
              );
            }

            /*
              Successful purchase event.
            */

            window.dataLayer =
              window.dataLayer || [];

            window.dataLayer.push({
              event: "purchase",

              transaction_id:
                response.razorpay_payment_id,

              value: amount,

              currency: "INR",

              source_action:
                tracking.sourceAction,

              action:
                tracking.action,

              button_id:
                tracking.buttonId,

              utm_source:
                tracking.utmSource,

              utm_medium:
                tracking.utmMedium,

              utm_campaign:
                tracking.utmCampaign,

              utm_content:
                tracking.utmContent,

              utm_term:
                tracking.utmTerm,
            });

            const successParams =
              new URLSearchParams();

            successParams.set(
              "donationId",
              donationId
            );

            successParams.set(
              "paymentId",
              response.razorpay_payment_id
            );

            if (
              data?.donation?.receiptNo
            ) {
              successParams.set(
                "receiptNo",
                data.donation.receiptNo
              );
            }

            if (
              data?.donation
                ?.donationReference
            ) {
              successParams.set(
                "reference",
                data.donation
                  .donationReference
              );
            }

            window.location.href =
              `/donate/success?${successParams.toString()}`;
          } catch (verificationError) {
            setError(
              verificationError instanceof Error
                ? verificationError.message
                : "Payment verification failed."
            );
          }
        },
    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F5F8FA]">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-[#102A43]">

        <div className="absolute inset-0">

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#087E8B]/30 blur-3xl" />

          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#D6A63A]/10 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-[#D9B65A] backdrop-blur">

              <Heart
                size={14}
                fill="currentColor"
              />

              Support Our Work

            </div>

            <h1 className="mt-6 font-serif text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">

              Make A Difference

              <span className="block text-[#D6A63A]">
                Through Your Giving
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Your contribution can support
              education, healthcare, women
              empowerment and community-focused
              initiatives of Anand Jivan Foundation
              Trust.
            </p>

          </div>

        </div>

      </section>

      {/* ===================================================
          STEPS
      =================================================== */}

      <section className="relative mx-auto -mt-6 max-w-5xl px-4">

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5">

          <div className="grid grid-cols-3">

            {steps.map(
              (item, index) => {
                const active =
                  step === item.number;

                const completed =
                  step > item.number;

                return (
                  <div
                    key={item.number}
                    className="relative flex items-center justify-center"
                  >

                    {index < steps.length - 1 && (
                      <div
                        className={`absolute left-1/2 top-5 hidden h-px w-full sm:block ${
                          completed
                            ? "bg-teal-600"
                            : "bg-slate-200"
                        }`}
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center text-center">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-black transition ${
                          completed
                            ? "border-teal-600 bg-teal-600 text-white"
                            : active
                            ? "border-[#D6A63A] bg-[#D6A63A] text-white"
                            : "border-slate-200 bg-white text-slate-400"
                        }`}
                      >

                        {completed ? (
                          <Check size={17} />
                        ) : (
                          item.number
                        )}

                      </div>

                      <p
                        className={`mt-2 text-[10px] font-black ${
                          active ||
                          completed
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-0.5 hidden text-[8px] text-slate-400 sm:block">
                        {item.description}
                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.75fr]">

          {/* =================================================
              MAIN CARD
          ================================================= */}

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

            <form
              onSubmit={
                step === 3
                  ? handlePayment
                  : (event) => {
                      event.preventDefault();
                      nextStep();
                    }
              }
            >

              {/* =================================================
                  STEP 1
              ================================================= */}

              {step === 1 && (
                <div className="p-5 sm:p-8">

                  <div className="mb-8">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <Heart size={23} />
                    </div>

                    <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-teal-700">
                      Step 01
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                      Choose Your Donation
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Select your donor category,
                      frequency and contribution amount.
                    </p>

                  </div>

                  {/* DONOR TYPE */}

                  <div>

                    <label className="text-xs font-black uppercase tracking-[0.12em] text-slate-600">
                      I am a
                    </label>

                    <div className="mt-3 grid gap-3 sm:grid-cols-3">

                      {/* INDIAN */}

                      <button
                        type="button"
                        onClick={() => {
                          setDonorType(
                            "indian"
                          );
                          setError("");
                        }}
                        className={`rounded-2xl border p-4 text-left transition ${
                          donorType ===
                          "indian"
                            ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                            : "border-slate-200 bg-white hover:border-teal-300"
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <IndianRupee size={19} />
                          </div>

                          {donorType ===
                            "indian" && (
                            <CheckCircle2
                              size={18}
                              className="text-teal-600"
                            />
                          )}

                        </div>

                        <p className="mt-4 text-sm font-black text-slate-900">
                          Indian Donor
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Donation from India
                        </p>

                      </button>

                      {/* NRI */}

                      <button
                        type="button"
                        onClick={() => {
                          setDonorType(
                            "nri"
                          );
                          setError("");
                        }}
                        className={`rounded-2xl border p-4 text-left transition ${
                          donorType ===
                          "nri"
                            ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                            : "border-slate-200 bg-white hover:border-teal-300"
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Globe2 size={19} />
                          </div>

                          {donorType ===
                            "nri" && (
                            <CheckCircle2
                              size={18}
                              className="text-teal-600"
                            />
                          )}

                        </div>

                        <p className="mt-4 text-sm font-black text-slate-900">
                          NRI Donor
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Overseas Indian donor
                        </p>

                      </button>

                      {/* FOREIGN */}

                      <button
                        type="button"
                        onClick={() => {
                          setDonorType(
                            "foreign"
                          );
                          setError("");
                        }}
                        className={`rounded-2xl border p-4 text-left transition ${
                          donorType ===
                          "foreign"
                            ? "border-amber-500 bg-amber-50 ring-4 ring-amber-500/10"
                            : "border-slate-200 bg-white hover:border-amber-300"
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <Globe2 size={19} />
                          </div>

                          {donorType ===
                            "foreign" && (
                            <CheckCircle2
                              size={18}
                              className="text-amber-600"
                            />
                          )}

                        </div>

                        <p className="mt-4 text-sm font-black text-slate-900">
                          Foreign Donor
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          International donor
                        </p>

                      </button>

                    </div>

                  </div>

                  {/* FREQUENCY */}

                  <div className="mt-8">

                    <label className="text-xs font-black uppercase tracking-[0.12em] text-slate-600">
                      Giving frequency
                    </label>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">

                      <button
                        type="button"
                        onClick={() => {
                          setFrequency(
                            "one-time"
                          );
                          setError("");
                        }}
                        className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                          frequency ===
                          "one-time"
                            ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                            : "border-slate-200 hover:border-teal-300"
                        }`}
                      >

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                          <CreditCard size={20} />
                        </div>

                        <div className="flex-1">

                          <p className="text-sm font-black text-slate-900">
                            Give Once
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Make a one-time contribution
                          </p>

                        </div>

                        {frequency ===
                          "one-time" && (
                          <CheckCircle2
                            size={19}
                            className="text-teal-600"
                          />
                        )}

                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFrequency(
                            "monthly"
                          );
                          setError("");
                        }}
                        className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                          frequency ===
                          "monthly"
                            ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                            : "border-slate-200 hover:border-teal-300"
                        }`}
                      >

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                          <Repeat2 size={20} />
                        </div>

                        <div className="flex-1">

                          <p className="text-sm font-black text-slate-900">
                            Give Monthly
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Build long-term support
                          </p>

                        </div>

                        {frequency ===
                          "monthly" && (
                          <CheckCircle2
                            size={19}
                            className="text-teal-600"
                          />
                        )}

                      </button>

                    </div>

                  </div>

                  {/* AMOUNT */}

                  <div className="mt-8">

                    <div className="flex items-center justify-between">

                      <label className="text-xs font-black uppercase tracking-[0.12em] text-slate-600">
                        Donation amount
                      </label>

                      <span className="text-[10px] font-bold text-slate-400">
                        Minimum ₹100
                      </span>

                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">

                      {amounts.map(
                        (item) => {
                          const active =
                            selectedAmount ===
                              item.value &&
                            !customAmount;

                          return (
                            <button
                              key={
                                item.value
                              }
                              type="button"
                              onClick={() =>
                                handleAmount(
                                  item.value
                                )
                              }
                              className={`group rounded-2xl border p-4 text-left transition ${
                                active
                                  ? "border-teal-600 bg-teal-700 text-white shadow-lg shadow-teal-700/20"
                                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50"
                              }`}
                            >

                              <div className="flex items-center justify-between">

                                <span className={`text-lg font-black ${
                                  active
                                    ? "text-white"
                                    : "text-slate-900"
                                }`}>
                                  {item.title}
                                </span>

                                {active && (
                                  <Check
                                    size={17}
                                  />
                                )}

                              </div>

                              <p
                                className={`mt-1 text-[9px] leading-4 ${
                                  active
                                    ? "text-white/65"
                                    : "text-slate-400"
                                }`}
                              >
                                {
                                  item.description
                                }
                              </p>

                            </button>
                          );
                        }
                      )}

                    </div>

                    <div className="relative mt-4">

                      <IndianRupee
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        min="100"
                        value={
                          customAmount
                        }
                        onChange={(
                          event
                        ) => {
                          setCustomAmount(
                            event.target.value
                          );
                          setSelectedAmount(
                            null
                          );
                          setError("");
                        }}
                        placeholder="Enter your own amount"
                        className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                  {/* FOREIGN NOTICE */}

                  {isForeign && (
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                      <div className="flex gap-3">

                        <AlertCircle
                          size={19}
                          className="mt-0.5 shrink-0 text-amber-600"
                        />

                        <div>

                          <p className="text-sm font-black text-amber-900">
                            International donation
                            assistance
                          </p>

                          <p className="mt-1 text-xs leading-5 text-amber-800">
                            Foreign currency donation
                            processing is not enabled in
                            the current Razorpay flow.
                            International donors should
                            contact AJFT for the available
                            compliant donation route.
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* NEXT */}

                  <div className="mt-8 flex justify-end">

                    <button
                      type="submit"
                      className="group inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-teal-700 px-7 text-xs font-black text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                    >

                      Continue

                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />

                    </button>

                  </div>

                </div>
              )}

              {/* =================================================
                  STEP 2
              ================================================== */}

              {step === 2 && (
                <div className="p-5 sm:p-8">

                  <div className="mb-8">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <UserRound size={22} />
                    </div>

                    <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-teal-700">
                      Step 02
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                      Your Information
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Please provide your details for
                      donation records and communication.
                    </p>

                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* NAME */}

                    <div className="sm:col-span-2">

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        Full Name
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <UserRound
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          required
                          value={
                            donorName
                          }
                          onChange={(
                            event
                          ) =>
                            setDonorName(
                              event.target.value
                            )
                          }
                          placeholder="Enter your full name"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                        />

                      </div>

                    </div>

                    {/* MOBILE */}

                    <div>

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        Mobile Number
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <Phone
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          required
                          inputMode="numeric"
                          maxLength={10}
                          value={
                            mobile
                          }
                          onChange={(
                            event
                          ) =>
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

                    {/* EMAIL */}

                    <div>

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        Email Address
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <Mail
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          required
                          type="email"
                          value={
                            email
                          }
                          onChange={(
                            event
                          ) =>
                            setEmail(
                              event.target.value
                            )
                          }
                          placeholder="you@example.com"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                        />

                      </div>

                    </div>

                    {/* ADDRESS */}

                    <div className="sm:col-span-2">

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        Complete Address
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <MapPin
                          size={17}
                          className="absolute left-4 top-4 text-slate-400"
                        />

                        <textarea
                          required
                          rows={3}
                          value={
                            address
                          }
                          onChange={(
                            event
                          ) =>
                            setAddress(
                              event.target.value
                            )
                          }
                          placeholder="House / Street / Area"
                          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                        />

                      </div>

                    </div>

                    {/* CITY */}

                    <div>

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        City
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        required
                        value={
                          city
                        }
                        onChange={(
                          event
                        ) =>
                          setCity(
                            event.target.value
                          )
                        }
                        placeholder="Enter city"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                    {/* STATE */}

                    <div>

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        State
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <select
                        required
                        value={
                          state
                        }
                        onChange={(
                          event
                        ) =>
                          setState(
                            event.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      >

                        <option value="">
                          Select State
                        </option>

                        {indianStates.map(
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

                    {/* PIN */}

                    <div>

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        PIN Code
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        required
                        inputMode="numeric"
                        maxLength={6}
                        value={
                          pinCode
                        }
                        onChange={(
                          event
                        ) =>
                          setPinCode(
                            event.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="846005"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                    {/* COUNTRY */}

                    <div>

                      <label className="mb-2 block text-xs font-bold text-slate-600">
                        Country
                        {(isNri ||
                          isForeign) && (
                          <span className="ml-1 text-red-500">
                            *
                          </span>
                        )}
                      </label>

                      {donorType ===
                      "indian" ? (
                        <input
                          value="India"
                          readOnly
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm font-semibold text-slate-600 outline-none"
                        />
                      ) : (
                        <select
                          required
                          value={
                            country
                          }
                          onChange={(
                            event
                          ) =>
                            setCountry(
                              event.target.value
                            )
                          }
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
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
                      )}

                    </div>

                  </div>

                  {/* 80G */}

                  {donorType ===
                    "indian" && (
                    <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                          <BadgeCheck
                            size={19}
                          />
                        </div>

                        <div className="flex-1">

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <h3 className="text-sm font-black text-emerald-950">
                                80G Tax Benefit
                              </h3>

                              <p className="mt-1 text-xs leading-5 text-emerald-700">
                                Select this if you require
                                applicable 80G documentation.
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setRequires80G(
                                  !requires80G
                                )
                              }
                              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                                requires80G
                                  ? "bg-emerald-600"
                                  : "bg-slate-300"
                              }`}
                              aria-label="Toggle 80G"
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
                                value={
                                  pan
                                }
                                maxLength={
                                  10
                                }
                                onChange={(
                                  event
                                ) =>
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
                                className="h-12 w-full rounded-xl border border-emerald-200 bg-white px-4 text-sm font-bold uppercase text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                              />

                            </div>
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                  {/* CONFIRM */}

                  <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                    <input
                      type="checkbox"
                      checked={
                        agree
                      }
                      onChange={(
                        event
                      ) =>
                        setAgree(
                          event.target.checked
                        )
                      }
                      className="mt-0.5 h-4 w-4 accent-teal-700"
                    />

                    <span className="text-xs leading-5 text-slate-600">
                      I confirm that the information
                      provided by me is accurate and
                      I agree to proceed with the
                      donation.
                    </span>

                  </label>

                  {/* BUTTONS */}

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">

                    <button
                      type="button"
                      onClick={
                        previousStep
                      }
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                    >

                      <ArrowLeft
                        size={16}
                      />

                      Back

                    </button>

                    <button
                      type="submit"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-7 text-xs font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
                    >

                      Review Donation

                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />

                    </button>

                  </div>

                </div>
              )}

              {/* =================================================
                  STEP 3
              ================================================== */}

              {step === 3 && (
                <div className="p-5 sm:p-8">

                  <div className="mb-8">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                      <ShieldCheck
                        size={22}
                      />
                    </div>

                    <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-teal-700">
                      Step 03
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                      Review Your Donation
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Please check your details before
                      proceeding to secure payment.
                    </p>

                  </div>

                  {/* SUMMARY */}

                  <div className="overflow-hidden rounded-3xl border border-slate-200">

                    <div className="bg-[#102A43] p-6 text-white">

                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D9B65A]">
                        Donation Summary
                      </p>

                      <div className="mt-4 flex items-end justify-between gap-4">

                        <div>

                          <p className="text-xs text-white/50">
                            Your contribution
                          </p>

                          <p className="mt-1 text-3xl font-black">
                            {formatAmount(
                              amount
                            )}
                          </p>

                        </div>

                        <Heart
                          size={34}
                          className="text-[#D6A63A]"
                          fill="currentColor"
                        />

                      </div>

                    </div>

                    <div className="divide-y divide-slate-100">

                      <div className="grid gap-4 p-5 sm:grid-cols-2">

                        <SummaryItem
                          label="Donor Type"
                          value={
                            donorType ===
                            "indian"
                              ? "Indian Donor"
                              : donorType ===
                                "nri"
                              ? "NRI Donor"
                              : "Foreign Donor"
                          }
                        />

                        <SummaryItem
                          label="Frequency"
                          value={
                            frequency ===
                            "one-time"
                              ? "Give Once"
                              : "Give Monthly"
                          }
                        />

                        <SummaryItem
                          label="Name"
                          value={
                            donorName
                          }
                        />

                        <SummaryItem
                          label="Mobile"
                          value={
                            mobile
                          }
                        />

                        <SummaryItem
                          label="Email"
                          value={
                            email
                          }
                        />

                        <SummaryItem
                          label="City"
                          value={
                            city
                          }
                        />

                        <SummaryItem
                          label="State"
                          value={
                            state
                          }
                        />

                        <SummaryItem
                          label="PIN Code"
                          value={
                            pinCode
                          }
                        />

                        <SummaryItem
                          label="Country"
                          value={
                            donorType ===
                            "indian"
                              ? "India"
                              : country
                          }
                        />

                        <SummaryItem
                          label="80G"
                          value={
                            donorType ===
                            "indian"
                              ? requires80G
                                ? "Required"
                                : "Not Required"
                              : "Not Applicable"
                          }
                        />

                      </div>

                    </div>

                  </div>

                  {/* TRACKING */}

                  {(tracking.utmSource ||
                    tracking.utmCampaign ||
                    tracking.buttonId) && (
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <div className="flex items-center gap-2">

                        <Sparkles
                          size={15}
                          className="text-[#D6A63A]"
                        />

                        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Campaign Attribution
                        </p>

                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {tracking.utmSource && (
                          <Tag
                            label={`Source: ${tracking.utmSource}`}
                          />
                        )}

                        {tracking.utmMedium && (
                          <Tag
                            label={`Medium: ${tracking.utmMedium}`}
                          />
                        )}

                        {tracking.utmCampaign && (
                          <Tag
                            label={`Campaign: ${tracking.utmCampaign}`}
                          />
                        )}

                        {tracking.buttonId && (
                          <Tag
                            label={`Button: ${tracking.buttonId}`}
                          />
                        )}

                      </div>

                    </div>
                  )}

                  {/* SECURITY */}

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">

                    <TrustItem
                      icon={
                        <LockKeyhole
                          size={17}
                        />
                      }
                      title="Secure"
                      text="Protected checkout"
                    />

                    <TrustItem
                      icon={
                        <ShieldCheck
                          size={17}
                        />
                      }
                      title="Verified"
                      text="Payment verification"
                    />

                    <TrustItem
                      icon={
                        <BadgeCheck
                          size={17}
                        />
                      }
                      title="Receipt"
                      text="Digital record"
                    />

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">

                    <button
                      type="button"
                      onClick={
                        previousStep
                      }
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                    >

                      <ArrowLeft
                        size={16}
                      />

                      Edit Details

                    </button>

                    <button
                      type="submit"
                      className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 px-7 text-xs font-black text-white shadow-xl shadow-teal-700/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
                    >

                      <CreditCard
                        size={17}
                      />

                      Donate{" "}
                      {formatAmount(
                        amount
                      )}

                      <ChevronRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />

                    </button>

                  </div>

                </div>
              )}

            </form>

            {/* ERROR */}

            {error && (
              <div className="border-t border-red-100 bg-red-50 px-5 py-4 sm:px-8">

                <div className="flex items-start gap-3">

                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <p className="text-xs font-bold leading-5 text-red-700">
                    {error}
                  </p>

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="space-y-5">

            {/* AMOUNT CARD */}

            <div className="rounded-3xl bg-[#102A43] p-6 text-white shadow-xl">

              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D9B65A]">
                Your Contribution
              </p>

              <p className="mt-3 text-4xl font-black">
                {amount > 0
                  ? formatAmount(amount)
                  : "₹0"}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/45">
                {frequency ===
                "monthly"
                  ? "Monthly support"
                  : "One-time support"}
              </p>

              <div className="mt-6 h-px bg-white/10" />

              <div className="mt-5 space-y-3">

                <SideRow
                  label="Donor"
                  value={
                    donorType ===
                    "indian"
                      ? "Indian"
                      : donorType ===
                        "nri"
                      ? "NRI"
                      : "Foreign"
                  }
                />

                <SideRow
                  label="Frequency"
                  value={
                    frequency ===
                    "one-time"
                      ? "Once"
                      : "Monthly"
                  }
                />

                <SideRow
                  label="Currency"
                  value="INR"
                />

              </div>

            </div>

            {/* WHY DONATE */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Heart
                  size={20}
                  fill="currentColor"
                />
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-900">
                Why Your Support Matters
              </h3>

              <div className="mt-5 space-y-4">

                {[
                  "Education and learning",
                  "Healthcare initiatives",
                  "Women empowerment",
                  "Community development",
                  "Child welfare",
                  "Emergency relief",
                ].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-teal-600"
                      />

                      <span className="text-xs font-semibold text-slate-600">
                        {item}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* SECURITY */}

            <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white">
                  <ShieldCheck
                    size={20}
                  />
                </div>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    Safe & Secure
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Secure payment experience
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                <SecurityRow
                  icon={
                    <LockKeyhole
                      size={15}
                    />
                  }
                  text="Encrypted payment process"
                />

                <SecurityRow
                  icon={
                    <CreditCard
                      size={15}
                    />
                  }
                  text="Secure Razorpay checkout"
                />

                <SecurityRow
                  icon={
                    <BadgeCheck
                      size={15}
                    />
                  }
                  text="Donation reference generated"
                />

              </div>

            </div>

          </aside>

        </div>

      </section>

      {/* ===================================================
          FOOTER TRUST
      =================================================== */}

      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:grid-cols-3 sm:px-7 lg:px-8">

          <FooterTrust
            icon={
              <ShieldCheck
                size={19}
              />
            }
            title="Secure Giving"
            text="Safe online payment process"
          />

          <FooterTrust
            icon={
              <BadgeCheck
                size={19}
              />
            }
            title="Transparent Process"
            text="Donation records and references"
          />

          <FooterTrust
            icon={
              <Heart
                size={19}
                fill="currentColor"
              />
            }
            title="Every Contribution Matters"
            text="Supporting meaningful community work"
          />

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-slate-800">
        {value || "—"}
      </p>

    </div>
  );
}

function Tag({
  label,
}: {
  label: string;
}) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[8px] font-bold text-slate-500">
      {label}
    </span>
  );
}

function SideRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-[10px] text-white/40">
        {label}
      </span>

      <span className="text-[10px] font-black text-white">
        {value}
      </span>

    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
        {icon}
      </div>

      <p className="mt-3 text-[10px] font-black text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        {text}
      </p>

    </div>
  );
}

function SecurityRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm">
        {icon}
      </div>

      <span className="text-[10px] font-semibold text-slate-600">
        {text}
      </span>

    </div>
  );
}

function FooterTrust({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        {icon}
      </div>

      <div>

        <p className="text-[10px] font-black text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-[9px] text-slate-400">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   RAZORPAY GLOBAL TYPES
========================================================= */

declare global {
  interface Window {
    Razorpay: new (
      options: any
    ) => {
      open: () => void;
    };

    dataLayer?: Record<
      string,
      unknown
    >[];
  }
}