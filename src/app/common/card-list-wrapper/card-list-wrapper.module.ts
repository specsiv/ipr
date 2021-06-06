import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListWrapperComponent } from './components/card-list-wrapper/card-list-wrapper.component';
import { CardListModule } from 'src/app/shared/card-list/card-list.module';

@NgModule({
  imports: [CommonModule, CardListModule],
  exports: [CardListWrapperComponent],
  declarations: [CardListWrapperComponent],
})
export class CardListWrapperModule {}
