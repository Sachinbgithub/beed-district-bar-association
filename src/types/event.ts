export type AssociationEvent = {
  id: string;
  title: string;
  description: string;
  venue: string;
  startsAt: string;
  endsAt?: string;
  category: "Seminar" | "Meeting" | "Cultural" | "Welfare" | "Sports";
  image?: string;
  isPublished: boolean;
};
