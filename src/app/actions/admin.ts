"use server";

import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireCompany, requireStaff } from "@/lib/auth";
import { notifyActiveMembers } from "@/lib/email";
import { approveApplication, rejectApplication } from "@/services/applications";
import { createPost, publishPost } from "@/services/blog";
import { createEvent, publishEvent } from "@/services/events";
import { createGalleryImage } from "@/services/gallery";
import { createNotice, publishNotice } from "@/services/notices";
import { db } from "@/lib/db";

export type ActionState = { error?: string; success?: string };

export async function approveApplicationAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") || "");
  await approveApplication(id);
  revalidatePath("/admin/applications");
}

export async function rejectApplicationAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") || "");
  await rejectApplication(id);
  revalidatePath("/admin/applications");
}

export async function createEventAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireStaff();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const venue = String(formData.get("venue") || "").trim();
  const startsAt = String(formData.get("startsAt") || "");
  const category = String(formData.get("category") || "Seminar");
  const image = String(formData.get("image") || "").trim();
  const publish = formData.get("publish") === "on";

  if (!title || !startsAt) {
    return { error: "Title and start date are required." };
  }

  const event = await createEvent({
    title,
    description: description || undefined,
    venue: venue || undefined,
    startsAt: new Date(startsAt),
    category,
    image: image || undefined,
    isPublished: publish,
    createdById: user.id,
  });

  if (publish) {
    await notifyActiveMembers({
      kind: "event",
      sourceId: event.id,
      subject: `New event: ${event.title}`,
      text: `${event.title}\n${event.venue ?? ""}\n${event.description ?? ""}`,
    });
  }

  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
  return { success: publish ? "Event published." : "Event saved as draft." };
}

export async function publishEventAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") || "");
  const event = await publishEvent(id);
  await notifyActiveMembers({
    kind: "event",
    sourceId: event.id,
    subject: `New event: ${event.title}`,
    text: `${event.title}\n${event.venue ?? ""}\n${event.description ?? ""}`,
  });
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function createNoticeAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireStaff();
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const category = String(formData.get("category") || "General");
  const pdfFileName = String(formData.get("pdfFileName") || "").trim();
  const publish = formData.get("publish") === "on";

  if (!title || !body) return { error: "Title and body are required." };

  const notice = await createNotice({
    title,
    body,
    category,
    pdfFileName: pdfFileName || undefined,
    isPublished: publish,
  });

  if (publish) {
    await notifyActiveMembers({
      kind: "notice",
      sourceId: notice.id,
      subject: `Notice: ${notice.title}`,
      text: notice.body,
    });
  }

  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/admin/notices");
  return { success: publish ? "Notice published." : "Notice saved as draft." };
}

export async function publishNoticeAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") || "");
  const notice = await publishNotice(id);
  await notifyActiveMembers({
    kind: "notice",
    sourceId: notice.id,
    subject: `Notice: ${notice.title}`,
    text: notice.body,
  });
  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/admin/notices");
}

export async function uploadGalleryAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireStaff();
  const title = String(formData.get("title") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  const category = String(formData.get("category") || "General");
  const publish = formData.get("publish") === "on";
  const file = formData.get("file");

  if (!title || !(file instanceof File) || file.size === 0) {
    return { error: "Title and image file are required." };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "gallery");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), bytes);
  const src = `/uploads/gallery/${fileName}`;

  await createGalleryImage({
    title,
    caption: caption || undefined,
    category,
    src,
    isPublished: publish,
    uploadedById: user.id,
  });

  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  return { success: publish ? "Photo published." : "Photo saved as draft." };
}

export async function createBlogAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireStaff();
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const publish = formData.get("publish") === "on";

  if (!title || !body) return { error: "Title and body are required." };

  const post = await createPost({
    title,
    body,
    authorId: user.id,
    isPublished: publish,
  });

  if (publish) {
    await notifyActiveMembers({
      kind: "blog",
      sourceId: post.id,
      subject: `New post: ${post.title}`,
      text: post.body,
    });
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: publish ? "Post published." : "Post saved as draft." };
}

export async function publishBlogAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") || "");
  const post = await publishPost(id);
  await notifyActiveMembers({
    kind: "blog",
    sourceId: post.id,
    subject: `New post: ${post.title}`,
    text: post.body,
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function createAccountAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireCompany();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "STAFF");

  if (!email || !password) return { error: "Email and password are required." };
  if (!["COMPANY", "ADMIN", "STAFF"].includes(role)) {
    return { error: "Invalid role." };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "That email is already in use." };

  await db.user.create({
    data: {
      email,
      password,
      role: role as "COMPANY" | "ADMIN" | "STAFF",
    },
  });

  revalidatePath("/admin/accounts");
  return { success: "Account created." };
}

export async function updatePasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireCompany();
  const id = String(formData.get("id") || "");
  const password = String(formData.get("password") || "");
  if (!id || !password) return { error: "User and password are required." };

  await db.user.update({ where: { id }, data: { password } });
  revalidatePath("/admin/accounts");
  return { success: "Password updated." };
}

export async function setLocaleAction(formData: FormData) {
  const { cookies } = await import("next/headers");
  const { LOCALE_COOKIE, isAppLocale } = await import("@/lib/locale");
  const locale = String(formData.get("locale") || "en");
  if (!isAppLocale(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  revalidatePath("/", "layout");
}
