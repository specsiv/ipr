import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, ShipsGQL, ShipsQuery } from 'src/app/api/graphql';
import { ShipCardPreviewComponent } from 'src/app/common/card-previews/components/ship-card-preview/ship-card-preview.component';
import { API } from 'src/app/common/models/api';
import { Card, CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { ShipCardPreviewData } from '../../../common/card-previews/models/ship-card-preview-data';

@Injectable()
export class ShipsGraphQLAPIService implements API<ShipCardPreviewData>, OnDestroy {
  private shipsDestroy$ = new ReplaySubject<void>(1);

  private shipsQuery: QueryRef<ShipsQuery, Exact<any>> | null = null;
  private _gqlShips$: Observable<CardList<ShipCardPreviewData>> | null = null;
  private listSubject$ = new Subject<CardList<ShipCardPreviewData>>();
  private _list$ = this.listSubject$.asObservable();

  get list$(): Observable<CardList<ShipCardPreviewData>> {
    return this._list$;
  }

  constructor(private shipsGQL: ShipsGQL) {}

  ngOnDestroy(): void {
    this.listSubject$.complete();

    this.shipsDestroy$.next();
    this.shipsDestroy$.complete();
  }

  private mapShipsQuery({ data }: { data: ShipsQuery }): CardList<ShipCardPreviewData> {
    if (data?.shipsResult && data.shipsResult.data && data.shipsResult.result?.totalCount) {
      return {
        list: data.shipsResult.data.map(
          (ship): Card<ShipCardPreviewData> => {
            return {
              data: {
                name: ship?.name ?? null,
                image: ship?.image ?? null,
                year: ship?.year_built ?? null,
              },
              component: ShipCardPreviewComponent,
            };
          }
        ),
        length: data.shipsResult.result.totalCount,
      };
    }

    return {
      list: [],
      length: 0,
    };
  }

  request(settings: ListSettings): void {
    if (!this._gqlShips$) {
      this.shipsQuery = this.shipsGQL.watch(settings);
      this._gqlShips$ = this.shipsQuery.valueChanges.pipe(map(this.mapShipsQuery));

      this._gqlShips$.pipe(takeUntil(this.shipsDestroy$)).subscribe((ships) => this.listSubject$.next(ships));
    } else if (this.shipsQuery) {
      this.shipsQuery.setVariables(settings);
    }
  }
}
