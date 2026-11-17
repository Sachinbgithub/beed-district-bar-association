import { setLocaleAction } from "@/app/actions/admin";
import type { AppLocale } from "@/lib/locale";

const options: Array<{ value: AppLocale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "mr", label: "मर" },
  { value: "hi", label: "हिं" },
];

export function LocaleSwitcher({ locale }: { locale: AppLocale }) {
  return (
    <form action={setLocaleAction} className="inline-flex items-center gap-1 text-xs">
      {options.map((option) => (
        <button
          key={option.value}
          type="submit"
          name="locale"
          value={option.value}
          className={`rounded px-2 py-1 ${
            locale === option.value
              ? "bg-[var(--gold)] text-[var(--navy-deep)]"
              : "text-white/80 hover:bg-white/10"
          }`}
        >
          {option.label}
        </button>
      ))}
    </form>
  );
}
