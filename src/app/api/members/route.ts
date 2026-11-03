import { NextResponse } from "next/server";
import { getMembers } from "@/services/members";

export async function GET() {
  const members = await getMembers();
  return NextResponse.json({ data: members });
}
