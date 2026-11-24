"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthState } from "@/app/actions/auth";
import { Card } from "@/components/ui/card";

const initial: AuthState = {};

export function LoginForm({
  labels,
}: {
  labels: {
    title: string;
    hint: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
  };
}) {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-semibold text-[var(--navy)]">{labels.title}</h1>
      <p className="mt-1 text-sm text-[var(--navy)]/70">{labels.hint}</p>
      <form action={action} className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          {labels.email}
          <input className="rounded-md border border-black/15 px-3 py-2" name="login" required />
        </label>
        <label className="grid gap-1 text-sm">
          {labels.password}
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
          {pending ? labels.signingIn : labels.signIn}
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
