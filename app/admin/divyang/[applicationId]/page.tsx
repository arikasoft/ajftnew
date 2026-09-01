import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import connectDB from "@/lib/mongodb";
import DivyangApplication from "@/models/DivyangApplication";
import DivyangStatusHistory from "@/models/DivyangStatusHistory";

import DivyangStatusManager from "@/components/admin/DivyangStatusManager";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    applicationId: string;
  }>;
};

const statusStyles: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  SUBMITTED: {
    label: "Submitted",
    className:
      "bg-sky-50 text-sky-700 border-sky-100",
  },

  UNDER_REVIEW: {
    label: "Under Review",
    className:
      "bg-amber-50 text-amber-700 border-amber-100",
  },

  DOCUMENT_VERIFICATION: {
    label: "Document Verification",
    className:
      "bg-violet-50 text-violet-700 border-violet-100",
  },

  FIELD_VERIFICATION: {
    label: "Field Verification",
    className:
      "bg-indigo-50 text-indigo-700 border-indigo-100",
  },

  DOCUMENT_REQUIRED: {
    label: "Document Required",
    className:
      "bg-orange-50 text-orange-700 border-orange-100",
  },

  APPROVED: {
    label: "Approved",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
  },

  ASSISTANCE_PROCESSING: {
    label: "Assistance Processing",
    className:
      "bg-cyan-50 text-cyan-700 border-cyan-100",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-50 text-green-700 border-green-100",
  },

  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 border-red-100",
  },
};

function formatDate(value?: string | Date | null) {
  if (!value) return "Not Available";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Not Available";
  }
}

function formatDateOnly(value?: string | Date | null) {
  if (!value) return "Not Available";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return String(value);
  }
}

function getValue(
  application: Record<string, unknown>,
  ...keys: string[]
) {
  for (const key of keys) {
    const value = application[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return String(value);
    }
  }

  return "Not Provided";
}

function getStatus(status?: string) {
  const value = String(status || "SUBMITTED").toUpperCase();

  return (
    statusStyles[value] || {
      label: value.replaceAll("_", " "),
      className:
        "bg-slate-50 text-slate-700 border-slate-200",
    }
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-b-0">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-bold leading-6 text-[#073B4C]">
        {value || "Not Provided"}
      </p>
    </div>
  );
}

