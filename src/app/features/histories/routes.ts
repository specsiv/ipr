import { HistoriesComponent } from './components/histories/histories.component';
import { HistoryComponent } from './components/history/history.component';

export const HISTORIES_ROUTES = [
  {
    path: '',
    component: HistoriesComponent,
  },
  {
    path: ':id',
    component: HistoryComponent,
  },
];
