import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  Heart,
  HandHeart,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "Donate",
    description: "Support our charitable work",
    href: "/donate",
    icon: Heart,
    className:
      "bg-[#1769AA] text-white hover:bg-[#0F578E]",
  },
  {
    title: "Volunteer",
    description: "Give your time and skills",
    href: "/volunteer",
    icon: HandHeart,
    className:
      "bg-[#3C9A32] text-white hover:bg-[#2E7D27]",
  },
  {
    title: "Our Work",
    description: "Explore our focus areas",
    href: "/our-work",
    icon: Users,
    className:
      "bg-[#B88918] text-white hover:bg-[#96700F]",
  },
  {
    title: "Verify",
    description: "Verify a donation receipt",
    href: "/verify",
    icon: FileCheck2,
    className:
      "bg-[#073B4C] text-white hover:bg-[#052D39]",
  },
];

export default function QuickActions() {
  return (
    <section className="relative z-20 px-4 sm:px-6">
      <div className="mx-auto -mt-7 max-w-6xl">

        <div className="grid overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl sm:grid-cols-2 lg:grid-cols-4">

          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative flex items-center gap-4 p-4 transition duration-300 hover:-translate-y-0.5 sm:p-5 ${action.className}`}
              >

                {/* Divider */}

                {index !== 0 && (
                  <span className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/20 lg:block" />
                )}

                {/* Icon */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <Icon size={21} />
                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-black">
                    {action.title}
                  </p>

                  <p className="mt-0.5 truncate text-[9px] font-medium text-white/65">
                    {action.description}
                  </p>

                </div>

                <ArrowRight
                  size={15}
                  className="shrink-0 opacity-60 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />

              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}