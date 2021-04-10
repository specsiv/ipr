import { ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListAPI } from '../../models/list-api';
import { ListSettings, SortType } from '../../models/list-settings';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CardList } from '../../models/card';

export abstract class PageWithCardListComponent {
  private searchSubject$ = new Subject<string>();
  private destroy$ = new ReplaySubject<void>(1);

  private _settings!: Readonly<ListSettings>;
  private _list$: Observable<CardList>;
  private search$ = this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged());

  get list$(): Observable<CardList> {
    return this._list$;
  }

  get settings(): Readonly<ListSettings> {
    return this._settings;
  }

  constructor(
    private listAPI: ListAPI,
    private activatedRoute: ActivatedRoute,
    cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this._list$ = listAPI.list$;
    listAPI.load(this.getQuerySettings(activatedRoute.snapshot.queryParams));

    listAPI.settings$.pipe(takeUntil(this.destroy$)).subscribe((settings) => {
      this._settings = { ...settings };

      this.updateQueryParams(this._settings);

      cdr.markForCheck();
    });

    this.search$.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.listAPI.search(text);
    });
  }

  protected onDestroy(): void {
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
    this.listAPI.page(event.pageIndex, event.pageSize);
  }

  search(text: string): void {
    this.searchSubject$.next(text);
  }

  sort(type: SortType): void {
    this.listAPI.sort(type);
  }
}
