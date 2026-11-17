import { db } from "@/lib/db";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
};

export async function getGalleryItems(): Promise<GalleryItem[]> {
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
