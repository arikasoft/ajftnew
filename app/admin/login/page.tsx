"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  User,
} from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      window.location.href =
        data.redirectTo || "/admin/internship";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-70px)] items-center justify-center overflow-hidden bg-[#071923] px-4 py-12">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-[#176B87]/25 blur-[100px]" />

        <div className="absolute bottom-[5%] right-[8%] h-80 w-80 rounded-full bg-[#C59A3A]/15 blur-[110px]" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176B87]/10 blur-[120px]" />

      </div>

      {/* SUBTLE GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.045]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* LOGIN CARD */}

      <section className="relative z-10 w-full max-w-[390px]">

        {/* BRAND */}

        <div className="mb-5 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
            <ShieldCheck
              size={23}
              className="text-[#F2C94C]"
            />
          </div>

          <p className="mt-3 text-[8px] font-black uppercase tracking-[0.28em] text-[#F2C94C]">
            AJFT ADMIN
          </p>

          <h1 className="mt-1 text-xl font-black text-white">
            Welcome Back
          </h1>

          <p className="mt-1 text-[10px] text-white/40">
            Secure administrator access
          </p>

        </div>

        {/* CARD */}

        <div
          className="
            rounded-[1.5rem]
            border
            border-white/10
            bg-white/[0.97]
            p-6
            shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >

          {/* CARD HEADER */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF6F8] text-[#176B87]">
              <LogIn size={17} />
            </div>

            <div>

              <h2 className="text-sm font-black text-[#102A43]">
                Admin Login
              </h2>

              <p className="mt-0.5 text-[9px] text-[#8997A2]">
                Sign in to continue
              </p>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="mt-5 space-y-3.5"
          >

            {/* USERNAME / EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="mb-1.5 block text-[9px] font-black uppercase tracking-wide text-[#607585]"
              >
                Username / Email
              </label>

              <div className="relative">

                <User
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#9AA8B2]
                  "
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@ajftrust.org"
                  autoComplete="username"
                  required
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-[#DCE4EA]
                    bg-[#FAFCFD]
                    pl-9
                    pr-3
                    text-xs
                    text-[#243B53]
                    outline-none
                    transition
                    placeholder:text-[#AAB5BC]
                    focus:border-[#176B87]
                    focus:ring-3
                    focus:ring-[#176B87]/10
                  "
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="mb-1.5 block text-[9px] font-black uppercase tracking-wide text-[#607585]"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#9AA8B2]
                  "
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-[#DCE4EA]
                    bg-[#FAFCFD]
                    pl-9
                    pr-10
                    text-xs
                    text-[#243B53]
                    outline-none
                    transition
                    placeholder:text-[#AAB5BC]
                    focus:border-[#176B87]
                    focus:ring-3
                    focus:ring-[#176B87]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-1.5
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-md
                    text-[#8997A2]
                    hover:bg-[#EEF6F8]
                    hover:text-[#176B87]
                  "
                >
                  {showPassword ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
                </button>

              </div>

            </div>

            {/* LOGIN */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-1
                flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#102A43]
                text-[10px]
                font-black
                text-white
                shadow-lg
                shadow-[#102A43]/15
                transition-all
                hover:-translate-y-0.5
                hover:bg-[#176B87]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={13} />
                  LOGIN
                </>
              )}

            </button>

          </form>

          {/* FOOTER */}

          <div className="mt-5 flex items-center justify-between border-t border-[#E8EDF0] pt-4">

            <Link
              href="/"
              className="
                flex
                items-center
                gap-1
                text-[9px]
                font-bold
                text-[#8997A2]
                transition
                hover:text-[#176B87]
              "
            >
              <ArrowLeft size={11} />
              Website
            </Link>

            <div className="flex items-center gap-1 text-[8px] font-semibold text-[#A4AFB6]">
              <ShieldCheck size={10} />
              Secure Access
            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <p className="mt-5 text-center text-[8px] leading-4 text-white/30">
          Anand Jivan Foundation Trust
          <br />
          Authorised access only
        </p>

      </section>

    </main>
  );
}