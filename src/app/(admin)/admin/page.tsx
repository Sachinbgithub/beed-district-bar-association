import Link from "next/link";
import { AdminList, AdminPageHeader } from "@/components/admin/admin-ui";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AdminHomePage() {
  await requireStaff();

  const [pending, events, notices, posts, gallery] = await Promise.all([
    db.membershipApplication.count({ where: { status: "PENDING" } }),
    db.event.count(),
    db.notice.count(),
    db.blogPost.count(),
    db.galleryImage.count(),
  ]);

  const links = [
    {
      href: "/admin/applications",
      label: "Applications",
      detail: "Membership requests waiting for a decision",
      value: pending === 0 ? "None waiting" : `${pending} pending`,
      attention: pending > 0,
    },
    {
      href: "/admin/events",
      label: "Events",
      detail: "Programmes of the Association",
      value: `${events} on record`,
      attention: false,
    },
    {
      href: "/admin/notices",
      label: "Notices",
      detail: "Circulars and office orders",
      value: `${notices} on record`,
      attention: false,
    },
    {
      href: "/admin/gallery",
      label: "Gallery",
      detail: "Photographs for the public gallery",
      value: `${gallery} photos`,
      attention: false,
    },
    {
      href: "/admin/blog",
      label: "Blog",
      detail: "Notes published for members and the public",
      value: `${posts} posts`,
      attention: false,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="The office register for applications, programmes, notices, photographs, and posts."
      />
      <AdminList>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-16 flex-col gap-1 px-4 py-4 hover:bg-[var(--cream)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5"
          >
            <span className="min-w-0">
              <span className="block font-medium text-[var(--navy)]">{item.label}</span>
              <span className="mt-0.5 block text-sm text-[var(--muted)]">{item.detail}</span>
            </span>
            <span
              className={
                item.attention
                  ? "text-sm font-medium text-[var(--navy)]"
                  : "text-sm text-[var(--muted)]"
              }
            >
              {item.value}
            </span>
          </Link>
        ))}
      </AdminList>
    </div>
  );
}
