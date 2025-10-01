import { NextResponse, NextRequest } from "next/server";

const locales = ["en", "ar"]; // Supported locales
const defaultLocale = "ar"; // Default locale

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract the lang from the pathname (e.g., /en/login -> "en")
  const pathSegments = pathname.split("/");
  const lang = pathSegments[1]; // first segment

  // Check if the lang is supported
  const isSupportedLocale = locales.includes(lang);

  // Fallback to default locale if not supported
  const locale = isSupportedLocale ? lang : defaultLocale;

  // If the lang is not in the pathname, redirect to the localized version
  if (!isSupportedLocale) {
    const newPathname = `/${locale}${pathname}`;
    request.nextUrl.pathname = newPathname;
    return NextResponse.redirect(request.nextUrl);
  }

  // Already has a supported locale, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|api/|webhooks/stripe|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",
  ],
};
