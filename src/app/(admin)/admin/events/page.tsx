import { publishEventAction } from "@/app/actions/admin";
import { EventForm } from "@/components/admin/event-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireStaff } from "@/lib/auth";
import { formatDateTime } from "@/lib/format";
import { getAdminEvents } from "@/services/events";

export default async function AdminEventsPage() {
  await requireStaff();
  const events = await getAdminEvents();

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Events"
        description="Create and publish Association programmes. Publishing emails active members once."
      />
      <EventForm />
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium text-[var(--navy)]">{event.title}</p>
              <p className="text-sm text-[var(--muted)]">
                {formatDateTime(event.startsAt.toISOString())} ·{" "}
                {event.isPublished ? "Published" : "Draft"}
              </p>
            </div>
            {!event.isPublished ? (
              <form action={publishEventAction}>
                <input type="hidden" name="id" value={event.id} />
                <button type="submit" className="rounded-md bg-[var(--navy)] px-3 py-2 text-sm text-white">
                  Publish
                </button>
              </form>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
