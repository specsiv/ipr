import { InjectionToken } from '@angular/core';
import { CardList } from 'src/app/common/card-list/models/card';
import { Observable } from 'rxjs';
import { ShipSettings } from './ship-settings';

export interface ShipsAPI {
  ships$: Observable<CardList>;
  settings$: Observable<Readonly<ShipSettings>>;
  page(pageIndex: number, pageSize: number): void;
  search(text: string): void;
}

export const SHIPS_API = new InjectionToken<ShipsAPI>('Ships API service interface');
