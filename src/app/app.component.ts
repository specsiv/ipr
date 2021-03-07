import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _url$: Observable<string>;

  public get url$(): Observable<string> {
    return this._url$;
  }

  constructor(router: Router) {
    this._url$ = router.events.pipe(
      filter(
        (event: Event): event is NavigationEnd => event instanceof NavigationEnd
      ),
      map((event) => event.urlAfterRedirects)
    );
  }
}
