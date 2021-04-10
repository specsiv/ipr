import { Type } from '@angular/core';

export interface CardPreviewComponent<T = object> {
  data: T;
}

export interface Card<T = object> {
  data: T;
  component: Type<CardPreviewComponent<T>>;
}

export interface CardList<T = object> {
  list: Card<T>[];
  length: number;
}
