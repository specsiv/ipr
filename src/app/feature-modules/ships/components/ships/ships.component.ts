import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardList } from 'src/app/common/card-list/models/card';
import { ShipSettings } from '../../models/ship-settings';
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
export class ShipsComponent {
  private destroy$ = new ReplaySubject<void>(1);

  private _settings!: Readonly<ShipSettings>;
  private _ships$: Observable<CardList>;

  get ships$(): Observable<CardList> {
    return this._ships$;
  }

  get settings(): Readonly<ShipSettings> {
    return this._settings;
  }

  constructor(@Inject(SHIPS_API) private shipsAPI: ShipsAPI) {
    this._ships$ = shipsAPI.ships$;

    shipsAPI.settings$.pipe(takeUntil(this.destroy$)).subscribe((settings) => {
      this._settings = settings;
    });
  }

  page(event: PageEvent): void {
    this.shipsAPI.page(event.pageIndex, event.pageSize);
  }

  search(text: string): void {
    this.shipsAPI.search(text);
  }
}
