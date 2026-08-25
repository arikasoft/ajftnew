"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Application = {
  applicationId: string;

  student?: {
    name?: string;
    email?: string;
  };

  internship?: {
    area?: string;
    duration?: string;
  };

  status?: string;
  certificatePaymentStatus?: string;
};

export default function CertificateSuccessPage() {
  const searchParams = useSearchParams();

  const applicationId =
    searchParams.get("applicationId") || "";

  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!applicationId) {
      setError("Application ID is missing.");
      setLoading(false);
      return;
    }

    loadApplication();
  }, [applicationId]);

  async function loadApplication() {
    try {
      const response = await fetch(
        `/api/internship/certificate/success?applicationId=${encodeURIComponent(
          applicationId
        )}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load certificate details."
        );
      }

      setApplication(data.application);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load certificate details."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f6f8] flex items-center justify-center">
        <div className="rounded-xl bg-white px-8 py-6 shadow">
          <p className="text-sm font-semibold text-gray-600">
            Verifying certificate payment...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f4f6f8] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-white p-8 text-center shadow">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            Certificate Status
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <a
            href="/internship"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-bold text-white"
          >
            Back to Internship
          </a>
        </div>
      </main>
    );
  }

  const certificateReady =
    application?.certificatePaymentStatus ===
      "PAID";

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <div className="mx-auto max-w-4xl px-4 py-10">

        {/* GOVERNMENT STYLE HEADER */}

        <div className="border border-gray-300 bg-white">

          <div className="border-b-4 border-[#b45309] bg-[#111827] px-6 py-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              ANAND JIVAN FOUNDATION TRUST
            </p>

            <h1 className="mt-1 text-xl font-bold">
              Internship Certificate Portal
            </h1>

            <p className="mt-1 text-xs text-gray-300">
              Certificate Issuance & Verification
            </p>
          </div>

          {/* SUCCESS */}

          <div className="px-6 py-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-200 bg-green-50">
              <span className="text-4xl text-green-600">
                ✓
              </span>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
              Payment Successful
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Certificate Payment Received
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
              Your certificate payment has been successfully
              verified. Your internship certificate is now
              available for download.
            </p>

            {/* APPLICATION ID */}

            <div className="mx-auto mt-7 max-w-md border border-gray-300 bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                Application ID
              </p>

              <p className="mt-2 font-mono text-xl font-bold text-gray-900">
                {application?.applicationId}
              </p>
            </div>

            {/* STUDENT DETAILS */}

            <div className="mx-auto mt-7 max-w-2xl border border-gray-200 bg-white text-left">

              <div className="border-b bg-gray-100 px-5 py-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
                  Certificate Applicant
                </h3>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2">

                <Detail
                  label="Student Name"
                  value={
                    application?.student?.name
                  }
                />

                <Detail
                  label="Email"
                  value={
                    application?.student?.email
                  }
                />

                <Detail
                  label="Internship Programme"
                  value={
                    application?.internship?.area
                  }
                />

                <Detail
                  label="Duration"
                  value={
                    application?.internship?.duration
                  }
                />

                <Detail
                  label="Payment Status"
                  value="PAID"
                />

                <Detail
                  label="Certificate Status"
                  value={
                    certificateReady
                      ? "READY"
                      : "PROCESSING"
                  }
                />

              </div>
            </div>

            {/* ACTION */}

            {certificateReady ? (
              <div className="mt-8">

                <a
                  href={`/api/internship/certificate/download?applicationId=${encodeURIComponent(
                    applicationId
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#b45309] px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#92400e]"
                >
                  Download Internship Certificate
                </a>

                <p className="mt-3 text-xs text-gray-500">
                  Keep a digital copy of your certificate
                  for your records.
                </p>

              </div>
            ) : (
              <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                Payment has been received. Certificate
                generation is in progress.
              </div>
            )}

            {/* PRINT */}

            <button
              onClick={() => window.print()}
              className="mt-5 block mx-auto text-sm font-semibold text-gray-600 underline hover:text-gray-900"
            >
              Print Payment Confirmation
            </button>

          </div>

          {/* FOOTER */}

          <div className="border-t bg-gray-50 px-6 py-5 text-center">
            <p className="text-xs font-bold text-gray-700">
              Anand Jivan Foundation Trust
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Please retain your Application ID for
              certificate verification.
            </p>
          </div>

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
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}