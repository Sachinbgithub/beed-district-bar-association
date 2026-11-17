import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { User } from "@prisma/client";
import { db } from "@/lib/db";
import type { Role } from "@/types/roles";

export const SESSION_COOKIE = "beed_bar_session";
const SESSION_DAYS = 14;

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  fullName: string | null;
  enrollmentNo: string | null;
};

export function isStaffRole(role: string): role is Role {
  return role === "COMPANY" || role === "ADMIN" || role === "STAFF";
}

export function isCompanyRole(role: string) {
  return role === "COMPANY";
}

export async function createSession(userId: string) {
  const token = crypto.randomUUID() + crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await db.session.create({
    data: { token, userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { token } });
    cookieStore.delete(SESSION_COOKIE);
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: { user: { include: { member: true } } },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await db.session.delete({ where: { id: session.id } }).catch(() => undefined);
    }
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role as Role,
    fullName: session.user.member?.fullName ?? null,
    enrollmentNo: session.user.member?.enrollmentNo ?? null,
  };
}

export async function requireUser(roles?: Role[]) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (roles && !roles.includes(user.role)) redirect("/");
  return user;
}

export async function requireStaff() {
  return requireUser(["COMPANY", "ADMIN", "STAFF"]);
}

export async function requireCompany() {
  return requireUser(["COMPANY"]);
}

export async function findUserForLogin(login: string): Promise<(User & { member: { enrollmentNo: string | null; isActive: boolean } | null }) | null> {
  const value = login.trim();
  if (!value) return null;

  const byEmail = await db.user.findUnique({
    where: { email: value.toLowerCase() },
    include: { member: true },
  });
  if (byEmail) return byEmail;

  const byEnrollment = await db.member.findUnique({
    where: { enrollmentNo: value },
    include: { user: { include: { member: true } } },
  });
  return byEnrollment?.user ?? null;
}

export function redirectForRole(role: Role) {
  if (isStaffRole(role)) return "/admin";
  return "/dashboard";
}
