import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryItems } from "@/data/gallery";

export function HomeGallery() {
  const items = galleryItems.slice(0, 8);

  return (
    <section>
      <SectionHeader title="From the Photo Gallery" href="/gallery" actionLabel="Open Gallery →" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {items.map((item) => (
          <Link
            key={item.id}
            href="/gallery"
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium leading-snug text-white sm:p-4">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
