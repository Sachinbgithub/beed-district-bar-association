import Link from "next/link";
import { publishBlogAction } from "@/app/actions/admin";
import { BlogForm } from "@/components/admin/blog-form";
import {
  AdminEmpty,
  AdminList,
  AdminPageHeader,
  RecordRow,
  StatusMark,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/admin/admin-ui";
import { requireStaff } from "@/lib/auth";
import { getAdminPosts } from "@/services/blog";

export default async function AdminBlogPage() {
  await requireStaff();
  const posts = await getAdminPosts();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Blog"
        description="Write posts for the public site. Members can like and comment after login."
      />
      <BlogForm />
      <AdminList>
        {posts.length === 0 ? (
          <AdminEmpty>No posts on record yet.</AdminEmpty>
        ) : (
          posts.map((post) => (
            <RecordRow
              key={post.id}
              title={post.title}
              status={<StatusMark status={post.isPublished ? "Published" : "Draft"} />}
              meta={`/blog/${post.slug}`}
              actions={
                post.isPublished ? (
                  <Link href={`/blog/${post.slug}`} className={secondaryButtonClass}>
                    View
                  </Link>
                ) : (
                  <form action={publishBlogAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className={primaryButtonClass}>
                      Publish
                    </button>
                  </form>
                )
              }
            />
          ))
        )}
      </AdminList>
    </div>
  );
}
