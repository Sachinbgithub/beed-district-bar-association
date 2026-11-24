import { AdminShell } from "@/components/admin/admin-shell";
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
    <AdminShell email={user.email} name={user.fullName} role={user.role} items={items}>
      {children}
    </AdminShell>
  );
}
