import { Component, ChangeDetectionStrategy, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CardList } from 'src/app/common/card-list/models/card';
import { ListSettings, SortType } from 'src/app/common/card-list/models/list-settings';
import { ShipsAPI, SHIPS_API } from '../../models/ships-api';
import { ShipsGraphQLAPIService } from '../../services/ships-graphql-api.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SHIPS_API,
      useClass: ShipsGraphQLAPIService,
    },
  ],
})
export class ShipsComponent implements OnDestroy {
  private searchSubject$ = new Subject<string>();
  private destroy$ = new ReplaySubject<void>(1);

  private _settings!: Readonly<ListSettings>;
  private _ships$: Observable<CardList>;
  private search$ = this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged());

  get ships$(): Observable<CardList> {
    return this._ships$;
  }

  get settings(): Readonly<ListSettings> {
    return this._settings;
  }

  constructor(
    @Inject(SHIPS_API) private shipsAPI: ShipsAPI,
    private activatedRoute: ActivatedRoute,
    cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this._ships$ = shipsAPI.ships$;
    shipsAPI.load(this.getQuerySettings(activatedRoute.snapshot.queryParams));

    shipsAPI.settings$.pipe(takeUntil(this.destroy$)).subscribe((settings) => {
      this._settings = { ...settings };

      this.updateQueryParams(this._settings);

      cdr.markForCheck();
    });

    this.search$.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.shipsAPI.search(text);
    });
  }

  ngOnDestroy(): void {
    this.searchSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private getQuerySettings(queryParams: Params): Partial<ListSettings> {
    const querySettings: Partial<ListSettings> = {};

    if (queryParams.hasOwnProperty('limit')) {
      querySettings.limit = +queryParams.limit;
    }

    if (queryParams.hasOwnProperty('offset')) {
      querySettings.offset = +queryParams.offset;
    }

    if (queryParams.hasOwnProperty('index')) {
      querySettings.index = +queryParams.index;
    }

    if (queryParams.hasOwnProperty('searchText')) {
      querySettings.searchText = queryParams.searchText;
    }

    if (queryParams.hasOwnProperty('order')) {
      querySettings.order = queryParams.order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }

    return querySettings;
  }

  private updateQueryParams(settings: Readonly<ListSettings>): void {
    const queryParams: Params = { ...settings };

    if (queryParams.searchText === '') {
      delete queryParams.searchText;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      preserveFragment: true,
      replaceUrl: true,
    });
  }

  page(event: PageEvent): void {
    this.shipsAPI.page(event.pageIndex, event.pageSize);
  }

  search(text: string): void {
    this.searchSubject$.next(text);
  }

  sort(type: SortType): void {
    this.shipsAPI.sort(type);
  }
}
