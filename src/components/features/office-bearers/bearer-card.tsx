import type { OfficeBearer } from "@/types";

const accents: Record<
  OfficeBearer["accent"],
  { avatar: string; badge: string; text: string }
> = {
  gold: {
    avatar: "bg-[#f3e6c2] text-[#8a6d1d]",
    badge: "bg-[#f3e6c2] text-[#8a6d1d]",
    text: "text-[#8a6d1d]",
  },
  blue: {
    avatar: "bg-[#d9e4f5] text-[#35507a]",
    badge: "bg-[#d9e4f5] text-[#35507a]",
    text: "text-[#35507a]",
  },
  tan: {
    avatar: "bg-[#ead9c5] text-[#7a5530]",
    badge: "bg-[#ead9c5] text-[#7a5530]",
    text: "text-[#7a5530]",
  },
  sky: {
    avatar: "bg-[#d7eef5] text-[#2f6678]",
    badge: "bg-[#d7eef5] text-[#2f6678]",
    text: "text-[#2f6678]",
  },
  green: {
    avatar: "bg-[#d9efe0] text-[#2f6b45]",
    badge: "bg-[#d9efe0] text-[#2f6b45]",
    text: "text-[#2f6b45]",
  },
};

export function BearerCard({ person }: { person: OfficeBearer }) {
  const colors = accents[person.accent];

  return (
    <article className="flex h-full flex-col items-center rounded-2xl border border-[var(--border)] bg-white px-4 py-6 text-center shadow-[0_1px_3px_rgba(26,39,68,0.06)]">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold ${colors.avatar}`}
      >
        {person.initials}
      </div>
      <h3 className="mt-4 font-serif text-base font-bold text-[var(--navy)]">{person.fullName}</h3>
      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}>
        {person.designation}
      </span>

      <div className="mt-4 w-full space-y-2 text-left text-sm text-[var(--muted)]">
        {person.phone ? (
          <p className="flex flex-wrap items-center gap-2">
            <PhoneIcon />
            <span>{person.phone}</span>
            <span className="rounded bg-[var(--gold-soft)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8a6d1d]">
              Demo data
            </span>
          </p>
        ) : null}
        {person.email ? (
          <p className="flex items-center gap-2 break-all">
            <MailIcon />
            {person.email}
          </p>
        ) : null}
      </div>

      {person.enrollmentNo ? (
        <p className="mt-4 w-full border-t border-[var(--border)] pt-3 text-left text-xs text-[var(--muted)]">
          Enrl. No. {person.enrollmentNo}
        </p>
      ) : null}
      <p className="mt-2 w-full text-left text-xs text-[var(--muted)]">
        In office since {person.inOfficeSince}
      </p>
    </article>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
