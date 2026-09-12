import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Heart,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Users,
  LockKeyhole,
  BarChart3,
} from "lucide-react";

/* =========================================================
   DONATION OPTIONS
========================================================= */

const amounts = [
  {
    amount: 500,
    label: "₹500",
    text: "Support a community activity",
    buttonId: "Donate500",
  },
  {
    amount: 1000,
    label: "₹1,000",
    text: "Support education initiatives",
    buttonId: "Donate1000",
  },
  {
    amount: 2500,
    label: "₹2,500",
    text: "Support community development",
    buttonId: "Donate2500",
  },
];

/* =========================================================
   TRACKING URL BUILDER
========================================================= */

function donationUrl(
  buttonId: string,
  sourceAction = "Home Donate",
  amount?: number
) {
  const params = new URLSearchParams();

  params.set(
    "source-action",
    sourceAction
  );

  params.set(
    "action",
    "Donate"
  );

  params.set(
    "button-id",
    buttonId
  );

  params.set(
    "utm_source",
    "website"
  );

  params.set(
    "utm_medium",
    "organic"
  );

  params.set(
    "utm_campaign",
    "donation"
  );

  if (amount) {
    params.set(
      "donation_amount",
      String(amount)
    );
  }

  return `/donate?${params.toString()}`;
}

/* =========================================================
   TRANSPARENCY URL
========================================================= */

