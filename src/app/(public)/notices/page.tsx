import { NoticeCard } from "@/components/features/notices/notice-card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";
import { getNotices } from "@/services/notices";

export default async function NoticesPage() {
  const dict = getDictionary(await getLocale());
  const notices = await getNotices();

  return (
    <Container className="py-10">
      <SectionHeading title={dict.copy.noticesPageTitle} description={dict.copy.noticesPageDescription} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </Container>
  );
}
