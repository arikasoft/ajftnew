"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Mail,
} from "lucide-react";

const faqs = [
  {
    question: "What is Anand Jivan Foundation Trust?",
    answer:
      "Anand Jivan Foundation Trust is a public charitable trust working towards community-focused initiatives including education, healthcare, women empowerment, child welfare, environment, skill development and social welfare.",
  },
  {
    question: "How can I support AJFT?",
    answer:
      "You can support AJFT through donations, volunteering, partnerships, professional skills, community participation or by helping spread awareness about our initiatives.",
  },
  {
    question: "How can I become a volunteer?",
    answer:
      "You can visit the Volunteer section and submit your details. Our team can then connect with you regarding suitable activities and opportunities.",
  },
  {
    question: "Where does AJFT work?",
    answer:
      "AJFT is focused on community-oriented activities, with initiatives and programmes primarily connected with Bihar and surrounding communities.",
  },
  {
    question: "How can I view AJFT reports and transparency information?",
    answer:
      "You can visit the Transparency and Reports sections of the website to access the information and documents made available by the Trust.",
  },
  {
    question: "How can I contact Anand Jivan Foundation Trust?",
    answer:
      "You can contact the Trust through the Contact Us page, by phone at +91 9155751363, or by email at info@ajftrust.org.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F8FA] px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#087E8B]/7 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-80px] h-80 w-80 rounded-full bg-[#D6A63A]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

          <div>

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#C09230]">
                Frequently Asked Questions
              </p>

            </div>

            <h2 className="mt-4 font-serif text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
              How Can We
              <span className="text-[#087E8B]">
                {" "}Help?
              </span>
            </h2>

            <p className="mt-4 max-w-md text-xs leading-6 text-[#718394] md:text-sm">
              Find answers to common questions about Anand Jivan
              Foundation Trust, volunteering, donations and our work.
            </p>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#DCE5EA] bg-white p-5 shadow-sm">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F7] text-[#087E8B]">
              <HelpCircle size={21} />
            </div>

            <div>

              <p className="text-[11px] font-black text-[#102A43]">
                Still have a question?
              </p>

              <p className="mt-1 text-[9px] text-[#8997A2]">
                Our team will be happy to assist you.
              </p>

            </div>

            <Link
              href="/contact"
              className="
                ml-auto
                hidden
                h-9
                shrink-0
                items-center
                gap-1.5
                rounded-lg
                bg-[#087E8B]
                px-4
                text-[9px]
                font-black
                text-white
                transition
                hover:bg-[#066C77]
                sm:inline-flex
              "
            >
              Contact
              <ArrowRight size={12} />
            </Link>

          </div>

        </div>

        {/* =====================================================
            FAQ LIST
        ====================================================== */}

        <div className="mt-10 grid gap-3">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-[#087E8B]/30 shadow-[0_10px_30px_rgba(16,42,67,0.06)]"
                      : "border-[#DCE5EA]"
                  }
                `}
              >

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    px-5
                    py-5
                    text-left
                    sm:px-6
                  "
                >

                  <div className="flex items-center gap-4">

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-[9px]
                        font-black
                        transition
                        ${
                          isOpen
                            ? "bg-[#087E8B] text-white"
                            : "bg-[#F1F6F8] text-[#087E8B]"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`
                        text-[11px]
                        font-black
                        sm:text-xs
                        ${
                          isOpen
                            ? "text-[#087E8B]"
                            : "text-[#102A43]"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                  </div>

                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition
                      ${
                        isOpen
                          ? "rotate-180 bg-[#087E8B] text-white"
                          : "bg-[#F1F6F8] text-[#718394]"
                      }
                    `}
                  >
                    <ChevronDown size={15} />
                  </span>

                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >

                  <div className="min-h-0 overflow-hidden">

                    <div className="border-t border-[#EDF1F3] px-5 pb-6 pt-4 pl-[4.5rem] sm:px-6 sm:pl-[4.75rem]">

                      <p className="max-w-4xl text-[10px] leading-6 text-[#718394] sm:text-[11px]">
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-5
            rounded-3xl
            border
            border-[#DCE5EA]
            bg-white
            p-6
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
            md:p-7
          "
        >

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FBF6E9] text-[#C09230]">
              <Mail size={19} />
            </div>

            <div>

              <h3 className="text-sm font-black text-[#102A43]">
                Need more information?
              </h3>

              <p className="mt-1 text-[9px] text-[#8997A2]">
                Contact the AJFT team for further information.
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#087E8B]
                px-6
                py-3
                text-[10px]
                font-black
                text-white
                transition
                hover:bg-[#066C77]
              "
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/about"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#D8E2E7]
                bg-white
                px-6
                py-3
                text-[10px]
                font-black
                text-[#087E8B]
                transition
                hover:border-[#087E8B]
              "
            >
              About AJFT
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}