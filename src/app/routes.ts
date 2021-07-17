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
    path: 'histories',
    loadChildren: () => import('./features/histories/histories.module').then((m) => m.HistoriesModule),
  },
  {
    path: '**',
    loadChildren: () => import('./features/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },
];
