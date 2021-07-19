import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ShipCardData, ShipCardPreviewData } from 'src/app/features/ships/models/ship-card';
import { API, API_TOKEN, ICard } from 'src/app/core/card-list-wrapper/models/api';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { CardListService } from 'src/app/core/card-list-wrapper/logic/card-list.service';
import { Observable } from 'rxjs';
import { IList } from 'src/app/core/card-list-wrapper/models/api';
import { Store } from '@ngxs/store';
import { SaveSettings } from '../store/ships.actions';
import { ShipsState } from '../store/ships.state';

@Injectable()
export class ShipsService
  extends CardListService
  implements IList<ShipCardPreviewData>, ICard<ShipCardData>, OnDestroy {
  get list$(): Observable<CardList<ShipCardPreviewData>> {
    return this.shipsAPI.list$;
  }

  get card$(): Observable<ShipCardData | null> {
    return this.shipsAPI.card$;
  }

  constructor(@Inject(API_TOKEN) private shipsAPI: API<ShipCardPreviewData, ShipCardData>, private store: Store) {
    super(store.selectSnapshot(ShipsState.settings), store.select(ShipsState.settings));
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  protected requestList(settings: ListSettings): void {
    this.shipsAPI.requestList(settings);
  }

  protected saveSettings(settings: ListSettings): void {
    this.store.dispatch(new SaveSettings(settings));
  }

  loadCard(id: string): void {
    this.shipsAPI.requestCard(id);
  }
}
