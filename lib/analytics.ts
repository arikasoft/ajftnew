"use client";

export type AnalyticsEventName =
  | "donate_click"
  | "volunteer_click"
  | "contact_click"
  | "report_download"
  | "verify_click"
  | "facebook_click"
  | "instagram_click"
  | "x_click"
  | "phone_click"
  | "email_click"
  | "external_link_click";

export async function trackEvent(
  eventName: AnalyticsEventName,
  options?: {
    category?: string;
    data?: Record<string, unknown>;
  }
) {
  try {
    const visitorId =
      localStorage.getItem("ajft_visitor_id");

    const sessionId =
      sessionStorage.getItem("ajft_session_id");

    if (!visitorId || !sessionId) {
      return;
    }

    await fetch("/api/analytics/track", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        type: "event",

        visitorId,
        sessionId,

        path: window.location.pathname,

        eventName,

        eventCategory:
          options?.category || "general",

        eventData:
          options?.data || {},
      }),

      keepalive: true,
    });
  } catch (error) {
    console.error(
      "Event tracking failed:",
      error
    );
  }
}