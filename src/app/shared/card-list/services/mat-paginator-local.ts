import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorLocal extends MatPaginatorIntl {
  itemsPerPageLabel = 'Количество карточек на странице:';

  constructor() {
    super();
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string =>
    `${page + 1} из ${Math.trunc(length / pageSize) + 1}`;
}
