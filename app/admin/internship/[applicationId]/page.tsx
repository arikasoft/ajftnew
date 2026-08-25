"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
  CalendarDays,
  CreditCard,
  Award,
  AlertCircle,
} from "lucide-react";

type Application = {
  applicationId: string;

  student: {
    name: string;
    email: string;
    phone: string;
    dob?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  education: {
    institution?: string;
    course?: string;
    qualification?: string;
  };

  internship: {
    area: string;
    duration: string;
    startDate?: string;
    endDate?: string;
  };

  status: string;

  physicalReceived: boolean;
  physicalReceivedAt?: string;

  approvedAt?: string;

  internId?: string;

  completedAt?: string;

  certificateEligible: boolean;

  certificatePaymentStatus: string;

  certificateId?: string;

  createdAt: string;
};

/* =========================================================
   MAIN PAGE
========================================================= */

export default function InternshipAdminDetail({
  params,
}: {
  params: Promise<{
    applicationId: string;
  }>;
}) {
  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [applicationId, setApplicationId] =
    useState("");

  useEffect(() => {
    params.then((value) => {
      setApplicationId(
        value.applicationId
      );
    });
  }, [params]);

  /* =========================================================
     LOAD APPLICATION
  ========================================================= */

  async function loadApplication() {
    if (!applicationId) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/internship/${applicationId}`,
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Application not found."
        );
      }

      setApplication(
        data.application
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load application."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  /* =========================================================
     WORKFLOW ACTION
  ========================================================= */

  async function performAction(
    action: string
  ) {
    if (!applicationId) return;

    try {
      setActionLoading(action);
      setMessage("");
      setError("");

      const response = await fetch(
        `/api/admin/internship/${applicationId}/action`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Action failed."
        );
      }

      setMessage(
        data.message ||
          "Application updated successfully."
      );

      setApplication(
        data.application
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to perform action."
      );
    } finally {
      setActionLoading("");
    }
  }

  /* =========================================================
     ID CARD
  ========================================================= */

  async function generateIdCard() {
    if (!application) return;

    try {
      setActionLoading("ID_CARD");
      setMessage("");
      setError("");

      const response = await fetch(
        "/api/internship/id-card",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            applicationId:
              application.applicationId,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage =
          "Unable to generate ID card.";

        try {
          const data =
            await response.json();

          errorMessage =
            data.message ||
            errorMessage;
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(
          errorMessage
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${application.applicationId}-ID-Card.pdf`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

      setMessage(
        "Internship ID Card generated successfully."
      );

      await loadApplication();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ID Card generation failed."
      );
    } finally {
      setActionLoading("");
    }
  }

  /* =========================================================
     APPLICATION PDF
  ========================================================= */

  function downloadApplicationPdf() {
    if (!application) return;

    window.open(
      `/api/internship/application-pdf?applicationId=${encodeURIComponent(
        application.applicationId
      )}`,
      "_blank"
    );
  }

  /* =========================================================
     COMPLETION VALIDATION
  ========================================================= */

  const completionInfo =
    getCompletionInfo(
      application?.internship.startDate,
      application?.internship.endDate,
      application?.internship.duration
    );

  const canComplete =
    application?.status ===
      "INTERNSHIP_ACTIVE" &&
    !application.completedAt &&
    completionInfo.canComplete;

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F8FA]">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading application...
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!application) {
    return (
      <main className="min-h-screen bg-[#F6F8FA] p-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertCircle size={25} />
          </div>

          <p className="mt-5 text-sm font-bold text-red-500">
            {error ||
              "Application not found."}
          </p>

          <Link
            href="/admin/internship"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3 text-xs font-black text-white"
          >
            <ArrowLeft size={14} />
            Back to Applications
          </Link>

        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F6F8FA]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-5 px-5 py-4 sm:px-7">

          <div className="min-w-0">

            <Link
              href="/admin/internship"
              className="mb-2 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-[#7C3AED]"
            >
              <ArrowLeft size={12} />
              Internship Applications
            </Link>

            <h1 className="truncate text-xl font-black text-[#172033] sm:text-2xl">
              Application Details
            </h1>

            <p className="mt-1 truncate font-mono text-[10px] font-black text-[#7C3AED]">
              {application.applicationId}
            </p>

          </div>

          <div className="flex shrink-0 items-center gap-2">

            <button
              onClick={loadApplication}
              disabled={loading}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-[10px]
                font-black
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
              "
            >
              <RefreshCw
                size={14}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-[1450px] px-5 py-6 sm:px-7">

        {/* ===================================================
            ALERTS
        ==================================================== */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-xs font-bold text-emerald-700">

            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>{message}</span>

          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-xs font-bold text-red-600">

            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>

          </div>
        )}

        {/* ===================================================
            TOP SUMMARY
        ==================================================== */}

        <section className="mb-6 overflow-hidden rounded-[2rem] bg-[#21164F] shadow-xl">

          <div className="relative p-6 sm:p-8">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#7C3AED]/30 blur-3xl" />

            <div className="absolute -bottom-32 left-20 h-64 w-64 rounded-full bg-[#14B8A6]/10 blur-3xl" />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#5EEAD4]">
                  AJFT Internship Management
                </p>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  {application.student.name}
                </h2>

                <p className="mt-2 font-mono text-[10px] font-bold text-[#C4B5FD]">
                  {application.applicationId}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  <StatusPill
                    status={
                      application.status
                    }
                  />

                  {application.internId && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[8px] font-black text-white/80">
                      <ShieldCheck size={11} />
                      {application.internId}
                    </span>
                  )}

                </div>

              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">

                <MiniStat
                  label="Area"
                  value={
                    application.internship.area
                  }
                />

                <MiniStat
                  label="Duration"
                  value={
                    application.internship.duration
                  }
                />

                <MiniStat
                  label="Certificate"
                  value={
                    application.certificateEligible
                      ? "Eligible"
                      : "Pending"
                  }
                />

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            MAIN
        ==================================================== */}

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* STUDENT */}

            <Panel
              title="Student Information"
              icon={<UserRound size={18} />}
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Detail
                  label="Full Name"
                  value={
                    application.student.name
                  }
                />

                <Detail
                  label="Email"
                  value={
                    application.student.email
                  }
                />

                <Detail
                  label="Mobile"
                  value={
                    application.student.phone
                  }
                />

                <Detail
                  label="Date of Birth"
                  value={
                    application.student.dob ||
                    "—"
                  }
                />

                <Detail
                  label="Address"
                  value={
                    application.student.address ||
                    "—"
                  }
                />

                <Detail
                  label="City"
                  value={
                    application.student.city ||
                    "—"
                  }
                />

                <Detail
                  label="State"
                  value={
                    application.student.state ||
                    "—"
                  }
                />

                <Detail
                  label="Pincode"
                  value={
                    application.student.pincode ||
                    "—"
                  }
                />

              </div>

            </Panel>

            {/* EDUCATION */}

            <Panel
              title="Educational Information"
              icon={
                <GraduationCap size={18} />
              }
            >

              <div className="grid gap-5 md:grid-cols-3">

                <Detail
                  label="Institution"
                  value={
                    application.education
                      .institution ||
                    "—"
                  }
                />

                <Detail
                  label="Course"
                  value={
                    application.education
                      .course ||
                    "—"
                  }
                />

                <Detail
                  label="Qualification"
                  value={
                    application.education
                      .qualification ||
                    "—"
                  }
                />

              </div>

            </Panel>

            {/* INTERNSHIP */}

            <Panel
              title="Internship Details"
              icon={
                <FileCheck2 size={18} />
              }
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Detail
                  label="Internship Area"
                  value={
                    application.internship.area
                  }
                />

                <Detail
                  label="Duration"
                  value={
                    application.internship.duration
                  }
                />

                <Detail
                  label="Start Date"
                  value={
                    application.internship.startDate ||
                    "Not Set"
                  }
                />

                <Detail
                  label="End Date"
                  value={
                    application.internship.endDate ||
                    "Not Set"
                  }
                />

              </div>

              {/* DATE INFO */}

              {application.internship
                .startDate && (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  <DateBox
                    label="Start"
                    value={
                      application.internship
                        .startDate
                    }
                    icon={
                      <CalendarDays
                        size={15}
                      />
                    }
                  />

                  <DateBox
                    label="End"
                    value={
                      application.internship
                        .endDate ||
                      "Not calculated"
                    }
                    icon={
                      <Clock3 size={15} />
                    }
                  />

                  <DateBox
                    label="Completion"
                    value={
                      application.completedAt
                        ? formatDate(
                            application.completedAt
                          )
                        : "Pending"
                    }
                    icon={
                      <CheckCircle2
                        size={15}
                      />
                    }
                  />

                </div>
              )}

            </Panel>

            {/* DOCUMENT */}

            <Panel
              title="Application Document"
              icon={
                <FileText size={18} />
              }
            >

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-black text-[#172033]">
                        Application Form
                      </p>

                      <p className="mt-1 truncate font-mono text-[9px] text-slate-400">
                        {
                          application.applicationId
                        }
                        .pdf
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={
                      downloadApplicationPdf
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2.5
                      text-[9px]
                      font-black
                      text-slate-600
                      transition
                      hover:border-[#7C3AED]
                      hover:text-[#7C3AED]
                    "
                  >
                    <Download size={13} />
                    Download PDF
                  </button>

                </div>

              </div>

            </Panel>

            {/* CERTIFICATE STATUS */}

            <Panel
              title="Certificate"
              icon={
                <Award size={18} />
              }
            >

              <div className="grid gap-4 sm:grid-cols-3">

                <InfoCard
                  label="Eligibility"
                  value={
                    application.certificateEligible
                      ? "ELIGIBLE"
                      : "NOT ELIGIBLE"
                  }
                  success={
                    application.certificateEligible
                  }
                />

                <InfoCard
                  label="Payment"
                  value={
                    application
                      .certificatePaymentStatus ||
                    "PENDING"
                  }
                  success={
                    application
                      .certificatePaymentStatus ===
                    "PAID"
                  }
                />

                <InfoCard
                  label="Certificate ID"
                  value={
                    application.certificateId ||
                    "Not Generated"
                  }
                  success={
                    !!application.certificateId
                  }
                />

              </div>

              {application.certificateEligible && (
                <div className="mt-5 rounded-xl border border-[#E8E2FF] bg-[#FAF9FF] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                      <CreditCard size={18} />
                    </div>

                    <div>

                      <p className="text-[9px] font-black uppercase tracking-wider text-[#7C3AED]">
                        Certificate Processing Fee
                      </p>

                      <p className="mt-1 text-lg font-black text-[#172033]">
                        ₹2,250
                      </p>

                    </div>

                  </div>

                </div>
              )}

            </Panel>

          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="space-y-5">

            {/* CURRENT STATUS */}

            <div className="rounded-[1.8rem] bg-[#21164F] p-6 text-white shadow-xl">

              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#5EEAD4]">
                Current Status
              </p>

              <h2 className="mt-3 text-xl font-black">
                {application.status.replaceAll(
                  "_",
                  " "
                )}
              </h2>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-[#14B8A6] transition-all"
                  style={{
                    width: `${getProgress(
                      application.status
                    )}%`,
                  }}
                />

              </div>

              <div className="mt-2 flex justify-between">

                <span className="text-[8px] text-white/40">
                  Application Progress
                </span>

                <span className="text-[8px] font-black text-[#5EEAD4]">
                  {getProgress(
                    application.status
                  )}
                  %
                </span>

              </div>

            </div>

            {/* WORKFLOW */}

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1EDFF] text-[#7C3AED]">
                  <ShieldCheck size={19} />
                </div>

                <div>

                  <p className="text-[8px] font-black uppercase tracking-wider text-[#7C3AED]">
                    AJFT Control
                  </p>

                  <h2 className="text-base font-black text-[#172033]">
                    Workflow
                  </h2>

                </div>

              </div>

              <div className="mt-6 space-y-3">

                {/* PHYSICAL */}

                <ActionButton
                  title="Physical Application Received"
                  text={
                    application.physicalReceived
                      ? `Received ${
                          application.physicalReceivedAt
                            ? formatDate(
                                application.physicalReceivedAt
                              )
                            : ""
                        }`
                      : "Confirm physical paper received at AJFT office"
                  }
                  icon={
                    <FileCheck2 size={17} />
                  }
                  disabled={
                    application.physicalReceived ||
                    actionLoading !== ""
                  }
                  loading={
                    actionLoading ===
                    "PHYSICAL_RECEIVED"
                  }
                  onClick={() =>
                    performAction(
                      "PHYSICAL_RECEIVED"
                    )
                  }
                  complete={
                    application.physicalReceived
                  }
                />

                {/* APPROVE */}

                <ActionButton
                  title="Approve Application"
                  text={
                    application.approvedAt
                      ? `Approved ${
                          application.approvedAt
                            ? formatDate(
                                application.approvedAt
                              )
                            : ""
                        }`
                      : "Approve after physical document verification"
                  }
                  icon={
                    <CheckCircle2 size={17} />
                  }
                  disabled={
                    !application.physicalReceived ||
                    !!application.approvedAt ||
                    actionLoading !== ""
                  }
                  loading={
                    actionLoading ===
                    "APPROVE"
                  }
                  onClick={() =>
                    performAction(
                      "APPROVE"
                    )
                  }
                  complete={
                    !!application.approvedAt
                  }
                />

                {/* ID CARD */}

                {application.approvedAt && (
                  <button
                    type="button"
                    disabled={
                      actionLoading ===
                      "ID_CARD"
                    }
                    onClick={
                      generateIdCard
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-[#0F766E]/20
                      bg-[#F0FDFA]
                      p-4
                      text-left
                      transition
                      hover:border-[#0F766E]
                      hover:bg-[#ECFDF5]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0F766E] text-white">

                      {actionLoading ===
                      "ID_CARD" ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <ShieldCheck
                          size={16}
                        />
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-[10px] font-black text-[#172033]">
                        Generate Internship ID Card
                      </p>

                      <p className="mt-1 text-[8px] leading-4 text-slate-400">
                        Create official printable ID card PDF
                      </p>

                    </div>

                    <Download
                      size={15}
                      className="shrink-0 text-[#0F766E]"
                    />

                  </button>
                )}

                {/* START */}

                <ActionButton
                  title="Start Internship"
                  text={
                    application.status ===
                    "INTERNSHIP_ACTIVE"
                      ? "Internship is currently active"
                      : "Start approved internship"
                  }
                  icon={
                    <GraduationCap size={17} />
                  }
                  disabled={
                    !application.approvedAt ||
                    application.status ===
                      "INTERNSHIP_ACTIVE" ||
                    application.status ===
                      "COMPLETED" ||
                    actionLoading !== ""
                  }
                  loading={
                    actionLoading ===
                    "START"
                  }
                  onClick={() =>
                    performAction(
                      "START"
                    )
                  }
                  complete={
                    application.status ===
                      "INTERNSHIP_ACTIVE" ||
                    application.status ===
                      "COMPLETED"
                  }
                />

                {/* COMPLETE */}

                <ActionButton
                  title="Mark Internship Completed"
                  text={
                    application.completedAt
                      ? `Completed ${
                          application.completedAt
                            ? formatDate(
                                application.completedAt
                              )
                            : ""
                        }`
                      : completionInfo.canComplete
                        ? "Internship duration completed — ready to close"
                        : completionInfo.message
                  }
                  icon={
                    <FileCheck2 size={17} />
                  }
                  disabled={
                    application.status !==
                      "INTERNSHIP_ACTIVE" ||
                    !!application.completedAt ||
                    !completionInfo.canComplete ||
                    actionLoading !== ""
                  }
                  loading={
                    actionLoading ===
                    "COMPLETE"
                  }
                  onClick={() =>
                    performAction(
                      "COMPLETE"
                    )
                  }
                  complete={
                    !!application.completedAt
                  }
                />

              </div>

            </div>

            {/* COMPLETION INFO */}

            {application.status ===
              "INTERNSHIP_ACTIVE" && (
              <div
                className={`
                  rounded-[1.8rem]
                  border
                  p-6
                  ${
                    completionInfo.canComplete
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-amber-200 bg-amber-50"
                  }
                `}
              >

                <div className="flex items-start gap-3">

                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        completionInfo.canComplete
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500 text-white"
                      }
                    `}
                  >
                    {completionInfo.canComplete ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Clock3 size={18} />
                    )}
                  </div>

                  <div>

                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                      Completion Check
                    </p>

                    <p className="mt-1 text-xs font-black text-[#172033]">
                      {completionInfo.message}
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* CONTACT */}

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6">

              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
                Student Contact
              </p>

              <a
                href={`mailto:${application.student.email}`}
                className="mt-4 flex items-start gap-3 text-xs font-bold text-[#7C3AED] hover:underline"
              >
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0"
                />
                <span className="break-all">
                  {application.student.email}
                </span>
              </a>

              <a
                href={`tel:${application.student.phone}`}
                className="mt-3 flex items-center gap-3 text-xs font-bold text-[#0F766E] hover:underline"
              >
                <Phone size={15} />
                {application.student.phone}
              </a>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   PANEL
========================================================= */

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1EDFF] text-[#7C3AED]">
          {icon}
        </div>

        <h2 className="text-base font-black text-[#172033]">
          {title}
        </h2>

      </div>

      <div className="pt-6">
        {children}
      </div>

    </section>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-xs font-bold leading-5 text-[#172033]">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  title,
  text,
  icon,
  onClick,
  disabled,
  loading,
  complete,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  complete: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        border
        p-4
        text-left
        transition
        ${
          complete
            ? "border-emerald-200 bg-emerald-50"
            : disabled
              ? "cursor-not-allowed border-slate-100 bg-slate-50 opacity-60"
              : "border-slate-200 bg-white hover:border-[#7C3AED] hover:bg-[#FAF9FF]"
        }
      `}
    >

      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${
            complete
              ? "bg-emerald-500 text-white"
              : "bg-[#F1EDFF] text-[#7C3AED]"
          }
        `}
      >
        {loading ? (
          <Loader2
            size={16}
            className="animate-spin"
          />
        ) : (
          icon
        )}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[10px] font-black text-[#172033]">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-slate-400">
          {text}
        </p>

      </div>

      {complete && (
        <CheckCircle2
          size={16}
          className="shrink-0 text-emerald-500"
        />
      )}

    </button>
  );
}

/* =========================================================
   STATUS PILL
========================================================= */

function StatusPill({
  status,
}: {
  status: string;
}) {
  const green = [
    "APPROVED",
    "ID_CARD_GENERATED",
    "INTERNSHIP_ACTIVE",
    "COMPLETED",
    "PAYMENT_RECEIVED",
    "CERTIFICATE_GENERATED",
  ].includes(status);

  const yellow = [
    "SUBMITTED",
    "PDF_GENERATED",
    "EMAIL_SENT",
    "PHYSICAL_PENDING",
    "CERTIFICATE_PENDING_PAYMENT",
  ].includes(status);

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1.5
        text-[8px]
        font-black
        ${
          green
            ? "bg-emerald-400/15 text-emerald-200"
            : yellow
              ? "bg-amber-300/15 text-amber-200"
              : "bg-white/10 text-white/70"
        }
      `}
    >
      {green ? (
        <CheckCircle2 size={11} />
      ) : (
        <Clock3 size={11} />
      )}

      {status.replaceAll(
        "_",
        " "
      )}
    </span>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/10 p-3">

      <p className="text-[7px] font-black uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p className="mt-1 truncate text-[9px] font-black text-white">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   DATE BOX
========================================================= */

function DateBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-[#7C3AED]">

        {icon}

        <span className="text-[8px] font-black uppercase tracking-wider">
          {label}
        </span>

      </div>

      <p className="mt-2 text-[10px] font-black text-[#172033]">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
  success,
}: {
  label: string;
  value: string;
  success: boolean;
}) {
  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        ${
          success
            ? "border-emerald-200 bg-emerald-50"
            : "border-slate-200 bg-slate-50"
        }
      `}
    >

      <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">

        {success && (
          <CheckCircle2
            size={14}
            className="text-emerald-500"
          />
        )}

        <p className="break-all text-[9px] font-black text-[#172033]">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   PROGRESS
========================================================= */

function getProgress(
  status: string
) {
  switch (status) {
    case "SUBMITTED":
    case "PDF_GENERATED":
    case "EMAIL_SENT":
      return 15;

    case "PHYSICAL_PENDING":
    case "PHYSICAL_RECEIVED":
      return 30;

    case "APPROVED":
      return 45;

    case "ID_CARD_GENERATED":
      return 55;

    case "INTERNSHIP_ACTIVE":
      return 70;

    case "COMPLETED":
      return 85;

    case "CERTIFICATE_PENDING_PAYMENT":
      return 90;

    case "PAYMENT_RECEIVED":
      return 95;

    case "CERTIFICATE_GENERATED":
      return 100;

    default:
      return 10;
  }
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
  value?: string
) {
  if (!value) return "—";

  const date =
    new Date(value);

  if (Number.isNaN(
    date.getTime()
  )) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* =========================================================
   COMPLETION DATE VALIDATION
========================================================= */

function getCompletionInfo(
  startDate?: string,
  endDate?: string,
  duration?: string
) {
  if (!startDate) {
    return {
      canComplete: false,
      message:
        "Internship start date is not set.",
    };
  }

  const start =
    parseDate(startDate);

  if (!start) {
    return {
      canComplete: false,
      message:
        "Invalid internship start date.",
    };
  }

  let completionDate =
    parseDate(endDate);

  if (!completionDate) {
    completionDate =
      calculateEndDate(
        start,
        duration || ""
      );
  }

  if (!completionDate) {
    return {
      canComplete: false,
      message:
        "Set a valid internship end date before completion.",
    };
  }

  const today =
    new Date();

  today.setHours(
    23,
    59,
    59,
    999
  );

  const completed =
    today >= completionDate;

  if (completed) {
    return {
      canComplete: true,
      message:
        `Internship period completed on ${formatDate(
          completionDate.toISOString()
        )}.`,
    };
  }

  return {
    canComplete: false,
    message:
      `Internship can be completed after ${formatDate(
        completionDate.toISOString()
      )}.`,
  };
}

/* =========================================================
   PARSE DATE
========================================================= */

function parseDate(
  value?: string
) {
  if (!value) return null;

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;
}

/* =========================================================
   CALCULATE END DATE
========================================================= */

function calculateEndDate(
  start: Date,
  duration: string
) {
  const match =
    duration
      .toLowerCase()
      .match(
        /(\d+(?:\.\d+)?)\s*(week|weeks|month|months|day|days)/
      );

  if (!match) {
    return null;
  }

  const amount =
    Number(match[1]);

  const unit =
    match[2];

  const end =
    new Date(start);

  if (
    unit === "week" ||
    unit === "weeks"
  ) {
    end.setDate(
      end.getDate() +
        Math.round(
          amount * 7
        )
    );
  }

  if (
    unit === "month" ||
    unit === "months"
  ) {
    end.setMonth(
      end.getMonth() +
        amount
    );
  }

  if (
    unit === "day" ||
    unit === "days"
  ) {
    end.setDate(
      end.getDate() +
        amount
    );
  }

  return end;
}