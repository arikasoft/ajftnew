
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

const SITE_URL = "https://ajftrust.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Anand Jivan Foundation Trust",

  description:
    "Anand Jivan Foundation Trust — Empowering Lives. Building a Better Tomorrow.",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Anand Jivan Foundation Trust",
    title: "Anand Jivan Foundation Trust",
    description:
      "Empowering Lives. Building a Better Tomorrow.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Anand Jivan Foundation Trust",
  url: SITE_URL,
  description:
    "Anand Jivan Foundation Trust — Empowering Lives. Building a Better Tomorrow.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Darbhanga, Bihar, India",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Anand Jivan Foundation Trust",
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

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
