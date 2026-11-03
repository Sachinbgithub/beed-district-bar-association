import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { getMemberById, getMembers } from "@/services/members";

const accents = {
  blue: "bg-[#d9e4f5] text-[#35507a]",
  pink: "bg-[#f5d9e6] text-[#7a3558]",
  green: "bg-[#d9efe0] text-[#2f6b45]",
  orange: "bg-[#f5e2d0] text-[#8a5530]",
  purple: "bg-[#e6d9f5] text-[#55357a]",
  teal: "bg-[#d7eef5] text-[#2f6678]",
} as const;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({ id: member.id }));
}

export default async function MemberProfilePage({ params }: PageProps) {
  const { id } = await params;
  const member = await getMemberById(id);

  if (!member) notFound();

  return (
    <>
      <section className="bg-[var(--navy-deep)] text-white">
        <Container className="py-12 sm:py-14">
          <Link href="/members" className="text-sm text-white/70 hover:text-white">
            ← Back to directory
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold ${accents[member.accent]}`}
            >
              {member.initials}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Member profile
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{member.fullName}</h1>
              <p className="mt-2 text-white/75">Enrl. No. {member.enrollmentNo}</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-serif text-xl font-bold text-[var(--navy)]">Practice</h2>
            <div className="mt-2 h-0.5 w-12 bg-[var(--gold)]" />
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-[var(--muted)]">Category</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">{member.category}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Specialization</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">{member.specialization}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Chamber</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">
                  {member.chamberNo ? `Chamber ${member.chamberNo}` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Since</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">{member.yearOfEnrollment}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[var(--muted)]">Practice areas</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">
                  {member.practiceAreas?.join(" · ") ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[var(--navy)]">Contact</h2>
            <div className="mt-2 h-0.5 w-12 bg-[var(--gold)]" />
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-[var(--muted)]">Phone</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">{member.phone ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Email</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">{member.email ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">City</dt>
                <dd className="mt-1 font-medium text-[var(--navy)]">{member.city ?? "Beed"}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-[var(--muted)]">
              Demo profile — replace with verified member records later.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
