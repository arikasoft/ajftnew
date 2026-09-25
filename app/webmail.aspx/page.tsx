"use client";

import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function WebmailPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/webmail/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            remember,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Unable to sign in."
        );
      }

      window.location.href =
        result.redirectTo ||
        "/webmail.aspx/inbox";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7fa] flex items-center justify-center px-4 py-8">

      {/* =====================================================
          LANDSCAPE LOGIN CARD
      ===================================================== */}

      <div className="w-full max-w-[760px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)]">

        <div className="grid grid-cols-1 md:grid-cols-[42%_58%]">

          {/* =================================================
              LEFT BRAND PANEL
          ================================================= */}

          <div className="hidden md:flex flex-col justify-center bg-[#101b35] px-8 py-10 text-white">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Mail size={24} />
            </div>

            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              ArikaSoft
            </div>

            <h1 className="mt-2 text-2xl font-bold leading-tight">
              Business Webmail
            </h1>

            <p className="mt-3 max-w-[240px] text-sm leading-6 text-slate-300">
              Secure and simple access to your
              business mailbox.
            </p>

            <div className="mt-8 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck size={15} />
              Secure mail access
            </div>
          </div>

          {/* =================================================
              LOGIN PANEL
          ================================================= */}

          <div className="px-7 py-8 sm:px-10">

            {/* MOBILE BRAND */}

            <div className="mb-6 flex items-center gap-3 md:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#101b35] text-white">
                <Mail size={20} />
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900">
                  ArikaSoft Webmail
                </div>

                <div className="text-xs text-slate-500">
                  Secure business email
                </div>
              </div>
            </div>

            {/* TITLE */}

            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Sign in to Webmail
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Enter your email address and password.
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="name@arikasoft.com"
                    autoComplete="email"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#101b35] focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

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
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#101b35] focus:ring-2 focus:ring-slate-900/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}

              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(
                        e.target.checked
                      )
                    }
                    className="h-3.5 w-3.5 rounded border-slate-300"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setError(
                      "Please contact your administrator to reset your password."
                    )
                  }
                  className="text-xs font-semibold text-[#101b35] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-[#101b35] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#172544] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </form>

            {/* SECURITY */}

            <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-[11px] text-slate-400">
              <ShieldCheck size={13} />
              Secure & encrypted connection
            </div>

          </div>
        </div>

        {/* FOOTER */}

        <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-center text-[10px] text-slate-400">
          © {new Date().getFullYear()} ArikaSoft Private Limited
        </div>
      </div>
    </main>
  );
}