import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListSettings } from '../models/list-settings';

export abstract class CardListService {
  private isStarted = false;
  private cardListDestroy$ = new ReplaySubject<void>(1);

  private currentSettings: Readonly<ListSettings> = {
    limit: 5,
    offset: 0,
    index: 0,
    searchText: '',
  };
  private settingsSubject$ = new BehaviorSubject<Readonly<ListSettings>>({ ...this.currentSettings });
  private _settings$ = this.settingsSubject$.asObservable();

  get settings$(): Observable<Readonly<ListSettings>> {
    return this._settings$;
  }

  constructor() {
    this._settings$.pipe(takeUntil(this.cardListDestroy$)).subscribe((settings) => {
      this.currentSettings = { ...settings };

      if (this.isStarted) {
        this.request({ ...settings });
      }
    });
  }

  protected onDestroy(): void {
    this.settingsSubject$.complete();

    this.cardListDestroy$.next();
    this.cardListDestroy$.complete();
  }

  protected abstract request(settings: ListSettings): void;

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

  load(settings?: Partial<Readonly<ListSettings>>): void {
    this.isStarted = true;
    settings = settings ?? {};

    this.settingsSubject$.next({
      ...this.currentSettings,
      ...settings,
    });
  }
}
