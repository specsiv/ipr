import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './components/ships/ships.component';
import { RouterModule } from '@angular/router';
import { SHIP_ROUTES } from './routes';
import { CardListWrapperModule } from 'src/app/core/modules/card-list-wrapper/card-list-wrapper.module';
import { NgxsModule } from '@ngxs/store';
import { ShipsState } from './store/ships.state';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShipCardPreviewComponent } from './components/ship-card-preview/ship-card-preview.component';
import { ShipComponent } from './components/ship/ship.component';
import { API_TOKEN, CARD_TOKEN, LIST_TOKEN } from 'src/app/core/modules/card-list-wrapper/models/api';
import { ShipsGraphQLAPIService } from './adapters/ships-graphql-adapter.service';
import { ShipsListService } from './logic/ships-list.service';
import { ShipCardsService } from './logic/ship-cards.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SHIP_ROUTES),
    NgxsModule.forFeature([ShipsState]),
    CardListWrapperModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [ShipsComponent, ShipCardPreviewComponent, ShipComponent],
  providers: [
    {
      provide: API_TOKEN,
      useClass: ShipsGraphQLAPIService,
    },
    {
      provide: LIST_TOKEN,
      useClass: ShipsListService,
    },
    {
      provide: CARD_TOKEN,
      useClass: ShipCardsService,
    },
  ],
})
export class ShipsModule {}
