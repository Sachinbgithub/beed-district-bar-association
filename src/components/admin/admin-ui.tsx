import { cn } from "@/lib/utils";

export const fieldClass =
  "min-h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-base text-[var(--navy)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--navy)] focus:ring-2 focus:ring-[var(--gold)]/45";

export const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center bg-[var(--navy)] px-4 text-sm font-medium text-[var(--cream)] hover:bg-[var(--navy-deep)] disabled:opacity-60 sm:w-auto";

export const secondaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center border border-[var(--navy)]/25 bg-white px-4 text-sm font-medium text-[var(--navy)] hover:border-[var(--navy)] disabled:opacity-60 sm:w-auto";

export function AdminPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <h1 className="font-serif text-2xl tracking-tight text-[var(--navy)] sm:text-[1.75rem]">
        {title}
      </h1>
      <div className="mt-3 h-px w-12 bg-[var(--gold)]" />
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function AdminPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border border-[var(--border)] bg-white", className)}>
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <h2 className="font-serif text-lg text-[var(--navy)]">{title}</h2>
      </div>
      <div className="grid gap-4 p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function AdminList({ children }: { children: React.ReactNode }) {
  return (
    <div className="divide-y divide-[var(--border)] border border-[var(--border)] bg-white">
      {children}
    </div>
  );
}

export function AdminEmpty({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-8 text-sm text-[var(--muted)] sm:px-5">{children}</p>;
}

export function RecordRow({
  title,
  meta,
  status,
  actions,
}: {
  title: string;
  meta?: React.ReactNode;
  status?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="font-medium text-[var(--navy)]">{title}</h2>
          {status}
        </div>
        {meta ? <div className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{meta}</div> : null}
      </div>
      {actions ? (
        <div className="flex flex-col gap-2 sm:shrink-0 sm:flex-row">{actions}</div>
      ) : null}
    </article>
  );
}

const statusTone: Record<string, string> = {
  PENDING: "bg-[var(--gold-soft)] text-[var(--navy-deep)]",
  DRAFT: "bg-[var(--gold-soft)] text-[var(--navy-deep)]",
  PUBLISHED: "bg-[#e6efe8] text-[#1c4532]",
  APPROVED: "bg-[#e6efe8] text-[#1c4532]",
  REJECTED: "bg-[#f6e8e4] text-[#6b2d22]",
};

const statusLabel: Record<string, string> = {
  PENDING: "Pending",
  DRAFT: "Draft",
  PUBLISHED: "Published",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function StatusMark({ status }: { status: string }) {
  const key = status.toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium tracking-wide",
        statusTone[key] ?? "bg-[var(--badge-blue)] text-[var(--badge-blue-text)]",
      )}
    >
      {statusLabel[key] ?? status}
    </span>
  );
}
