import { EventCard } from "@/components/features/events/event-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";
import { getEvents } from "@/services/events";

export default async function EventsPage() {
  const dict = getDictionary(await getLocale());
  const events = await getEvents();

  return (
    <Container className="py-10">
      <SectionHeading title={dict.copy.eventsPageTitle} description={dict.copy.eventsPageDescription} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Container>
  );
}
