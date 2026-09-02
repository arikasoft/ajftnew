"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Baby,
  CheckCircle2,
  ChevronRight,
  FileText,
  HeartHandshake,
  Home,
  Loader2,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const supportOptions = [
  "Education Support",
  "School Materials",
  "Health Support",
  "Nutrition Support",
  "Child Protection",
  "Emergency Assistance",
  "Counselling Support",
  "Other Support",
];

export default function ChildWelfareApplyPage() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState(false);

  const [
    applicationData,
    setApplicationData,
  ] = useState<{
    applicationId: string;
    guardianName: string;
    childName: string;
    status: string;
  } | null>(null);

  const [
    supportRequired,
    setSupportRequired,
  ] = useState<string[]>([]);

  function toggleSupport(
    value: string
  ) {
    setSupportRequired(
      (previous) => {
        if (
          previous.includes(value)
        ) {
          return previous.filter(
            (item) =>
              item !== value
          );
        }

        return [
          ...previous,
          value,
        ];
      }
    );
  }

  async function handleSubmit(
    event: FormEvent<
      HTMLFormElement
    >
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData =
        new FormData(
          event.currentTarget
        );

      const payload = {
        guardianName:
          formData.get(
            "guardianName"
          ),

        relation:
          formData.get(
            "relation"
          ),

        mobile:
          formData.get(
            "mobile"
          ),

        email:
          formData.get(
            "email"
          ),

        childName:
          formData.get(
            "childName"
          ),

        dateOfBirth:
          formData.get(
            "dateOfBirth"
          ),

        gender:
          formData.get(
            "gender"
          ),

        schoolName:
          formData.get(
            "schoolName"
          ),

        educationLevel:
          formData.get(
            "educationLevel"
          ),

        address:
          formData.get(
            "address"
          ),

        village:
          formData.get(
            "village"
          ),

        district:
          formData.get(
            "district"
          ),

        state:
          formData.get(
            "state"
          ),

        pincode:
          formData.get(
            "pincode"
          ),

        familyIncome:
          formData.get(
            "familyIncome"
          ),

        supportDescription:
          formData.get(
            "supportDescription"
          ),

        supportRequired,
      };

      const response =
        await fetch(
          "/api/child-welfare/apply",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit application."
        );
      }

      setApplicationData(
        result.data
      );

      setSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit application."
      );
    } finally {
      setLoading(false);
    }
  }

  if (
    success &&
    applicationData
  ) {
    return (
      <main className="min-h-screen overflow-hidden bg-slate-50">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#06234e] via-[#075b9c] to-[#0c9a8d] px-6 py-20">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/20 bg-white/15 text-white shadow-2xl backdrop-blur-xl">
              <CheckCircle2 className="h-12 w-12 text-emerald-200" />
            </div>

            <p className="mt-8 text-xs font-black tracking-[0.3em] text-cyan-200">
              APPLICATION RECEIVED
            </p>

            <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">
              Thank You,
              <span className="block">
                {applicationData.guardianName}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Your Child Welfare Programme
              application has been
              successfully submitted.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-8 max-w-4xl px-6 pb-20">
          <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl shadow-slate-300/50">
            <div className="p-7 sm:p-10">
              <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
                <p className="text-xs font-black tracking-[0.18em] text-emerald-700">
                  APPLICATION ID
                </p>

                <p className="mt-3 break-all text-2xl font-black text-slate-950 sm:text-4xl">
                  {
                    applicationData.applicationId
                  }
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Please save this Application ID
                  safely. You will need it to
                  track your application status.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Child Name
                  </p>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    {
                      applicationData.childName
                    }
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Application Status
                  </p>

                  <p className="mt-2 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
                    Submitted
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/programs/child-welfare"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-black text-slate-800 transition hover:bg-slate-50"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Programme
                </Link>

                <Link
                  href="/programs/child-welfare/track"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#075b9c] to-[#0c9a8d] px-6 py-4 font-black text-white shadow-xl"
                >
                  Track Application
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HEADER */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#06234e] via-[#075b9c] to-[#0c9a8d]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-cyan-300 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-emerald-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <Link
            href="/programs/child-welfare"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Child Welfare Programme
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black tracking-wider text-cyan-100 backdrop-blur">
                <HeartHandshake className="h-4 w-4" />
                CHILD WELFARE APPLICATION
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-6xl">
                Apply for
                <span className="block text-cyan-200">
                  Child Support.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Submit the application details
                below. Our team will review the
                information and process the
                request according to programme
                guidelines.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <ShieldCheck className="h-7 w-7 text-cyan-200" />
                </div>

                <div>
                  <p className="font-black">
                    Secure Application
                  </p>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Your submitted information
                    will be used for programme
                    assessment and support
                    processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="block w-full text-slate-50"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,50 C240,100 480,0 720,45 C960,90 1200,10 1440,55 L1440,90 L0,90 Z"
          />
        </svg>
      </section>

      {/* FORM */}

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-8"
        >
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          {/* GUARDIAN */}

          <section className="overflow-hidden rounded-[32px] bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50 px-7 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#075b9c] text-white">
                <UserRound className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black tracking-[0.15em] text-[#0c9a8d]">
                  STEP 01
                </p>

                <h2 className="text-xl font-black text-slate-900">
                  Parent / Guardian Details
                </h2>
              </div>
            </div>

            <div className="grid gap-6 p-7 md:grid-cols-2">
              <Field
                label="Guardian Full Name"
                name="guardianName"
                required
              />

              <SelectField
                label="Relation with Child"
                name="relation"
                required
                options={[
                  "Father",
                  "Mother",
                  "Guardian",
                  "Relative",
                  "Other",
                ]}
              />

              <Field
                label="Mobile Number"
                name="mobile"
                type="tel"
                required
                placeholder="10 digit mobile number"
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="Optional"
              />
            </div>
          </section>

          {/* CHILD */}

          <section className="overflow-hidden rounded-[32px] bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 border-b bg-gradient-to-r from-emerald-50 to-cyan-50 px-7 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c9a8d] text-white">
                <Baby className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black tracking-[0.15em] text-[#0c9a8d]">
                  STEP 02
                </p>

                <h2 className="text-xl font-black text-slate-900">
                  Child Details
                </h2>
              </div>
            </div>

            <div className="grid gap-6 p-7 md:grid-cols-2">
              <Field
                label="Child Full Name"
                name="childName"
                required
              />

              <Field
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />

              <SelectField
                label="Gender"
                name="gender"
                required
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
              />

              <Field
                label="School Name"
                name="schoolName"
                placeholder="If applicable"
              />

              <div className="md:col-span-2">
                <SelectField
                  label="Current Education Level"
                  name="educationLevel"
                  options={[
                    "Not Enrolled",
                    "Pre-Primary",
                    "Primary",
                    "Middle School",
                    "Secondary",
                    "Higher Secondary",
                    "Other",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ADDRESS */}

          <section className="overflow-hidden rounded-[32px] bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 border-b bg-gradient-to-r from-orange-50 to-amber-50 px-7 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black tracking-[0.15em] text-orange-600">
                  STEP 03
                </p>

                <h2 className="text-xl font-black text-slate-900">
                  Residential Address
                </h2>
              </div>
            </div>

            <div className="grid gap-6 p-7 md:grid-cols-2">
              <div className="md:col-span-2">
                <TextAreaField
                  label="Complete Address"
                  name="address"
                  required
                />
              </div>

              <Field
                label="Village / Locality"
                name="village"
              />

              <Field
                label="District"
                name="district"
                required
              />

              <Field
                label="State"
                name="state"
                required
              />

              <Field
                label="PIN Code"
                name="pincode"
                type="text"
              />
            </div>
          </section>

          {/* SUPPORT */}

          <section className="overflow-hidden rounded-[32px] bg-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 border-b bg-gradient-to-r from-violet-50 to-purple-50 px-7 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white">
                <HeartHandshake className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black tracking-[0.15em] text-violet-600">
                  STEP 04
                </p>

                <h2 className="text-xl font-black text-slate-900">
                  Support Requirement
                </h2>
              </div>
            </div>

            <div className="p-7">
              <p className="mb-5 text-sm font-bold text-slate-600">
                Select the type of support
                required.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {supportOptions.map(
                  (option) => {
                    const active =
                      supportRequired.includes(
                        option
                      );

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          toggleSupport(
                            option
                          )
                        }
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-bold transition ${
                          active
                            ? "border-[#075b9c] bg-blue-50 text-[#075b9c]"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                            active
                              ? "border-[#075b9c] bg-[#075b9c] text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {active && (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </span>

                        {option}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <SelectField
                  label="Approximate Family Annual Income"
                  name="familyIncome"
                  options={[
                    "Below ₹50,000",
                    "₹50,000 - ₹1,00,000",
                    "₹1,00,000 - ₹2,00,000",
                    "₹2,00,000 - ₹5,00,000",
                    "Above ₹5,00,000",
                    "Prefer not to say",
                  ]}
                />

                <div className="hidden md:block" />
              </div>

              <div className="mt-6">
                <TextAreaField
                  label="Describe the Support Requirement"
                  name="supportDescription"
                  placeholder="Please provide additional information about the child's situation and support requirement."
                />
              </div>
            </div>
          </section>

          {/* SUBMIT */}

          <section className="rounded-[32px] bg-gradient-to-br from-[#06234e] via-[#075b9c] to-[#0c9a8d] p-7 shadow-2xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <FileText className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    Ready to Submit?
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-blue-100">
                    Please verify all information
                    before submitting the
                    application. An Application ID
                    will be generated automatically.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-black text-[#063568] shadow-xl transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#075b9c] focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#075b9c] focus:bg-white focus:ring-4 focus:ring-blue-100"
      >
        <option
          value=""
          disabled
        >
          Select an option
        </option>

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
    </label>
  );
}

function TextAreaField({
  label,
  name,
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#075b9c] focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}