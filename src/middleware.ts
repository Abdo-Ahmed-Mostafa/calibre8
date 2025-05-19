import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = routing.locales;

  // تأكد هل الـ path فيه locale ولا لأ
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  // لو مفيش locale في path، أعد توجيه حسب defaultLocale أو 'en'
  if (!hasLocale) {
    const redirectLocale = pathname === "/" ? routing.defaultLocale : "en";
    return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url));
  }

  // حاول تجيب اللغة من الكوكي
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

  // شغل الـ intlMiddleware
  const response = await intlMiddleware(request);

  // حدد اللغة: لو الكوكي موجودة خذها، وإلا خد اللي في URL أو default
  const locale =
    localeFromCookie || request.nextUrl.locale || routing.defaultLocale;

  // ضيف الهيدر
  response.headers.set("x-nextjs-locale", locale);

  return response;
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