export default async function DivyangApplicationDetailPage({
  params,
}: PageProps) {
  const { applicationId } = await params;

  await connectDB();

  const applicationDocument =
    await DivyangApplication.findOne({
      applicationId: applicationId.toUpperCase(),
    }).lean();

  if (!applicationDocument) {
    return (
      <main className="min-h-screen bg-[#F5F8FA] p-6 lg:p-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/admin/divyang/applications"
            className="inline-flex items-center gap-2 text-sm font-black text-[#073B4C]"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </Link>

          <div className="mt-10 rounded-[32px] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600">
              <FileText size={28} />
            </div>

            <h1 className="mt-6 text-2xl font-black text-[#073B4C]">
              Application Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              The requested Divyang application could not
              be found in the AJFT database.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const application = JSON.parse(
    JSON.stringify(applicationDocument)
  ) as Record<string, unknown>;

  const historyDocuments =
    await DivyangStatusHistory.find({
      applicationId:
        String(application.applicationId).toUpperCase(),
    })
      .sort({
        createdAt: -1,
      })
      .lean();

  const history = JSON.parse(
    JSON.stringify(historyDocuments)
  ) as Array<Record<string, unknown>>;

  const currentStatus = getStatus(
    String(application.status || "SUBMITTED")
  );

  const fullName = getValue(
    application,
    "fullName",
    "applicantName",
    "name"
  );

  const mobile = getValue(
    application,
    "mobile",
    "phone",
    "mobileNumber"
  );

  const email = getValue(
    application,
    "email",
    "emailAddress"
  );

  const address = getValue(
    application,
    "address",
    "fullAddress"
  );

  return (
    <main className="min-h-screen bg-[#F5F8FA] pb-16">

      {/* =====================================================
          ADMIN HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#D6A63A]/30 blur-3xl" />

          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          <Link
            href="/admin/divyang/applications"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#073B4C]"
          >
            <ArrowLeft size={15} />
            All Applications
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span className="inline-flex items-center gap-2 rounded-full bg-[#D6A63A] px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                  <ShieldCheck size={14} />
                  AJFT Divyang Portal
                </span>

                <span
                  className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-wider ${currentStatus.className}`}
                >
                  {currentStatus.label}
                </span>

              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {fullName}
              </h1>

              <p className="mt-3 text-sm text-white/55">
                Application ID
              </p>

              <p className="mt-1 font-mono text-base font-black tracking-wide text-[#D6A63A]">
                {String(application.applicationId)}
              </p>

            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/40">
                Submitted On
              </p>

              <div className="mt-3 flex items-center gap-3 text-white">

                <CalendarDays
                  size={18}
                  className="text-[#D6A63A]"
                />

                <p className="text-sm font-black">
                  {formatDate(
                    application.createdAt as string
                  )}
                </p>

              </div>

            </div>

          </div>

        </div>

        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="relative block h-12 w-full sm:h-16"
        >
          <path
            d="
              M0 45
              C180 100 340 100 520 62
              C720 18 860 20 1040 58
              C1210 95 1330 92 1440 48
              L1440 100
              L0 100
              Z
            "
            fill="#F5F8FA"
          />
        </svg>

      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="space-y-8">

            {/* APPLICANT PROFILE */}

            <section className="overflow-hidden rounded-[30px] bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6 sm:p-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073B4C] text-white">
                    <UserRound size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-[#073B4C]">
                      Applicant Profile
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Personal and contact information
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid p-6 sm:grid-cols-2 sm:p-8">

                <DetailRow
                  label="Full Name"
                  value={fullName}
                />

                <DetailRow
                  label="Gender"
                  value={getValue(
                    application,
                    "gender"
                  )}
                />

                <DetailRow
                  label="Date of Birth"
                  value={formatDateOnly(
                    application.dateOfBirth as string
                  )}
                />

                <DetailRow
                  label="Father / Guardian"
                  value={getValue(
                    application,
                    "fatherName",
                    "guardianName"
                  )}
                />

                <DetailRow
                  label="Mobile Number"
                  value={mobile}
                />

                <DetailRow
                  label="Email Address"
                  value={email}
                />

              </div>

            </section>

            {/* ADDRESS */}

            <section className="overflow-hidden rounded-[30px] bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6 sm:p-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D6A63A] text-white">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-[#073B4C]">
                      Residential Address
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Location and communication details
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid p-6 sm:grid-cols-2 sm:p-8">

                <DetailRow
                  label="Complete Address"
                  value={address}
                />

                <DetailRow
                  label="Village / Locality"
                  value={getValue(
                    application,
                    "village",
                    "locality"
                  )}
                />

                <DetailRow
                  label="District"
                  value={getValue(
                    application,
                    "district"
                  )}
                />

                <DetailRow
                  label="State"
                  value={getValue(
                    application,
                    "state"
                  )}
                />

                <DetailRow
                  label="PIN Code"
                  value={getValue(
                    application,
                    "pincode",
                    "pinCode"
                  )}
                />

                <DetailRow
                  label="Country"
                  value={getValue(
                    application,
                    "country"
                  )}
                />

              </div>

            </section>

            {/* DIVYANG DETAILS */}

            <section className="overflow-hidden rounded-[30px] bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6 sm:p-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white">
                    <HeartHandshake size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-[#073B4C]">
                      Disability Details
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Information provided for assistance evaluation
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid p-6 sm:grid-cols-2 sm:p-8">

                <DetailRow
                  label="Disability Type"
                  value={getValue(
                    application,
                    "disabilityType",
                    "disability"
                  )}
                />

                <DetailRow
                  label="Disability Percentage"
                  value={getValue(
                    application,
                    "disabilityPercentage",
                    "percentage"
                  )}
                />

                <DetailRow
                  label="Disability Since"
                  value={getValue(
                    application,
                    "disabilitySince"
                  )}
                />

                <DetailRow
                  label="Certificate Number"
                  value={getValue(
                    application,
                    "certificateNumber",
                    "disabilityCertificateNumber"
                  )}
                />

              </div>

              <div className="border-t border-slate-100 p-6 sm:p-8">

                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Medical / Additional Information
                </p>

                <p className="mt-3 rounded-2xl bg-[#F5F8FA] p-5 text-sm leading-7 text-slate-600">
                  {getValue(
                    application,
                    "medicalCondition",
                    "medicalDetails",
                    "additionalDetails"
                  )}
                </p>

              </div>

            </section>

            {/* ASSISTANCE */}

            <section className="overflow-hidden rounded-[30px] bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6 sm:p-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <ClipboardList size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-[#073B4C]">
                      Assistance Requirement
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Requested support from Anand Jivan Foundation Trust
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <DetailRow
                  label="Required Assistance"
                  value={getValue(
                    application,
                    "assistanceType",
                    "requiredAssistance",
                    "helpRequired"
                  )}
                />

                <div className="pt-5">

                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Applicant Description
                  </p>

                  <div className="mt-3 rounded-2xl bg-[#F5F8FA] p-5">

                    <p className="text-sm leading-7 text-slate-600">
                      {getValue(
                        application,
                        "assistanceDescription",
                        "reason",
                        "message"
                      )}
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* DOCUMENTS */}

            <section className="overflow-hidden rounded-[30px] bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6 sm:p-8">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073B4C] text-white">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-[#073B4C]">
                      Documents
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Uploaded application documents
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">

                {[
                  {
                    label: "Identity Proof",
                    keys: [
                      "identityProof",
                      "idProof",
                      "aadhaarDocument",
                    ],
                  },

                  {
                    label: "Disability Certificate",
                    keys: [
                      "disabilityCertificate",
                      "certificateDocument",
                    ],
                  },

                  {
                    label: "Medical Document",
                    keys: [
                      "medicalDocument",
                      "medicalReport",
                    ],
                  },

                  {
                    label: "Income Document",
                    keys: [
                      "incomeCertificate",
                      "incomeDocument",
                    ],
                  },
                ].map((document) => {
                  const url = document.keys
                    .map((key) => application[key])
                    .find(Boolean);

                  return (
                    <div
                      key={document.label}
                      className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5"
                    >
                      <p className="text-sm font-black text-[#073B4C]">
                        {document.label}
                      </p>

                      {url ? (
                        <a
                          href={String(url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#D6A63A]"
                        >
                          <FileText size={15} />
                          View Document
                        </a>
                      ) : (
                        <p className="mt-3 text-xs text-slate-400">
                          Not uploaded
                        </p>
                      )}
                    </div>
                  );
                })}

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6">

            {/* QUICK CONTACT */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-black text-[#073B4C]">
                Quick Contact
              </h2>

              <div className="mt-5 space-y-3">

                {mobile !== "Not Provided" && (
                  <a
                    href={`tel:${mobile}`}
                    className="flex items-center gap-3 rounded-2xl bg-[#F5F8FA] p-4 transition hover:bg-[#073B4C] hover:text-white"
                  >
                    <Phone size={17} />

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider opacity-50">
                        Mobile
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {mobile}
                      </p>
                    </div>
                  </a>
                )}

                {email !== "Not Provided" && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 rounded-2xl bg-[#F5F8FA] p-4 transition hover:bg-[#073B4C] hover:text-white"
                  >
                    <Mail size={17} />

                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-wider opacity-50">
                        Email
                      </p>

                      <p className="mt-1 truncate text-xs font-black">
                        {email}
                      </p>
                    </div>
                  </a>
                )}

              </div>

            </div>

            {/* CURRENT STATUS */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6A63A] text-white">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#073B4C]">
                    Current Status
                  </h2>

                  <p className="text-xs text-slate-400">
                    Live application progress
                  </p>
                </div>

              </div>

              <div
                className={`mt-5 rounded-2xl border p-5 ${currentStatus.className}`}
              >
                <p className="text-[9px] font-black uppercase tracking-wider opacity-60">
                  Application Status
                </p>

                <p className="mt-2 text-base font-black">
                  {currentStatus.label}
                </p>

              </div>

            </div>

            {/* STATUS MANAGER */}

            <DivyangStatusManager
              applicationId={String(
                application.applicationId
              )}
              currentStatus={String(
                application.status || "SUBMITTED"
              )}
            />

            {/* STATUS TIMELINE */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073B4C] text-white">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <h2 className="font-black text-[#073B4C]">
                    Status Timeline
                  </h2>

                  <p className="text-xs text-slate-400">
                    Application activity history
                  </p>
                </div>

              </div>

              <div className="mt-6">

                {history.length === 0 ? (

                  <div className="rounded-2xl bg-[#F5F8FA] p-5 text-center">

                    <p className="text-xs text-slate-400">
                      No status history available yet.
                    </p>

                  </div>

                ) : (

                  <div className="relative space-y-6">

                    <div className="absolute bottom-3 left-[9px] top-3 w-px bg-slate-100" />

                    {history.map((item, index) => {
                      const itemStatus = getStatus(
                        String(item.status)
                      );

                      return (
                        <div
                          key={
                            String(
                              item._id || index
                            )
                          }
                          className="relative pl-8"
                        >

                          <div className="absolute left-0 top-1.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-4 border-white bg-[#D6A63A] shadow-sm" />

                          <p className="text-xs font-black text-[#073B4C]">
                            {String(
                              item.title ||
                                itemStatus.label
                            )}
                          </p>

                          <p className="mt-1 text-[11px] leading-5 text-slate-500">
                            {String(
                              item.message ||
                                "Application status updated."
                            )}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">

                            <span className="text-[9px] font-bold text-slate-400">
                              {formatDate(
                                item.createdAt as string
                              )}
                            </span>

                            {item.updatedBy && (
                              <span className="text-[9px] font-bold text-[#D6A63A]">
                                {String(
                                  item.updatedBy
                                )}
                              </span>
                            )}

                          </div>

                        </div>
                      );
                    })}

                  </div>

                )}

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}