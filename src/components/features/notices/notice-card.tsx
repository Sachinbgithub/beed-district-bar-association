import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/format";
import { getLocale, pickLocalized } from "@/lib/locale";
import type { Notice } from "@/types";

const noticeCategoryKey = {
  Circular: "Circular",
  "Office Order": "OfficeOrder",
  Election: "Election",
  Welfare: "Welfare",
  General: "General",
  Meeting: "Meeting",
} as const;

export async function NoticeCard({ notice }: { notice: Notice }) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const title = pickLocalized(locale, notice.title, notice.titleMr, notice.titleHi);
  const body = pickLocalized(locale, notice.body, notice.bodyMr, notice.bodyHi);
  const category = dict.category[noticeCategoryKey[notice.category]];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(26,39,68,0.06)]">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <span className="rounded-full bg-[var(--badge-blue)] px-2.5 py-1 font-medium text-[var(--badge-blue-text)]">
          {category}
        </span>
        <span>{formatDate(notice.publishedAt)}</span>
        {notice.pdfFileName ? (
          <span className="inline-flex items-center gap-1 text-[var(--muted)]">
            <PdfIcon />
            {dict.copy.pdfAvailable}
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-[var(--navy)]">
        {title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {body}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/notices"
          className="rounded-lg bg-[#eef0f4] px-3.5 py-2 text-sm font-medium text-[var(--navy)] transition hover:bg-[#e4e7ed]"
        >
          {dict.copy.readNotice}
        </Link>
        {notice.pdfFileName ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--navy)]">
            <PdfIcon className="text-[var(--navy)]" />
            {notice.pdfFileName}
          </span>
        ) : null}
      </div>
    </article>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15h6" />
      <path d="M9 11h6" />
    </svg>
  );
}
