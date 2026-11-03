import { NoticeCard } from "@/components/features/notices/notice-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getNotices } from "@/services/notices";

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <Container className="py-10">
      <SectionHeading
        title="Notices & Circulars"
        description="Office orders, court sitting lists, election schedules, and announcements of Beed Bar Association."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </Container>
  );
}
