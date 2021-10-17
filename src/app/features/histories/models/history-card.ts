export interface HistoryCardPreviewData {
  id: string;
  title: string | null;
  date: Date | null;
}

export interface HistoryCardData {
  id: string;
  title: string | null;
  date: Date | null;
  details: string | null;
  ships: Array<{ id: string | null; name: string | null }>;
}
