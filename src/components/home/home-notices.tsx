import { NoticeCard } from "@/components/features/notices/notice-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";
import type { Notice } from "@/types";

export async function HomeNotices({ notices }: { notices: Notice[] }) {
  const dict = getDictionary(await getLocale());

  return (
    <section>
      <SectionHeader title={dict.copy.noticesTitle} href="/notices" actionLabel={dict.copy.viewAllArrow} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </section>
  );
}
