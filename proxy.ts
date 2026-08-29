import {
  NextRequest,
  NextResponse,
} from "next/server";

const SESSION_COOKIE =
  "ajft_news_admin";

const DASHBOARD_URL =
  "/news-admin/dashboard";

const LOGIN_URL =
  "/news-admin/login";

export function proxy(
  request: NextRequest
) {
  const { pathname } =
    request.nextUrl;

  const session =
    request.cookies.get(
      SESSION_COOKIE
    )?.value;

  const isAuthenticated =
    session === "authenticated";

  /* =====================================
     PROTECTED NEWS ADMIN ROUTES
  ===================================== */

  const isProtectedRoute =
    pathname ===
      "/news-admin/dashboard" ||

    pathname.startsWith(
      "/news-admin/dashboard/"
    ) ||

    pathname ===
      "/news-admin/news" ||

    pathname.startsWith(
      "/news-admin/news/"
    );

  /* =====================================
     REDIRECT UNAUTHENTICATED USERS
  ===================================== */

  if (
    isProtectedRoute &&
    !isAuthenticated
  ) {
    const loginUrl =
      new URL(
        LOGIN_URL,
        request.url
      );

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(
      loginUrl
    );
  }

  /* =====================================
     ALREADY LOGGED-IN USER
  ===================================== */

  if (
    pathname === LOGIN_URL &&
    isAuthenticated
  ) {
    return NextResponse.redirect(
      new URL(
        DASHBOARD_URL,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/news-admin/dashboard/:path*",
    "/news-admin/news/:path*",
    "/news-admin/login",
  ],
};