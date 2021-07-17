import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './routes';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(APP_ROUTES, {
      initialNavigation: 'enabled',
    }),
    GraphQLModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }],
})
export class AppModule {}
