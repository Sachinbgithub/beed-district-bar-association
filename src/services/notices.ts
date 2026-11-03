import { notices } from "@/data/notices";
import type { Notice } from "@/types";

export async function getNotices(): Promise<Notice[]> {
  return notices
    .filter((notice) => notice.isPublished)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getLatestNotices(limit = 4): Promise<Notice[]> {
  const all = await getNotices();
  return all.slice(0, limit);
}
