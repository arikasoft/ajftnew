
import type { MetadataRoute } from "next";

const SITE_URL = "https://ajftrust.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/student/dashboard/",
          "/student/login/",
          "/student/exam/",
          "/news-admin/",
          "/webmail.aspx/",
          "/environment/dashboard/",
          "/environment/login/",
          "/programs/environment/dashboard/",
          "/programs/environment/login/",
          "/donate/success/",
          "/internship/status/",
          "/internship/success/",
          "/careers/status/",
          "/apply/track/",
          "/divyang/status/",
          "/divyang/track/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
