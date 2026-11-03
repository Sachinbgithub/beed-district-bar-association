import Link from "next/link";
import type { Member } from "@/types";

const accents: Record<Member["accent"], string> = {
  blue: "bg-[#d9e4f5] text-[#35507a]",
  pink: "bg-[#f5d9e6] text-[#7a3558]",
  green: "bg-[#d9efe0] text-[#2f6b45]",
  orange: "bg-[#f5e2d0] text-[#8a5530]",
  purple: "bg-[#e6d9f5] text-[#55357a]",
  teal: "bg-[#d7eef5] text-[#2f6678]",
};

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(26,39,68,0.06)]">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${accents[member.accent]}`}
        >
          {member.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-base font-bold leading-snug text-[var(--navy)]">
            {member.fullName}
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">Enrl. No. {member.enrollmentNo}</p>
        </div>
      </div>

      <span className="mt-4 w-fit rounded-full bg-[var(--badge-blue)] px-2.5 py-1 text-xs font-medium text-[var(--badge-blue-text)]">
        {member.category}
      </span>
      <p className="mt-3 text-sm text-[var(--navy)]/80">{member.specialization}</p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <p className="text-xs text-[var(--muted)]">Since {member.yearOfEnrollment}</p>
        <Link
          href={`/members/${member.id}`}
          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--navy)] transition hover:border-[var(--gold)]"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}
