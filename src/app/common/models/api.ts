import { InjectionToken } from '@angular/core';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { Observable } from 'rxjs';

export interface API<T = object> {
  list$: Observable<CardList<T>>;
  request(settings: ListSettings): void;
}

export const API_TOKEN = new InjectionToken<API>('API service interface');
