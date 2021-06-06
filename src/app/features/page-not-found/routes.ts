import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const PAGE_NOT_FOUND_ROUTES = [
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
