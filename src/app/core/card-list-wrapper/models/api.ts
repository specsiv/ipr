import { InjectionToken } from '@angular/core';
import { BaseCardData, CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings, SortType } from 'src/app/shared/card-list/models/list-settings';
import { Observable } from 'rxjs';

export interface IAPI<CardPreview extends BaseCardData = { id: string }, Card = object> {
  list$: Observable<CardList<CardPreview>>;
  card$: Observable<Card | null>;
  requestList(settings: ListSettings): void;
  requestCard(id: string): void;
}

export const API_TOKEN = new InjectionToken<IAPI>('API service interface');

export interface IList<CardPreview extends BaseCardData = { id: string }> {
  list$: Observable<CardList<CardPreview>>;
  settings$: Observable<ListSettings>;
  page(pageIndex: number, pageSize: number): void;
  search(text: string): void;
  loadList(settings?: Partial<ListSettings>): void;
  sort(type: SortType): void;
}

export const LIST_TOKEN = new InjectionToken<IList>('IList service interface');

export interface ICard<Card = object> {
  card$: Observable<Card | null>;
  loadCard(id: string): void;
}

export const CARD_TOKEN = new InjectionToken<ICard>('ICard service interface');
