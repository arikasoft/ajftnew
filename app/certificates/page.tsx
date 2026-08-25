"use client";

import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Globe2,
  Landmark,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Stamp,
  X,
} from "lucide-react";

import { useState } from "react";

type Certificate = {
  id: string;
  title: string;
  shortTitle: string;
  number: string;
  issueDate: string;
  authority: string;
  status: "Verified" | "Active" | "Applicable";
  description: string;
  category: string;
  documentUrl?: string;
};

const certificates: Certificate[] = [
  {
    id: "12ab",
    title: "Income Tax Registration Certificate",
    shortTitle: "12AB",
    number: "12AB / REGISTERED",
    issueDate: "As per certificate",
    authority: "Income Tax Department",
    status: "Verified",
    description:
      "Registration relating to exemption available to eligible charitable institutions under the Income-tax framework.",
    category: "Income Tax",
  },
  {
    id: "80g",
    title: "80G Registration Certificate",
    shortTitle: "80G",
    number: "80G / REGISTERED",
    issueDate: "As per certificate",
    authority: "Income Tax Department",
    status: "Verified",
    description:
      "Registration relating to eligible donor deduction documentation for qualifying donations.",
    category: "Income Tax",
  },
  {
    id: "trust",
    title: "Trust Registration Certificate",
    shortTitle: "TRUST",
    number: "TRUST / REGISTERED",
    issueDate: "As per certificate",
    authority: "Competent Authority",
    status: "Verified",
    description:
      "Official registration document relating to Anand Jivan Foundation Trust.",
    category: "Registration",
  },
  {
    id: "ngo-darpan",
    title: "NGO Darpan Registration",
    shortTitle: "NGO DARPAN",
    number: "NGO DARPAN / REGISTERED",
    issueDate: "As per certificate",
    authority: "Government of India",
    status: "Verified",
    description:
      "Government NGO identification and registration information.",
    category: "Government",
  },
  {
    id: "pan",
    title: "Permanent Account Number",
    shortTitle: "PAN",
    number: "PAN / REGISTERED",
    issueDate: "As per certificate",
    authority: "Income Tax Department",
    status: "Verified",
    description:
      "Permanent Account Number document of the organisation.",
    category: "Tax",
  },
  {
    id: "csr",
    title: "CSR Registration",
    shortTitle: "CSR",
    number: "CSR / REGISTERED",
    issueDate: "As per certificate",
    authority: "Ministry of Corporate Affairs",
    status: "Applicable",
    description:
      "Corporate Social Responsibility registration information where applicable.",
    category: "CSR",
  },
];

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] =
    useState<Certificate | null>(null);

  const filteredCertificates =
    certificates.filter((certificate) => {
      const query =
        search.toLowerCase().trim();

      if (!query) return true;

      return (
        certificate.title
          .toLowerCase()
          .includes(query) ||
        certificate.shortTitle
          .toLowerCase()
          .includes(query) ||
        certificate.number
          .toLowerCase()
          .includes(query) ||
        certificate.authority
          .toLowerCase()
          .includes(query)
      );
    });

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#073B4C]">

      {/* =====================================================
          TOP LINE
      ====================================================== */}

      <div className="h-1 bg-[#B68B2C]" />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-white/10 bg-[#073B4C]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[7px] font-bold text-white/70 sm:flex">

            <ShieldCheck
              size={12}
            />

            OFFICIAL RECORDS

          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#B68B2C]/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B68B2C]/40 bg-[#B68B2C]/10 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#E7C76A] sm:text-[8px]">

              <Award
                size={12}
              />

              Official Documents

            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">

              Certificates &amp;
              <span className="text-[#D6B454]">
                {" "}Registrations
              </span>

            </h2>

            <p className="mt-4 max-w-2xl text-[10px] leading-6 text-white/65 sm:text-xs">

              View important registration and statutory
              documents of Anand Jivan Foundation Trust
              through one secure information portal.

            </p>

          </div>

          {/* STATS */}

          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">

            <Stat
              icon={
                <FileCheck2 size={15} />
              }
              value={
                String(
                  certificates.length
                )
              }
              label="Records"
            />

            <Stat
              icon={
                <BadgeCheck size={15} />
              }
              value="100%"
              label="Verified"
            />

            <Stat
              icon={
                <Landmark size={15} />
              }
              value="Govt."
              label="Records"
            />

            <Stat
              icon={
                <LockKeyhole size={15} />
              }
              value="Secure"
              label="Portal"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <section className="px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#B68B2C]">
                  Document Directory
                </p>

                <h3 className="mt-1 text-lg font-black text-[#073B4C]">
                  Organisation Records
                </h3>

              </div>

              <div className="relative w-full md:max-w-sm">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search certificate..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFCFB] pl-10 pr-4 text-[10px] font-semibold outline-none transition focus:border-[#B68B2C]"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CERTIFICATE GRID
      ====================================================== */}

      <section className="px-4 pb-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {filteredCertificates.length ===
          0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

              <Search
                size={28}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-sm font-bold text-[#073B4C]">
                No certificate found
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                Try another search term.
              </p>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredCertificates.map(
                (certificate) => (
                  <CertificateCard
                    key={
                      certificate.id
                    }
                    certificate={
                      certificate
                    }
                    onView={() =>
                      setSelected(
                        certificate
                      )
                    }
                  />
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          TRUST FOOTER
      ====================================================== */}

      <footer className="border-t border-[#DCE5E2] bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

            <div className="flex items-center gap-3">

              

            </div>

            <div className="flex items-center gap-1.5 text-[7px] text-gray-400">

              <LockKeyhole
                size={11}
              />

              Secure document information

            </div>

          </div>

        </div>

      </footer>

      {/* =====================================================
          MODAL
      ====================================================== */}

      {selected && (
        <CertificateModal
          certificate={
            selected
          }
          onClose={() =>
            setSelected(null)
          }
        />
      )}

    </main>
  );
}

