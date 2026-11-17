import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/blog", label: "Blog" },
  { href: "/members", label: "Members (public)" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser(["MEMBER", "COMPANY", "ADMIN", "STAFF"]);

  return (
    <div className="flex flex-1">
      <aside className="w-56 border-r border-black/10 bg-[var(--navy)] p-4 text-white">
        <p className="mb-1 text-sm font-semibold">Member area</p>
        <p className="mb-6 text-xs text-white/65">{user.email}</p>
        <nav className="grid gap-2 text-sm">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2 py-1.5 hover:bg-white/10">
              {item.label}
            </Link>
          ))}
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
