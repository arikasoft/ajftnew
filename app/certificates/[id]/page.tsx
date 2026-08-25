import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  FileCheck2,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Stamp,
} from "lucide-react";

type Certificate = {
  id: string;
  title: string;
  shortTitle: string;
  number: string;
  issueDate: string;
  authority: string;
  status: string;
  description: string;
  category: string;
  documentUrl?: string;
};

const certificates: Record<
  string,
  Certificate
> = {
  "12ab": {
    id: "12ab",
    title:
      "Income Tax Registration Certificate",
    shortTitle: "12AB",
    number:
      "12AB / REGISTERED",
    issueDate:
      "As per certificate",
    authority:
      "Income Tax Department",
    status: "Verified",
    category:
      "Income Tax",
    description:
      "Registration relating to exemption available to eligible charitable institutions under the Income-tax framework.",
  },

  "80g": {
    id: "80g",
    title:
      "80G Registration Certificate",
    shortTitle: "80G",
    number:
      "80G / REGISTERED",
    issueDate:
      "As per certificate",
    authority:
      "Income Tax Department",
    status: "Verified",
    category:
      "Income Tax",
    description:
      "Registration relating to eligible donor deduction documentation for qualifying donations.",
  },

  trust: {
    id: "trust",
    title:
      "Trust Registration Certificate",
    shortTitle: "TRUST",
    number:
      "TRUST / REGISTERED",
    issueDate:
      "As per certificate",
    authority:
      "Competent Authority",
    status: "Verified",
    category:
      "Registration",
    description:
      "Official registration document relating to Anand Jivan Foundation Trust.",
  },

  "ngo-darpan": {
    id: "ngo-darpan",
    title:
      "NGO Darpan Registration",
    shortTitle:
      "NGO DARPAN",
    number:
      "NGO DARPAN / REGISTERED",
    issueDate:
      "As per certificate",
    authority:
      "Government of India",
    status: "Verified",
    category:
      "Government",
    description:
      "Government NGO identification and registration information.",
  },

  pan: {
    id: "pan",
    title:
      "Permanent Account Number",
    shortTitle: "PAN",
    number:
      "PAN / REGISTERED",
    issueDate:
      "As per certificate",
    authority:
      "Income Tax Department",
    status: "Verified",
    category:
      "Tax",
    description:
      "Permanent Account Number document of the organisation.",
  },

  csr: {
    id: "csr",
    title:
      "CSR Registration",
    shortTitle: "CSR",
    number:
      "CSR / REGISTERED",
    issueDate:
      "As per certificate",
    authority:
      "Ministry of Corporate Affairs",
    status: "Applicable",
    category:
      "CSR",
    description:
      "Corporate Social Responsibility registration information where applicable.",
  },
};

