"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  Home,
  LockKeyhole,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const helpOptions = [
  "Medical Assistance",
  "Medicine Support",
  "Health Facility",
  "Health Camp",
  "Health Awareness",
  "Other",
];

type FormData = {
  name: string;
  phone: string;
  age: string;
  gender: string;
  location: string;
  helpType: string;
  urgency: string;
  description: string;
  consent: boolean;
};

export default function HealthHelpRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    helpType: "",
    urgency: "General",
    description: "",
    consent: false,
  });

  const updateForm = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const submitRequest = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.consent) {
      alert(
        "Please confirm that the information provided is accurate."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/health/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            age: form.age,
            gender: form.gender,
            location: form.location,
            helpType: form.helpType,
            urgency: form.urgency,
            description: form.description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to submit request."
        );
      }

      setRequestId(data.requestId);

      sessionStorage.setItem(
        "healthRequestId",
        data.requestId
      );

      setSubmitted(true);

    } catch (error) {
      console.error(
        "HEALTH_REQUEST_SUBMIT_ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     SUCCESS
  ====================================================== */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F7F9FB]">

        <section className="bg-[#7F1D3B] px-4 py-14 sm:px-5 md:py-20">

          <div className="mx-auto max-w-xl text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
              <CheckCircle2
                size={42}
                className="text-[#16845C]"
              />
            </div>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
              Request Submitted
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold text-white md:text-4xl">
              Your request has been received
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-[11px] leading-6 text-white/60">
              Anand Jivan Foundation Trust has received
              your health help request.
            </p>

          </div>

        </section>

        <section className="px-4 py-8 sm:px-5">

          <div className="mx-auto max-w-xl rounded-[26px] border border-[#E0E6EA] bg-white p-6 text-center shadow-[0_12px_35px_rgba(38,52,61,0.07)]">

            <div className="rounded-2xl bg-[#F7F9FB] p-5">

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#8A959B]">
                Your Request ID
              </p>

              <p className="mt-2 break-all font-mono text-xl font-bold tracking-wider text-[#D9485F]">
                {requestId}
              </p>

              <p className="mt-2 text-[8px] text-[#8A959B]">
                Please save this ID for tracking your request.
              </p>

            </div>

            <div className="mt-6 space-y-3 text-left">

              <NextStep
                number="01"
                text="Your request has been recorded."
              />

              <NextStep
                number="02"
                text="The Trust team will review the information."
              />

              <NextStep
                number="03"
                text="The team may contact you if additional information is required."
              />

            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">

              <Link
                href="/programs/health/track"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#7F1D3B] text-[10px] font-bold text-white"
              >
                Track Request
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/programs/health"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E0E6EA] text-[10px] font-bold text-[#26343D]"
              >
                <HeartPulse size={14} />
                Health Help
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* ======================================================
     FORM PAGE
  ====================================================== */

  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#26343D]">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-[#7F1D3B] px-4 py-10 sm:px-5 md:py-14">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#F97373]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#FBBF24]/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">

          <Link
            href="/programs/health"
            className="inline-flex items-center gap-2 text-[9px] font-bold text-white/60 hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Health Help
          </Link>

          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#D9485F] shadow-xl">
              <HeartPulse size={27} />
            </div>

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
                Health Help Desk
              </p>

              <h1 className="mt-1 font-serif text-3xl font-bold text-white">
                Request Health Help
              </h1>

              <p className="mt-2 text-[10px] text-white/60">
                Tell us what kind of support is needed.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* NOTICE */}

      <section className="border-b border-[#F2D5D8] bg-[#FFF7F7] px-4 py-4 sm:px-5">

        <div className="mx-auto flex max-w-5xl items-start gap-3">

          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-[#D9485F]"
          />

          <p className="text-[8px] leading-5 text-[#7F1D1D]">
            This form is for requesting charitable health
            support. It is not an emergency medical service.
          </p>

        </div>

      </section>

      {/* FORM */}

      <section className="px-4 py-8 sm:px-5 md:py-12">

        <div className="mx-auto max-w-5xl">

          <form
            onSubmit={submitRequest}
            className="grid gap-6 lg:grid-cols-[1fr_300px]"
          >

            {/* MAIN FORM */}

            <div className="rounded-[26px] border border-[#E0E6EA] bg-white p-5 shadow-[0_10px_35px_rgba(38,52,61,0.06)] sm:p-7">

              <SectionTitle
                icon={<UserRound size={17} />}
                title="Basic Information"
                text="Your contact information"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <InputField
                  label="Full Name"
                  required
                  value={form.name}
                  placeholder="Your full name"
                  onChange={(value) =>
                    updateForm("name", value)
                  }
                />

                <InputField
                  label="Mobile Number"
                  required
                  type="tel"
                  value={form.phone}
                  placeholder="10-digit mobile number"
                  onChange={(value) =>
                    updateForm("phone", value)
                  }
                />

                <InputField
                  label="Age"
                  type="number"
                  value={form.age}
                  placeholder="Age"
                  onChange={(value) =>
                    updateForm("age", value)
                  }
                />

                <SelectField
                  label="Gender"
                  value={form.gender}
                  options={[
                    "Male",
                    "Female",
                    "Other",
                    "Prefer not to say",
                  ]}
                  onChange={(value) =>
                    updateForm("gender", value)
                  }
                />

                <div className="sm:col-span-2">

                  <InputField
                    label="Location"
                    required
                    value={form.location}
                    placeholder="Village / City / District"
                    onChange={(value) =>
                      updateForm("location", value)
                    }
                  />

                </div>

              </div>

              <div className="my-8 border-t border-[#E8ECEF]" />

              <SectionTitle
                icon={<HeartPulse size={17} />}
                title="Help Required"
                text="Select the type of support"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {helpOptions.map((option) => (

                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      updateForm("helpType", option)
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      form.helpType === option
                        ? "border-[#D9485F] bg-[#FFF3F5]"
                        : "border-[#E0E6EA] bg-[#FAFBFC] hover:border-[#E7B6BF]"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          form.helpType === option
                            ? "bg-[#D9485F] text-white"
                            : "bg-[#FEECEC] text-[#D9485F]"
                        }`}
                      >
                        <HeartPulse size={15} />
                      </div>

                      <span className="text-[9px] font-bold text-[#26343D]">
                        {option}
                      </span>

                    </div>

                  </button>

                ))}

              </div>

              <div className="mt-5">

                <label className="text-[9px] font-bold text-[#52616A]">
                  Situation
                </label>

                <div className="mt-2 grid grid-cols-3 gap-2">

                  {[
                    "General",
                    "Important",
                    "Urgent",
                  ].map((item) => (

                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        updateForm("urgency", item)
                      }
                      className={`h-10 rounded-xl border text-[8px] font-bold ${
                        form.urgency === item
                          ? "border-[#D9485F] bg-[#D9485F] text-white"
                          : "border-[#E0E6EA] bg-white text-[#68767F]"
                      }`}
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>

              <div className="mt-5">

                <label className="text-[9px] font-bold text-[#52616A]">
                  Brief Description
                  <span className="ml-1 text-[#D9485F]">
                    *
                  </span>
                </label>

                <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Briefly describe the help required..."
                  className="mt-2 w-full resize-none rounded-xl border border-[#E0E6EA] bg-[#FAFBFC] px-4 py-3 text-[10px] leading-5 outline-none focus:border-[#D9485F] focus:bg-white"
                />

              </div>

              {/* CONSENT */}

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-[#F7F9FB] p-4">

                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    updateForm(
                      "consent",
                      event.target.checked
                    )
                  }
                  className="mt-0.5 h-4 w-4 accent-[#D9485F]"
                />

                <span className="text-[8px] leading-5 text-[#68767F]">
                  I confirm that the information provided is
                  accurate to the best of my knowledge.
                </span>

              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D9485F] text-[10px] font-bold text-white shadow-md transition hover:bg-[#BE3850] disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Submit Help Request
                  </>
                )}

              </button>

            </div>

            {/* SIDE */}

            <aside className="space-y-4">

              <div className="rounded-[25px] bg-[#7F1D3B] p-6 text-white">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBBF24] text-[#52152B]">
                  <Phone size={19} />
                </div>

                <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FBBF24]">
                  Need Help?
                </p>

                <h2 className="mt-2 font-serif text-xl font-bold">
                  Contact the Trust
                </h2>

                <p className="mt-2 text-[9px] leading-5 text-white/50">
                  You can contact the Trust if you need
                  clarification about the request process.
                </p>

                <a
                  href="tel:+919155751363"
                  className="mt-5 flex h-10 items-center justify-center gap-2 rounded-xl bg-white text-[9px] font-bold text-[#7F1D3B]"
                >
                  <Phone size={14} />
                  +91 9155751363
                </a>

              </div>

              <div className="rounded-[25px] border border-[#E0E6EA] bg-white p-5">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#1877B8]">
                  <LockKeyhole size={18} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#26343D]">
                  Privacy
                </h3>

                <p className="mt-2 text-[9px] leading-5 text-[#6B7780]">
                  Please provide only information necessary
                  for reviewing your request.
                </p>

              </div>

              <div className="rounded-[25px] border border-[#E0E6EA] bg-white p-5">

                <div className="flex items-center gap-2">

                  <Clock3
                    size={16}
                    className="text-[#D9485F]"
                  />

                  <h3 className="text-sm font-bold text-[#26343D]">
                    After Submission
                  </h3>

                </div>

                <div className="mt-4 space-y-3">

                  <MiniStep
                    number="1"
                    text="Request received"
                  />

                  <MiniStep
                    number="2"
                    text="Team review"
                  />

                  <MiniStep
                    number="3"
                    text="Possible follow-up"
                  />

                  <MiniStep
                    number="4"
                    text="Support decision"
                  />

                </div>

              </div>

            </aside>

          </form>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#4A182A] px-4 py-6 text-center">

        <p className="text-[9px] font-bold tracking-[0.14em] text-white">
          ANAND JIVAN FOUNDATION TRUST
        </p>

        <p className="mt-2 text-[8px] text-white/40">
          Health • Education • Community Development
        </p>

        <p className="mt-2 text-[8px] text-[#FBBF24]">
          +91 9155751363
        </p>

      </footer>

    </main>
  );
}

/* ==========================================================
   COMPONENTS
========================================================== */

function SectionTitle({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEECEC] text-[#D9485F]">
        {icon}
      </div>

      <div>

        <h2 className="text-sm font-bold text-[#26343D]">
          {title}
        </h2>

        <p className="mt-0.5 text-[8px] text-[#8A959B]">
          {text}
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
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>

      <label className="text-[9px] font-bold text-[#52616A]">

        {label}

        {required && (
          <span className="ml-1 text-[#D9485F]">
            *
          </span>
        )}

      </label>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-xl border border-[#E0E6EA] bg-[#FAFBFC] px-4 text-[10px] outline-none placeholder:text-[#A8B0B5] focus:border-[#D9485F] focus:bg-white"
      />

    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="text-[9px] font-bold text-[#52616A]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 h-11 w-full rounded-xl border border-[#E0E6EA] bg-[#FAFBFC] px-4 text-[10px] outline-none focus:border-[#D9485F]"
      >

        <option value="">
          Select
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}

function NextStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#F7F9FB] p-3">

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FEECEC] text-[8px] font-bold text-[#D9485F]">
        {number}
      </span>

      <p className="text-[9px] leading-5 text-[#68767F]">
        {text}
      </p>

    </div>
  );
}

function MiniStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FEECEC] text-[7px] font-bold text-[#D9485F]">
        {number}
      </span>

      <span className="text-[9px] text-[#68767F]">
        {text}
      </span>

    </div>
  );
}