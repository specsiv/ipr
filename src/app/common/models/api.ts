import { InjectionToken } from '@angular/core';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings, SortType } from 'src/app/shared/card-list/models/list-settings';
import { Observable } from 'rxjs';

export interface API<T = object> {
  list$: Observable<CardList<T>>;
  request(settings: ListSettings): void;
}

export const API_TOKEN = new InjectionToken<API>('API service interface');

export interface ListAPI<T = object> {
  list$: Observable<CardList<T>>;
  settings$: Observable<Readonly<ListSettings>>;
  page(pageIndex: number, pageSize: number): void;
  search(text: string): void;
  load(settings?: Partial<Readonly<ListSettings>>): void;
  sort(type: SortType): void;
}

export const LIST_API_TOKEN = new InjectionToken<ListAPI>('List API service interface');
