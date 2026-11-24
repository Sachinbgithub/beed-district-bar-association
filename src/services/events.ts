import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import type { AssociationEvent } from "@/types";

function mapEvent(row: {
  id: string;
  title: string;
  titleMr?: string | null;
  titleHi?: string | null;
  description: string | null;
  descriptionMr?: string | null;
  descriptionHi?: string | null;
  venue: string | null;
  startsAt: Date;
  endsAt: Date | null;
  category: string;
  image: string | null;
  isPublished: boolean;
}): AssociationEvent {
  return {
    id: row.id,
    title: row.title,
    titleMr: row.titleMr,
    titleHi: row.titleHi,
    description: row.description ?? "",
    descriptionMr: row.descriptionMr,
    descriptionHi: row.descriptionHi,
    venue: row.venue ?? "",
    startsAt: row.startsAt.toISOString(),
    endsAt: row.endsAt?.toISOString(),
    category: row.category as AssociationEvent["category"],
    image: row.image ?? undefined,
    isPublished: row.isPublished,
  };
}

const getCachedEvents = unstable_cache(
  async (): Promise<AssociationEvent[]> => {
    const rows = await db.event.findMany({
      where: { isPublished: true },
      orderBy: { startsAt: "asc" },
    });
    return rows.map(mapEvent);
  },
  ["published-events"],
  { revalidate: 60, tags: ["events"] },
);

export async function getEvents(): Promise<AssociationEvent[]> {
  return getCachedEvents();
}

const getCachedUpcomingEvents = unstable_cache(
  async (limit: number): Promise<AssociationEvent[]> => {
    const rows = await db.event.findMany({
      where: {
        isPublished: true,
        startsAt: { gte: new Date() },
      },
      orderBy: { startsAt: "asc" },
      take: limit,
    });
    return rows.map(mapEvent);
  },
  ["upcoming-events"],
  { revalidate: 60, tags: ["events"] },
);

export async function getUpcomingEvents(limit = 3): Promise<AssociationEvent[]> {
  return getCachedUpcomingEvents(limit);
}

export async function getAdminEvents() {
  return db.event.findMany({ orderBy: { startsAt: "desc" } });
}

export async function createEvent(data: {
  title: string;
  description?: string;
  venue?: string;
  startsAt: Date;
  endsAt?: Date | null;
  category: string;
  image?: string;
  isPublished: boolean;
  createdById: string;
}) {
  return db.event.create({
    data: {
      title: data.title,
      description: data.description,
      venue: data.venue,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      category: data.category,
      image: data.image,
      isPublished: data.isPublished,
      createdById: data.createdById,
    },
  });
}

export async function publishEvent(id: string) {
  return db.event.update({
    where: { id },
    data: { isPublished: true },
  });
}
