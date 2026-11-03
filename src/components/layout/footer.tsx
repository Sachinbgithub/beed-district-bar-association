import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/about", label: "Office Bearers" },
  { href: "/members", label: "Members Directory" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "Achievements" },
];

const resourceLinks = [
  { href: "/notices", label: "Notices & Circulars" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/gallery", label: "Videos" },
  { href: "/about", label: "Rules & Regulations" },
  { href: "/contact", label: "Contact Us" },
  { href: "/login", label: "Member Login" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--navy-deep)] text-white">
      <Container className="flex flex-col gap-6 border-b border-[var(--gold)]/35 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Get in touch with the Association</h2>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/75">
            {siteConfig.address.line1}, Beed.
            <span className="rounded bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--gold-soft)]">
              Demo data
            </span>
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex w-fit rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-[var(--navy-deep)]"
        >
          Contact Us
        </Link>
      </Container>

      <Container className="grid gap-10 border-b border-[var(--gold)]/25 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)]">
              <ScalesIcon />
            </span>
            <p className="font-serif text-lg font-bold">{siteConfig.name}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
          <div className="mt-5 rounded-lg border border-white/15 px-3 py-3 text-xs leading-relaxed text-white/65">
            <span className="mr-2 inline-block align-middle text-[var(--gold)]">
              <ShieldIcon />
            </span>
            Demo version — all names, contacts and documents are fictional sample data.
          </div>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Resources" links={resourceLinks} />

        <div>
          <h3 className="font-serif text-base font-bold text-[var(--gold)]">Contact (Demo)</h3>
          <div className="mt-2 h-0.5 w-10 bg-[var(--gold)]" />
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2">
              <PinIcon />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </span>
            </li>
            <li className="flex gap-2">
              <PhoneIcon />
              <span>{siteConfig.phone} (demo)</span>
            </li>
            <li className="flex gap-2">
              <MailIcon />
              <span>{siteConfig.email}</span>
            </li>
            <li className="flex gap-2">
              <ClockIcon />
              <span>{siteConfig.officeHours[0].hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="py-4 text-right text-xs text-white/55">
        All data shown is fictional (DEMO) — for presentation to the managing committee only.
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="font-serif text-base font-bold text-[var(--gold)]">{title}</h3>
      <div className="mt-2 h-0.5 w-10 bg-[var(--gold)]" />
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScalesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3v18M5 7h14" />
      <path d="M7 7 4 14h6L7 7zM17 7l-3 7h6l-3-7z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="mt-0.5 shrink-0 text-[var(--gold)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="mt-0.5 shrink-0 text-[var(--gold)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="mt-0.5 shrink-0 text-[var(--gold)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="mt-0.5 shrink-0 text-[var(--gold)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
