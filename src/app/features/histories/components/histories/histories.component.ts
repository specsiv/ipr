import { Component, ChangeDetectionStrategy } from '@angular/core';
import { API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { LIST_API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { HistoriesGraphQLAPIService } from '../../api/histories-graphql-api.service';
import { HistoriesService } from '../../logic/histories.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: API_TOKEN,
      useClass: HistoriesGraphQLAPIService,
    },
    {
      provide: LIST_API_TOKEN,
      useClass: HistoriesService,
    },
  ],
})
export class HistoriesComponent {
  constructor() {}
}
