import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardList, CardPreviewComponent } from '../../models/card';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { SortType } from '../../models/list-settings';
import { filterPageSize } from '../../utils/page-ulits';

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE_OPTIONS = [5, 25, 100];

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements AfterViewInit, OnDestroy {
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

  @ViewChild('previews', { read: ViewContainerRef })
  previewsView!: ViewContainerRef;

  private userPageSize = DEFAULT_PAGE_SIZE;
  private filteredPageSize = DEFAULT_PAGE_SIZE;
  private _pageOptions = DEFAULT_PAGE_OPTIONS;
  private _length = 0;
  private destroy$ = new ReplaySubject<void>(1);

  get pageSize(): number {
    return this.filteredPageSize;
  }

  get pageOptions(): number[] {
    return this._pageOptions;
  }

  get length(): number {
    return this._length;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.list$.pipe(takeUntil(this.destroy$)).subscribe((cardList) => {
      this._length = cardList.length;

      this.previewsView.clear();

      for (const card of cardList.list) {
        const component = this.previewsView.createComponent<CardPreviewComponent>(
          this.componentFactoryResolver.resolveComponentFactory(card.component)
        );

        component.instance.data = card.data;
      }

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  erase(): void {
    this.searchText = '';

    this.search.emit(this.searchText);
  }
}
