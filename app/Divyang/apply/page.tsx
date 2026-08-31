"use client";

import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  CheckCircle2,
  FileText,
  HeartHandshake,
  Home,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

type FormDataType = {
  fullName: string;
  fatherName: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
  aadhaarNumber: string;
  disabilityType: string;
  disabilityPercentage: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
};

const initialForm: FormDataType = {
  fullName: "",
  fatherName: "",
  gender: "",
  dob: "",
  mobile: "",
  email: "",
  aadhaarNumber: "",
  disabilityType: "",
  disabilityPercentage: "",
  address: "",
  district: "",
  state: "Bihar",
  pincode: "",
};

export default function DivyangApplyPage() {
  const [form, setForm] = useState<FormDataType>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const updateField = (
    field: keyof FormDataType,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!form.fullName.trim()) {
      setMessage("Applicant name is required.");
      return;
    }

    if (!form.dob) {
      setMessage("Date of birth is required.");
      return;
    }

    if (!form.mobile.trim()) {
      setMessage("Mobile number is required.");
      return;
    }

    if (!form.address.trim()) {
      setMessage("Address is required.");
      return;
    }

    if (!form.district.trim()) {
      setMessage("District is required.");
      return;
    }

    if (!form.state.trim()) {
      setMessage("State is required.");
      return;
    }

    if (!form.pincode.trim()) {
      setMessage("Pincode is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/divyang/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      let data: any = null;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text ||
            "Unable to submit application."
        );
      }

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            "Unable to submit your application. Please try again later."
        );
      }

      setSuccess(true);

      setMessage(
        data?.message ||
          "Your application has been submitted successfully."
      );

      setForm(initialForm);
    } catch (error: any) {
      console.error(
        "Divyang application error:",
        error
      );

      setMessage(
        error?.message ||
          "Unable to submit your application. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8fb]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#123b4a] pb-20 pt-10 sm:pb-28">

        <div className="absolute inset-0">

          <div className="absolute left-[-10%] top-[-20%] h-[400px] w-[400px] rounded-full bg-[#1e7086]/40 blur-3xl" />

          <div className="absolute right-[-5%] top-[10%] h-[350px] w-[350px] rounded-full bg-[#f4b942]/15 blur-3xl" />

          <div className="absolute bottom-[-100px] left-[30%] h-[250px] w-[250px] rounded-full bg-[#ffffff]/5 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              <Home size={17} />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
              <ShieldCheck
                size={16}
                className="text-[#f4b942]"
              />
              Secure Application Portal
            </div>

          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#f4b942]/30 bg-[#f4b942]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4b942]">
                <Accessibility size={17} />
                Divyang Assistance Programme
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Empowering Every Ability.
                <span className="block text-[#f4b942]">
                  Supporting Every Journey.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Anand Jivan Foundation Trust is committed
                to supporting persons with disabilities
                through inclusive assistance, community
                support and opportunity-based programmes.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4b942] text-[#123b4a]">
                    <HeartHandshake size={20} />
                  </div>

                  <div>

                    <p className="text-xs font-black text-white">
                      Inclusive Support
                    </p>

                    <p className="mt-1 text-[11px] text-white/55">
                      Assistance with dignity
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f9e8f] text-white">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>

                    <p className="text-xs font-black text-white">
                      Simple Process
                    </p>

                    <p className="mt-1 text-[11px] text-white/55">
                      Submit your details online
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="relative">

              <div className="absolute inset-0 scale-105 rounded-[40px] bg-[#f4b942]/20 blur-3xl" />

              <div className="relative rounded-[32px] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4b942] to-[#f08c28] text-white shadow-xl">
                  <Sparkles size={28} />
                </div>

                <h2 className="mt-6 text-2xl font-black text-white">
                  Apply for Assistance
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  Complete the application form with
                  accurate information. Our team will
                  review your application as per programme
                  eligibility and available support.
                </p>

                <div className="mt-7 space-y-4">

                  {[
                    "Personal information",
                    "Disability details",
                    "Address and contact information",
                    "Application review",
                  ].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-[#f4b942]">
                          {index + 1}
                        </div>

                        <span className="text-sm text-white/75">
                          {item}
                        </span>
                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-[-1px] left-0 w-full">

          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="h-[70px] w-full sm:h-[100px]"
          >
            <path
              d="M0,35 C200,95 340,95 520,55 C720,10 880,10 1060,52 C1220,90 1340,85 1440,40 L1440,100 L0,100 Z"
              fill="#f4f8fb"
            />
          </svg>

        </div>

      </section>

      {/* APPLICATION AREA */}

      <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">

          {/* INFORMATION */}

          <aside className="space-y-6">

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123b4a] text-white">
                <FileText size={22} />
              </div>

              <h2 className="mt-5 text-xl font-black text-[#123b4a]">
                Before You Apply
              </h2>

              <div className="mt-6 space-y-5">

                {[
                  "Enter your name exactly as per official records.",
                  "Provide an active mobile number for communication.",
                  "Ensure date of birth and address are correct.",
                  "Submission does not automatically guarantee assistance.",
                ].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#2f9e8f]"
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {item}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="rounded-[28px] bg-gradient-to-br from-[#123b4a] to-[#1e6376] p-7 text-white shadow-xl">

              <Phone
                size={24}
                className="text-[#f4b942]"
              />

              <h3 className="mt-5 text-lg font-black">
                Need Assistance?
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/65">
                Contact Anand Jivan Foundation Trust
                for guidance regarding the application
                process.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#f4b942]"
              >
                Contact Our Team
                <ArrowRight size={17} />
              </Link>

            </div>

          </aside>

          {/* FORM */}

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-9 lg:p-10">

            <div className="flex flex-wrap items-start justify-between gap-5">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f9e8f]">
                  Online Application
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#123b4a] sm:text-3xl">
                  Divyang Assistance Application
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Please complete all required fields
                  marked with an asterisk.
                </p>

              </div>

              <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f8fb] text-[#123b4a] sm:flex">
                <UserRound size={25} />
              </div>

            </div>

            {message && (

              <div
                className={`mt-7 rounded-2xl border px-5 py-4 text-sm font-semibold ${
                  success
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-3">

                  {success ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Accessibility size={20} />
                  )}

                  {message}

                </div>

              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="mt-9 space-y-10"
            >

              {/* PERSONAL */}

              <div>

                <div className="mb-5 flex items-center gap-3">

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123b4a] text-xs font-black text-white">
                    1
                  </span>

                  <h3 className="font-black text-[#123b4a]">
                    Personal Information
                  </h3>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <Field
                    label="Applicant Full Name"
                    required
                  >
                    <input
                      value={form.fullName}
                      onChange={(e) =>
                        updateField(
                          "fullName",
                          e.target.value
                        )
                      }
                      placeholder="Enter full name"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Father / Guardian Name"
                  >
                    <input
                      value={form.fatherName}
                      onChange={(e) =>
                        updateField(
                          "fatherName",
                          e.target.value
                        )
                      }
                      placeholder="Enter name"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Gender"
                  >
                    <select
                      value={form.gender}
                      onChange={(e) =>
                        updateField(
                          "gender",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    >
                      <option value="">
                        Select gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>
                  </Field>

                  <Field
                    label="Date of Birth"
                    required
                  >
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        updateField(
                          "dob",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Mobile Number"
                    required
                  >
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) =>
                        updateField(
                          "mobile",
                          e.target.value
                        )
                      }
                      placeholder="Enter mobile number"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Email Address"
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        updateField(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="Enter email address"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Aadhaar Number"
                  >
                    <input
                      value={form.aadhaarNumber}
                      onChange={(e) =>
                        updateField(
                          "aadhaarNumber",
                          e.target.value
                        )
                      }
                      placeholder="Enter Aadhaar number"
                      maxLength={12}
                      className={inputClass}
                    />
                  </Field>

                </div>

              </div>

              {/* DISABILITY */}

              <div>

                <div className="mb-5 flex items-center gap-3">

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2f9e8f] text-xs font-black text-white">
                    2
                  </span>

                  <h3 className="font-black text-[#123b4a]">
                    Disability Information
                  </h3>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <Field
                    label="Type of Disability"
                  >
                    <select
                      value={form.disabilityType}
                      onChange={(e) =>
                        updateField(
                          "disabilityType",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    >
                      <option value="">
                        Select disability type
                      </option>

                      <option value="Locomotor Disability">
                        Locomotor Disability
                      </option>

                      <option value="Visual Impairment">
                        Visual Impairment
                      </option>

                      <option value="Hearing Impairment">
                        Hearing Impairment
                      </option>

                      <option value="Speech and Language Disability">
                        Speech and Language Disability
                      </option>

                      <option value="Intellectual Disability">
                        Intellectual Disability
                      </option>

                      <option value="Multiple Disabilities">
                        Multiple Disabilities
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>
                  </Field>

                  <Field
                    label="Disability Percentage"
                  >
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={
                        form.disabilityPercentage
                      }
                      onChange={(e) =>
                        updateField(
                          "disabilityPercentage",
                          e.target.value
                        )
                      }
                      placeholder="Example: 40"
                      className={inputClass}
                    />
                  </Field>

                </div>

              </div>

              {/* ADDRESS */}

              <div>

                <div className="mb-5 flex items-center gap-3">

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4b942] text-xs font-black text-[#123b4a]">
                    3
                  </span>

                  <h3 className="font-black text-[#123b4a]">
                    Address Information
                  </h3>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div className="md:col-span-2">

                    <Field
                      label="Complete Address"
                      required
                    >
                      <textarea
                        rows={4}
                        value={form.address}
                        onChange={(e) =>
                          updateField(
                            "address",
                            e.target.value
                          )
                        }
                        placeholder="Enter complete residential address"
                        className={`${inputClass} resize-none`}
                      />
                    </Field>

                  </div>

                  <Field
                    label="District"
                    required
                  >
                    <input
                      value={form.district}
                      onChange={(e) =>
                        updateField(
                          "district",
                          e.target.value
                        )
                      }
                      placeholder="Enter district"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="State"
                    required
                  >
                    <input
                      value={form.state}
                      onChange={(e) =>
                        updateField(
                          "state",
                          e.target.value
                        )
                      }
                      placeholder="Enter state"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Pincode"
                    required
                  >
                    <input
                      value={form.pincode}
                      onChange={(e) =>
                        updateField(
                          "pincode",
                          e.target.value
                        )
                      }
                      placeholder="Enter pincode"
                      maxLength={6}
                      className={inputClass}
                    />
                  </Field>

                </div>

              </div>

              {/* SUBMIT */}

              <div className="rounded-[24px] bg-[#f4f8fb] p-5 sm:p-6">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                  <div>

                    <p className="text-sm font-black text-[#123b4a]">
                      Ready to submit your application?
                    </p>

                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      Please verify your information before
                      submitting the application.
                    </p>

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-13 min-w-[210px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#123b4a] to-[#1e6376] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={19} />
                      </>
                    )}

                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2f9e8f] focus:ring-4 focus:ring-[#2f9e8f]/10";

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-black text-[#123b4a]">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </span>

      {children}

    </label>
  );
}
