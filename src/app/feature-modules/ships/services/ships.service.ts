import { Injectable, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exact, ShipsGQL, ShipsQuery } from 'src/app/api/graphql';
import { Card, CardList } from 'src/app/common/card-list/models/card';
import { ShipCardPreviewComponent } from 'src/app/shared/card-previews/components/ship-card-preview/ship-card-preview.component';
import { ShipSettings } from '../models/ships';

@Injectable()
export class ShipsService implements OnDestroy {
  private destroy$ = new ReplaySubject<void>(1);

  private shipsQuery: QueryRef<ShipsQuery, Exact<any>>;
  private _ships$: Observable<CardList>;

  private currentSettings: Readonly<ShipSettings> = {
    limit: 5,
    offset: 0,
    index: 0,
    searchText: '',
  };
  private settingsSubject$ = new BehaviorSubject<Readonly<ShipSettings>>(
    this.currentSettings
  );
  private _settings$ = this.settingsSubject$.asObservable();

  get settings$() {
    return this._settings$;
  }

  get ships$() {
    return this._ships$;
  }

  constructor(shipsGQL: ShipsGQL) {
    this.shipsQuery = shipsGQL.watch({ ...this.currentSettings });

    this._ships$ = this.shipsQuery.valueChanges.pipe(
      map(
        ({ data }): CardList => {
          if (
            data?.shipsResult &&
            data.shipsResult.data &&
            data.shipsResult.result
          ) {
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
              length: data.shipsResult.result.totalCount!,
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

  ngOnDestroy() {
    this.settingsSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  page(pageIndex: number, pageSize: number) {
    this.settingsSubject$.next({
      ...this.currentSettings,
      limit: pageSize,
      offset: pageIndex * pageSize,
      index: pageIndex,
    });
  }

  search(text: string) {
    this.settingsSubject$.next({
      ...this.currentSettings,
      searchText: text,
      offset: 0,
      index: 0,
    });
  }
}
