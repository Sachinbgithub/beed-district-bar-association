import { publishEventAction } from "@/app/actions/admin";
import { EventForm } from "@/components/admin/event-form";
import {
  AdminEmpty,
  AdminList,
  AdminPageHeader,
  RecordRow,
  StatusMark,
  primaryButtonClass,
} from "@/components/admin/admin-ui";
import { requireStaff } from "@/lib/auth";
import { formatDateTime } from "@/lib/format";
import { getAdminEvents } from "@/services/events";

export default async function AdminEventsPage() {
  await requireStaff();
  const events = await getAdminEvents();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Events"
        description="Create and publish Association programmes. Publishing emails active members once."
      />
      <EventForm />
      <AdminList>
        {events.length === 0 ? (
          <AdminEmpty>No events on record yet.</AdminEmpty>
        ) : (
          events.map((event) => (
            <RecordRow
              key={event.id}
              title={event.title}
              status={<StatusMark status={event.isPublished ? "Published" : "Draft"} />}
              meta={formatDateTime(event.startsAt.toISOString())}
              actions={
                !event.isPublished ? (
                  <form action={publishEventAction}>
                    <input type="hidden" name="id" value={event.id} />
                    <button type="submit" className={primaryButtonClass}>
                      Publish
                    </button>
                  </form>
                ) : null
              }
            />
          ))
        )}
      </AdminList>
    </div>
  );
}
