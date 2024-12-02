export interface ChatSession {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  participants: User[];
  createdBy: string | null;
  updatedBy: string | null;
}
