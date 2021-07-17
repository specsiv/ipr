import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriesComponent } from './components/histories/histories.component';
import { RouterModule } from '@angular/router';
import { HISTORIES_ROUTES } from './routes';
import { CardListWrapperModule } from 'src/app/core/card-list-wrapper/card-list-wrapper.module';
import { NgxsModule } from '@ngxs/store';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HistoryCardPreviewComponent } from './components/history-card-preview/history-card-preview.component';
import { HistoriesState } from './store/histories.state';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HISTORIES_ROUTES),
    NgxsModule.forFeature([HistoriesState]),
    CardListWrapperModule,
    MatCardModule,
    MatIconModule,
  ],

  declarations: [HistoriesComponent, HistoryCardPreviewComponent],
})
export class HistoriesModule {}
