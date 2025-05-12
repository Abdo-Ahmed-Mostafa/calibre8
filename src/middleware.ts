import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = routing.locales;
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  // توجيه المستخدم إذا كانت اللغة غير موجودة في المسار
  if (!hasLocale) {
    const redirectLocale = pathname === "/" ? routing.defaultLocale : "en";
    return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
