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

  // تحقق من تسجيل الدخول (مثال: كوكي اسمها 'token')
  const token = request.cookies.get("token")?.value;

  // منع الدخول لصفحة profile لو مش مسجل دخول
  if (pathname.includes("/profile") && !token) {
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}/login`, request.url)
    );
  }

  // لو مسجل دخول، امنع دخول صفحات login, register, otp
  const authPages = ["/login", "/register", "/otp"];
  if (
    token &&
    authPages.some((page) =>
      pathname.startsWith(`/${routing.defaultLocale}${page}`)
    )
  ) {
    // لو مستخدم مسجل دخول بيحاول يدخل صفحة تسجيل الدخول أو التسجيل أو otp
    // نعيد توجيهه للصفحة الرئيسية أو profile
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}/`, request.url)
    );
  }

  // تابع الـ intlMiddleware
  const response = await intlMiddleware(request);

  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

  const locale =
    localeFromCookie || request.nextUrl.locale || routing.defaultLocale;

  response.headers.set("x-nextjs-locale", locale);

  return response;
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/register",
    "/otp",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
