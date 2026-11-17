import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { isCompanyRole, requireStaff } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff();

  const items = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/applications", label: "Applications" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/notices", label: "Notices" },
    { href: "/admin/gallery", label: "Gallery" },
    { href: "/admin/blog", label: "Blog" },
    ...(isCompanyRole(user.role) ? [{ href: "/admin/accounts", label: "Accounts" }] : []),
  ];

  return (
    <div className="flex flex-1">
      <aside className="w-60 border-r border-black/10 bg-[var(--navy-deep)] p-4 text-white">
        <p className="mb-1 text-sm font-semibold">Admin area</p>
        <p className="mb-6 text-xs text-white/60">{user.email}</p>
        <nav className="grid gap-1 text-sm">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/" className="rounded-md px-2 py-1.5 hover:bg-white/10">
            Public site
          </Link>
        </nav>
        <form action={logoutAction} className="mt-8">
          <button type="submit" className="text-sm text-[var(--gold-soft)] hover:underline">
            Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
