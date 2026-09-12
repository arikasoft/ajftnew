"use client";

import {
  FormEvent,
  ReactNode,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Info,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Users,
  X,
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
   COLORS
========================================================= */

const colors = {
  ink: "#0B1F33",
  navy: "#102A43",
  navyDark: "#071827",
  teal: "#0F7183",
  tealLight: "#EAF7F8",
  gold: "#D7A83E",
  goldLight: "#FFF8E8",
  border: "#DCE7EC",
  muted: "#738391",
  bg: "#F4F8FA",
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

  const [coverLetterLength, setCoverLetterLength] =
    useState(0);

  const [resumeName, setResumeName] =
    useState("");

  const [experienceType, setExperienceType] =
    useState("");

  const selectedJob =
    jobs[jobId as JobId] || null;

  const progress = useMemo(() => {
    return experienceType === "Experienced"
      ? 100
      : 95;
  }, [experienceType]);

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

      const coverLetter =
        get("coverLetter");

      const payload = {
        jobId,

        jobTitle:
          selectedJob?.title || "",

        department:
          selectedJob?.department || "",

        location:
          selectedJob?.location || "",

        employmentType:
          selectedJob?.type || "",

        /* PERSONAL */

        fullName:
          get("fullName"),

        fatherName:
          get("fatherName"),

        motherName:
          get("motherName"),

        dob:
          get("dob"),

        gender:
          get("gender"),

        email:
          get("email").toLowerCase(),

        phone:
          get("phone"),

        /* ADDRESS */

        address:
          get("address"),

        city:
          get("city"),

        state:
          get("state"),

        pincode:
          get("pincode"),

        /* EDUCATION */

        tenth:
          get("tenth"),

        twelfth:
          get("twelfth"),

        graduation:
          get("graduation"),

        postGraduation:
          get("postGraduation"),

        otherQualification:
          get("otherQualification"),

        /* EXPERIENCE */

        experienceType,

        organization:
          get("organization"),

        designation:
          get("designation"),

        experience:
          get("experience"),

        /* RESUME */

        resumeName:
          formData.get("resume") instanceof
          File
            ? (
                formData.get(
                  "resume"
                ) as File
              ).name
            : "",

        /* COVER LETTER */

        coverLetter,

        /* DECLARATION */

        declarationAccepted:
          formData.get(
            "declaration"
          ) === "on",
      };

      /* =================================================
         BASIC VALIDATION
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

      /* ADDRESS */

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

      /* EDUCATION */

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

      /* EXPERIENCE */

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

      /* COVER LETTER - OPTIONAL */

      if (
        coverLetter.length > 0 &&
        coverLetter.length < 30
      ) {
        throw new Error(
          "If provided, the cover letter should contain at least 30 characters."
        );
      }

      /* DECLARATION */

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

      let result: any = null;

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
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <main
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(180deg,#071827 0%,#0B2538 42%,#F4F8FA 42%,#F4F8FA 100%)",
        }}
      >
        <section className="relative overflow-hidden px-5 py-16 sm:py-24">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0F7183]/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#D7A83E]/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] text-white shadow-[0_35px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl">

              <div className="h-1.5 bg-gradient-to-r from-[#0F7183] via-[#D7A83E] to-[#0F7183]" />

              <div className="px-6 py-12 text-center sm:px-12 sm:py-16">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-2xl">

                  <CheckCircle2
                    size={48}
                  />

                </div>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D7A83E]/20 bg-[#D7A83E]/10 px-4 py-2">

                  <Sparkles
                    size={13}
                    className="text-[#D7A83E]"
                  />

                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#E7C96E]">
                    Application Received
                  </span>

                </div>

                <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                  Thank you for applying.
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55">
                  Your application has been
                  successfully submitted to
                  Anand Jivan Foundation Trust.
                  Our recruitment team will
                  review your application.
                </p>

                {/* APPLICATION ID */}

                <div className="mx-auto mt-10 max-w-xl rounded-[1.5rem] border border-[#D7A83E]/20 bg-black/10 p-7">

                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/35">
                    Application ID
                  </p>

                  <p className="mt-4 break-all font-mono text-2xl font-black tracking-[0.12em] text-[#E7C96E] sm:text-3xl">
                    {applicationId}
                  </p>

                  <div className="mx-auto mt-6 h-px max-w-xs bg-white/10" />

                  <p className="mt-5 text-[10px] leading-5 text-white/40">
                    Please keep this Application
                    ID safely. It can be used
                    to track your recruitment
                    application.
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                  <Link
                    href={`/careers/status?applicationId=${encodeURIComponent(
                      applicationId
                    )}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D7A83E] px-7 py-3.5 text-xs font-black text-[#0B1F33] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#E7C96E]"
                  >
                    Track Application
                    <ArrowRight
                      size={15}
                    />
                  </Link>

                  <Link
                    href="/careers"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    <ArrowLeft
                      size={14}
                    />
                    Back to Careers
                  </Link>

                </div>

              </div>

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
      <main className="flex min-h-screen items-center justify-center bg-[#F4F8FA] px-5">

        <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#DCE7EC] bg-white shadow-[0_30px_90px_rgba(11,31,51,0.12)]">

          <div className="h-1.5 bg-gradient-to-r from-[#102A43] via-[#0F7183] to-[#D7A83E]" />

          <div className="p-8 text-center sm:p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">

              <AlertCircle
                size={28}
              />

            </div>

            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-[#0F7183]">
              Recruitment
            </p>

            <h1 className="mt-3 text-2xl font-black text-[#102A43]">
              Vacancy unavailable
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#738391]">
              This vacancy could not be
              found or is no longer active.
              Please return to Careers and
              select an active position.
            </p>

            <Link
              href="/careers"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#102A43] px-6 py-3.5 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0F7183]"
            >
              <ArrowLeft
                size={14}
              />
              View Active Vacancies
            </Link>

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

      <section className="relative overflow-hidden bg-[#071827] text-white">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0F7183]/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#D7A83E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px] px-5 pb-12 pt-7 sm:px-8 lg:px-12 lg:pb-16">

          {/* TOP NAV */}

          <div className="flex items-center justify-between">

            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-bold text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft
                size={13}
              />
              Careers
            </Link>

            <div className="hidden items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/30 sm:flex">
              <ShieldCheck
                size={13}
              />
              Secure Application
            </div>

          </div>

          {/* HERO CONTENT */}

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_430px] lg:items-end">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D7A83E]/20 bg-[#D7A83E]/10 px-4 py-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#D7A83E]" />

                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[#E7C96E]">
                  Official Recruitment
                </span>

              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Build your career
                <span className="block text-[#D7A83E]">
                  with purpose.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                Complete your application
                carefully. Your information
                will be reviewed by the
                Anand Jivan Foundation Trust
                recruitment team.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <HeroPill
                  icon={
                    <BadgeCheck
                      size={13}
                    />
                  }
                  text="Official Application"
                />

                <HeroPill
                  icon={
                    <ShieldCheck
                      size={13}
                    />
                  }
                  text="Secure Submission"
                />

                <HeroPill
                  icon={
                    <ClipboardCheck
                      size={13}
                    />
                  }
                  text="Application Tracking"
                />

              </div>

            </div>

            {/* VACANCY CARD */}

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl backdrop-blur-xl">

              <div className="h-1 bg-gradient-to-r from-[#0F7183] via-[#D7A83E] to-[#0F7183]" />

              <div className="p-6 sm:p-7">

                <div className="flex items-center justify-between gap-4">

                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#D7A83E]">
                    Applying For
                  </p>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/10 bg-emerald-400/10 px-3 py-1.5 text-[7px] font-black uppercase tracking-wider text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Open
                  </span>

                </div>

                <h2 className="mt-4 text-2xl font-black">
                  {selectedJob.title}
                </h2>

                <p className="mt-2 text-[10px] text-white/40">
                  {selectedJob.department}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">

                  <MiniJobInfo
                    icon={
                      <MapPin
                        size={13}
                      />
                    }
                    label="Location"
                    value={
                      selectedJob.location
                    }
                  />

                  <MiniJobInfo
                    icon={
                      <BriefcaseBusiness
                        size={13}
                      />
                    }
                    label="Type"
                    value={
                      selectedJob.type
                    }
                  />

                  <MiniJobInfo
                    icon={
                      <GraduationCap
                        size={13}
                      />
                    }
                    label="Qualification"
                    value={
                      selectedJob.qualification
                    }
                  />

                  <MiniJobInfo
                    icon={
                      <Users
                        size={13}
                      />
                    }
                    label="Experience"
                    value={
                      selectedJob.experience
                    }
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div className="border-b border-[#DCE7EC] bg-white">

        <div className="mx-auto max-w-[1500px] px-5 py-4 sm:px-8 lg:px-12">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#0F7183]">
                Application Progress
              </p>

              <p className="mt-1 text-[10px] font-semibold text-[#738391]">
                Complete all required
                information before submitting.
              </p>

            </div>

            <span className="font-mono text-xs font-black text-[#102A43]">
              {progress}%
            </span>

          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EAF0F3]">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#102A43] via-[#0F7183] to-[#D7A83E] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mx-auto max-w-[1500px] px-5 pt-6 sm:px-8 lg:px-12">

          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">

              <AlertCircle
                size={17}
              />

            </div>

            <div className="flex-1">

              <p className="text-xs font-black text-red-800">
                Application could not be
                submitted
              </p>

              <p className="mt-1 text-[10px] leading-5 text-red-600">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
              aria-label="Close error"
            >
              <X size={15} />
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_370px]">

          {/* =================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[2rem] border border-[#DCE7EC] bg-white shadow-[0_25px_80px_rgba(11,31,51,0.07)]"
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
              description="Tell us about yourself."
              icon={
                <CircleUserRound
                  size={18}
                />
              }
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
                  inputMode="numeric"
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
              description="Where can we reach you?"
              icon={
                <MapPin
                  size={18}
                />
              }
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
                  inputMode="numeric"
                />

              </div>

            </FormSection>

            {/* EDUCATION */}

            <FormSection
              number="03"
              title="Educational Qualification"
              description="Provide your academic background."
              icon={
                <GraduationCap
                  size={18}
                />
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
              description="Share your professional background."
              icon={
                <BriefcaseBusiness
                  size={18}
                />
              }
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <SelectField
                  label="Experience Type"
                  name="experienceType"
                  required
                  value={experienceType}
                  onChange={setExperienceType}
                  options={[
                    "Fresher",
                    "Experienced",
                  ]}
                />

                {experienceType ===
                  "Experienced" ? (
                  <>
                    <Field
                      label="Total Experience"
                      name="experience"
                      placeholder="Example: 2 Years"
                      required
                    />

                    <Field
                      label="Previous Organization"
                      name="organization"
                      placeholder="Organization name"
                      required
                    />

                    <Field
                      label="Previous Designation"
                      name="designation"
                      placeholder="Designation"
                      required
                    />
                  </>
                ) : (
                  <div className="flex items-center rounded-2xl border border-[#DCE7EC] bg-[#F8FAFB] p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF7F8] text-[#0F7183]">
                      <Sparkles
                        size={17}
                      />
                    </div>

                    <div className="ml-3">

                      <p className="text-[10px] font-black text-[#243B53]">
                        Starting your career?
                      </p>

                      <p className="mt-1 text-[9px] leading-4 text-[#8795A0]">
                        Freshers are welcome to
                        apply for eligible positions.
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </FormSection>

            {/* DOCUMENT */}

            <FormSection
              number="05"
              title="Resume & Application Statement"
              description="Add your resume and optional cover letter."
              icon={
                <FileText size={18} />
              }
            >

              {/* RESUME */}

              <div>

                <label
                  htmlFor="resume"
                  className="block text-[9px] font-black uppercase tracking-[0.08em] text-[#526575]"
                >
                  Resume / CV
                  <span className="ml-1 text-[#9AA7AF]">
                    (Optional)
                  </span>
                </label>

                <label
                  htmlFor="resume"
                  className="mt-2 flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-[#BFD0D8] bg-[#F8FAFB] p-5 transition hover:border-[#0F7183] hover:bg-[#F3FAFB]"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F7183] shadow-sm">

                    {resumeName ? (
                      <FileCheck2
                        size={20}
                      />
                    ) : (
                      <Upload
                        size={20}
                      />
                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-xs font-black text-[#243B53]">
                      {resumeName
                        ? resumeName
                        : "Upload your resume"}
                    </p>

                    <p className="mt-1 text-[9px] text-[#8997A2]">
                      PDF, DOC or DOCX
                    </p>

                  </div>

                  <span className="rounded-lg bg-[#102A43] px-3 py-2 text-[8px] font-black text-white">
                    Browse
                  </span>

                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(event) =>
                      setResumeName(
                        event.target.files?.[0]
                          ?.name || ""
                      )
                    }
                  />

                </label>

              </div>

              {/* COVER LETTER */}

              <div className="mt-6">

                <TextAreaField
                  label="Cover Letter"
                  name="coverLetter"
                  placeholder="Tell us why you are interested in this position and how your skills can contribute to Anand Jivan Foundation Trust..."
                  rows={8}
                  onChange={(value) =>
                    setCoverLetterLength(
                      value.length
                    )
                  }
                />

                <div className="mt-2 flex items-center justify-between">

                  <p className="text-[9px] text-[#9AA7AF]">
                    Optional. If provided,
                    minimum 30 characters.
                  </p>

                  <span
                    className={`font-mono text-[9px] ${
                      coverLetterLength > 0 &&
                      coverLetterLength < 30
                        ? "text-amber-600"
                        : "text-[#9AA7AF]"
                    }`}
                  >
                    {coverLetterLength}
                    /30
                  </span>

                </div>

              </div>

            </FormSection>

            {/* DECLARATION */}

            <FormSection
              number="06"
              title="Declaration & Consent"
              description="Review before submitting."
              icon={
                <ShieldCheck size={18} />
              }
            >

              <label className="group flex cursor-pointer gap-4 rounded-2xl border border-[#E6D7A8] bg-[#FFFCF3] p-5 transition hover:border-[#D7A83E]">

                <input
                  type="checkbox"
                  name="declaration"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-[#102A43]"
                />

                <span>

                  <span className="block text-[10px] font-black text-[#243B53]">
                    I confirm that the information
                    provided is accurate.
                  </span>

                  <span className="mt-2 block text-[10px] leading-5 text-[#687985]">
                    I declare that the information
                    provided by me is true and
                    correct to the best of my
                    knowledge. I understand that
                    submission of this application
                    does not guarantee selection or
                    appointment.
                  </span>

                </span>

              </label>

            </FormSection>

            {/* SUBMIT */}

            <div className="border-t border-[#E7EEF2] bg-[#F8FAFB] p-5 sm:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF7F8] text-[#0F7183]">
                    <ShieldCheck
                      size={17}
                    />
                  </div>

                  <div>

                    <p className="text-[10px] font-black text-[#243B53]">
                      Ready to submit?
                    </p>

                    <p className="mt-1 max-w-md text-[9px] leading-4 text-[#8997A2]">
                      Please ensure all required
                      information is correct before
                      submitting your application.
                    </p>

                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#102A43] via-[#0F6072] to-[#0F7183] px-8 text-xs font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send
                        size={15}
                      />
                      Submit Application
                      <ArrowRight
                        size={14}
                      />
                    </>
                  )}

                </button>

              </div>

              {loading && (
                <div className="mt-4 flex items-center gap-2 text-[9px] text-[#8997A2]">

                  <Loader2
                    size={12}
                    className="animate-spin text-[#0F7183]"
                  />

                  Please do not refresh while
                  your application is being
                  processed.

                </div>
              )}

            </div>

          </form>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

            {/* VACANCY */}

            <div className="overflow-hidden rounded-[2rem] bg-[#071827] text-white shadow-2xl">

              <div className="h-1.5 bg-gradient-to-r from-[#0F7183] via-[#D7A83E] to-[#0F7183]" />

              <div className="p-6 sm:p-7">

                <div className="flex items-center justify-between">

                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#D7A83E]">
                    Selected Vacancy
                  </p>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[7px] font-black uppercase text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Open
                  </span>

                </div>

                <h2 className="mt-5 text-2xl font-black">
                  {selectedJob.title}
                </h2>

                <p className="mt-2 text-[10px] leading-5 text-white/40">
                  {selectedJob.department}
                </p>

                <div className="mt-7 space-y-2">

                  <SideInfo
                    icon={
                      <MapPin
                        size={13}
                      />
                    }
                    label="Location"
                    text={
                      selectedJob.location
                    }
                  />

                  <SideInfo
                    icon={
                      <BriefcaseBusiness
                        size={13}
                      />
                    }
                    label="Employment"
                    text={
                      selectedJob.type
                    }
                  />

                  <SideInfo
                    icon={
                      <GraduationCap
                        size={13}
                      />
                    }
                    label="Qualification"
                    text={
                      selectedJob.qualification
                    }
                  />

                  <SideInfo
                    icon={
                      <Users
                        size={13}
                      />
                    }
                    label="Experience"
                    text={
                      selectedJob.experience
                    }
                  />

                </div>

              </div>

            </div>

            {/* RECRUITMENT JOURNEY */}

            <div className="rounded-[2rem] border border-[#DCE7EC] bg-white p-6 shadow-sm sm:p-7">

              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#0F7183]">
                Recruitment Journey
              </p>

              <div className="mt-7 space-y-6">

                <ProcessLine
                  number="01"
                  title="Application"
                  text="Submit your details."
                  active
                />

                <ProcessLine
                  number="02"
                  title="Review"
                  text="Our team screens your application."
                />

                <ProcessLine
                  number="03"
                  title="Shortlist"
                  text="Eligible candidates are contacted."
                />

                <ProcessLine
                  number="04"
                  title="Selection"
                  text="Further recruitment stages."
                />

              </div>

            </div>

            {/* CONTACT */}

            <div className="rounded-[2rem] border border-[#DCE7EC] bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7F8] text-[#0F7183]">
                  <Info
                    size={18}
                  />
                </div>

                <div>

                  <p className="text-[10px] font-black text-[#243B53]">
                    Need assistance?
                  </p>

                  <p className="mt-1 text-[9px] text-[#8997A2]">
                    Contact the AJFT team.
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-2">

                <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFB] px-3 py-3">

                  <Mail
                    size={14}
                    className="text-[#0F7183]"
                  />

                  <span className="text-[9px] font-semibold text-[#526575]">
                    info@ajftrust.org
                  </span>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFB] px-3 py-3">

                  <Phone
                    size={14}
                    className="text-[#0F7183]"
                  />

                  <span className="text-[9px] font-semibold text-[#526575]">
                    +91 9155751363
                  </span>

                </div>

              </div>

            </div>

            {/* STATUS */}

            <Link
              href="/careers/status"
              className="group flex items-center justify-between rounded-[2rem] border border-[#DCE7EC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F7183] hover:shadow-xl"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#102A43] text-white">
                  <FileCheck2
                    size={16}
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
                size={17}
                className="text-[#0F7183] transition group-hover:translate-x-1"
              />

            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   HERO PILL
========================================================= */

function HeroPill({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">

      <span className="text-[#D7A83E]">
        {icon}
      </span>

      <span className="text-[8px] font-bold text-white/50">
        {text}
      </span>

    </div>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  number,
  title,
  description,
  icon,
  children,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-[#E7EEF2]">

      <div className="border-b border-[#EDF2F4] bg-gradient-to-r from-[#FBFCFD] via-white to-[#FBFCFD] px-5 py-5 sm:px-7">

        <div className="flex items-center gap-4">

          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-white shadow-md">

            {icon}

            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#D7A83E] px-1 font-mono text-[7px] font-black text-[#102A43]">
              {number}
            </span>

          </div>

          <div>

            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B07B10]">
              Application Section
            </p>

            <h2 className="mt-1 text-sm font-black text-[#243B53] sm:text-base">
              {title}
            </h2>

            <p className="mt-1 text-[9px] text-[#8997A2]">
              {description}
            </p>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-7">
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
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url"
    | "none";
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
        inputMode={inputMode}
        autoComplete="off"
        className="mt-2 h-12 w-full rounded-xl border border-[#DCE5EA] bg-white px-3.5 text-xs text-[#243B53] outline-none transition placeholder:text-[#A4AFB7] hover:border-[#B8CBD4] focus:border-[#0F7183] focus:ring-4 focus:ring-[#0F7183]/10"
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
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (
    value: string
  ) => void;
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
        value={value}
        defaultValue={
          value === undefined
            ? ""
            : undefined
        }
        onChange={(event) =>
          onChange?.(
            event.target.value
          )
        }
        className="mt-2 h-12 w-full rounded-xl border border-[#DCE5EA] bg-white px-3.5 text-xs text-[#243B53] outline-none transition hover:border-[#B8CBD4] focus:border-[#0F7183] focus:ring-4 focus:ring-[#0F7183]/10"
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
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  onChange?: (
    value: string
  ) => void;
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
        onChange={(event) =>
          onChange?.(
            event.target.value
          )
        }
        className="mt-2 w-full resize-none rounded-xl border border-[#DCE5EA] bg-white px-3.5 py-3.5 text-xs leading-5 text-[#243B53] outline-none transition placeholder:text-[#A4AFB7] hover:border-[#B8CBD4] focus:border-[#0F7183] focus:ring-4 focus:ring-[#0F7183]/10"
      />

    </div>
  );
}

/* =========================================================
   MINI JOB INFO
========================================================= */

function MiniJobInfo({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3">

      <div className="flex items-center gap-2">

        <span className="text-[#D7A83E]">
          {icon}
        </span>

        <span className="text-[7px] font-black uppercase tracking-wider text-white/30">
          {label}
        </span>

      </div>

      <p className="mt-2 text-[9px] font-semibold leading-4 text-white/60">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   SIDE INFO
========================================================= */

function SideInfo({
  icon,
  label,
  text,
}: {
  icon: ReactNode;
  label: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-3">

      <span className="text-[#D7A83E]">
        {icon}
      </span>

      <div>

        <p className="text-[7px] font-black uppercase tracking-wider text-white/25">
          {label}
        </p>

        <p className="mt-0.5 text-[9px] font-semibold text-white/60">
          {text}
        </p>

      </div>

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
    <div className="relative flex gap-4">

      <div
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-black ${
          active
            ? "bg-[#102A43] text-[#D7A83E] shadow-lg"
            : "bg-[#EAF7F8] text-[#0F7183]"
        }`}
      >
        {active ? (
          <Check size={14} />
        ) : (
          number
        )}
      </div>

      <div className="pt-0.5">

        <p className="text-[10px] font-black text-[#243B53]">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-[#8997A2]">
          {text}
        </p>

      </div>

    </div>
  );
}