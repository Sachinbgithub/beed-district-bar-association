export type MemberCategory =
  | "Life Member"
  | "Women Advocate"
  | "Annual Member"
  | "Senior Advocate";

export type Member = {
  id: string;
  fullName: string;
  initials: string;
  accent: "blue" | "pink" | "green" | "orange" | "purple" | "teal";
  enrollmentNo: string;
  category: MemberCategory;
  specialization: string;
  chamberNo?: string;
  practiceAreas?: string[];
  phone?: string;
  email?: string;
  city?: string;
  yearOfEnrollment: number;
  isActive: boolean;
};
