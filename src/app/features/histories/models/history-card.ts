export interface HistoryCardPreviewData {
  id: string | null;
  title: string | null;
  date: Date | null;
}

export interface HistoryCardData {
  id: string | null;
  title: string | null;
  date: Date | null;
  details: string | null;
  ships: Array<{ id: string | null; name: string | null }>;
}
