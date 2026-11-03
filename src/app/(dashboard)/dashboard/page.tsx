import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const widgets = [
  { title: "Subscription", text: "FY 2026–27 dues status will show here after login." },
  { title: "ID card", text: "Digital / physical ID card request and status." },
  { title: "Notices for members", text: "Members-only circulars and attachments." },
  { title: "Event RSVP", text: "Register for CLE seminars and association programmes." },
];

export default function DashboardPage() {
  return (
    <div>
      <SectionHeading
        title="Member dashboard"
        description="Protected area for enrolled advocates — dues, ID card, notices, and event RSVP (auth coming later)."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {widgets.map((item) => (
          <Card key={item.title}>
            <h2 className="font-medium text-[var(--navy)]">{item.title}</h2>
            <p className="mt-2 text-sm text-[var(--navy)]/70">{item.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
