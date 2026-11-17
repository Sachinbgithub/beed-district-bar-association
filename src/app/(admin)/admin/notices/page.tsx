import { publishNoticeAction } from "@/app/actions/admin";
import { NoticeForm } from "@/components/admin/notice-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireStaff } from "@/lib/auth";
import { getAdminNotices } from "@/services/notices";

export default async function AdminNoticesPage() {
  await requireStaff();
  const notices = await getAdminNotices();

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Notices"
        description="Publish circulars and office orders. Publishing emails active members once."
      />
      <NoticeForm />
      <div className="space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium text-[var(--navy)]">{notice.title}</p>
              <p className="text-sm text-[var(--muted)]">
                {notice.category} · {notice.isPublished ? "Published" : "Draft"}
              </p>
            </div>
            {!notice.isPublished ? (
              <form action={publishNoticeAction}>
                <input type="hidden" name="id" value={notice.id} />
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
