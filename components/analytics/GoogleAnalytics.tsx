"use client";

import { useEffect } from "react";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

const GA_MEASUREMENT_ID =
  "G-JB64YSPXVE";

declare global {
  interface Window {
    gtag?: (
      command: string,
      target: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  useEffect(() => {
    if (
      !pathname ||
      typeof window === "undefined" ||
      !window.gtag
    ) {
      return;
    }

    const query =
      searchParams.toString();

    const pagePath =
      query
        ? `${pathname}?${query}`
        : pathname;

    window.gtag(
      "event",
      "page_view",
      {
        page_path: pagePath,
        page_title:
          document.title,
        page_location:
          window.location.href,
      }
    );
  }, [
    pathname,
    searchParams,
  ]);

  return null;
}