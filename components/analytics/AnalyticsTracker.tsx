"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "ajft_visitor_id";
const SESSION_KEY = "ajft_session_id";
const SESSION_TIME_KEY = "ajft_session_time";

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_KEY);

  if (!visitorId) {
    visitorId = createId("visitor");
    localStorage.setItem(VISITOR_KEY, visitorId);
  }

  return visitorId;
}

function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = createId("session");
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  sessionStorage.setItem(
    SESSION_TIME_KEY,
    Date.now().toString()
  );

  return sessionId;
}

function getDeviceType() {
  if (window.innerWidth < 768) {
    return "mobile";
  }

  if (window.innerWidth < 1024) {
    return "tablet";
  }

  return "desktop";
}

function getBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Edg")) {
    return "Edge";
  }

  if (ua.includes("Chrome")) {
    return "Chrome";
  }

  if (ua.includes("Firefox")) {
    return "Firefox";
  }

  if (ua.includes("Safari")) {
    return "Safari";
  }

  if (ua.includes("Opera") || ua.includes("OPR")) {
    return "Opera";
  }

  return "Other";
}

function getOperatingSystem() {
  const ua = navigator.userAgent;

  if (/Windows/i.test(ua)) {
    return "Windows";
  }

  if (/Android/i.test(ua)) {
    return "Android";
  }

  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "iOS";
  }

  if (/Mac OS/i.test(ua)) {
    return "macOS";
  }

  if (/Linux/i.test(ua)) {
    return "Linux";
  }

  return "Other";
}

function getTrafficSource() {
  const params = new URLSearchParams(
    window.location.search
  );

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium || "unknown",
    };
  }

  const referrer = document.referrer;

  if (!referrer) {
    return {
      source: "direct",
      medium: "none",
    };
  }

  try {
    const hostname = new URL(referrer).hostname;

    if (hostname.includes("google.")) {
      return {
        source: "google",
        medium: "organic",
      };
    }

    if (hostname.includes("facebook.")) {
      return {
        source: "facebook",
        medium: "social",
      };
    }

    if (hostname.includes("instagram.")) {
      return {
        source: "instagram",
        medium: "social",
      };
    }

    if (hostname.includes("twitter.") || hostname.includes("x.com")) {
      return {
        source: "x",
        medium: "social",
      };
    }

    if (hostname.includes("youtube.")) {
      return {
        source: "youtube",
        medium: "social",
      };
    }

    return {
      source: hostname,
      medium: "referral",
    };
  } catch {
    return {
      source: "unknown",
      medium: "referral",
    };
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  const firstRender = useRef(true);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const trackPageView = async () => {
      try {
        const visitorId = getVisitorId();
        const sessionId = getSessionId();

        const traffic = getTrafficSource();

        const payload = {
          type: "pageview",

          visitorId,
          sessionId,

          path: pathname,

          title: document.title,

          referrer: document.referrer || null,

          source: traffic.source,
          medium: traffic.medium,

          deviceType: getDeviceType(),

          browser: getBrowser(),

          operatingSystem: getOperatingSystem(),

          screenWidth: window.screen.width,

          screenHeight: window.screen.height,
        };

        await fetch("/api/analytics/track", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),

          keepalive: true,
        });
      } catch (error) {
        console.error(
          "Analytics tracking failed:",
          error
        );
      }
    };

    trackPageView();

    firstRender.current = false;
  }, [pathname]);

  return null;
}