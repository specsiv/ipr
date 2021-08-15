import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CardList, ICardPreviewComponent } from '../../models/card';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { SortType } from '../../models/list-settings';
import { filterPageSize } from '../../utils/page-ulits';
import { NgElement, WithProperties } from '@angular/elements';

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

  @ViewChild('previews', { read: ElementRef })
  previews!: ElementRef<HTMLDivElement>;

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

  constructor(private readonly cdr: ChangeDetectorRef, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.list$.pipe(takeUntil(this.destroy$)).subscribe((cardList) => {
      this._length = cardList.length;

      this.previews.nativeElement.innerHTML = '';

      cardList.list.forEach((card) => {
        const cardElem: NgElement & WithProperties<ICardPreviewComponent> = this.renderer.createElement(
          card.elementName
        );
        cardElem.data = card.data;

        this.renderer.appendChild(this.previews.nativeElement, cardElem);
      });

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
