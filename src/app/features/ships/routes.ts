import { ShipComponent } from './components/ship/ship.component';
import { ShipsComponent } from './components/ships/ships.component';

export const SHIP_ROUTES = [
  {
    path: '',
    component: ShipsComponent,
  },
  {
    path: ':id',
    component: ShipComponent,
  },
];
