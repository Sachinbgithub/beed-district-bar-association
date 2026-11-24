import Link from "next/link";
import { notFound } from "next/navigation";
import { commentPostAction, likePostAction } from "@/app/actions/blog";
import { Container } from "@/components/layout/container";
import { getDictionary } from "@/i18n/dictionaries";
import { getSessionUser, isStaffRole } from "@/lib/auth";
import { formatDate, formatDateTime } from "@/lib/format";
import { formatMessage, getLocale, pickLocalized } from "@/lib/locale";
import { getPostBySlug } from "@/services/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const locale = await getLocale();
  const dict = getDictionary(locale);
  const title = pickLocalized(locale, post.title, post.titleMr, post.titleHi);
  const body = pickLocalized(locale, post.body, post.bodyMr, post.bodyHi);
  const user = await getSessionUser();
  const canInteract = Boolean(user && (user.role === "MEMBER" || isStaffRole(user.role)));
  const liked = user ? post.likes.some((like) => like.userId === user.id) : false;

  return (
    <Container className="py-10">
      <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--navy)]">
        {dict.copy.backToBlog}
      </Link>
      <article className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-[var(--gold)]">
          {post.publishedAt ? formatDate(post.publishedAt.toISOString()) : ""}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-[var(--navy)]">{title}</h1>
        <p className="mt-6 whitespace-pre-wrap leading-relaxed text-[var(--muted)]">{body}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--muted)]">
            {formatMessage(dict.copy.likesComments, {
              likes: post._count.likes,
              comments: post._count.comments,
            })}
          </p>
          {canInteract ? (
            <form action={likePostAction}>
              <input type="hidden" name="postId" value={post.id} />
              <input type="hidden" name="slug" value={post.slug} />
              <button
                type="submit"
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--navy)]"
              >
                {liked ? "Unlike" : "Like"}
              </button>
            </form>
          ) : (
            <Link href="/login" className="text-sm text-[var(--navy)] underline">
              Sign in to like or comment
            </Link>
          )}
        </div>

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">Comments</h2>
          {canInteract ? (
            <form action={commentPostAction} className="mt-4 grid gap-3">
              <input type="hidden" name="postId" value={post.id} />
              <input type="hidden" name="slug" value={post.slug} />
              <textarea
                name="body"
                required
                placeholder="Write a comment"
                className="min-h-24 rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="w-fit rounded-md bg-[var(--navy)] px-4 py-2 text-sm text-white"
              >
                Post comment
              </button>
            </form>
          ) : null}

          <div className="mt-6 space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="rounded-xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs text-[var(--muted)]">
                  {comment.user.member?.fullName ?? comment.user.email} ·{" "}
                  {formatDateTime(comment.createdAt.toISOString())}
                </p>
                <p className="mt-2 text-sm text-[var(--navy)]">{comment.body}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </Container>
  );
}
