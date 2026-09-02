"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Loader2,
  Send,
} from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
};

export default function StudentExamPage() {
  const [
    questions,
    setQuestions,
  ] = useState<Question[]>([]);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<number, string>
  >({});

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    async function loadExam() {
      try {
        const response =
          await fetch(
            "/api/student/exam",
            {
              cache:
                "no-store",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to load examination."
          );
        }

        setQuestions(
          result.data.questions ||
            []
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load examination."
        );
      } finally {
        setLoading(false);
      }
    }

    loadExam();
  }, []);

  const question =
    questions[currentQuestion];

  const answeredCount =
    Object.keys(answers).length;

  const handleAnswer = (
    answer: string
  ) => {
    if (!question) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,

      [question.id]: answer,
    }));
  };

  const submitExam =
    async () => {
      if (submitting) {
        return;
      }

      const confirmSubmit =
        window.confirm(
          `You have answered ${answeredCount} of ${questions.length} questions. Submit examination?`
        );

      if (!confirmSubmit) {
        return;
      }

      try {
        setSubmitting(true);

        const formattedAnswers =
          Object.entries(
            answers
          ).map(
            ([
              questionId,
              selectedAnswer,
            ]) => ({
              questionId:
                Number(questionId),

              selectedAnswer,
            })
          );

        const response =
          await fetch(
            "/api/student/exam/submit",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  answers:
                    formattedAnswers,
                }),
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to submit examination."
          );
        }

        window.location.href =
          "/student/results";
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Unable to submit examination."
        );
      } finally {
        setSubmitting(false);
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />

          <h1 className="mt-4 text-xl font-black">
            Examination Unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  const progress =
    Math.round(
      ((currentQuestion + 1) /
        questions.length) *
        100
    );

  return (
    <main className="min-h-screen bg-[#f4f8fc]">

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ClipboardCheck />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400">
                AJFT STUDENT PORTAL
              </p>

              <h1 className="font-black">
                Final Assessment
              </h1>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-2 text-center">
            <p className="text-xs font-bold text-blue-600">
              ANSWERED
            </p>

            <p className="font-black text-blue-900">
              {answeredCount}/70
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">

        {/* PROGRESS */}

        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex justify-between text-sm font-bold">
            <span>
              Question{" "}
              {currentQuestion + 1}{" "}
              of {questions.length}
            </span>

            <span className="text-blue-600">
              {progress}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
              style={{
                width:
                  `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* QUESTION */}

        <div className="rounded-[30px] bg-white p-6 shadow-sm sm:p-10">

          <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
            QUESTION{" "}
            {question.id}
          </div>

          <h2 className="mt-6 text-xl font-black leading-8 text-slate-900 sm:text-2xl">
            {question.question}
          </h2>

          <div className="mt-8 grid gap-4">

            {question.options.map(
              (option) => {
                const selected =
                  answers[
                    question.id
                  ] === option;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      handleAnswer(
                        option
                      )
                    }
                    className={`flex items-center gap-4 rounded-2xl border p-5 text-left text-sm font-bold transition ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-800 shadow-md"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        selected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        option.charAt(0)
                      )}
                    </span>

                    {option}
                  </button>
                );
              }
            )}

          </div>

          {/* NAVIGATION */}

          <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">

            <button
              disabled={
                currentQuestion ===
                0
              }
              onClick={() =>
                setCurrentQuestion(
                  (previous) =>
                    Math.max(
                      0,
                      previous - 1
                    )
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />

              Previous
            </button>

            {currentQuestion <
            questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentQuestion(
                    (previous) =>
                      Math.min(
                        questions.length -
                          1,
                        previous + 1
                      )
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white"
              >
                Next Question

                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                disabled={submitting}
                onClick={
                  submitExam
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />

                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Examination

                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}