import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_TOKEN } from 'src/app/common/models/api';
import { PageWithCardListComponent } from 'src/app/shared/card-list/components/page-with-card-list/page-with-card-list.component';
import { ShipsGraphQLAPIService } from '../../api/ships-graphql-api.service';
import { ShipsService } from '../../logic/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: API_TOKEN,
      useClass: ShipsGraphQLAPIService,
    },
    ShipsService,
  ],
})
export class ShipsComponent extends PageWithCardListComponent implements OnDestroy {
  constructor(shipsService: ShipsService, activatedRoute: ActivatedRoute, cdr: ChangeDetectorRef, router: Router) {
    super(shipsService, activatedRoute, cdr, router);
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }
}
