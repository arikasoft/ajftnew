"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

type Application = {
  _id?: string;
  applicationId: string;

  student?: {
    name?: string;
    email?: string;
    phone?: string;
  };

  education?: {
    institution?: string;
    course?: string;
    qualification?: string;
  };

  internship?: {
    area?: string;
    duration?: string;
    startDate?: string;
    endDate?: string;
  };

  status: string;

  physicalReceived?: boolean;
  certificateEligible?: boolean;
  certificatePaymentStatus?: string;

  createdAt?: string;
};

const STATUS_LABELS: Record<
  string,
  string
> = {
  SUBMITTED: "Submitted",
  PHYSICAL_RECEIVED:
    "Physical Received",
  VERIFIED: "Verified",
  APPROVED: "Approved",
  ACTIVE: "Internship Active",
  COMPLETED:
    "Internship Completed",
  CERTIFICATE_ELIGIBLE:
    "Certificate Eligible",
  PAYMENT_PENDING:
    "Payment Pending",
  CERTIFICATE_GENERATED:
    "Certificate Generated",
  REJECTED: "Rejected",
};

const STATUS_CLASS: Record<
  string,
  string
> = {
  SUBMITTED:
    "bg-blue-50 text-blue-700 border-blue-200",

  PHYSICAL_RECEIVED:
    "bg-amber-50 text-amber-700 border-amber-200",

  VERIFIED:
    "bg-indigo-50 text-indigo-700 border-indigo-200",

  APPROVED:
    "bg-purple-50 text-purple-700 border-purple-200",

  ACTIVE:
    "bg-orange-50 text-orange-700 border-orange-200",

  COMPLETED:
    "bg-slate-50 text-slate-700 border-slate-200",

  CERTIFICATE_ELIGIBLE:
    "bg-yellow-50 text-yellow-700 border-yellow-200",

  PAYMENT_PENDING:
    "bg-red-50 text-red-700 border-red-200",

  CERTIFICATE_GENERATED:
    "bg-green-50 text-green-700 border-green-200",

  REJECTED:
    "bg-gray-100 text-gray-700 border-gray-300",
};

