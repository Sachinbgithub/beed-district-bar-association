import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const company = await db.user.findUnique({ where: { email: "company@beedbar.local" } });
console.log({
  company: company?.email,
  password: company?.password,
  role: company?.role,
  events: await db.event.count(),
  gallery: await db.galleryImage.count(),
  posts: await db.blogPost.count(),
  notices: await db.notice.count(),
});
await db.$disconnect();
