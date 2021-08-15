import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICardPreviewComponent } from 'src/app/shared/card-list/models/card';
import { HISTORY } from '../../consts/icons';
import { HistoryCardPreviewData } from '../../models/history-card';

@Component({
  selector: 'app-history-card-preview',
  templateUrl: './history-card-preview.component.html',
  styleUrls: ['./history-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryCardPreviewComponent implements ICardPreviewComponent<HistoryCardPreviewData> {
  @Input() data!: HistoryCardPreviewData;

  constructor(readonly iconRegistry: MatIconRegistry, readonly sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('ship', sanitizer.bypassSecurityTrustHtml(HISTORY));
  }
}