export default function AdminInternshipPage() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState<string | null>(null);

  const [selected, setSelected] =
    useState<Application | null>(null);

  const [error, setError] =
    useState("");

  const loadApplications =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/admin/internship",
          {
            cache: "no-store",
          }
        );

        const contentType =
          response.headers.get(
            "content-type"
          ) || "";

        if (
          !contentType.includes(
            "application/json"
          )
        ) {
          throw new Error(
            "Invalid response from server."
          );
        }

        const data =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load applications."
          );
        }

        setApplications(
          data.applications || []
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load applications."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  async function updateStatus(
    applicationId: string,
    status: string
  ) {
    try {
      setUpdating(applicationId);
      setError("");

      const response = await fetch(
        "/api/admin/internship",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            applicationId,
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Status update failed."
        );
      }

      setSelected(null);

      await loadApplications();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Status update failed."
      );
    } finally {
      setUpdating(null);
    }
  }

  const filtered =
    applications.filter((item) => {
      const text =
        `${item.applicationId} ${
          item.student?.name || ""
        } ${
          item.student?.email || ""
        } ${
          item.student?.phone || ""
        } ${
          item.internship?.area || ""
        }`.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  const count = (status: string) =>
    applications.filter(
      (item) =>
        item.status === status
    ).length;

  return (
    <main className="min-h-screen bg-[#f6f7f9]">
      {/* HEADER */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                AJFT ADMINISTRATION
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                Internship Applications
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage student applications,
                verification and internship workflow.
              </p>
            </div>

            <button
              onClick={loadApplications}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUMMARY */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Summary
            title="Total"
            value={applications.length}
          />

          <Summary
            title="Submitted"
            value={count("SUBMITTED")}
          />

          <Summary
            title="Physical Received"
            value={count(
              "PHYSICAL_RECEIVED"
            )}
          />

          <Summary
            title="Approved"
            value={count("APPROVED")}
          />

          <Summary
            title="Completed"
            value={count("COMPLETED")}
          />
        </div>

        {/* SEARCH */}

        <div className="mt-6 rounded-xl border bg-white p-4">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Application ID, student name, email, mobile or programme..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* TABLE */}

        <div className="mt-6 overflow-hidden rounded-xl border bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-900 text-left text-xs uppercase tracking-wide text-white">
                <tr>
                  <th className="px-5 py-4">
                    Application
                  </th>

                  <th className="px-5 py-4">
                    Student
                  </th>

                  <th className="px-5 py-4">
                    Programme
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      Loading applications...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filtered.map(
                    (application) => (
                      <tr
                        key={
                          application.applicationId
                        }
                        className="hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <div className="font-mono text-sm font-bold text-gray-900">
                            {
                              application.applicationId
                            }
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {application.createdAt
                              ? new Date(
                                  application.createdAt
                                ).toLocaleDateString(
                                  "en-IN"
                                )
                              : ""}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="font-semibold text-gray-900">
                            {
                              application.student
                                ?.name
                            }
                          </div>

                          <div className="text-xs text-gray-500">
                            {
                              application.student
                                ?.email
                            }
                          </div>

                          <div className="text-xs text-gray-500">
                            {
                              application.student
                                ?.phone
                            }
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="text-sm font-medium text-gray-800">
                            {
                              application
                                .internship
                                ?.area
                            }
                          </div>

                          <div className="text-xs text-gray-500">
                            {
                              application
                                .internship
                                ?.duration
                            }
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                              STATUS_CLASS[
                                application
                                  .status
                              ] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {STATUS_LABELS[
                              application
                                .status
                            ] ||
                              application.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() =>
                              setSelected(
                                application
                              )
                            }
                            className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="border-b px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                    APPLICATION
                  </p>

                  <h2 className="mt-1 font-mono text-xl font-bold">
                    {
                      selected.applicationId
                    }
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setSelected(null)
                  }
                  className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* DETAILS */}

            <div className="space-y-5 p-6">
              <Detail
                label="Student"
                value={
                  selected.student?.name ||
                  ""
                }
              />

              <Detail
                label="Email"
                value={
                  selected.student?.email ||
                  ""
                }
              />

              <Detail
                label="Mobile"
                value={
                  selected.student?.phone ||
                  ""
                }
              />

              <Detail
                label="Institution"
                value={
                  selected.education
                    ?.institution ||
                  ""
                }
              />

              <Detail
                label="Qualification"
                value={
                  selected.education
                    ?.qualification ||
                  ""
                }
              />

              <Detail
                label="Internship Programme"
                value={
                  selected.internship
                    ?.area ||
                  ""
                }
              />

              <Detail
                label="Duration"
                value={
                  selected.internship
                    ?.duration ||
                  ""
                }
              />

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Current Status
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                    STATUS_CLASS[
                      selected.status
                    ] || ""
                  }`}
                >
                  {STATUS_LABELS[
                    selected.status
                  ] ||
                    selected.status}
                </span>
              </div>

              {/* WORKFLOW */}

              <div className="border-t pt-5">
                <h3 className="mb-4 text-sm font-bold text-gray-900">
                  Update Application
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ActionButton
                    label="Physical Received"
                    status="PHYSICAL_RECEIVED"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Verify Documents"
                    status="VERIFIED"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Approve Application"
                    status="APPROVED"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Start Internship"
                    status="ACTIVE"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Mark Completed"
                    status="COMPLETED"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Certificate Eligible"
                    status="CERTIFICATE_ELIGIBLE"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Payment Pending"
                    status="PAYMENT_PENDING"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />

                  <ActionButton
                    label="Generate Certificate"
                    status="CERTIFICATE_GENERATED"
                    current={
                      selected.status
                    }
                    applicationId={
                      selected.applicationId
                    }
                    updating={updating}
                    onUpdate={
                      updateStatus
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   SUMMARY
========================================================= */

function Summary({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
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
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  label,
  status,
  current,
  applicationId,
  updating,
  onUpdate,
}: {
  label: string;
  status: string;
  current: string;
  applicationId: string;
  updating: string | null;
  onUpdate: (
    applicationId: string,
    status: string
  ) => void;
}) {
  const isCurrent =
    current === status;

  return (
    <button
      disabled={
        isCurrent ||
        updating === applicationId
      }
      onClick={() =>
        onUpdate(
          applicationId,
          status
        )
      }
      className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
        isCurrent
          ? "cursor-not-allowed bg-gray-100 text-gray-400"
          : "border-gray-300 bg-white text-gray-800 hover:border-orange-500 hover:bg-orange-50"
      }`}
    >
      {updating === applicationId
        ? "Updating..."
        : isCurrent
        ? `✓ ${label}`
        : label}
    </button>
  );
}