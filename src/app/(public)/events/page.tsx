import { EventCard } from "@/components/features/events/event-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEvents } from "@/services/events";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Container className="py-10">
      <SectionHeading
        title="Events & programmes"
        description="CLE seminars, general body meetings, sports, cultural gatherings, and legal aid camps of Beed Bar Association."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Container>
  );
}
