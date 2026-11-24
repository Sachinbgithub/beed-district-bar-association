import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const getCachedPublishedPosts = unstable_cache(
  async () => {
    return db.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    });
  },
  ["published-blog-posts"],
  { revalidate: 60, tags: ["blog"] },
);

export async function getPublishedPosts() {
  const posts = await getCachedPublishedPosts();
  return posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  }));
}

const getCachedPostBySlug = unstable_cache(
  async (slug: string) => {
    return db.blogPost.findFirst({
      where: { slug, isPublished: true },
      include: {
        likes: true,
        comments: {
          orderBy: { createdAt: "desc" },
          include: { user: { include: { member: true } } },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });
  },
  ["blog-post-by-slug"],
  { revalidate: 60, tags: ["blog"] },
);

export async function getPostBySlug(slug: string) {
  const post = await getCachedPostBySlug(slug);
  if (!post) return null;
  return {
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    likes: post.likes.map((like) => ({
      ...like,
      createdAt: new Date(like.createdAt),
    })),
    comments: post.comments.map((comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
      user: {
        ...comment.user,
        createdAt: new Date(comment.user.createdAt),
        updatedAt: new Date(comment.user.updatedAt),
        member: comment.user.member
          ? {
              ...comment.user.member,
              createdAt: new Date(comment.user.member.createdAt),
              updatedAt: new Date(comment.user.member.updatedAt),
            }
          : null,
      },
    })),
  };
}

export async function getAdminPosts() {
  return db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPost(data: {
  title: string;
  body: string;
  authorId: string;
  isPublished: boolean;
}) {
  let slug = slugify(data.title) || `post-${Date.now()}`;
  const existing = await db.blogPost.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  return db.blogPost.create({
    data: {
      title: data.title,
      body: data.body,
      slug,
      authorId: data.authorId,
      isPublished: data.isPublished,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
}

export async function publishPost(id: string) {
  return db.blogPost.update({
    where: { id },
    data: { isPublished: true, publishedAt: new Date() },
  });
}

export async function toggleLike(postId: string, userId: string) {
  const existing = await db.blogLike.findUnique({
    where: { postId_userId: { postId, userId } },
  });
  if (existing) {
    await db.blogLike.delete({ where: { id: existing.id } });
    return false;
  }
  await db.blogLike.create({ data: { postId, userId } });
  return true;
}

export async function addComment(postId: string, userId: string, body: string) {
  return db.blogComment.create({
    data: { postId, userId, body },
  });
}
