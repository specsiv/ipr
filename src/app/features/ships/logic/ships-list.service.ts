import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CardListService } from 'src/app/core/card-list-wrapper/logic/card-list.service';
import { IAPI, API_TOKEN, IList } from 'src/app/core/card-list-wrapper/models/api';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ShipCardData, ShipCardPreviewData } from '../models/ship-card';
import { ShipsState } from '../store/ships.state';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { SaveSettings } from '../store/ships.actions';

@Injectable()
export class ShipsListService extends CardListService implements IList<ShipCardPreviewData>, OnDestroy {
  get list$(): Observable<CardList<ShipCardPreviewData>> {
    return this.shipsAPI.list$;
  }

  constructor(
    @Inject(API_TOKEN) private readonly shipsAPI: IAPI<ShipCardPreviewData, ShipCardData>,
    private readonly store: Store
  ) {
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
}
