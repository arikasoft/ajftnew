"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  Waves,
  AlertCircle,
} from "lucide-react";

export default function StudentLoginPage() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<"error" | "success" | "">("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!studentId.trim()) {
      setMessageType("error");

      setMessage(
        "Please enter your Student ID."
      );

      return;
    }

    if (!password.trim()) {
      setMessageType("error");

      setMessage(
        "Please enter your password."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/student/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            studentId:
              studentId
                .trim()
                .toUpperCase(),

            password,

            rememberMe,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to login."
        );
      }

      setMessageType("success");

      setMessage(
        "Login successful. Opening your student dashboard..."
      );

      setTimeout(() => {
        window.location.href =
          "/student/dashboard";
      }, 700);
    } catch (error) {
      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f8fc]">
      {/* ===============================================
          BACKGROUND GLOW
      =============================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] animate-pulse rounded-full bg-blue-300/30 blur-3xl" />

        <div className="absolute right-[-12rem] top-20 h-[26rem] w-[26rem] animate-pulse rounded-full bg-cyan-300/30 blur-3xl [animation-delay:1000ms]" />

        <div className="absolute bottom-[-15rem] left-[30%] h-[30rem] w-[30rem] animate-pulse rounded-full bg-indigo-200/40 blur-3xl [animation-delay:2000ms]" />
      </div>

      {/* ===============================================
          TOP BAR
      =============================================== */}

      <header className="relative z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0757b8] via-[#0879c9] to-[#11a6b8] text-white shadow-lg shadow-blue-500/20 transition duration-300 group-hover:-translate-y-0.5">
              <GraduationCap className="relative z-10 h-6 w-6" />

              <div className="absolute bottom-0 left-0 h-1/2 w-full bg-white/10" />
            </div>

            <div>
              <h1 className="text-[15px] font-black tracking-tight text-slate-900">
                AJFT Student Portal
              </h1>

              <p className="text-[11px] font-medium text-slate-500">
                Skill Development Programme
              </p>
            </div>
          </Link>

          <Link
            href="/programs/skill-development"
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:flex"
          >
            <ArrowLeft className="h-4 w-4" />

            Programme
          </Link>
        </div>
      </header>

      {/* ===============================================
          MAIN LOGIN AREA
      =============================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center px-4 py-8 sm:px-6">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/80 bg-white/85 shadow-2xl shadow-slate-900/10 backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
          {/* ===========================================
              LEFT PANEL
          =========================================== */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#06204a] via-[#064f86] to-[#078f9d] p-8 text-white lg:block">
            {/* GRID */}

            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:36px_36px]" />
            </div>

            {/* FLOATING SHAPES */}

            <div className="absolute -right-20 -top-20 h-60 w-60 animate-pulse rounded-full bg-cyan-300/10 blur-2xl" />

            <div className="absolute -bottom-20 -left-20 h-64 w-64 animate-pulse rounded-full bg-blue-300/10 blur-2xl [animation-delay:1500ms]" />

            <div className="relative z-10 flex h-full flex-col">
              {/* BADGE */}

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-cyan-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

                LEARNING PLATFORM
              </div>

              {/* TITLE */}

              <h2 className="mt-7 max-w-md text-4xl font-black leading-[1.1] tracking-tight">
                Build Skills.
                <span className="block bg-gradient-to-r from-cyan-200 to-blue-100 bg-clip-text text-transparent">
                  Build Your Future.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                Access your learning dashboard,
                assessments, examination results and
                programme completion certificate.
              </p>

              {/* FEATURES */}

              <div className="mt-8 space-y-3">
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-3.5 backdrop-blur transition hover:translate-x-1 hover:bg-white/[0.12]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      Student Learning
                    </p>

                    <p className="mt-0.5 text-xs text-white/55">
                      Access your programme dashboard.
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-3.5 backdrop-blur transition hover:translate-x-1 hover:bg-white/[0.12]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-300/15 text-blue-100">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      Secure Assessment
                    </p>

                    <p className="mt-0.5 text-xs text-white/55">
                      Complete your examination securely.
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-3.5 backdrop-blur transition hover:translate-x-1 hover:bg-white/[0.12]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      Result & Certificate
                    </p>

                    <p className="mt-0.5 text-xs text-white/55">
                      Complete the programme and receive
                      your certificate.
                    </p>
                  </div>
                </div>
              </div>

              {/* STATS */}

              <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-3 backdrop-blur">
                  <p className="text-xl font-black">
                    70
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/50">
                    Questions
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-3 backdrop-blur">
                  <p className="text-xl font-black">
                    45
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/50">
                    Pass Marks
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-3 backdrop-blur">
                  <p className="text-xl font-black">
                    64%
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/50">
                    Required
                  </p>
                </div>
              </div>
            </div>

            {/* ===========================================
                ANIMATED WAVE
            =========================================== */}

            <div className="pointer-events-none absolute bottom-0 left-0 w-full">
              <svg
                viewBox="0 0 1440 200"
                className="block h-28 w-[200%] animate-[waveMove_12s_linear_infinite]"
                preserveAspectRatio="none"
              >
                <path
                  fill="rgba(255,255,255,0.08)"
                  d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,106.7C840,96,960,96,1080,112C1200,128,1320,160,1380,176L1440,192L1440,200L0,200Z"
                />
              </svg>

              <svg
                viewBox="0 0 1440 200"
                className="absolute bottom-0 left-0 h-24 w-[200%] animate-[waveMove_18s_linear_infinite]"
                preserveAspectRatio="none"
              >
                <path
                  fill="rgba(255,255,255,0.06)"
                  d="M0,128L80,122.7C160,117,320,107,480,117.3C640,128,800,160,960,154.7C1120,149,1280,107,1360,85.3L1440,64L1440,200L0,200Z"
                />
              </svg>
            </div>
          </div>

          {/* ===========================================
              RIGHT LOGIN FORM
          =========================================== */}

          <div className="relative flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-[390px]">
              {/* MOBILE BRAND */}

              <div className="mb-7 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-lg">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-black text-slate-900">
                    Welcome Back
                  </p>

                  <p className="text-xs text-slate-500">
                    Student Learning Portal
                  </p>
                </div>
              </div>

              {/* LOGIN HEADING */}

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-700">
                  <KeyRound className="h-6 w-6" />
                </div>

                <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
                  Welcome Back
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Login with your Student ID and password
                  to continue your learning journey.
                </p>
              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  className={`mt-5 flex gap-3 rounded-2xl border p-3.5 ${
                    messageType === "error"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {messageType === "error" ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  )}

                  <p className="text-xs font-semibold leading-5">
                    {message}
                  </p>
                </div>
              )}

              {/* LOGIN FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >
                {/* STUDENT ID */}

                <div>
                  <label
                    htmlFor="studentId"
                    className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-600"
                  >
                    Student ID
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />

                    <input
                      id="studentId"
                      type="text"
                      value={studentId}
                      onChange={(e) =>
                        setStudentId(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="Enter your Student ID"
                      autoComplete="username"
                      disabled={loading}
                      className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-600"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm font-bold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-[18px] w-[18px]" />
                      ) : (
                        <Eye className="h-[18px] w-[18px]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}

                <div className="flex items-center justify-between gap-3 pt-1">
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    Remember me
                  </label>

                  <Link
                    href="/student/forgot-password"
                    className="text-xs font-black text-blue-700 transition hover:text-blue-900"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 flex h-[54px] w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0757b8] via-[#087ac8] to-[#0796a8] text-sm font-black text-white shadow-xl shadow-blue-300/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-400/40 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />

                  {loading ? (
                    <>
                      <LoaderCircle className="relative h-5 w-5 animate-spin" />

                      <span className="relative">
                        Signing In...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative">
                        Login to Dashboard
                      </span>

                      <ArrowRight className="relative h-5 w-5 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* DIVIDER */}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* APPLY */}

              <Link
                href="/programs/skill-development/apply"
                className="flex h-[50px] items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 text-xs font-black text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-100"
              >
                Apply for Skill Development

                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* HELP */}

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                <div className="rounded-xl bg-white p-2 text-blue-600 shadow-sm">
                  <Mail className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-black text-slate-800">
                    Need login assistance?
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Your Student ID and password are
                    provided after successful application
                    approval.
                  </p>
                </div>
              </div>

              {/* FOOT NOTE */}

              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-400">
                <Waves className="h-3.5 w-3.5 text-cyan-500" />

                Secure Student Learning Environment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================
          BOTTOM DECORATIVE WAVES
      =============================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="h-20 w-[160%] animate-[waveMove_20s_linear_infinite] opacity-70"
        >
          <path
            fill="#dbeafe"
            d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,106.7C840,96,960,96,1080,112C1200,128,1320,160,1380,176L1440,192L1440,200L0,200Z"
          />
        </svg>
      </div>

      {/* ===============================================
          CUSTOM ANIMATION
      =============================================== */}

      <style jsx global>{`
        @keyframes waveMove {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(-18%);
          }

          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}