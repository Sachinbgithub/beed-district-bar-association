import Image from "next/image";
import { BearerCard } from "@/components/features/office-bearers/bearer-card";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent } from "@/data/about";
import { getDictionary } from "@/i18n/dictionaries";
import { formatMessage, getLocale } from "@/lib/locale";
import { getOfficeBearers, getPresidentMessage } from "@/services/office-bearers";

export default async function AboutPage() {
  const dict = getDictionary(await getLocale());
  const [bearers, message] = await Promise.all([getOfficeBearers(), getPresidentMessage()]);

  return (
    <Container className="py-10">
      <SectionHeading
        title={dict.copy.aboutTitle}
        description={formatMessage(dict.copy.aboutDescription, { name: dict.copy.siteName })}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden rounded-2xl lg:min-h-full">
          <Image
            src="/images/gallery/advocates.jpg"
            alt="Members of Beed District Bar Association"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="space-y-4">
          {aboutContent.history.map((para) => (
            <p key={para} className="leading-relaxed text-[var(--muted)]">
              {para}
            </p>
          ))}
          <Card className="bg-[var(--navy)] text-white">
            <p className="text-xs uppercase tracking-wide text-[var(--gold)]">{dict.copy.presidentsMessage}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{message.body}</p>
            <p className="mt-4 text-sm font-medium">
              — {message.author}
              <br />
              <span className="text-white/70">{message.role}</span>
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">{dict.nav.officeBearers}</h2>
        <div className="mt-2 h-0.5 w-16 bg-[var(--gold)]" />
        <p className="mt-3 text-sm text-[var(--muted)]">
          {dict.copy.bearersSubtitle}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bearers.map((person) => (
            <BearerCard key={person.id} person={person} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">{dict.copy.objectives}</h2>
        <div className="mt-2 h-0.5 w-16 bg-[var(--gold)]" />
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {aboutContent.objectives.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">{dict.nav.membership}</h2>
          <div className="mt-2 h-0.5 w-16 bg-[var(--gold)]" />
          <p className="mt-3 text-[var(--muted)]">{aboutContent.membership.eligibility}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            {aboutContent.membership.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <Card>
          <h3 className="font-serif font-bold text-[var(--navy)]">{dict.copy.feeStructure}</h3>
          <ul className="mt-4 divide-y divide-[var(--border)]">
            {aboutContent.membership.fees.map((fee) => (
              <li key={fee.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-[var(--muted)]">{fee.label}</span>
                <span className="font-medium text-[var(--navy)]">{fee.amount}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </Container>
  );
}
