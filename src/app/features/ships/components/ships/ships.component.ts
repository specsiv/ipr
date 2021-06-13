import { Component, ChangeDetectionStrategy } from '@angular/core';
import { API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
import { LIST_API_TOKEN } from 'src/app/core/card-list-wrapper/models/api';
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
    {
      provide: LIST_API_TOKEN,
      useClass: ShipsService,
    },
  ],
})
export class ShipsComponent {
  constructor() {}
}
