"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Award,
  CheckCircle2,
  Download,
  FileCheck2,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
} from "lucide-react";

import QRCodeGenerator from "qrcode";


type CertificateData = {
  eligible: boolean;
  certificateId: string;
  studentId: string;
  fullName: string;
  course: string;
};


export default function CertificatePage() {
  const [
    certificate,
    setCertificate,
  ] =
    useState<CertificateData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState("");

  const [
    qrCode,
    setQrCode,
  ] =
    useState("");

  const [
    verificationUrl,
    setVerificationUrl,
  ] =
    useState("");


  useEffect(() => {
    async function loadCertificate() {
      try {
        setError("");

        const response =
          await fetch(
            "/api/student/certificate",
            {
              cache: "no-store",
              credentials: "include",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          setError(
            result.message ||
              "Unable to load certificate."
          );

          return;
        }

        if (result.success) {
          setCertificate(
            result.data
          );
        } else {
          setError(
            result.message ||
              "Certificate data is unavailable."
          );
        }
      } catch (error) {
        console.error(
          "CERTIFICATE ERROR:",
          error
        );

        setError(
          "Unable to load certificate. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, []);


  useEffect(() => {
    async function generateQR() {
      if (
        !certificate?.certificateId ||
        typeof window === "undefined"
      ) {
        return;
      }

      try {
        const url =
          `${window.location.origin}/certificate/verify/${encodeURIComponent(
            certificate.certificateId
          )}`;

        setVerificationUrl(url);

        const qr =
          await QRCodeGenerator.toDataURL(
            url,
            {
              width: 500,
              margin: 1,
              errorCorrectionLevel: "H",
              color: {
                dark: "#071a38",
                light: "#FFFFFF",
              },
            }
          );

        setQrCode(qr);
      } catch (error) {
        console.error(
          "QR GENERATION ERROR:",
          error
        );
      }
    }

    generateQR();
  }, [certificate]);


  function handleDownload() {
    window.print();
  }


  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07152f]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(6,91,156,0.25),transparent_40%)]" />

        <div className="relative flex flex-col items-center gap-4 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)]">

            <Loader2 className="h-9 w-9 animate-spin text-[#d4af37]" />

          </div>

          <p className="text-sm font-bold tracking-[0.2em] text-white/70">
            PREPARING YOUR CERTIFICATE
          </p>

        </div>

      </div>
    );
  }


  if (!certificate?.eligible) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07152f] p-6">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(7,146,159,0.18),transparent_35%)]" />

        <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#d4af37]/30 bg-white p-10 text-center shadow-2xl">

          <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#8b6514] via-[#f6dc77] to-[#8b6514]" />

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-[#fff8df] text-[#b8860b] shadow-lg">

            <Lock className="h-11 w-11" />

          </div>

          <p className="mt-7 text-xs font-black tracking-[0.28em] text-[#b8860b]">
            CERTIFICATE STATUS
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#081a38]">
            Certificate Locked
          </h1>

          <p className="mt-5 text-sm leading-7 text-slate-500">

            Score at least{" "}

            <span className="font-black text-[#b8860b]">
              45 marks out of 70
            </span>{" "}

            to unlock your official programme completion certificate.

          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          <Link
            href="/student/results"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#08265a] via-[#0a4f8c] to-[#087b89] px-6 py-4 text-sm font-black text-white shadow-lg"
          >

            <Award className="h-5 w-5" />

            View Examination Result

          </Link>

        </div>

      </main>
    );
  }


  return (
    <>

      <main className="min-h-screen overflow-hidden bg-[#eef1f5] px-3 py-6 sm:px-6 sm:py-10">

        <section className="mx-auto max-w-[1450px]">


          {/* PAGE HEADER */}

          <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff6d6] text-[#b8860b]">

                <Award className="h-6 w-6" />

              </div>

              <div>

                <p className="text-[10px] font-black tracking-[0.22em] text-[#b8860b]">
                  AJFT DIGITAL CERTIFICATION
                </p>

                <h2 className="text-lg font-black text-[#071a38]">
                  Programme Completion Certificate
                </h2>

              </div>

            </div>


            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#08265a] via-[#0a4f8c] to-[#087b89] px-6 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
            >

              <Download className="h-5 w-5" />

              Download / Save PDF

            </button>

          </div>


          {/* CERTIFICATE PREVIEW */}

          <div className="certificate-preview-wrapper">

            <div
              id="ajft-certificate"
              className="certificate-print"
            >


              {/* OUTER GOLD BORDER */}

              <div className="pointer-events-none absolute inset-0 border-[7px] border-[#8f6816]" />


              {/* GOLD INNER BORDER */}

              <div className="pointer-events-none absolute inset-[11px] border-[3px] border-[#d4af37]" />


              {/* INNER BLUE BORDER */}

              <div className="pointer-events-none absolute inset-[19px] border border-[#071a38]/30" />


              {/* GOLD CORNERS */}

              <div className="pointer-events-none absolute left-7 top-7 h-16 w-16 border-l-4 border-t-4 border-[#d4af37]" />

              <div className="pointer-events-none absolute right-7 top-7 h-16 w-16 border-r-4 border-t-4 border-[#d4af37]" />

              <div className="pointer-events-none absolute bottom-7 left-7 h-16 w-16 border-b-4 border-l-4 border-[#d4af37]" />

              <div className="pointer-events-none absolute bottom-7 right-7 h-16 w-16 border-b-4 border-r-4 border-[#d4af37]" />


              {/* TOP GOLD LINE */}

              <div className="absolute left-0 top-0 z-10 h-2 w-full bg-gradient-to-r from-[#8b6514] via-[#f8df79] to-[#8b6514]" />


              {/* WATERMARK */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.045]">

                <img
                  src="/logo.png"
                  alt=""
                  className="h-[430px] w-[430px] object-contain"
                />

              </div>


              {/* MAIN CONTENT */}

              <div className="relative z-10 flex h-full flex-col px-[5.5%] py-[3.5%]">


                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-[#d4af37]/40 pb-[1.5%]">

                  <div className="flex items-center gap-5">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#d4af37] bg-white p-2 shadow-md">

                      <img
                        src="/logo.png"
                        alt="Anand Jivan Foundation Trust"
                        className="h-full w-full object-contain"
                      />

                    </div>


                    <div>

                      <p className="text-xs font-black tracking-[0.25em] text-[#b8860b]">
                        ANAND JIVAN FOUNDATION TRUST
                      </p>

                      <p className="mt-2 text-xs font-semibold tracking-wide text-slate-500">
                        Empowering Lives • Building Futures
                      </p>

                    </div>

                  </div>


                  <div className="text-right">

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-[#fff9e8] px-4 py-2 text-[10px] font-black tracking-[0.15em] text-[#9b7318]">

                      <ShieldCheck className="h-4 w-4" />

                      DIGITALLY VERIFIED

                    </div>


                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Certificate No.
                    </p>

                    <p className="mt-1 text-sm font-black text-[#071a38]">
                      {certificate.certificateId}
                    </p>

                  </div>

                </div>


                {/* TITLE */}

                <div className="pt-[1.7%] text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#fff8df] text-[#b8860b]">

                    <Award className="h-8 w-8" />

                  </div>


                  <p className="mt-3 text-xs font-black tracking-[0.35em] text-[#b8860b]">
                    CERTIFICATE OF COMPLETION
                  </p>


                  <h1 className="mt-2 font-serif text-5xl font-bold tracking-[0.1em] text-[#071a38]">
                    CERTIFICATE
                  </h1>


                  <p className="mt-1 text-lg font-serif font-semibold tracking-[0.35em] text-[#223454]">
                    OF COMPLETION
                  </p>


                  <div className="mx-auto mt-3 h-px w-40 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                </div>


                {/* STUDENT */}

                <div className="mt-[1.7%] text-center">

                  <p className="text-sm italic text-slate-500">
                    This certificate is proudly presented to
                  </p>


                  <h2 className="mt-2 font-serif text-6xl font-bold leading-tight text-[#08265a]">

                    {certificate.fullName}

                  </h2>


                  <div className="mx-auto mt-3 h-px w-[45%] bg-[#d4af37]/60" />


                  <p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-slate-600">

                    In recognition of successfully completing the
                    prescribed learning requirements and demonstrating
                    dedication, commitment and professional excellence.

                  </p>


                  <h3 className="mt-3 text-3xl font-black text-[#071a38]">

                    {certificate.course}

                  </h3>

                </div>


                {/* DETAILS */}

                <div className="mx-auto mt-[2%] grid w-[88%] grid-cols-3 gap-[1.2%]">

                  <div className="rounded-2xl border border-[#d4af37]/30 bg-white/80 p-4 text-center shadow-sm">

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b8860b]">
                      Student ID
                    </p>

                    <p className="mt-2 text-sm font-black text-[#071a38]">
                      {certificate.studentId}
                    </p>

                  </div>


                  <div className="rounded-2xl border border-[#d4af37]/30 bg-white/80 p-4 text-center shadow-sm">

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b8860b]">
                      Certificate ID
                    </p>

                    <p className="mt-2 text-sm font-black text-[#071a38]">
                      {certificate.certificateId}
                    </p>

                  </div>


                  <div className="rounded-2xl border border-[#d4af37]/30 bg-white/80 p-4 text-center shadow-sm">

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b8860b]">
                      Certificate Status
                    </p>

                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-black text-emerald-600">

                      <CheckCircle2 className="h-5 w-5" />

                      VERIFIED

                    </div>

                  </div>

                </div>


                {/* BOTTOM SECTION */}

                <div className="mt-auto grid grid-cols-3 items-end gap-[3%] border-t border-[#d4af37]/30 pt-[2%]">


                  {/* QR */}

                  <div>

                    <div className="inline-flex rounded-2xl border-2 border-[#d4af37] bg-white p-2 shadow-md">

                      <div className="flex h-24 w-24 items-center justify-center bg-white">

                        {qrCode ? (

                          <img
                            src={qrCode}
                            alt="Certificate Verification QR Code"
                            className="h-full w-full object-contain"
                          />

                        ) : (

                          <QrCode className="h-16 w-16 text-[#071a38]" />

                        )}

                      </div>

                    </div>


                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Scan QR to Verify
                    </p>

                    <p className="hidden max-w-[180px] break-all text-[8px] text-slate-400">
                      {verificationUrl}
                    </p>

                  </div>


                  {/* OFFICIAL SEAL */}

                  <div className="flex flex-col items-center">

                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-[#b8860b] bg-[#fff8df] text-center shadow-md">

                      <div>

                        <Award className="mx-auto h-8 w-8 text-[#b8860b]" />

                        <p className="mt-1 text-[9px] font-black tracking-wider text-[#8b6514]">
                          AJFT
                        </p>

                        <p className="text-[7px] font-bold text-[#8b6514]">
                          CERTIFIED
                        </p>

                      </div>

                    </div>


                    <p className="mt-2 text-center text-[10px] font-black tracking-[0.15em] text-[#b8860b]">
                      OFFICIAL CERTIFICATION
                    </p>

                  </div>


                  {/* SIGNATURE */}

                  <div className="text-right">

                    <div className="ml-auto mb-3 flex h-10 w-44 items-end justify-center border-b-2 border-[#071a38]">

                      <span className="font-serif text-2xl italic text-[#08265a]">
                        Authorized
                      </span>

                    </div>


                    <p className="text-sm font-black text-[#071a38]">
                      Authorized Signatory
                    </p>

                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Anand Jivan Foundation Trust
                    </p>

                  </div>

                </div>


                {/* FOOTER */}

                <div className="mt-[1.2%] border-t border-[#d4af37]/30 pt-[1%] text-center">

                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600">

                    <CheckCircle2 className="h-4 w-4" />

                    Digitally Generated & Verified Certificate

                  </div>


                  <p className="mt-1 text-[9px] leading-relaxed text-slate-400">

                    This certificate has been digitally generated by
                    Anand Jivan Foundation Trust and can be verified
                    using the Certificate ID or QR verification system.

                  </p>

                </div>

              </div>


              {/* BOTTOM GOLD LINE */}

              <div className="absolute bottom-0 left-0 z-10 h-2 w-full bg-gradient-to-r from-[#8b6514] via-[#f8df79] to-[#8b6514]" />

            </div>

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row print:hidden">

            <button
              onClick={handleDownload}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8b6514] via-[#c79b28] to-[#8b6514] px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1 sm:w-auto"
            >

              <Download className="h-5 w-5" />

              Download Certificate

            </button>


            <Link
              href="/student/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black text-[#071a38] shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >

              <FileCheck2 className="h-5 w-5" />

              Student Dashboard

            </Link>

          </div>

        </section>

      </main>


      {/* =====================================================
          EXACT SINGLE A4 LANDSCAPE PRINT
      ===================================================== */}

      <style jsx global>{`

        .certificate-preview-wrapper {
          width: 100%;
          overflow-x: auto;
          display: flex;
          justify-content: center;
          padding-bottom: 15px;
        }


        #ajft-certificate {

          position: relative;

          width: 1122px;
          height: 793px;

          min-width: 1122px;
          min-height: 793px;

          max-width: 1122px;
          max-height: 793px;

          background: #fffdf7;

          overflow: hidden;

          box-shadow:
            0 30px 80px
            rgba(7, 26, 56, 0.18);

        }


        @media (max-width: 1150px) {

          .certificate-preview-wrapper {
            justify-content: flex-start;
          }

          #ajft-certificate {

            transform-origin: top left;

          }

        }


        @page {
          size: A4 landscape;
          margin: 0;
        }


        @media print {

          html {

            width: 297mm !important;
            height: 210mm !important;

            margin: 0 !important;
            padding: 0 !important;

            overflow: hidden !important;

          }


          body {

            width: 297mm !important;
            height: 210mm !important;

            margin: 0 !important;
            padding: 0 !important;

            overflow: hidden !important;

            background: #ffffff !important;

            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;

          }


          body > * {
            visibility: hidden !important;
          }


          #ajft-certificate,
          #ajft-certificate * {

            visibility: visible !important;

          }


          #ajft-certificate {

            position: fixed !important;

            left: 0 !important;
            top: 0 !important;

            width: 297mm !important;
            height: 210mm !important;

            min-width: 297mm !important;
            min-height: 210mm !important;

            max-width: 297mm !important;
            max-height: 210mm !important;

            margin: 0 !important;
            padding: 0 !important;

            overflow: hidden !important;

            box-shadow: none !important;

            border-radius: 0 !important;

            background: #fffdf7 !important;

            page-break-before: avoid !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;

            break-before: avoid-page !important;
            break-after: avoid-page !important;
            break-inside: avoid !important;

          }


          .certificate-preview-wrapper {

            position: fixed !important;

            left: 0 !important;
            top: 0 !important;

            width: 297mm !important;
            height: 210mm !important;

            margin: 0 !important;
            padding: 0 !important;

            overflow: hidden !important;

            display: block !important;

          }


          .print\\:hidden {
            display: none !important;
          }


          button,
          a,
          header,
          nav,
          footer {
            visibility: hidden !important;
          }

        }

      `}</style>

    </>
  );
}