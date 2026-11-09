
import {
  NextRequest,
  NextResponse,
} from "next/server";

const SESSION_COOKIE = "ajft_news_admin";

const DASHBOARD_URL = "/news-admin/dashboard";
const LOGIN_URL = "/news-admin/login";

const CONTENT_SIGNAL = "search=yes, ai-train=no";

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Serve Markdown representation to agents requesting it
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

  /* =====================================
     PROTECTED NEWS ADMIN ROUTES
  ===================================== */

  const isProtectedRoute =
    pathname === "/news-admin/dashboard" ||
    pathname.startsWith("/news-admin/dashboard/") ||
    pathname === "/news-admin/news" ||
    pathname.startsWith("/news-admin/news/");

  /* =====================================
     REDIRECT UNAUTHENTICATED USERS
  ===================================== */

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(LOGIN_URL, request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  /* =====================================
     ALREADY LOGGED-IN USER
  ===================================== */

  if (pathname === LOGIN_URL && isAuthenticated) {
    return NextResponse.redirect(
      new URL(DASHBOARD_URL, request.url)
    );
  }

  const response = NextResponse.next();

  response.headers.set(
    "Content-Signal",
    CONTENT_SIGNAL
  );

  return response;
}

export const config = {
  matcher: [
    "/",
    "/news-admin/dashboard/:path*",
    "/news-admin/news/:path*",
    "/news-admin/login",
  ],
};
