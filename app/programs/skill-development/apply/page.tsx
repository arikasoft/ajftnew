"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  GraduationCap,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

type ApplicationResult = {
  applicationId: string;
  studentId: string;
  fullName: string;
  email: string;
  temporaryPassword: string;
  loginUrl: string;
  course?: string;
};

type FormDataType = {
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  qualification: string;
  course: string;
};

const initialFormData: FormDataType = {
  fullName: "",
  fatherName: "",
  dateOfBirth: "",
  gender: "",
  mobile: "",
  email: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  qualification: "",
  course: "",
};

export default function SkillDevelopmentApplyPage() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState<ApplicationResult | null>(
      null
    );

  const [formData, setFormData] =
    useState<FormDataType>(
      initialFormData
    );

  const [copied, setCopied] =
    useState("");

  function updateField(
    name: keyof FormDataType,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function copyText(
    label: string,
    value: string
  ) {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(label);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      // Clipboard permission may not be available.
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const cleanMobile =
        formData.mobile.replace(
          /\D/g,
          ""
        );

      const response =
        await fetch(
          "/api/student/apply",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              fullName:
                formData.fullName.trim(),

              fatherName:
                formData.fatherName.trim(),

              dateOfBirth:
                formData.dateOfBirth,

              gender:
                formData.gender,

              mobile:
                cleanMobile,

              email:
                formData.email
                  .trim()
                  .toLowerCase(),

              address:
                formData.address.trim(),

              state:
                formData.state.trim(),

              district:
                formData.district.trim(),

              pincode:
                formData.pincode.trim(),

              qualification:
                formData.qualification.trim(),

              courseName:
                formData.course ||
                "Skill Development Programme",
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to submit application."
        );
      }

      const apiData =
        data.data || {};

      const password =
        apiData.temporaryPassword ||
        apiData.credentials
          ?.password ||
        "";

      if (
        !apiData.applicationId ||
        !apiData.studentId
      ) {
        throw new Error(
          "Application submitted but student credentials were not generated."
        );
      }

      setResult({
        applicationId:
          apiData.applicationId,

        studentId:
          apiData.studentId,

        fullName:
          apiData.fullName ||
          formData.fullName,

        email:
          apiData.email ||
          formData.email,

        temporaryPassword:
          password,

        loginUrl:
          apiData.loginUrl ||
          "/student/login",

        course:
          apiData.course ||
          formData.course,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit your application."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     SUCCESS SCREEN
  ===================================================== */

  if (result) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-10 sm:px-6 sm:py-14">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl">
            {/* Top */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#052e2b] via-[#065f5b] to-[#0f766e] p-7 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/5" />

              <div className="absolute -bottom-24 left-1/3 h-48 w-96 rounded-[100%] bg-emerald-400/10 blur-2xl" />

              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
                  <CheckCircle2 className="h-11 w-11 text-emerald-200" />
                </div>

                <p className="mt-7 text-xs font-black tracking-[0.25em] text-emerald-200">
                  APPLICATION RECEIVED
                </p>

                <h1 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
                  Welcome to the Skill Development Programme
                </h1>

                <p className="mt-5 max-w-2xl leading-8 text-white/75">
                  Your application has been submitted
                  successfully and your student account
                  has been created.
                </p>
              </div>

              {/* Wave */}

              <div className="absolute bottom-0 left-0 w-full">
                <svg
                  viewBox="0 0 1440 100"
                  className="block h-12 w-full sm:h-16"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,55 C180,100 360,5 540,55 C720,105 900,10 1080,55 C1260,100 1350,35 1440,50 L1440,100 L0,100 Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}

            <div className="p-6 sm:p-10">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    Your Login Credentials
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Save these details securely.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />

                  Account Created
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Credential
                  label="Application ID"
                  value={
                    result.applicationId
                  }
                  onCopy={() =>
                    copyText(
                      "applicationId",
                      result.applicationId
                    )
                  }
                  copied={
                    copied ===
                    "applicationId"
                  }
                />

                <Credential
                  label="Student ID"
                  value={
                    result.studentId
                  }
                  onCopy={() =>
                    copyText(
                      "studentId",
                      result.studentId
                    )
                  }
                  copied={
                    copied ===
                    "studentId"
                  }
                />

                <Credential
                  label="Login Email"
                  value={
                    result.email
                  }
                  onCopy={() =>
                    copyText(
                      "email",
                      result.email
                    )
                  }
                  copied={
                    copied === "email"
                  }
                />

                <Credential
                  label="Temporary Password"
                  value={
                    result.temporaryPassword ||
                    "Generated successfully"
                  }
                  sensitive
                  onCopy={() =>
                    copyText(
                      "password",
                      result.temporaryPassword
                    )
                  }
                  copied={
                    copied ===
                    "password"
                  }
                />
              </div>

              {/* Course */}

              {result.course && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Selected Course
                  </p>

                  <p className="mt-2 font-bold text-slate-900">
                    {result.course}
                  </p>
                </div>
              )}

              {/* Important */}

              <div className="mt-6 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <LockKeyhole className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-black text-amber-950">
                      Important Security Information
                    </p>

                    <p className="mt-2 text-sm leading-7 text-amber-900/80">
                      Please save your Student ID and
                      temporary password securely. These
                      credentials will be required to access
                      your student dashboard and complete
                      the 70-question assessment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Assessment */}

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <InfoCard
                  title="70"
                  description="Questions"
                />

                <InfoCard
                  title="45"
                  description="Passing Marks"
                />

                <InfoCard
                  title="Certificate"
                  description="Auto Generated"
                />
              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={
                    result.loginUrl ||
                    "/student/login"
                  }
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 font-black text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5"
                >
                  Student Login

                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/programs/skill-development"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to Programme
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     APPLICATION FORM
  ===================================================== */

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-40 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      {/* Header */}

      <section className="relative border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Link
            href="/programs/skill-development"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"
          >
            <ArrowLeft className="h-5 w-5" />

            Back to Programme
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />

            Secure Application
          </div>
        </div>
      </section>

      {/* Main */}

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}

          <aside className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#052e2b] via-[#065f5b] to-[#0f766e] p-7 text-white shadow-2xl lg:sticky lg:top-8 lg:p-9">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/10" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur">
                <GraduationCap className="h-8 w-8 text-emerald-200" />
              </div>

              <p className="mt-7 text-xs font-black tracking-[0.25em] text-emerald-200">
                AJFT EDUCATION INITIATIVE
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight">
                Skill Development Application
              </h1>

              <p className="mt-5 leading-8 text-white/70">
                Complete your application to receive your
                student account and assessment access.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Unique Student ID",
                  "Secure Student Login Account",
                  "70 Question Assessment",
                  "45 Marks Required to Pass",
                  "Automatic Certificate Generation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    </div>

                    <span className="text-sm font-medium text-white/85">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="text-sm leading-7 text-white/60">
                  Your information is used for programme
                  enrollment and student account management.
                </p>
              </div>
            </div>

            {/* Wave */}

            <div className="absolute bottom-0 left-0 w-full opacity-30">
              <svg
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                className="h-16 w-full"
              >
                <path
                  d="M0,70 C180,20 360,110 540,60 C720,10 900,100 1080,55 C1260,15 1350,80 1440,45 L1440,100 L0,100 Z"
                  fill="white"
                />
              </svg>
            </div>
          </aside>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white bg-white/95 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700">
                <UserPlus className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Student Information
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Please enter accurate information to
                  create your student account.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Input
                label="Full Name *"
                value={formData.fullName}
                onChange={(value) =>
                  updateField(
                    "fullName",
                    value
                  )
                }
                required
                placeholder="Enter full name"
              />

              <Input
                label="Father's Name"
                value={
                  formData.fatherName
                }
                onChange={(value) =>
                  updateField(
                    "fatherName",
                    value
                  )
                }
                placeholder="Enter father's name"
              />

              <Input
                label="Date of Birth"
                type="date"
                value={
                  formData.dateOfBirth
                }
                onChange={(value) =>
                  updateField(
                    "dateOfBirth",
                    value
                  )
                }
              />

              <Select
                label="Gender"
                value={formData.gender}
                onChange={(value) =>
                  updateField(
                    "gender",
                    value
                  )
                }
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
              />

              <Input
                label="Mobile Number *"
                type="tel"
                value={formData.mobile}
                onChange={(value) =>
                  updateField(
                    "mobile",
                    value
                  )
                }
                required
                placeholder="10 digit mobile number"
                maxLength={10}
              />

              <Input
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={(value) =>
                  updateField(
                    "email",
                    value
                  )
                }
                required
                placeholder="example@email.com"
              />

              <Select
                label="State *"
                value={formData.state}
                onChange={(value) =>
                  updateField(
                    "state",
                    value
                  )
                }
                options={[
                  "Bihar",
                  "Uttar Pradesh",
                  "Jharkhand",
                  "West Bengal",
                  "Madhya Pradesh",
                  "Delhi",
                  "Other",
                ]}
                required
              />

              <Input
                label="District *"
                value={formData.district}
                onChange={(value) =>
                  updateField(
                    "district",
                    value
                  )
                }
                required
                placeholder="Enter district"
              />

              <Input
                label="Pincode"
                value={formData.pincode}
                onChange={(value) =>
                  updateField(
                    "pincode",
                    value
                  )
                }
                placeholder="Enter pincode"
                maxLength={6}
              />

              <Input
                label="Qualification"
                value={
                  formData.qualification
                }
                onChange={(value) =>
                  updateField(
                    "qualification",
                    value
                  )
                }
                placeholder="Highest qualification"
              />

              <div className="sm:col-span-2">
                <Select
                  label="Select Course *"
                  value={formData.course}
                  onChange={(value) =>
                    updateField(
                      "course",
                      value
                    )
                  }
                  options={[
                    "Digital Literacy & Computer Skills",
                    "Office Productivity Skills",
                    "Digital Entrepreneurship",
                    "Employability Skills",
                    "Basic Information Technology",
                  ]}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <TextArea
                  label="Full Address"
                  value={
                    formData.address
                  }
                  onChange={(value) =>
                    updateField(
                      "address",
                      value
                    )
                  }
                  placeholder="Enter complete address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 px-6 py-4 font-black text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />

                  Creating Student Account...
                </>
              ) : (
                <>
                  Submit Application

                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-slate-400">
              By submitting this form, you confirm that
              the information provided is accurate.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   CREDENTIAL CARD
========================================================= */

function Credential({
  label,
  value,
  onCopy,
  copied,
  sensitive = false,
}: {
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
  sensitive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-slate-500">
            {label}
          </p>

          <p
            className={`mt-2 break-all font-black ${
              sensitive
                ? "text-emerald-700"
                : "text-slate-950"
            }`}
          >
            {value}
          </p>
        </div>

        {onCopy && value && (
          <button
            type="button"
            onClick={onCopy}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-emerald-200 hover:text-emerald-700"
            title="Copy"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 text-center">
      <p className="text-xl font-black text-emerald-700">
        {title}
      </p>

      <p className="mt-1 text-xs font-bold text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) =>
          onChange(
            type === "tel"
              ? event.target.value.replace(
                  /\D/g,
                  ""
                )
              : event.target.value
          )
        }
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

/* =========================================================
   SELECT
========================================================= */

function Select({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}
      </span>

      <select
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        <option value="">
          Select
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function TextArea({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">
        {label}
      </span>

      <textarea
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}