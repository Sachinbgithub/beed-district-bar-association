"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { setLocaleAction } from "@/app/actions/admin";
import { logoutAction } from "@/app/actions/auth";
import type { AppLocale } from "@/lib/locale";

const languages: Array<{ value: AppLocale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "mr", label: "मर" },
  { value: "hi", label: "हिं" },
];

export function AccountMenu({
  locale,
  accountHref,
  accountLabel,
  signOutLabel,
  loginHref,
  loginLabel,
  languageLabel,
  menuLabel,
}: {
  locale: AppLocale;
  accountHref?: string;
  accountLabel?: string;
  signOutLabel?: string;
  loginHref?: string;
  loginLabel?: string;
  languageLabel: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-[980px]:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)]"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={menuLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <ProfileIcon />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 border border-[var(--border)] bg-[var(--cream)] p-3 text-[var(--navy)] shadow-lg"
        >
          <p className="px-1 text-[11px] font-medium tracking-[0.14em] text-[var(--muted)] uppercase">
            {languageLabel}
          </p>
          <form action={setLocaleAction} className="mt-2 grid grid-cols-3 gap-1">
            {languages.map((option) => (
              <button
                key={option.value}
                type="submit"
                name="locale"
                value={option.value}
                className={`min-h-11 rounded-sm text-sm ${
                  locale === option.value
                    ? "bg-[var(--navy)] text-[var(--cream)]"
                    : "border border-[var(--border)] bg-white text-[var(--navy)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </form>
          {accountHref && accountLabel ? (
            <Link
              href={accountHref}
              role="menuitem"
              className="mt-3 flex min-h-11 items-center rounded-sm border border-[var(--border)] bg-white px-3 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {accountLabel}
            </Link>
          ) : null}
          {loginHref && loginLabel ? (
            <Link
              href={loginHref}
              role="menuitem"
              className="mt-3 flex min-h-11 items-center justify-center rounded-sm bg-[var(--gold)] px-3 text-sm font-semibold text-[var(--navy-deep)]"
              onClick={() => setOpen(false)}
            >
              {loginLabel}
            </Link>
          ) : null}
          {signOutLabel ? (
            <form action={logoutAction} className="mt-2">
              <button
                type="submit"
                role="menuitem"
                className="flex min-h-11 w-full items-center justify-center rounded-sm bg-[var(--navy)] px-3 text-sm font-semibold text-[var(--cream)]"
              >
                {signOutLabel}
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.2 19.4c1.35-3.15 3.7-4.65 6.8-4.65s5.45 1.5 6.8 4.65" />
    </svg>
  );
}
