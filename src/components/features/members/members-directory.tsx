"use client";

import { useMemo, useState } from "react";
import { MemberCard } from "@/components/features/members/member-card";
import type { Member, MemberCategory } from "@/types";

export type MemberDirectoryLabels = {
  searchByName: string;
  enrollmentNo: string;
  category: string;
  reset: string;
  showingMembers: string;
  noMembers: string;
  namePlaceholder: string;
  enrollmentPlaceholder: string;
  allCategories: string;
  lifeMember: string;
  womenAdvocate: string;
  annualMember: string;
  seniorAdvocate: string;
};

type MembersDirectoryProps = {
  members: Member[];
  labels: MemberDirectoryLabels;
};

const categoryLabelKey = {
  "All categories": "allCategories",
  "Life Member": "lifeMember",
  "Women Advocate": "womenAdvocate",
  "Annual Member": "annualMember",
  "Senior Advocate": "seniorAdvocate",
} as const;

const categoryValues: Array<"All categories" | MemberCategory> = [
  "All categories",
  "Life Member",
  "Women Advocate",
  "Annual Member",
  "Senior Advocate",
];

export function MembersDirectory({ members, labels }: MembersDirectoryProps) {
  const [nameQuery, setNameQuery] = useState("");
  const [enrollmentQuery, setEnrollmentQuery] = useState("");
  const [category, setCategory] = useState<(typeof categoryValues)[number]>("All categories");

  const filtered = useMemo(() => {
    const name = nameQuery.trim().toLowerCase();
    const enrollment = enrollmentQuery.trim().toLowerCase();

    return members.filter((member) => {
      const matchesName = !name || member.fullName.toLowerCase().includes(name);
      const matchesEnrollment =
        !enrollment || member.enrollmentNo.toLowerCase().includes(enrollment);
      const matchesCategory = category === "All categories" || member.category === category;
      return matchesName && matchesEnrollment && matchesCategory;
    });
  }, [members, nameQuery, enrollmentQuery, category]);

  function resetFilters() {
    setNameQuery("");
    setEnrollmentQuery("");
    setCategory("All categories");
  }

  return (
    <div>
      <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_1px_3px_rgba(26,39,68,0.06)] sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
          <label className="grid gap-1.5 text-xs font-medium text-[var(--muted)]">
            {labels.searchByName}
            <span className="relative">
              <SearchIcon />
              <input
                value={nameQuery}
                onChange={(event) => setNameQuery(event.target.value)}
                placeholder={labels.namePlaceholder}
                className="w-full rounded-lg border border-[var(--border)] py-2.5 pl-9 pr-3 text-sm text-[var(--navy)] outline-none focus:border-[var(--gold)]"
              />
            </span>
          </label>

          <label className="grid gap-1.5 text-xs font-medium text-[var(--muted)]">
            {labels.enrollmentNo}
            <input
              value={enrollmentQuery}
              onChange={(event) => setEnrollmentQuery(event.target.value)}
              placeholder={labels.enrollmentPlaceholder}
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm text-[var(--navy)] outline-none focus:border-[var(--gold)]"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-medium text-[var(--muted)]">
            {labels.category}
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as (typeof categoryValues)[number])}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--navy)] outline-none focus:border-[var(--gold)]"
            >
              {categoryValues.map((item) => (
                <option key={item} value={item}>
                  {labels[categoryLabelKey[item]]}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 text-sm text-[var(--navy)] transition hover:border-[var(--gold)] lg:w-auto"
              aria-label="Reset filters"
            >
              <ResetIcon />
              {labels.reset}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-[var(--muted)]">
        {labels.showingMembers
          .replaceAll("{shown}", String(filtered.length))
          .replaceAll("{total}", String(members.length))}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-[var(--muted)]">{labels.noMembers}</p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}
