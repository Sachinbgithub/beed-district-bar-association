"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type AuthState } from "@/app/actions/auth";
import { Card } from "@/components/ui/card";
import { aboutContent } from "@/data/about";

const initial: AuthState = {};

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initial);

  return (
    <Card className="w-full max-w-lg">
      <h1 className="text-2xl font-semibold text-[var(--navy)]">Membership application</h1>
      <p className="mt-1 text-sm text-[var(--navy)]/70">
        {aboutContent.membership.eligibility} You can sign in only after the Association approves
        your application.
      </p>
      <form action={action} className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          Full name (as on sanad)
          <input className="rounded-md border border-black/15 px-3 py-2" name="fullName" required />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input
            className="rounded-md border border-black/15 px-3 py-2"
            type="email"
            name="email"
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          Mobile
          <input className="rounded-md border border-black/15 px-3 py-2" name="phone" />
        </label>
        <label className="grid gap-1 text-sm">
          Enrolment / sanad no.
          <input
            className="rounded-md border border-black/15 px-3 py-2"
            name="enrollmentNo"
            placeholder="e.g. MAH/2018/5120"
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          Chamber / practice address
          <input className="rounded-md border border-black/15 px-3 py-2" name="chamber" />
        </label>
        <label className="grid gap-1 text-sm">
          Practice area
          <select className="rounded-md border border-black/15 px-3 py-2" name="practiceArea" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Civil</option>
            <option>Criminal</option>
            <option>Family / Matrimonial</option>
            <option>Revenue / Land</option>
            <option>Labour</option>
            <option>Other</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Password (for login after approval)
          <input
            className="rounded-md border border-black/15 px-3 py-2"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </label>
        {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-green-800">{state.success}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Submitting…" : "Submit application"}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--navy)]/70">
        Already a member?{" "}
        <Link href="/login" className="text-[var(--navy)] underline">
          Login
        </Link>
      </p>
    </Card>
  );
}
