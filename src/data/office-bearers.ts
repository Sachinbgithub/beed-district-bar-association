import type { OfficeBearer } from "@/types";

/** Elected 13 August 2026. Contact details are omitted until the Association confirms them. */
export const officeBearers: OfficeBearer[] = [
  {
    id: "ob-1",
    fullName: "Adv. Balasaheb Sahebrao Bodkhe",
    designation: "President",
    initials: "BB",
    accent: "gold",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
  {
    id: "ob-2",
    fullName: "Adv. Gopal Arunrao Sarvadnya",
    designation: "Vice President",
    initials: "GS",
    accent: "blue",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
  {
    id: "ob-3",
    fullName: "Adv. Nitin Shinde",
    designation: "Secretary",
    initials: "NS",
    accent: "tan",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
  {
    id: "ob-4",
    fullName: "Adv. Geetaprabha Behere (Waze)",
    designation: "Joint Secretary",
    initials: "GB",
    accent: "sky",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
  {
    id: "ob-5",
    fullName: "Adv. Vidya Sukhdev Gaikwad",
    designation: "Treasurer",
    initials: "VG",
    accent: "green",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
  {
    id: "ob-6",
    fullName: "Adv. Vandev Bhaskar Sule",
    designation: "Librarian Secretary",
    initials: "VS",
    accent: "blue",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
  {
    id: "ob-7",
    fullName: "Adv. Prerna Navnathrao Suryawanshi",
    designation: "Women Representative",
    initials: "PS",
    accent: "tan",
    inOfficeSince: "2026",
    term: "2026–2027",
  },
];

export const presidentMessage = {
  author: "Adv. Balasaheb Sahebrao Bodkhe",
  role: "President, 2026–2027",
  body: "The Beed District Bar Association welcomes members and visitors. This website carries notices, court circulars, events, and information on member facilities for advocates practising at the District Court, Beed.",
} as const;
