"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

function isCurrent(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function roleLabel(role: string) {
  if (role === "COMPANY") return "Company";
  if (role === "ADMIN") return "Administrator";
  if (role === "STAFF") return "Staff";
  return role;
}

function OfficeNav({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 px-3" aria-label="Office">
      {items.map((item) => {
        const current = isCurrent(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center border-l-2 px-3 text-sm",
              current
                ? "border-[var(--gold)] bg-white/10 text-[var(--cream)]"
                : "border-transparent text-[var(--cream)]/80 hover:bg-white/5 hover:text-[var(--cream)]",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  email,
  name,
  role,
  items,
  children,
}: {
  email: string;
  name: string | null;
  role: string;
  items: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const who = name ?? email;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="flex min-h-dvh w-full flex-1 flex-col lg:flex-row">
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-[var(--navy-deep)] px-4 py-3 text-[var(--cream)] lg:hidden"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="min-w-0">
          <p className="font-serif text-base leading-tight">Beed Bar Association</p>
          <p className="truncate text-xs text-[var(--gold-soft)]">
            Office · {roleLabel(role)}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center border border-white/25 px-3 text-sm"
          aria-expanded={open}
          aria-controls="admin-nav"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[var(--navy-deep)]/55 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id="admin-nav"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(100%,18.5rem)] flex-col bg-[var(--navy-deep)] text-[var(--cream)] lg:static lg:flex lg:w-64 lg:shrink-0",
          open ? "flex" : "hidden lg:flex",
        )}
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
          <div className="min-w-0">
            <p className="font-serif text-lg leading-tight">Beed Bar Association</p>
            <p className="mt-1 text-xs tracking-[0.14em] text-[var(--gold-soft)] uppercase">
              Office
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-[var(--cream)] lg:hidden"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="mx-5 mb-4 border-t border-white/10 pt-4">
          <p className="truncate text-sm text-[var(--cream)]">{who}</p>
          <p className="mt-0.5 truncate text-xs text-[var(--gold-soft)]">
            {roleLabel(role)}
            {name ? ` · ${email}` : ""}
          </p>
        </div>
        <OfficeNav items={items} pathname={pathname} onNavigate={() => setOpen(false)} />
        <div className="mt-auto flex flex-col gap-1 px-3 pt-6">
          <Link
            href="/"
            className="flex min-h-11 items-center px-3 text-sm text-[var(--cream)]/80 hover:text-[var(--cream)]"
          >
            Public site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex min-h-11 w-full items-center px-3 text-left text-sm text-[var(--gold-soft)] hover:text-[var(--cream)]"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
