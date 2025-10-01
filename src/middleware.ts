import { NextResponse, NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "ar"];
const defaultLocale = "ar";

const publicPaths = ["/auth/signin", "/auth/signup", "/signin", "/signup"];

// Locale detection using Accept-Language header
function getPreferredLocale(request: NextRequest) {
  const negotiatorHeaders = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

// Check if the path is public
function isPathPublic(path: string) {
  return publicPaths.some((p) => path.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detect if the URL already has a locale prefix
  const localePrefix = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  const strippedPath = localePrefix
    ? pathname.replace(`/${localePrefix}`, "") || "/"
    : pathname;

  // If no locale prefix → redirect to preferred locale
  if (!localePrefix) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // If URL already has a locale → continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|webp|gif|ico|json$)).*)",
  ],
};
