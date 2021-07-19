import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsComponent {
  constructor() {}
}
