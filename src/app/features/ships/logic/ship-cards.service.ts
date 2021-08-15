import { Inject, Injectable } from '@angular/core';
import { ShipCardData, ShipCardPreviewData } from 'src/app/features/ships/models/ship-card';
import { IAPI, API_TOKEN, ICard } from 'src/app/core/card-list-wrapper/models/api';
import { Observable } from 'rxjs';

@Injectable()
export class ShipCardsService implements ICard<ShipCardData> {
  get card$(): Observable<ShipCardData | null> {
    return this.shipsAPI.card$;
  }

  constructor(@Inject(API_TOKEN) private readonly shipsAPI: IAPI<ShipCardPreviewData, ShipCardData>) {}

  loadCard(id: string): void {
    this.shipsAPI.requestCard(id);
  }
}
