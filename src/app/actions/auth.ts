"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  findUserForLogin,
  redirectForRole,
} from "@/lib/auth";
import { submitApplication } from "@/services/applications";

export type AuthState = { error?: string; success?: string };

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const login = String(formData.get("login") || "").trim();
  const password = String(formData.get("password") || "");

  if (!login || !password) {
    return { error: "Enter your email or enrolment number and password." };
  }

  const user = await findUserForLogin(login);
  if (!user || user.password !== password) {
    return { error: "Invalid login details." };
  }

  if (user.role === "MEMBER" && user.member && !user.member.isActive) {
    return { error: "Invalid login details." };
  }

  await createSession(user.id);
  redirect(redirectForRole(user.role as "COMPANY" | "ADMIN" | "STAFF" | "MEMBER"));
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function registerAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const enrollmentNo = String(formData.get("enrollmentNo") || "").trim();
  const chamber = String(formData.get("chamber") || "").trim();
  const practiceArea = String(formData.get("practiceArea") || "").trim();
  const password = String(formData.get("password") || "");

  if (!fullName || !email || !enrollmentNo || !password) {
    return { error: "Name, email, enrolment number, and password are required." };
  }

  try {
    await submitApplication({
      fullName,
      email,
      phone: phone || undefined,
      enrollmentNo,
      chamber: chamber || undefined,
      practiceArea: practiceArea || undefined,
      password,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not submit application.",
    };
  }

  return {
    success:
      "Application submitted. You can sign in after the Association approves it.",
  };
}
