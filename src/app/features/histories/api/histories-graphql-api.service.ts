import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, HistoriesGQL, HistoriesQuery } from 'src/app/api/graphql';
import { API } from 'src/app/core/card-list-wrapper/models/api';
import { Card, CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { HistoryCardPreviewComponent } from '../components/history-card-preview/history-card-preview.component';
import { HistoryCardPreviewData } from '../models/history-card-preview-data';
@Injectable()
export class HistoriesGraphQLAPIService implements API<HistoryCardPreviewData>, OnDestroy {
  private destroy$ = new ReplaySubject<void>(1);

  private historiesQuery: QueryRef<HistoriesQuery, Exact<any>> | null = null;
  private _gqlHistories$: Observable<CardList<HistoryCardPreviewData>> | null = null;
  private listSubject$ = new Subject<CardList<HistoryCardPreviewData>>();
  private _list$ = this.listSubject$.asObservable();

  get list$(): Observable<CardList<HistoryCardPreviewData>> {
    return this._list$;
  }

  constructor(private historiesGQL: HistoriesGQL) {}

  ngOnDestroy(): void {
    this.listSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapHistoriesQuery({ data }: { data: HistoriesQuery }): CardList<HistoryCardPreviewData> {
    if (data?.historiesResult && data.historiesResult.data && data.historiesResult.result?.totalCount) {
      return {
        list: data.historiesResult.data.map(
          (history): Card<HistoryCardPreviewData> => {
            return {
              data: {
                id: history?.id ?? null,
                title: history?.title ?? null,
                date: history?.event_date_utc ? new Date(history.event_date_utc) : null,
              },
              component: HistoryCardPreviewComponent,
            };
          }
        ),
        length: data.historiesResult.result.totalCount,
      };
    }

    return {
      list: [],
      length: 0,
    };
  }

  request(settings: ListSettings): void {
    if (!this._gqlHistories$) {
      this.historiesQuery = this.historiesGQL.watch(settings);
      this._gqlHistories$ = this.historiesQuery.valueChanges.pipe(map(this.mapHistoriesQuery));

      this._gqlHistories$.pipe(takeUntil(this.destroy$)).subscribe((histories) => this.listSubject$.next(histories));
    } else if (this.historiesQuery) {
      this.historiesQuery.setVariables(settings);
    }
  }
}
