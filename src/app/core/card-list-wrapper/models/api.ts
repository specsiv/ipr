import { InjectionToken } from '@angular/core';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings, SortType } from 'src/app/shared/card-list/models/list-settings';
import { Observable } from 'rxjs';

export interface API<CardPreviewData = object, CardData = object> {
  list$: Observable<CardList<CardPreviewData>>;
  card$: Observable<CardData | null>;
  requestList(settings: ListSettings): void;
  requestCard(id: string): void;
}

export const API_TOKEN = new InjectionToken<API>('API service interface');

export interface IList<T = object> {
  list$: Observable<CardList<T>>;
  settings$: Observable<ListSettings>;
  page(pageIndex: number, pageSize: number): void;
  search(text: string): void;
  loadList(settings?: Partial<ListSettings>): void;
  sort(type: SortType): void;
}

export const LIST_TOKEN = new InjectionToken<IList>('IList service interface');

export interface ICard<T = object> {
  card$: Observable<T | null>;
  loadCard(id: string): void;
}

export const CARD_TOKEN = new InjectionToken<IList>('ICard service interface');
