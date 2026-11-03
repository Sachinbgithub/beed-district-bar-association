import { AchievementCard } from "@/components/features/achievements/achievement-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { Achievement } from "@/types";

export function HomeAchievements({ items }: { items: Achievement[] }) {
  return (
    <section>
      <SectionHeader
        title="Our Achievements"
        href="/about"
        actionLabel="View All"
        actionIcon={<TrophyIcon />}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <AchievementCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function TrophyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M5 6H3a3 3 0 0 0 3 3M19 6h2a3 3 0 0 1-3 3" />
    </svg>
  );
}
