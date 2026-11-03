import type { Achievement } from "@/types";

export function AchievementCard({ item }: { item: Achievement }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(26,39,68,0.06)]">
      <span className="w-fit rounded-full bg-[var(--gold-soft)] px-2.5 py-1 text-xs font-medium text-[#8a6d1d]">
        {item.category}
      </span>
      <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-[var(--navy)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
    </article>
  );
}
