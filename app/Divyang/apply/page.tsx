
"use client";

import {
  Accessibility,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  Home,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Upload,
  User,
  Users,
  Wheelchair,
} from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type FormDataType = {
  fullName: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  dob: string;
  gender: string;

  mobile: string;
  email: string;

  disabilityType: string;
  disabilityPercentage: string;
  udidNumber: string;
  certificateNumber: string;

  assistanceType: string[];
  assistanceDescription: string;

  address: string;
  village: string;
  block: string;
  district: string;
  state: string;
  pincode: string;

  annualIncome: string;
  employmentStatus: string;
};

const assistanceOptions = [
  {
    id: "medical",
    title: "Medical Assistance",
    description: "Support for treatment, medicines and healthcare.",
    icon: HeartHandshake,
  },
  {
    id: "education",
    title: "Education Support",
    description: "Educational assistance and learning support.",
    icon: GraduationCap,
  },
  {
    id: "mobility",
    title: "Mobility Support",
    description: "Wheelchair, mobility aids and assistive devices.",
    icon: Wheelchair,
  },
  {
    id: "livelihood",
    title: "Livelihood Support",
    description: "Skill development and livelihood opportunities.",
    icon: BriefcaseBusiness,
  },
  {
    id: "emergency",
    title: "Emergency Assistance",
    description: "Essential and emergency support services.",
    icon: AlertCircle,
  },
  {
    id: "other",
    title: "Other Assistance",
    description: "Other genuine support requirements.",
    icon: Users,
  },
];

const steps = [
  "Personal Details",
  "Disability Details",
  "Assistance Required",
  "Address & Review",
];

