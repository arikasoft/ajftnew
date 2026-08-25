/* app/careers/apply/page.tsx */

"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  Send,
  User,
} from "lucide-react";

const jobs = {
  "CAREER-2026-001": {
    title: "Programme Coordinator",
    department: "Programme & Community Development",
    location: "Darbhanga, Bihar",
    type: "Full Time",
  },
  "CAREER-2026-002": {
    title: "Field Coordinator",
    department: "Community Outreach",
    location: "Darbhanga, Bihar",
    type: "Full Time",
  },
  "CAREER-2026-003": {
    title: "Digital & Documentation Executive",
    department: "Digital Communication",
    location: "Darbhanga, Bihar",
    type: "Full Time",
  },
} as const;

type JobId = keyof typeof jobs;

export default function CareerApplyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("jobId") || ""
      : "";

  const selectedJob = useMemo(() => {
    return jobs[jobId as JobId] || null;
  }, [jobId]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const form = event.currentTarget;
      const data = new FormData(form);

      const get = (name: string) =>
        String(data.get(name) || "").trim();

      const resume = data.get("resume");

      const payload = {
        jobId: get("jobId"),
        jobTitle: get("jobTitle"),
        department: get("department"),
        location: get("location"),
        employmentType: get("employmentType"),

        fullName: get("fullName"),
        fatherName: get("fatherName"),
        motherName: get("motherName"),
        dob: get("dob"),
        gender: get("gender"),

        email: get("email").toLowerCase(),
        phone: get("phone"),

        address: get("address"),
        city: get("city"),
        state: get("state"),
        pincode: get("pincode"),

        tenth: get("tenth"),
        twelfth: get("twelfth"),
        graduation: get("graduation"),
        postGraduation: get("postGraduation"),
        otherQualification: get(
          "otherQualification"
        ),

        experienceType: get(
          "experienceType"
        ),
        organization: get("organization"),
        designation: get("designation"),
        experience: get("experience"),

        resumeName:
          resume instanceof File
            ? resume.name
            : "",

        coverLetter: get("coverLetter"),

        declarationAccepted:
          data.get("declaration") === "on",
      };

      if (!selectedJob) {
        throw new Error(
          "Please select a valid job vacancy."
        );
      }

      if (!payload.fullName) {
        throw new Error(
          "Please enter your full name."
        );
      }

      if (!payload.fatherName) {
        throw new Error(
          "Please enter father's name."
        );
      }

      if (!payload.dob) {
        throw new Error(
          "Please select your date of birth."
        );
      }

      if (!payload.gender) {
        throw new Error(
          "Please select gender."
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

      if (
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
          "Please enter your complete address."
        );
      }

      if (!payload.city) {
        throw new Error(
          "Please enter your city."
        );
      }

      if (!payload.state) {
        throw new Error(
          "Please enter your state."
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

      if (!payload.tenth) {
        throw new Error(
          "Please enter your 10th qualification."
        );
      }

      if (!payload.twelfth) {
        throw new Error(
          "Please enter your 12th qualification."
        );
      }

      if (!payload.graduation) {
        throw new Error(
          "Please enter your graduation details."
        );
      }

      if (!payload.experienceType) {
        throw new Error(
          "Please select Fresher or Experienced."
        );
      }

      if (
        payload.experienceType ===
          "Experienced" &&
        !payload.experience
      ) {
        throw new Error(
          "Please enter your work experience."
        );
      }

      if (
        payload.experienceType ===
          "Experienced" &&
        !payload.organization
      ) {
        throw new Error(
          "Please enter your previous organization."
        );
      }

      if (
        payload.experienceType ===
          "Experienced" &&
        !payload.designation
      ) {
        throw new Error(
          "Please enter your previous designation."
        );
      }

      if (!payload.coverLetter) {
        throw new Error(
          "Please enter a short cover letter."
        );
      }

      if (
        payload.coverLetter.length <
        30
      ) {
        throw new Error(
          "Cover letter should contain at least 30 characters."
        );
      }

      if (
        !payload.declarationAccepted
      ) {
        throw new Error(
          "Please accept the declaration."
        );
      }

      const response = await fetch(
        "/api/careers/apply",
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
          "Application submitted but Career Application ID was not generated."
        );
      }

      window.location.assign(
        `/careers/success?applicationId=${encodeURIComponent(
          applicationId
        )}`
      );
    } catch (err) {
      console.error(
        "CAREER APPLY ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
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
    "mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#12345b] focus:ring-2 focus:ring-[#12345b]/10";

  const labelClass =
    "block text-[10px] font-bold uppercase tracking-wide text-[#24364a]";

  return (
    <main className="min-h-screen bg-[#f3f5f7] text-slate-800">

      <header className="border-b-4 border-[#c99a2e] bg-[#12345b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white text-[#12345b]">
              <BriefcaseBusiness size={27} />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7c86c]">
                Anand Jivan Foundation Trust
              </p>

              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Career Application
              </h1>

              <p className="mt-1 text-[9px] text-white/70">
                Official Employment Application Portal
              </p>
            </div>

          </div>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-[#244e78]"
          >
            <ArrowLeft size={13} />
            Back to Careers
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

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

        {!selectedJob ? (
          <div className="border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-bold text-amber-900">
              Job vacancy not selected
            </p>
            <p className="mt-2 text-xs text-amber-800">
              Please return to Careers and select
              a current vacancy before applying.
            </p>
            <Link
              href="/careers"
              className="mt-5 inline-flex items-center gap-2 rounded bg-[#12345b] px-5 py-3 text-xs font-bold text-white"
            >
              View Vacancies
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1fr_310px]">

            <form
              onSubmit={handleSubmit}
              className="border border-slate-200 bg-white shadow-sm"
            >

              <input
                type="hidden"
                name="jobId"
                value={jobId}
              />
              <input
                type="hidden"
                name="jobTitle"
                value={selectedJob.title}
              />
              <input
                type="hidden"
                name="department"
                value={selectedJob.department}
              />
              <input
                type="hidden"
                name="location"
                value={selectedJob.location}
              />
              <input
                type="hidden"
                name="employmentType"
                value={selectedJob.type}
              />

              <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-5 sm:px-8">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a6a08]">
                  Application For
                </p>

                <h2 className="mt-1 text-xl font-black text-[#172b40]">
                  {selectedJob.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-4 text-[9px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Building2 size={12} />
                    {selectedJob.department}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {selectedJob.location}
                  </span>

                  <span>
                    {selectedJob.type}
                  </span>
                </div>
              </div>

              <Section
                number="01"
                title="Personal Information"
                icon={<User size={17} />}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name" name="fullName" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Father's Name" name="fatherName" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Mother's Name" name="motherName" inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Date of Birth" name="dob" type="date" required inputClass={inputClass} labelClass={labelClass} />
                  <Select label="Gender" name="gender" required options={["Male", "Female", "Other"]} inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Mobile Number" name="phone" type="tel" maxLength={10} required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Email Address" name="email" type="email" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="City" name="city" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="State" name="state" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="PIN Code" name="pincode" maxLength={6} required inputClass={inputClass} labelClass={labelClass} />

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Complete Address <Required />
                    </label>
                    <textarea
                      name="address"
                      rows={3}
                      required
                      className="mt-2 w-full resize-none rounded-md border border-slate-300 px-3 py-3 text-xs outline-none focus:border-[#12345b] focus:ring-2 focus:ring-[#12345b]/10"
                    />
                  </div>
                </div>
              </Section>

              <Section
                number="02"
                title="Educational Qualification"
                icon={<GraduationCap size={17} />}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="10th Qualification / Board / %" name="tenth" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="12th Qualification / Board / %" name="twelfth" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Graduation" name="graduation" required inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Post Graduation" name="postGraduation" inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Other Qualification" name="otherQualification" inputClass={inputClass} labelClass={labelClass} />
                </div>
              </Section>

              <Section
                number="03"
                title="Work Experience"
                icon={<BriefcaseBusiness size={17} />}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Select
                    label="Experience Type"
                    name="experienceType"
                    required
                    options={["Fresher", "Experienced"]}
                    inputClass={inputClass}
                    labelClass={labelClass}
                  />
                  <Field label="Total Experience" name="experience" placeholder="e.g. 2 Years" inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Previous Organization" name="organization" inputClass={inputClass} labelClass={labelClass} />
                  <Field label="Previous Designation" name="designation" inputClass={inputClass} labelClass={labelClass} />
                </div>
              </Section>

              <Section
                number="04"
                title="Resume & Supporting Information"
                icon={<FileText size={17} />}
              >
                <div>
                  <label className={labelClass}>
                    Resume / CV <Required />
                  </label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    className="mt-2 block w-full rounded-md border border-slate-300 bg-white p-3 text-[10px]"
                  />
                  <p className="mt-2 text-[9px] text-slate-400">
                    PDF, DOC or DOCX. Resume file is recorded with the application.
                  </p>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>
                    Cover Letter / Applicant Statement <Required />
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={7}
                    minLength={30}
                    required
                    placeholder="Tell us about your skills, experience, suitability for this role and why you want to work with AJFT."
                    className="mt-2 w-full resize-none rounded-md border border-slate-300 px-3 py-3 text-xs leading-5 outline-none focus:border-[#12345b] focus:ring-2 focus:ring-[#12345b]/10"
                  />
                </div>
              </Section>

              <Section
                number="05"
                title="Declaration"
                icon={<FileText size={17} />}
              >
                <div className="border border-[#e5d4a5] bg-[#fffaf0] p-4">
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      name="declaration"
                      required
                      className="mt-1 h-4 w-4 accent-[#12345b]"
                    />
                    <span className="text-[10px] leading-5 text-slate-600">
                      I declare that the information provided by me is true and correct
                      to the best of my knowledge. I understand that submission of this
                      application does not guarantee selection or appointment.
                    </span>
                  </label>
                </div>
              </Section>

              <div className="border-t border-slate-200 bg-[#f8fafc] px-6 py-5 sm:px-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-[#12345b] px-6 text-xs font-bold text-white hover:bg-[#0c2846] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Submit Career Application
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {loading && (
                  <p className="mt-3 text-[9px] text-slate-500">
                    Please do not refresh this page while your application is being processed.
                  </p>
                )}
              </div>
            </form>

            <aside className="space-y-5">
              <div className="border border-slate-200 bg-white">
                <div className="bg-[#12345b] px-5 py-4 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#e8c36a]">
                    Selected Vacancy
                  </p>
                  <h3 className="mt-1 text-base font-bold">
                    {selectedJob.title}
                  </h3>
                </div>

                <div className="p-5 text-[10px] text-slate-600">
                  <p className="font-bold text-[#172b40]">
                    Job ID
                  </p>
                  <p className="mt-1">
                    {jobId}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="font-bold text-[#172b40]">
                      Selection Process
                    </p>

                    <ol className="mt-3 space-y-3">
                      {[
                        "Application submitted",
                        "Application number generated",
                        "HR verification",
                        "Shortlisting",
                        "Interview",
                        "Selection / Rejection",
                        "Joining",
                      ].map((step, i) => (
                        <li key={step} className="flex gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8eef5] text-[8px] font-bold text-[#12345b]">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a6a08]">
                  Important
                </p>
                <p className="mt-3 text-[10px] leading-5 text-slate-500">
                  Keep your Career Application Number safe. It will be required
                  for checking application status and future communication.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <footer className="border-t-4 border-[#c99a2e] bg-[#12345b]">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center sm:px-8">
          <p className="text-[9px] font-bold text-white">
            ANAND JIVAN FOUNDATION TRUST
          </p>
          <p className="mt-1 text-[8px] text-white/55">
            Careers & Recruitment Portal · Darbhanga, Bihar, India
          </p>
        </div>
      </footer>
    </main>
  );
}

function Section({
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
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <Required />}
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

function Select({
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
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <Required />}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className={inputClass}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Required() {
  return <span className="ml-1 text-red-600">*</span>;
}