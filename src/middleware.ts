import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "ar"; // change to "en" if your default is English

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.includes("ar")) return "ar";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Skip favicon, _next, API routes, Stripe webhooks, and static files
  if (
    pathname === "/favicon.ico" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/webhooks/stripe") ||
    pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)$/)
  ) {
    return NextResponse.next();
  }

  // ✅ Check if the URL already contains a supported locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // ✅ Detect locale from Accept-Language header
  const locale = getLocale(request);

  // ✅ Redirect to the localized version
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

// ✅ Matcher: all paths; middleware skips static files internally
export const config = {
  matcher: "/:path*",
};
