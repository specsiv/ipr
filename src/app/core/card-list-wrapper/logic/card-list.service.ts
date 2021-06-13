import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListSettings, SortType } from '../../../shared/card-list/models/list-settings';

export abstract class CardListService {
  private isStarted = false;
  private destroy$ = new ReplaySubject<void>(1);

  private currentSettings: ListSettings;
  private _settings$: Observable<ListSettings>;

  get settings$(): Observable<ListSettings> {
    return this._settings$;
  }

  constructor(defaultSettings: ListSettings, settings$: Observable<ListSettings>) {
    this.currentSettings = defaultSettings;
    this._settings$ = settings$;

    this._settings$.pipe(takeUntil(this.destroy$)).subscribe((settings) => {
      this.currentSettings = { ...settings };

      if (this.isStarted) {
        this.request({ ...settings });
      }
    });
  }

  protected onDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected abstract request(settings: ListSettings): void;

  protected abstract saveSettings(settings: ListSettings): void;

  page(pageIndex: number, pageSize: number): void {
    this.load({
      limit: pageSize,
      offset: pageIndex * pageSize,
      index: pageIndex,
    });
  }

  search(text: string): void {
    this.load({
      searchText: text,
      offset: 0,
      index: 0,
    });
  }

  load(settings?: Partial<ListSettings>): void {
    this.isStarted = true;
    settings = settings ?? {};

    this.saveSettings({
      ...this.currentSettings,
      ...settings,
    });
  }

  sort(type: SortType): void {
    this.load({
      order: type ? 'DESC' : 'ASC',
    });
  }
}
