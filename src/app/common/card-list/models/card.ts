import { Type } from '@angular/core';
import { CardPreviewComponent } from 'src/app/shared/card-previews/models/card-preview-component';
import { CardPreviewData } from 'src/app/shared/card-previews/models/card-preview-data';

export interface Card {
  data: CardPreviewData;
  component: Type<CardPreviewComponent>;
}

export interface CardList {
  list: Card[];
  length: number;
}
