import Image from "next/image";
import Link from "next/link";
import { HomeAchievements } from "@/components/home/home-achievements";
import { HomeEvents } from "@/components/home/home-events";
import { HomeGallery } from "@/components/home/home-gallery";
import { HomeNotices } from "@/components/home/home-notices";
import { HomeOfficeBearers } from "@/components/home/home-office-bearers";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { getAchievements } from "@/services/achievements";
import { getUpcomingEvents } from "@/services/events";
import { getLatestNotices } from "@/services/notices";
import { getOfficeBearers } from "@/services/office-bearers";

export default async function HomePage() {
  const [notices, events, bearers, achievements] = await Promise.all([
    getLatestNotices(3),
    getUpcomingEvents(3),
    getOfficeBearers(),
    getAchievements(),
  ]);

  return (
    <>
      <section className="relative isolate min-h-[72vh] w-full overflow-hidden bg-[var(--navy-deep)] text-white">
        <Image
          src="/images/hero/district-court.jpg"
          alt="District Court building — Beed Bar Association"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/92 via-[var(--navy-deep)]/72 to-[var(--navy-deep)]/30" />
        <Container className="relative flex min-h-[72vh] flex-col justify-end pb-14 pt-24 sm:pb-20">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
            Est. {siteConfig.established} · Beed, Maharashtra
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/members"
              className="rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-[var(--navy-deep)]"
            >
              Member directory
            </Link>
            <Link
              href="/notices"
              className="rounded-md border border-white/30 px-5 py-2.5 text-sm text-white"
            >
              Latest notices
            </Link>
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-14 sm:space-y-20 sm:py-16">
        <HomeNotices notices={notices} />
        <HomeEvents events={events} />
        <HomeOfficeBearers bearers={bearers} />
        <HomeAchievements items={achievements} />
        <HomeGallery />
      </Container>
    </>
  );
}
