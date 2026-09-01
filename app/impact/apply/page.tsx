"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  CheckCircle2,
  FileText,
  Loader2,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function DivyangApplyPage() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [applicationId, setApplicationId] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const form =
        event.currentTarget;

      const formData =
        new FormData(form);

      const response =
        await fetch(
          "/api/divyang/apply",
          {
            method: "POST",

            body: formData,
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to submit application."
        );
      }

      setApplicationId(
        result.applicationId
      );

      setSuccess(true);

      form.reset();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "APPLICATION SUBMIT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit your application. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-2xl">

          <div className="overflow-hidden rounded-2xl border bg-white shadow-xl">

            <div className="bg-[#063b5c] px-6 py-8 text-center text-white">

              <CheckCircle2
                size={54}
                className="mx-auto mb-4"
              />

              <h1 className="text-2xl font-bold">
                Application Submitted Successfully
              </h1>

              <p className="mt-2 text-sm text-white/80">
                Your application has been received successfully.
              </p>

            </div>

            <div className="p-6 sm:p-10">

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Application ID
                </p>

                <p className="mt-3 text-2xl font-black text-[#08744f]">
                  {applicationId}
                </p>

              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-5">

                <h2 className="font-bold text-slate-800">
                  Important Information
                </h2>

                <ul className="mt-3 space-y-2 text-sm text-slate-600">

                  <li>
                    ✓ Please save your Application ID.
                  </li>

                  <li>
                    ✓ Your application will be reviewed by the organisation.
                  </li>

                  <li>
                    ✓ You may be contacted for verification or additional documents.
                  </li>

                  <li>
                    ✓ Submission of an application does not guarantee approval of assistance.
                  </li>

                </ul>

              </div>

              <div className="mt-8 flex justify-center">

                <button
                  onClick={() => {
                    setSuccess(false);
                    setApplicationId("");
                  }}
                  className="rounded-xl bg-[#08744f] px-6 py-3 text-sm font-bold text-white"
                >
                  Submit Another Application
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      {/* GOVERNMENT HEADER */}

      <div className="bg-[#063b5c] text-white">

        <div className="mx-auto max-w-6xl px-4 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#08744f]">

              <ShieldCheck size={26} />

            </div>

            <div>

              <h1 className="text-lg font-bold sm:text-xl">
                Divyang Assistance Application Portal
              </h1>

              <p className="text-xs text-white/70">
                Anand Jivan Foundation Trust
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* NOTICE */}

      <div className="border-b bg-white">

        <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-slate-600">

          Please provide correct information. All submitted applications are subject to verification.

        </div>

      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">

        {error && (

          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">

            {error}

          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* PERSONAL DETAILS */}

          <section className="rounded-xl border bg-white shadow-sm">

            <div className="border-b bg-slate-50 px-5 py-4">

              <div className="flex items-center gap-2">

                <FileText
                  size={19}
                  className="text-[#08744f]"
                />

                <h2 className="font-bold text-slate-800">
                  1. Applicant Details
                </h2>

              </div>

            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">

              <Field
                name="applicantName"
                label="Applicant Name"
                required
              />

              <Field
                name="fatherName"
                label="Father / Guardian Name"
              />

              <Field
                name="motherName"
                label="Mother Name"
              />

              <SelectField
                name="gender"
                label="Gender"
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
              />

              <Field
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
              />

              <Field
                name="age"
                label="Age"
                type="number"
              />

            </div>

          </section>

          {/* CONTACT */}

          <Section
            title="2. Contact Information"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Field
                name="mobile"
                label="Mobile Number"
                type="tel"
                required
              />

              <Field
                name="email"
                label="Email Address"
                type="email"
              />

              <Field
                name="aadhaarNumber"
                label="Aadhaar Number"
              />

            </div>

          </Section>

          {/* DISABILITY */}

          <Section
            title="3. Disability Details"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Field
                name="category"
                label="Category"
              />

              <Field
                name="disabilityType"
                label="Type of Disability"
              />

              <Field
                name="disabilityPercentage"
                label="Disability Percentage"
              />

              <Field
                name="disabilityCertificateNumber"
                label="Disability Certificate Number"
              />

            </div>

          </Section>

          {/* ADDRESS */}

          <Section
            title="4. Address Details"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Field
                name="address"
                label="Full Address"
              />

              <Field
                name="state"
                label="State"
                defaultValue="Bihar"
              />

              <Field
                name="district"
                label="District"
                required
              />

              <Field
                name="block"
                label="Block"
              />

              <Field
                name="panchayat"
                label="Panchayat"
              />

              <Field
                name="village"
                label="Village / Ward"
              />

              <Field
                name="pinCode"
                label="PIN Code"
              />

            </div>

          </Section>

          {/* EDUCATION */}

          <Section
            title="5. Education & Financial Details"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Field
                name="education"
                label="Education"
              />

              <Field
                name="occupation"
                label="Occupation"
              />

              <Field
                name="annualIncome"
                label="Annual Family Income"
              />

            </div>

          </Section>

          {/* ASSISTANCE */}

          <Section
            title="6. Assistance Required"
          >

            <div className="space-y-5">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Type of Assistance Required
                </label>

                <textarea
                  name="assistanceRequired"
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#08744f]"
                  placeholder="Describe the assistance you require..."
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Additional Information
                </label>

                <textarea
                  name="additionalDetails"
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#08744f]"
                  placeholder="Any additional information..."
                />

              </div>

            </div>

          </Section>

          {/* DECLARATION */}

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">

            <label className="flex gap-3 text-sm text-slate-700">

              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4"
              />

              <span>
                I hereby declare that the information provided in this application is true and correct to the best of my knowledge.
              </span>

            </label>

          </section>

          {/* SUBMIT */}

          <div className="flex justify-center pb-10">

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 items-center gap-2 rounded-lg bg-[#08744f] px-8 py-3 font-bold text-white shadow-lg transition hover:bg-[#066441] disabled:opacity-70"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Submitting Application...
                </>
              ) : (
                <>
                  <Send size={18} />

                  Submit Application
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
}


/* =========================================
   REUSABLE SECTION
========================================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-white shadow-sm">

      <div className="border-b bg-slate-50 px-5 py-4">

        <h2 className="font-bold text-slate-800">
          {title}
        </h2>

      </div>

      <div className="p-5">

        {children}

      </div>

    </section>
  );
}


/* =========================================
   INPUT FIELD
========================================= */

function Field({
  name,
  label,
  type = "text",
  required = false,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[#08744f] focus:ring-2 focus:ring-[#08744f]/10"
      />

    </div>
  );
}


/* =========================================
   SELECT FIELD
========================================= */

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

      </label>

      <select
        name={name}
        className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[#08744f]"
      >

        <option value="">
          Select
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

    </div>
  );
}