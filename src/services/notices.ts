import { db } from "@/lib/db";
import type { Notice } from "@/types";

function mapNotice(row: {
  id: string;
  title: string;
  body: string;
  category: string;
  publishedAt: Date | null;
  pdfFileName: string | null;
  isPublished: boolean;
}): Notice {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    category: row.category as Notice["category"],
    publishedAt: (row.publishedAt ?? new Date()).toISOString().slice(0, 10),
    pdfFileName: row.pdfFileName ?? undefined,
    isPublished: row.isPublished,
  };
}

export async function getNotices(): Promise<Notice[]> {
  const rows = await db.notice.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map(mapNotice);
}

export async function getLatestNotices(limit = 4): Promise<Notice[]> {
  const all = await getNotices();
  return all.slice(0, limit);
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
