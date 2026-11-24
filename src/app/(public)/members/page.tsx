import { MembersDirectory } from "@/components/features/members/members-directory";
import { Container } from "@/components/layout/container";
import { getDictionary } from "@/i18n/dictionaries";
import { formatMessage, getLocale } from "@/lib/locale";
import { getMembers } from "@/services/members";

export default async function MembersPage() {
  const dict = getDictionary(await getLocale());
  const members = await getMembers();

  return (
    <>
      <section className="bg-[var(--navy-deep)] text-white">
        <Container className="py-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            {dict.copy.membersEyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {dict.copy.membersTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
            {formatMessage(dict.copy.membersLead, { count: members.length })}
          </p>
        </Container>
      </section>

      <Container className="py-10">
        <MembersDirectory
          members={members}
          labels={{
            searchByName: dict.copy.searchByName,
            enrollmentNo: dict.copy.enrollmentNo,
            category: dict.copy.category,
            reset: dict.copy.reset,
            showingMembers: dict.copy.showingMembers,
            noMembers: dict.copy.noMembers,
            namePlaceholder: dict.copy.namePlaceholder,
            enrollmentPlaceholder: dict.copy.enrollmentPlaceholder,
            allCategories: dict.copy.allCategories,
            lifeMember: dict.copy.lifeMember,
            womenAdvocate: dict.copy.womenAdvocate,
            annualMember: dict.copy.annualMember,
            seniorAdvocate: dict.copy.seniorAdvocate,
          }}
        />
      </Container>
    </>
  );
}
