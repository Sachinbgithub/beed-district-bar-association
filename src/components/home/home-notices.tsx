import { NoticeCard } from "@/components/features/notices/notice-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { Notice } from "@/types";

export function HomeNotices({ notices }: { notices: Notice[] }) {
  return (
    <section>
      <SectionHeader title="Latest Notices & Circulars" href="/notices" actionLabel="View All →" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </section>
  );
}
