"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CERTIFICATE_FEE = 2250;

export default function CertificatePaymentPage() {
  const searchParams = useSearchParams();

  const applicationId =
    searchParams.get("applicationId") || "";

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [application, setApplication] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!applicationId) {
      setError(
        "Application ID is missing."
      );
      setLoading(false);
      return;
    }

    loadApplication();
  }, [applicationId]);

  async function loadApplication() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/internship/certificate/payment?applicationId=${encodeURIComponent(
          applicationId
        )}`,
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load application."
        );
      }

      setApplication(
        data.application
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load application."
      );
    } finally {
      setLoading(false);
    }
  }

  function loadRazorpay() {
    return new Promise<boolean>(
      (resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script =
          document.createElement("script");

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () =>
          resolve(true);

        script.onerror = () =>
          resolve(false);

        document.body.appendChild(
          script
        );
      }
    );
  }

  async function startPayment() {
    try {
      setProcessing(true);
      setError("");

      const loaded =
        await loadRazorpay();

      if (!loaded) {
        throw new Error(
          "Payment gateway could not be loaded."
        );
      }

      const response = await fetch(
        "/api/internship/certificate/payment",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            applicationId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to create payment."
        );
      }

      const options = {
        key: data.key,

        amount: data.amount,

        currency: "INR",

        name:
          "Anand Jivan Foundation Trust",

        description:
          "Internship Certificate Fee",

        order_id:
          data.orderId,

        prefill: {
          name:
            application?.student?.name ||
            "",
          email:
            application?.student?.email ||
            "",
          contact:
            application?.student?.phone ||
            "",
        },

        theme: {
          color: "#c66b00",
        },

        handler:
          async function (
            paymentResponse: any
          ) {
            await verifyPayment(
              paymentResponse
            );
          },

        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      setProcessing(false);

      setError(
        err instanceof Error
          ? err.message
          : "Payment could not be started."
      );
    }
  }

  async function verifyPayment(
    paymentResponse: any
  ) {
    try {
      const response = await fetch(
        "/api/internship/certificate/payment/verify",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            applicationId,

            razorpay_order_id:
              paymentResponse.razorpay_order_id,

            razorpay_payment_id:
              paymentResponse.razorpay_payment_id,

            razorpay_signature:
              paymentResponse.razorpay_signature,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Payment verification failed."
        );
      }

      window.location.href =
        `/internship/certificate/success?applicationId=${encodeURIComponent(
          applicationId
        )}`;
    } catch (err) {
      setProcessing(false);

      setError(
        err instanceof Error
          ? err.message
          : "Payment verification failed."
      );
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] flex items-center justify-center">
        <div className="rounded-xl border bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-600">
            Checking certificate eligibility...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8]">
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* HEADER */}

        <div className="rounded-t-2xl bg-[#111827] px-6 py-7 text-white">
          <p className="text-xs font-bold tracking-[0.2em] text-orange-400">
            ANAND JIVAN FOUNDATION TRUST
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            Internship Certificate
          </h1>

          <p className="mt-1 text-sm text-gray-300">
            Certificate issuance and payment portal
          </p>
        </div>

        <div className="rounded-b-2xl border border-gray-200 bg-white p-6 shadow-sm">

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {application && (
            <div className="grid gap-6 md:grid-cols-2">

              {/* APPLICATION DETAILS */}

              <div className="rounded-xl border bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Application Details
                </p>

                <div className="mt-5 space-y-4">

                  <Detail
                    label="Application ID"
                    value={
                      application.applicationId
                    }
                  />

                  <Detail
                    label="Student Name"
                    value={
                      application.student
                        ?.name
                    }
                  />

                  <Detail
                    label="Email"
                    value={
                      application.student
                        ?.email
                    }
                  />

                  <Detail
                    label="Programme"
                    value={
                      application.internship
                        ?.area
                    }
                  />

                  <Detail
                    label="Duration"
                    value={
                      application.internship
                        ?.duration
                    }
                  />

                  <Detail
                    label="Status"
                    value={
                      application.status
                    }
                  />

                </div>
              </div>

              {/* PAYMENT */}

              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wide text-orange-700">
                  Certificate Fee
                </p>

                <div className="mt-6">

                  <p className="text-sm text-gray-600">
                    Internship Certificate
                    Processing / Issuance Fee
                  </p>

                  <p className="mt-3 text-4xl font-black text-gray-900">
                    ₹2,250
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Inclusive of applicable charges
                    as configured by AJFT.
                  </p>

                </div>

                <div className="mt-6 rounded-lg bg-white p-4 text-sm text-gray-600">
                  <p>
                    ✓ Internship requirements completed
                  </p>

                  <p className="mt-2">
                    ✓ Certificate eligible
                  </p>

                  <p className="mt-2">
                    ✓ Secure online payment
                  </p>

                  <p className="mt-2">
                    ✓ Certificate generated after
                    successful verification
                  </p>
                </div>

                <button
                  onClick={startPayment}
                  disabled={processing}
                  className="mt-6 w-full rounded-lg bg-[#c66b00] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#a95700] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing
                    ? "Processing..."
                    : "Pay ₹2,250 & Get Certificate"}
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}