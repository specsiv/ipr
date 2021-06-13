import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ShipCardPreviewData } from 'src/app/features/ships/models/ship-card-preview-data';
import { API, API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { CardListService } from 'src/app/core/card-list-wrapper/logic/card-list.service';
import { Observable } from 'rxjs';
import { ListAPI } from 'src/app/core/card-list-wrapper/models/api';
import { Store } from '@ngxs/store';
import { SaveSettings } from '../store/ships.actions';
import { ShipsState } from '../store/ships.state';

@Injectable()
export class ShipsService extends CardListService implements ListAPI<ShipCardPreviewData>, OnDestroy {
  get list$(): Observable<CardList<ShipCardPreviewData>> {
    return this.ShipsAPI.list$;
  }

  constructor(@Inject(API_TOKEN) private ShipsAPI: API<ShipCardPreviewData>, private store: Store) {
    super(store.selectSnapshot(ShipsState.settings), store.select(ShipsState.settings));
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  request(settings: ListSettings): void {
    this.ShipsAPI.request(settings);
  }

  saveSettings(settings: ListSettings): void {
    this.store.dispatch(new SaveSettings(settings));
  }
}
