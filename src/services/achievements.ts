import { achievements } from "@/data/achievements";
import type { Achievement } from "@/types";

export async function getAchievements(): Promise<Achievement[]> {
  return achievements;
}
