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

  for (const member of members) {
    const existing = await db.emailDelivery.findUnique({
      where: {
        kind_sourceId_userId: {
          kind: input.kind,
          sourceId: input.sourceId,
          userId: member.id,
        },
      },
    });
    if (existing) continue;

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

    await db.emailDelivery.create({
      data: {
        kind: input.kind,
        sourceId: input.sourceId,
        userId: member.id,
        subject: input.subject,
        status,
      },
    });
  }
}
