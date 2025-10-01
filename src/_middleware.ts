import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "ar";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|json)$/)
  ) {
    return NextResponse.next();
  }

  // Detect locale prefix
  const localePrefix = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!localePrefix) {
    // Simple Accept-Language detection
    const acceptLanguage = request.headers.get("accept-language") || "";
    const preferred =
      locales.find((l) => acceptLanguage.includes(l)) || defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
