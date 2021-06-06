import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './components/ships/ships.component';
import { RouterModule } from '@angular/router';
import { SHIP_ROUTES } from './routes';
import { CardPreviewsModule } from 'src/app/common/card-previews/card-previews.module';
import { CardListWrapperModule } from 'src/app/common/card-list-wrapper/card-list-wrapper.module';
import { NgxsModule } from '@ngxs/store';
import { ShipsState } from './store/ships.state';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SHIP_ROUTES),
    NgxsModule.forFeature([ShipsState]),
    CardListWrapperModule,
    CardPreviewsModule,
  ],
  declarations: [ShipsComponent],
})
export class ShipsModule {}
