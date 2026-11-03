import Link from "next/link";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  href?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  href,
  actionLabel = "View All",
  actionIcon,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        <h2 className="font-serif text-3xl font-bold text-[var(--navy)] sm:text-[2rem]">
          {title}
        </h2>
        <div className="mt-2 h-0.5 w-16 bg-[var(--gold)]" />
        {subtitle ? <p className="mt-3 text-sm text-[var(--muted)]">{subtitle}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--navy)] transition hover:border-[var(--gold)]"
        >
          {actionIcon}
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
