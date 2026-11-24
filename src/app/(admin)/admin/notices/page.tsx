import { publishNoticeAction } from "@/app/actions/admin";
import { NoticeForm } from "@/components/admin/notice-form";
import {
  AdminEmpty,
  AdminList,
  AdminPageHeader,
  RecordRow,
  StatusMark,
  primaryButtonClass,
} from "@/components/admin/admin-ui";
import { requireStaff } from "@/lib/auth";
import { getAdminNotices } from "@/services/notices";

export default async function AdminNoticesPage() {
  await requireStaff();
  const notices = await getAdminNotices();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Notices"
        description="Publish circulars and office orders. Publishing emails active members once."
      />
      <NoticeForm />
      <AdminList>
        {notices.length === 0 ? (
          <AdminEmpty>No notices on record yet.</AdminEmpty>
        ) : (
          notices.map((notice) => (
            <RecordRow
              key={notice.id}
              title={notice.title}
              status={<StatusMark status={notice.isPublished ? "Published" : "Draft"} />}
              meta={notice.category}
              actions={
                !notice.isPublished ? (
                  <form action={publishNoticeAction}>
                    <input type="hidden" name="id" value={notice.id} />
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
