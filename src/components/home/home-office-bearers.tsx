import { BearerCard } from "@/components/features/office-bearers/bearer-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";
import type { OfficeBearer } from "@/types";

export async function HomeOfficeBearers({ bearers }: { bearers: OfficeBearer[] }) {
  const dict = getDictionary(await getLocale());

  return (
    <section>
      <SectionHeader
        title={dict.nav.officeBearers}
        subtitle={dict.copy.bearersSubtitle}
        href="/about"
        actionLabel={dict.copy.viewAllArrow}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bearers.map((person) => (
          <BearerCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}
