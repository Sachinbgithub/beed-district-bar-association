import { officeBearers, presidentMessage } from "@/data/office-bearers";
import type { OfficeBearer } from "@/types";

export async function getOfficeBearers(): Promise<OfficeBearer[]> {
  return officeBearers;
}

export async function getPresidentMessage() {
  return presidentMessage;
}
