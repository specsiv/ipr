import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exact, ShipsGQL, ShipsQuery } from 'src/app/api/graphql';
import { Card, CardList } from 'src/app/common/card-list/models/card';
import { ShipCardPreviewComponent } from 'src/app/shared/card-previews/components/ship-card-preview/ship-card-preview.component';

interface GQLVariables {
  limit: number;
  offset: number;
  searchText: string;
}

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsComponent {
  private shipsQuery: QueryRef<ShipsQuery, Exact<any>>;

  ships$: Observable<CardList>;
  variables: GQLVariables = {
    limit: 5,
    offset: 0,
    searchText: '',
  };
  pageIndex = 0;

  constructor(shipsGQL: ShipsGQL) {
    this.shipsQuery = shipsGQL.watch({ ...this.variables });

    this.ships$ = this.shipsQuery.valueChanges.pipe(
      map(
        ({ data }): CardList => {
          if (
            data?.shipsResult &&
            data.shipsResult.data &&
            data.shipsResult.result
          ) {
            return {
              list: data.shipsResult.data.map(
                (ship): Card => {
                  return {
                    data: {
                      name: ship?.name ?? null,
                      image: ship?.image ?? null,
                      year: ship?.year_built ?? null,
                    },
                    component: ShipCardPreviewComponent,
                  };
                }
              ),
              length: data.shipsResult.result.totalCount!,
            };
          }

          return {
            list: [],
            length: 0,
          };
        }
      )
    );
  }

  private fetchData() {
    this.shipsQuery.setVariables({ ...this.variables });
  }

  page(event: PageEvent) {
    this.variables.limit = event.pageSize;
    this.variables.offset = event.pageIndex * event.pageSize;
    this.pageIndex = event.pageIndex;

    this.fetchData();
  }

  search(text: string) {
    this.variables.searchText = text;
    this.variables.offset = 0;
    this.pageIndex = 0;

    this.fetchData();
  }
}
