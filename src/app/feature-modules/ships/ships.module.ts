import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './components/ships/ships.component';
import { RouterModule } from '@angular/router';
import { SHIP_ROUTES } from './routes';
import { CardPreviewsModule } from 'src/app/shared/card-previews/card-previews.module';
import { CardListModule } from 'src/app/common/card-list/card-list.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SHIP_ROUTES),
    CardListModule,
    CardPreviewsModule,
  ],
  declarations: [ShipsComponent],
})
export class ShipsModule {}
