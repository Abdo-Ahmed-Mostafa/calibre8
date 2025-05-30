// LocaleLayout.tsx (server component)
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import ClientProvierLayout from "@/lib/provider/ClientProvierLayout";
import { Toaster } from "react-hot-toast";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProvierLayout>{children}</ClientProvierLayout>
          <Toaster position="top-right" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
