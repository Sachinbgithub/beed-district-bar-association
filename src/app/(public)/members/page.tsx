import { MembersDirectory } from "@/components/features/members/members-directory";
import { Container } from "@/components/layout/container";
import { getMembers } from "@/services/members";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <>
      <section className="bg-[var(--navy-deep)] text-white">
        <Container className="py-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            Directory
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Members Directory
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
            {members.length} advocates listed (demo data). Search by name or enrollment number,
            filter by category and view profiles.
          </p>
        </Container>
      </section>

      <Container className="py-10">
        <MembersDirectory members={members} />
      </Container>
    </>
  );
}
