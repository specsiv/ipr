import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipCardPreviewComponent } from './components/ship-card-preview/ship-card-preview.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule],
  declarations: [ShipCardPreviewComponent],
  exports: [ShipCardPreviewComponent],
})
export class CardPreviewsModule {}
