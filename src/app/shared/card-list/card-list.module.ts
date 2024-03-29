import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './components/card-list/card-list.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorLocal } from './logic/mat-paginator-local.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SortButtonComponent } from './components/sort-button/sort-button.component';
import { SortIconPipe } from './pipes/sort-icon.pipe';
import { SortTypePipe } from './pipes/sort-type.pipe';
import { CardWrapperComponent } from './components/card-wrapper/card-wrapper.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [CardListComponent, SortTypePipe],
  declarations: [CardListComponent, SortButtonComponent, SortIconPipe, SortTypePipe, CardWrapperComponent],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorLocal,
    },
  ],
})
export class CardListModule {}
