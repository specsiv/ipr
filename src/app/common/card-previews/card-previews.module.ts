import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShipCardPreviewComponent } from './components/ship-card-preview/ship-card-preview.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [ShipCardPreviewComponent],
  declarations: [ShipCardPreviewComponent],
})
export class CardPreviewsModule {}
