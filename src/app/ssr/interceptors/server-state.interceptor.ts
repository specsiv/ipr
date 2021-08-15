import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from '../models/response';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private readonly transferState: TransferState) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 201 || event.status === 202)) {
          this.transferState.set<Response>(makeStateKey(req.url), {
            body: event.body,
            status: event.status,
          });
        }
      })
    );
  }
}
