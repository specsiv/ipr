import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CARD_TOKEN, ICard } from 'src/app/core/card-list-wrapper/models/api';
import { ShipCardData } from '../../models/ship-card';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipComponent {
  private _card$: Observable<ShipCardData | null>;

  get card$(): Observable<ShipCardData | null> {
    return this._card$;
  }

  constructor(@Inject(CARD_TOKEN) cardService: ICard<ShipCardData>, route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    this._card$ = cardService.card$;

    if (id) {
      cardService.loadCard(id);
    }
  }
}
