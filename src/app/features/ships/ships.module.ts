import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './components/ships/ships.component';
import { RouterModule } from '@angular/router';
import { SHIP_ROUTES } from './routes';
import { CardListWrapperModule } from 'src/app/core/card-list-wrapper/card-list-wrapper.module';
import { NgxsModule } from '@ngxs/store';
import { ShipsState } from './store/ships.state';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShipCardPreviewComponent } from './components/ship-card-preview/ship-card-preview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SHIP_ROUTES),
    NgxsModule.forFeature([ShipsState]),
    CardListWrapperModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [ShipsComponent, ShipCardPreviewComponent],
})
export class ShipsModule {}
