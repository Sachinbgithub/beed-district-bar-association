import Image from "next/image";
import Link from "next/link";
import { formatDate, splitEventDate } from "@/lib/format";
import type { AssociationEvent } from "@/types";

const categoryLabel: Record<AssociationEvent["category"], string> = {
  Seminar: "Seminar",
  Meeting: "Meeting",
  Cultural: "Cultural",
  Welfare: "Legal Aid",
  Sports: "Sports",
};

export function EventCard({ event }: { event: AssociationEvent }) {
  const { day, monthYear } = splitEventDate(event.startsAt);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_1px_3px_rgba(26,39,68,0.06)]">
      <div className="relative aspect-[16/10]">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-[var(--navy)]" />
        )}
        <div className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1.5 text-center shadow-sm">
          <p className="font-serif text-lg font-bold leading-none text-[var(--navy)]">{day}</p>
          <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-[var(--muted)]">
            {monthYear}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-[var(--badge-blue)] px-2.5 py-1 text-xs font-medium text-[var(--badge-blue-text)]">
          {categoryLabel[event.category]}
        </span>
        <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-[var(--navy)]">
          {event.title}
        </h3>
        <div className="mt-3 space-y-1.5 text-sm text-[var(--muted)]">
          <p className="inline-flex items-center gap-2">
            <CalendarIcon />
            {formatDate(event.startsAt)}
          </p>
          <p className="inline-flex items-center gap-2">
            <PinIcon />
            {event.venue}
          </p>
        </div>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {event.description}
        </p>
        <Link
          href="/events"
          className="mt-5 inline-flex w-fit rounded-lg border border-[var(--border)] px-3.5 py-2 text-sm font-medium text-[var(--navy)] transition hover:border-[var(--gold)]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
