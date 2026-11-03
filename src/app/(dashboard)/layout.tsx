import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/members", label: "Members (public)" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <aside className="w-56 border-r border-black/10 bg-[var(--navy)] p-4 text-white">
        <p className="mb-6 text-sm font-semibold">Member area</p>
        <nav className="grid gap-2 text-sm">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2 py-1.5 hover:bg-white/10">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
