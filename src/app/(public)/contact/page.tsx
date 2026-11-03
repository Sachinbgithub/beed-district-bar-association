import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <Container className="py-10">
      <SectionHeading
        title="Contact"
        description="Beed District Bar Association office at the District & Sessions Court Complex."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-medium text-[var(--navy)]">Office</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--navy)]/75">
            {siteConfig.name}
            <br />
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
            <br />
            {siteConfig.address.state}, {siteConfig.address.country}
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-[var(--navy)]/55">Phone</dt>
              <dd className="text-[var(--navy)]">
                {siteConfig.phone}
                <br />
                {siteConfig.phoneAlt}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--navy)]/55">Email</dt>
              <dd className="text-[var(--navy)]">{siteConfig.email}</dd>
            </div>
          </dl>
          <h3 className="mt-6 font-medium text-[var(--navy)]">Office hours</h3>
          <ul className="mt-2 space-y-1 text-sm text-[var(--navy)]/75">
            {siteConfig.officeHours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span>{row.hours}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-medium text-[var(--navy)]">Enquiry form</h2>
          <p className="mt-1 text-sm text-[var(--navy)]/65">
            UI only for now — submissions will save to the database later.
          </p>
          <form className="mt-6 grid gap-4">
            <label className="grid gap-1 text-sm">
              Full name
              <input className="rounded-md border border-black/15 px-3 py-2" name="name" />
            </label>
            <label className="grid gap-1 text-sm">
              Email
              <input className="rounded-md border border-black/15 px-3 py-2" name="email" type="email" />
            </label>
            <label className="grid gap-1 text-sm">
              Phone
              <input className="rounded-md border border-black/15 px-3 py-2" name="phone" />
            </label>
            <label className="grid gap-1 text-sm">
              Subject
              <select className="rounded-md border border-black/15 px-3 py-2" name="subject" defaultValue="">
                <option value="" disabled>
                  Select subject
                </option>
                <option>Membership enquiry</option>
                <option>ID card / parking sticker</option>
                <option>Welfare / medical claim</option>
                <option>Event registration</option>
                <option>General</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              Message
              <textarea className="min-h-28 rounded-md border border-black/15 px-3 py-2" name="message" />
            </label>
            <button
              type="button"
              className="w-fit rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white"
            >
              Send enquiry
            </button>
          </form>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-[var(--navy)]">Useful links</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {siteConfig.usefulLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-[var(--navy)] hover:border-[var(--gold)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}
