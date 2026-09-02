import Link from "next/link";

import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  PlayCircle,
} from "lucide-react";

export default function StudentCoursePage() {
  const modules = [
    {
      number: "01",
      title:
        "Introduction to Skill Development",
      description:
        "Understand the importance of skills and employability.",
    },

    {
      number: "02",
      title:
        "Communication Skills",
      description:
        "Develop professional verbal and written communication.",
    },

    {
      number: "03",
      title:
        "Digital Literacy",
      description:
        "Learn essential digital and technology skills.",
    },

    {
      number: "04",
      title:
        "Professional Development",
      description:
        "Build workplace readiness and professional behavior.",
    },

    {
      number: "05",
      title:
        "Career & Employability",
      description:
        "Prepare for interviews, careers and opportunities.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">

      <div className="mx-auto max-w-6xl">

        <div className="rounded-[30px] bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 p-8 text-white">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <BookOpen />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Skill Development Programme
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Complete your learning modules
            before attempting the final
            assessment.
          </p>
        </div>

        <div className="mt-8 grid gap-4">

          {modules.map(
            (module) => (
              <div
                key={
                  module.number
                }
                className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-blue-700">
                  {
                    module.number
                  }
                </div>

                <div className="flex-1">

                  <h2 className="font-black text-slate-900">
                    {
                      module.title
                    }
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {
                      module.description
                    }
                  </p>

                </div>

                <CheckCircle2 className="h-6 w-6 text-slate-200" />
              </div>
            )
          )}

        </div>

        <div className="mt-8 flex justify-center">

          <Link
            href="/student/exam"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-7 py-4 text-sm font-black text-white"
          >
            <ClipboardCheck className="h-5 w-5" />

            Proceed to Examination

            <PlayCircle className="h-5 w-5" />
          </Link>

        </div>
      </div>
    </main>
  );
}