// ============================================================
// STAT
// ============================================================

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">

      <div className="flex items-center gap-2 text-[#D6B454]">

        {icon}

        <span className="text-sm font-black text-white">
          {value}
        </span>

      </div>

      <p className="mt-1 text-[6px] uppercase tracking-wider text-white/45">
        {label}
      </p>

    </div>
  );
}

// ============================================================
// CERTIFICATE CARD
// ============================================================

function CertificateCard({
  certificate,
  onView,
}: {
  certificate: Certificate;
  onView: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* GOLD TOP */}

      <div className="h-1 bg-gradient-to-r from-[#073B4C] via-[#B68B2C] to-[#073B4C]" />

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5F8F7] text-[#073B4C]">

            <FileText
              size={23}
            />

          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF7F0] px-2.5 py-1.5 text-[6px] font-black uppercase tracking-wider text-[#08744F]">

            <CheckCircle2
              size={10}
            />

            {certificate.status}

          </span>

        </div>

        <div className="mt-4">

          <p className="text-[7px] font-black uppercase tracking-[0.15em] text-[#B68B2C]">
            {certificate.category}
          </p>

          <h3 className="mt-1 text-sm font-black leading-5 text-[#073B4C]">
            {certificate.title}
          </h3>

          <p className="mt-2 text-[8px] leading-5 text-gray-500">
            {certificate.description}
          </p>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">

          <InfoBox
            icon={
              <Stamp size={11} />
            }
            label="Certificate"
            value={
              certificate.shortTitle
            }
          />

          <InfoBox
            icon={
              <CalendarDays size={11} />
            }
            label="Issue Date"
            value={
              certificate.issueDate
            }
          />

        </div>

        <div className="mt-2 rounded-xl bg-[#F8FAF9] p-3">

          <p className="text-[6px] font-black uppercase tracking-widest text-gray-400">
            Registration / Reference
          </p>

          <p className="mt-1 break-all text-[8px] font-bold text-[#073B4C]">
            {certificate.number}
          </p>

        </div>

        <div className="mt-4 flex gap-2">

          <button
            type="button"
            onClick={onView}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#073B4C] text-[8px] font-black text-white transition hover:bg-[#0A5066]"
          >

            <FileText
              size={13}
            />

            View Details

          </button>

          {certificate.documentUrl && (
            <a
              href={
                certificate.documentUrl
              }
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-11 items-center justify-center rounded-xl border border-[#DCE5E2] text-[#073B4C] transition hover:border-[#B68B2C] hover:text-[#B68B2C]"
              title="Download certificate"
            >

              <Download
                size={14}
              />

            </a>
          )}

        </div>

      </div>

    </article>
  );
}