export default function DivyangApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [success, setSuccess] = useState(false);

  const [certificateFile, setCertificateFile] = useState<File | null>(
    null
  );

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    dob: "",
    gender: "",

    mobile: "",
    email: "",

    disabilityType: "",
    disabilityPercentage: "",
    udidNumber: "",
    certificateNumber: "",

    assistanceType: [],
    assistanceDescription: "",

    address: "",
    village: "",
    block: "",
    district: "",
    state: "Bihar",
    pincode: "",

    annualIncome: "",
    employmentStatus: "",
  });

  const progress = useMemo(() => {
    return Math.round((currentStep / steps.length) * 100);
  }, [currentStep]);

  const updateField = (
    field: keyof FormDataType,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleAssistance = (id: string) => {
    setFormData((previous) => {
      const exists = previous.assistanceType.includes(id);

      return {
        ...previous,
        assistanceType: exists
          ? previous.assistanceType.filter(
              (item) => item !== id
            )
          : [...previous.assistanceType, id],
      };
    });
  };

  const handleCertificate = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setCertificateFile(file);
  };

  const handlePhoto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setPhotoFile(file);
  };

  const validateStep = () => {
    setError("");

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setError("Applicant full name is required.");
        return false;
      }

      if (!formData.dob) {
        setError("Date of birth is required.");
        return false;
      }

      if (!formData.mobile.trim()) {
        setError("Mobile number is required.");
        return false;
      }

      if (formData.mobile.replace(/\D/g, "").length < 10) {
        setError("Please enter a valid mobile number.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.disabilityType) {
        setError("Please select disability type.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (formData.assistanceType.length === 0) {
        setError("Please select at least one assistance requirement.");
        return false;
      }
    }

    if (currentStep === 4) {
      if (!formData.address.trim()) {
        setError("Complete address is required.");
        return false;
      }

      if (!formData.district.trim()) {
        setError("District is required.");
        return false;
      }

      if (!formData.state.trim()) {
        setError("State is required.");
        return false;
      }

      if (!formData.pincode.trim()) {
        setError("Pincode is required.");
        return false;
      }

      if (formData.pincode.replace(/\D/g, "").length !== 6) {
        setError("Please enter a valid 6 digit pincode.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (currentStep < steps.length) {
      setCurrentStep((value) => value + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    setError("");

    if (currentStep > 1) {
      setCurrentStep((value) => value - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const submitApplication = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateStep()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/divyang/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,

            // Compatibility aliases
            applicantName: formData.fullName,
            name: formData.fullName,

            dateOfBirth: formData.dob,

            assistanceRequired:
              formData.assistanceType,

            status: "submitted",

            certificateFileName:
              certificateFile?.name || "",

            photoFileName:
              photoFile?.name || "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to submit your application."
        );
      }

      setApplicationId(
        data.applicationId ||
          data.application?.applicationId ||
          data.application?.applicationNo ||
          data.id ||
          "AJFT-DIV-2026"
      );

      setSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f4f8fa]">

        {/* SUCCESS HERO */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#123846] via-[#174f60] to-[#08756f]">

          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#f4c95d]/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">

              <CheckCircle2
                size={42}
                className="text-[#72e0bd]"
              />

            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">

              <BadgeCheck
                size={15}
                className="text-[#f4c95d]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
                Application Received Successfully
              </span>

            </div>

            <h1 className="mt-6 text-3xl font-black text-white sm:text-5xl">
              Thank You For Your Application
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Your Divyang Assistance Application has been
              successfully submitted to Anand Jivan Foundation Trust.
            </p>

          </div>

          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="block h-[55px] w-full sm:h-[80px]"
          >
            <path
              d="M0 55 C180 105 340 100 520 62 C700 22 880 28 1050 68 C1210 105 1330 92 1440 50 L1440 100 L0 100 Z"
              fill="#f4f8fa"
            />
          </svg>

        </section>

        {/* SUCCESS CONTENT */}

        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/5">

            <div className="border-b border-slate-100 bg-gradient-to-r from-[#f7fffb] to-[#eef8fb] px-6 py-7 text-center sm:px-10">

              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#08756f]">
                Your Application ID
              </p>

              <div className="mt-4 rounded-2xl border border-[#08756f]/15 bg-white px-5 py-5">

                <p className="break-all text-xl font-black tracking-wide text-[#123846] sm:text-3xl">
                  {applicationId}
                </p>

              </div>

              <p className="mt-4 text-xs leading-6 text-slate-500">
                Please save this Application ID for future tracking
                and communication.
              </p>

            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">

                <ClipboardCheck
                  className="mx-auto text-[#08756f]"
                  size={25}
                />

                <h3 className="mt-3 text-sm font-black text-[#123846]">
                  Application Submitted
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Your application has been recorded successfully.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">

                <FileText
                  className="mx-auto text-[#2563eb]"
                  size={25}
                />

                <h3 className="mt-3 text-sm font-black text-[#123846]">
                  Verification Process
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Submitted information will be reviewed.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">

                <HeartHandshake
                  className="mx-auto text-[#e67e22]"
                  size={25}
                />

                <h3 className="mt-3 text-sm font-black text-[#123846]">
                  Support Update
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Eligible applicants may receive further updates.
                </p>

              </div>

            </div>

            <div className="flex flex-col justify-center gap-3 border-t border-slate-100 p-6 sm:flex-row">

              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-xs font-black text-[#123846] transition hover:bg-slate-50"
              >
                <Home size={16} />
                Back To Home
              </Link>

              <Link
                href="/Divyang"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#123846] to-[#08756f] px-6 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Track Application
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8fa]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#123846] via-[#174f60] to-[#08756f]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(69,211,205,0.18),transparent_30%)]" />

        <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-[#0ea5a4]/15 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#f4c95d]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">

          {/* BREADCRUMB */}

          <div className="flex items-center gap-2 text-[10px] font-bold text-white/55">

            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={12} />

            <span className="text-white/80">
              Divyang Assistance
            </span>

          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_330px] lg:items-end">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0ea5a4]">

                  <Accessibility
                    size={15}
                    className="text-white"
                  />

                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  Anand Jivan Foundation Trust
                </span>

              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Divyang Assistance
                <span className="block text-[#7de2d1]">
                  Application Portal
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Apply online for assistance and support programmes
                designed to promote dignity, inclusion, opportunity
                and empowerment for persons with disabilities.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <div className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">

                  <p className="text-[9px] font-black uppercase tracking-wider text-white/45">
                    Application
                  </p>

                  <p className="mt-1 text-xs font-black text-white">
                    Online & Secure
                  </p>

                </div>

                <div className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">

                  <p className="text-[9px] font-black uppercase tracking-wider text-white/45">
                    Confirmation
                  </p>

                  <p className="mt-1 text-xs font-black text-white">
                    Application ID
                  </p>

                </div>

                <div className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">

                  <p className="text-[9px] font-black uppercase tracking-wider text-white/45">
                    Process
                  </p>

                  <p className="mt-1 text-xs font-black text-white">
                    Transparent Review
                  </p>

                </div>

              </div>

            </div>

            {/* HERO CARD */}

            <div className="rounded-[2rem] border border-white/15 bg-white/[0.09] p-6 backdrop-blur-xl">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4c95d] text-[#123846]">

                  <HeartHandshake size={23} />

                </div>

                <div>

                  <p className="text-sm font-black text-white">
                    Need Assistance?
                  </p>

                  <p className="mt-2 text-xs leading-6 text-white/65">
                    Complete the application with accurate information
                    for programme review.
                  </p>

                </div>

              </div>

              <div className="mt-5 border-t border-white/10 pt-5">

                <p className="text-[10px] leading-5 text-white/55">
                  ♿ Accessibility • 🔒 Secure • 📋 Digital Application
                </p>

              </div>

            </div>

          </div>

        </div>

        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-[60px] w-full sm:h-[90px]"
        >
          <path
            d="M0 70 C180 120 350 110 520 70 C700 28 880 30 1050 75 C1210 120 1330 100 1440 62 L1440 120 L0 120 Z"
            fill="#f4f8fa"
          />
        </svg>

      </section>

      {/* =====================================================
          APPLICATION AREA
      ===================================================== */}

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        <div className="-mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">

          {/* =================================================
              MAIN FORM
          ================================================= */}

          <form
            onSubmit={submitApplication}
            className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04]"
          >

            {/* FORM HEADER */}

            <div className="border-b border-slate-100 bg-gradient-to-r from-white via-white to-[#edf8f6] px-5 py-6 sm:px-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e7f7f1]">

                      <Accessibility
                        size={16}
                        className="text-[#08756f]"
                      />

                    </span>

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#08756f]">
                      Online Application
                    </span>

                  </div>

                  <h2 className="mt-3 text-xl font-black text-[#123846] sm:text-2xl">
                    Complete Your Application
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Please provide correct and complete information.
                  </p>

                </div>

                <div className="rounded-2xl border border-[#08756f]/10 bg-[#effaf6] px-4 py-3">

                  <p className="text-[9px] font-black uppercase tracking-wider text-[#08756f]">
                    Application Progress
                  </p>

                  <p className="mt-1 text-lg font-black text-[#123846]">
                    {progress}%
                  </p>

                </div>

              </div>

              {/* PROGRESS BAR */}

              <div className="mt-6">

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#08756f] to-[#14b8a6] transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">

                  {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const active =
                      stepNumber === currentStep;
                    const completed =
                      stepNumber < currentStep;

                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center text-center"
                      >

                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black transition ${
                            completed
                              ? "bg-[#08756f] text-white"
                              : active
                              ? "bg-[#123846] text-white ring-4 ring-[#123846]/10"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {completed ? (
                            <Check size={14} />
                          ) : (
                            stepNumber
                          )}
                        </div>

                        <p
                          className={`mt-2 hidden text-[8px] font-bold leading-3 sm:block ${
                            active || completed
                              ? "text-[#123846]"
                              : "text-slate-400"
                          }`}
                        >
                          {step}
                        </p>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && (

              <div className="mx-5 mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-8">

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <p>{error}</p>

              </div>

            )}

            {/* =================================================
                STEP 1
            ================================================= */}

            {currentStep === 1 && (

              <div className="p-5 sm:p-8">

                <SectionTitle
                  icon={<User size={19} />}
                  title="Personal Information"
                  description="Tell us about the applicant."
                />

                <div className="mt-7 grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Applicant Full Name"
                    required
                    value={formData.fullName}
                    onChange={(value) =>
                      updateField("fullName", value)
                    }
                    placeholder="Enter full name"
                  />

                  <InputField
                    label="Date of Birth"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(value) =>
                      updateField("dob", value)
                    }
                  />

                  <InputField
                    label="Father's Name"
                    value={formData.fatherName}
                    onChange={(value) =>
                      updateField("fatherName", value)
                    }
                    placeholder="Enter father's name"
                  />

                  <InputField
                    label="Mother's Name"
                    value={formData.motherName}
                    onChange={(value) =>
                      updateField("motherName", value)
                    }
                    placeholder="Enter mother's name"
                  />

                  <InputField
                    label="Guardian Name"
                    value={formData.guardianName}
                    onChange={(value) =>
                      updateField("guardianName", value)
                    }
                    placeholder="If applicable"
                  />

                  <SelectField
                    label="Gender"
                    value={formData.gender}
                    onChange={(value) =>
                      updateField("gender", value)
                    }
                    options={[
                      "Male",
                      "Female",
                      "Other",
                      "Prefer not to say",
                    ]}
                  />

                </div>

                <div className="mt-10">

                  <SectionTitle
                    icon={<Phone size={19} />}
                    title="Contact Information"
                    description="We may use these details for application communication."
                  />

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">

                    <InputField
                      label="Mobile Number"
                      required
                      type="tel"
                      value={formData.mobile}
                      onChange={(value) =>
                        updateField("mobile", value)
                      }
                      placeholder="Enter mobile number"
                    />

                    <InputField
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) =>
                        updateField("email", value)
                      }
                      placeholder="Enter email address"
                    />

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                STEP 2
            ================================================= */}

            {currentStep === 2 && (

              <div className="p-5 sm:p-8">

                <SectionTitle
                  icon={<Accessibility size={20} />}
                  title="Disability Information"
                  description="Provide available disability and certificate information."
                />

                <div className="mt-7 grid gap-5 sm:grid-cols-2">

                  <SelectField
                    label="Disability Type"
                    required
                    value={formData.disabilityType}
                    onChange={(value) =>
                      updateField(
                        "disabilityType",
                        value
                      )
                    }
                    options={[
                      "Locomotor Disability",
                      "Visual Impairment",
                      "Hearing Impairment",
                      "Speech and Language Disability",
                      "Intellectual Disability",
                      "Multiple Disabilities",
                      "Autism Spectrum Disorder",
                      "Other",
                    ]}
                  />

                  <InputField
                    label="Disability Percentage"
                    type="number"
                    value={
                      formData.disabilityPercentage
                    }
                    onChange={(value) =>
                      updateField(
                        "disabilityPercentage",
                        value
                      )
                    }
                    placeholder="Example: 40"
                  />

                  <InputField
                    label="UDID Number"
                    value={formData.udidNumber}
                    onChange={(value) =>
                      updateField("udidNumber", value)
                    }
                    placeholder="Enter UDID number"
                  />

                  <InputField
                    label="Disability Certificate Number"
                    value={
                      formData.certificateNumber
                    }
                    onChange={(value) =>
                      updateField(
                        "certificateNumber",
                        value
                      )
                    }
                    placeholder="Enter certificate number"
                  />

                </div>

                {/* DOCUMENTS */}

                <div className="mt-10 grid gap-5 md:grid-cols-2">

                  <FileUploadCard
                    title="Disability Certificate"
                    description="Upload certificate if available."
                    file={certificateFile}
                    onChange={handleCertificate}
                  />

                  <FileUploadCard
                    title="Applicant Photograph"
                    description="Upload a recent photograph."
                    file={photoFile}
                    onChange={handlePhoto}
                  />

                </div>

              </div>

            )}

            {/* =================================================
                STEP 3
            ================================================= */}

            {currentStep === 3 && (

              <div className="p-5 sm:p-8">

                <SectionTitle
                  icon={<HeartHandshake size={20} />}
                  title="Assistance Required"
                  description="Select the type of support you are applying for."
                />

                <div className="mt-7 grid gap-4 sm:grid-cols-2">

                  {assistanceOptions.map((option) => {
                    const selected =
                      formData.assistanceType.includes(
                        option.id
                      );

                    const Icon = option.icon;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          toggleAssistance(option.id)
                        }
                        className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                          selected
                            ? "border-[#08756f] bg-[#effaf6] shadow-lg shadow-[#08756f]/5"
                            : "border-slate-200 bg-white hover:border-[#08756f]/30 hover:shadow-md"
                        }`}
                      >

                        {selected && (

                          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#08756f] text-white">

                            <Check size={14} />

                          </div>

                        )}

                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                            selected
                              ? "bg-[#08756f] text-white"
                              : "bg-slate-100 text-[#123846]"
                          }`}
                        >
                          <Icon size={21} />
                        </div>

                        <h3 className="mt-4 text-sm font-black text-[#123846]">
                          {option.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {option.description}
                        </p>

                      </button>
                    );
                  })}

                </div>

                <div className="mt-7">

                  <label className="block text-xs font-black text-[#123846]">
                    Describe Your Requirement
                  </label>

                  <textarea
                    value={
                      formData.assistanceDescription
                    }
                    onChange={(event) =>
                      updateField(
                        "assistanceDescription",
                        event.target.value
                      )
                    }
                    placeholder="Please describe the assistance or support required..."
                    rows={5}
                    className="mt-3 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-[#123846] outline-none transition focus:border-[#08756f] focus:bg-white focus:ring-4 focus:ring-[#08756f]/5"
                  />

                </div>

              </div>

            )}

            {/* =================================================
                STEP 4
            ================================================= */}

            {currentStep === 4 && (

              <div className="p-5 sm:p-8">

                <SectionTitle
                  icon={<MapPin size={20} />}
                  title="Address & Additional Information"
                  description="Provide your current residential information."
                />

                <div className="mt-7">

                  <label className="block text-xs font-black text-[#123846]">
                    Complete Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    required
                    value={formData.address}
                    onChange={(event) =>
                      updateField(
                        "address",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="House / Street / Locality / Landmark"
                    className="mt-3 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-[#123846] outline-none transition focus:border-[#08756f] focus:bg-white focus:ring-4 focus:ring-[#08756f]/5"
                  />

                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Village / Town / City"
                    value={formData.village}
                    onChange={(value) =>
                      updateField("village", value)
                    }
                  />

                  <InputField
                    label="Block / Sub Division"
                    value={formData.block}
                    onChange={(value) =>
                      updateField("block", value)
                    }
                  />

                  <InputField
                    label="District"
                    required
                    value={formData.district}
                    onChange={(value) =>
                      updateField("district", value)
                    }
                  />

                  <InputField
                    label="State"
                    required
                    value={formData.state}
                    onChange={(value) =>
                      updateField("state", value)
                    }
                  />

                  <InputField
                    label="Pincode"
                    required
                    type="tel"
                    value={formData.pincode}
                    onChange={(value) =>
                      updateField("pincode", value)
                    }
                    placeholder="6 digit pincode"
                  />

                  <SelectField
                    label="Employment Status"
                    value={
                      formData.employmentStatus
                    }
                    onChange={(value) =>
                      updateField(
                        "employmentStatus",
                        value
                      )
                    }
                    options={[
                      "Student",
                      "Employed",
                      "Self Employed",
                      "Unemployed",
                      "Other",
                    ]}
                  />

                  <InputField
                    label="Annual Family Income"
                    type="number"
                    value={formData.annualIncome}
                    onChange={(value) =>
                      updateField(
                        "annualIncome",
                        value
                      )
                    }
                    placeholder="Enter annual income"
                  />

                </div>

                {/* REVIEW */}

                <div className="mt-10 rounded-2xl border border-[#123846]/10 bg-[#f5fafb] p-5">

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      className="mt-0.5 shrink-0 text-[#08756f]"
                      size={20}
                    />

                    <div>

                      <h3 className="text-sm font-black text-[#123846]">
                        Declaration & Submission
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        By submitting this application, you confirm
                        that the information provided is true and
                        accurate to the best of your knowledge.
                        Submission of an application does not
                        automatically guarantee approval of assistance.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                FOOTER BUTTONS
            ================================================= */}

            <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

              <div>

                {currentStep > 1 && (

                  <button
                    type="button"
                    onClick={previousStep}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black text-[#123846] transition hover:bg-slate-100"
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>

                )}

              </div>

              {currentStep < steps.length ? (

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#123846] to-[#08756f] px-6 text-xs font-black text-white shadow-lg shadow-[#123846]/15 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>

              ) : (

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#08756f] to-[#0ea5a4] px-7 text-xs font-black text-white shadow-lg shadow-[#08756f]/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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
                      <CheckCircle2 size={16} />
                      Submit Application
                    </>
                  )}

                </button>

              )}

            </div>

          </form>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">

            {/* HELP */}

            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#123846] via-[#174f60] to-[#08756f] p-6 text-white shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

                <Accessibility size={24} />

              </div>

              <h3 className="mt-5 text-lg font-black">
                Application Support
              </h3>

              <p className="mt-3 text-xs leading-6 text-white/65">
                Please keep your personal, disability and address
                information ready before submitting the application.
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">

                <SidebarPoint text="Accurate applicant information" />
                <SidebarPoint text="Disability details if available" />
                <SidebarPoint text="Correct mobile number" />
                <SidebarPoint text="Complete address & pincode" />

              </div>

            </div>

            {/* SECURITY */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.03]">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#effaf6] text-[#08756f]">

                  <ShieldCheck size={20} />

                </div>

                <div>

                  <p className="text-sm font-black text-[#123846]">
                    Secure Application
                  </p>

                  <p className="text-[10px] text-slate-500">
                    Digital submission portal
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-4">

                <SmallFeature
                  icon={<ClipboardCheck size={16} />}
                  title="Application ID"
                  text="Generated after successful submission."
                />

                <SmallFeature
                  icon={<Mail size={16} />}
                  title="Digital Communication"
                  text="Use a valid email if available."
                />

                <SmallFeature
                  icon={<CalendarDays size={16} />}
                  title="Review Process"
                  text="Applications may be reviewed by the organisation."
                />

              </div>

            </div>

            {/* CONTACT */}

            <div className="rounded-[2rem] border border-[#f4c95d]/30 bg-[#fffaf0] p-6">

              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#b7791f]">
                Need Help?
              </p>

              <h3 className="mt-2 text-sm font-black text-[#123846]">
                Contact Anand Jivan Foundation Trust
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-600">
                If you experience difficulty completing the online
                application, please contact the organisation.
              </p>

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

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f3] text-[#08756f]">
        {icon}
      </div>

      <div>

        <h2 className="text-lg font-black text-[#123846]">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>

      <label className="block text-xs font-black text-[#123846]">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#123846] outline-none transition placeholder:text-slate-400 focus:border-[#08756f] focus:bg-white focus:ring-4 focus:ring-[#08756f]/5"
      />

    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>

      <label className="block text-xs font-black text-[#123846]">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <select
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#123846] outline-none transition focus:border-[#08756f] focus:bg-white focus:ring-4 focus:ring-[#08756f]/5"
      >

        <option value="">
          Select an option
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

    </div>
  );
}

function FileUploadCard({
  title,
  description,
  file,
  onChange,
}: {
  title: string;
  description: string;
  file: File | null;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <label className="group cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-[#08756f]/50 hover:bg-[#effaf6]">

      <input
        type="file"
        onChange={onChange}
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
      />

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#08756f] shadow-sm">

          <Upload size={19} />

        </div>

        <div>

          <p className="text-sm font-black text-[#123846]">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {file
              ? file.name
              : description}
          </p>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-wider text-[#08756f]">
            Click To Select File
          </p>

        </div>

      </div>

    </label>
  );
}

function SidebarPoint({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7de2d1]">

        <Check size={13} />

      </div>

      <p className="text-[11px] font-medium text-white/75">
        {text}
      </p>

    </div>
  );
}

function SmallFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="mt-0.5 text-[#08756f]">
        {icon}
      </div>

      <div>

        <p className="text-xs font-black text-[#123846]">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}
