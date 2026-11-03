import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-semibold text-[var(--navy)]">Member login</h1>
      <p className="mt-1 text-sm text-[var(--navy)]/70">
        Enrolled advocates can sign in to view dues, ID card status, and member notices. Auth will be wired later.
      </p>
      <form className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          Email or enrolment no.
          <input className="rounded-md border border-black/15 px-3 py-2" name="login" />
        </label>
        <label className="grid gap-1 text-sm">
          Password
          <input className="rounded-md border border-black/15 px-3 py-2" type="password" name="password" />
        </label>
        <button type="button" className="rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white">
          Sign in
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