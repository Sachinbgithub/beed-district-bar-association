"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthState } from "@/app/actions/auth";
import { Card } from "@/components/ui/card";

const initial: AuthState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-semibold text-[var(--navy)]">Member login</h1>
      <p className="mt-1 text-sm text-[var(--navy)]/70">
        Sign in with email or enrolment number. Company, admin, and staff accounts use this same form.
      </p>
      <form action={action} className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          Email or enrolment no.
          <input className="rounded-md border border-black/15 px-3 py-2" name="login" required />
        </label>
        <label className="grid gap-1 text-sm">
          Password
          <input
            className="rounded-md border border-black/15 px-3 py-2"
            type="password"
            name="password"
            required
          />
        </label>
        {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--navy)]/70">
        New advocate?{" "}
        <Link href="/register" className="text-[var(--navy)] underline">
          Apply for membership
        </Link>
      </p>
    </Card>
  );
}
