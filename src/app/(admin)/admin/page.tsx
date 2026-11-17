import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AdminHomePage() {
  await requireStaff();

  const [pending, events, posts, gallery] = await Promise.all([
    db.membershipApplication.count({ where: { status: "PENDING" } }),
    db.event.count(),
    db.blogPost.count(),
    db.galleryImage.count(),
  ]);

  const links = [
    { href: "/admin/applications", label: "Applications", value: `${pending} pending` },
    { href: "/admin/events", label: "Events", value: `${events} total` },
    { href: "/admin/gallery", label: "Gallery", value: `${gallery} photos` },
    { href: "/admin/blog", label: "Blog", value: `${posts} posts` },
  ];

  return (
    <div>
      <SectionHeading
        title="Admin overview"
        description="Publish events, gallery photos, notices, and blog posts. Approve membership applications."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="transition hover:border-[var(--gold)]">
              <h2 className="font-medium text-[var(--navy)]">{item.label}</h2>
              <p className="mt-2 text-sm text-[var(--navy)]/70">{item.value}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
