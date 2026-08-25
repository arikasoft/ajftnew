/* app/internship/apply/page.tsx
 *
 * Final application form aligned with the generated
 * "Application INT.pdf" layout/content:
 * 01 Applicant Information
 * 02 Educational Information
 * 03 Internship Details
 * 04 Document Verification
 * 05 Applicant Statement
 * 06 Declaration
 * Student Signature
 * AJFT Office Use Only
 */

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";

const internshipAreas = [
  "Community Outreach",
  "Education & Learning",
  "Digital & Communication",
  "Research & Documentation",
];

const durations = [
  "4 Weeks",
  "8 Weeks",
  "12 Weeks",
];

export default function InternshipApplyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const get = (name: string) =>
        String(formData.get(name) || "").trim();

      const payload = {
        // Applicant
        name: get("name"),
        email: get("email").toLowerCase(),
        phone: get("phone"),
        dob: get("dob"),
        address: get("address"),
        city: get("city"),
        state: get("state"),
        pincode: get("pincode"),

        // Education
        institution: get("institution"),
        course: get("course"),
        qualification: get("qualification"),

        // Internship
        area: get("area"),
        duration: get("duration"),
        startDate: get("startDate"),
        endDate: get("endDate"),

        // Document verification
        aadhaarLast4: get("aadhaarLast4"),
        marksheetLast4: get("marksheetLast4"),
        collegeIdLast4: get("collegeIdLast4"),

        // Statement
        message: get("message"),

        // Declaration
        declarationAccepted:
          formData.get("declaration") === "on",
      };

      /* ==========================================
         VALIDATION
      ========================================== */

      if (!payload.name)
        throw new Error(
          "Please enter your full name."
        );

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          payload.email
        )
      ) {
        throw new Error(
          "Please enter a valid email address."
        );
      }

      if (
        !/^[6-9]\d{9}$/.test(
          payload.phone
        )
      ) {
        throw new Error(
          "Please enter a valid 10 digit mobile number."
        );
      }

      if (!payload.dob)
        throw new Error(
          "Please select your date of birth."
        );

      if (!payload.address)
        throw new Error(
          "Please enter your complete address."
        );

      if (!payload.city)
        throw new Error(
          "Please enter your city."
        );

      if (!payload.state)
        throw new Error(
          "Please enter your state."
        );

      if (
        !/^\d{6}$/.test(
          payload.pincode
        )
      ) {
        throw new Error(
          "Please enter a valid 6 digit PIN code."
        );
      }

      if (!payload.institution)
        throw new Error(
          "Please enter your institution / college."
        );

      if (!payload.course)
        throw new Error(
          "Please enter your course / programme."
        );

      if (!payload.qualification)
        throw new Error(
          "Please enter your qualification."
        );

      if (!payload.area)
        throw new Error(
          "Please select your area of interest."
        );

      if (!payload.duration)
        throw new Error(
          "Please select internship duration."
        );

      if (!payload.startDate)
        throw new Error(
          "Please select internship start date."
        );

      if (!payload.endDate)
        throw new Error(
          "Please select expected end date."
        );

      if (
        new Date(payload.endDate) <
        new Date(payload.startDate)
      ) {
        throw new Error(
          "Expected end date cannot be before start date."
        );
      }

      // PDF has "last four digits" for each document.
      if (
        payload.aadhaarLast4 &&
        !/^\d{4}$/.test(
          payload.aadhaarLast4
        )
      ) {
        throw new Error(
          "Aadhaar last four digits must contain exactly 4 digits."
        );
      }

      if (
        payload.marksheetLast4 &&
        !/^\d{4}$/.test(
          payload.marksheetLast4
        )
      ) {
        throw new Error(
          "Marksheet last four digits must contain exactly 4 digits."
        );
      }

      if (
        payload.collegeIdLast4 &&
        !/^\d{4}$/.test(
          payload.collegeIdLast4
        )
      ) {
        throw new Error(
          "College ID last four digits must contain exactly 4 digits."
        );
      }

      if (!payload.message)
        throw new Error(
          "Please enter your applicant statement."
        );

      if (
        payload.message.length < 20
      ) {
        throw new Error(
          "Applicant statement should contain at least 20 characters."
        );
      }

      if (
        !payload.declarationAccepted
      ) {
        throw new Error(
          "Please accept the declaration before submitting."
        );
      }

      /* ==========================================
         API REQUEST
      ========================================== */

      const response = await fetch(
        "/api/internship/apply",
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
        }
      );

      const raw =
        await response.text();

      let result: any = null;

      try {
        result = raw
          ? JSON.parse(raw)
          : null;
      } catch {
        throw new Error(
          `Invalid response from server (${response.status}).`
        );
      }

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            `Application submission failed (${response.status}).`
        );
      }

      const applicationId =
        String(
          result.applicationId ||
            ""
        ).trim();

      if (!applicationId) {
        throw new Error(
          "Application was submitted but Application ID was not generated. Please contact AJFT office."
        );
      }

      window.location.assign(
        `/internship/success?applicationId=${encodeURIComponent(
          applicationId
        )}&emailSent=${
          result.emailSent
            ? "1"
            : "0"
        }`
      );
    } catch (error) {
      console.error(
        "INTERNSHIP APPLY ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Application submission failed."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 disabled:bg-slate-100";

  const labelClass =
    "block text-[10px] font-bold uppercase tracking-wide text-[#24364a]";

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-slate-800">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="border-b-4 border-[#c99a2e] bg-[#12345b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">

          <div className="flex items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white text-[#12345b]">
                <GraduationCap size={28} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7c86c]">
                  Anand Jivan Foundation Trust
                </p>

                <h1 className="mt-1 text-lg font-bold sm:text-2xl">
                  Internship Programme
                </h1>

                <p className="mt-1 text-[9px] text-white/70 sm:text-[10px]">
                  Official Internship Application Portal
                </p>
              </div>

            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                Application Form
              </p>

              <p className="mt-1 text-xs font-semibold">
                To be completed by the applicant
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* =========================================
          BREADCRUMB
      ========================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          <Link
            href="/internship"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-[#244e78]"
          >
            <ArrowLeft size={13} />
            Back to Internship
          </Link>
        </div>
      </div>

      {/* =========================================
          MAIN
      ========================================= */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-bold text-red-800">
              Application Submission Failed
            </p>

            <p className="mt-1 text-[10px] leading-5 text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="grid gap-7 lg:grid-cols-[1fr_310px]">

          {/* =======================================
              FORM
          ======================================= */}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="border border-slate-200 bg-white shadow-sm"
          >

            {/* TITLE */}

            <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-5 sm:px-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#12345b] text-white">
                  <FileText size={21} />
                </div>

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a6a08]">
                    Official Application
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#172b40]">
                    Internship Application Form
                  </h2>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    To be completed by the applicant.
                    Fields marked with{" "}
                    <span className="text-red-600">
                      *
                    </span>{" "}
                    are mandatory.
                  </p>

                </div>

              </div>

            </div>

            {/* =====================================
                01 APPLICANT INFORMATION
            ====================================== */}

            <FormSection
              number="01"
              title="Applicant Information"
              icon={<User size={17} />}
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Full Name"
                  name="name"
                  placeholder="Enter full name"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Mobile"
                  name="phone"
                  type="tel"
                  placeholder="10 digit mobile number"
                  maxLength={10}
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className={labelClass}
                  >
                    Address
                    <Required />
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    placeholder="Complete residential address"
                    className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-xs text-slate-800 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                  />
                </div>

                <Field
                  label="City"
                  name="city"
                  placeholder="City"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="State"
                  name="state"
                  placeholder="State"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="PIN Code"
                  name="pincode"
                  placeholder="6 digit PIN code"
                  maxLength={6}
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>

            </FormSection>

            {/* =====================================
                02 EDUCATION
            ====================================== */}

            <FormSection
              number="02"
              title="Educational Information"
              icon={<GraduationCap size={17} />}
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="Institution / College"
                  name="institution"
                  placeholder="College / University name"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Course / Programme"
                  name="course"
                  placeholder="e.g. M.A., B.A., B.Com, MBA"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Qualification"
                  name="qualification"
                  placeholder="Qualification"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>

            </FormSection>

            {/* =====================================
                03 INTERNSHIP DETAILS
            ====================================== */}

            <FormSection
              number="03"
              title="Internship Details"
              icon={<CalendarDays size={17} />}
            >

              <div className="grid gap-5 md:grid-cols-2">

                <SelectField
                  label="Area of Interest"
                  name="area"
                  required
                  options={internshipAreas}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <SelectField
                  label="Duration"
                  name="duration"
                  required
                  options={durations}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Start Date"
                  name="startDate"
                  type="date"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Expected End Date"
                  name="endDate"
                  type="date"
                  required
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>

            </FormSection>

            {/* =====================================
                04 DOCUMENT VERIFICATION
            ====================================== */}

            <FormSection
              number="04"
              title="Document Verification"
              icon={<FileText size={17} />}
            >

              <div className="overflow-hidden rounded-md border border-slate-300">

                <div className="grid grid-cols-[1.2fr_1fr_.8fr] bg-[#f4ead1] text-[9px] font-bold uppercase text-[#26384b]">

                  <div className="border-r border-slate-300 px-3 py-3">
                    Document
                  </div>

                  <div className="border-r border-slate-300 px-3 py-3">
                    Detail / Last Four Digits
                  </div>

                  <div className="px-3 py-3">
                    Status
                  </div>

                </div>

                <DocumentRow
                  label="Aadhaar Card"
                  name="aadhaarLast4"
                  inputClass={inputClass}
                />

                <DocumentRow
                  label="Marksheet"
                  name="marksheetLast4"
                  inputClass={inputClass}
                />

                <DocumentRow
                  label="College ID Card"
                  name="collegeIdLast4"
                  inputClass={inputClass}
                  last
                />

              </div>

              <p className="mt-3 text-[9px] leading-4 text-slate-500">
                Enter only the last four digits of the document number.
                Original documents may be required for verification.
              </p>

            </FormSection>

            {/* =====================================
                05 APPLICANT STATEMENT
            ====================================== */}

            <FormSection
              number="05"
              title="Applicant Statement"
              icon={<FileText size={17} />}
            >

              <label
                htmlFor="message"
                className={labelClass}
              >
                Applicant Statement
                <Required />
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                required
                minLength={20}
                placeholder="I wish to apply for the internship programme and agree to provide the required documents and information to Anand Jivan Foundation Trust."
                className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-xs leading-5 text-slate-700 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
              />

            </FormSection>

            {/* =====================================
                06 DECLARATION
            ====================================== */}

            <FormSection
              number="06"
              title="Declaration"
              icon={<FileText size={17} />}
            >

              <div className="border border-[#e5d4a5] bg-[#fffaf0] p-4">

                <label className="flex cursor-pointer gap-3">

                  <input
                    type="checkbox"
                    name="declaration"
                    required
                    className="mt-1 h-4 w-4 accent-[#12345b]"
                  />

                  <span className="text-[10px] leading-5 text-slate-600">
                    I hereby declare that the information provided
                    in this application is true and correct to the
                    best of my knowledge. I understand that submission
                    of this application does not guarantee selection
                    for the internship programme and I agree to follow
                    the rules and instructions of Anand Jivan Foundation
                    Trust.
                  </span>

                </label>

              </div>

            </FormSection>

            {/* =====================================
                SIGNATURE
            ====================================== */}

            <div className="grid gap-5 px-6 pb-7 sm:px-8 md:grid-cols-2">

              <div className="border border-slate-300 bg-white p-5">

                <p className="text-[10px] font-bold uppercase text-[#172b40]">
                  Student Signature
                </p>

                <div className="mt-8 border-b border-slate-400" />

                <div className="mt-2 flex justify-between text-[9px] text-slate-500">
                  <span>
                    Signature
                  </span>
                  <span>
                    Date: __________
                  </span>
                </div>

              </div>

              <div className="border border-[#d8a53a] bg-[#fffaf0] p-5">

                <p className="text-[10px] font-bold uppercase text-[#9a6a08]">
                  AJFT Office Use Only
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 text-[9px] text-slate-600">

                  <div>
                    Received Date:
                    <div className="mt-2 border-b border-slate-400" />
                  </div>

                  <div>
                    Verified By:
                    <div className="mt-2 border-b border-slate-400" />
                  </div>

                </div>

                <p className="mt-5 text-[9px] font-bold text-slate-700">
                  Status:
                </p>

                <div className="mt-2 flex flex-wrap gap-4 text-[9px] text-slate-600">

                  <span>
                    [ ] Received
                  </span>

                  <span>
                    [ ] Verified
                  </span>

                  <span>
                    [ ] Approved
                  </span>

                </div>

              </div>

            </div>

            {/* =====================================
                SUBMIT
            ====================================== */}

            <div className="border-t border-slate-200 bg-[#f8fafc] px-6 py-5 sm:px-8">

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-[#12345b] px-6 text-xs font-bold text-white transition hover:bg-[#0c2846] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Processing Application...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Submit Application
                    <ArrowRight size={14} />
                  </>
                )}

              </button>

              {loading && (
                <p className="mt-3 text-[9px] text-slate-500">
                  Please do not close or refresh this page.
                  Your Application ID and application PDF are
                  being generated.
                </p>
              )}

            </div>

          </form>

          {/* =======================================
              SIDE INFORMATION
          ======================================= */}

          <aside className="space-y-5">

            <div className="border border-slate-200 bg-white">

              <div className="border-b border-slate-200 bg-[#12345b] px-5 py-4">

                <p className="text-[9px] font-bold uppercase tracking-wider text-[#e8c36a]">
                  Application Process
                </p>

                <h3 className="mt-1 text-base font-bold text-white">
                  What Happens Next?
                </h3>

              </div>

              <div className="p-5">

                {[
                  "Online application submitted",
                  "Unique Application ID generated",
                  "Application PDF generated",
                  "Confirmation email sent",
                  "Print application and sign",
                  "Attach / provide required documents",
                  "Physical application submitted to AJFT",
                  "Document verification",
                  "Application approval",
                  "Internship completion",
                  "Certificate after payment",
                ].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="relative flex gap-3 pb-5 last:pb-0"
                    >

                      {index <
                        10 && (
                        <span className="absolute left-[10px] top-6 h-full w-px bg-slate-200" />
                      )}

                      <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8eef5] text-[8px] font-bold text-[#12345b]">
                        {index + 1}
                      </span>

                      <p className="pt-0.5 text-[9px] leading-4 text-slate-600">
                        {item}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="border border-slate-200 bg-white p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#e8eef5] text-[#12345b]">
                <Mail size={18} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#172b40]">
                Application Email
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                After successful submission, the generated
                Application ID and PDF will be sent to the
                registered email address.
              </p>

            </div>

            <div className="border border-slate-200 bg-white p-5">

              <MapPin
                size={20}
                className="text-[#12345b]"
              />

              <h3 className="mt-4 text-sm font-bold text-[#172b40]">
                AJFT Office
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-slate-500">
                Anand Jivan Foundation Trust
                <br />
                Darbhanga, Bihar, India
              </p>

              <div className="mt-4 space-y-2">

                <a
                  href="mailto:info@ajftrust.org"
                  className="flex items-center gap-2 text-[9px] font-bold text-[#244e78]"
                >
                  <Mail size={12} />
                  info@ajftrust.org
                </a>

                <a
                  href="tel:+919155751363"
                  className="flex items-center gap-2 text-[9px] font-bold text-[#244e78]"
                >
                  <Phone size={12} />
                  +91 9155751363
                </a>

              </div>

            </div>

          </aside>

        </div>

      </section>

      <footer className="border-t-4 border-[#c99a2e] bg-[#12345b]">

        <div className="mx-auto max-w-7xl px-5 py-5 text-center sm:px-8">

          <p className="text-[9px] font-bold text-white">
            ANAND JIVAN FOUNDATION TRUST
          </p>

          <p className="mt-1 text-[8px] text-white/55">
            Registered Social Organisation · Darbhanga, Bihar, India
          </p>

        </div>

      </footer>

    </main>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 px-6 py-7 sm:px-8">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded bg-[#e8eef5] text-[#12345b]">
          {icon}
        </div>

        <div>

          <p className="text-[8px] font-bold uppercase tracking-wider text-[#a36f08]">
            Section {number}
          </p>

          <h3 className="mt-0.5 text-base font-bold text-[#172b40]">
            {title}
          </h3>

        </div>

      </div>

      {children}

    </section>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  maxLength,
  inputClass,
  labelClass,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className={labelClass}
      >
        {label}
        {required && (
          <Required />
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={inputClass}
        autoComplete="off"
      />

    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  name,
  options,
  required = false,
  inputClass,
  labelClass,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className={labelClass}
      >
        {label}
        {required && (
          <Required />
        )}
      </label>

      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className={inputClass}
      >

        <option value="">
          Select {label}
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

/* =========================================================
   DOCUMENT ROW
========================================================= */

function DocumentRow({
  label,
  name,
  inputClass,
  last = false,
}: {
  label: string;
  name: string;
  inputClass: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.2fr_1fr_.8fr] ${
        !last
          ? "border-b border-slate-300"
          : ""
      }`}
    >

      <div className="border-r border-slate-300 px-3 py-3 text-[10px] font-semibold text-slate-700">
        {label}
      </div>

      <div className="border-r border-slate-300 px-3 py-2">

        <input
          name={name}
          inputMode="numeric"
          maxLength={4}
          placeholder="____"
          className="h-8 w-full rounded border border-slate-300 px-2 text-[10px] outline-none focus:border-[#12345b]"
        />

      </div>

      <div className="flex items-center px-3 py-3 text-[9px] text-slate-600">

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            name={`${name}Submitted`}
            className="h-3.5 w-3.5 accent-[#12345b]"
          />

          Submitted

        </label>

      </div>

    </div>
  );
}

/* =========================================================
   REQUIRED
========================================================= */

function Required() {
  return (
    <span className="ml-1 text-red-600">
      *
    </span>
  );
}