import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import type { Notice } from "@/types";

function mapNotice(row: {
  id: string;
  title: string;
  titleMr?: string | null;
  titleHi?: string | null;
  body: string;
  bodyMr?: string | null;
  bodyHi?: string | null;
  category: string;
  publishedAt: Date | null;
  pdfFileName: string | null;
  isPublished: boolean;
}): Notice {
  return {
    id: row.id,
    title: row.title,
    titleMr: row.titleMr,
    titleHi: row.titleHi,
    body: row.body,
    bodyMr: row.bodyMr,
    bodyHi: row.bodyHi,
    category: row.category as Notice["category"],
    publishedAt: (row.publishedAt ?? new Date()).toISOString().slice(0, 10),
    pdfFileName: row.pdfFileName ?? undefined,
    isPublished: row.isPublished,
  };
}

const getCachedNotices = unstable_cache(
  async (): Promise<Notice[]> => {
    const rows = await db.notice.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(mapNotice);
  },
  ["published-notices"],
  { revalidate: 60, tags: ["notices"] },
);

export async function getNotices(): Promise<Notice[]> {
  return getCachedNotices();
}

const getCachedLatestNotices = unstable_cache(
  async (limit: number): Promise<Notice[]> => {
    const rows = await db.notice.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    return rows.map(mapNotice);
  },
  ["latest-notices"],
  { revalidate: 60, tags: ["notices"] },
);

export async function getLatestNotices(limit = 4): Promise<Notice[]> {
  return getCachedLatestNotices(limit);
}

export async function getAdminNotices() {
  return db.notice.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createNotice(data: {
  title: string;
  body: string;
  category: string;
  pdfFileName?: string;
  isPublished: boolean;
}) {
  return db.notice.create({
    data: {
      title: data.title,
      body: data.body,
      category: data.category,
      pdfFileName: data.pdfFileName,
      isPublished: data.isPublished,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
}

export async function publishNotice(id: string) {
  return db.notice.update({
    where: { id },
    data: { isPublished: true, publishedAt: new Date() },
  });
}
