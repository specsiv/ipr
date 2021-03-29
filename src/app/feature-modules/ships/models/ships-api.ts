import { InjectionToken } from '@angular/core';
import { CardList } from 'src/app/common/card-list/models/card';
import { Observable } from 'rxjs';
import { ListSettings } from 'src/app/common/card-list/models/list-settings';

export interface ShipsAPI {
  ships$: Observable<CardList>;
  settings$: Observable<Readonly<ListSettings>>;
  page(pageIndex: number, pageSize: number): void;
  search(text: string): void;
  load(settings?: Partial<Readonly<ListSettings>>): void;
}

export const SHIPS_API = new InjectionToken<ShipsAPI>('Ships API service interface');
