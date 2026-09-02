"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Award,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";

type VerificationData = {
  certificateId: string;
  studentId: string;
  fullName: string;
  course: string;
  certificateEligible: boolean;
  issuedAt?: string;
  organization: string;
};

export default function VerifyCertificatePage({
  params,
}: {
  params: Promise<{
    certificateId: string;
  }>;
}) {
  const [
    certificateId,
    setCertificateId,
  ] = useState("");

  const [
    data,
    setData,
  ] =
    useState<VerificationData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    async function loadParams() {
      const resolvedParams =
        await params;

      setCertificateId(
        resolvedParams.certificateId
      );
    }

    loadParams();
  }, [params]);

  useEffect(() => {
    if (!certificateId) {
      return;
    }

    async function verifyCertificate() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `/api/certificate/verify/${encodeURIComponent(
              certificateId
            )}`,
            {
              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          setError(
            result.message ||
              "Certificate verification failed."
          );

          return;
        }

        if (
          result.success &&
          result.valid
        ) {
          setData(
            result.data
          );
        } else {
          setError(
            result.message ||
              "Certificate is invalid."
          );
        }
      } catch (error) {
        console.error(
          "VERIFY ERROR:",
          error
        );

        setError(
          "Unable to verify certificate."
        );
      } finally {
        setLoading(false);
      }
    }

    verifyCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061733]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.2),transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(6,91,156,0.25),transparent_40%)]" />

        <div className="relative text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white/10">

            <Loader2 className="h-10 w-10 animate-spin text-[#d4af37]" />

          </div>

          <p className="mt-6 text-xs font-black tracking-[0.25em] text-white/70">
            VERIFYING CERTIFICATE
          </p>

        </div>

      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061733] p-6">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.15),transparent_35%)]" />

        <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white p-10 text-center shadow-2xl">

          <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-red-800 via-red-500 to-red-800" />

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-600">

            <XCircle className="h-12 w-12" />

          </div>

          <p className="mt-7 text-xs font-black tracking-[0.25em] text-red-500">
            VERIFICATION FAILED
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#071a38]">
            Certificate Not Verified
          </h1>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            {error ||
              "The certificate could not be verified."}
          </p>

          <div className="mt-7 rounded-2xl bg-slate-50 p-4">

            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Certificate ID
            </p>

            <p className="mt-2 break-all text-sm font-black text-[#071a38]">
              {certificateId}
            </p>

          </div>

          <Link
            href="/"
            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#071a38] px-6 py-4 text-sm font-black text-white"
          >
            Back to Website
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#edf1f5] p-4 py-8 sm:p-8">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.12),transparent_30%)]" />

      <section className="relative mx-auto max-w-4xl">

        <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl">

          {/* TOP */}

          <div className="relative overflow-hidden bg-gradient-to-r from-[#061733] via-[#082d63] to-[#087b89] px-6 py-10 text-center text-white">

            <div className="absolute inset-0 opacity-10">

              <div className="h-full w-full bg-[radial-gradient(circle,_white_1px,transparent_1px)] [background-size:20px_20px]" />

            </div>

            <div className="relative">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#d4af37] bg-white p-3 shadow-xl">

                <img
                  src="/logo.png"
                  alt="AJFT Logo"
                  className="h-full w-full object-contain"
                />

              </div>

              <p className="mt-6 text-xs font-black tracking-[0.3em] text-[#f4d878]">
                ANAND JIVAN FOUNDATION TRUST
              </p>

              <h1 className="mt-4 text-3xl font-black">
                Certificate Verification
              </h1>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-5 py-2 text-xs font-black text-emerald-200">

                <ShieldCheck className="h-5 w-5" />

                CERTIFICATE VERIFIED

              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div className="relative p-6 sm:p-10">

            {/* WATERMARK */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.035]">

              <img
                src="/logo.png"
                alt=""
                className="h-[350px] w-[350px] object-contain"
              />

            </div>

            <div className="relative">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">

                <CheckCircle2 className="h-11 w-11" />

              </div>

              <div className="mt-6 text-center">

                <p className="text-xs font-black tracking-[0.2em] text-emerald-600">
                  AUTHENTIC DOCUMENT
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#071a38]">

                  Certificate Successfully Verified

                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">

                  This certificate has been verified against
                  the official digital records of Anand Jivan
                  Foundation Trust.

                </p>

              </div>

              {/* STUDENT */}

              <div className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-[#d4af37]/40 bg-[#fffdf6] p-6 shadow-sm sm:p-8">

                <div className="flex items-center gap-3 border-b border-[#d4af37]/30 pb-5">

                  <Award className="h-7 w-7 text-[#b8860b]" />

                  <div>

                    <p className="text-[10px] font-black tracking-[0.18em] text-[#b8860b]">
                      CERTIFICATE HOLDER
                    </p>

                    <h3 className="mt-1 text-xl font-black text-[#071a38]">
                      Verified Student Details
                    </h3>

                  </div>

                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">

                  <Detail
                    label="Full Name"
                    value={data.fullName}
                  />

                  <Detail
                    label="Student ID"
                    value={data.studentId}
                  />

                  <Detail
                    label="Programme"
                    value={data.course}
                    full
                  />

                  <Detail
                    label="Certificate ID"
                    value={data.certificateId}
                    full
                  />

                  <Detail
                    label="Issuing Organization"
                    value={data.organization}
                    full
                  />

                </div>

              </div>

              {/* SECURITY */}

              <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-50 p-5 text-center sm:flex-row">

                <ShieldCheck className="h-7 w-7 text-[#b8860b]" />

                <p className="text-sm font-semibold text-slate-600">

                  This certificate verification result was
                  generated directly from the AJFT digital
                  certificate database.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

function Detail({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={
        full
          ? "sm:col-span-2"
          : ""
      }
    >
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-black text-[#071a38]">
        {value}
      </p>
    </div>
  );
}