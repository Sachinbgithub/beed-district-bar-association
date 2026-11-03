import Link from "next/link";
import { siteConfig } from "@/config/site";
import { moreNav, primaryNav } from "@/constants/navigation";
import { Container } from "./container";

export function Header() {
  return (
    <header className="border-b border-[var(--gold)]/70 bg-[var(--navy-deep)] text-white">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]">
            <ScalesIcon />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg font-bold leading-tight tracking-wide">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--gold)]">
              District Court, Beed
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-[13px] xl:gap-6 xl:text-sm min-[980px]:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-white/90 hover:text-white">
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 whitespace-nowrap text-white/90 hover:text-white"
              aria-haspopup="menu"
            >
              More
              <ChevronIcon />
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-44 rounded-lg border border-white/10 bg-[var(--navy-deep)] py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {moreNav.map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Link
          href="/login"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--gold)] px-3.5 py-2 text-sm font-semibold text-[var(--navy-deep)] transition hover:brightness-105"
        >
          <LoginIcon />
          <span className="hidden sm:inline">Member Login</span>
          <span className="sm:hidden">Login</span>
        </Link>
      </Container>
    </header>
  );
}

function ScalesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3v18M5 7h14" />
      <path d="M7 7 4 14h6L7 7zM17 7l-3 7h6l-3-7z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}
