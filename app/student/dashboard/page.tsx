"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Award,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  PlayCircle,
  ShieldCheck,
  Target,
  Trophy,
  User,
  X,
} from "lucide-react";

type StudentData = {
  name: string;
  studentId: string;
  email: string;
  course: string;
  status: string;
};

export default function StudentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [student, setStudent] =
    useState<StudentData>({
      name: "Student",
      studentId: "AJFT-STUDENT-2026",
      email: "",
      course: "Skill Development Programme",
      status: "Active",
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await fetch(
          "/api/student/profile",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load student profile."
          );
        }

        const result =
          await response.json();

        if (result?.success && result?.data) {
          setStudent({
            name:
              result.data.name ||
              result.data.fullName ||
              "Student",

            studentId:
              result.data.studentId ||
              "AJFT-STUDENT",

            email:
              result.data.email ||
              "",

            course:
              result.data.course ||
              "Skill Development Programme",

            status:
              result.data.status ||
              "Active",
          });
        }
      } catch (error) {
        console.error(
          "Student dashboard error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(
        "/api/student/logout",
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error(error);
    }

    window.location.href =
      "/student/login";
  };

  const firstName =
    student.name
      ?.trim()
      .split(" ")[0] || "Student";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f8fc] text-slate-900">

      {/* ============================================
          MOBILE OVERLAY
      ============================================ */}

      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ============================================
          SIDEBAR
      ============================================ */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col overflow-hidden bg-gradient-to-b from-[#06214b] via-[#073f70] to-[#087f91] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
          </div>

          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        {/* LOGO */}

        <div className="relative border-b border-white/10 px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-100 backdrop-blur">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-sm font-black">
                  AJFT
                </h2>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/60">
                  Student Portal
                </p>
              </div>
            </Link>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="rounded-xl p-2 text-white/60 hover:bg-white/10 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* STUDENT */}

        <div className="relative px-5 pt-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-300 text-lg font-black text-blue-950">
                {student.name
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-black">
                  {loading
                    ? "Loading..."
                    : student.name}
                </p>

                <p className="mt-1 truncate text-[10px] font-bold text-white/50">
                  {student.studentId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="relative flex-1 space-y-2 px-4 py-6">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-sm font-black shadow-lg shadow-blue-950/10"
          >
            <LayoutDashboard className="h-5 w-5 text-cyan-200" />

            Dashboard
          </Link>

          <Link
            href="/student/course"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <BookOpen className="h-5 w-5" />

            My Course
          </Link>

          <Link
            href="/student/exam"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <ClipboardCheck className="h-5 w-5" />

            Examination
          </Link>

          <Link
            href="/student/results"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <Trophy className="h-5 w-5" />

            Results
          </Link>

          <Link
            href="/student/certificate"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <Award className="h-5 w-5" />

            Certificate
          </Link>

          <Link
            href="/student/profile"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <User className="h-5 w-5" />

            My Profile
          </Link>
        </nav>

        {/* LOGOUT */}

        <div className="relative border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/10 hover:text-red-100"
          >
            <LogOut className="h-5 w-5" />

            Logout
          </button>
        </div>
      </aside>

      {/* ============================================
          MAIN
      ============================================ */}

      <div className="min-h-screen lg:ml-[280px]">

        {/* ==========================================
            TOP HEADER
        ========================================== */}

        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
          <div className="flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  AJFT Learning Platform
                </p>

                <h1 className="mt-1 text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                  Student Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">

              <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:text-blue-600">
                <Bell className="h-5 w-5" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-black text-white">
                  {student.name
                    ?.charAt(0)
                    ?.toUpperCase() || "S"}
                </div>

                <div className="max-w-[140px]">
                  <p className="truncate text-xs font-black text-slate-800">
                    {student.name}
                  </p>

                  <p className="text-[10px] font-semibold text-emerald-600">
                    ● Active Student
                  </p>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* ==========================================
              WELCOME HERO
          ========================================== */}

          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#06234e] via-[#075b9c] to-[#07929f] p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8">

            {/* BACKGROUND */}

            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:34px_34px]" />
            </div>

            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-cyan-100 backdrop-blur">
                  <CheckCircle2 className="h-3.5 w-3.5" />

                  STUDENT PORTAL ACTIVE
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  Welcome back,{" "}
                  <span className="text-cyan-200">
                    {firstName}
                  </span>
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                  Continue your learning journey and
                  complete the Skill Development
                  Programme successfully.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/student/course"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-800 shadow-lg transition hover:-translate-y-0.5"
                  >
                    <PlayCircle className="h-4 w-4" />

                    Continue Learning
                  </Link>

                  <Link
                    href="/student/profile"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                  >
                    View Profile

                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    70
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/55">
                    Questions
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    45
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/55">
                    Pass Marks
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    64%
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/55">
                    Required
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    01
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/55">
                    Certificate
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ==========================================
              STATS
          ========================================== */}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <DashboardStat
              icon={<BookOpen className="h-5 w-5" />}
              title="Programme"
              value="Skill Development"
              description="Currently Enrolled"
              iconClass="bg-blue-50 text-blue-600"
            />

            <DashboardStat
              icon={
                <ClipboardCheck className="h-5 w-5" />
              }
              title="Examination"
              value="Not Attempted"
              description="70 Questions Available"
              iconClass="bg-orange-50 text-orange-600"
            />

            <DashboardStat
              icon={
                <Target className="h-5 w-5" />
              }
              title="Passing Marks"
              value="45 / 70"
              description="Minimum Required"
              iconClass="bg-purple-50 text-purple-600"
            />

            <DashboardStat
              icon={
                <Award className="h-5 w-5" />
              }
              title="Certificate"
              value="Pending"
              description="Available After Passing"
              iconClass="bg-emerald-50 text-emerald-600"
            />

          </div>

          {/* ==========================================
              MAIN GRID
          ========================================== */}

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">

            {/* LEARNING PROGRESS */}

            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">
                    Learning Progress
                  </p>

                  <h3 className="mt-1 text-xl font-black text-slate-900">
                    Your Programme Journey
                  </h3>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                  <Clock3 className="h-4 w-4" />

                  In Progress
                </div>

              </div>

              {/* COURSE */}

              <div className="mt-6 rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/40 p-5">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200">
                    <GraduationCap className="h-8 w-8" />
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Enrolled Programme
                    </p>

                    <h4 className="mt-1 text-lg font-black text-slate-900">
                      {student.course}
                    </h4>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">
                          Course Progress
                        </span>

                        <span className="text-xs font-black text-blue-700">
                          0%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-[0%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/student/course"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-700"
                  >
                    Open Course

                    <ChevronRight className="h-4 w-4" />
                  </Link>

                </div>
              </div>

              {/* STEPS */}

              <div className="mt-6 space-y-4">

                <ProgressStep
                  number="01"
                  title="Student Registration"
                  description="Your student account has been successfully created."
                  status="completed"
                />

                <ProgressStep
                  number="02"
                  title="Learning Programme"
                  description="Complete your Skill Development learning modules."
                  status="active"
                />

                <ProgressStep
                  number="03"
                  title="Online Examination"
                  description="Attempt all 70 questions and score at least 45 marks."
                  status="pending"
                />

                <ProgressStep
                  number="04"
                  title="Certificate Generation"
                  description="Certificate will be automatically generated after passing."
                  status="pending"
                />

              </div>
            </div>

            {/* RIGHT PANEL */}

            <div className="space-y-6">

              {/* EXAM */}

              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#08295a] via-[#07548e] to-[#078f9d] p-6 text-white shadow-xl shadow-blue-900/10">

                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200 backdrop-blur">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
                    Online Assessment
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Ready for your examination?
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Complete 70 questions. You need
                    minimum 45 marks to successfully
                    complete the programme.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                      <p className="text-lg font-black">
                        70
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-white/50">
                        TOTAL QUESTIONS
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                      <p className="text-lg font-black">
                        45
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-white/50">
                        PASS MARKS
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/student/exam"
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-blue-800 transition hover:-translate-y-0.5"
                  >
                    Start Examination

                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* CERTIFICATE */}

              <div className="rounded-[26px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Award className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600">
                      Digital Certificate
                    </p>

                    <h3 className="mt-1 text-lg font-black text-slate-900">
                      Certificate Status
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Your certificate will automatically
                      become available after scoring 45 or
                      more marks.
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-600" />

                    <span className="text-xs font-bold text-slate-700">
                      Certificate
                    </span>
                  </div>

                  <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black text-orange-600">
                    LOCKED
                  </span>
                </div>

              </div>

              {/* SECURITY */}

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-black text-slate-800">
                    Secure Student Account
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Your examination results and
                    certificate are securely linked with
                    your Student ID.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


/* ================================================
    DASHBOARD STAT
================================================ */

function DashboardStat({
  icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-lg font-black text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}


/* ================================================
    PROGRESS STEP
================================================ */

function ProgressStep({
  number,
  title,
  description,
  status,
}: {
  number: string;
  title: string;
  description: string;
  status:
    | "completed"
    | "active"
    | "pending";
}) {
  const styles = {
    completed:
      "border-emerald-100 bg-emerald-50",

    active:
      "border-blue-200 bg-blue-50",

    pending:
      "border-slate-100 bg-slate-50",
  };

  const numberStyles = {
    completed:
      "bg-emerald-500 text-white",

    active:
      "bg-blue-600 text-white",

    pending:
      "bg-slate-200 text-slate-500",
  };

  return (
    <div
      className={`flex gap-4 rounded-2xl border p-4 ${styles[status]}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${numberStyles[status]}`}
      >
        {status === "completed" ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          number
        )}
      </div>

      <div>
        <p className="text-sm font-black text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}