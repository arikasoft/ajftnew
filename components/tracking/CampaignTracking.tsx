"use client";

import { useEffect } from "react";

interface TrackingData {
  sourceAction: string;
  action: string;
  buttonId: string;
  section: string;
  landingPage: string;
  timestamp: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getActionFromPath(pathname: string) {
  if (pathname.includes("/donate")) {
    return "Donate";
  }

  if (pathname.includes("/careers")) {
    return "Career";
  }

  if (pathname.includes("/contact")) {
    return "Contact";
  }

  if (pathname.includes("/volunteer")) {
    return "Volunteer";
  }

  if (pathname.includes("/internship")) {
    return "Internship";
  }

  if (pathname.includes("/projects")) {
    return "Project";
  }

  if (pathname.includes("/events")) {
    return "Event";
  }

  return "View";
}

function getButtonId(
  anchor: HTMLAnchorElement,
  section: string,
  href: string
) {
  const explicitId =
    anchor.dataset.buttonId;

  if (explicitId) {
    return explicitId;
  }

  const text =
    anchor.textContent
      ?.replace(/\s+/g, " ")
      .trim()
      .toLowerCase() || "";

  if (
    href.includes("/donate") ||
    text.includes("donate")
  ) {
    return "DonateNow";
  }

  if (
    href.includes("/careers") ||
    text.includes("career") ||
    text.includes("apply")
  ) {
    return "CareerApply";
  }

  if (
    href.includes("/volunteer") ||
    text.includes("volunteer")
  ) {
    return "VolunteerNow";
  }

  if (
    href.includes("/contact") ||
    text.includes("contact")
  ) {
    return "ContactUs";
  }

  if (
    text.includes("read more") ||
    text.includes("learn more")
  ) {
    return "LearnMore";
  }

  const sectionSlug =
    createSlug(section || "home");

  return `${sectionSlug}Link`;
}

export default function CampaignTracking() {
  useEffect(() => {
    /* =====================================================
       1. READ EXISTING CAMPAIGN PARAMETERS
    ====================================================== */

    const params =
      new URLSearchParams(
        window.location.search
      );

    const sourceAction =
      params.get("source-action") || "";

    const action =
      params.get("action") || "";

    const buttonId =
      params.get("button-id") || "";

    const utmSource =
      params.get("utm_source") || "";

    const utmMedium =
      params.get("utm_medium") || "";

    const utmCampaign =
      params.get("utm_campaign") || "";

    const utmContent =
      params.get("utm_content") || "";

    const utmTerm =
      params.get("utm_term") || "";

    /* =====================================================
       2. SAVE CAMPAIGN
    ====================================================== */

    const campaignData = {
      sourceAction,
      action,
      buttonId,

      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,

      landingPage:
        window.location.pathname,

      landingUrl:
        window.location.href,

      timestamp:
        new Date().toISOString(),
    };

    if (
      sourceAction ||
      action ||
      buttonId ||
      utmSource ||
      utmMedium ||
      utmCampaign
    ) {
      sessionStorage.setItem(
        "ajft_campaign_tracking",
        JSON.stringify(
          campaignData
        )
      );

      /*
       * Keep campaign information
       * for the complete visitor session.
       */
      localStorage.setItem(
        "ajft_campaign_tracking",
        JSON.stringify(
          campaignData
        )
      );
    }

    /* =====================================================
       3. DATA LAYER
    ====================================================== */

    window.dataLayer =
      window.dataLayer || [];

    window.dataLayer.push({
      event:
        "ajft_page_view",

      source_action:
        sourceAction,

      action,

      button_id:
        buttonId,

      utm_source:
        utmSource,

      utm_medium:
        utmMedium,

      utm_campaign:
        utmCampaign,

      utm_content:
        utmContent,

      utm_term:
        utmTerm,

      page_path:
        window.location.pathname,
    });

    /* =====================================================
       4. TRACK INTERNAL LINKS
    ====================================================== */

    function handleClick(
      event: MouseEvent
    ) {
      /*
       * Ignore modified clicks.
       */
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target =
        event.target as HTMLElement;

      const anchor =
        target.closest(
          "a"
        ) as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      const href =
        anchor.getAttribute(
          "href"
        );

      if (!href) {
        return;
      }

      /*
       * Ignore external URLs.
       */
      if (
        href.startsWith(
          "http://"
        ) ||
        href.startsWith(
          "https://"
        ) ||
        href.startsWith(
          "mailto:"
        ) ||
        href.startsWith(
          "tel:"
        ) ||
        href.startsWith(
          "#"
        )
      ) {
        return;
      }

      /*
       * Ignore download links.
       */
      if (
        anchor.hasAttribute(
          "download"
        )
      ) {
        return;
      }

      const sectionElement =
        anchor.closest(
          "[data-source-action]"
        ) as HTMLElement | null;

      const section =
        sectionElement
          ?.dataset
          .sourceAction ||
        "Home";

      const sectionName =
        sectionElement
          ?.dataset
          .section ||
        "Home";

      const calculatedAction =
        getActionFromPath(
          href
        );

      const calculatedButtonId =
        getButtonId(
          anchor,
          sectionName,
          href
        );

      /*
       * Build tracking URL.
       */
      const destination =
        new URL(
          href,
          window.location.origin
        );

      destination.searchParams.set(
        "source-action",
        section
      );

      destination.searchParams.set(
        "action",
        calculatedAction
      );

      destination.searchParams.set(
        "button-id",
        calculatedButtonId
      );

      /*
       * Preserve existing UTM values.
       */
      const saved =
        localStorage.getItem(
          "ajft_campaign_tracking"
        );

      if (saved) {
        try {
          const savedData =
            JSON.parse(saved);

          if (
            savedData.utmSource
          ) {
            destination.searchParams.set(
              "utm_source",
              savedData.utmSource
            );
          }

          if (
            savedData.utmMedium
          ) {
            destination.searchParams.set(
              "utm_medium",
              savedData.utmMedium
            );
          }

          if (
            savedData.utmCampaign
          ) {
            destination.searchParams.set(
              "utm_campaign",
              savedData.utmCampaign
            );
          }

          if (
            savedData.utmContent
          ) {
            destination.searchParams.set(
              "utm_content",
              savedData.utmContent
            );
          }

          if (
            savedData.utmTerm
          ) {
            destination.searchParams.set(
              "utm_term",
              savedData.utmTerm
            );
          }
        } catch {
          // Ignore invalid stored campaign data.
        }
      }

      /*
       * Record click.
       */
      window.dataLayer?.push({
        event:
          "ajft_button_click",

        source_action:
          section,

        action:
          calculatedAction,

        button_id:
          calculatedButtonId,

        destination:
          destination.pathname,
      });

      /*
       * Store latest click.
       */
      sessionStorage.setItem(
        "ajft_last_click",
        JSON.stringify({
          sourceAction:
            section,

          action:
            calculatedAction,

          buttonId:
            calculatedButtonId,

          destination:
            destination.pathname,

          timestamp:
            new Date().toISOString(),
        })
      );

      /*
       * Replace URL without creating
       * an additional browser history entry.
       */
      event.preventDefault();

      window.location.href =
        destination.toString();
    }

    document.addEventListener(
      "click",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  return null;
}