import { Inject, Injectable, OnDestroy } from '@angular/core';
import { IAPI, API_TOKEN, ICard } from 'src/app/core/modules/card-list-wrapper/models/api';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { CardListLogic } from 'src/app/core/modules/card-list-wrapper/logic/card-list';
import { Observable } from 'rxjs';
import { IList } from 'src/app/core/modules/card-list-wrapper/models/api';
import { Store } from '@ngxs/store';
import { SaveSettings } from '../store/histories.actions';
import { HistoriesState } from '../store/histories.state';
import { HistoryCardData, HistoryCardPreviewData } from '../models/history-card';

@Injectable()
export class HistoriesListService extends CardListLogic implements IList<HistoryCardPreviewData>, OnDestroy {
  get list$(): Observable<CardList<HistoryCardPreviewData>> {
    return this.historiesAPI.list$;
  }

  constructor(
    @Inject(API_TOKEN) private readonly historiesAPI: IAPI<HistoryCardPreviewData, HistoryCardData>,
    private readonly store: Store
  ) {
    super(store.selectSnapshot(HistoriesState.settings), store.select(HistoriesState.settings));
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  protected requestList(settings: ListSettings): void {
    this.historiesAPI.requestList(settings);
  }

  protected saveSettings(settings: ListSettings): void {
    this.store.dispatch(new SaveSettings(settings));
  }
}
