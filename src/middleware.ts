// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

// Simple locale detection (you can enhance this)
function getLocale(request: NextRequest) {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.includes("ar")) {
    return "ar";
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already contains a locale
  const pathnameHasLocale = locales.some(
    // pathname = the URL path without domain (e.g., "/about", "/products")
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  // If URL already has /en/ or /ar/, do nothing
  if (pathnameHasLocale) return;

  // Redirect to detected locale
  const locale = getLocale(request);
  // Transform: "/about" → "/en/about" or "/ar/about"
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|images|icons).*)",
  ],
};
