import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, HistoriesGQL, HistoriesQuery, HistoryGQL, HistoryQuery } from 'src/app/api/graphql';
import { IAPI } from 'src/app/core/card-list-wrapper/models/api';
import { Card, CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { HistoryCardPreviewComponent } from '../components/history-card-preview/history-card-preview.component';
import { HistoryCardData, HistoryCardPreviewData } from '../models/history-card';

@Injectable()
export class HistoriesGraphQLAPIService implements IAPI<HistoryCardPreviewData, HistoryCardData>, OnDestroy {
  private destroy$ = new ReplaySubject<void>(1);

  private historiesQuery: QueryRef<HistoriesQuery, Exact<any>> | null = null;
  private historyQuery: QueryRef<HistoryQuery, Exact<any>> | null = null;
  private _histories$: Observable<CardList<HistoryCardPreviewData>> | null = null;
  private _history$: Observable<HistoryCardData | null> | null = null;
  private listSubject$ = new BehaviorSubject<CardList<HistoryCardPreviewData>>({
    list: [],
    length: 0,
  });
  private _list$ = this.listSubject$.asObservable();
  private cardSubject$ = new BehaviorSubject<HistoryCardData | null>(null);
  private _card$ = this.cardSubject$.asObservable();

  get list$(): Observable<CardList<HistoryCardPreviewData>> {
    return this._list$;
  }

  get card$(): Observable<HistoryCardData | null> {
    return this._card$;
  }

  constructor(private readonly historiesGQL: HistoriesGQL, private readonly historyGQL: HistoryGQL) {}

  ngOnDestroy(): void {
    this.listSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapHistoriesQuery({ data }: { data: HistoriesQuery }): CardList<HistoryCardPreviewData> {
    if (data.historiesResult && data.historiesResult.data && data.historiesResult.result?.totalCount) {
      return {
        list: data.historiesResult.data.map(
          (history): Card<HistoryCardPreviewData> => {
            return {
              data: {
                id: history?.id ?? null,
                title: history?.title ?? null,
                date: history?.event_date_utc ? new Date(history.event_date_utc) : null,
              },
              elementName: 'history-card-preview',
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

  private mapHistoryQuery({ data }: { data: HistoryQuery }): HistoryCardData | null {
    if (data.history) {
      const history = data.history;

      return {
        id: history.id ?? null,
        title: history.title ?? null,
        date: history.event_date_utc ? new Date(history.event_date_utc) : null,
        details: history.details ?? null,
        ships: history?.flight?.ships
          ? history.flight.ships.map((ship) => {
              return { id: ship?.id ?? null, name: ship?.name ?? null };
            })
          : [],
      };
    }

    return null;
  }

  requestList(settings: ListSettings): void {
    if (!this._histories$) {
      this.historiesQuery = this.historiesGQL.watch(settings);
      this._histories$ = this.historiesQuery.valueChanges.pipe(map(this.mapHistoriesQuery));

      this._histories$.pipe(takeUntil(this.destroy$)).subscribe((histories) => this.listSubject$.next(histories));
    } else if (this.historiesQuery) {
      this.historiesQuery.setVariables(settings);
    }
  }

  requestCard(id: string): void {
    if (!this._history$) {
      this.historyQuery = this.historyGQL.watch({ id });
      this._history$ = this.historyQuery.valueChanges.pipe(map(this.mapHistoryQuery));

      this._history$.pipe(takeUntil(this.destroy$)).subscribe((history) => this.cardSubject$.next(history));
    } else if (this.historyQuery) {
      this.historyQuery.setVariables({ id });
    }
  }
}
