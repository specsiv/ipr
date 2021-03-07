import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { PAGE_NOT_FOUND_ROUTES } from './routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PAGE_NOT_FOUND_ROUTES)],
  declarations: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
