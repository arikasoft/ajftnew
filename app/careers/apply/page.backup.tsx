"use client";

import {
  FormEvent,
  useMemo,
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
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

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

export default function CareerApplyPage() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [applicationId, setApplicationId] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  /* =====================================================
     READ JOB ID
  ====================================================== */

  useMemo(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params =
      new URLSearchParams(
        window.location.search
      );

    setJobId(
      params.get("jobId") || ""
    );
  }, []);

  const selectedJob =
    jobs[jobId as JobId] || null;

  /* =====================================================
     SUBMIT
  ====================================================== */

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
        jobId: get("jobId"),
        jobTitle: get("jobTitle"),
        department: get("department"),
        location: get("location"),
        employmentType:
          get("employmentType"),

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
          "Please select a valid vacancy."
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

      const id =
        String(
          result.applicationId ||
            ""
        ).trim();

      if (!id) {
        throw new Error(
          "Application submitted but Application ID was not generated."
        );
      }

      setApplicationId(id);
      setSubmitted(true);

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

  /* =====================================================
     SUCCESS
  ====================================================== */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F4F8FA]">

        <section className="bg-[#0B2535] px-5 py-16 text-white">

          <div className="mx-auto max-w-3xl text-center">

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-emerald-400/10
                text-emerald-300
              "
            >
              <CheckCircle2
                size={42}
              />
            </div>

            <p
              className="
                mt-6
                text-[9px]
                font-black
                uppercase
                tracking-[0.25em]
                text-[#F2C94C]
              "
            >
              Application Submitted
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Thank you for applying.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55">
              Your career application has
              been successfully submitted to
              Anand Jivan Foundation Trust.
            </p>

            <div
              className="
                mx-auto
                mt-8
                max-w-md
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                backdrop-blur
              "
            >

              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/40">
                Application ID
              </p>

              <p
                className="
                  mt-3
                  font-mono
                  text-2xl
                  font-black
                  tracking-wider
                  text-[#F2C94C]
                "
              >
                {applicationId}
              </p>

              <p className="mt-3 text-[9px] leading-5 text-white/40">
                Please keep this Application ID
                safely for future communication
                and status tracking.
              </p>

            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              <Link
                href={`/careers/status?applicationId=${encodeURIComponent(
                  applicationId
                )}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#F2C94C]
                  px-5
                  py-3
                  text-xs
                  font-black
                  text-[#102A43]
                  transition
                  hover:-translate-y-0.5
                "
              >
                Track Application
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/careers"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/15
                  bg-white/5
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Back to Careers
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =====================================================
     INVALID JOB
  ====================================================== */

  if (!selectedJob) {
    return (
      <main className="min-h-screen bg-[#F4F8FA]">

        <div className="mx-auto max-w-3xl px-5 py-20">

          <div
            className="
              rounded-[1.5rem]
              border
              border-red-200
              bg-white
              p-8
              text-center
              shadow-xl
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-500
              "
            >
              <AlertCircle size={25} />
            </div>

            <h1 className="mt-5 text-xl font-black text-[#102A43]">
              Vacancy not found
            </h1>

            <p className="mt-2 text-xs text-[#82919C]">
              Please return to Careers and
              select an active vacancy.
            </p>

            <Link
              href="/careers"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#102A43]
                px-5
                py-3
                text-xs
                font-black
                text-white
              "
            >
              <ArrowLeft size={14} />
              Back to Careers
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =====================================================
     FORM
  ====================================================== */

  return (
    <main className="min-h-screen bg-[#F4F8FA]">

      {/* HEADER */}

      <section className="bg-[#0B2535] text-white">

        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8">

          <Link
            href="/careers"
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-bold
              text-white/50
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={13} />
            Back to Careers
          </Link>

          <div
            className="
              mt-7
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-[#F2C94C]
                "
              >
                Official Recruitment Portal
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                Career Application
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/50">
                Complete the form carefully.
                Fields marked with * are required.
              </p>

            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-4
              "
            >

              <p className="text-[8px] font-black uppercase tracking-wider text-white/35">
                Application For
              </p>

              <p className="mt-1 text-sm font-black text-white">
                {selectedJob.title}
              </p>

              <p className="mt-1 text-[9px] text-[#F2C94C]">
                {selectedJob.department}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ERROR */}

      {error && (
        <div className="mx-auto max-w-[1440px] px-5 pt-5 sm:px-8">

          <div
            className="
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-red-700
            "
          >

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="text-xs font-black">
                Application Error
              </p>

              <p className="mt-1 text-[10px] leading-5">
                {error}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* MAIN */}

      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
              overflow-hidden
              rounded-[1.5rem]
              border
              border-[#DCE6EB]
              bg-white
              shadow-[0_15px_45px_rgba(16,42,67,0.07)]
            "
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

            <FormSection
              number="01"
              title="Personal Information"
              icon={<User size={16} />}
            >

              <div className="grid gap-4 sm:grid-cols-2">

                <Field
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter full name"
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

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                />

              </div>

            </FormSection>

            <FormSection
              number="02"
              title="Address"
              icon={<MapPin size={16} />}
            >

              <div className="grid gap-4 sm:grid-cols-2">

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

            <FormSection
              number="03"
              title="Educational Qualification"
              icon={
                <GraduationCap size={16} />
              }
            >

              <div className="grid gap-4 sm:grid-cols-2">

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
                    placeholder="Diploma, certificate or other qualification"
                  />

                </div>

              </div>

            </FormSection>

            <FormSection
              number="04"
              title="Professional Experience"
              icon={
                <BriefcaseBusiness
                  size={16}
                />
              }
            >

              <div className="grid gap-4 sm:grid-cols-2">

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

            <FormSection
              number="05"
              title="Application Statement"
              icon={<FileText size={16} />}
            >

              <TextAreaField
                label="Cover Letter"
                name="coverLetter"
                placeholder="Tell us why you are interested in this position and how your skills can contribute to AJFT..."
                rows={7}
                required
              />

            </FormSection>

            <FormSection
              number="06"
              title="Declaration"
              icon={
                <ShieldCheck size={16} />
              }
            >

              <label
                className="
                  flex
                  gap-3
                  rounded-xl
                  border
                  border-[#E7D8A9]
                  bg-[#FFFBEE]
                  p-4
                "
              >

                <input
                  type="checkbox"
                  name="declaration"
                  required
                  className="
                    mt-1
                    h-4
                    w-4
                    shrink-0
                    accent-[#102A43]
                  "
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

            <div
              className="
                border-t
                border-[#E7EEF2]
                bg-[#F8FAFB]
                p-5
                sm:p-6
              "
            >

              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#102A43]
                  to-[#176B87]
                  px-6
                  text-xs
                  font-black
                  text-white
                  shadow-lg
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Submitting Application...
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
                <p className="mt-3 text-[9px] text-[#8997A2]">
                  Please do not refresh the page
                  while your application is being
                  processed.
                </p>
              )}

            </div>

          </form>

          {/* SIDEBAR */}

          <aside className="space-y-5">

            {/* VACANCY */}

            <div
              className="
                overflow-hidden
                rounded-[1.5rem]
                bg-[#0B2535]
                text-white
                shadow-xl
              "
            >

              <div className="p-5">

                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F2C94C]">
                  Selected Vacancy
                </p>

                <h2 className="mt-3 text-lg font-black">
                  {selectedJob.title}
                </h2>

                <p className="mt-1 text-[10px] text-white/45">
                  {selectedJob.department}
                </p>

                <div className="mt-5 space-y-2">

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

            {/* APPLICATION PROCESS */}

            <div
              className="
                rounded-[1.5rem]
                border
                border-[#DCE6EB]
                bg-white
                p-5
                shadow-sm
              "
            >

              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#176B87]">
                Application Process
              </p>

              <div className="mt-5 space-y-4">

                <ProcessLine
                  number="01"
                  title="Submit"
                  text="Complete the application."
                />

                <ProcessLine
                  number="02"
                  title="Review"
                  text="AJFT reviews your application."
                />

                <ProcessLine
                  number="03"
                  title="Shortlist"
                  text="Eligible candidates may be contacted."
                />

                <ProcessLine
                  number="04"
                  title="Selection"
                  text="Further recruitment stages follow."
                />

              </div>

            </div>

            {/* SECURITY */}

            <div
              className="
                rounded-[1.5rem]
                border
                border-[#DCE6EB]
                bg-white
                p-5
              "
            >

              <div className="flex gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EEF6F8]
                    text-[#176B87]
                  "
                >
                  <ShieldCheck
                    size={16}
                  />
                </div>

                <div>

                  <p className="text-[10px] font-black text-[#243B53]">
                    Information Security
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-[#8997A2]">
                    Please provide accurate
                    information and use only
                    the official AJFT recruitment
                    portal.
                  </p>

                </div>

              </div>

            </div>

            {/* STATUS */}

            <Link
              href="/careers/status"
              className="
                flex
                items-center
                justify-between
                rounded-[1.5rem]
                border
                border-[#DCE6EB]
                bg-white
                p-5
                transition
                hover:border-[#176B87]
                hover:shadow-lg
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#102A43]
                    text-white
                  "
                >
                  <FileCheck2
                    size={15}
                  />
                </div>

                <div>

                  <p className="text-[10px] font-black text-[#243B53]">
                    Already Applied?
                  </p>

                  <p className="mt-1 text-[9px] text-[#8997A2]">
                    Check application status
                  </p>

                </div>

              </div>

              <ChevronRight
                size={16}
                className="text-[#176B87]"
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

      <div className="border-b border-[#EDF2F4] bg-[#FBFCFD] px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#102A43]
              text-white
            "
          >
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
        className="
          block
          text-[9px]
          font-black
          uppercase
          tracking-[0.08em]
          text-[#526575]
        "
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
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-[#DCE5EA]
          bg-white
          px-3.5
          text-xs
          text-[#243B53]
          outline-none
          transition
          placeholder:text-[#A4AFB7]
          focus:border-[#176B87]
          focus:ring-4
          focus:ring-[#176B87]/10
        "
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
        className="
          block
          text-[9px]
          font-black
          uppercase
          tracking-[0.08em]
          text-[#526575]
        "
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
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-[#DCE5EA]
          bg-white
          px-3.5
          text-xs
          text-[#243B53]
          outline-none
          transition
          focus:border-[#176B87]
          focus:ring-4
          focus:ring-[#176B87]/10
        "
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
        className="
          block
          text-[9px]
          font-black
          uppercase
          tracking-[0.08em]
          text-[#526575]
        "
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
        className="
          mt-2
          w-full
          resize-none
          rounded-xl
          border
          border-[#DCE5EA]
          bg-white
          px-3.5
          py-3
          text-xs
          leading-5
          text-[#243B53]
          outline-none
          transition
          placeholder:text-[#A4AFB7]
          focus:border-[#176B87]
          focus:ring-4
          focus:ring-[#176B87]/10
        "
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
    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">

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
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">

      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#EEF6F8]
          font-mono
          text-[8px]
          font-black
          text-[#176B87]
        "
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