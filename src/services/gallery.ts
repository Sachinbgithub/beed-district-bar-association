import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
};

const getCachedGalleryItems = unstable_cache(
  async (): Promise<GalleryItem[]> => {
    const rows = await db.galleryImage.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      src: row.src,
      title: row.title,
      caption: row.caption ?? "",
      category: row.category,
    }));
  },
  ["published-gallery"],
  { revalidate: 60, tags: ["gallery"] },
);

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return getCachedGalleryItems();
}

export async function getAdminGallery() {
  return db.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function createGalleryImage(data: {
  title: string;
  caption?: string;
  category: string;
  src: string;
  isPublished: boolean;
  uploadedById: string;
  sortOrder?: number;
}) {
  return db.galleryImage.create({
    data: {
      title: data.title,
      caption: data.caption,
      category: data.category,
      src: data.src,
      isPublished: data.isPublished,
      uploadedById: data.uploadedById,
      sortOrder: data.sortOrder ?? 0,
    },
  });
}
