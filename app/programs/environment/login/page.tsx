"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Leaf,
  Loader2,
  LockKeyhole,
  UserRound,
} from "lucide-react";

export default function EnvironmentLoginPage() {
  const router = useRouter();

  const [participantId, setParticipantId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/environment/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            participantId: participantId.trim(),
            password: password.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.message ||
            "Invalid Participant ID or password."
        );
        return;
      }

      router.push(
        "/programs/environment/dashboard"
      );

      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-cyan-950" />

      <section className="relative z-10 w-full max-w-md">
        <Link
          href="/programs/environment"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Environment Programme
        </Link>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] px-8 py-10 text-center text-white">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-white/15">
              <Leaf className="h-10 w-10 text-emerald-200" />
            </div>

            <p className="mt-6 text-[10px] font-black tracking-[0.28em] text-emerald-200">
              AJFT ENVIRONMENT PROGRAMME
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Participant Login
            </h1>

            <p className="mt-3 text-sm text-emerald-100">
              Login to access your plantation dashboard and rewards.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-7"
          >
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-black uppercase text-slate-500">
                Participant ID
              </label>

              <div className="relative mt-2">
                <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={participantId}
                  onChange={(event) =>
                    setParticipantId(event.target.value)
                  }
                  placeholder="AJFT-ENV-XXXX"
                  required
                  className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-slate-500">
                Password
              </label>

              <div className="relative mt-2">
                <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                  required
                  className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 font-black text-white disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login to Dashboard
                  <Leaf className="h-5 w-5" />
                </>
              )}
            </button>

            <div className="text-center">
              <Link
                href="/environment/register"
                className="font-bold text-emerald-700"
              >
                New participant? Register here
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
