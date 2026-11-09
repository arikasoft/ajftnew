
import {
  NextRequest,
  NextResponse,
} from "next/server";

const SESSION_COOKIE = "ajft_news_admin";

const DASHBOARD_URL = "/news-admin/dashboard";
const LOGIN_URL = "/news-admin/login";

const CONTENT_SIGNAL = "search=yes, ai-train=no";

const SITE_URL = "https://ajftrust.org";

const HOMEPAGE_MARKDOWN = `# Anand Jivan Foundation Trust (AJFT)

> Official website of Anand Jivan Foundation Trust, a charitable trust based in Darbhanga, Bihar, India.

## Official Website

[Visit AJFT](https://ajftrust.org/)

## Public Information

[About the Trust](https://ajftrust.org/about)
[Governance](https://ajftrust.org/governance)
[Programmes](https://ajftrust.org/programs)
[Projects](https://ajftrust.org/projects)
[Impact](https://ajftrust.org/impact)
[Reports](https://ajftrust.org/reports)
[Transparency](https://ajftrust.org/transparency)
[News](https://ajftrust.org/news)
[Events](https://ajftrust.org/events)
[Contact](https://ajftrust.org/contact)
[Volunteer](https://ajftrust.org/volunteer)
[Donate](https://ajftrust.org/donate)

## Discovery

[LLMs.txt](https://ajftrust.org/llms.txt)
[XML Sitemap](https://ajftrust.org/sitemap.xml)
[Robots.txt](https://ajftrust.org/robots.txt)

## AI Guidance

Use official public pages as the primary source.
Do not invent Trust details, financial figures, beneficiaries or project outcomes.
Do not expose private applicant, donor, student or administrative information.
`;

const ROBOTS_TXT = `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /student/dashboard/
Disallow: /student/login/
Disallow: /student/exam/
Disallow: /news-admin/
Disallow: /webmail.aspx/
Disallow: /environment/dashboard/
Disallow: /environment/login/
Disallow: /programs/environment/dashboard/
Disallow: /programs/environment/login/
Disallow: /donate/success/
Disallow: /internship/status/
Disallow: /internship/success/
Disallow: /careers/status/
Disallow: /apply/track/
Disallow: /divyang/status/
Disallow: /divyang/track/

Content-Signal: ${CONTENT_SIGNAL}

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Robots.txt with Content-Signal
  if (pathname === "/robots.txt") {
    return new NextResponse(ROBOTS_TXT, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Signal": CONTENT_SIGNAL,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Markdown representation for AI agents
  if (
    pathname === "/" &&
    request.headers
      .get("accept")
      ?.includes("text/markdown")
  ) {
    return new NextResponse(HOMEPAGE_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Signal": CONTENT_SIGNAL,
        "Cache-Control": "public, max-age=3600",
        "Vary": "Accept",
      },
    });
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthenticated = session === "authenticated";

  // Protected News Admin routes
  const isProtectedRoute =
    pathname === "/news-admin/dashboard" ||
    pathname.startsWith("/news-admin/dashboard/") ||
    pathname === "/news-admin/news" ||
    pathname.startsWith("/news-admin/news/");

  // Redirect unauthenticated users
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(LOGIN_URL, request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Redirect already logged-in users
  if (pathname === LOGIN_URL && isAuthenticated) {
    return NextResponse.redirect(
      new URL(DASHBOARD_URL, request.url)
    );
  }

  const response = NextResponse.next();

  // Add AI content signal to public pages only
  if (!pathname.startsWith("/news-admin")) {
    response.headers.set(
      "Content-Signal",
      CONTENT_SIGNAL
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/robots.txt",
    "/((?!api/|_next/|favicon.ico|.*\\..*).*)",
  ],
};
