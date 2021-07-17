import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HISTORY } from '../../consts/icons';
import { HistoryCardPreviewData } from '../../models/history-card-preview-data';

@Component({
  selector: 'app-history-card-preview',
  templateUrl: './history-card-preview.component.html',
  styleUrls: ['./history-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryCardPreviewComponent {
  @Input() data!: HistoryCardPreviewData;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('ship', sanitizer.bypassSecurityTrustHtml(HISTORY));
  }
}
