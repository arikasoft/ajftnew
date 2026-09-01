"use client";

import Link from "next/link";
import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  FileCheck2,
  FileText,
  HeartHandshake,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type FormDataType = {
  fullName: string;
  fatherName: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  disabilityType: string;
  disabilityPercentage: string;
  udidNumber: string;
  assistanceRequired: string;
  familyIncome: string;
  occupation: string;
  declaration: boolean;
};

/* =========================================================
   INITIAL FORM
========================================================= */

const initialFormData: FormDataType = {
  fullName: "",
  fatherName: "",
  gender: "",
  dob: "",
  mobile: "",
  email: "",
  address: "",
  district: "",
  state: "Bihar",
  pincode: "",
  disabilityType: "",
  disabilityPercentage: "",
  udidNumber: "",
  assistanceRequired: "",
  familyIncome: "",
  occupation: "",
  declaration: false,
};

/* =========================================================
   OPTIONS
========================================================= */

const disabilityTypes = [
  "Locomotor Disability",
  "Visual Impairment",
  "Hearing Impairment",
  "Speech and Language Disability",
  "Intellectual Disability",
  "Learning Disability",
  "Mental Illness",
  "Autism Spectrum Disorder",
  "Multiple Disabilities",
  "Other",
];

const assistanceOptions = [
  "Medical Assistance",
  "Education Support",
  "Mobility Support",
  "Assistive Device",
  "Livelihood Support",
  "Skill Development",
  "Financial Assistance",
  "Counselling and Rehabilitation",
  "Other Support",
];

/* =========================================================
   RESPONSE TYPE
========================================================= */

type ApiResponse = {
  success?: boolean;
  message?: string;
  applicationId?: string;
  data?: {
    applicationId?: string;
    _id?: string;
  };
};

/* =========================================================
   PAGE
========================================================= */

