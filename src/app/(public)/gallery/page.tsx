import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, pickLocalized } from "@/lib/locale";
import { getGalleryItems } from "@/services/gallery";

export default async function GalleryPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const galleryItems = await getGalleryItems();

  return (
    <Container className="py-10">
      <SectionHeading title={dict.copy.galleryPageTitle} description={dict.copy.galleryPageDescription} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
        {galleryItems.map((item) => {
          const title = pickLocalized(locale, item.title, item.titleMr, item.titleHi);
          return (
          <figure key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={item.src}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <p className="text-xs uppercase tracking-wide text-white/70">{item.category}</p>
              <p className="mt-1 text-sm font-medium leading-snug text-white">{title}</p>
            </figcaption>
          </figure>
          );
        })}
      </div>
    </Container>
  );
}
