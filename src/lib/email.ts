import nodemailer from "nodemailer";
import { db } from "@/lib/db";

type NotifyInput = {
  kind: "event" | "notice" | "blog";
  sourceId: string;
  subject: string;
  text: string;
};

export async function notifyActiveMembers(input: NotifyInput) {
  const members = await db.user.findMany({
    where: {
      role: "MEMBER",
      member: { isActive: true },
    },
    select: { id: true, email: true },
  });

  if (members.length === 0) return;

  const existing = await db.emailDelivery.findMany({
    where: {
      kind: input.kind,
      sourceId: input.sourceId,
      userId: { in: members.map((member) => member.id) },
    },
    select: { userId: true },
  });
  const alreadyDelivered = new Set(existing.map((row) => row.userId));
  const pendingMembers = members.filter((member) => !alreadyDelivered.has(member.id));
  if (pendingMembers.length === 0) return;

  const host = process.env.SMTP_HOST;
  const transporter =
    host &&
    nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });

  const from = process.env.SMTP_FROM || "Beed District Bar Association <noreply@localhost>";
  const deliveries: {
    kind: string;
    sourceId: string;
    userId: string;
    subject: string;
    status: string;
  }[] = [];

  for (const member of pendingMembers) {
    let status = "logged";
    try {
      if (transporter) {
        await transporter.sendMail({
          from,
          to: member.email,
          subject: input.subject,
          text: input.text,
        });
        status = "sent";
      } else {
        console.info(`[email] ${input.kind} → ${member.email}: ${input.subject}`);
      }
    } catch (error) {
      status = "failed";
      console.error(`[email] failed for ${member.email}`, error);
    }

    deliveries.push({
      kind: input.kind,
      sourceId: input.sourceId,
      userId: member.id,
      subject: input.subject,
      status,
    });
  }

  await db.emailDelivery.createMany({
    data: deliveries,
    skipDuplicates: true,
  });
}
