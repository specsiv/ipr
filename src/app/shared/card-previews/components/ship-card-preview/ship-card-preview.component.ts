import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SHIP } from '../../consts/icons';
import { CardPreviewComponent } from '../../models/card-preview-component';
import { CardPreviewData } from '../../models/card-preview-data';

@Component({
  selector: 'app-ship-card-preview',
  templateUrl: './ship-card-preview.component.html',
  styleUrls: ['./ship-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipCardPreviewComponent implements CardPreviewComponent {
  @Input() data!: CardPreviewData;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'ship',
      sanitizer.bypassSecurityTrustHtml(SHIP)
    );
  }
}
