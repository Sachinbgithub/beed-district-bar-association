import { events } from "@/data/events";
import type { AssociationEvent } from "@/types";

export async function getEvents(): Promise<AssociationEvent[]> {
  return events
    .filter((event) => event.isPublished)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Home “Upcoming Events” — featured first three from data order. */
export async function getUpcomingEvents(limit = 3): Promise<AssociationEvent[]> {
  return events.filter((event) => event.isPublished).slice(0, limit);
}
