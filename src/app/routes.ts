import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ships',
  },
  {
    path: 'ships',
    loadChildren: () =>
      import('./feature-modules/ships/ships.module').then((m) => m.ShipsModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./feature-modules/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];
