"use client";

import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Landmark,
  LockKeyhole,
  Search,
  ShieldCheck,
  Stamp,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ============================================================
   TYPES
============================================================ */

type CertificateStatus =
  | "Available"
  | "Verified"
  | "Registered";

type Certificate = {
  id: string;

  title: string;

  shortTitle: string;

  number: string;

  issueDate: string;

  authority: string;

  status: CertificateStatus;

  description: string;

  category: string;

  documentUrl: string;

  accent:
    | "blue"
    | "green"
    | "gold"
    | "purple"
    | "slate"
    | "orange";
};

/* ============================================================
   AJFT CERTIFICATE DATA
============================================================ */

const certificates: Certificate[] = [
  {
    id: "12ab",

    title:
      "Income Tax Registration Certificate",

    shortTitle:
      "12AB",

    number:
      "As per official certificate",

    issueDate:
      "As per certificate",

    authority:
      "Income Tax Department",

    status:
      "Available",

    description:
      "Official Income Tax registration document of Anand Jivan Foundation Trust. View the uploaded certificate for the exact registration details and validity.",

    category:
      "Income Tax",

    documentUrl:
      "/certificates/12ab.pdf",

    accent:
      "blue",
  },

  {
    id: "80g",

    title:
      "80G Registration Certificate",

    shortTitle:
      "80G",

    number:
      "As per official certificate",

    issueDate:
      "As per certificate",

    authority:
      "Income Tax Department",

    status:
      "Available",

    description:
      "Official Section 80G registration document of Anand Jivan Foundation Trust. Exact approval information should be verified from the published certificate.",

    category:
      "Income Tax",

    documentUrl:
      "/certificates/80g.pdf",

    accent:
      "green",
  },

  {
    id: "trust",

    title:
      "Trust Registration & Trust Deed",

    shortTitle:
      "TRUST DEED",

    number:
      "Deed No. 46",

    issueDate:
      "06 April 2023",

    authority:
      "Competent Registration Authority",

    status:
      "Registered",

    description:
      "Constitutional and governing document establishing Anand Jivan Foundation Trust and defining its charitable objects and governance framework.",

    category:
      "Legal Registration",

    documentUrl:
      "/certificates/trust-deed.pdf",

    accent:
      "gold",
  },

  {
    id: "ngo-darpan",

    title:
      "NGO Darpan Registration",

    shortTitle:
      "NGO DARPAN",

    number:
      "As per official registration",

    issueDate:
      "As per certificate",

    authority:
      "Government of India",

    status:
      "Available",

    description:
      "Government NGO identification and registration record for Anand Jivan Foundation Trust.",

    category:
      "Government",

    documentUrl:
      "/certificates/ngo-darpan.pdf",

    accent:
      "purple",
  },

  {
    id: "pan",

    title:
      "Permanent Account Number",

    shortTitle:
      "PAN",

    number:
      "AAJTA9323K",

    issueDate:
      "As per PAN record",

    authority:
      "Income Tax Department",

    status:
      "Verified",

    description:
      "Permanent Account Number of Anand Jivan Foundation Trust used for statutory and financial identification.",

    category:
      "Tax Identification",

    documentUrl:
      "/certificates/pan.pdf",

    accent:
      "slate",
  },

  {
    id: "csr",

    title:
      "CSR Registration Certificate",

    shortTitle:
      "CSR",

    number:
      "CSR00065273",

    issueDate:
      "15 January 2024",

    authority:
      "Ministry of Corporate Affairs",

    status:
      "Registered",

    description:
      "Registration approval for undertaking Corporate Social Responsibility activities as a registered implementing entity.",

    category:
      "CSR Registration",

    documentUrl:
      "/certificates/csr-registration.pdf",

    accent:
      "orange",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function CertificatesPage() {
  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState<Certificate | null>(
      null
    );

  const filteredCertificates =
    useMemo(() => {
      const query =
        search
          .toLowerCase()
          .trim();

      if (!query) {
        return certificates;
      }

      return certificates.filter(
        (certificate) =>
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
            .includes(query) ||
          certificate.category
            .toLowerCase()
            .includes(query)
      );
    }, [search]);

  return (
    <main className="min-h-screen bg-[#F5F7F6] text-[#073B4C]">

      {/* =====================================================
          TOP ACCENT
      ====================================================== */}

      <div className="h-1 bg-gradient-to-r from-[#073B4C] via-[#B68B2C] to-[#073B4C]" />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#073B4C]">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#B68B2C]/10 blur-3xl" />

        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

          {/* LABEL */}

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D6B454]/30 bg-[#B68B2C]/10 px-4 py-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#E7C76A]">

            <ShieldCheck size={13} />

            Official Organisation Records

          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            {/* LEFT */}

            <div className="max-w-4xl">

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">

                Certificates &

                <span className="block text-[#D6B454]">
                  Registrations
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">

                Official statutory, registration and
                organisational documents of Anand Jivan
                Foundation Trust are published here for
                transparency and verification.

              </p>

            </div>

            {/* TRUST PANEL */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B68B2C]/20 text-[#E7C76A]">

                  <Landmark size={23} />

                </div>

                <div>

                  <p className="text-[8px] font-black uppercase tracking-widest text-white/40">

                    Organisation

                  </p>

                  <p className="mt-1 text-sm font-black text-white">

                    Anand Jivan Foundation Trust

                  </p>

                  <p className="mt-1 text-[9px] text-white/55">

                    PAN: AAJTA9323K

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">

            <HeroStat
              icon={
                <FileCheck2 size={16} />
              }
              value={
                String(
                  certificates.length
                )
              }
              label="Official Records"
            />

            <HeroStat
              icon={
                <ShieldCheck size={16} />
              }
              value="12AB"
              label="Tax Registration"
            />

            <HeroStat
              icon={
                <Award size={16} />
              }
              value="80G"
              label="Donation Approval"
            />

            <HeroStat
              icon={
                <Building2 size={16} />
              }
              value="CSR"
              label="MCA Registration"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          DIRECTORY HEADER
      ====================================================== */}

      <section className="px-4 py-7 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#B68B2C]">

                  Document Directory

                </p>

                <h2 className="mt-2 text-2xl font-black text-[#073B4C]">

                  Organisation Certificates

                </h2>

                <p className="mt-2 text-xs text-slate-500">

                  Select any certificate to view details or
                  open the official PDF document.

                </p>

              </div>

              {/* SEARCH */}

              <div className="relative w-full lg:max-w-md">

                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search certificate, registration or authority..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-xs font-medium text-slate-700 outline-none transition focus:border-[#B68B2C] focus:bg-white"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CERTIFICATE GRID
      ====================================================== */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* RESULT COUNT */}

          <div className="mb-5 flex items-center justify-between">

            <p className="text-xs font-semibold text-slate-500">

              Showing{" "}

              <span className="font-black text-[#073B4C]">

                {filteredCertificates.length}

              </span>

              {" "}records

            </p>

          </div>

          {filteredCertificates.length ===
          0 ? (

            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">

              <Search
                size={32}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-lg font-black text-[#073B4C]">

                No certificate found

              </h3>

              <p className="mt-2 text-xs text-slate-400">

                Try searching with another keyword.

              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredCertificates.map(
                (certificate) => (

                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
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
          TRANSPARENCY NOTE
      ====================================================== */}

      <section className="border-y border-[#DCE5E2] bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F8F6] text-[#B68B2C]">

              <LockKeyhole size={25} />

            </div>

            <div>

              <h3 className="text-lg font-black text-[#073B4C]">

                Transparency & Document Verification

              </h3>

              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-500">

                Certificate information displayed on this page
                is intended for organisational transparency.
                The official PDF document should always be
                referred to for the complete certificate,
                registration number, issue date, validity and
                statutory terms.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#073B4C]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-7 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">

          <div>

            <p className="text-sm font-black text-white">

              Anand Jivan Foundation Trust

            </p>

            <p className="mt-1 text-[9px] text-white/45">

              Official Certificates & Registration Directory

            </p>

          </div>

          <div className="flex items-center gap-2 text-[9px] text-white/45">

            <LockKeyhole size={12} />

            Secure document information portal

          </div>

        </div>

      </footer>

      {/* =====================================================
          MODAL
      ====================================================== */}

      {selected && (

        <CertificateModal
          certificate={selected}
          onClose={() =>
            setSelected(null)
          }
        />

      )}

    </main>
  );
}

/* ============================================================
   HERO STAT
============================================================ */

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">

      <div className="flex items-center gap-2 text-[#D6B454]">

        {icon}

        <span className="text-lg font-black text-white">

          {value}

        </span>

      </div>

      <p className="mt-2 text-[7px] font-bold uppercase tracking-widest text-white/40">

        {label}

      </p>

    </div>

  );
}

/* ============================================================
   CERTIFICATE CARD
============================================================ */

function CertificateCard({
  certificate,
  onView,
}: {
  certificate: Certificate;
  onView: () => void;
}) {

  const accentClasses = {
    blue: {
      icon:
        "bg-blue-50 text-blue-700",
      badge:
        "bg-blue-50 text-blue-700",
    },

    green: {
      icon:
        "bg-emerald-50 text-emerald-700",
      badge:
        "bg-emerald-50 text-emerald-700",
    },

    gold: {
      icon:
        "bg-amber-50 text-amber-700",
      badge:
        "bg-amber-50 text-amber-700",
    },

    purple: {
      icon:
        "bg-purple-50 text-purple-700",
      badge:
        "bg-purple-50 text-purple-700",
    },

    slate: {
      icon:
        "bg-slate-100 text-slate-700",
      badge:
        "bg-slate-100 text-slate-700",
    },

    orange: {
      icon:
        "bg-orange-50 text-orange-700",
      badge:
        "bg-orange-50 text-orange-700",
    },
  };

  const accent =
    accentClasses[
      certificate.accent
    ];

  return (

    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="h-1 bg-gradient-to-r from-[#073B4C] via-[#B68B2C] to-[#073B4C]" />

      <div className="p-6">

        {/* TOP */}

        <div className="flex items-start justify-between gap-4">

          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accent.icon}`}
          >

            <FileText size={25} />

          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[7px] font-black uppercase tracking-wider ${accent.badge}`}
          >

            <CheckCircle2 size={11} />

            {certificate.status}

          </span>

        </div>

        {/* CONTENT */}

        <div className="mt-5">

          <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#B68B2C]">

            {certificate.category}

          </p>

          <h3 className="mt-2 text-lg font-black leading-6 text-[#073B4C]">

            {certificate.title}

          </h3>

          <p className="mt-3 min-h-[64px] text-xs leading-6 text-slate-500">

            {certificate.description}

          </p>

        </div>

        {/* DETAILS */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          <InfoBox
            icon={
              <Stamp size={12} />
            }
            label="Certificate"
            value={
              certificate.shortTitle
            }
          />

          <InfoBox
            icon={
              <CalendarDays size={12} />
            }
            label="Issue Date"
            value={
              certificate.issueDate
            }
          />

        </div>

        {/* NUMBER */}

        <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">

          <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">

            Registration / Reference

          </p>

          <p className="mt-2 break-all text-xs font-black text-[#073B4C]">

            {certificate.number}

          </p>

        </div>

        {/* AUTHORITY */}

        <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">

          <Landmark
            size={14}
            className="text-[#B68B2C]"
          />

          {certificate.authority}

        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={onView}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#073B4C] text-xs font-black text-white transition hover:bg-[#0A5066]"
          >

            <Eye size={15} />

            View Certificate

          </button>

          <a
            href={certificate.documentUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[#073B4C] transition hover:border-[#B68B2C] hover:text-[#B68B2C]"
            title="Open PDF"
          >

            <ExternalLink size={16} />

          </a>

        </div>

      </div>

    </article>

  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl border border-slate-100 bg-white p-3">

      <div className="flex items-center gap-1.5 text-[#B68B2C]">

        {icon}

        <span className="text-[7px] font-black uppercase tracking-wider text-slate-400">

          {label}

        </span>

      </div>

      <p className="mt-2 truncate text-[9px] font-bold text-[#073B4C]">

        {value}

      </p>

    </div>

  );
}

/* ============================================================
   MODAL
============================================================ */

function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {

  return (

    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#073B4C]/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >

      <div
        className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="relative bg-[#073B4C] px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >

            <X size={17} />

          </button>

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#073B4C]">

              <FileCheck2 size={24} />

            </div>

            <div className="pr-12">

              <p className="text-[8px] font-black uppercase tracking-widest text-[#D6B454]">

                Official Certificate Record

              </p>

              <h3 className="mt-1 text-base font-black text-white sm:text-lg">

                {certificate.title}

              </h3>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[330px_1fr]">

          {/* INFORMATION */}

          <div className="border-b border-slate-100 bg-[#F8FAF9] p-5 lg:border-b-0 lg:border-r">

            <div className="rounded-2xl border border-slate-200 bg-white p-4">

              <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">

                Status

              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-black text-emerald-700">

                <CheckCircle2 size={16} />

                {certificate.status}

              </div>

            </div>

            <div className="mt-4 space-y-3">

              <DetailRow
                label="Authority"
                value={
                  certificate.authority
                }
                icon={
                  <Landmark size={14} />
                }
              />

              <DetailRow
                label="Reference Number"
                value={
                  certificate.number
                }
                icon={
                  <Stamp size={14} />
                }
              />

              <DetailRow
                label="Issue Date"
                value={
                  certificate.issueDate
                }
                icon={
                  <CalendarDays size={14} />
                }
              />

              <DetailRow
                label="Category"
                value={
                  certificate.category
                }
                icon={
                  <Building2 size={14} />
                }
              />

            </div>

            <div className="mt-5 rounded-2xl border border-[#E7D6A0] bg-[#FFFBEF] p-4">

              <div className="flex gap-2">

                <ShieldCheck
                  size={16}
                  className="shrink-0 text-[#B68B2C]"
                />

                <p className="text-[9px] leading-5 text-[#75633A]">

                  The official PDF should be referred to
                  for complete statutory information and
                  certificate validity.

                </p>

              </div>

            </div>

          </div>

          {/* PDF PREVIEW */}

          <div className="min-h-[520px] bg-slate-100 p-3 sm:p-5">

            <div className="flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

                <div className="flex items-center gap-2">

                  <FileText
                    size={16}
                    className="text-red-600"
                  />

                  <span className="text-xs font-bold text-[#073B4C]">

                    Official PDF Document

                  </span>

                </div>

                <a
                  href={
                    certificate.documentUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black text-[#B68B2C]"
                >

                  <ExternalLink size={13} />

                  Open

                </a>

              </div>

              <iframe
                src={`${certificate.documentUrl}#view=FitH`}
                title={
                  certificate.title
                }
                className="min-h-[480px] flex-1 border-0"
              />

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex gap-3 border-t border-slate-200 bg-white p-4">

          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl border border-slate-200 text-xs font-black text-[#073B4C]"
          >

            Close

          </button>

          <a
            href={
              certificate.documentUrl
            }
            download
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#073B4C] text-xs font-black text-white transition hover:bg-[#0A5066]"
          >

            <Download size={15} />

            Download PDF

          </a>

        </div>

      </div>

    </div>

  );
}

/* ============================================================
   DETAIL ROW
============================================================ */

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {

  return (

    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F7F5] text-[#B68B2C]">

        {icon}

      </div>

      <div className="min-w-0">

        <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">

          {label}

        </p>

        <p className="mt-1 break-words text-[10px] font-bold text-[#073B4C]">

          {value}

        </p>

      </div>

    </div>

  );
}