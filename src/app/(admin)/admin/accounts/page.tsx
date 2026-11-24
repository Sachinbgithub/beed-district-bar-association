import { CreateAccountForm, UpdatePasswordForm } from "@/components/admin/account-forms";
import { AdminPageHeader } from "@/components/admin/admin-ui";
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
      <AdminPageHeader
        title="Accounts"
        description="Company only. Emails and passwords are stored in plain text in the database."
      />
      <CreateAccountForm />
      <div className="divide-y divide-[var(--border)] border border-[var(--border)] bg-white md:hidden">
        {users.map((user) => (
          <article key={user.id} className="space-y-3 px-4 py-4">
            <div>
              <p className="font-medium text-[var(--navy)]">{user.email}</p>
              {user.member?.enrollmentNo ? (
                <p className="text-xs text-[var(--muted)]">{user.member.enrollmentNo}</p>
              ) : null}
            </div>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-y-1 text-sm">
              <dt className="text-[var(--muted)]">Password</dt>
              <dd className="font-mono text-xs break-all">{user.password}</dd>
              <dt className="text-[var(--muted)]">Role</dt>
              <dd>{user.role}</dd>
            </dl>
            <UpdatePasswordForm userId={user.id} />
          </article>
        ))}
      </div>
      <div className="hidden overflow-x-auto border border-[var(--border)] bg-white md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--cream)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Password</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Change password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[var(--border)] last:border-0">
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
