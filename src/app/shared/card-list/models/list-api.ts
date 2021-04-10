import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CardList } from './card';
import { ListSettings, SortType } from './list-settings';

export interface ListAPI<T = object> {
  list$: Observable<CardList<T>>;
  settings$: Observable<Readonly<ListSettings>>;
  page(pageIndex: number, pageSize: number): void;
  search(text: string): void;
  load(settings?: Partial<Readonly<ListSettings>>): void;
  sort(type: SortType): void;
}

export const LIST_API = new InjectionToken<ListAPI>('List API service interface');
