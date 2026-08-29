"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

export default function NewsAdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/news-admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.message ||
            "Invalid email or password."
        );

        return;
      }

      router.push(
        "/news-admin/dashboard"
      );

      router.refresh();
    } catch {
      setError(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#073b4c] px-4">

      {/* BACKGROUND EFFECT */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#b68b2c]/15 blur-3xl" />

      {/* GRID OVERLAY */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize:
            "40px 40px",
        }}
      />

      {/* CENTER CONTENT */}

      <div className="relative z-10 flex w-full max-w-[430px] flex-col items-center justify-center">

        {/* BRAND */}

        <div className="mb-4 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl">

            <Newspaper
              size={27}
              className="text-[#08744f]"
            />

          </div>

          <h1 className="mt-3 text-xl font-black tracking-tight text-white">
            AJFT News Portal
          </h1>

          <p className="mt-1 text-xs text-white/60">
            Official News Management System
          </p>

        </div>

        {/* LOGIN CARD */}

        <div className="w-full rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:p-6">

          {/* CARD HEADER */}

          <div className="mb-5">

            <div className="flex items-center gap-2 text-[#08744f]">

              <ShieldCheck size={17} />

              <span className="text-[10px] font-black uppercase tracking-[0.16em]">
                Secure Access
              </span>

            </div>

            <h2 className="mt-3 text-xl font-black text-[#073b4c]">

              Administrator Login

            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">

              Login to manage AJFT news and official announcements.

            </p>

          </div>

          {/* ERROR */}

          {error && (

            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600">

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

              <label className="mb-1.5 block text-xs font-bold text-slate-700">

                Email Address

              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="admin@example.com"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#08744f] focus:bg-white focus:ring-4 focus:ring-[#08744f]/10"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="mb-1.5 block text-xs font-bold text-slate-700">

                Password

              </label>

              <div className="relative">

                <LockKeyhole
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#08744f] focus:bg-white focus:ring-4 focus:ring-[#08744f]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#073b4c]"
                >

                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>

            </div>

            {/* LOGIN */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[#08744f] text-sm font-black text-white shadow-lg shadow-[#08744f]/20 transition hover:bg-[#066441] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >

              {loading
                ? "Signing in..."
                : "Login to Dashboard"}

            </button>

          </form>

        </div>

        {/* COPYRIGHT */}

        <p className="mt-4 text-center text-[10px] text-white/40">

          © {new Date().getFullYear()} Anand Jivan Foundation Trust

        </p>

      </div>

    </main>
  );
}