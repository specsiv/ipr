import { Inject, Injectable, OnDestroy } from '@angular/core';
import { API, API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { CardListService } from 'src/app/core/card-list-wrapper/logic/card-list.service';
import { Observable } from 'rxjs';
import { ListAPI } from 'src/app/core/card-list-wrapper/models/api';
import { Store } from '@ngxs/store';
import { SaveSettings } from '../store/histories.actions';
import { HistoriesState } from '../store/histories.state';
import { HistoryCardPreviewData } from '../models/history-card-preview-data';

@Injectable()
export class HistoriesService extends CardListService implements ListAPI<HistoryCardPreviewData>, OnDestroy {
  get list$(): Observable<CardList<HistoryCardPreviewData>> {
    return this.HistoriesAPI.list$;
  }

  constructor(@Inject(API_TOKEN) private HistoriesAPI: API<HistoryCardPreviewData>, private store: Store) {
    super(store.selectSnapshot(HistoriesState.settings), store.select(HistoriesState.settings));
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  request(settings: ListSettings): void {
    this.HistoriesAPI.request(settings);
  }

  saveSettings(settings: ListSettings): void {
    this.store.dispatch(new SaveSettings(settings));
  }
}
