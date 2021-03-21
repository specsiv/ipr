import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, ShipsGQL, ShipsQuery } from 'src/app/api/graphql';
import { Card, CardList } from 'src/app/common/card-list/models/card';
import { ShipCardPreviewComponent } from 'src/app/shared/card-previews/components/ship-card-preview/ship-card-preview.component';
import { ShipSettings } from '../models/ship-settings';
import { ShipsAPI } from '../models/ships-api';

@Injectable()
export class ShipsGraphQLAPIService implements ShipsAPI, OnDestroy {
  private destroy$ = new ReplaySubject<void>(1);

  private shipsQuery: QueryRef<ShipsQuery, Exact<any>>;
  private _ships$: Observable<CardList>;

  private currentSettings: Readonly<ShipSettings> = {
    limit: 5,
    offset: 0,
    index: 0,
    searchText: '',
  };
  private settingsSubject$ = new BehaviorSubject<Readonly<ShipSettings>>(this.currentSettings);
  private _settings$ = this.settingsSubject$.asObservable();

  get settings$(): Observable<Readonly<ShipSettings>> {
    return this._settings$;
  }

  get ships$(): Observable<CardList> {
    return this._ships$;
  }

  constructor(shipsGQL: ShipsGQL) {
    this.shipsQuery = shipsGQL.watch({ ...this.currentSettings });

    this._ships$ = this.shipsQuery.valueChanges.pipe(
      map(
        ({ data }): CardList => {
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
      )
    );

    this._settings$.pipe(takeUntil(this.destroy$)).subscribe((settings) => {
      this.currentSettings = settings;

      this.shipsQuery.setVariables(this.currentSettings);
    });
  }

  ngOnDestroy(): void {
    this.settingsSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  page(pageIndex: number, pageSize: number): void {
    this.settingsSubject$.next({
      ...this.currentSettings,
      limit: pageSize,
      offset: pageIndex * pageSize,
      index: pageIndex,
    });
  }

  search(text: string): void {
    this.settingsSubject$.next({
      ...this.currentSettings,
      searchText: text,
      offset: 0,
      index: 0,
    });
  }
}
