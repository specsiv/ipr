import { NgModule } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserStateInterceptor } from './ssr/interceptors/browser-state.interceptor';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  imports: [AppModule, BrowserTransferStateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
