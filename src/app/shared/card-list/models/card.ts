import { Type } from '@angular/core';

export interface BaseCardData {
  id: string;
}

export interface ICardPreviewComponent<T extends BaseCardData = { id: string }> {
  data: T;
}

export interface Card<T extends BaseCardData = { id: string }> {
  data: T;
  cardPreviewComponent: Type<ICardPreviewComponent<T>>;
}

export interface CardList<T extends BaseCardData = { id: string }> {
  list: Card<T>[];
  length: number;
}
