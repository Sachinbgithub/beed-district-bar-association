"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getSessionUser, isStaffRole } from "@/lib/auth";
import { addComment, toggleLike } from "@/services/blog";

export async function likePostAction(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return;
  if (user.role === "MEMBER" || isStaffRole(user.role)) {
    const postId = String(formData.get("postId") || "");
    const slug = String(formData.get("slug") || "");
    await toggleLike(postId, user.id);
    updateTag("blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/blog");
  }
}

export async function commentPostAction(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return;
  if (!(user.role === "MEMBER" || isStaffRole(user.role))) return;

  const postId = String(formData.get("postId") || "");
  const slug = String(formData.get("slug") || "");
  const body = String(formData.get("body") || "").trim();
  if (!body) return;

  await addComment(postId, user.id, body);
  updateTag("blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog");
}