function transparencyUrl() {
  const params = new URLSearchParams();

  params.set(
    "source-action",
    "Home Donate"
  );

  params.set(
    "action",
    "Transparency"
  );

  params.set(
    "button-id",
    "ViewTransparency"
  );

  params.set(
    "utm_source",
    "website"
  );

  params.set(
    "utm_medium",
    "organic"
  );

  params.set(
    "utm_campaign",
    "donation"
  );

  return `/transparency?${params.toString()}`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function DonateCTA() {
  return (
    <section
      id="donate"
      className="
        relative
        overflow-hidden
        bg-[#F5F8FA]
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:py-20
        lg:px-8
      "
    >

      {/* ===================================================
          BACKGROUND DECORATION
      ==================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          top-16
          h-72
          w-72
          rounded-full
          bg-[#087E8B]/8
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-20
          h-80
          w-80
          rounded-full
          bg-[#D6A63A]/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-3/4
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#D6A63A]/30
          to-transparent
        "
      />

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            MAIN CARD
        ================================================== */}

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-[#102A43]
            shadow-[0_25px_80px_rgba(16,42,67,0.18)]
            sm:rounded-[32px]
          "
        >

          <div
            className="
              grid
              lg:grid-cols-[1.08fr_0.92fr]
            "
          >

            {/* =============================================
                LEFT CONTENT
            ============================================== */}

            <div
              className="
                relative
                overflow-hidden
                p-6
                sm:p-9
                md:p-12
                lg:p-14
              "
            >

              {/* Decorative circles */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  border
                  border-white/5
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-32
                  left-0
                  h-72
                  w-72
                  rounded-full
                  border
                  border-[#087E8B]/10
                "
              />

              <div className="relative">

                {/* EYEBROW */}

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#D6A63A]" />

                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.28em]
                      text-[#D9B65A]
                    "
                  >
                    Support Our Work
                  </p>

                </div>

                {/* HEADING */}

                <h2
                  className="
                    mt-5
                    max-w-2xl
                    font-serif
                    text-3xl
                    font-black
                    leading-[1.08]
                    text-white
                    sm:text-4xl
                    md:text-5xl
                  "
                >
                  Your Support Can
                  <br />

                  <span className="text-[#D6A63A]">
                    Make A Difference
                  </span>
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-xs
                    leading-6
                    text-white/55
                    sm:text-sm
                  "
                >
                  Your contribution can support
                  charitable and community-focused
                  initiatives of Anand Jivan
                  Foundation Trust.
                </p>

                {/* =================================================
                    BENEFITS
                ================================================== */}

                <div
                  className="
                    mt-7
                    grid
                    gap-x-6
                    gap-y-4
                    sm:grid-cols-2
                  "
                >

                  {[
                    "Education & learning",
                    "Healthcare initiatives",
                    "Women empowerment",
                    "Community development",
                  ].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >

                        <div
                          className="
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#087E8B]/15
                          "
                        >

                          <CheckCircle2
                            size={15}
                            className="text-[#36B9C3]"
                          />

                        </div>

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            text-white/65
                            sm:text-[11px]
                          "
                        >
                          {item}
                        </span>

                      </div>
                    )
                  )}

                </div>

                {/* =================================================
                    BUTTONS
                ================================================== */}

                <div
                  className="
                    mt-8
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                  "
                >

                  {/* MAIN DONATE */}

                  <Link
                    href={donationUrl(
                      "DonateNow",
                      "Home"
                    )}
                    className="
                      group
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
                      shadow-[0_12px_30px_rgba(214,166,58,0.18)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#BD8D28]
                      hover:shadow-[0_16px_35px_rgba(214,166,58,0.25)]
                      focus:outline-none
                      focus:ring-4
                      focus:ring-[#D6A63A]/30
                    "
                  >

                    <Heart
                      size={15}
                      fill="currentColor"
                    />

                    Donate Now

                    <ArrowRight
                      size={14}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </Link>

                  {/* TRANSPARENCY */}

                  <Link
                    href={transparencyUrl()}
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
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-white/20
                      hover:bg-white/10
                      focus:outline-none
                      focus:ring-4
                      focus:ring-white/10
                    "
                  >
                    <BarChart3 size={14} />

                    View Transparency
                  </Link>

                </div>

                {/* =================================================
                    SECURITY MICRO INFO
                ================================================== */}

                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    items-center
                    gap-x-5
                    gap-y-2
                    border-t
                    border-white/10
                    pt-5
                  "
                >

                  <div className="flex items-center gap-2">

                    <LockKeyhole
                      size={13}
                      className="text-[#36B9C3]"
                    />

                    <span className="text-[8px] font-bold text-white/40">
                      Secure Payment
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <BadgeCheck
                      size={13}
                      className="text-[#D6A63A]"
                    />

                    <span className="text-[8px] font-bold text-white/40">
                      Donation Receipt
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <ShieldCheck
                      size={13}
                      className="text-[#36B9C3]"
                    />

                    <span className="text-[8px] font-bold text-white/40">
                      Trusted Process
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* =============================================
                RIGHT DONATION PANEL
            ============================================== */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#087E8B]
                to-[#0B4054]
                p-6
                sm:p-9
                md:p-12
              "
            >

              {/* Background */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-24
                  h-72
                  w-72
                  rounded-full
                  border
                  border-[#D6A63A]/20
                "
              />

              <div className="relative">

                {/* ICON */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    text-white
                    shadow-lg
                    backdrop-blur
                  "
                >
                  <HandHeart size={27} />
                </div>

                {/* TITLE */}

                <p
                  className="
                    mt-6
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.22em]
                    text-[#D9B65A]
                  "
                >
                  Choose Your Support
                </p>

                <h3
                  className="
                    mt-2
                    max-w-md
                    font-serif
                    text-2xl
                    font-black
                    leading-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  Every Contribution Matters
                </h3>

                <p className="mt-3 max-w-md text-xs leading-5 text-white/55">
                  Choose a suggested amount or continue
                  to the donation page to enter your own
                  contribution.
                </p>

                {/* =================================================
                    AMOUNT OPTIONS
                ================================================== */}

                <div className="mt-6 space-y-3">

                  {amounts.map(
                    (item) => (
                      <Link
                        key={item.buttonId}
                        href={donationUrl(
                          item.buttonId,
                          "Home Donate",
                          item.amount
                        )}
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
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-[#D6A63A]/50
                          hover:bg-white/[0.12]
                          hover:shadow-lg
                          focus:outline-none
                          focus:ring-4
                          focus:ring-white/10
                        "
                      >

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              bg-white/10
                              text-[#D9B65A]
                              transition
                              group-hover:bg-[#D6A63A]/20
                            "
                          >

                            <Heart
                              size={15}
                              fill="currentColor"
                            />

                          </div>

                          <div>

                            <p className="text-sm font-black text-white">
                              {item.label}
                            </p>

                            <p className="mt-0.5 text-[8px] text-white/40">
                              {item.text}
                            </p>

                          </div>

                        </div>

                        <ArrowRight
                          size={16}
                          className="
                            text-white/30
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:text-[#D9B65A]
                          "
                        />

                      </Link>
                    )
                  )}

                </div>

                {/* =================================================
                    CUSTOM AMOUNT
                ================================================== */}

                <Link
                  href={donationUrl(
                    "CustomAmount",
                    "Home Donate"
                  )}
                  className="
                    group
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-[#D6A63A]/35
                    bg-[#D6A63A]/10
                    px-4
                    py-3.5
                    text-[9px]
                    font-black
                    text-[#F0D58B]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[#D6A63A]
                    hover:bg-[#D6A63A]
                    hover:text-white
                  "
                >

                  Choose Your Own Amount

                  <Sparkles
                    size={13}
                    className="
                      transition
                      group-hover:rotate-12
                    "
                  />

                </Link>

                {/* =================================================
                    PAYMENT SECURITY
                ================================================== */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                    border-t
                    border-white/10
                    pt-5
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                    "
                  >

                    <ShieldCheck
                      size={18}
                      className="text-[#36B9C3]"
                    />

                  </div>

                  <div>

                    <p className="text-[9px] font-black text-white">
                      Secure Donation
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-white/35">
                      Payment processing through a
                      secure payment gateway.
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

        <div
          className="
            mt-5
            grid
            gap-3
            sm:grid-cols-3
          "
        >

          {/* SECURE */}

          <div
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#DCE5EA]
              bg-white
              px-5
              py-4
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF7F4]
                text-[#087E8B]
              "
            >

              <ShieldCheck size={19} />

            </div>

            <div>

              <p className="text-[10px] font-black text-[#102A43]">
                Secure Giving
              </p>

              <p className="mt-1 text-[8px] leading-4 text-[#8997A2]">
                Safe online donation process
              </p>

            </div>

          </div>

          {/* COMMUNITY */}

          <div
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#DCE5EA]
              bg-white
              px-5
              py-4
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#FFF8E8]
                text-[#D6A63A]
              "
            >

              <Users size={19} />

            </div>

            <div>

              <p className="text-[10px] font-black text-[#102A43]">
                Community Focused
              </p>

              <p className="mt-1 text-[8px] leading-4 text-[#8997A2]">
                Supporting people and communities
              </p>

            </div>

          </div>

          {/* IMPACT */}

          <div
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#DCE5EA]
              bg-white
              px-5
              py-4
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF7F4]
                text-[#087E8B]
              "
            >

              <Heart
                size={19}
                fill="currentColor"
              />

            </div>

            <div>

              <p className="text-[10px] font-black text-[#102A43]">
                Every Contribution Matters
              </p>

              <p className="mt-1 text-[8px] leading-4 text-[#8997A2]">
                Your support can create meaningful impact
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            FOOTNOTE
        ====================================================== */}

        <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">

          <div className="flex items-center gap-2">

            <LockKeyhole
              size={13}
              className="text-[#087E8B]"
            />

            <span className="text-[9px] font-semibold text-slate-400">
              Secure payment processing
            </span>

          </div>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <div className="flex items-center gap-2">

            <BadgeCheck
              size={13}
              className="text-[#D6A63A]"
            />

            <span className="text-[9px] font-semibold text-slate-400">
              Donation receipt available
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}