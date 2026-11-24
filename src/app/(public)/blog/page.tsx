import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/format";
import { formatMessage, getLocale, pickLocalized } from "@/lib/locale";
import { getPublishedPosts } from "@/services/blog";

export default async function BlogPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const posts = await getPublishedPosts();

  return (
    <Container className="py-10">
      <SectionHeading title={dict.copy.blogPageTitle} description={dict.copy.blogPageDescription} />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => {
          const title = pickLocalized(locale, post.title, post.titleMr, post.titleHi);
          const body = pickLocalized(locale, post.body, post.bodyMr, post.bodyHi);
          return (
          <article
            key={post.id}
            className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(26,39,68,0.06)]"
          >
            <p className="text-xs text-[var(--muted)]">
              {post.publishedAt ? formatDate(post.publishedAt.toISOString()) : ""}
            </p>
            <h2 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{title}</h2>
            <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">{body}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <span className="text-[var(--muted)]">
                {formatMessage(dict.copy.likesComments, {
                  likes: post._count.likes,
                  comments: post._count.comments,
                })}
              </span>
              <Link href={`/blog/${post.slug}`} className="font-medium text-[var(--navy)] underline">
                {dict.common.readMore}
              </Link>
            </div>
          </article>
          );
        })}
      </div>
    </Container>
  );
}
