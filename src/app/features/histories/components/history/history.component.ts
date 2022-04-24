import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CARD_TOKEN, ICard } from 'src/app/core/modules/card-list-wrapper/models/api';
import { HistoryCardData } from '../../models/history-card';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
  private _card$: Observable<HistoryCardData | null>;

  get card$(): Observable<HistoryCardData | null> {
    return this._card$;
  }

  constructor(@Inject(CARD_TOKEN) readonly cardService: ICard<HistoryCardData>, readonly route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    this._card$ = cardService.card$;

    if (id) {
      cardService.loadCard(id);
    }
  }
}
