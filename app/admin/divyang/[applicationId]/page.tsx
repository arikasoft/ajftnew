"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";


/* =========================================================
   TYPES
========================================================= */

type UnknownRecord =
  Record<string, unknown>;

type HistoryItem = {
  _id?: unknown;
  status?: unknown;
  remarks?: unknown;
  comment?: unknown;
  updatedBy?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};


/* =========================================================
   SAFE VALUE HELPERS
========================================================= */

function safeString(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}


function safeNumber(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "0";
  }

  const number =
    Number(value);

  if (
    Number.isNaN(number)
  ) {
    return safeString(value);
  }

  return number.toLocaleString(
    "en-IN"
  );
}


/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(
  value: unknown
): string {
  const stringValue =
    safeString(value);

  if (!stringValue) {
    return "Not Available";
  }

  try {
    const date =
      new Date(stringValue);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return stringValue;
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(date);
  } catch {
    return stringValue;
  }
}


/* =========================================================
   STATUS COLOR
========================================================= */

function getStatusClasses(
  status: unknown
): string {
  const value =
    safeString(status)
      .toLowerCase();

  if (
    [
      "approved",
      "active",
      "completed",
      "verified",
    ].includes(value)
  ) {
    return [
      "bg-emerald-50",
      "text-emerald-700",
      "border-emerald-200",
    ].join(" ");
  }

  if (
    [
      "rejected",
      "cancelled",
      "inactive",
    ].includes(value)
  ) {
    return [
      "bg-red-50",
      "text-red-700",
      "border-red-200",
    ].join(" ");
  }

  if (
    [
      "pending",
      "under review",
      "review",
    ].includes(value)
  ) {
    return [
      "bg-amber-50",
      "text-amber-700",
      "border-amber-200",
    ].join(" ");
  }

  return [
    "bg-blue-50",
    "text-blue-700",
    "border-blue-200",
  ].join(" ");
}


/* =========================================================
   PAGE
========================================================= */

