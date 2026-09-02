import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Anand Jivan Foundation Trust",
  description:
    "Anand Jivan Foundation Trust — Empowering Lives. Building a Better Tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Consent Mode - Load before analytics */}
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
        >
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];

              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'
                    ? '&l='+l
                    : '';

              j.async=true;

              j.src=
                'https://www.googletagmanager.com/gtm.js?id='
                + i + dl;

              f.parentNode.insertBefore(j,f);

            })(window,document,'script','dataLayer','GTM-MJTS5M8N');
          `}
        </Script>

        {/* CookieYes */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/5cfe4f28d3b2e213a2c75d46/script.js"
          strategy="beforeInteractive"
        />
      </head>

      <body
        suppressHydrationWarning
        className="bg-white text-gray-900 antialiased"
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJTS5M8N"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        <Header />

        <AnalyticsTracker />

        {children}

        <Footer />
      </body>
    </html>
  );
}