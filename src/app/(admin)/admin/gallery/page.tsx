import Image from "next/image";
import { GalleryForm } from "@/components/admin/gallery-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireStaff } from "@/lib/auth";
import { getAdminGallery } from "@/services/gallery";

export default async function AdminGalleryPage() {
  await requireStaff();
  const items = await getAdminGallery();

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Gallery"
        description="Only staff can upload. Published photos appear on the public gallery."
      />
      <GalleryForm />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
            <div className="relative aspect-[4/3]">
              <Image src={item.src} alt={item.title} fill className="object-cover" sizes="33vw" />
            </div>
            <figcaption className="p-3 text-sm">
              <p className="font-medium text-[var(--navy)]">{item.title}</p>
              <p className="text-[var(--muted)]">{item.isPublished ? "Published" : "Draft"}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
