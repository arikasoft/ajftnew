import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const amounts = [
  {
    amount: "₹500",
    text: "Support a community activity",
  },
  {
    amount: "₹1,000",
    text: "Support education initiatives",
  },
  {
    amount: "₹2,500",
    text: "Support community development",
  },
];

export default function DonateCTA() {
  return (
    <section className="relative overflow-hidden bg-[#F5F8FA] px-5 py-16 sm:px-7 md:py-20 lg:px-8">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-[#087E8B]/8 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-80px] h-80 w-80 rounded-full bg-[#D6A63A]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            MAIN DONATION CARD
        ====================================================== */}

        <div className="overflow-hidden rounded-[32px] bg-[#102A43] shadow-[0_25px_80px_rgba(16,42,67,0.15)]">

          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="relative overflow-hidden p-7 sm:p-10 md:p-14">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/5" />

              <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full border border-[#087E8B]/10" />

              <div className="relative">

                {/* Label */}

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

                  <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#D9B65A]">
                    Support Our Work
                  </p>

                </div>

                {/* Heading */}

                <h2 className="mt-5 max-w-2xl font-serif text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">

                  Your Support Can
                  <br />

                  <span className="text-[#D6A63A]">
                    Make A Difference
                  </span>

                </h2>

                <p className="mt-5 max-w-xl text-xs leading-6 text-white/50 md:text-sm">
                  Your contribution can support charitable and
                  community-focused initiatives of Anand Jivan
                  Foundation Trust.
                </p>

                {/* =================================================
                    BENEFITS
                ================================================== */}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#36B9C3]"
                    />

                    <span className="text-[10px] font-semibold text-white/60">
                      Education & learning
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#36B9C3]"
                    />

                    <span className="text-[10px] font-semibold text-white/60">
                      Healthcare initiatives
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#36B9C3]"
                    />

                    <span className="text-[10px] font-semibold text-white/60">
                      Women empowerment
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#36B9C3]"
                    />

                    <span className="text-[10px] font-semibold text-white/60">
                      Community development
                    </span>

                  </div>

                </div>

                {/* =================================================
                    BUTTONS
                ================================================== */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href="/donate"
                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#D6A63A]
                      px-7
                      text-[10px]
                      font-black
                      text-white
                      shadow-[0_12px_30px_rgba(214,166,58,0.16)]
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#BD8D28]
                    "
                  >
                    <Heart
                      size={15}
                      fill="currentColor"
                    />

                    Donate Now

                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/transparency"
                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      px-7
                      text-[10px]
                      font-black
                      text-white
                      transition
                      hover:bg-white/10
                    "
                  >
                    View Transparency
                  </Link>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT DONATION PANEL
            ================================================== */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#087E8B] to-[#0B4054] p-7 sm:p-10 md:p-12">

              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />

              <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-[#D6A63A]/20" />

              <div className="relative">

                {/* ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur">

                  <HandHeart size={27} />

                </div>

                <p className="mt-6 text-[9px] font-black uppercase tracking-[0.22em] text-[#D9B65A]">
                  Choose Your Support
                </p>

                <h3 className="mt-2 font-serif text-2xl font-black text-white sm:text-3xl">
                  Every Contribution Matters
                </h3>

                {/* AMOUNTS */}

                <div className="mt-6 space-y-3">

                  {amounts.map((item) => (
                    <Link
                      key={item.amount}
                      href="/donate"
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.07]
                        p-4
                        backdrop-blur
                        transition-all
                        hover:-translate-y-0.5
                        hover:border-[#D6A63A]/50
                        hover:bg-white/[0.11]
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#D9B65A]">
                          <Heart
                            size={15}
                            fill="currentColor"
                          />
                        </div>

                        <div>

                          <p className="text-sm font-black text-white">
                            {item.amount}
                          </p>

                          <p className="mt-0.5 text-[8px] text-white/35">
                            {item.text}
                          </p>

                        </div>

                      </div>

                      <ArrowRight
                        size={15}
                        className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#D9B65A]"
                      />

                    </Link>
                  ))}

                </div>

                {/* CUSTOM */}

                <Link
                  href="/donate"
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-[#D6A63A]/30
                    bg-[#D6A63A]/10
                    px-4
                    py-3.5
                    text-[9px]
                    font-black
                    text-[#F0D58B]
                    transition
                    hover:bg-[#D6A63A]
                    hover:text-white
                  "
                >
                  Choose Your Own Amount
                  <Sparkles size={13} />
                </Link>

                {/* SECURITY */}

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">

                  <ShieldCheck
                    size={18}
                    className="text-[#36B9C3]"
                  />

                  <div>

                    <p className="text-[9px] font-black text-white">
                      Secure Donation
                    </p>

                    <p className="mt-1 text-[8px] text-white/35">
                      Payment processing through a secure gateway.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            TRUST BAR
        ====================================================== */}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-2xl border border-[#DCE5EA] bg-white px-5 py-4">

            <ShieldCheck
              size={19}
              className="text-[#087E8B]"
            />

            <div>

              <p className="text-[10px] font-black text-[#102A43]">
                Secure Giving
              </p>

              <p className="mt-1 text-[8px] text-[#8997A2]">
                Safe online donation process
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DCE5EA] bg-white px-5 py-4">

            <Users
              size={19}
              className="text-[#D6A63A]"
            />

            <div>

              <p className="text-[10px] font-black text-[#102A43]">
                Community Focused
              </p>

              <p className="mt-1 text-[8px] text-[#8997A2]">
                Supporting people and communities
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DCE5EA] bg-white px-5 py-4">

            <Heart
              size={19}
              className="text-[#087E8B]"
              fill="currentColor"
            />

            <div>

              <p className="text-[10px] font-black text-[#102A43]">
                Every Contribution Matters
              </p>

              <p className="mt-1 text-[8px] text-[#8997A2]">
                Your support can create meaningful impact
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}