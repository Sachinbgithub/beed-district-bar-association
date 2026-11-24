export type Notice = {
  id: string;
  title: string;
  titleMr?: string | null;
  titleHi?: string | null;
  body: string;
  bodyMr?: string | null;
  bodyHi?: string | null;
  category: "Circular" | "Office Order" | "Election" | "Welfare" | "General" | "Meeting";
  publishedAt: string;
  pdfFileName?: string;
  isPublished: boolean;
};