export default async function CertificatePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const certificate =
    certificates[id];

  if (!certificate) {
    return (
      <main className="min-h-screen bg-[#F4F7F6]">

        <div className="h-1 bg-[#B68B2C]" />

        <header className="bg-[#073B4C]">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">

            <img
              src="/images/ajft-logo.png"
              alt="AJFT"
              className="h-10 w-10 rounded-full bg-white p-1"
            />

            <p className="text-xs font-black text-white">
              ANAND JIVAN FOUNDATION TRUST
            </p>

          </div>
        </header>

        <div className="mx-auto max-w-xl px-4 py-20 text-center">

          <FileCheck2
            size={45}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-5 text-xl font-black text-[#073B4C]">
            Certificate Not Found
          </h1>

          <p className="mt-2 text-xs text-gray-500">
            The requested certificate record
            could not be found.
          </p>

          <Link
            href="/certificates"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3 text-xs font-black text-white"
          >
            <ArrowLeft size={14} />
            Back to Certificates
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#073B4C]">

      {/* TOP LINE */}

      <div className="h-1 bg-[#B68B2C]" />

      {/* HEADER */}

      <header className="border-b border-white/10 bg-[#073B4C]">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1">

              <img
                src="/images/ajft-logo.png"
                alt="AJFT Logo"
                className="h-full w-full object-contain"
              />

            </div>

            <div>

              <p className="text-[10px] font-black text-white sm:text-xs">
                ANAND JIVAN FOUNDATION TRUST
              </p>

              <p className="text-[7px] text-white/50">
                Certificate Verification
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[7px] font-bold text-white/70 sm:flex">

            <LockKeyhole size={11} />

            SECURE RECORD

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <section className="px-4 py-7 sm:px-6 sm:py-10">

        <div className="mx-auto max-w-5xl">

          {/* BACK */}

          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 text-[8px] font-black text-[#073B4C] transition hover:text-[#B68B2C]"
          >
            <ArrowLeft size={13} />
            BACK TO CERTIFICATES
          </Link>

          {/* MAIN CARD */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

            {/* GOLD HEADER */}

            <div className="bg-[#073B4C] px-5 py-7 sm:px-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#073B4C] shadow-lg">

                    <FileCheck2
                      size={28}
                    />

                  </div>

                  <div>

                    <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#D6B454]">
                      Official Certificate Record
                    </p>

                    <h1 className="mt-1 text-xl font-black text-white sm:text-2xl">
                      {certificate.title}
                    </h1>

                  </div>

                </div>

                <div className="flex items-center gap-2 self-start rounded-full bg-[#08744F] px-3 py-2 text-[7px] font-black text-white sm:self-center">

                  <CheckCircle2
                    size={13}
                  />

                  {certificate.status}

                </div>

              </div>

            </div>

            {/* BODY */}

            <div className="p-5 sm:p-8">

              {/* VERIFICATION */}

              <div className="rounded-2xl border border-[#CFE8DC] bg-[#F0FAF5] p-4">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#08744F] text-white">

                    <BadgeCheck
                      size={20}
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-black text-[#075D40]">
                      Certificate Record Verified
                    </p>

                    <p className="mt-1 text-[8px] leading-5 text-[#497565]">
                      This record is listed in the
                      Anand Jivan Foundation Trust
                      certificate directory.
                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}

              <div className="mt-6">

                <h2 className="text-xs font-black uppercase tracking-wider text-[#073B4C]">
                  Certificate Details
                </h2>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">

                  <Detail
                    icon={
                      <Stamp size={16} />
                    }
                    label="Certificate Type"
                    value={
                      certificate.shortTitle
                    }
                  />

                  <Detail
                    icon={
                      <Landmark size={16} />
                    }
                    label="Issuing Authority"
                    value={
                      certificate.authority
                    }
                  />

                  <Detail
                    icon={
                      <FileCheck2 size={16} />
                    }
                    label="Reference Number"
                    value={
                      certificate.number
                    }
                  />

                  <Detail
                    icon={
                      <CalendarDays size={16} />
                    }
                    label="Issue Date"
                    value={
                      certificate.issueDate
                    }
                  />

                  <Detail
                    icon={
                      <Building2Icon />
                    }
                    label="Category"
                    value={
                      certificate.category
                    }
                  />

                  <Detail
                    icon={
                      <ShieldCheck size={16} />
                    }
                    label="Status"
                    value={
                      certificate.status
                    }
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="mt-6 rounded-2xl border border-gray-200 bg-[#FAFCFB] p-5">

                <p className="text-[7px] font-black uppercase tracking-widest text-[#B68B2C]">
                  About this record
                </p>

                <p className="mt-2 text-[9px] leading-6 text-gray-600">
                  {certificate.description}
                </p>

              </div>

              {/* DOCUMENT */}

              <div className="mt-6 rounded-2xl border border-[#E8DDBF] bg-[#FFFCF3] p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B68B2C] text-white">

                    <FileCheck2
                      size={18}
                    />

                  </div>

                  <div>

                    <p className="text-[9px] font-black text-[#5F4B22]">
                      Official Document
                    </p>

                    <p className="mt-1 text-[7px] leading-5 text-[#806F49]">
                      The actual PDF document can be
                      linked here once the official
                      certificate file is uploaded.
                    </p>

                  </div>

                </div>

                <div className="mt-4">

                  {certificate.documentUrl ? (
                    <a
                      href={
                        certificate.documentUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#073B4C] px-5 text-[8px] font-black text-white"
                    >
                      <Download
                        size={14}
                      />
                      View / Download Certificate
                    </a>
                  ) : (
                    <div className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#DCCFA7] px-5 text-[8px] font-black text-[#806F49]">
                      <LockKeyhole
                        size={13}
                      />
                      Document Not Uploaded
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="mt-5 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">

            <p className="text-[7px] text-gray-400">
              Anand Jivan Foundation Trust • Darbhanga, Bihar
            </p>

            <div className="flex items-center gap-1 text-[7px] text-gray-400">

              <ShieldCheck
                size={11}
              />

              Secure Certificate Information

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

// ============================================================
// DETAIL
// ============================================================

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">

      <div className="flex items-center gap-2 text-[#B68B2C]">

        {icon}

        <span className="text-[7px] font-black uppercase tracking-wider text-gray-400">
          {label}
        </span>

      </div>

      <p className="mt-2 break-words text-[9px] font-black text-[#073B4C]">
        {value}
      </p>

    </div>
  );
}

// ============================================================
// ICON HELPER
// ============================================================

function Building2Icon() {
  return (
    <Landmark size={16} />
  );
}