import {
  approveApplicationAction,
  rejectApplicationAction,
} from "@/app/actions/admin";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireStaff } from "@/lib/auth";
import { getAllApplications } from "@/services/applications";

export default async function ApplicationsPage() {
  await requireStaff();
  const applications = await getAllApplications();

  return (
    <div>
      <SectionHeading
        title="Membership applications"
        description="Approve an application to create the member login with the password they chose."
      />
      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No applications yet.</p>
        ) : (
          applications.map((app) => (
            <Card key={app.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium text-[var(--navy)]">{app.fullName}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {app.email} · {app.enrollmentNo}
                    {app.phone ? ` · ${app.phone}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {[app.chamber, app.practiceArea].filter(Boolean).join(" · ") || "—"}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-[var(--navy)]">
                    {app.status}
                  </p>
                </div>
                {app.status === "PENDING" ? (
                  <div className="flex gap-2">
                    <form action={approveApplicationAction}>
                      <input type="hidden" name="id" value={app.id} />
                      <button
                        type="submit"
                        className="rounded-md bg-[var(--navy)] px-3 py-2 text-sm text-white"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={rejectApplicationAction}>
                      <input type="hidden" name="id" value={app.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-black/15 px-3 py-2 text-sm"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
