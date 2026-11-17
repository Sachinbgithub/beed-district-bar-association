import { CreateAccountForm, UpdatePasswordForm } from "@/components/admin/account-forms";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireCompany } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AccountsPage() {
  await requireCompany();
  const users = await db.user.findMany({
    include: { member: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Accounts"
        description="Company only. Emails and passwords are stored in plain text in the database."
      />
      <CreateAccountForm />
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-[var(--cream)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Password</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Change password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <p>{user.email}</p>
                  {user.member?.enrollmentNo ? (
                    <p className="text-xs text-[var(--muted)]">{user.member.enrollmentNo}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{user.password}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <UpdatePasswordForm userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