export default function DivyangApplyPage() {
  const [formData, setFormData] =
    useState<FormDataType>(initialFormData);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [applicationId, setApplicationId] =
    useState("");

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progress = useMemo(() => {
    const fields = [
      formData.fullName,
      formData.fatherName,
      formData.gender,
      formData.dob,
      formData.mobile,
      formData.address,
      formData.district,
      formData.state,
      formData.pincode,
      formData.disabilityType,
      formData.disabilityPercentage,
      formData.assistanceRequired,
    ];

    const completed =
      fields.filter(Boolean).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [formData]);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  function updateField(
    field: keyof FormDataType,
    value: string | boolean
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =======================================================
     RESET
  ======================================================= */

  function resetApplication() {
    setFormData(initialFormData);
    setLoading(false);
    setMessage("");
    setSuccess(false);
    setApplicationId("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const payload = {
        fullName:
          formData.fullName.trim(),

        fatherName:
          formData.fatherName.trim(),

        gender:
          formData.gender.trim(),

        dob:
          formData.dob,

        mobile:
          formData.mobile.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        address:
          formData.address.trim(),

        district:
          formData.district.trim(),

        state:
          formData.state.trim(),

        pincode:
          formData.pincode.trim(),

        disabilityType:
          formData.disabilityType,

        disabilityPercentage:
          formData.disabilityPercentage,

        udidNumber:
          formData.udidNumber.trim(),

        assistanceRequired:
          formData.assistanceRequired,

        familyIncome:
          formData.familyIncome.trim(),

        occupation:
          formData.occupation.trim(),

        declaration:
          formData.declaration,
      };

      /* ================================================
         VALIDATION
      ================================================= */

      if (!payload.fullName) {
        throw new Error(
          "Please enter the applicant's full name."
        );
      }

      if (!payload.fatherName) {
        throw new Error(
          "Please enter father / guardian name."
        );
      }

      if (!payload.gender) {
        throw new Error(
          "Please select gender."
        );
      }

      if (!payload.dob) {
        throw new Error(
          "Please select date of birth."
        );
      }

      if (
        !/^[6-9]\d{9}$/.test(
          payload.mobile
        )
      ) {
        throw new Error(
          "Please enter a valid 10 digit mobile number."
        );
      }

      if (
        payload.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          payload.email
        )
      ) {
        throw new Error(
          "Please enter a valid email address."
        );
      }

      if (!payload.address) {
        throw new Error(
          "Please enter the complete address."
        );
      }

      if (!payload.district) {
        throw new Error(
          "Please enter the district."
        );
      }

      if (!payload.state) {
        throw new Error(
          "Please enter the state."
        );
      }

      if (
        !/^\d{6}$/.test(
          payload.pincode
        )
      ) {
        throw new Error(
          "Please enter a valid 6 digit PIN code."
        );
      }

      if (!payload.disabilityType) {
        throw new Error(
          "Please select the disability type."
        );
      }

      const percentage =
        Number(
          payload.disabilityPercentage
        );

      if (
        !payload.disabilityPercentage ||
        Number.isNaN(percentage) ||
        percentage < 1 ||
        percentage > 100
      ) {
        throw new Error(
          "Please enter a valid disability percentage between 1 and 100."
        );
      }

      if (!payload.assistanceRequired) {
        throw new Error(
          "Please select the assistance required."
        );
      }

      if (!payload.declaration) {
        throw new Error(
          "Please accept the declaration before submitting."
        );
      }

      /* ================================================
         API REQUEST
      ================================================= */

      const response =
        await fetch(
          "/api/divyang/apply",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const raw =
        await response.text();

      let result: ApiResponse | null =
        null;

      try {
        result =
          raw
            ? JSON.parse(raw)
            : null;
      } catch {
        throw new Error(
          `Invalid response received from server (${response.status}).`
        );
      }

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            `Unable to submit application (${response.status}).`
        );
      }

      /* ================================================
         GET OFFICIAL APPLICATION ID
      ================================================= */

      const officialApplicationId =
        String(
          result.applicationId ||
            result.data?.applicationId ||
            ""
        ).trim();

      if (!officialApplicationId) {
        throw new Error(
          "Application was submitted but the official Application ID was not returned. Please contact AJFT."
        );
      }

      setApplicationId(
        officialApplicationId
      );

      setSuccess(true);

      setMessage(
        result.message ||
          "Your application has been submitted successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "DIVYANG APPLICATION ERROR:",
        error
      );

      setSuccess(false);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your application. Please try again."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     SUCCESS PAGE
  ======================================================= */

  if (success && applicationId) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#F6F8FF]">

        <section className="relative overflow-hidden bg-gradient-to-br from-[#21164F] via-[#3730A3] to-[#0E7490] px-4 py-20">

          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,.25),transparent_30%)]" />

          <div className="relative mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white shadow-2xl">

              <CheckCircle2
                size={52}
                className="text-[#10B981]"
              />

            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-cyan-200">
              Application Successfully Submitted
            </p>

            <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">
              Thank You
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">
              Your Divyang Assistance
              application has been securely
              received by Anand Jivan
              Foundation Trust.
            </p>

          </div>

        </section>

        <section className="relative z-10 mx-auto -mt-10 max-w-3xl px-4 pb-16">

          <div className="rounded-[2rem] border border-white bg-white p-6 shadow-2xl sm:p-10">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">

                <FileCheck2 size={28} />

              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-[#7C3AED]">
                Official Application Reference
              </p>

              <p className="mt-4 break-all text-2xl font-black text-[#172033] sm:text-3xl">
                {applicationId}
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">

                <p className="text-sm font-bold text-emerald-800">
                  ✓ Please save this Application ID for future tracking.
                </p>

              </div>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">

              {[
                {
                  icon: <ClipboardCheck size={19} />,
                  title: "Submitted",
                  text: "Application securely received",
                },
                {
                  icon: <ShieldCheck size={19} />,
                  title: "Verification",
                  text: "Details will be reviewed",
                },
                {
                  icon: <BadgeCheck size={19} />,
                  title: "Decision",
                  text: "Status will be updated",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4F46E5] shadow-sm">
                    {item.icon}
                  </div>

                  <p className="mt-4 text-xs font-black text-[#172033]">
                    {item.title}
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">

              <Link
                href={`/divyang/track?applicationId=${encodeURIComponent(
                  applicationId
                )}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-6 py-4 text-sm font-black text-white shadow-xl shadow-indigo-500/20 transition hover:-translate-y-0.5"
              >
                Track Application
                <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                onClick={resetApplication}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-[#172033] transition hover:bg-slate-50"
              >
                Submit Another Application
              </button>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F8FF]">

      {/* ===================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#21164F] via-[#3730A3] to-[#075985]">

        <div className="absolute inset-0">

          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#A855F7]/20 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#22D3EE]/20 blur-3xl" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/70 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_.7fr] lg:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">

                <Accessibility
                  size={16}
                  className="text-cyan-300"
                />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                  Divyang Assistance Portal
                </span>

              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">

                Empowering
                <span className="block bg-gradient-to-r from-[#67E8F9] via-[#C4B5FD] to-[#F0ABFC] bg-clip-text text-transparent">
                  Every Ability.
                </span>

              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Apply for assistance and support
                through Anand Jivan Foundation
                Trust. Your application will be
                securely reviewed by our team.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-300"
                  />
                  Secure Application
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur">
                  <LockKeyhole
                    size={16}
                    className="text-cyan-300"
                  />
                  Protected Information
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur">
                  <BadgeCheck
                    size={16}
                    className="text-violet-300"
                  />
                  Unique Application ID
                </div>

              </div>

            </div>

            {/* OFFICIAL ID INFO */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.09] p-7 shadow-2xl backdrop-blur-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#818CF8] text-white shadow-xl">

                <FileText size={26} />

              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-200">
                Official Application ID
              </p>

              <h2 className="mt-3 text-2xl font-black text-white">
                Generated Automatically
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Your unique application
                reference is generated only
                after successful submission.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <BadgeCheck
                      size={19}
                      className="text-emerald-300"
                    />
                  </div>

                  <p className="text-xs font-bold leading-5 text-white/70">
                    No preview ID is generated
                    before submission.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-[#F6F8FF] to-transparent" />

      </section>

      {/* ===================================================
          PROGRESS
      ==================================================== */}

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4">

        <div className="rounded-[2rem] border border-white bg-white p-5 shadow-xl sm:p-7">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">
                Application Progress
              </p>

              <p className="mt-2 text-sm font-bold text-[#172033]">
                Complete the required information
              </p>

            </div>

            <div className="min-w-[180px]">

              <div className="flex justify-between text-[10px] font-black">

                <span className="text-slate-400">
                  Completion
                </span>

                <span className="text-[#4F46E5]">
                  {progress}%
                </span>

              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#06B6D4] transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-4">

            {[
              "Personal Details",
              "Disability Details",
              "Assistance Required",
              "Declaration",
            ].map(
              (step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl bg-[#F8FAFF] px-4 py-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] text-[10px] font-black text-white">
                    {index + 1}
                  </span>

                  <span className="text-[10px] font-black text-[#172033]">
                    {step}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          CONTENT
      ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* ===============================================
              FORM
          ================================================ */}

          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"
          >

            {/* =============================================
                ERROR
            ============================================== */}

            {message && !success && (
              <div className="mx-6 mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

                <CircleAlert
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-sm font-medium leading-6">
                  {message}
                </p>

              </div>
            )}

            {/* =============================================
                PERSONAL
            ============================================== */}

            <SectionHeader
              number="01"
              title="Personal Information"
              text="Please provide the applicant's correct personal and contact details."
              icon={<UserRound size={21} />}
            />

            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

              <Field
                label="Full Name"
                required
              >
                <input
                  value={formData.fullName}
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
                required
              >
                <input
                  value={formData.fatherName}
                  onChange={(e) =>
                    updateField(
                      "fatherName",
                      e.target.value
                    )
                  }
                  placeholder="Enter father or guardian name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Gender"
                required
              >
                <select
                  value={formData.gender}
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
                  <option>
                    Male
                  </option>
                  <option>
                    Female
                  </option>
                  <option>
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
                  value={formData.dob}
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
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) =>
                    updateField(
                      "mobile",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="10 digit mobile number"
                  className={inputClass}
                />
              </Field>

              <Field label="Email Address">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    updateField(
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="example@email.com"
                  className={inputClass}
                />
              </Field>

            </div>

            {/* =============================================
                ADDRESS
            ============================================== */}

            <div className="border-t border-slate-100">

              <SectionHeader
                number="02"
                title="Address Information"
                text="Provide the current residential address of the applicant."
                icon={<MapPin size={21} />}
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

                <div className="sm:col-span-2">

                  <Field
                    label="Complete Address"
                    required
                  >
                    <textarea
                      rows={4}
                      value={formData.address}
                      onChange={(e) =>
                        updateField(
                          "address",
                          e.target.value
                        )
                      }
                      placeholder="House number, village/locality, post office and other address details"
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                </div>

                <Field
                  label="District"
                  required
                >
                  <input
                    value={formData.district}
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
                    value={formData.state}
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
                  label="PIN Code"
                  required
                >
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) =>
                      updateField(
                        "pincode",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="6 digit PIN code"
                    className={inputClass}
                  />
                </Field>

              </div>

            </div>

            {/* =============================================
                DISABILITY
            ============================================== */}

            <div className="border-t border-slate-100">

              <SectionHeader
                number="03"
                title="Disability Information"
                text="Please provide accurate disability-related details."
                icon={<Accessibility size={21} />}
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

                <Field
                  label="Type of Disability"
                  required
                >
                  <select
                    value={formData.disabilityType}
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

                    {disabilityTypes.map(
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
                </Field>

                <Field
                  label="Disability Percentage"
                  required
                >
                  <div className="relative">

                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={
                        formData.disabilityPercentage
                      }
                      onChange={(e) =>
                        updateField(
                          "disabilityPercentage",
                          e.target.value
                        )
                      }
                      placeholder="Example: 65"
                      className={`${inputClass} pr-12`}
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
                      %
                    </span>

                  </div>
                </Field>

                <div className="sm:col-span-2">

                  <Field label="UDID Number (if available)">
                    <input
                      value={formData.udidNumber}
                      onChange={(e) =>
                        updateField(
                          "udidNumber",
                          e.target.value
                        )
                      }
                      placeholder="Enter UDID number"
                      className={inputClass}
                    />
                  </Field>

                </div>

              </div>

            </div>

            {/* =============================================
                ASSISTANCE
            ============================================== */}

            <div className="border-t border-slate-100">

              <SectionHeader
                number="04"
                title="Assistance Requirement"
                text="Tell us what type of support the applicant requires."
                icon={<HeartHandshake size={21} />}
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

                <Field
                  label="Assistance Required"
                  required
                >
                  <select
                    value={
                      formData.assistanceRequired
                    }
                    onChange={(e) =>
                      updateField(
                        "assistanceRequired",
                        e.target.value
                      )
                    }
                    className={inputClass}
                  >
                    <option value="">
                      Select assistance
                    </option>

                    {assistanceOptions.map(
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
                </Field>

                <Field label="Annual Family Income">
                  <input
                    value={formData.familyIncome}
                    onChange={(e) =>
                      updateField(
                        "familyIncome",
                        e.target.value
                      )
                    }
                    placeholder="Example: ₹1,20,000"
                    className={inputClass}
                  />
                </Field>

                <Field label="Occupation">
                  <input
                    value={formData.occupation}
                    onChange={(e) =>
                      updateField(
                        "occupation",
                        e.target.value
                      )
                    }
                    placeholder="Applicant occupation"
                    className={inputClass}
                  />
                </Field>

              </div>

            </div>

            {/* =============================================
                DECLARATION
            ============================================== */}

            <div className="border-t border-slate-100 p-6 sm:p-8">

              <div className="rounded-[1.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-5 sm:p-6">

                <div className="flex items-start gap-4">

                  <input
                    type="checkbox"
                    checked={
                      formData.declaration
                    }
                    onChange={(e) =>
                      updateField(
                        "declaration",
                        e.target.checked
                      )
                    }
                    className="mt-1 h-5 w-5 rounded border-slate-300 accent-[#4F46E5]"
                  />

                  <div>

                    <p className="text-sm font-black text-[#172033]">
                      Applicant Declaration
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      I hereby declare that the
                      information provided in this
                      application is true and correct
                      to the best of my knowledge. I
                      understand that submission does
                      not guarantee approval of
                      assistance and the application
                      may be subject to verification.
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#0891B2] px-6 py-4 text-sm font-black text-white shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Securing & Submitting Application...
                  </>
                ) : (
                  <>
                    <Send size={18} />

                    Submit Divyang Application

                    <ArrowRight size={17} />
                  </>
                )}

              </button>

              {loading && (
                <p className="mt-4 text-center text-[10px] font-bold text-slate-400">
                  Please do not refresh or close this
                  page while your official Application
                  ID is being generated.
                </p>
              )}

            </div>

          </form>

          {/* ===============================================
              SIDEBAR
          ================================================ */}

          <aside className="space-y-6">

            {/* PROCESS */}

            <div className="rounded-[2rem] bg-gradient-to-br from-[#21164F] via-[#312E81] to-[#0F766E] p-7 text-white shadow-xl">

              <Sparkles
                size={25}
                className="text-[#67E8F9]"
              />

              <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-cyan-200">
                Application Journey
              </p>

              <h2 className="mt-2 text-2xl font-black">
                What Happens Next?
              </h2>

              <div className="mt-7 space-y-5">

                {[
                  "Submit your online application.",
                  "An official Application ID is generated.",
                  "AJFT reviews the submitted information.",
                  "Verification and assessment may be conducted.",
                  "Application status is updated.",
                ].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex gap-4"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[10px] font-black text-cyan-200">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-xs leading-5 text-white/65">
                        {item}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* SECURITY */}

            <div className="rounded-[2rem] border border-indigo-100 bg-white p-7 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">

                <LockKeyhole size={21} />

              </div>

              <h3 className="mt-5 text-lg font-black text-[#172033]">
                Secure Information
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Your submitted information is
                securely stored and used for
                application processing and
                verification purposes.
              </p>

            </div>

            {/* TRACK */}

            <Link
              href="/divyang/track"
              className="group block rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-indigo-50 p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0891B2] shadow-sm">

                  <FileText size={21} />

                </div>

                <ChevronRight
                  size={21}
                  className="text-[#0891B2] transition group-hover:translate-x-1"
                />

              </div>

              <h3 className="mt-5 text-lg font-black text-[#172033]">
                Track Application
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Already submitted an application?
                Check the latest status using your
                Application ID.
              </p>

            </Link>

            {/* CONTACT */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                  <Phone size={19} />

                </div>

                <div>

                  <p className="text-[9px] font-black uppercase tracking-wider text-emerald-600">
                    Need Assistance?
                  </p>

                  <p className="text-sm font-black text-[#172033]">
                    Contact AJFT
                  </p>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <a
                  href="mailto:info@ajftrust.org"
                  className="flex items-center gap-3 text-xs font-bold text-slate-600 transition hover:text-[#4F46E5]"
                >

                  <Mail
                    size={16}
                    className="text-[#7C3AED]"
                  />

                  info@ajftrust.org

                </a>

                <a
                  href="tel:+919155751363"
                  className="flex items-center gap-3 text-xs font-bold text-slate-600 transition hover:text-[#4F46E5]"
                >

                  <Phone
                    size={16}
                    className="text-[#7C3AED]"
                  />

                  +91 9155751363

                </a>

                <div className="flex items-start gap-3 text-xs font-bold text-slate-600">

                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#7C3AED]"
                  />

                  Darbhanga, Bihar, India

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#172033] outline-none transition placeholder:text-slate-400 focus:border-[#6366F1] focus:ring-4 focus:ring-indigo-500/10";

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

      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">

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

function SectionHeader({
  number,
  title,
  text,
  icon,
}: {
  number: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#F8FAFF] via-white to-[#F0FDFF] px-6 py-6 sm:px-8">

      <div className="flex gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#0891B2] text-white shadow-lg shadow-indigo-500/20">
          {icon}
        </div>

        <div>

          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#7C3AED]">
            Section {number}
          </p>

          <h2 className="mt-1 text-xl font-black text-[#172033]">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {text}
          </p>

        </div>

      </div>

    </div>
  );
}