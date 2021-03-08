import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardList } from 'src/app/common/card-list/models/card';
import { ShipSettings } from '../../models/ships';
import { ShipsService } from '../../services/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsComponent {
  private destroy$ = new ReplaySubject<void>(1);

  settings!: Readonly<ShipSettings>;
  ships$: Observable<CardList>;

  constructor(private shipsService: ShipsService) {
    this.ships$ = shipsService.ships$;

    shipsService.settings$
      .pipe(takeUntil(this.destroy$))
      .subscribe((settings) => {
        this.settings = settings;
      });
  }

  page(event: PageEvent) {
    this.shipsService.page(event.pageIndex, event.pageSize);
  }

  search(text: string) {
    this.shipsService.search(text);
  }
}
