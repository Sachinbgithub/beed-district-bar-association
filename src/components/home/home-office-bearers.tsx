import { BearerCard } from "@/components/features/office-bearers/bearer-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { OfficeBearer } from "@/types";

export function HomeOfficeBearers({ bearers }: { bearers: OfficeBearer[] }) {
  return (
    <section>
      <SectionHeader
        title="Office Bearers"
        subtitle="Elected representatives of the Association for the current term"
        href="/about"
        actionLabel="View All →"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bearers.map((person) => (
          <BearerCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}
