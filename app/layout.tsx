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
    <html lang="en">
      <head>
        {/* Consent Mode - MUST load before Google Analytics */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* CookieYes Banner */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/5cfe4f28d3b2e213a2c75d46/script.js"
          strategy="beforeInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JB64YSPXVE"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-JB64YSPXVE');
          `}
        </Script>
      </head>

      <body className="bg-white text-gray-900 antialiased">
        <Header />

        <AnalyticsTracker />

        {children}

        <Footer />
      </body>
    </html>
  );
}
