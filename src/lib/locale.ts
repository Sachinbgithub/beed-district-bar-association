import { cookies } from "next/headers";

export const LOCALE_COOKIE = "beed_bar_locale";
export type AppLocale = "en" | "mr" | "hi";

export const locales: AppLocale[] = ["en", "mr", "hi"];

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export async function getLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  if (value && isAppLocale(value)) return value;
  return "en";
}

export function pickLocalized(
  locale: AppLocale,
  en: string,
  mr?: string | null,
  hi?: string | null,
) {
  if (locale === "mr" && mr) return mr;
  if (locale === "hi" && hi) return hi;
  return en;
}

export function formatMessage(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
