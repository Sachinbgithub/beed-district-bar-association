import { EventCard } from "@/components/features/events/event-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";
import type { AssociationEvent } from "@/types";

export async function HomeEvents({ events }: { events: AssociationEvent[] }) {
  const dict = getDictionary(await getLocale());

  return (
    <section>
      <SectionHeader
        title={dict.copy.eventsTitle}
        href="/events"
        actionLabel={dict.common.viewAll}
        actionIcon={<CalendarIcon />}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
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
