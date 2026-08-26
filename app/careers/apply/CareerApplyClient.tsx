"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  Send,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

/* =========================================================
   JOBS
========================================================= */

const jobs = {
  "CAREER-2026-001": {
    title: "Programme Coordinator",
    department:
      "Programme & Community Development",
    location: "Darbhanga, Bihar",
    type: "Full Time",
    qualification:
      "Graduate / Post Graduate",
    experience: "0–3 Years",
  },

  "CAREER-2026-002": {
    title: "Field Coordinator",
    department: "Community Outreach",
    location: "Darbhanga, Bihar",
    type: "Full Time",
    qualification: "Graduate",
    experience: "0–2 Years",
  },

  "CAREER-2026-003": {
    title:
      "Digital & Documentation Executive",
    department: "Digital Communication",
    location: "Darbhanga, Bihar",
    type: "Full Time",
    qualification:
      "Graduate / Diploma",
    experience: "0–2 Years",
  },
} as const;

type JobId = keyof typeof jobs;

type Props = {
  jobId: string;
};

/* =========================================================
   MAIN
========================================================= */

export default function CareerApplyClient({
  jobId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [applicationId, setApplicationId] =
    useState("");

  const selectedJob =
    jobs[jobId as JobId] || null;

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const form =
        event.currentTarget;

      const formData =
        new FormData(form);

      const get = (name: string) =>
        String(
          formData.get(name) || ""
        ).trim();

      const payload = {
        jobId,
        jobTitle: selectedJob?.title || "",
        department:
          selectedJob?.department || "",
        location:
          selectedJob?.location || "",
        employmentType:
          selectedJob?.type || "",

        fullName: get("fullName"),
        fatherName: get("fatherName"),
        motherName: get("motherName"),
        dob: get("dob"),
        gender: get("gender"),

        email:
          get("email").toLowerCase(),

        phone: get("phone"),

        address: get("address"),
        city: get("city"),
        state: get("state"),
        pincode: get("pincode"),

        tenth: get("tenth"),
        twelfth: get("twelfth"),
        graduation:
          get("graduation"),

        postGraduation:
          get("postGraduation"),

        otherQualification:
          get("otherQualification"),

        experienceType:
          get("experienceType"),

        organization:
          get("organization"),

        designation:
          get("designation"),

        experience:
          get("experience"),

        resumeName:
          formData.get("resume") instanceof
          File
            ? (
                formData.get(
                  "resume"
                ) as File
              ).name
            : "",

        coverLetter:
          get("coverLetter"),

        declarationAccepted:
          formData.get(
            "declaration"
          ) === "on",
      };

      /* =================================================
         VALIDATION
      ================================================= */

      if (!selectedJob) {
        throw new Error(
          "Please select a valid active vacancy."
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
          "Please select your gender."
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

      /* =================================================
         API
      ================================================= */

      const response =
        await fetch(
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

      let result: any;

      try {
        result = raw
          ? JSON.parse(raw)
          : null;
      } catch {
        throw new Error(
          `Invalid server response (${response.status}).`
        );
      }

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Application submission failed."
        );
      }

      const id = String(
        result.applicationId || ""
      ).trim();

      if (!id) {
        throw new Error(
          "Application submitted but Application ID was not generated."
        );
      }

      setApplicationId(id);
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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

  /* =========================================================
     SUCCESS
  ========================================================= */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F4F8FA]">

        <section className="relative overflow-hidden bg-[#071D2B] text-white">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#176B87]/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#F2C94C]/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-2xl">

              <CheckCircle2
                size={48}
              />

            </div>

            <p className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-[#F2C94C]">
              Application Successfully Submitted
            </p>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Thank you for applying.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50">
              Your application has been
              successfully received by
              Anand Jivan Foundation Trust.
            </p>

            <div className="mx-auto mt-10 max-w-lg rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/35">
                Your Application ID
              </p>

              <p className="mt-4 font-mono text-2xl font-black tracking-[0.12em] text-[#F2C94C] sm:text-3xl">
                {applicationId}
              </p>

              <div className="mx-auto mt-5 h-px max-w-xs bg-white/10" />

              <p className="mt-5 text-[10px] leading-5 text-white/40">
                Keep this ID safely. You can
                use it to track your application
                status and for future
                communication.
              </p>

            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <Link
                href={`/careers/status?applicationId=${encodeURIComponent(
                  applicationId
                )}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F2C94C] px-6 py-3.5 text-xs font-black text-[#102A43] shadow-xl transition hover:-translate-y-0.5"
              >
                Track Application
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <ArrowLeft size={14} />
                Careers
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     INVALID JOB
  ========================================================= */

  if (!selectedJob) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#EAF5F8_0%,#F5F8FA_45%,#EEF3F5_100%)] px-5">

        <div className="w-full max-w-lg">

          <div className="overflow-hidden rounded-[2rem] border border-[#DCE6EB] bg-white shadow-[0_30px_90px_rgba(16,42,67,0.12)]">

            <div className="h-2 bg-gradient-to-r from-[#102A43] via-[#176B87] to-[#F2C94C]" />

            <div className="p-8 text-center sm:p-10">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">

                <AlertCircle
                  size={28}
                />

              </div>

              <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-[#176B87]">
                Recruitment Portal
              </p>

              <h1 className="mt-3 text-2xl font-black text-[#102A43]">
                Vacancy unavailable
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#82919C]">
                This vacancy could not be
                found or is no longer active.
                Please return to Careers and
                select an active position.
              </p>

              <Link
                href="/careers"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#102A43] px-6 py-3 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#176B87]"
              >
                <ArrowLeft size={14} />
                View Active Vacancies
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  /* =========================================================
     FORM
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F4F8FA]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#071D2B] text-white">

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#176B87]/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#F2C94C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:py-12">

          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to Careers
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60">
                  Official Recruitment Portal
                </span>

              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                Career Application
              </h1>

              <p className="mt-4 max-w-2xl text-xs leading-7 text-white/45 sm:text-sm">
                Take the next step in your
                professional journey with
                Anand Jivan Foundation Trust.
                Complete your information
                carefully.
              </p>

            </div>

            {/* JOB CARD */}

            <div className="min-w-[280px] rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">

              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F2C94C]">
                Applying For
              </p>

              <h2 className="mt-2 text-lg font-black">
                {selectedJob.title}
              </h2>

              <p className="mt-1 text-[10px] text-white/45">
                {selectedJob.department}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mx-auto max-w-[1440px] px-5 pt-5 sm:px-8">

          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>

              <p className="text-xs font-black">
                Please review your application
              </p>

              <p className="mt-1 text-[10px] leading-5">
                {error}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-10">

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">

          {/* =================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[1.75rem] border border-[#DCE6EB] bg-white shadow-[0_20px_70px_rgba(16,42,67,0.07)]"
          >

            <input
              type="hidden"
              name="jobId"
              value={jobId}
            />

            {/* PERSONAL */}

            <FormSection
              number="01"
              title="Personal Information"
              icon={<User size={16} />}
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <Field
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />

                <Field
                  label="Father's Name"
                  name="fatherName"
                  placeholder="Enter father's name"
                  required
                />

                <Field
                  label="Mother's Name"
                  name="motherName"
                  placeholder="Enter mother's name"
                />

                <Field
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  required
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
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  placeholder="10 digit mobile number"
                  maxLength={10}
                  required
                />

                <div className="sm:col-span-2">

                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />

                </div>

              </div>

            </FormSection>

            {/* ADDRESS */}

            <FormSection
              number="02"
              title="Contact & Address"
              icon={<MapPin size={16} />}
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">

                  <TextAreaField
                    label="Complete Address"
                    name="address"
                    placeholder="House / Village / Street / Locality"
                    rows={3}
                    required
                  />

                </div>

                <Field
                  label="City"
                  name="city"
                  placeholder="Your city"
                  required
                />

                <Field
                  label="State"
                  name="state"
                  placeholder="Your state"
                  required
                />

                <Field
                  label="PIN Code"
                  name="pincode"
                  placeholder="6 digit PIN"
                  maxLength={6}
                  required
                />

              </div>

            </FormSection>

            {/* EDUCATION */}

            <FormSection
              number="03"
              title="Educational Qualification"
              icon={
                <GraduationCap size={16} />
              }
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <Field
                  label="10th Qualification"
                  name="tenth"
                  placeholder="Board / School / Percentage"
                  required
                />

                <Field
                  label="12th Qualification"
                  name="twelfth"
                  placeholder="Board / School / Percentage"
                  required
                />

                <Field
                  label="Graduation"
                  name="graduation"
                  placeholder="Degree / University / Year"
                  required
                />

                <Field
                  label="Post Graduation"
                  name="postGraduation"
                  placeholder="Degree / University / Year"
                />

                <div className="sm:col-span-2">

                  <Field
                    label="Other Qualification"
                    name="otherQualification"
                    placeholder="Diploma / Certificate / Other"
                  />

                </div>

              </div>

            </FormSection>

            {/* EXPERIENCE */}

            <FormSection
              number="04"
              title="Professional Experience"
              icon={
                <BriefcaseBusiness
                  size={16}
                />
              }
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <SelectField
                  label="Experience Type"
                  name="experienceType"
                  required
                  options={[
                    "Fresher",
                    "Experienced",
                  ]}
                />

                <Field
                  label="Experience"
                  name="experience"
                  placeholder="Example: 2 Years"
                />

                <Field
                  label="Previous Organization"
                  name="organization"
                  placeholder="Organization name"
                />

                <Field
                  label="Previous Designation"
                  name="designation"
                  placeholder="Designation"
                />

              </div>

            </FormSection>

            {/* STATEMENT */}

            <FormSection
              number="05"
              title="Application Statement"
              icon={<FileText size={16} />}
            >

              <TextAreaField
                label="Cover Letter"
                name="coverLetter"
                placeholder="Tell us why you are interested in this position and how your skills can contribute to AJFT..."
                rows={8}
                required
              />

              <p className="mt-2 text-[9px] text-[#9AA7AF]">
                Minimum 30 characters required.
              </p>

            </FormSection>

            {/* DECLARATION */}

            <FormSection
              number="06"
              title="Declaration & Consent"
              icon={
                <ShieldCheck size={16} />
              }
            >

              <label className="group flex cursor-pointer gap-3 rounded-2xl border border-[#E7D8A9] bg-[#FFFCF2] p-4 transition hover:border-[#D3A640]">

                <input
                  type="checkbox"
                  name="declaration"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-[#102A43]"
                />

                <span className="text-[10px] leading-5 text-[#687985]">
                  I declare that the information
                  provided by me is true and
                  correct to the best of my
                  knowledge. I understand that
                  submission of this application
                  does not guarantee selection or
                  appointment.
                </span>

              </label>

            </FormSection>

            {/* SUBMIT */}

            <div className="border-t border-[#E7EEF2] bg-[#F8FAFB] p-5 sm:p-6">

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#102A43] via-[#145B70] to-[#176B87] px-7 text-xs font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={15} />

                    Submit Application

                    <ArrowRight
                      size={14}
                    />
                  </>
                )}

              </button>

              {loading && (
                <p className="mt-3 text-[9px] text-[#8997A2]">
                  Please do not refresh while
                  your application is being
                  processed.
                </p>
              )}

            </div>

          </form>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

            {/* VACANCY */}

            <div className="overflow-hidden rounded-[1.75rem] bg-[#071D2B] text-white shadow-xl">

              <div className="h-1 bg-gradient-to-r from-[#176B87] to-[#F2C94C]" />

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F2C94C]">
                    Selected Vacancy
                  </p>

                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[7px] font-black uppercase text-emerald-300">
                    Open
                  </span>

                </div>

                <h2 className="mt-4 text-xl font-black">
                  {selectedJob.title}
                </h2>

                <p className="mt-1 text-[10px] text-white/45">
                  {selectedJob.department}
                </p>

                <div className="mt-6 space-y-2">

                  <SideInfo
                    icon={<MapPin size={13} />}
                    text={selectedJob.location}
                  />

                  <SideInfo
                    icon={
                      <BriefcaseBusiness
                        size={13}
                      />
                    }
                    text={selectedJob.type}
                  />

                  <SideInfo
                    icon={
                      <GraduationCap
                        size={13}
                      />
                    }
                    text={selectedJob.qualification}
                  />

                  <SideInfo
                    icon={
                      <Users size={13} />
                    }
                    text={selectedJob.experience}
                  />

                </div>

              </div>

            </div>

            {/* PROCESS */}

            <div className="rounded-[1.75rem] border border-[#DCE6EB] bg-white p-6 shadow-sm">

              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#176B87]">
                Recruitment Journey
              </p>

              <div className="mt-6 space-y-5">

                <ProcessLine
                  number="01"
                  title="Application"
                  text="Submit your details."
                  active
                />

                <ProcessLine
                  number="02"
                  title="Review"
                  text="Application screening."
                />

                <ProcessLine
                  number="03"
                  title="Shortlist"
                  text="Eligible candidates contacted."
                />

                <ProcessLine
                  number="04"
                  title="Selection"
                  text="Further recruitment stages."
                />

              </div>

            </div>

            {/* SECURITY */}

            <div className="rounded-[1.75rem] border border-[#DCE6EB] bg-white p-6 shadow-sm">

              <div className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF6F8] text-[#176B87]">
                  <ShieldCheck
                    size={17}
                  />
                </div>

                <div>

                  <p className="text-[10px] font-black text-[#243B53]">
                    Secure Submission
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-[#8997A2]">
                    Your application is submitted
                    through the official AJFT
                    recruitment portal.
                  </p>

                </div>

              </div>

            </div>

            {/* STATUS */}

            <Link
              href="/careers/status"
              className="group flex items-center justify-between rounded-[1.75rem] border border-[#DCE6EB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#176B87] hover:shadow-xl"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102A43] text-white">
                  <FileCheck2
                    size={15}
                  />
                </div>

                <div>

                  <p className="text-[10px] font-black text-[#243B53]">
                    Already Applied?
                  </p>

                  <p className="mt-1 text-[9px] text-[#8997A2]">
                    Track your application
                  </p>

                </div>

              </div>

              <ChevronRight
                size={16}
                className="text-[#176B87] transition group-hover:translate-x-1"
              />

            </Link>

          </aside>

        </div>

      </div>

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
    <section className="border-b border-[#E7EEF2]">

      <div className="border-b border-[#EDF2F4] bg-gradient-to-r from-[#FBFCFD] to-white px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#102A43] text-white shadow-sm">
            {icon}
          </div>

          <div>

            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#B07B10]">
              Section {number}
            </p>

            <h2 className="mt-0.5 text-sm font-black text-[#243B53]">
              {title}
            </h2>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>

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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="block text-[9px] font-black uppercase tracking-[0.08em] text-[#526575]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="mt-2 h-12 w-full rounded-xl border border-[#DCE5EA] bg-white px-3.5 text-xs text-[#243B53] outline-none transition placeholder:text-[#A4AFB7] hover:border-[#B9CBD4] focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
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
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="block text-[9px] font-black uppercase tracking-[0.08em] text-[#526575]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 h-12 w-full rounded-xl border border-[#DCE5EA] bg-white px-3.5 text-xs text-[#243B53] outline-none transition hover:border-[#B9CBD4] focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
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
   TEXTAREA
========================================================= */

function TextAreaField({
  label,
  name,
  placeholder,
  rows = 4,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="block text-[9px] font-black uppercase tracking-[0.08em] text-[#526575]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full resize-none rounded-xl border border-[#DCE5EA] bg-white px-3.5 py-3 text-xs leading-5 text-[#243B53] outline-none transition placeholder:text-[#A4AFB7] hover:border-[#B9CBD4] focus:border-[#176B87] focus:ring-4 focus:ring-[#176B87]/10"
      />

    </div>
  );
}

/* =========================================================
   SIDE INFO
========================================================= */

function SideInfo({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2.5">

      <span className="text-[#F2C94C]">
        {icon}
      </span>

      <span className="text-[9px] font-semibold text-white/55">
        {text}
      </span>

    </div>
  );
}

/* =========================================================
   PROCESS LINE
========================================================= */

function ProcessLine({
  number,
  title,
  text,
  active = false,
}: {
  number: string;
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="flex gap-3">

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-black ${
          active
            ? "bg-[#102A43] text-[#F2C94C]"
            : "bg-[#EEF6F8] text-[#176B87]"
        }`}
      >
        {number}
      </div>

      <div>

        <p className="text-[10px] font-black text-[#243B53]">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] leading-4 text-[#8997A2]">
          {text}
        </p>

      </div>

    </div>
  );
}