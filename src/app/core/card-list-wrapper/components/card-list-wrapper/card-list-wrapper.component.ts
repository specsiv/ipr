import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DEFAULT_PAGE_OPTIONS } from 'src/app/core/card-list-wrapper/consts/defaults';
import { CardList } from 'src/app/shared/card-list/models/card';
import { ListAPI, LIST_API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { ListSettings, SortType } from 'src/app/shared/card-list/models/list-settings';
import { filterPageSize } from 'src/app/shared/card-list/utils/page-ulits';

@Component({
  selector: 'app-card-list-wrapper',
  templateUrl: './card-list-wrapper.component.html',
  styleUrls: ['./card-list-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListWrapperComponent implements OnInit, OnDestroy {
  @Input() set pageOptions(options: number[]) {
    this._pageOptions = options;
  }

  private searchSubject$ = new Subject<string>();
  private destroy$ = new ReplaySubject<void>(1);

  private _settings!: ListSettings;
  private _list$: Observable<CardList>;
  private search$ = this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged());

  private _pageOptions = DEFAULT_PAGE_OPTIONS;

  get list$(): Observable<CardList> {
    return this._list$;
  }

  get settings(): ListSettings {
    return this._settings;
  }

  get pageOptions(): number[] {
    return this._pageOptions;
  }

  constructor(
    @Inject(LIST_API_TOKEN) private listAPI: ListAPI,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this._list$ = listAPI.list$;
  }

  ngOnInit(): void {
    this.listAPI.load(this.getQuerySettings(this.activatedRoute.snapshot.queryParams));

    this.listAPI.settings$.pipe(takeUntil(this.destroy$)).subscribe((settings) => {
      this._settings = { ...settings };

      this.updateQueryParams(this._settings);

      this.cdr.markForCheck();
    });

    this.search$.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.listAPI.search(text);
    });
  }

  ngOnDestroy(): void {
    this.searchSubject$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private getQuerySettings(queryParams: Params): Partial<ListSettings> {
    const querySettings: { -readonly [K in keyof ListSettings]?: ListSettings[K] } = {};

    if (queryParams.hasOwnProperty('limit')) {
      querySettings.limit = filterPageSize(+queryParams.limit, this._pageOptions);
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

  private updateQueryParams(settings: ListSettings): void {
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
