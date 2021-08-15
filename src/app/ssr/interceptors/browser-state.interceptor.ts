import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(private readonly transferState: TransferState) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = makeStateKey(req.url);
    const storedResponse = this.transferState.get<Response | null>(key, null);

    if (storedResponse) {
      const response = new HttpResponse(storedResponse);

      this.transferState.remove(key);

      return of(response);
    }

    return next.handle(req);
  }
}
