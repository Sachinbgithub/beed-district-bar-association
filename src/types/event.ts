export type AssociationEvent = {
  id: string;
  title: string;
  titleMr?: string | null;
  titleHi?: string | null;
  description: string;
  descriptionMr?: string | null;
  descriptionHi?: string | null;
  venue: string;
  startsAt: string;
  endsAt?: string;
  category: "Seminar" | "Meeting" | "Cultural" | "Welfare" | "Sports";
  image?: string;
  isPublished: boolean;
};
