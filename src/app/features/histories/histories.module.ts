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
import { API_TOKEN, CARD_TOKEN, LIST_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { HistoriesGraphQLAPIService } from './api/histories-graphql-api.service';
import { HistoriesService } from './logic/histories.service';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HISTORIES_ROUTES),
    NgxsModule.forFeature([HistoriesState]),
    CardListWrapperModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: API_TOKEN,
      useClass: HistoriesGraphQLAPIService,
    },
    {
      provide: LIST_TOKEN,
      useClass: HistoriesService,
    },
    {
      provide: CARD_TOKEN,
      useExisting: LIST_TOKEN,
    },
  ],
  declarations: [HistoriesComponent, HistoryCardPreviewComponent, HistoryComponent],
})
export class HistoriesModule {}
