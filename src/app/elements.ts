import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HistoryCardPreviewComponent } from './features/histories/components/history-card-preview/history-card-preview.component';
import { ShipCardPreviewComponent } from './features/ships/components/ship-card-preview/ship-card-preview.component';

export function defineElements(injector: Injector): void {
  customElements.define('ship-card-preview', createCustomElement(ShipCardPreviewComponent, { injector }));
  customElements.define('history-card-preview', createCustomElement(HistoryCardPreviewComponent, { injector }));
}
