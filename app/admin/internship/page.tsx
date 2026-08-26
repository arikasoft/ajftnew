"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  GraduationCap,
  LogOut,
  Mail,
  Menu,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   STATUS
========================================================= */

const STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Submitted",
  PHYSICAL_RECEIVED: "Physical Received",
  VERIFIED: "Verified",
  APPROVED: "Approved",
  ACTIVE: "Internship Active",
  COMPLETED: "Internship Completed",
  CERTIFICATE_ELIGIBLE: "Certificate Eligible",
  PAYMENT_PENDING: "Payment Pending",
  CERTIFICATE_GENERATED: "Certificate Generated",
  REJECTED: "Rejected",
};

const STATUS_CLASS: Record<string, string> = {
  SUBMITTED:
    "border-sky-200 bg-sky-50 text-sky-700",

  PHYSICAL_RECEIVED:
    "border-amber-200 bg-amber-50 text-amber-700",

  VERIFIED:
    "border-indigo-200 bg-indigo-50 text-indigo-700",

  APPROVED:
    "border-violet-200 bg-violet-50 text-violet-700",

  ACTIVE:
    "border-teal-200 bg-teal-50 text-teal-700",

  COMPLETED:
    "border-slate-200 bg-slate-50 text-slate-700",

  CERTIFICATE_ELIGIBLE:
    "border-yellow-200 bg-yellow-50 text-yellow-700",

  PAYMENT_PENDING:
    "border-orange-200 bg-orange-50 text-orange-700",

  CERTIFICATE_GENERATED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  REJECTED:
    "border-red-200 bg-red-50 text-red-700",
};

/* =========================================================
   WORKFLOW COLORS
========================================================= */

const ACTION_CLASS: Record<string, string> = {
  PHYSICAL_RECEIVED:
    "border-amber-200 bg-amber-50 text-amber-800 hover:border-amber-400 hover:bg-amber-100",

  VERIFIED:
    "border-indigo-200 bg-indigo-50 text-indigo-800 hover:border-indigo-400 hover:bg-indigo-100",

  APPROVED:
    "border-violet-200 bg-violet-50 text-violet-800 hover:border-violet-400 hover:bg-violet-100",

  ACTIVE:
    "border-teal-200 bg-teal-50 text-teal-800 hover:border-teal-400 hover:bg-teal-100",

  COMPLETED:
    "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400 hover:bg-slate-100",

  CERTIFICATE_ELIGIBLE:
    "border-yellow-200 bg-yellow-50 text-yellow-800 hover:border-yellow-400 hover:bg-yellow-100",

  PAYMENT_PENDING:
    "border-orange-200 bg-orange-50 text-orange-800 hover:border-orange-400 hover:bg-orange-100",

  CERTIFICATE_GENERATED:
    "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100",
};

/* =========================================================
   MAIN
========================================================= */