// ============================================================
// INFO BOX
// ============================================================

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-2.5">

      <div className="flex items-center gap-1 text-[#B68B2C]">

        {icon}

        <span className="text-[6px] font-black uppercase tracking-wider text-gray-400">
          {label}
        </span>

      </div>

      <p className="mt-1 truncate text-[8px] font-bold text-[#073B4C]">
        {value}
      </p>

    </div>
  );
}

// ============================================================
// MODAL
// ============================================================

function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#073B4C]/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >

      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="relative bg-[#073B4C] px-5 py-5">

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >

            <X size={15} />

          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#073B4C]">

              <FileCheck2
                size={22}
              />

            </div>

            <div>

              <p className="text-[7px] font-bold uppercase tracking-widest text-[#D6B454]">
                Certificate Record
              </p>

              <h3 className="mt-1 pr-8 text-sm font-black text-white">
                {certificate.title}
              </h3>

            </div>

          </div>

        </div>

        {/* BODY */}

        <div className="p-5">

          <div className="rounded-xl border border-[#DCE5E2] bg-[#F8FAF9] p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">
                  Status
                </p>

                <div className="mt-1 flex items-center gap-1.5 text-[9px] font-black text-[#08744F]">

                  <CheckCircle2
                    size={13}
                  />

                  {certificate.status}

                </div>

              </div>

              <div className="text-right">

                <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">
                  Type
                </p>

                <p className="mt-1 text-[9px] font-black text-[#073B4C]">
                  {certificate.shortTitle}
                </p>

              </div>

            </div>

          </div>

          <div className="mt-4 space-y-3">

            <DetailRow
              label="Authority"
              value={
                certificate.authority
              }
              icon={
                <Landmark
                  size={14}
                />
              }
            />

            <DetailRow
              label="Reference Number"
              value={
                certificate.number
              }
              icon={
                <Stamp
                  size={14}
                />
              }
            />

            <DetailRow
              label="Issue Date"
              value={
                certificate.issueDate
              }
              icon={
                <CalendarDays
                  size={14}
                />
              }
            />

            <DetailRow
              label="Category"
              value={
                certificate.category
              }
              icon={
                <Building2
                  size={14}
                />
              }
            />

          </div>

          <div className="mt-4 rounded-xl border border-[#E7D6A0] bg-[#FFFBEF] p-3">

            <div className="flex gap-2">

              <ShieldCheck
                size={15}
                className="shrink-0 text-[#B68B2C]"
              />

              <p className="text-[7px] leading-5 text-[#75633A]">
                This page presents organisational
                certificate information. The actual
                certificate document should be uploaded
                only when the corresponding official
                document is available.
              </p>

            </div>

          </div>

          <div className="mt-5 flex gap-2">

            <button
              type="button"
              onClick={onClose}
              className="h-10 flex-1 rounded-xl border border-gray-200 text-[8px] font-black text-[#073B4C]"
            >
              Close
            </button>

            {certificate.documentUrl && (
              <a
                href={
                  certificate.documentUrl
                }
                target="_blank"
                rel="noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#073B4C] text-[8px] font-black text-white"
              >

                <Download
                  size={13}
                />

                Download PDF

              </a>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

// ============================================================
// DETAIL ROW
// ============================================================

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F7F5] text-[#B68B2C]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[6px] font-black uppercase tracking-widest text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words text-[9px] font-bold text-[#073B4C]">
          {value}
        </p>

      </div>

    </div>
  );
}