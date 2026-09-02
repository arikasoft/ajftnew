"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EnvironmentLoginPage() {
  const router = useRouter();

  const [participantId, setParticipantId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            participantId:
              participantId.trim(),
            password:
              password.trim(),
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
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
      console.error(
        "LOGIN ERROR:",
        error
      );

      setError(
        "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="bg-gradient-to-r from-emerald-700 to-teal-600 p-8 text-center text-white">

          <h1 className="text-3xl font-black">
            Participant Login
          </h1>

          <p className="mt-3 text-sm text-emerald-100">
            AJFT Environment Programme
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <div>

            <label className="text-sm font-bold">
              Participant ID
            </label>

            <input
              type="text"
              value={participantId}
              onChange={(event) =>
                setParticipantId(
                  event.target.value
                )
              }
              placeholder="AJFT-ENV-XXXX"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-emerald-600"
            />

          </div>

          <div>

            <label className="text-sm font-bold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-emerald-600"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-700 p-4 font-black text-white disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login to Dashboard"}
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

    </main>
  );
}