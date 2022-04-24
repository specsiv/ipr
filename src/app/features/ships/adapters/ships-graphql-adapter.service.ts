import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, ShipsGQL, ShipsQuery, ShipQuery, ShipGQL } from 'src/app/core/api/graphql';
import { IAPI } from 'src/app/core/modules/card-list-wrapper/models/api';
import { Card, CardList } from 'src/app/shared/card-list/models/card';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { ShipCardPreviewComponent } from '../components/ship-card-preview/ship-card-preview.component';
import { ShipCardData, ShipCardPreviewData } from '../models/ship-card';

@Injectable()
export class ShipsGraphQLAPIService implements IAPI<ShipCardPreviewData, ShipCardData>, OnDestroy {
  private destroy$ = new ReplaySubject<void>(1);

  private shipsQuery: QueryRef<ShipsQuery, Exact<any>> | null = null;
  private shipQuery: QueryRef<ShipQuery, Exact<any>> | null = null;
  private _ships$: Observable<CardList<ShipCardPreviewData>> | null = null;
  private _ship$: Observable<ShipCardData | null> | null = null;
  private listSubject$ = new BehaviorSubject<CardList<ShipCardPreviewData>>({
    list: [],
    length: 0,
  });
  private cardSubject$ = new BehaviorSubject<ShipCardData | null>(null);

  readonly list$ = this.listSubject$.asObservable();
  readonly card$ = this.cardSubject$.asObservable();

  constructor(private readonly shipsGQL: ShipsGQL, private readonly shipGQL: ShipGQL) {}

  ngOnDestroy(): void {
    this.listSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapShipsQuery({ data }: { data: ShipsQuery }): CardList<ShipCardPreviewData> {
    if (data.shipsResult && data.shipsResult.data && data.shipsResult.result?.totalCount) {
      const mappedList: Card<ShipCardPreviewData>[] = [];

      data.shipsResult.data.forEach((ship) => {
        if (ship) {
          mappedList.push({
            data: {
              // tslint:disable-next-line: no-non-null-assertion
              id: ship.id!,
              name: ship.name ?? null,
              image: ship.image ?? null,
              year: ship.year_built ?? null,
            },
            cardPreviewComponent: ShipCardPreviewComponent,
          });
        }
      });

      return {
        list: mappedList,
        length: data.shipsResult.result.totalCount,
      };
    }

    return {
      list: [],
      length: 0,
    };
  }

  private mapShipQuery({ data }: { data: ShipQuery }): ShipCardData | null {
    if (data.ship) {
      const ship = data.ship;

      return {
        // tslint:disable-next-line: no-non-null-assertion
        id: ship.id!,
        name: ship.name ?? null,
        image: ship.image ?? null,
        year: ship.year_built ?? null,
        roles: ship.roles ?? null,
        type: ship.type ?? null,
      };
    }

    return null;
  }

  requestList(settings: ListSettings): void {
    if (!this._ships$) {
      this.shipsQuery = this.shipsGQL.watch(settings);
      this._ships$ = this.shipsQuery.valueChanges.pipe(map(this.mapShipsQuery));

      this._ships$.pipe(takeUntil(this.destroy$)).subscribe((ships) => this.listSubject$.next(ships));
    } else if (this.shipsQuery) {
      this.shipsQuery.setVariables(settings);
    }
  }

  requestCard(id: string): void {
    if (!this._ship$) {
      this.shipQuery = this.shipGQL.watch({ id });
      this._ship$ = this.shipQuery.valueChanges.pipe(map(this.mapShipQuery));

      this._ship$.pipe(takeUntil(this.destroy$)).subscribe((ship) => this.cardSubject$.next(ship));
    } else if (this.shipQuery) {
      this.shipQuery.setVariables({ id });
    }
  }
}
