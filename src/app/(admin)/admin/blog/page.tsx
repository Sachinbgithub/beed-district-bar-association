import Link from "next/link";
import { publishBlogAction } from "@/app/actions/admin";
import { BlogForm } from "@/components/admin/blog-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireStaff } from "@/lib/auth";
import { getAdminPosts } from "@/services/blog";

export default async function AdminBlogPage() {
  await requireStaff();
  const posts = await getAdminPosts();

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Blog"
        description="Write posts for the public site. Members can like and comment after login."
      />
      <BlogForm />
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium text-[var(--navy)]">{post.title}</p>
              <p className="text-sm text-[var(--muted)]">
                /blog/{post.slug} · {post.isPublished ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2">
              {post.isPublished ? (
                <Link href={`/blog/${post.slug}`} className="rounded-md border px-3 py-2 text-sm">
                  View
                </Link>
              ) : (
                <form action={publishBlogAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="rounded-md bg-[var(--navy)] px-3 py-2 text-sm text-white">
                    Publish
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
