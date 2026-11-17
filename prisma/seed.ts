import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const company = await db.user.upsert({
    where: { email: "company@beedbar.local" },
    update: {},
    create: {
      email: "company@beedbar.local",
      password: "company123",
      role: "COMPANY",
    },
  });

  await db.user.upsert({
    where: { email: "admin@beedbar.local" },
    update: {},
    create: {
      email: "admin@beedbar.local",
      password: "admin123",
      role: "ADMIN",
    },
  });

  const eventCount = await db.event.count();
  if (eventCount === 0) {
    await db.event.createMany({
      data: [
        {
          title: "Legal Aid Camp — Rural Outreach",
          description:
            "Free legal advice camp coordinated with the District Legal Services Authority for villagers of Shirur Kasar and adjoining areas.",
          venue: "Shirur Kasar, Beed",
          startsAt: new Date("2026-11-07T10:00:00+05:30"),
          category: "Welfare",
          image: "/images/gallery/plantation.jpg",
          isPublished: true,
          createdById: company.id,
        },
        {
          title: "Foundation Day Lecture & Gold Medal Ceremony",
          description:
            "Flagship lecture by a senior High Court advocate on constitutional values, followed by gold medal felicitation of outstanding juniors.",
          venue: "District Court Hall, Beed",
          startsAt: new Date("2026-11-14T16:00:00+05:30"),
          category: "Seminar",
          image: "/images/gallery/seminar.jpg",
          isPublished: true,
          createdById: company.id,
        },
        {
          title: "Advocates' Premier League — Cricket Tournament",
          description:
            "Four-team knockout tournament between chambers of the District Court. Registration at the Association office till 30 October.",
          venue: "Beed Municipal Ground",
          startsAt: new Date("2026-11-22T16:30:00+05:30"),
          category: "Sports",
          image: "/images/gallery/cricket.jpg",
          isPublished: true,
          createdById: company.id,
        },
        {
          title: "General Body Meeting — Annual Accounts",
          description:
            "All members are cordially invited. Presentation of audited accounts, library grants, and resolutions on member welfare schemes.",
          venue: "Bar Association Meeting Hall, Beed",
          startsAt: new Date("2026-05-10T16:00:00+05:30"),
          category: "Meeting",
          image: "/images/gallery/general-body.jpg",
          isPublished: true,
          createdById: company.id,
        },
        {
          title: "Annual Day Celebration",
          description:
            "Cultural evening for members and families — felicitation of senior advocates and togetherness of the Beed District Bar.",
          venue: "Town Hall, Beed",
          startsAt: new Date("2026-01-17T18:00:00+05:30"),
          category: "Cultural",
          image: "/images/gallery/annual-day.jpg",
          isPublished: true,
          createdById: company.id,
        },
      ],
    });
  }

  const noticeCount = await db.notice.count();
  if (noticeCount === 0) {
    await db.notice.createMany({
      data: [
        {
          title: "Election Schedule — Managing Committee 2026–28",
          body: "Draft electoral roll, nomination dates and polling schedule for the Managing Committee elections of Beed District Bar Association have been notified.",
          category: "Election",
          publishedAt: new Date("2026-11-09"),
          pdfFileName: "Election-Schedule.pdf",
          isPublished: true,
        },
        {
          title: "General Body Meeting — Agenda Circulated",
          body: "All members are cordially invited to the General Body Meeting. Agenda includes annual accounts, library grants and welfare resolutions.",
          category: "Meeting",
          publishedAt: new Date("2026-11-05"),
          pdfFileName: "GBM-Agenda.pdf",
          isPublished: true,
        },
        {
          title: "Court Sitting List — November 2026",
          body: "Sitting list of Hon’ble Judicial Officers of Beed District for November 2026, including bail charge arrangements.",
          category: "Circular",
          publishedAt: new Date("2026-11-01"),
          pdfFileName: "Sitting-List-Nov-2026.pdf",
          isPublished: true,
        },
        {
          title: "Annual Subscription for FY 2026–27",
          body: "Members are requested to clear annual subscription for FY 2026–27 on or before 30 June 2026.",
          category: "General",
          publishedAt: new Date("2026-04-15"),
          pdfFileName: "Subscription-Notice.pdf",
          isPublished: true,
        },
        {
          title: "Library Timings Revised",
          body: "With effect from 1 May 2026, the Bar Library will remain open from 10:30 AM to 5:30 PM on working days.",
          category: "Office Order",
          publishedAt: new Date("2026-04-22"),
          pdfFileName: "Library-Timings.pdf",
          isPublished: true,
        },
        {
          title: "Medical Claim Forms Available",
          body: "Updated medical claim and death claim forms are available at the Association counter.",
          category: "Welfare",
          publishedAt: new Date("2026-03-28"),
          pdfFileName: "Medical-Claim-Form.pdf",
          isPublished: true,
        },
      ],
    });
  }

  const galleryCount = await db.galleryImage.count();
  if (galleryCount === 0) {
    await db.galleryImage.createMany({
      data: [
        {
          title: "Advocates at the District Court Entrance",
          caption: "Members of Beed District Bar Association at the District & Sessions Court complex.",
          category: "Members",
          src: "/images/gallery/advocates.jpg",
          isPublished: true,
          sortOrder: 1,
          uploadedById: company.id,
        },
        {
          title: "Full Court Reference — Observed",
          caption: "General body meeting of the Association — all members cordially invited.",
          category: "Meeting",
          src: "/images/gallery/general-body.jpg",
          isPublished: true,
          sortOrder: 2,
          uploadedById: company.id,
        },
        {
          title: "Judicial Officers' Farewell",
          caption: "District Court campus, Beed — ceremonies and official gatherings.",
          category: "Court",
          src: "/images/hero/district-court.jpg",
          isPublished: true,
          sortOrder: 3,
          uploadedById: company.id,
        },
        {
          title: "Foundation Day Lecture",
          caption: "CLE lecture on constitutional values and judicial independence.",
          category: "Seminar",
          src: "/images/gallery/seminar.jpg",
          isPublished: true,
          sortOrder: 4,
          uploadedById: company.id,
        },
        {
          title: "Evidence Act Workshop — Session I",
          caption: "Study and research at the Association law library.",
          category: "Workshop",
          src: "/images/gallery/library.jpg",
          isPublished: true,
          sortOrder: 5,
          uploadedById: company.id,
        },
        {
          title: "New Criminal Laws Workshop",
          caption: "Professional development programme for members of the Bar.",
          category: "Workshop",
          src: "/images/gallery/annual-day.jpg",
          isPublished: true,
          sortOrder: 6,
          uploadedById: company.id,
        },
        {
          title: "Advocates' Cricket Tournament",
          caption: "Sports meet organised for chambers of the District Court.",
          category: "Sports",
          src: "/images/gallery/cricket.jpg",
          isPublished: true,
          sortOrder: 7,
          uploadedById: company.id,
        },
        {
          title: "Cricket Final — Trophy Presentation",
          caption: "Fellowship and trophies after the advocates' premier league.",
          category: "Sports",
          src: "/images/gallery/cricket.jpg",
          isPublished: true,
          sortOrder: 8,
          uploadedById: company.id,
        },
      ],
    });
  }

  const postCount = await db.blogPost.count();
  if (postCount === 0) {
    await db.blogPost.create({
      data: {
        slug: "welcome-to-beed-bar",
        title: "Welcome to the Beed District Bar Association website",
        body: "This platform carries notices, events, gallery updates, and member facilities for advocates practising at the District Court, Beed. Signed-in members can like and comment on Association posts.",
        isPublished: true,
        publishedAt: new Date(),
        authorId: company.id,
      },
    });
  }

  console.log("Seed complete.");
  console.log("Company login: company@beedbar.local / company123");
  console.log("Admin login: admin@beedbar.local / admin123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
