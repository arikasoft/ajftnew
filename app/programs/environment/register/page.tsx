"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Copy,
  Leaf,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  TreePine,
  User,
  X,
} from "lucide-react";

type RegistrationResult = {
  participantId: string;
  fullName: string;
  email: string;
  temporaryPassword: string;
  loginUrl: string;
};

export default function EnvironmentRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    state: "Bihar",
    district: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState<RegistrationResult | null>(
      null
    );

  const [copied, setCopied] =
    useState("");

  function updateField(
    field: keyof typeof formData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function copyText(
    text: string,
    type: string
  ) {
    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopied(type);

      window.setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      setError(
        "Unable to copy. Please copy the details manually."
      );
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const fullName =
      formData.fullName.trim();

    const mobile =
      formData.mobile.replace(
        /\D/g,
        ""
      );

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const state =
      formData.state.trim();

    const district =
      formData.district.trim();

    if (
      !fullName ||
      !mobile ||
      !email ||
      !state ||
      !district
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    if (mobile.length !== 10) {
      setError(
        "Please enter a valid 10 digit mobile number."
      );

      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/environment/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              fullName,
              mobile,
              email,
              state,
              district,
              address:
                formData.address.trim(),
              pincode:
                formData.pincode.trim(),
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to create your account."
        );
      }

      if (
        !result.success ||
        !result.data
      ) {
        throw new Error(
          result.message ||
            "Unable to create your account."
        );
      }

      setSuccess({
        participantId:
          result.data.participantId,
        fullName:
          result.data.fullName,
        email:
          result.data.email,
        temporaryPassword:
          result.data
            .temporaryPassword,
        loginUrl:
          result.data.loginUrl ||
          "/environment/login",
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />

        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-lime-200/50 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      {/* TOP SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-lime-300 blur-3xl" />

          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/programs/environment"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Environment Programme
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-100 backdrop-blur">
                <Sparkles className="h-4 w-4 text-lime-300" />
                AJFT Environment Programme
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                Start Your
                <span className="block bg-gradient-to-r from-lime-300 to-emerald-300 bg-clip-text text-transparent">
                  Green Journey.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100/80 sm:text-lg">
                Create your participant account and
                submit verified tree plantation
                contributions through the AJFT
                Environment Programme.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <TreePine className="h-8 w-8 text-lime-300" />

                <p className="mt-4 text-sm font-bold text-white">
                  Plant Trees
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-100/70">
                  Build a greener future
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <ShieldCheck className="h-8 w-8 text-emerald-300" />

                <p className="mt-4 text-sm font-bold text-white">
                  Get Verified
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-100/70">
                  Digital contribution record
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            className="block w-full"
          >
            <path
              d="M0,60 C220,110 460,10 720,55 C980,100 1200,20 1440,55 L1440,110 L0,110 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* FORM */}
      <section className="relative z-10 mx-auto -mt-4 max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* REGISTRATION FORM */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <User className="h-6 w-6" />
                </div>

                <h2 className="mt-4 text-2xl font-black text-slate-900">
                  Participant Registration
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Please enter your correct details.
                  Your participant credentials will be
                  generated after successful registration.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                <p className="text-xs font-bold text-emerald-700">
                  PROGRAMME ACCESS
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Free Registration
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <X className="mt-0.5 h-5 w-5 shrink-0" />

                <p>{error}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* FULL NAME */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Full Name
                    <span className="text-red-500">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={
                        formData.fullName
                      }
                      onChange={(event) =>
                        updateField(
                          "fullName",
                          event.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                {/* MOBILE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Mobile Number
                    <span className="text-red-500">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      value={
                        formData.mobile
                      }
                      onChange={(event) =>
                        updateField(
                          "mobile",
                          event.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(0, 10)
                        )
                      }
                      placeholder="10 digit mobile number"
                      maxLength={10}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email Address
                    <span className="text-red-500">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      value={
                        formData.email
                      }
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                {/* STATE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    State
                    <span className="text-red-500">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={
                        formData.state
                      }
                      onChange={(event) =>
                        updateField(
                          "state",
                          event.target.value
                        )
                      }
                      placeholder="Enter state"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                {/* DISTRICT */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    District
                    <span className="text-red-500">
                      {" "}
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={
                        formData.district
                      }
                      onChange={(event) =>
                        updateField(
                          "district",
                          event.target.value
                        )
                      }
                      placeholder="Enter district"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Complete Address
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      Optional
                    </span>
                  </label>

                  <textarea
                    value={
                      formData.address
                    }
                    onChange={(event) =>
                      updateField(
                        "address",
                        event.target.value
                      )
                    }
                    rows={3}
                    placeholder="Village / Street / Panchayat / Block / Area"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                {/* PINCODE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Pincode
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      Optional
                    </span>
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={
                      formData.pincode
                    }
                    onChange={(event) =>
                      updateField(
                        "pincode",
                        event.target.value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(0, 6)
                      )
                    }
                    placeholder="Enter pincode"
                    maxLength={6}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Your Account...
                    </>
                  ) : (
                    <>
                      <Leaf className="h-5 w-5" />
                      Create Environment Account
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  By registering, you agree to submit
                  correct information. Programme rewards
                  are subject to verification and approval.
                </p>
              </div>
            </form>
          </div>

          {/* SIDE INFO */}
          <aside className="space-y-5">
            <div className="rounded-[2rem] bg-gradient-to-br from-emerald-950 to-green-900 p-7 text-white shadow-xl">
              <div className="rounded-2xl bg-white/10 p-3 w-fit">
                <TreePine className="h-7 w-7 text-lime-300" />
              </div>

              <h3 className="mt-5 text-xl font-black">
                Your Green Account
              </h3>

              <p className="mt-3 text-sm leading-6 text-emerald-100/80">
                After registration, your account will
                receive a unique Participant ID and
                temporary login password.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-bold text-emerald-300">
                    PARTICIPANT ID
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    AJFT-ENV-2026-XXXXXXXX
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-bold text-emerald-300">
                    ACCOUNT ACCESS
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    Secure Participant Login
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />

              <h3 className="mt-4 font-black text-slate-900">
                What Happens Next?
              </h3>

              <div className="mt-5 space-y-4">
                {[
                  "Account is created",
                  "Participant ID is generated",
                  "Temporary password is provided",
                  "Login to your dashboard",
                  "Submit tree plantation",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
                      {index + 1}
                    </span>

                    <span className="text-sm font-medium text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-sm text-slate-500">
                Already registered?
              </p>

              <Link
                href="/environment/login"
                className="mt-4 flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Participant Login
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="bg-gradient-to-br from-emerald-700 via-green-600 to-emerald-600 px-6 py-8 text-center text-white sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                Registration Successful!
              </h2>

              <p className="mt-2 text-sm text-emerald-50/90">
                Welcome to the AJFT Environment
                Programme, {success.fullName}.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-center text-sm text-slate-500">
                Please save your login credentials.
                You will need them to access your
                Environment Dashboard.
              </p>

              <div className="mt-6 space-y-4">
                {/* ID */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black tracking-wider text-emerald-700">
                        PARTICIPANT ID
                      </p>

                      <p className="mt-2 break-all text-base font-black text-slate-900">
                        {
                          success.participantId
                        }
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          success.participantId,
                          "id"
                        )
                      }
                      className="rounded-xl bg-white p-3 text-emerald-700 shadow-sm transition hover:scale-105"
                      title="Copy Participant ID"
                    >
                      {copied === "id" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-black tracking-wider text-yellow-700">
                        <LockKeyhole className="h-4 w-4" />
                        TEMPORARY PASSWORD
                      </p>

                      <p className="mt-2 break-all text-xl font-black tracking-widest text-slate-900">
                        {
                          success.temporaryPassword
                        }
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          success.temporaryPassword,
                          "password"
                        )
                      }
                      className="rounded-xl bg-white p-3 text-yellow-700 shadow-sm transition hover:scale-105"
                      title="Copy Password"
                    >
                      {copied ===
                      "password" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Clipboard className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs leading-5 text-blue-700">
                  Important: Please save your
                  Participant ID and temporary password
                  before continuing.
                </p>
              </div>

              <Link
                href={
                  success.loginUrl ||
                  "/environment/login"
                }
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800"
              >
                Continue to Login
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}