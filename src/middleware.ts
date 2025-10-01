import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "ar";

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.includes("ar")) return "ar";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has locale?
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (hasLocale) {
    return NextResponse.next(); // ✅ Continue request properly
  }

  // Detect locale
  const locale = getLocale(request);

  // Clone URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/|api/|webhooks/stripe|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",
  ],
};
