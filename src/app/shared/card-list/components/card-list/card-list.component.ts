import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Card, CardList } from '../../models/card';
import { Observable, ReplaySubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { SortType } from '../../models/list-settings';
import { filterPageSize } from '../../utils/page-utils';
import { takeUntil } from 'rxjs/operators';

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE_OPTIONS = [5, 25, 100];

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnDestroy {
  @Input() list$!: Observable<CardList>;
  @Input() set pageSize(size: number) {
    this.userPageSize = size;
    this.filteredPageSize = filterPageSize(size, this._pageOptions);
  }
  @Input() set pageOptions(options: number[]) {
    this._pageOptions = options;

    this.filteredPageSize = filterPageSize(this.userPageSize, this._pageOptions);
  }
  @Input() pageIndex = 0;
  @Input() searchText = '';
  @Input() sortType = SortType.ASC;

  @Output() page = new EventEmitter<PageEvent>();
  @Output() search = new EventEmitter<string>();
  @Output() sort = new EventEmitter<SortType>();

  private userPageSize = DEFAULT_PAGE_SIZE;
  private filteredPageSize = DEFAULT_PAGE_SIZE;
  private _pageOptions = DEFAULT_PAGE_OPTIONS;
  private destroy$ = new ReplaySubject<void>(1);

  get pageSize(): number {
    return this.filteredPageSize;
  }

  get pageOptions(): number[] {
    return this._pageOptions;
  }

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  erase(): void {
    this.searchText = '';

    this.search.emit(this.searchText);
  }

  trackBy(index: number, card: Card): string {
    return card.data.id;
  }
}
