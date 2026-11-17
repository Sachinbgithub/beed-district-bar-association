import { db } from "@/lib/db";

export async function submitApplication(data: {
  fullName: string;
  email: string;
  phone?: string;
  enrollmentNo: string;
  chamber?: string;
  practiceArea?: string;
  password: string;
}) {
  const email = data.email.trim().toLowerCase();

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const pending = await db.membershipApplication.findFirst({
    where: { email, status: "PENDING" },
  });
  if (pending) {
    throw new Error("An application with this email is already pending.");
  }

  return db.membershipApplication.create({
    data: {
      fullName: data.fullName.trim(),
      email,
      phone: data.phone?.trim() || null,
      enrollmentNo: data.enrollmentNo.trim(),
      chamber: data.chamber?.trim() || null,
      practiceArea: data.practiceArea?.trim() || null,
      password: data.password,
      status: "PENDING",
    },
  });
}

export async function getPendingApplications() {
  return db.membershipApplication.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });
}

export async function getAllApplications() {
  return db.membershipApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function approveApplication(id: string) {
  const application = await db.membershipApplication.findUnique({ where: { id } });
  if (!application || application.status !== "PENDING") {
    throw new Error("Application not found or already reviewed.");
  }

  const email = application.email.toLowerCase();
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("A user with this email already exists.");
  }

  await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: application.password,
        role: "MEMBER",
      },
    });

    await tx.member.create({
      data: {
        userId: user.id,
        fullName: application.fullName,
        enrollmentNo: application.enrollmentNo,
        phone: application.phone,
        chamber: application.chamber,
        practiceArea: application.practiceArea,
        isActive: true,
      },
    });

    await tx.membershipApplication.update({
      where: { id },
      data: { status: "APPROVED", reviewedAt: new Date() },
    });
  });
}

export async function rejectApplication(id: string) {
  const application = await db.membershipApplication.findUnique({ where: { id } });
  if (!application || application.status !== "PENDING") {
    throw new Error("Application not found or already reviewed.");
  }

  await db.membershipApplication.update({
    where: { id },
    data: { status: "REJECTED", reviewedAt: new Date() },
  });
}
