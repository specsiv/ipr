import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SHIP } from '../../consts/icons';
import { ShipCardPreviewData } from '../../models/ship-card-preview-data';

@Component({
  selector: 'app-ship-card-preview',
  templateUrl: './ship-card-preview.component.html',
  styleUrls: ['./ship-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipCardPreviewComponent {
  @Input() data!: ShipCardPreviewData;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('ship', sanitizer.bypassSecurityTrustHtml(SHIP));
  }
}
