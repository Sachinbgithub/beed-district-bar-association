import Link from "next/link";
import { Card } from "@/components/ui/card";
import { aboutContent } from "@/data/about";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-lg">
      <h1 className="text-2xl font-semibold text-[var(--navy)]">Membership application</h1>
      <p className="mt-1 text-sm text-[var(--navy)]/70">
        {aboutContent.membership.eligibility} Form is UI-only until auth and Prisma are connected.
      </p>
      <form className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          Full name (as on sanad)
          <input className="rounded-md border border-black/15 px-3 py-2" name="fullName" />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input className="rounded-md border border-black/15 px-3 py-2" type="email" name="email" />
        </label>
        <label className="grid gap-1 text-sm">
          Mobile
          <input className="rounded-md border border-black/15 px-3 py-2" name="phone" />
        </label>
        <label className="grid gap-1 text-sm">
          Enrolment / sanad no.
          <input className="rounded-md border border-black/15 px-3 py-2" name="enrollmentNo" placeholder="e.g. MAH/2018/5120" />
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
        <button type="button" className="rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white">
          Submit application
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
