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
import { CardPreviewComponent } from 'src/app/shared/card-previews/models/card-preview-component';
import { CardList } from '../../models/card';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements AfterViewInit, OnDestroy {
  @Input() list$!: Observable<CardList>;
  @Input() set pageSize(size: number) {
    const currentOption = this.pageOptions.find((option) => option === size);

    this._pageSize = currentOption ?? this.pageOptions[0];
  }
  @Input() pageIndex = 0;

  @Output() page = new EventEmitter<PageEvent>();
  @Output() search = new EventEmitter<string>();

  @ViewChild('previews', { read: ViewContainerRef })
  previewsView!: ViewContainerRef;

  private _pageSize = 5;
  private pageOptions = [5, 15, 25];
  private _length = 0;
  private destroy$ = new ReplaySubject<void>(1);

  get pageSize(): number {
    return this._pageSize;
  }

  get length(): number {
    return this._length;
  }

  searchText = '';

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
