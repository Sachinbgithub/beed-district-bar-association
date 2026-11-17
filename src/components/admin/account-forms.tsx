"use client";

import { useActionState } from "react";
import {
  createAccountAction,
  updatePasswordAction,
  type ActionState,
} from "@/app/actions/admin";

const initial: ActionState = {};

export function CreateAccountForm() {
  const [state, action, pending] = useActionState(createAccountAction, initial);

  return (
    <form action={action} className="grid max-w-xl gap-3 rounded-xl border border-[var(--border)] bg-white p-5">
      <h2 className="font-medium text-[var(--navy)]">Create staff account</h2>
      <input name="email" type="email" required placeholder="Email" className="rounded-md border px-3 py-2 text-sm" />
      <input
        name="password"
        type="text"
        required
        placeholder="Password (stored as plain text)"
        className="rounded-md border px-3 py-2 text-sm"
      />
      <select name="role" defaultValue="STAFF" className="rounded-md border px-3 py-2 text-sm">
        <option value="STAFF">Staff</option>
        <option value="ADMIN">Admin</option>
        <option value="COMPANY">Company</option>
      </select>
      {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-green-800">{state.success}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white"
      >
        Create
      </button>
    </form>
  );
}

export function UpdatePasswordForm({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState(updatePasswordAction, initial);

  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={userId} />
      <input
        name="password"
        type="text"
        required
        placeholder="New password"
        className="rounded-md border px-2 py-1 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border px-2 py-1 text-sm"
      >
        Update
      </button>
      {state.error ? <span className="text-xs text-red-700">{state.error}</span> : null}
      {state.success ? <span className="text-xs text-green-800">{state.success}</span> : null}
    </form>
  );
}
