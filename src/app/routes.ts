import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ships',
  },
  {
    path: 'ships',
    loadChildren: () => import('./features/ships/ships.module').then((m) => m.ShipsModule),
  },
  {
    path: '**',
    loadChildren: () => import('./features/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },
];
