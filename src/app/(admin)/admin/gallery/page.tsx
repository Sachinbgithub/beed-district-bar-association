import Image from "next/image";
import { GalleryForm } from "@/components/admin/gallery-form";
import { AdminEmpty, AdminPageHeader, StatusMark } from "@/components/admin/admin-ui";
import { requireStaff } from "@/lib/auth";
import { getAdminGallery } from "@/services/gallery";

export default async function AdminGalleryPage() {
  await requireStaff();
  const items = await getAdminGallery();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Gallery"
        description="Only staff can upload. Published photos appear on the public gallery."
      />
      <GalleryForm />
      {items.length === 0 ? (
        <p className="border border-[var(--border)] bg-white px-4 py-8 text-sm text-[var(--muted)] sm:px-5">
          No photographs on record yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="border border-[var(--border)] bg-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 320px"
                />
              </div>
              <figcaption className="flex items-start justify-between gap-3 p-3">
                <p className="font-medium text-[var(--navy)]">{item.title}</p>
                <StatusMark status={item.isPublished ? "Published" : "Draft"} />
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
