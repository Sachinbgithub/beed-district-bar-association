export type Notice = {
  id: string;
  title: string;
  body: string;
  category: "Circular" | "Office Order" | "Election" | "Welfare" | "General" | "Meeting";
  publishedAt: string;
  pdfFileName?: string;
  isPublished: boolean;
};
