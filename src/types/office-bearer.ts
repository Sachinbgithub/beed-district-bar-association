export type OfficeBearer = {
  id: string;
  fullName: string;
  designation: string;
  initials: string;
  accent: "gold" | "blue" | "tan" | "sky" | "green";
  chamberNo?: string;
  phone?: string;
  email?: string;
  enrollmentNo?: string;
  inOfficeSince: string;
  term: string;
};
