export interface BaseCardData {
  id: string | null;
}

export interface ICardPreviewComponent<T extends BaseCardData = { id: string | null }> {
  data: T;
}

export interface Card<T extends BaseCardData = { id: string | null }> {
  data: T;
  elementName: string;
}

export interface CardList<T extends BaseCardData = { id: string | null }> {
  list: Card<T>[];
  length: number;
}
