import { members } from "@/data/members";
import type { Member } from "@/types";

export async function getMembers(): Promise<Member[]> {
  return members.filter((member) => member.isActive);
}

export async function getMemberById(id: string): Promise<Member | undefined> {
  return members.find((member) => member.id === id && member.isActive);
}