export default function DivyangApplicationPage() {

  const [
    application,
    setApplication,
  ] =
    useState<UnknownRecord | null>(
      null
    );


  const [
    history,
    setHistory,
  ] =
    useState<HistoryItem[]>(
      []
    );


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    error,
    setError,
  ] =
    useState("");


  /* =======================================================
     GET APPLICATION ID
  ======================================================= */

  const getApplicationId =
    (): string => {

      if (
        typeof window ===
        "undefined"
      ) {
        return "";
      }

      const parts =
        window.location.pathname
          .split("/")
          .filter(Boolean);

      return (
        parts[
          parts.length - 1
        ] || ""
      );
    };


  /* =======================================================
     LOAD DATA
  ======================================================= */

  async function loadApplication() {

    const applicationId =
      getApplicationId();

    if (!applicationId) {

      setError(
        "Application ID not found."
      );

      setLoading(false);

      return;
    }

    try {

      setLoading(true);

      setError("");

      const response =
        await fetch(
          `/api/admin/divyang/${applicationId}`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );


      const result =
        await response.json();


      if (
        !response.ok
      ) {

        throw new Error(
          safeString(
            result?.message
          ) ||
          "Unable to load application."
        );

      }


      const applicationData =
        result?.application ||
        result?.data ||
        result;


      if (
        applicationData &&
        typeof applicationData ===
          "object"
      ) {

        setApplication(
          applicationData as UnknownRecord
        );

      }


      const historyData =
        result?.history ||
        applicationData?.history ||
        [];


      if (
        Array.isArray(
          historyData
        )
      ) {

        setHistory(
          historyData.map(
            (
              item: unknown
            ) => {

              if (
                item &&
                typeof item ===
                  "object"
              ) {

                return item as HistoryItem;

              }

              return {};

            }
          )
        );

      }

    } catch (
      error
    ) {

      console.error(
        "DIVYANG APPLICATION ERROR:",
        error
      );


      setError(
        error instanceof Error
          ? error.message
          : "Unable to load application."
      );

    } finally {

      setLoading(false);

    }
  }


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(
    () => {

      loadApplication();

    },
    []
  );


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading
  ) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#075b9c]" />

          <p className="mt-4 text-sm font-bold text-slate-500">

            Loading application...

          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error
  ) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <XCircle className="mx-auto h-14 w-14 text-red-500" />

          <h1 className="mt-5 text-xl font-black text-slate-900">

            Unable to Load Application

          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">

            {error}

          </p>


          <button
            type="button"
            onClick={
              loadApplication
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#075b9c] px-5 py-3 text-sm font-black text-white"
          >

            <RefreshCw className="h-4 w-4" />

            Try Again

          </button>


          <Link
            href="/admin/divyang"
            className="mt-3 block text-sm font-bold text-[#075b9c]"
          >

            Back to Applications

          </Link>

        </div>

      </main>

    );

  }


  /* =======================================================
     SAFE APPLICATION VALUES
  ======================================================= */

  const applicationId =
    safeString(
      application?.applicationId
    ) ||
    safeString(
      application?._id
    );


  const fullName =
    safeString(
      application?.fullName
    ) ||
    safeString(
      application?.name
    ) ||
    "Not Available";


  const status =
    safeString(
      application?.status
    ) ||
    safeString(
      application?.applicationStatus
    ) ||
    "Pending";


  const email =
    safeString(
      application?.email
    );


  const mobile =
    safeString(
      application?.mobile
    ) ||
    safeString(
      application?.phone
    );


  const address =
    safeString(
      application?.address
    );


  const district =
    safeString(
      application?.district
    );


  const state =
    safeString(
      application?.state
    );


  const createdAt =
    application?.createdAt;


  const updatedAt =
    application?.updatedAt;


  return (

    <main className="min-h-screen bg-slate-50 p-4 md:p-8">


      <section className="mx-auto max-w-7xl">


        {/* ================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">


          <div className="flex items-center gap-4">


            <Link
              href="/admin/divyang"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >

              <ArrowLeft className="h-5 w-5" />

            </Link>


            <div>

              <p className="text-xs font-black uppercase tracking-wider text-slate-400">

                Divyang Application

              </p>

              <h1 className="mt-1 text-xl font-black text-slate-900 md:text-2xl">

                {fullName}

              </h1>

              <p className="mt-1 text-xs font-bold text-slate-500">

                Application ID:{" "}

                {applicationId ||
                  "Not Available"}

              </p>

            </div>

          </div>


          <div
            className={[
              "inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase",
              getStatusClasses(
                status
              ),
            ].join(" ")}
          >

            <CheckCircle2 className="h-4 w-4" />

            {status}

          </div>

        </div>


        {/* ================================================
            MAIN GRID
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">


          {/* ==============================================
              LEFT SIDE
          =============================================== */}

          <div className="space-y-6">


            {/* ============================================
                PERSONAL DETAILS
            ============================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#075b9c]">

                  <User className="h-5 w-5" />

                </div>

                <div>

                  <h2 className="font-black text-slate-900">

                    Applicant Details

                  </h2>

                  <p className="text-xs text-slate-400">

                    Personal information

                  </p>

                </div>

              </div>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">


                <InfoItem
                  label="Full Name"
                  value={fullName}
                />


                <InfoItem
                  label="Father / Guardian Name"
                  value={
                    safeString(
                      application?.fatherName
                    ) ||
                    safeString(
                      application?.guardianName
                    )
                  }
                />


                <InfoItem
                  label="Date of Birth"
                  value={
                    safeString(
                      application?.dateOfBirth
                    )
                  }
                />


                <InfoItem
                  label="Gender"
                  value={
                    safeString(
                      application?.gender
                    )
                  }
                />


              </div>

            </div>


            {/* ============================================
                CONTACT DETAILS
            ============================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                  <Phone className="h-5 w-5" />

                </div>

                <div>

                  <h2 className="font-black text-slate-900">

                    Contact Details

                  </h2>

                  <p className="text-xs text-slate-400">

                    Communication information

                  </p>

                </div>

              </div>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">


                <InfoItem
                  icon={
                    <Mail className="h-4 w-4" />
                  }
                  label="Email Address"
                  value={email}
                />


                <InfoItem
                  icon={
                    <Phone className="h-4 w-4" />
                  }
                  label="Mobile Number"
                  value={mobile}
                />


                <InfoItem
                  icon={
                    <MapPin className="h-4 w-4" />
                  }
                  label="Address"
                  value={address}
                />


                <InfoItem
                  label="District"
                  value={district}
                />


                <InfoItem
                  label="State"
                  value={state}
                />


                <InfoItem
                  label="Pincode"
                  value={
                    safeString(
                      application?.pincode
                    )
                  }
                />


              </div>

            </div>


            {/* ============================================
                APPLICATION DETAILS
            ============================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">

                  <FileText className="h-5 w-5" />

                </div>

                <div>

                  <h2 className="font-black text-slate-900">

                    Application Information

                  </h2>

                  <p className="text-xs text-slate-400">

                    Registration details

                  </p>

                </div>

              </div>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">


                <InfoItem
                  label="Application ID"
                  value={applicationId}
                />


                <InfoItem
                  label="Application Status"
                  value={status}
                />


                <InfoItem
                  label="Application Date"
                  value={
                    formatDate(
                      createdAt
                    )
                  }
                />


                <InfoItem
                  label="Last Updated"
                  value={
                    formatDate(
                      updatedAt
                    )
                  }
                />


                <InfoItem
                  label="Disability Type"
                  value={
                    safeString(
                      application?.disabilityType
                    )
                  }
                />


                <InfoItem
                  label="Disability Percentage"
                  value={
                    safeString(
                      application?.disabilityPercentage
                    )
                  }
                />


              </div>

            </div>


          </div>


          {/* ==============================================
              RIGHT SIDE
          =============================================== */}

          <div className="space-y-6">


            {/* ============================================
                SUMMARY
            ============================================= */}

            <div className="rounded-3xl bg-gradient-to-br from-[#06234e] via-[#075b9c] to-[#07929f] p-6 text-white shadow-lg">

              <p className="text-xs font-black uppercase tracking-wider text-cyan-100">

                Application Summary

              </p>


              <h3 className="mt-3 text-2xl font-black">

                {fullName}

              </h3>


              <p className="mt-2 text-sm text-cyan-100">

                {applicationId}

              </p>


              <div className="mt-6 border-t border-white/20 pt-5">

                <div className="flex items-center justify-between text-sm">

                  <span className="text-cyan-100">

                    Current Status

                  </span>

                  <span className="font-black">

                    {status}

                  </span>

                </div>

              </div>

            </div>


            {/* ============================================
                HISTORY
            ============================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#D6A63A]">

                  <Clock3 className="h-5 w-5" />

                </div>

                <div>

                  <h2 className="font-black text-slate-900">

                    Activity History

                  </h2>

                  <p className="text-xs text-slate-400">

                    Application updates

                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-5">


                {history.length ===
                0 ? (

                  <p className="rounded-2xl bg-slate-50 p-4 text-center text-xs font-medium text-slate-400">

                    No activity history available.

                  </p>

                ) : (

                  history.map(
                    (
                      item,
                      index
                    ) => {

                      const itemStatus =
                        safeString(
                          item.status
                        );


                      const itemRemarks =
                        safeString(
                          item.remarks
                        ) ||
                        safeString(
                          item.comment
                        );


                      const itemUpdatedBy =
                        safeString(
                          item.updatedBy
                        );


                      const itemDate =
                        item.createdAt ??
                        item.updatedAt;


                      return (

                        <div
                          key={
                            safeString(
                              item._id
                            ) ||
                            `history-${index}`
                          }
                          className="relative border-l-2 border-slate-100 pl-5"
                        >

                          <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#D6A63A]" />


                          <p className="text-sm font-black text-slate-800">

                            {itemStatus ||
                              "Application Updated"}

                          </p>


                          {itemRemarks ? (

                            <p className="mt-1 text-xs leading-5 text-slate-500">

                              {itemRemarks}

                            </p>

                          ) : null}


                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">


                            <span className="text-[10px] font-bold text-slate-400">

                              {formatDate(
                                itemDate
                              )}

                            </span>


                            {itemUpdatedBy ? (

                              <span className="text-[10px] font-bold text-[#D6A63A]">

                                {itemUpdatedBy}

                              </span>

                            ) : null}


                          </div>

                        </div>

                      );

                    }
                  )

                )}


              </div>

            </div>


          </div>


        </div>


        {/* ================================================
            FOOTER
        ================================================= */}

        <div className="mt-8 text-center">

          <p className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">

            <Calendar className="h-4 w-4" />

            Anand Jivan Foundation Trust – Divyang Programme

          </p>

        </div>


      </section>

    </main>

  );

}


/* =========================================================
   INFO ITEM COMPONENT
========================================================= */

function InfoItem(
  {
    icon,
    label,
    value,
  }: {
    icon?: React.ReactNode;
    label: string;
    value: unknown;
  }
) {

  const displayValue =
    safeString(value) ||
    "Not Available";


  return (

    <div className="rounded-2xl bg-slate-50 p-4">


      <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">

        {icon}

        {label}

      </p>


      <p className="mt-2 break-words text-sm font-bold text-slate-800">

        {displayValue}

      </p>


    </div>

  );

}