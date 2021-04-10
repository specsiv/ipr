import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CardPreviewComponent } from 'src/app/shared/card-list/models/card';
import { SHIP } from '../../consts/icons';
import { ShipCardPreviewData } from '../../models/ship-card-preview-data';

@Component({
  selector: 'app-ship-card-preview',
  templateUrl: './ship-card-preview.component.html',
  styleUrls: ['./ship-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipCardPreviewComponent implements CardPreviewComponent<ShipCardPreviewData> {
  @Input() data!: ShipCardPreviewData;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('ship', sanitizer.bypassSecurityTrustHtml(SHIP));
  }
}
