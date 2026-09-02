"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Award,
  CheckCircle2,
  Loader2,
  Trophy,
  XCircle,
} from "lucide-react";

type ResultData = {
  score: number;
  totalQuestions: number;
  passingMarks: number;
  percentage: number;
  result: "pass" | "fail";
};

export default function ResultsPage() {
  const [
    result,
    setResult,
  ] = useState<ResultData | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function loadResult() {
      try {
        const response =
          await fetch(
            "/api/student/results",
            {
              cache:
                "no-store",
            }
          );

        const data =
          await response.json();

        if (
          data.success &&
          data.data
        ) {
          setResult(
            data.data
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          No examination result found.
        </div>
      </div>
    );
  }

  const passed =
    result.result === "pass";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">

      <div className="w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl">

        <div
          className={`p-8 text-center text-white sm:p-12 ${
            passed
              ? "bg-gradient-to-br from-emerald-600 to-teal-500"
              : "bg-gradient-to-br from-red-600 to-orange-500"
          }`}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15">

            {passed ? (
              <Trophy className="h-10 w-10" />
            ) : (
              <XCircle className="h-10 w-10" />
            )}

          </div>

          <h1 className="mt-6 text-3xl font-black">
            {passed
              ? "Congratulations!"
              : "Examination Result"}
          </h1>

          <p className="mt-2 text-white/75">
            {passed
              ? "You have successfully passed the assessment."
              : "You have not achieved the required passing marks."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">

          <ResultCard
            label="Score"
            value={`${result.score}`}
          />

          <ResultCard
            label="Total"
            value={`${result.totalQuestions}`}
          />

          <ResultCard
            label="Pass Mark"
            value={`${result.passingMarks}`}
          />

          <ResultCard
            label="Percentage"
            value={`${result.percentage}%`}
          />

        </div>

        <div className="border-t p-6">

          {passed ? (
            <Link
              href="/student/certificate"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-black text-white"
            >
              <Award className="h-5 w-5" />

              View My Certificate
            </Link>
          ) : (
            <Link
              href="/student/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 font-black text-white"
            >
              Back to Dashboard
            </Link>
          )}

        </div>
      </div>
    </main>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center">

      <p className="text-xl font-black">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>
    </div>
  );
}