import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, ShipsGQL, ShipsQuery } from 'src/app/api/graphql';
import { Card, CardList } from 'src/app/common/card-list/models/card';
import { ListSettings } from 'src/app/common/card-list/models/list-settings';
import { CardListService } from 'src/app/common/card-list/services/card-list.service';
import { ShipCardPreviewComponent } from 'src/app/shared/card-previews/components/ship-card-preview/ship-card-preview.component';
import { ShipsAPI } from '../models/ships-api';

@Injectable()
export class ShipsGraphQLAPIService extends CardListService implements ShipsAPI, OnDestroy {
  private destroy$ = new ReplaySubject<void>(1);

  private shipsQuery: QueryRef<ShipsQuery, Exact<any>> | null = null;
  private _gqlShips$: Observable<CardList> | null = null;
  private shipsSubject$ = new Subject<CardList>();
  private _ships$ = this.shipsSubject$.asObservable();

  get ships$(): Observable<CardList> {
    return this._ships$;
  }

  constructor(private shipsGQL: ShipsGQL) {
    super();
  }

  ngOnDestroy(): void {
    this.onDestroy();

    this.shipsSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapShipsQuery({ data }: { data: ShipsQuery }): CardList {
    if (data?.shipsResult && data.shipsResult.data && data.shipsResult.result?.totalCount) {
      return {
        list: data.shipsResult.data.map(
          (ship): Card => {
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

  protected request(settings: ListSettings): void {
    if (!this._gqlShips$) {
      this.shipsQuery = this.shipsGQL.watch(settings);
      this._gqlShips$ = this.shipsQuery.valueChanges.pipe(map(this.mapShipsQuery));

      this._gqlShips$.pipe(takeUntil(this.destroy$)).subscribe((ships) => this.shipsSubject$.next(ships));
    } else if (this.shipsQuery) {
      this.shipsQuery.setVariables(settings);
    }
  }
}
