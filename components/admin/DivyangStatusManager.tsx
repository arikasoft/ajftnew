"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";

const statuses = [
  {
    value: "SUBMITTED",
    label: "Submitted",
  },
  {
    value: "UNDER_REVIEW",
    label: "Under Review",
  },
  {
    value: "DOCUMENT_VERIFICATION",
    label: "Document Verification",
  },
  {
    value: "FIELD_VERIFICATION",
    label: "Field Verification",
  },
  {
    value: "DOCUMENT_REQUIRED",
    label: "Document Required",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "ASSISTANCE_PROCESSING",
    label: "Assistance Processing",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

interface Props {
  applicationId: string;
  currentStatus: string;
}

export default function DivyangStatusManager({
  applicationId,
  currentStatus,
}: Props) {
  const [status, setStatus] =
    useState(currentStatus);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  async function updateStatus() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/divyang/${applicationId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
            message,
            updatedBy: "AJFT ADMIN",
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update status."
        );
      }

      setSuccess(
        "Status updated successfully."
      );

      setMessage("");

      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073B4C] text-white">

          <CheckCircle2 size={20} />

        </div>

        <div>

          <h2 className="font-black text-[#073B4C]">
            Manage Application
          </h2>

          <p className="text-xs text-slate-400">
            Update application progress
          </p>

        </div>

      </div>

      <div className="mt-6">

        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Application Status
        </label>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#073B4C] outline-none focus:border-[#D6A63A]"
        >
          {statuses.map((item) => (

            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>

          ))}
        </select>

      </div>

      <div className="mt-5">

        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Status Remark
        </label>

        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Write an update or remark for the applicant..."
          className="mt-2 min-h-[120px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#D6A63A]"
        />

      </div>

      {error && (

        <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600">
          {error}
        </div>

      )}

      {success && (

        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-600">
          {success}
        </div>

      )}

      <button
        type="button"
        onClick={updateStatus}
        disabled={loading}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] text-xs font-black text-white transition hover:bg-[#D6A63A] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2
            size={17}
            className="animate-spin"
          />
        ) : (
          <Save size={16} />
        )}

        {loading
          ? "Updating..."
          : "Update Application"}

      </button>

    </div>
  );
}