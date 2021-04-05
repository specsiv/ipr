import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REVERSED_SORT, SORT } from 'src/app/shared/consts/icons';
import { SortType } from '../../models/list-settings';

@Component({
  selector: 'app-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortButtonComponent {
  @Input() type = SortType.DESC;

  @Output() typeChange = new EventEmitter<SortType>();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('sort', sanitizer.bypassSecurityTrustHtml(SORT));
    iconRegistry.addSvgIconLiteral('reversed-sort', sanitizer.bypassSecurityTrustHtml(REVERSED_SORT));
  }

  changeSort(): void {
    this.type = this.type ? 0 : 1;

    this.typeChange.emit(this.type);
  }
}
