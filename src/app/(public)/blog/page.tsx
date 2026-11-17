import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/format";
import { getPublishedPosts } from "@/services/blog";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <Container className="py-10">
      <SectionHeading
        title="Blog"
        description="Updates from Beed District Bar Association. Signed-in members can like and comment on posts."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(26,39,68,0.06)]"
          >
            <p className="text-xs text-[var(--muted)]">
              {post.publishedAt ? formatDate(post.publishedAt.toISOString()) : ""}
            </p>
            <h2 className="mt-2 font-serif text-xl font-bold text-[var(--navy)]">{post.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">{post.body}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <span className="text-[var(--muted)]">
                {post._count.likes} likes · {post._count.comments} comments
              </span>
              <Link href={`/blog/${post.slug}`} className="font-medium text-[var(--navy)] underline">
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
