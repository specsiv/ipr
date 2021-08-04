import { Inject, Injectable } from '@angular/core';
import { API, API_TOKEN, ICard } from 'src/app/core/card-list-wrapper/models/api';
import { Observable } from 'rxjs';
import { HistoryCardData, HistoryCardPreviewData } from '../models/history-card';

@Injectable()
export class HistoryCardsService implements ICard<HistoryCardData> {
  get card$(): Observable<HistoryCardData | null> {
    return this.historiesAPI.card$;
  }

  constructor(@Inject(API_TOKEN) private historiesAPI: API<HistoryCardPreviewData, HistoryCardData>) {}

  loadCard(id: string): void {
    this.historiesAPI.requestCard(id);
  }
}
