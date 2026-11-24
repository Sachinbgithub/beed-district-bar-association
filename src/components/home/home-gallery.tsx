import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, pickLocalized } from "@/lib/locale";
import { getGalleryItems } from "@/services/gallery";

export async function HomeGallery() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const galleryItems = await getGalleryItems();
  const items = galleryItems.slice(0, 8);

  return (
    <section>
      <SectionHeader title={dict.copy.galleryTitle} href="/gallery" actionLabel={dict.copy.openGallery} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {items.map((item) => {
          const title = pickLocalized(locale, item.title, item.titleMr, item.titleHi);
          return (
          <Link
            key={item.id}
            href="/gallery"
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={item.src}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium leading-snug text-white sm:p-4">
              {title}
            </p>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
