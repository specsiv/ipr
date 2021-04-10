import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ShipCardPreviewData } from 'src/app/common/card-previews/models/ship-card-preview-data';
import { API, API_TOKEN } from 'src/app/common/models/api';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { CardListService } from 'src/app/shared/card-list/services/card-list.service';
import { Observable } from 'rxjs';
import { ListAPI } from 'src/app/shared/card-list/models/list-api';

@Injectable()
export class ShipsService extends CardListService implements ListAPI<ShipCardPreviewData>, OnDestroy {
  get list$(): Observable<CardList<ShipCardPreviewData>> {
    return this.ShipsAPI.list$;
  }

  constructor(@Inject(API_TOKEN) private ShipsAPI: API<ShipCardPreviewData>) {
    super();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  request(settings: ListSettings): void {
    this.ShipsAPI.request(settings);
  }
}
