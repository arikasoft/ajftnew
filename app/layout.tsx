
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

const SITE_URL = "https://ajftrust.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Anand Jivan Foundation Trust | AJFT",
    template: "%s | Anand Jivan Foundation Trust",
  },

  description:
    "Anand Jivan Foundation Trust (AJFT), a charitable trust based in Darbhanga, Bihar, India. Explore our education, healthcare, child welfare, community development and social welfare programmes.",

  applicationName: "Anand Jivan Foundation Trust",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Anand Jivan Foundation Trust",
    title: "Anand Jivan Foundation Trust | AJFT",
    description:
      "Empowering Lives. Building a Better Tomorrow.",
  },

  twitter: {
    card: "summary",
    title: "Anand Jivan Foundation Trust | AJFT",
    description:
      "Empowering Lives. Building a Better Tomorrow.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,

  name: "Anand Jivan Foundation Trust",
  alternateName: "AJFT",
  url: SITE_URL,

  description:
    "Anand Jivan Foundation Trust is a charitable trust based in Darbhanga, Bihar, India, working in education, healthcare, child welfare, community development and social welfare.",

  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },

  email: "info@ajftrust.org",
  telephone: "+91-9155751363",

  sameAs: [
    "https://www.facebook.com/ajftrust",
    "https://www.instagram.com/ajftrusts",
    "https://x.com/ajftrust",
  ],

  address: {
    "@type": "PostalAddress",
    addressLocality: "Darbhanga",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9155751363",
    email: "info@ajftrust.org",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,

  name: "Anand Jivan Foundation Trust",
  alternateName: "AJFT",
  url: SITE_URL,

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: ["en-IN", "hi-IN"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization Structured Data */}
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {/* Website Structured Data */}
        <script
          id="website-schema"
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
