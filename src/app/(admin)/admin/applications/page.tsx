import {
  approveApplicationAction,
  rejectApplicationAction,
} from "@/app/actions/admin";
import {
  AdminEmpty,
  AdminList,
  AdminPageHeader,
  RecordRow,
  StatusMark,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/admin/admin-ui";
import { requireStaff } from "@/lib/auth";
import { getAllApplications } from "@/services/applications";

export default async function ApplicationsPage() {
  await requireStaff();
  const applications = await getAllApplications();

  return (
    <div>
      <AdminPageHeader
        title="Membership applications"
        description="Approve an application to create the member login with the password they chose."
      />
      <AdminList>
        {applications.length === 0 ? (
          <AdminEmpty>No applications yet.</AdminEmpty>
        ) : (
          applications.map((app) => (
            <RecordRow
              key={app.id}
              title={app.fullName}
              status={<StatusMark status={app.status} />}
              meta={
                <>
                  <p>
                    {app.email} · {app.enrollmentNo}
                    {app.phone ? ` · ${app.phone}` : ""}
                  </p>
                  <p>{[app.chamber, app.practiceArea].filter(Boolean).join(" · ") || "—"}</p>
                </>
              }
              actions={
                app.status === "PENDING" ? (
                  <>
                    <form action={approveApplicationAction}>
                      <input type="hidden" name="id" value={app.id} />
                      <button type="submit" className={primaryButtonClass}>
                        Approve
                      </button>
                    </form>
                    <form action={rejectApplicationAction}>
                      <input type="hidden" name="id" value={app.id} />
                      <button type="submit" className={secondaryButtonClass}>
                        Reject
                      </button>
                    </form>
                  </>
                ) : null
              }
            />
          ))
        )}
      </AdminList>
    </div>
  );
}
