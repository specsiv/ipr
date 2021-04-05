import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './components/card-list/card-list.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorLocal } from './services/mat-paginator-local';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SortButtonComponent } from './components/sort-button/sort-button.component';
import { SortIconPipe } from './pipes/sort-icon.pipe';
import { SortTypePipe } from './pipes/sort-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [CardListComponent, SortTypePipe],
  declarations: [CardListComponent, SortButtonComponent, SortIconPipe, SortTypePipe],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorLocal,
    },
  ],
})
export class CardListModule {}
