import { Component, Injector } from '@angular/core';
import { defineElements } from './elements';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly injector: Injector) {
    defineElements(injector);
  }
}
