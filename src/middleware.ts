import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "ar";

const publicPaths = ["/auth/signin", "/auth/signup", "/signin", "/signup"];

// Simple locale detection from Accept-Language header
function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const acceptedLanguages = acceptLanguage.split(",").map((lang) => {
    // remove q-values
    return lang.split(";")[0].trim();
  });

  // Return the first match in locales
  for (const lang of acceptedLanguages) {
    if (locales.includes(lang)) return lang;
    // match prefix only (e.g., "en-US" -> "en")
    const prefix = lang.split("-")[0];
    if (locales.includes(prefix)) return prefix;
  }

  return defaultLocale;
}

// Check if path is public
function isPathPublic(path: string) {
  return publicPaths.some((p) => path.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, favicon, _next, APIs, webhooks
  if (
    pathname === "/favicon.ico" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/webhooks/stripe") ||
    pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)$/)
  ) {
    return NextResponse.next();
  }

  // Detect locale prefix
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

  // URL already has a locale → continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|webp|gif|ico|json$)).*)",
  ],
};
