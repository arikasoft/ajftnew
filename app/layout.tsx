import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Anand Jivan Foundation Trust",
  description:
    "Anand Jivan Foundation Trust — Empowering Lives. Building a Better Tomorrow.",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">

        {/* Website Header */}
        <Header />

        {/* Visitor Analytics */}
        <AnalyticsTracker />

        {/* Page Content */}
        {children}

        {/* Website Footer */}
        <Footer />

      </body>
    </html>
  );
}