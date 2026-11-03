type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 space-y-3">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--navy)]">{title}</h1>
      <div className="h-0.5 w-16 bg-[var(--gold)]" />
      {description ? <p className="max-w-2xl text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}
