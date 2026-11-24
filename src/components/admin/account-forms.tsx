"use client";

import { useActionState } from "react";
import {
  createAccountAction,
  updatePasswordAction,
  type ActionState,
} from "@/app/actions/admin";
import { fieldClass, primaryButtonClass, secondaryButtonClass } from "@/components/admin/admin-ui";

const initial: ActionState = {};

export function CreateAccountForm() {
  const [state, action, pending] = useActionState(createAccountAction, initial);

  return (
    <form action={action} className="max-w-2xl border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <h2 className="font-serif text-lg text-[var(--navy)]">Create staff account</h2>
      </div>
      <div className="grid gap-4 p-4 sm:p-5">
        <input name="email" type="email" required placeholder="Email" className={fieldClass} />
        <input
          name="password"
          type="text"
          required
          placeholder="Password (stored as plain text)"
          className={fieldClass}
        />
        <select name="role" defaultValue="STAFF" className={fieldClass}>
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
          <option value="COMPANY">Company</option>
        </select>
        {state.error ? <p className="text-sm text-[#6b2d22]">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-[#1c4532]">{state.success}</p> : null}
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Creating…" : "Create"}
        </button>
      </div>
    </form>
  );
}

export function UpdatePasswordForm({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState(updatePasswordAction, initial);

  return (
    <form action={action} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <input type="hidden" name="id" value={userId} />
      <input
        name="password"
        type="text"
        required
        placeholder="New password"
        className={`${fieldClass} sm:w-48`}
      />
      <button type="submit" disabled={pending} className={secondaryButtonClass}>
        {pending ? "Updating…" : "Update"}
      </button>
      {state.error ? <span className="text-xs text-[#6b2d22]">{state.error}</span> : null}
      {state.success ? <span className="text-xs text-[#1c4532]">{state.success}</span> : null}
    </form>
  );
}