export default function AdminInternshipPage() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState<string | null>(null);

  const [selected, setSelected] =
    useState<Application | null>(null);

  const [error, setError] = useState("");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  /* =======================================================
     LOAD
  ======================================================= */

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

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

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

  /* =======================================================
     LOGOUT
  ======================================================= */

  async function handleLogout() {
    try {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );
    } catch {
      // Redirect even if request fails.
    } finally {
      window.location.href =
        "/admin/login";
    }
  }

  /* =======================================================
     FILTER
  ======================================================= */

  const filtered = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return applications;
    }

    return applications.filter(
      (item) => {
        const text =
          `${item.applicationId}
          ${item.student?.name || ""}
          ${item.student?.email || ""}
          ${item.student?.phone || ""}
          ${item.internship?.area || ""}
          ${item.education?.institution || ""}
          ${item.education?.qualification || ""}`
            .toLowerCase();

        return text.includes(query);
      }
    );
  }, [applications, search]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const count = (status: string) =>
    applications.filter(
      (item) =>
        item.status === status
    ).length;

  const pendingCount =
    count("SUBMITTED") +
    count("PHYSICAL_RECEIVED");

  const activeCount =
    count("ACTIVE");

  const completedCount =
    count("COMPLETED");

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F4F8FA] text-[#102A43]">

      {/* ===================================================
          TOP ADMIN BAR
      =================================================== */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-white/10
          bg-[#0B2535]
          text-white
          shadow-[0_10px_35px_rgba(16,42,67,0.18)]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[68px]
            max-w-[1500px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-[#D3A640]
                to-[#F2C94C]
                text-[#0B2535]
                shadow-lg
              "
            >
              <ShieldCheck size={20} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.24em]
                  text-[#F2C94C]
                "
              >
                AJFT
              </p>

              <p className="text-sm font-bold text-white">
                Administration
              </p>
            </div>

          </div>

          {/* DESKTOP ACTIONS */}

          <div className="hidden items-center gap-2 md:flex">

            <div
              className="
                mr-2
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-2
                text-[10px]
                font-semibold
                text-white/70
              "
            >
              <Activity
                size={13}
                className="text-[#F2C94C]"
              />

              Admin Panel
            </div>

            <button
              type="button"
              onClick={loadApplications}
              disabled={loading}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-white/15
                bg-white/5
                px-3
                py-2
                text-xs
                font-bold
                text-white
                transition
                hover:bg-white/10
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

              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-gradient-to-r
                from-[#B42318]
                to-[#D92D20]
                px-3.5
                py-2
                text-xs
                font-black
                text-white
                shadow-lg
                shadow-red-900/20
                transition
                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >
              <LogOut size={14} />

              Logout
            </button>

          </div>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-white/10
              md:hidden
            "
          >
            {mobileMenu ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

        </div>

        {mobileMenu && (
          <div
            className="
              border-t
              border-white/10
              bg-[#0B2535]
              px-4
              py-3
              md:hidden
            "
          >
            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={loadApplications}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-3
                  text-xs
                  font-bold
                "
              >
                <RefreshCw size={14} />
                Refresh
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-red-600
                  px-3
                  py-3
                  text-xs
                  font-bold
                "
              >
                <LogOut size={14} />
                Logout
              </button>

            </div>
          </div>
        )}
      </header>

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <div
        className="
          mx-auto
          max-w-[1500px]
          px-4
          py-6
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[1.6rem]
            bg-gradient-to-br
            from-[#102A43]
            via-[#145B70]
            to-[#176B87]
            p-6
            text-white
            shadow-[0_25px_60px_rgba(16,42,67,0.18)]
            sm:p-8
          "
        >

          <div
            className="
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-[#F2C94C]/10
              blur-2xl
            "
          />

          <div
            className="
              absolute
              -bottom-24
              left-1/3
              h-56
              w-56
              rounded-full
              bg-cyan-300/10
              blur-3xl
            "
          />

          <div className="relative">

            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/15
                    bg-white/10
                    px-3
                    py-1.5
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-[#F2C94C]
                  "
                >
                  <GraduationCap
                    size={12}
                  />

                  Internship Management
                </div>

                <h1
                  className="
                    mt-4
                    text-2xl
                    font-black
                    tracking-tight
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  Internship Applications
                </h1>

                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-6
                    text-white/65
                  "
                >
                  Manage applications,
                  verify students, control
                  internship workflow and
                  certificate eligibility
                  from one secure dashboard.
                </p>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/10
                  px-4
                  py-3
                  backdrop-blur
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F2C94C]/15
                    text-[#F2C94C]
                  "
                >
                  <Users size={19} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/40">
                    Total Applications
                  </p>

                  <p className="text-xl font-black">
                    {applications.length}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-4
              text-sm
              text-red-700
              shadow-sm
            "
          >
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-bold">
                Something went wrong
              </p>

              <p className="mt-0.5 text-xs text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="ml-auto"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section
          className="
            mt-6
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
          "
        >

          <SummaryCard
            title="Total"
            value={applications.length}
            icon={<Users size={18} />}
            accent="navy"
          />

          <SummaryCard
            title="Submitted"
            value={count("SUBMITTED")}
            icon={<FileCheck2 size={18} />}
            accent="blue"
          />

          <SummaryCard
            title="Pending"
            value={pendingCount}
            icon={<Clock3 size={18} />}
            accent="gold"
          />

          <SummaryCard
            title="Approved"
            value={count("APPROVED")}
            icon={<CheckCircle2 size={18} />}
            accent="purple"
          />

          <SummaryCard
            title="Active"
            value={activeCount}
            icon={<Activity size={18} />}
            accent="teal"
          />

          <SummaryCard
            title="Completed"
            value={completedCount}
            icon={<Check size={18} />}
            accent="green"
          />

        </section>

        {/* =================================================
            SEARCH / TOOLBAR
        ================================================= */}

        <section
          className="
            mt-6
            rounded-[1.35rem]
            border
            border-[#DCE6EB]
            bg-white
            p-4
            shadow-[0_10px_35px_rgba(16,42,67,0.06)]
            sm:p-5
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div className="relative w-full lg:max-w-2xl">

              <Search
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#8A9AA6]
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search application ID, student, email, mobile, institution or programme..."
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#D9E2E7]
                  bg-[#F8FAFB]
                  pl-11
                  pr-4
                  text-sm
                  text-[#243B53]
                  outline-none
                  transition
                  placeholder:text-[#9AA8B2]
                  focus:border-[#176B87]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#176B87]/10
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E8EEF1]
                    text-[#607585]
                    hover:bg-[#DCE5E9]
                  "
                >
                  <X size={13} />
                </button>
              )}

            </div>

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#8A9AA6]">
                  Results
                </p>

                <p className="mt-1 text-sm font-bold text-[#243B53]">
                  {filtered.length} application
                  {filtered.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={loadApplications}
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#102A43]
                  px-4
                  text-xs
                  font-black
                  text-white
                  transition
                  hover:bg-[#176B87]
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

                Refresh
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            APPLICATIONS TABLE
        ================================================= */}

        <section
          className="
            mt-6
            overflow-hidden
            rounded-[1.35rem]
            border
            border-[#DCE6EB]
            bg-white
            shadow-[0_15px_45px_rgba(16,42,67,0.07)]
          "
        >

          {/* TABLE HEADER */}

          <div
            className="
              flex
              flex-col
              gap-2
              border-b
              border-[#E7EEF2]
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>
              <h2 className="text-sm font-black text-[#102A43]">
                Application Records
              </h2>

              <p className="mt-0.5 text-[10px] text-[#82919C]">
                Review and manage internship
                applications.
              </p>
            </div>

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                bg-[#EEF6F8]
                px-3
                py-1.5
                text-[9px]
                font-bold
                text-[#176B87]
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2EBD85]" />

              Live Records
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-[1000px] w-full">

              <thead
                className="
                  bg-[#F7FAFB]
                  text-left
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-[#718394]
                "
              >
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

              <tbody className="divide-y divide-[#EDF2F4]">

                {loading ? (
                  <LoadingRows />
                ) : filtered.length === 0 ? (
                  <EmptyState />
                ) : (
                  filtered.map(
                    (application) => (
                      <ApplicationRow
                        key={
                          application.applicationId
                        }
                        application={
                          application
                        }
                        onManage={() =>
                          setSelected(
                            application
                          )
                        }
                      />
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>

      {/* ===================================================
          MODAL
      =================================================== */}

      {selected && (
        <ApplicationModal
          selected={selected}
          updating={updating}
          onClose={() =>
            setSelected(null)
          }
          onUpdate={updateStatus}
        />
      )}

    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  accent:
    | "navy"
    | "blue"
    | "gold"
    | "purple"
    | "teal"
    | "green";
}) {
  const styles = {
    navy: {
      icon: "bg-[#102A43] text-white",
      number: "text-[#102A43]",
    },

    blue: {
      icon: "bg-sky-100 text-sky-700",
      number: "text-sky-800",
    },

    gold: {
      icon: "bg-amber-100 text-amber-700",
      number: "text-amber-800",
    },

    purple: {
      icon: "bg-violet-100 text-violet-700",
      number: "text-violet-800",
    },

    teal: {
      icon: "bg-teal-100 text-teal-700",
      number: "text-teal-800",
    },

    green: {
      icon: "bg-emerald-100 text-emerald-700",
      number: "text-emerald-800",
    },
  };

  return (
    <div
      className="
        group
        rounded-[1.2rem]
        border
        border-[#DCE6EB]
        bg-white
        p-4
        shadow-[0_8px_25px_rgba(16,42,67,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_15px_35px_rgba(16,42,67,0.10)]
      "
    >

      <div className="flex items-center justify-between">

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            ${styles[accent].icon}
          `}
        >
          {icon}
        </div>

        <ChevronRight
          size={15}
          className="
            text-[#CBD5DB]
            transition
            group-hover:translate-x-0.5
          "
        />

      </div>

      <p
        className="
          mt-4
          text-[9px]
          font-black
          uppercase
          tracking-[0.16em]
          text-[#82919C]
        "
      >
        {title}
      </p>

      <p
        className={`
          mt-1
          text-2xl
          font-black
          ${styles[accent].number}
        `}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   APPLICATION ROW
========================================================= */

function ApplicationRow({
  application,
  onManage,
}: {
  application: Application;
  onManage: () => void;
}) {
  return (
    <tr
      className="
        group
        transition
        hover:bg-[#F8FBFC]
      "
    >

      {/* APPLICATION */}

      <td className="px-5 py-5">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#EEF6F8]
              text-[#176B87]
            "
          >
            <FileCheck2
              size={17}
            />
          </div>

          <div>

            <p
              className="
                font-mono
                text-xs
                font-black
                text-[#102A43]
              "
            >
              {application.applicationId}
            </p>

            <p className="mt-1 text-[10px] text-[#8997A2]">
              {application.createdAt
                ? new Date(
                    application.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "—"}
            </p>

          </div>

        </div>

      </td>

      {/* STUDENT */}

      <td className="px-5 py-5">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#102A43]
              text-white
            "
          >
            <UserRound
              size={15}
            />
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-bold text-[#243B53]">
              {application.student
                ?.name || "—"}
            </p>

            <p className="mt-0.5 max-w-[230px] truncate text-[10px] text-[#8997A2]">
              {application.student
                ?.email || "—"}
            </p>

            <p className="mt-0.5 text-[10px] text-[#A0ACB5]">
              {application.student
                ?.phone || "—"}
            </p>

          </div>

        </div>

      </td>

      {/* PROGRAMME */}

      <td className="px-5 py-5">

        <p className="text-xs font-bold text-[#243B53]">
          {application.internship
            ?.area || "—"}
        </p>

        <p className="mt-1 text-[10px] text-[#8997A2]">
          {application.internship
            ?.duration || "—"}
        </p>

      </td>

      {/* STATUS */}

      <td className="px-5 py-5">

        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            px-3
            py-1.5
            text-[9px]
            font-black
            ${STATUS_CLASS[
              application.status
            ] ||
            "border-gray-200 bg-gray-50 text-gray-700"}
          `}
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-current
            "
          />

          {STATUS_LABELS[
            application.status
          ] ||
            application.status}

        </span>

      </td>

      {/* ACTION */}

      <td className="px-5 py-5 text-right">

        <button
          type="button"
          onClick={onManage}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            bg-[#102A43]
            px-4
            py-2.5
            text-[10px]
            font-black
            text-white
            shadow-sm
            transition-all
            hover:-translate-y-0.5
            hover:bg-[#176B87]
            hover:shadow-md
          "
        >
          Manage

          <ChevronRight
            size={13}
          />
        </button>

      </td>

    </tr>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingRows() {
  return (
    <>
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <tr key={index}>

          {Array.from({
            length: 5,
          }).map((__, cell) => (
            <td
              key={cell}
              className="px-5 py-5"
            >
              <div className="animate-pulse">

                <div className="h-3 w-28 rounded bg-[#E8EEF1]" />

                <div className="mt-2 h-2 w-20 rounded bg-[#EEF2F4]" />

              </div>
            </td>
          ))}

        </tr>
      ))}
    </>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState() {
  return (
    <tr>

      <td
        colSpan={5}
        className="px-5 py-20 text-center"
      >

        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#EEF6F8]
            text-[#176B87]
          "
        >
          <Search size={22} />
        </div>

        <p className="mt-4 text-sm font-black text-[#243B53]">
          No applications found
        </p>

        <p className="mt-1 text-xs text-[#8997A2]">
          Try changing your search
          keywords.
        </p>

      </td>

    </tr>
  );
}

/* =========================================================
   APPLICATION MODAL
========================================================= */

function ApplicationModal({
  selected,
  updating,
  onClose,
  onUpdate,
}: {
  selected: Application;
  updating: string | null;
  onClose: () => void;
  onUpdate: (
    applicationId: string,
    status: string
  ) => void;
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#081C29]/70
        p-3
        backdrop-blur-md
        sm:p-5
      "
    >

      <div
        className="
          flex
          max-h-[94vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-[1.5rem]
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.30)]
        "
      >

        {/* MODAL HEADER */}

        <div
          className="
            shrink-0
            bg-gradient-to-r
            from-[#102A43]
            via-[#145B70]
            to-[#176B87]
            px-5
            py-5
            text-white
            sm:px-7
          "
        >

          <div className="flex items-start justify-between gap-4">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-3
                  py-1.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[#F2C94C]
                "
              >
                <FileCheck2
                  size={11}
                />

                Application
              </div>

              <h2
                className="
                  mt-3
                  font-mono
                  text-lg
                  font-black
                  sm:text-xl
                "
              >
                {selected.applicationId}
              </h2>

              <p className="mt-1 text-[10px] text-white/50">
                Review application details
                and update workflow.
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                transition
                hover:bg-white/20
              "
            >
              <X size={17} />
            </button>

          </div>

        </div>

        {/* MODAL CONTENT */}

        <div className="overflow-y-auto">

          <div className="p-5 sm:p-7">

            {/* STUDENT CARD */}

            <div
              className="
                rounded-2xl
                border
                border-[#DCE6EB]
                bg-[#F7FAFB]
                p-4
                sm:p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#102A43]
                    text-white
                  "
                >
                  <UserRound
                    size={19}
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-black text-[#102A43]">
                    {selected.student
                      ?.name || "—"}
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-[#82919C]">
                    {selected.student
                      ?.email || "—"}
                  </p>

                </div>

                <span
                  className={`
                    ml-auto
                    hidden
                    shrink-0
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-[9px]
                    font-black
                    sm:inline-flex
                    ${STATUS_CLASS[
                      selected.status
                    ] ||
                    "border-gray-200 bg-gray-50 text-gray-700"}
                  `}
                >
                  {STATUS_LABELS[
                    selected.status
                  ] ||
                    selected.status}
                </span>

              </div>

            </div>

            {/* DETAILS */}

            <div className="mt-6">

              <SectionTitle
                icon={
                  <UserRound size={14} />
                }
                title="Student Information"
              />

              <div
                className="
                  mt-3
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >

                <DetailCard
                  icon={
                    <UserRound
                      size={14}
                    />
                  }
                  label="Student"
                  value={
                    selected.student
                      ?.name
                  }
                />

                <DetailCard
                  icon={
                    <Mail size={14} />
                  }
                  label="Email"
                  value={
                    selected.student
                      ?.email
                  }
                />

                <DetailCard
                  icon={
                    <Phone size={14} />
                  }
                  label="Mobile"
                  value={
                    selected.student
                      ?.phone
                  }
                />

                <DetailCard
                  icon={
                    <GraduationCap
                      size={14}
                    />
                  }
                  label="Institution"
                  value={
                    selected.education
                      ?.institution
                  }
                />

                <DetailCard
                  icon={
                    <FileCheck2
                      size={14}
                    />
                  }
                  label="Qualification"
                  value={
                    selected.education
                      ?.qualification
                  }
                />

                <DetailCard
                  icon={
                    <GraduationCap
                      size={14}
                    />
                  }
                  label="Course"
                  value={
                    selected.education
                      ?.course
                  }
                />

              </div>

            </div>

            {/* INTERNSHIP */}

            <div className="mt-7">

              <SectionTitle
                icon={
                  <Activity size={14} />
                }
                title="Internship Details"
              />

              <div
                className="
                  mt-3
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >

                <DetailCard
                  icon={
                    <Activity size={14} />
                  }
                  label="Programme"
                  value={
                    selected.internship
                      ?.area
                  }
                />

                <DetailCard
                  icon={
                    <Clock3 size={14} />
                  }
                  label="Duration"
                  value={
                    selected.internship
                      ?.duration
                  }
                />

                <DetailCard
                  icon={
                    <Clock3 size={14} />
                  }
                  label="Start Date"
                  value={
                    selected.internship
                      ?.startDate
                  }
                />

                <DetailCard
                  icon={
                    <Clock3 size={14} />
                  }
                  label="End Date"
                  value={
                    selected.internship
                      ?.endDate
                  }
                />

              </div>

            </div>

            {/* STATUS */}

            <div className="mt-7">

              <SectionTitle
                icon={
                  <ShieldCheck
                    size={14}
                  />
                }
                title="Current Status"
              />

              <div className="mt-3">

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-black
                    ${
                      STATUS_CLASS[
                        selected.status
                      ] ||
                      "border-gray-200 bg-gray-50 text-gray-700"
                    }
                  `}
                >

                  <span className="h-2 w-2 rounded-full bg-current" />

                  {STATUS_LABELS[
                    selected.status
                  ] ||
                    selected.status}

                </span>

              </div>

            </div>

            {/* WORKFLOW */}

            <div className="mt-7">

              <SectionTitle
                icon={
                  <Activity size={14} />
                }
                title="Application Workflow"
              />

              <div
                className="
                  mt-3
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >

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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
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
                  onUpdate={onUpdate}
                />

              </div>

            </div>

          </div>

        </div>

        {/* MODAL FOOTER */}

        <div
          className="
            shrink-0
            border-t
            border-[#E7EEF2]
            bg-[#F9FBFC]
            px-5
            py-3
            text-right
            sm:px-7
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#D7E1E6]
              bg-white
              px-4
              py-2.5
              text-xs
              font-black
              text-[#526575]
              transition
              hover:bg-[#F1F5F7]
            "
          >
            <ArrowLeft size={14} />

            Close
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <div
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-lg
          bg-[#EEF6F8]
          text-[#176B87]
        "
      >
        {icon}
      </div>

      <h3 className="text-xs font-black uppercase tracking-[0.12em] text-[#526575]">
        {title}
      </h3>

    </div>
  );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#E3EAEE]
        bg-white
        p-3.5
      "
    >

      <div className="flex items-center gap-2">

        <span className="text-[#176B87]">
          {icon}
        </span>

        <p
          className="
            text-[8px]
            font-black
            uppercase
            tracking-[0.12em]
            text-[#8997A2]
          "
        >
          {label}
        </p>

      </div>

      <p
        className="
          mt-2
          break-words
          text-xs
          font-bold
          leading-5
          text-[#243B53]
        "
      >
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

  const isUpdating =
    updating === applicationId;

  return (
    <button
      type="button"
      disabled={
        isCurrent || !!updating
      }
      onClick={() =>
        onUpdate(
          applicationId,
          status
        )
      }
      className={`
        flex
        items-center
        justify-between
        gap-3
        rounded-xl
        border
        px-4
        py-3.5
        text-left
        text-xs
        font-black
        transition-all
        ${
          isCurrent
            ? "cursor-not-allowed border-[#DCE3E7] bg-[#F3F6F7] text-[#9AA6AD]"
            : `${
                ACTION_CLASS[
                  status
                ] ||
                "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              } hover:-translate-y-0.5`
        }
      `}
    >

      <span className="flex items-center gap-2">

        {isCurrent ? (
          <span
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-current/10
            "
          >
            <Check size={13} />
          </span>
        ) : (
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-current
            "
          />
        )}

        {isUpdating
          ? "Updating..."
          : isCurrent
          ? `Completed — ${label}`
          : label}

      </span>

      {!isCurrent && (
        <ChevronRight
          size={14}
          className="shrink-0 opacity-50"
        />
      )}

    </button>
  );
}